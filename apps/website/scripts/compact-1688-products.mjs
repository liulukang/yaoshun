#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const websiteRoot = path.resolve(__dirname, "..");

const DEFAULT_ROOT = path.join(websiteRoot, "data/1688-products");
const DEFAULT_REPORT_DIR = path.join(websiteRoot, "scripts/outputs");
const SNAPSHOT_FILENAME = "product.json";
const LEGACY_SNAPSHOT_FILENAMES = ["product.snapshot.json", "snapshot.json"];
const MODULES = ["toys", "tubes", "equipment"];
const MATERIAL_TOKENS = [
  "ABS",
  "PP",
  "PVC",
  "TPU",
  "PU",
  "PC",
  "PMMA",
  "PLA",
  "PBS",
  "PE",
  "PET",
  "ETFE",
  "PTFE",
];
const BASE_TAG_DEFINITIONS = [
  { key: "toys", zh: "玩具", en: "Toys" },
  { key: "toys-stem", zh: "玩具-STEM", en: "Toys - STEM" },
  { key: "toys-diy", zh: "玩具-DIY", en: "Toys - DIY" },
  { key: "toys-general", zh: "玩具-通用", en: "Toys - General" },
  { key: "tubes", zh: "管材", en: "Tubes" },
  { key: "equipment", zh: "设备", en: "Equipment" },
  { key: "tubes-led", zh: "管材-灯带", en: "Tubes - LED Strip" },
  { key: "tubes-tpu", zh: "管材-TPU", en: "Tubes - TPU" },
  { key: "tubes-pvc", zh: "管材-PVC", en: "Tubes - PVC" },
  { key: "tubes-pu", zh: "管材-PU", en: "Tubes - PU" },
  { key: "tubes-biodegradable", zh: "管材-可降解", en: "Tubes - Biodegradable" },
  { key: "tubes-equipment", zh: "管材-设备", en: "Tubes - Equipment" },
  { key: "tubes-general", zh: "管材-通用", en: "Tubes - General" },
  { key: "cross-border-export", zh: "跨境外贸", en: "Cross-border Export" },
];
const TAG_DEFINITIONS = [
  ...BASE_TAG_DEFINITIONS,
  ...MATERIAL_TOKENS.map((token) => ({ key: token.toLowerCase(), zh: token, en: token })),
];
const TAG_BY_KEY = new Map(TAG_DEFINITIONS.map((item) => [item.key, item]));
const TAG_BY_ZH = new Map(TAG_DEFINITIONS.map((item) => [item.zh, item]));

const TRANSLATION_GLOSSARY = [
  ["东莞茶山", "Chashan, Dongguan"],
  ["广东东莞", "Dongguan, Guangdong"],
  ["四川成都", "Chengdu, Sichuan"],
  ["发货地", "Ship-from"],
  ["送至", "to"],
  ["承诺", "promised"],
  ["发货", "dispatch"],
  ["新人价", "New buyer price"],
  ["预估到手单价", "Estimated landed unit price"],
  ["预估到手价", "Estimated landed price"],
  ["商品属性", "Product attributes"],
  ["包装信息", "Packaging info"],
  ["原料牌号", "Material grade"],
  ["品牌", "Brand"],
  ["货号", "Item No."],
  ["产品类型", "Product type"],
  ["产地", "Origin"],
  ["应用领域", "Application"],
  ["是否进口", "Imported"],
  ["材质", "Material"],
  ["包装方式", "Packaging method"],
  ["拼砌玩具类型", "Building toy type"],
  ["适用年龄", "Age range"],
  ["能力培养", "Skills development"],
  ["是否有动漫形象", "With cartoon image"],
  ["是否有导购视频", "With guide video"],
  ["是否专供外贸", "Export only"],
  ["是否跨境出口专供货源", "Cross-border dedicated source"],
  ["3C配置类别", "3C category"],
  ["重量", "Weight"],
  ["体积", "Volume"],
  ["长", "Length"],
  ["宽", "Width"],
  ["高", "Height"],
  ["规格", "Specification"],
  ["颜色", "Color"],
  ["彩盒", "Color box"],
  ["否", "No"],
  ["是", "Yes"],
  ["玩具", " toy "],
  ["益智", " educational "],
  ["儿童", " children "],
  ["搭建", " build "],
  ["帐篷", " tent "],
  ["厂家批发", " factory wholesale "],
  ["软管", "hose"],
  ["绝缘", " insulated "],
  ["防水", " waterproof "],
  ["医用", " medical "],
];

