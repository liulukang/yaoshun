#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const DEFAULT_ARCHIVES_ROOT = path.join(projectRoot, "data/1688-products");
const DEFAULT_OUTPUT = path.join(projectRoot, "src/content/site/products.generated.ts");
const DEFAULT_STATUS = path.join(projectRoot, "scripts/outputs/1688-sync-status.csv");
const SNAPSHOT_FILENAME = "product.json";
const LEGACY_SNAPSHOT_FILENAMES = ["product.snapshot.json", "snapshot.json"];
const MODULES = ["toys", "tubes", "equipment"];

function parseArgs(argv) {
  const args = {
    archivesRoot: DEFAULT_ARCHIVES_ROOT,
    output: DEFAULT_OUTPUT,
    statusPath: DEFAULT_STATUS,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--archives-root" && next) {
      args.archivesRoot = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--output" && next) {
      args.output = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--status" && next) {
      args.statusPath = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
  }

  return args;
}

function normalizeWhitespace(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function readLocalizedText(value) {
  if (typeof value === "string") {
    const text = normalizeWhitespace(value);
    return { zh: text, en: text };
  }

  if (value && typeof value === "object") {
    const zh = normalizeWhitespace(value.zh ?? value["zh-CN"] ?? value.cn ?? "");
    const en = normalizeWhitespace(value.en ?? value["en-US"] ?? value.us ?? "");
    if (zh || en) {
      return {
        zh: zh || en,
        en: en || zh,
      };
    }
  }

  return { zh: "", en: "" };
}

function localizedToString(value) {
  const localized = readLocalizedText(value);
  return localized.zh || localized.en || "";
}

function toTagKey(value) {
  const normalized = normalizeWhitespace(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (normalized) return normalized;

  const source = normalizeWhitespace(value);
  if (!source) return "tag";
  return `tag-${Buffer.from(source).toString("hex").slice(0, 12)}`;
}

function truncate(value, max) {
  const text = normalizeWhitespace(value);
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1))}…`;
}

function dedupe(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    const normalized = normalizeWhitespace(value);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function dedupeBy(values, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of values) {
    const key = keyFn(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function toLocalized(value) {
  const text = readLocalizedText(value);
  return {
    zh: text.zh || text.en,
    en: text.en || text.zh,
  };
}

function toSafeToken(value) {
  return normalizeWhitespace(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toSlug(title, offerId) {
  const safe = toSafeToken(title).slice(0, 48);
  return `${safe || "product"}-${offerId}`;
}

function entriesFromRecord(record) {
  if (!record || typeof record !== "object") return [];
  return Object.entries(record)
    .map(([name, value]) => ({
      name: normalizeWhitespace(name),
      value: localizedToString(value),
    }))
    .filter((item) => item.name && item.value);
}

function entriesFromArray(items) {
  return dedupeBy(
    (Array.isArray(items) ? items : []).map((item) => ({
      name: localizedToString(item?.name ?? item?.key ?? item?.label),
      value: localizedToString(item?.value),
    })),
    (item) => `${item.name}::${item.value}`
  ).filter((item) => item.name && item.value);
}

function normalizeTagValue(value) {
  if (typeof value === "string") {
    const token = normalizeWhitespace(value);
    if (!token) return "";
    return token;
  }
  if (value && typeof value === "object") {
    return normalizeWhitespace(value.zh ?? value.en ?? value.key ?? "");
  }
  return "";
}

function normalizeTagObject(value) {
  if (!value) return null;
  if (typeof value === "string") {
    const text = normalizeWhitespace(value);
    if (!text) return null;
    return {
      key: toTagKey(text),
      zh: text,
      en: readLocalizedText(text).en,
    };
  }

  if (value && typeof value === "object") {
    const key = normalizeWhitespace(value.key);
    const label = readLocalizedText({ zh: value.zh, en: value.en });
    const zh = label.zh || normalizeWhitespace(value.key);
    if (!zh && !key) return null;
    return {
      key: key || toTagKey(zh),
      zh: zh || key,
      en: label.en || label.zh || key,
    };
  }

  return null;
}

function dedupeTagObjects(values) {
  return dedupeBy(
    values.map((item) => normalizeTagObject(item)).filter(Boolean),
    (item) => item.key
  );
}

function moduleTagFor(moduleName) {
  if (moduleName === "toys") {
    return { key: "toys", zh: "玩具", en: "Toys" };
  }
  if (moduleName === "equipment") {
    return { key: "equipment", zh: "设备", en: "Equipment" };
  }
  return { key: "tubes", zh: "管材", en: "Tubes" };
}

function pickAttribute(attributes, pattern) {
  const item = attributes.find((entry) => pattern.test(normalizeWhitespace(entry.name)) && normalizeWhitespace(entry.value));
  return item ? normalizeWhitespace(item.value) : "";
}

function findShippingLocation(attributes, summaryText) {
  const fromAttributes =
    pickAttribute(attributes, /发货地/) ||
    pickAttribute(attributes, /原产地|产地/) ||
    "";

  if (fromAttributes) return fromAttributes;

  const summary = normalizeWhitespace(summaryText);
  const match = summary.match(/([\u4e00-\u9fa5]{2,6}[\u4e00-\u9fa5]{2,6})\s+送至/);
  return match ? normalizeWhitespace(match[1]) : "";
}

function buildDetail(snapshot) {
  const attrs = snapshot.attributes
    .slice(0, 12)
    .map((item) => `${normalizeWhitespace(item.name)}：${normalizeWhitespace(item.value)}`)
    .filter(Boolean)
    .join("；");

  const packaging = snapshot.packaging
    .slice(0, 8)
    .map((item) => `${normalizeWhitespace(item.name)}：${normalizeWhitespace(item.value)}`)
    .filter(Boolean)
    .join("；");

  const parts = [
    normalizeWhitespace(snapshot.summaryText),
    attrs ? `商品属性：${attrs}` : "",
    packaging ? `包装信息：${packaging}` : "",
  ].filter(Boolean);

  return truncate(parts.join(" "), 1200);
}

function normalizeTier(tier) {
  const quantity = localizedToString(tier?.quantity);
  const price = normalizeWhitespace(tier?.price);
  if (!quantity || !price) return null;
  return { quantity, price };
}

function resolveMediaUrls(snapshot) {
  const imagePaths = Array.isArray(snapshot.images) ? snapshot.images : [];
  const videoPaths = Array.isArray(snapshot.videos) ? snapshot.videos : [];

  const images = dedupeBy(
    imagePaths
      .map((item) => normalizeWhitespace(item).replace(/\\/g, "/"))
      .filter((item) => /(?:^|\/)(?:media\/)?images\//.test(item)),
    (item) => path.basename(item).toLowerCase()
  ).map((item) => `/api/1688-products/${snapshot.offerId}/images/${path.basename(item)}`);

  const videos = dedupeBy(
    videoPaths
      .map((item) => normalizeWhitespace(item).replace(/\\/g, "/"))
      .filter((item) => /(?:^|\/)(?:media\/)?videos\//.test(item)),
    (item) => path.basename(item).toLowerCase()
  ).map((item) => `/api/1688-products/${snapshot.offerId}/videos/${path.basename(item)}`);

  return { images, videos };
}

function buildSpecs(snapshot, sourcePrice, sourceMinimumOrder) {
  const specs = [];

  if (sourcePrice) {
    specs.push({ label: toLocalized("价格"), value: toLocalized(sourcePrice) });
  }
  if (sourceMinimumOrder) {
    specs.push({ label: toLocalized("起订"), value: toLocalized(sourceMinimumOrder) });
  }

  specs.push({ label: toLocalized("商品编号"), value: toLocalized(String(snapshot.offerId || "")) });

  const attrSpecs = snapshot.attributes
    .slice(0, 8)
    .map((item) => ({
      label: toLocalized(item.name),
      value: toLocalized(item.value),
    }));

  const packagingSpecs = snapshot.packaging
    .slice(0, 4)
    .map((item) => ({
      label: toLocalized(`包装-${item.name}`),
      value: toLocalized(item.value),
    }));

  const combined = [...specs, ...attrSpecs, ...packagingSpecs];
  const deduped = dedupeBy(combined, (item) => `${item.label.zh}::${item.value.zh}`)
    .filter((item) => item.label.zh && item.value.zh);

  return deduped.slice(0, 12);
}

function buildUseCases(snapshot, shippingLocation, sourceMinimumOrder) {
  const candidates = snapshot.attributes.filter((item) => /用途|适用范围|适用场景|适用人群|能力培养|主要销售地区/.test(normalizeWhitespace(item.name)));
  const useCases = candidates
    .slice(0, 3)
    .map((item) => toLocalized(`${normalizeWhitespace(item.name)}：${normalizeWhitespace(item.value)}`));

  if (shippingLocation) {
    useCases.push(toLocalized(`发货地：${shippingLocation}`));
  }
  if (sourceMinimumOrder) {
    useCases.push(toLocalized(`起订：${sourceMinimumOrder}`));
  }

  return dedupeBy(useCases, (item) => item.zh).slice(0, 4);
}

function buildHighlights(sourcePrice, sourceMinimumOrder, materialText, imageCount, videoCount) {
  const highlights = [];

  if (sourcePrice) {
    highlights.push(toLocalized(`参考价格：${sourcePrice}`));
  }
  if (sourceMinimumOrder && sourceMinimumOrder !== sourcePrice) {
    highlights.push(toLocalized(`起订信息：${sourceMinimumOrder}`));
  }
  if (materialText) {
    highlights.push(toLocalized(`材质：${materialText}`));
  }

  highlights.push(toLocalized(`图片素材：${imageCount} 张`));
  if (videoCount > 0) {
    highlights.push(toLocalized(`视频素材：${videoCount} 条`));
  }

  return dedupeBy(highlights, (item) => item.zh).slice(0, 4);
}

function snapshotToProduct(snapshot, statusOrderIndex) {
  const offerId = String(snapshot.offerId || "");
  const rawTags = Array.isArray(snapshot.tags) ? snapshot.tags : [];
  const hasEquipmentTag = rawTags.some((tag) => {
    const key = normalizeWhitespace(tag?.key ?? tag);
    const zh = normalizeWhitespace(tag?.zh);
    const en = normalizeWhitespace(tag?.en);
    return key.includes("equipment") || zh.includes("设备") || /\bequipment\b/i.test(en);
  });
  const moduleName = snapshot.module === "toys"
    ? "toys"
    : snapshot.module === "equipment" || hasEquipmentTag
      ? "equipment"
      : "tubes";
  const titleI18n = toLocalized(snapshot.titleLocalized || snapshot.title);
  const summaryI18n = toLocalized(snapshot.summaryLocalized || snapshot.summaryText || snapshot.title || `1688商品 ${offerId}`);

  const title = normalizeWhitespace(titleI18n.zh || titleI18n.en) || `1688商品 ${offerId}`;
  const summaryZh = truncate(summaryI18n.zh || summaryI18n.en || title, 180);
  const summaryEn = truncate(summaryI18n.en || summaryI18n.zh || title, 180);
  const detail = buildDetail(snapshot);

  const priceTiers = dedupeBy(
    (Array.isArray(snapshot.priceTiers) ? snapshot.priceTiers : [])
      .map((item) => normalizeTier(item))
      .filter(Boolean),
    (item) => `${item.quantity}__${item.price}`
  );

  const sourcePrice = priceTiers[0]?.price || "";
  const sourceMinimumOrder = priceTiers[0]?.quantity || "";

  const badgeText =
    pickAttribute(snapshot.attributes, /类目|类别|种类|类型/) ||
    pickAttribute(snapshot.attributes, /用途|适用范围/) ||
    (moduleName === "toys" ? "玩具" : moduleName === "equipment" ? "设备" : "管材");

  const materialText =
    pickAttribute(snapshot.attributes, /材质|玩具材质|原料|材料/) ||
    "未注明";

  const shippingLocation = findShippingLocation(snapshot.attributes, snapshot.summaryText);
  const { images, videos } = resolveMediaUrls(snapshot);

  const tags = dedupeTagObjects([...rawTags, moduleTagFor(moduleName)]);
  const priorityBase = moduleName === "toys" ? 1000 : moduleName === "equipment" ? 3000 : 2000;
  const fallbackPriority = priorityBase + statusOrderIndex;
  const priority = Number.isFinite(Number(snapshot.priority)) && Number(snapshot.priority) > 0
    ? Math.trunc(Number(snapshot.priority))
    : fallbackPriority;

  const useCases = buildUseCases(snapshot, shippingLocation, sourceMinimumOrder);
  const highlights = buildHighlights(sourcePrice, sourceMinimumOrder, materialText, images.length, videos.length);
  const specs = buildSpecs(snapshot, sourcePrice, sourceMinimumOrder);

  const keywords = dedupe([
    title,
    badgeText,
    materialText,
    shippingLocation,
    offerId,
    ...tags.map((tag) => tag.zh),
    ...snapshot.attributes.slice(0, 3).map((item) => normalizeWhitespace(item.value)),
  ]).slice(0, 14);

  return {
    slug: toSlug(title, offerId),
    offerId,
    module: moduleName,
    tags,
    priority,
    title: {
      zh: titleI18n.zh || title,
      en: titleI18n.en || titleI18n.zh || title,
    },
    badge: toLocalized(badgeText),
    summary: {
      zh: summaryZh || title,
      en: summaryEn || summaryZh || title,
    },
    detail: toLocalized(detail || title),
    moq: toLocalized(sourceMinimumOrder || "详询"),
    materials: toLocalized(materialText),
    useCases,
    highlights,
    specs,
    seoKeywords: {
      zh: keywords,
      en: keywords,
    },
    image: images[0] || "",
    gallery: images,
    videos,
    sourceUrl: normalizeWhitespace(snapshot.sourceUrl),
    sourcePrice,
    sourceMinimumOrder,
    sourceShippingLocation: shippingLocation,
  };
}

async function readOrderFromStatus(statusPath) {
  try {
    const raw = await fs.readFile(statusPath, "utf8");
    const source = raw.trim();
    if (!source) return [];

    if (/\.json$/i.test(statusPath)) {
      const parsed = JSON.parse(source);
      const rows = Array.isArray(parsed?.rows) ? parsed.rows : [];
      return dedupe(
        rows
          .map((row) => String(row.offerId || ""))
          .filter((offerId) => /^\d+$/.test(offerId))
      );
    }

    const lines = source.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (lines.length <= 1) return [];

    return dedupe(
      lines
        .slice(1)
        .map((line) => line.match(/^\s*[^,]+,(\d+)\b/)?.[1] ?? "")
        .filter((offerId) => /^\d+$/.test(offerId))
    );
  } catch {
    return [];
  }
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function resolveSnapshotPath(baseDir) {
  const candidates = [SNAPSHOT_FILENAME, ...LEGACY_SNAPSHOT_FILENAMES].map((name) => path.join(baseDir, name));
  for (const candidate of candidates) {
    if (await pathExists(candidate)) return candidate;
  }
  return "";
}

async function listSnapshotFiles(archivesRoot) {
  const files = [];

  const rootEntries = await fs.readdir(archivesRoot, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (entry.isDirectory() && /^\d+$/.test(entry.name)) {
      const offerDir = path.join(archivesRoot, entry.name);
      files.push({
        offerId: entry.name,
        moduleHint: "",
        snapshotPath: await resolveSnapshotPath(offerDir),
      });
    }
  }

  for (const moduleName of MODULES) {
    const moduleRoot = path.join(archivesRoot, moduleName);
    if (!await pathExists(moduleRoot)) continue;

    const moduleEntries = await fs.readdir(moduleRoot, { withFileTypes: true });
    for (const entry of moduleEntries) {
      if (!entry.isDirectory() || !/^\d+$/.test(entry.name)) continue;
      const offerDir = path.join(moduleRoot, entry.name);
      files.push({
        offerId: entry.name,
        moduleHint: moduleName,
        snapshotPath: await resolveSnapshotPath(offerDir),
      });
    }
  }

  return dedupeBy(files, (item) => item.offerId);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const hasRoot = await pathExists(args.archivesRoot);
  if (!hasRoot) {
    throw new Error(`Archives root not found: ${args.archivesRoot}`);
  }

  const orderFromStatus = await readOrderFromStatus(args.statusPath);
  const statusIndex = new Map(orderFromStatus.map((offerId, index) => [offerId, index]));

  const snapshots = await listSnapshotFiles(args.archivesRoot);
  const importedProducts = [];
  const failures = [];

  for (const item of snapshots) {
    if (!await pathExists(item.snapshotPath)) continue;

    try {
      const raw = await fs.readFile(item.snapshotPath, "utf8");
      const parsed = JSON.parse(raw);

      const offerId = normalizeWhitespace(parsed.offerId) || item.offerId;
      const moduleName = normalizeWhitespace(parsed.module) || item.moduleHint || "tubes";

      const normalizedSnapshot = {
        offerId,
        sourceUrl: normalizeWhitespace(parsed.sourceUrl),
        module: moduleName === "toys" || moduleName === "equipment" ? moduleName : "tubes",
        tags: dedupeTagObjects(Array.isArray(parsed.tags) ? parsed.tags : []),
        priority: Number(parsed.priority || 0),
        title: localizedToString(parsed.title),
        titleLocalized: readLocalizedText(parsed.title),
        summaryText: localizedToString(parsed.summary ?? parsed.summaryText),
        summaryLocalized: readLocalizedText(parsed.summary ?? parsed.summaryText),
        priceTiers: Array.isArray(parsed.priceTiers) ? parsed.priceTiers : [],
        attributes: Array.isArray(parsed.attributes) ? entriesFromArray(parsed.attributes) : entriesFromRecord(parsed.attributes),
        packaging: Array.isArray(parsed.packaging) ? entriesFromArray(parsed.packaging) : entriesFromRecord(parsed.packaging),
        images: Array.isArray(parsed.images) ? parsed.images : [],
        videos: Array.isArray(parsed.videos) ? parsed.videos : [],
      };

      const idx = statusIndex.has(offerId) ? Number(statusIndex.get(offerId)) : 100000;
      importedProducts.push(snapshotToProduct(normalizedSnapshot, idx));
    } catch (error) {
      failures.push({
        offerId: item.offerId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  importedProducts.sort((a, b) => {
    const pA = Number(a.priority || 0);
    const pB = Number(b.priority || 0);
    if (pA !== pB) return pA - pB;

    const idxA = statusIndex.has(a.offerId || "") ? Number(statusIndex.get(a.offerId || "")) : 100000;
    const idxB = statusIndex.has(b.offerId || "") ? Number(statusIndex.get(b.offerId || "")) : 100000;
    if (idxA !== idxB) return idxA - idxB;

    return String(a.offerId || a.slug).localeCompare(String(b.offerId || b.slug), undefined, { numeric: true });
  });

  const outputDir = path.dirname(args.output);
  await fs.mkdir(outputDir, { recursive: true });

  const generatedAt = new Date().toISOString();
  const sourceLabel = path.relative(projectRoot, args.archivesRoot) || args.archivesRoot;
  const productLites = importedProducts.map((item) => ({
    slug: item.slug,
    offerId: item.offerId,
    module: item.module,
    tags: item.tags,
    priority: item.priority,
    title: item.title,
    summary: item.summary,
    image: item.image,
    gallery: Array.isArray(item.gallery) ? item.gallery : [],
    videos: Array.isArray(item.videos) ? item.videos : [],
    sourcePrice: item.sourcePrice || "",
    sourceUrl: item.sourceUrl || "",
  }));
  const outputSource = [
    "import type { Product } from \"@/content/site/shared\";",
    "",
    "// Auto-generated by scripts/import-1688-archives.mjs",
    `// Source archives: ${sourceLabel}`,
    `// Generated at: ${generatedAt}`,
    "",
    "type ProductLite = Pick<",
    "  Product,",
    "  \"slug\" | \"offerId\" | \"module\" | \"tags\" | \"priority\" | \"title\" | \"summary\" | \"image\" | \"gallery\" | \"videos\" | \"sourcePrice\" | \"sourceUrl\"",
    ">;",
    "",
    "const productLites: ProductLite[] = " + JSON.stringify(productLites, null, 2) + ";",
    "",
    "const emptyText = { zh: \"\", en: \"\" } as const;",
    "",
    "export const importedProducts: Product[] = productLites.map((item) => {",
    "  const price = item.sourcePrice ?? \"\";",
    "  const highlightZh = price ? \"参考价格：\" + price : \"\";",
    "  const highlightEn = price ? \"Reference price: \" + price : \"\";",
    "  const zhKeywords = Array.from(",
    "    new Set([item.title?.zh, ...((item.tags ?? []).map((tag) => tag.zh))].filter((value): value is string => Boolean(value)))",
    "  );",
    "  const enKeywords = Array.from(",
    "    new Set([item.title?.en, ...((item.tags ?? []).map((tag) => tag.en))].filter((value): value is string => Boolean(value)))",
    "  );",
    "",
    "  const gallery = item.gallery ?? (item.image ? [item.image] : []);",
    "  const videos = item.videos ?? [];",
    "",
    "  return {",
    "    ...item,",
    "    badge: emptyText,",
    "    detail: item.summary,",
    "    moq: emptyText,",
    "    materials: emptyText,",
    "    useCases: [],",
    "    highlights: price ? [{ zh: highlightZh, en: highlightEn }] : [],",
    "    specs:",
    "      price",
    "        ? [",
    "            {",
    "              label: { zh: \"价格\", en: \"Price\" },",
    "              value: { zh: price, en: price },",
    "            },",
    "          ]",
    "        : [],",
    "    seoKeywords: {",
    "      zh: zhKeywords,",
    "      en: enKeywords,",
    "    },",
    "    gallery,",
    "    videos,",
    "    sourceMinimumOrder: \"\",",
    "    sourceShippingLocation: \"\",",
    "  };",
    "});",
    "",
    "export const importedProductsMeta = " + JSON.stringify({
      source: sourceLabel,
      generatedAt,
      total: productLites.length,
      mode: "no-merge",
      failures,
    }, null, 2) + " as const;",
    "",
  ].join("\n");

  await fs.writeFile(args.output, outputSource, "utf8");

  process.stdout.write(`Generated products: ${importedProducts.length}\n`);
  if (failures.length > 0) {
    process.stdout.write(`Parse failures: ${failures.length}\n`);
  }
  process.stdout.write(`Output: ${args.output}\n`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