function parseArgs(argv) {
  const args = {
    root: DEFAULT_ROOT,
    reportDir: DEFAULT_REPORT_DIR,
    minImageBytes: 30 * 1024,
    dryRun: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--root" && next) {
      args.root = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--report-dir" && next) {
      args.reportDir = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--min-image-bytes" && next) {
      const parsed = Number.parseInt(next, 10);
      if (!Number.isNaN(parsed) && parsed >= 4096) {
        args.minImageBytes = parsed;
      }
      i += 1;
      continue;
    }
    if (token === "--dry-run") {
      args.dryRun = true;
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

function toLocalizedText(value) {
  const normalized = readLocalizedText(value);
  if (!normalized.zh && !normalized.en) {
    return { zh: "", en: "" };
  }
  return {
    zh: normalized.zh || normalized.en,
    en: normalized.en || normalized.zh,
  };
}

function localizedToString(value) {
  const normalized = readLocalizedText(value);
  return normalized.zh || normalized.en || "";
}

function hasCjk(text) {
  return /[\u3400-\u9fff]/.test(String(text || ""));
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

function translateZhToEn(rawText) {
  const source = normalizeWhitespace(rawText);
  if (!source) return "";
  if (!hasCjk(source)) return source;

  let text = source;
  for (const [zh, en] of TRANSLATION_GLOSSARY) {
    text = text.split(zh).join(en);
  }

  text = text
    .replace(/≥/g, ">=")
    .replace(/(\d+)\s*-\s*(\d+)\s*件/g, "$1-$2 pcs")
    .replace(/(\d+)\s*-\s*(\d+)\s*米/g, "$1-$2 m")
    .replace(/(\d+)\s*件/g, "$1 pcs")
    .replace(/(\d+)\s*套/g, "$1 sets")
    .replace(/(\d+)\s*盒/g, "$1 boxes")
    .replace(/(\d+)\s*个/g, "$1 pcs")
    .replace(/(\d+)\s*条/g, "$1 pcs")
    .replace(/(\d+)\s*米/g, "$1 m")
    .replace(/起批/g, " MOQ")
    .replace(/起订/g, " MOQ")
    .replace(/首件/g, "first unit")
    .replace(/，/g, ", ")
    .replace(/。/g, ". ")
    .replace(/；/g, "; ")
    .replace(/：/g, ": ")
    .replace(/\s+/g, " ")
    .trim();

  return text || source;
}

function translateQuantityToEn(quantityZh) {
  const source = normalizeWhitespace(quantityZh);
  if (!source) return "";

  return translateZhToEn(
    source
      .replace(/起批/g, "MOQ")
      .replace(/起订/g, "MOQ")
      .replace(/首件/g, "first unit")
  );
}

function toLocalizedContentText(value, translateFn = translateZhToEn) {
  const localized = readLocalizedText(value);
  const zh = normalizeWhitespace(localized.zh || localized.en);
  const currentEn = normalizeWhitespace(localized.en);
  const en = currentEn && currentEn !== zh
    ? currentEn
    : (translateFn(zh) || zh);

  return {
    zh,
    en: en || zh,
  };
}

function normalizeTagObject(value) {
  if (!value) return null;

  if (typeof value === "string") {
    const token = normalizeWhitespace(value);
    if (!token) return null;

    if (TAG_BY_ZH.has(token)) {
      const hit = TAG_BY_ZH.get(token);
      return { key: hit.key, zh: hit.zh, en: hit.en };
    }

    if (TAG_BY_KEY.has(token)) {
      const hit = TAG_BY_KEY.get(token);
      return { key: hit.key, zh: hit.zh, en: hit.en };
    }

    const upper = token.toUpperCase();
    if (MATERIAL_TOKENS.includes(upper)) {
      const hit = TAG_BY_KEY.get(upper.toLowerCase());
      return { key: hit.key, zh: hit.zh, en: hit.en };
    }

    return {
      key: toTagKey(token),
      zh: token,
      en: translateZhToEn(token) || token,
    };
  }

  if (value && typeof value === "object") {
    const keyRaw = normalizeWhitespace(value.key);
    if (keyRaw && TAG_BY_KEY.has(keyRaw)) {
      const hit = TAG_BY_KEY.get(keyRaw);
      return { key: hit.key, zh: hit.zh, en: hit.en };
    }

    const zhRaw = normalizeWhitespace(value.zh);
    if (zhRaw && TAG_BY_ZH.has(zhRaw)) {
      const hit = TAG_BY_ZH.get(zhRaw);
      return { key: hit.key, zh: hit.zh, en: hit.en };
    }

    const enRaw = normalizeWhitespace(value.en);
    const label = zhRaw || enRaw || keyRaw;
    if (!label) return null;

    return {
      key: keyRaw || toTagKey(label),
      zh: zhRaw || label,
      en: enRaw || translateZhToEn(zhRaw || label) || label,
    };
  }

  return null;
}

function dedupeTagObjects(items) {
  return dedupeBy(
    items.map((item) => normalizeTagObject(item)).filter(Boolean),
    (item) => item.key
  );
}

function dedupe(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    const text = normalizeWhitespace(value);
    if (!text || seen.has(text)) continue;
    seen.add(text);
    out.push(text);
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

function extractArchiveFromModule(moduleText) {
  const match = moduleText.match(/export const productArchive: ProductArchive = (\{[\s\S]*\}) as const;/);
  if (!match) {
    throw new Error("Cannot parse productArchive from product.ts");
  }
  return JSON.parse(match[1]);
}

function toLocalMediaPath(value) {
  const normalized = normalizeWhitespace(value).replace(/\\/g, "/");
  if (!normalized) return "";
  if (normalized.startsWith("./images/") || normalized.startsWith("./videos/")) return normalized;
  if (normalized.startsWith("images/") || normalized.startsWith("videos/")) return `./${normalized}`;
  if (normalized.startsWith("./media/images/")) return normalized.replace("./media/images/", "./images/");
  if (normalized.startsWith("./media/videos/")) return normalized.replace("./media/videos/", "./videos/");
  if (normalized.startsWith("media/images/")) return `./${normalized.replace("media/images/", "images/")}`;
  if (normalized.startsWith("media/videos/")) return `./${normalized.replace("media/videos/", "videos/")}`;
  return normalized;
}

function normalizePriceNumberText(value) {
  const text = normalizeWhitespace(value)
    .replace(/¥\s*/g, "¥")
    .replace(/(\d)\s*\.\s*(\d)/g, "$1.$2")
    .replace(/[～—]/g, "-");
  return text;
}

function normalizePriceValue(priceText) {
  const raw = String(priceText || "").replace(/[^0-9.]/g, "");
  if (!raw) return "";
  const parsed = Number.parseFloat(raw);
  if (Number.isNaN(parsed)) return "";

  const fixed = parsed % 1 === 0 ? parsed.toString() : parsed.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
  return `¥${fixed}`;
}

function parsePriceNumber(priceText) {
  const raw = String(priceText || "").replace(/[^0-9.]/g, "");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
}

function normalizeQuantityValue(quantityText) {
  let quantity = normalizeWhitespace(quantityText)
    .replace(/[，,]/g, "")
    .replace(/[～—]/g, "-")
    .replace(/^[-:：;；\s]+/, "")
    .replace(/[-:：;；\s]+$/, "")
    .replace(/\s+/g, "");

  if (!quantity) return "";

  quantity = quantity
    .replace(/^首件预估到手价$/, "首件")
    .replace(/^首件价$/, "首件");

  if (/^运费/.test(quantity)) return "";
  if (/^起$/.test(quantity)) return "";
  if (/^0(?:[^\d]|$)/.test(quantity)) return "";
  if (/^(?:\d+|\d+\.\d+)$/.test(quantity)) return "";

  const looksLikeTier = /(首件|起订|起批|≥|>|件|套|米|个|盒|条|包|卷|根|kg|KG|千克|吨|PCS|pcs|-|以上|以内)/.test(quantity);
  if (!looksLikeTier) return "";

  return quantity;
}

function parsePriceTiers(priceTexts, summaryText) {
  const candidates = dedupe([
    ...((Array.isArray(priceTexts) ? priceTexts : []).map((item) => normalizePriceNumberText(item))),
    normalizePriceNumberText(summaryText),
  ]).filter(Boolean);

  const tiers = [];
  const quantityPattern = "(?:首件(?:预估到手价|价)?|起订|起批|[≥>]?\\d+(?:\\.\\d+)?(?:[-~]\\d+(?:\\.\\d+)?)?(?:件|套|米|个|盒|条|包|卷|根|kg|KG|千克|吨|PCS|pcs)(?:起批|起|以上|以内)?)";

  for (const text of candidates) {
    const priceThenQty = new RegExp(`¥\\s*([0-9]+(?:\\.[0-9]+)?)\\s*(${quantityPattern})`, "g");
    let match = priceThenQty.exec(text);
    while (match) {
      const before = text.slice(Math.max(0, match.index - 16), match.index);
      if (!/运费/.test(before) && !/预估到手价/.test(match[2]) && !/新人价|预估到手价|预估到手单价/.test(before)) {
        const price = normalizePriceValue(match[1]);
        const quantity = normalizeQuantityValue(match[2]);
        if (price && quantity) {
          tiers.push({ quantity, price });
        }
      }
      match = priceThenQty.exec(text);
    }

    if (tiers.length === 0) {
      const qtyThenPrice = new RegExp(`(${quantityPattern})\\s*¥\\s*([0-9]+(?:\\.[0-9]+)?)`, "g");
      match = qtyThenPrice.exec(text);
      while (match) {
        const before = text.slice(Math.max(0, match.index - 12), match.index);
        if (!/运费/.test(before)) {
          const quantity = normalizeQuantityValue(match[1]);
          const price = normalizePriceValue(match[2]);
          if (price && quantity) {
            tiers.push({ quantity, price });
          }
        }
        match = qtyThenPrice.exec(text);
      }
    }
  }

  if (tiers.length === 0) {
    let index = 0;
    for (const text of candidates) {
      const fallbackPattern = /¥\s*([0-9]+(?:\.[0-9]+)?)/g;
      let fallback = fallbackPattern.exec(text);
      while (fallback) {
        const before = text.slice(Math.max(0, fallback.index - 8), fallback.index);
        if (!/运费/.test(before)) {
          const price = normalizePriceValue(fallback[1]);
          if (price) {
            tiers.push({ quantity: index === 0 ? "起订" : `阶梯${index + 1}`, price });
            index += 1;
          }
        }
        fallback = fallbackPattern.exec(text);
      }
    }
  }

  const deduped = dedupeBy(tiers, (item) => `${item.quantity}__${item.price}`);
  const byQuantity = new Map();
  for (const tier of deduped) {
    const key = tier.quantity;
    if (!byQuantity.has(key)) {
      byQuantity.set(key, tier);
      continue;
    }
    const existing = byQuantity.get(key);
    if (parsePriceNumber(tier.price) < parsePriceNumber(existing.price)) {
      byQuantity.set(key, tier);
    }
  }

  return Array.from(byQuantity.values()).slice(0, 8);
}

function pairsToLocalizedEntries(pairs) {
  const grouped = new Map();

  for (const pair of pairs) {
    const name = normalizeWhitespace(pair?.name);
    const value = normalizeWhitespace(pair?.value);
    if (!name || !value) continue;

    if (!grouped.has(name)) {
      grouped.set(name, []);
    }
    grouped.get(name).push(value);
  }

  const out = [];
  for (const [name, values] of grouped.entries()) {
    const mergedValue = dedupe(values).join(" / ");
    out.push({
      key: toLocalizedContentText(name),
      value: toLocalizedContentText(mergedValue),
    });
  }

  return out;
}

function entriesFromRecord(record) {
  if (!record || typeof record !== "object") return [];
  return Object.entries(record)
    .map(([name, value]) => ({ name: normalizeWhitespace(name), value: localizedToString(value) }))
    .filter((item) => item.name && item.value);
}

function normalizeTagValue(value) {
  const tag = normalizeTagObject(value);
  return tag ? tag.zh : "";
}

function cleanTitle(rawTitle) {
  let title = normalizeWhitespace(rawTitle)
    .replace(/[|｜【】\[\]（）()]+/g, " ")
    .replace(/\s+/g, " ");

  // Collapse contiguous repeated chunks (common in scraped titles).
  for (let len = 3; len <= 16; len += 1) {
    const pattern = new RegExp(`(.{${len}})\\1+`, "g");
    title = title.replace(pattern, "$1");
  }

  const tokens = title
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const dedupedTokens = [];
  for (const token of tokens) {
    const prev = dedupedTokens[dedupedTokens.length - 1];
    if (prev && prev.toLowerCase() === token.toLowerCase()) {
      continue;
    }
    dedupedTokens.push(token);
  }

  title = dedupedTokens.join(" ").replace(/[，,。.;；:：\-]+$/, "");

  if (title.length > 88) {
    title = `${title.slice(0, 88).trim()}…`;
  }

  return title || normalizeWhitespace(rawTitle);
}

function parseDimsFromTps(url) {
  const matched = String(url).match(/-tps-(\d+)-(\d+)\./i);
  if (!matched) return { width: 0, height: 0 };
  const width = Number.parseInt(matched[1], 10);
  const height = Number.parseInt(matched[2], 10);
  return {
    width: Number.isNaN(width) ? 0 : width,
    height: Number.isNaN(height) ? 0 : height,
  };
}

function isClearlyThumbnailOrIcon(remoteUrl, size) {
  const url = String(remoteUrl || "").toLowerCase();

  if (/\.search\.|\.summ\.|\.220x220\.|\.310x310\./.test(url)) return true;
  if (/_b\.jpg|_sum\.jpg|\.jpg_b\.jpg|\.jpg_sum\.jpg/.test(url)) return true;
  if (/favicon|iconfont|sprite|\bicon\b/.test(url)) return true;
  if (/-2-tps-\d+-\d+\./.test(url) || /-55-tps-\d+-\d+\./.test(url)) return true;

  const { width, height } = parseDimsFromTps(url);
  if ((width > 0 && width <= 220) || (height > 0 && height <= 220)) {
    return true;
  }

  if (size > 0 && size < 10 * 1024) return true;
  return false;
}

function isProbablyProductImage(remoteUrl, size, minImageBytes) {
  if (isClearlyThumbnailOrIcon(remoteUrl, size)) return false;
  if (size >= minImageBytes) return true;

  const url = String(remoteUrl || "").toLowerCase();
  if (!url && size >= 12 * 1024) return true;
  if (/\/img\/ibank\//.test(url) && size >= 12 * 1024) return true;
  if (/\bcib\.jpg/.test(url) && size >= 12 * 1024) return true;
  if (/\/cms\/upload\//.test(url) && size >= 12 * 1024) return true;
  return false;
}

function extractMaterialTags(text) {
  const tags = [];
  const source = String(text || "").toUpperCase();
  for (const token of MATERIAL_TOKENS) {
    if (source.includes(token)) {
      tags.push(token);
    }
  }
  return tags;
}

function classifyModuleAndTags({ title, summaryText, attributes, packaging, existingTags = [] }) {
  const attrsText = attributes.map((item) => `${normalizeWhitespace(item.name)} ${normalizeWhitespace(item.value)}`).join(" ");
  const packagingText = packaging.map((item) => `${normalizeWhitespace(item.name)} ${normalizeWhitespace(item.value)}`).join(" ");
  const text = `${normalizeWhitespace(title)} ${normalizeWhitespace(summaryText)} ${attrsText} ${packagingText}`;

  const hasToy = /玩具|儿童|积木|diy|stem|帐篷|拼装|插珠|堡垒|益智|亲子/i.test(text);
  const hasTube = /tpu|pu|pvc|软管|管材|型材|灯带|套管|封边条|密封条|导管|挤出|棒材|吸管/i.test(text);
  const hasEquipment = /挤出机|设备|生产线|模具|机组|辅机|机台|切管机|machine|equipment|production line/i.test(text);

  const moduleName = hasToy && !hasTube && !hasEquipment
    ? "toys"
    : hasEquipment
      ? "equipment"
      : "tubes";
  const tags = [];

  if (moduleName === "toys") {
    tags.push("玩具");
    if (/stem|益智|智力|教育/i.test(text)) tags.push("玩具-STEM");
    if (/diy|拼装|积木|插珠|堡垒|帐篷/i.test(text)) tags.push("玩具-DIY");
    if (tags.length === 1) tags.push("玩具-通用");
  } else if (moduleName === "equipment") {
    tags.push("设备");
    tags.push("管材-设备");
  } else {
    tags.push("管材");
    if (/灯带|led/i.test(text)) tags.push("管材-灯带");
    else if (/tpu/i.test(text)) tags.push("管材-TPU");
    else if (/pvc/i.test(text)) tags.push("管材-PVC");
    else if (/pu/i.test(text)) tags.push("管材-PU");
    else if (/pla|pbs|可降解|一次性|刀叉|吸管|餐具/i.test(text)) tags.push("管材-可降解");
    else if (/挤出机|设备|生产线|模具|机组|辅机/i.test(text)) tags.push("管材-设备");
    else tags.push("管材-通用");
  }

  if (/跨境|外贸/.test(text)) {
    tags.push("跨境外贸");
  }

  tags.push(...extractMaterialTags(text));

  return {
    module: moduleName,
    tags: dedupe([...existingTags, ...tags]),
  };
}

function pathTokenSort(a, b) {
  const ax = String(a.localPath || "");
  const bx = String(b.localPath || "");
  return ax.localeCompare(bx, undefined, { numeric: true, sensitivity: "base" });
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

async function listOfferLocations(root) {
  const out = [];
  const seen = new Set();

  const rootEntries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of rootEntries) {
    if (entry.isDirectory() && /^\d+$/.test(entry.name)) {
      const offerId = entry.name;
      if (seen.has(offerId)) continue;
      seen.add(offerId);
      out.push({ offerId, productDir: path.join(root, offerId) });
    }
  }

  for (const moduleName of MODULES) {
    const moduleRoot = path.join(root, moduleName);
    if (!await pathExists(moduleRoot)) continue;

    const entries = await fs.readdir(moduleRoot, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || !/^\d+$/.test(entry.name)) continue;
      const offerId = entry.name;
      if (seen.has(offerId)) continue;
      seen.add(offerId);
      out.push({ offerId, productDir: path.join(moduleRoot, offerId) });
    }
  }

  out.sort((a, b) => a.offerId.localeCompare(b.offerId, undefined, { numeric: true }));
  return out;
}

async function cleanupHtmlArtifacts(productDir, dryRun) {
  const pageHtml = path.join(productDir, "page.html");
  const detailFrames = path.join(productDir, "detail-frames");

  if (!dryRun) {
    await fs.rm(pageHtml, { force: true });
    await fs.rm(detailFrames, { recursive: true, force: true });
  }
}

function normalizeArrayPairs(items) {
  return dedupeBy(
    (Array.isArray(items) ? items : []).map((item) => ({
      name: localizedToString(item?.name ?? item?.key ?? item?.label),
      value: localizedToString(item?.value),
    })),
    (item) => `${item.name}::${item.value}`
  ).filter((item) => item.name && item.value);
}

async function readSourceArchive(productDir, offerId) {
  const productTsPath = path.join(productDir, "product.ts");
  if (await pathExists(productTsPath)) {
    const text = await fs.readFile(productTsPath, "utf8");
    const archive = extractArchiveFromModule(text);
    return {
      offerId,
      sourceUrl: normalizeWhitespace(archive.sourceUrl),
      title: normalizeWhitespace(archive.title),
      metaDescription: normalizeWhitespace(archive.metaDescription),
      summaryText: normalizeWhitespace(archive.summaryText),
      priceTexts: Array.isArray(archive.priceTexts) ? archive.priceTexts : [],
      attributes: normalizeArrayPairs(archive.attributes),
      packaging: normalizeArrayPairs(archive.packaging),
      imageDownloads: Array.isArray(archive?.media?.imageDownloads) ? archive.media.imageDownloads : [],
      videoDownloads: Array.isArray(archive?.media?.videoDownloads) ? archive.media.videoDownloads : [],
      images: [],
      videos: [],
      module: "",
      tags: [],
      priority: 0,
    };
  }

  const sourceSnapshotPath = await resolveSnapshotPath(productDir);

  if (!await pathExists(sourceSnapshotPath)) {
    return null;
  }

  const raw = await fs.readFile(sourceSnapshotPath, "utf8");
  const parsed = JSON.parse(raw);

  const legacyMain = parsed && typeof parsed.main === "object" ? parsed.main : null;

  const attributes = Array.isArray(parsed?.attributes)
    ? normalizeArrayPairs(parsed.attributes)
    : entriesFromRecord(parsed?.attributes);

  const packaging = Array.isArray(parsed?.packaging)
    ? normalizeArrayPairs(parsed.packaging)
    : entriesFromRecord(parsed?.packaging);

  const images = Array.isArray(parsed?.images)
    ? parsed.images
    : Array.isArray(parsed?.media?.images)
      ? parsed.media.images
      : [];

  const videos = Array.isArray(parsed?.videos)
    ? parsed.videos
    : Array.isArray(parsed?.media?.videos)
      ? parsed.media.videos
      : [];

  const tags = Array.isArray(parsed?.tags)
    ? parsed.tags.map((item) => normalizeTagValue(item)).filter(Boolean)
    : normalizeWhitespace(parsed?.tag)
      ? [parsed.tag]
      : [];

  const priceTexts = Array.isArray(parsed?.priceTexts)
    ? parsed.priceTexts
    : Array.isArray(legacyMain?.priceTexts)
      ? legacyMain.priceTexts
      : [];

  return {
    offerId: normalizeWhitespace(parsed?.offerId) || offerId,
    sourceUrl: normalizeWhitespace(parsed?.sourceUrl) || normalizeWhitespace(legacyMain?.url),
    title:
      localizedToString(parsed?.title) ||
      normalizeWhitespace(Array.isArray(legacyMain?.titleCandidates) ? legacyMain.titleCandidates[0] : ""),
    metaDescription: localizedToString(parsed?.metaDescription) || normalizeWhitespace(legacyMain?.metaDescription),
    summaryText: localizedToString(parsed?.summary) || localizedToString(parsed?.summaryText) || normalizeWhitespace(legacyMain?.bodyTextSample),
    priceTexts,
    attributes,
    packaging,
    imageDownloads: [],
    videoDownloads: [],
    images: images.map((item) => toLocalMediaPath(item)).filter(Boolean),
    videos: videos.map((item) => toLocalMediaPath(item)).filter(Boolean),
    module: normalizeWhitespace(parsed?.module),
    tags: dedupe(tags),
    priority: Number(parsed?.priority || 0),
  };
}

async function collectImageCandidates(productDir, source) {
  const out = [];

  const downloaded = Array.isArray(source.imageDownloads)
    ? source.imageDownloads.map((item) => ({
      remoteUrl: normalizeWhitespace(item?.remoteUrl),
      localPath: toLocalMediaPath(item?.localPath),
      size: Number(item?.size || 0),
    }))
    : [];

  for (const item of downloaded) {
    if (!item.localPath) continue;
    const absPath = path.join(productDir, item.localPath.replace(/^\.\//, ""));
    if (!await pathExists(absPath)) continue;
    const stat = await fs.stat(absPath).catch(() => null);
    out.push({
      remoteUrl: item.remoteUrl,
      localPath: item.localPath,
      size: item.size > 0 ? item.size : Number(stat?.size || 0),
      absPath,
    });
  }

  if (out.length === 0 && Array.isArray(source.images) && source.images.length > 0) {
    for (const localPathRaw of source.images) {
      const localPath = toLocalMediaPath(localPathRaw);
      if (!localPath) continue;
      const absPath = path.join(productDir, localPath.replace(/^\.\//, ""));
      if (!await pathExists(absPath)) continue;
      const stat = await fs.stat(absPath).catch(() => null);
      out.push({
        remoteUrl: "",
        localPath,
        size: Number(stat?.size || 0),
        absPath,
      });
    }
  }

  if (out.length === 0) {
    const imagesDir = await pathExists(path.join(productDir, "images"))
      ? path.join(productDir, "images")
      : path.join(productDir, "media/images");
    if (await pathExists(imagesDir)) {
      const files = await fs.readdir(imagesDir);
      for (const filename of files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
        const absPath = path.join(imagesDir, filename);
        const stat = await fs.stat(absPath).catch(() => null);
        if (!stat?.isFile()) continue;
        out.push({
          remoteUrl: "",
          localPath: `./images/${filename}`,
          size: Number(stat.size || 0),
          absPath,
        });
      }
    }
  }

  out.sort(pathTokenSort);
  return dedupeBy(out, (item) => item.localPath);
}

async function collectVideoCandidates(productDir, source) {
  const out = [];

  const downloaded = Array.isArray(source.videoDownloads)
    ? source.videoDownloads.map((item) => ({
      localPath: toLocalMediaPath(item?.localPath),
    }))
    : [];

  for (const item of downloaded) {
    if (!item.localPath) continue;
    const absPath = path.join(productDir, item.localPath.replace(/^\.\//, ""));
    if (!await pathExists(absPath)) continue;
    out.push({ localPath: item.localPath, absPath });
  }

  if (out.length === 0 && Array.isArray(source.videos) && source.videos.length > 0) {
    for (const localPathRaw of source.videos) {
      const localPath = toLocalMediaPath(localPathRaw);
      if (!localPath) continue;
      const absPath = path.join(productDir, localPath.replace(/^\.\//, ""));
      if (!await pathExists(absPath)) continue;
      out.push({ localPath, absPath });
    }
  }

  if (out.length === 0) {
    const videosDir = await pathExists(path.join(productDir, "videos"))
      ? path.join(productDir, "videos")
      : path.join(productDir, "media/videos");
    if (await pathExists(videosDir)) {
      const files = await fs.readdir(videosDir);
      for (const filename of files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))) {
        const absPath = path.join(videosDir, filename);
        const stat = await fs.stat(absPath).catch(() => null);
        if (!stat?.isFile()) continue;
        out.push({ localPath: `./videos/${filename}`, absPath });
      }
    }
  }

  return dedupeBy(out, (item) => item.localPath);
}

function pickPriority({ existingPriority, moduleName, counters }) {
  if (Number.isFinite(existingPriority) && existingPriority > 0) {
    return Math.trunc(existingPriority);
  }

  const offset = moduleName === "toys" ? 1000 : moduleName === "equipment" ? 3000 : 2000;
  const index = counters[moduleName] ?? 0;
  counters[moduleName] = index + 1;
  return offset + index;
}

function buildSnapshot({ source, images, videos, counters }) {
  const classified = classifyModuleAndTags({
    title: source.title,
    summaryText: source.summaryText,
    attributes: source.attributes,
    packaging: source.packaging,
    existingTags: source.tags,
  });

  const moduleName = source.module === "toys" || source.module === "tubes" || source.module === "equipment"
    ? source.module
    : classified.module;

  const tags = dedupe([
    ...classified.tags,
    ...(source.tags || []),
  ]);
  const tagObjects = dedupeTagObjects(tags);

  const priority = pickPriority({
    existingPriority: Number(source.priority || 0),
    moduleName,
    counters,
  });

  const title = cleanTitle(source.title || `1688商品 ${source.offerId}`);
  const summaryText = normalizeWhitespace(source.summaryText);
  const priceTiers = parsePriceTiers(source.priceTexts, summaryText);

  return {
    offerId: normalizeWhitespace(source.offerId),
    sourceUrl: normalizeWhitespace(source.sourceUrl),
    module: moduleName,
    tags: tagObjects,
    priority,
    title: toLocalizedContentText(title),
    metaDescription: toLocalizedContentText(normalizeWhitespace(source.metaDescription)),
    summary: toLocalizedContentText(summaryText),
    priceTiers: priceTiers.map((item) => ({
      quantity: toLocalizedContentText(item.quantity, translateQuantityToEn),
      price: item.price,
    })),
    attributes: pairsToLocalizedEntries(source.attributes),
    packaging: pairsToLocalizedEntries(source.packaging),
    images: images.map((item) => item.localPath),
    videos: videos.map((item) => item.localPath),
  };
}

async function compactOne({ root, offerId, productDir, minImageBytes, dryRun, counters }) {
  const snapshotPath = path.join(productDir, SNAPSHOT_FILENAME);
  const productTsPath = path.join(productDir, "product.ts");
  const imagesDir = await pathExists(path.join(productDir, "images"))
    ? path.join(productDir, "images")
    : path.join(productDir, "media/images");

  const source = await readSourceArchive(productDir, offerId);
  if (!source) {
    return {
      offerId,
      status: "skipped",
      reason: `${SNAPSHOT_FILENAME} / ${LEGACY_SNAPSHOT_FILENAMES.join(" / ")} and product.ts missing`,
      keptImages: 0,
      removedImages: 0,
      keptVideos: 0,
      module: "",
      tags: [],
      priority: 0,
      titleChanged: false,
      relativeDir: path.relative(root, productDir).replace(/\\/g, "/"),
    };
  }

  const existingImages = await collectImageCandidates(productDir, source);

  let keepImages = existingImages.filter((item) => isProbablyProductImage(item.remoteUrl, item.size, minImageBytes));

  if (keepImages.length < 3) {
    const softFallback = existingImages.filter(
      (item) => !isClearlyThumbnailOrIcon(item.remoteUrl, item.size) && item.size >= 12 * 1024
    );
    if (softFallback.length > keepImages.length) {
      keepImages = softFallback;
    }
  }

  if (keepImages.length === 0 && existingImages.length > 0) {
    keepImages = [...existingImages]
      .sort((a, b) => b.size - a.size)
      .slice(0, Math.min(8, existingImages.length));
  }

  keepImages = dedupeBy(keepImages.sort(pathTokenSort), (item) => item.localPath);
  const keepImagePathSet = new Set(keepImages.map((item) => path.resolve(item.absPath)));

  const keepVideos = await collectVideoCandidates(productDir, source);

  let removedImageFiles = 0;
  if (await pathExists(imagesDir)) {
    const files = await fs.readdir(imagesDir);
    for (const filename of files) {
      const absPath = path.join(imagesDir, filename);
      const full = path.resolve(absPath);
      if (keepImagePathSet.has(full)) continue;
      removedImageFiles += 1;
      if (!dryRun) {
        await fs.rm(absPath, { force: true });
      }
    }
  }

  await cleanupHtmlArtifacts(productDir, dryRun);

  const compact = buildSnapshot({
    source,
    images: keepImages,
    videos: keepVideos,
    counters,
  });

  const titleChanged = cleanTitle(source.title) !== normalizeWhitespace(source.title);

  const targetDir = path.join(root, compact.module, offerId);

  if (!dryRun) {
    await fs.mkdir(path.dirname(targetDir), { recursive: true });
    await fs.writeFile(snapshotPath, JSON.stringify(compact, null, 2), "utf8");
    for (const legacyName of LEGACY_SNAPSHOT_FILENAMES) {
      await fs.rm(path.join(productDir, legacyName), { force: true });
    }
    await fs.rm(productTsPath, { force: true });

    const sourceResolved = path.resolve(productDir);
    const targetResolved = path.resolve(targetDir);
    if (sourceResolved !== targetResolved) {
      if (await pathExists(targetDir)) {
        throw new Error(`Target directory already exists: ${targetDir}`);
      }
      await fs.rename(productDir, targetDir);
    }
  }

  return {
    offerId,
    status: "ok",
    keptImages: keepImages.length,
    removedImages: removedImageFiles,
    keptVideos: keepVideos.length,
    module: compact.module,
    tags: Array.isArray(compact.tags) ? compact.tags.map((item) => normalizeWhitespace(item?.key || item?.zh || "")) : [],
    priority: compact.priority,
    titleChanged,
    relativeDir: path.relative(root, targetDir).replace(/\\/g, "/"),
  };
}

async function collectModuleIndex(root) {
  const modules = { toys: [], tubes: [], equipment: [] };

  for (const moduleName of MODULES) {
    const moduleRoot = path.join(root, moduleName);
    if (!await pathExists(moduleRoot)) continue;

    const entries = await fs.readdir(moduleRoot, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isDirectory() || !/^\d+$/.test(entry.name)) continue;
      const offerId = entry.name;
      const sourceSnapshotPath = await resolveSnapshotPath(path.join(moduleRoot, offerId));
      if (!await pathExists(sourceSnapshotPath)) continue;

      try {
        const raw = await fs.readFile(sourceSnapshotPath, "utf8");
        const snapshot = JSON.parse(raw);
        modules[moduleName].push({
          offerId,
          title: localizedToString(snapshot.title),
          tags: Array.isArray(snapshot.tags)
            ? snapshot.tags
              .map((item) => normalizeTagObject(item))
              .filter(Boolean)
              .map((item) => item.key)
            : [],
          priority: Number(snapshot.priority || 0),
          folder: `${moduleName}/${offerId}`,
        });
      } catch {
        // ignore malformed snapshot
      }
    }

    modules[moduleName].sort((a, b) => {
      const pa = Number(a.priority || 0);
      const pb = Number(b.priority || 0);
      if (pa !== pb) return pa - pb;
      return a.offerId.localeCompare(b.offerId, undefined, { numeric: true });
    });
  }

  return modules;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const offers = await listOfferLocations(args.root);

  const results = [];
  const counters = { toys: 0, tubes: 0, equipment: 0 };

  for (let i = 0; i < offers.length; i += 1) {
    const item = offers[i];
    process.stdout.write(`[${i + 1}/${offers.length}] ${item.offerId}\n`);
    try {
      const result = await compactOne({
        root: args.root,
        offerId: item.offerId,
        productDir: item.productDir,
        minImageBytes: args.minImageBytes,
        dryRun: args.dryRun,
        counters,
      });
      results.push(result);
      if (result.status === "ok") {
        process.stdout.write(
          `  ok: module=${result.module}, tags=${result.tags.join("|")}, priority=${result.priority}, titleChanged=${result.titleChanged}, images kept=${result.keptImages}, images removed=${result.removedImages}, videos kept=${result.keptVideos}\n`
        );
      } else {
        process.stdout.write(`  ${result.status}: ${result.reason || ""}\n`);
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : String(error);
      results.push({
        offerId: item.offerId,
        status: "failed",
        reason,
        keptImages: 0,
        removedImages: 0,
        keptVideos: 0,
        module: "",
        tags: [],
        priority: 0,
        titleChanged: false,
        relativeDir: path.relative(args.root, item.productDir).replace(/\\/g, "/"),
      });
      process.stdout.write(`  failed: ${reason}\n`);
    }
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    root: path.relative(websiteRoot, args.root),
    minImageBytes: args.minImageBytes,
    dryRun: args.dryRun,
    total: results.length,
    success: results.filter((item) => item.status === "ok").length,
    skipped: results.filter((item) => item.status === "skipped").length,
    failed: results.filter((item) => item.status === "failed").length,
    keptImages: results.reduce((sum, item) => sum + Number(item.keptImages || 0), 0),
    removedImages: results.reduce((sum, item) => sum + Number(item.removedImages || 0), 0),
    keptVideos: results.reduce((sum, item) => sum + Number(item.keptVideos || 0), 0),
    titleChanged: results.filter((item) => item.titleChanged).length,
    byModule: {
      toys: results.filter((item) => item.status === "ok" && item.module === "toys").length,
      tubes: results.filter((item) => item.status === "ok" && item.module === "tubes").length,
      equipment: results.filter((item) => item.status === "ok" && item.module === "equipment").length,
    },
  };

  const reportPath = path.join(args.reportDir, "1688-compact-report.json");
  const moduleIndexPath = path.join(args.reportDir, "1688-module-index.json");

  if (!args.dryRun) {
    await fs.mkdir(args.reportDir, { recursive: true });
    const modules = await collectModuleIndex(args.root);
    await fs.writeFile(reportPath, JSON.stringify({ summary, results }, null, 2), "utf8");
    await fs.writeFile(
      moduleIndexPath,
      JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          root: path.relative(websiteRoot, args.root),
          modules,
        },
        null,
        2
      ),
      "utf8"
    );
  }

  process.stdout.write(`\nSummary: total=${summary.total}, success=${summary.success}, skipped=${summary.skipped}, failed=${summary.failed}\n`);
  process.stdout.write(`Images: kept=${summary.keptImages}, removed=${summary.removedImages}; videos kept=${summary.keptVideos}\n`);
  process.stdout.write(`Titles normalized: ${summary.titleChanged}\n`);
  process.stdout.write(
    `Modules: toys=${summary.byModule.toys}, tubes=${summary.byModule.tubes}, equipment=${summary.byModule.equipment}\n`
  );
  if (!args.dryRun) {
    process.stdout.write(`Report: ${reportPath}\n`);
    process.stdout.write(`Module index: ${moduleIndexPath}\n`);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
