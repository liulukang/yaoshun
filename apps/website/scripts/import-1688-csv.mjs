#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const DEFAULT_INPUT = path.join(projectRoot, "sale-1688-com-2026-04-11 (1).csv");
const DEFAULT_OUTPUT = path.join(projectRoot, "src/content/site/products.generated.ts");
const DEFAULT_MEDIA_ROOT = path.join(projectRoot, "public/media/products");
const FALLBACK_IMAGE = "/media/products/diy-abs-pp-601805200838/image-01.jpg";

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif", "bmp", "svg"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "mov", "m4v", "webm", "m3u8", "avi"]);

const MATERIAL_STOP_WORDS = [
  "特色功能",
  "是否可降解",
  "容量",
  "厚度",
  "品牌",
  "形状",
  "货号",
  "尺寸",
  "加工定制",
  "箱装数量",
  "毛重",
  "产地",
  "颜色",
  "规格",
  "适用年龄",
  "能力培养",
  "包装方式",
  "拼砌玩具类型",
  "是否有动漫形象",
  "专利及著作权",
  "是否有导购视频",
  "是否专供外贸",
  "3C配置类别",
  "是否跨境出口",
  "专利",
  "版权",
  "展开全部",
];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    output: DEFAULT_OUTPUT,
    mediaRoot: DEFAULT_MEDIA_ROOT,
    skipDownload: false,
    limit: null,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--input" && argv[i + 1]) {
      args.input = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
      continue;
    }
    if (token === "--output" && argv[i + 1]) {
      args.output = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
      continue;
    }
    if (token === "--media-root" && argv[i + 1]) {
      args.mediaRoot = path.resolve(process.cwd(), argv[i + 1]);
      i += 1;
      continue;
    }
    if (token === "--skip-download") {
      args.skipDownload = true;
      continue;
    }
    if (token === "--limit" && argv[i + 1]) {
      const parsed = Number.parseInt(argv[i + 1], 10);
      args.limit = Number.isNaN(parsed) ? null : parsed;
      i += 1;
      continue;
    }
  }

  return args;
}

function parseCsv(content) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const ch = content[i];

    if (inQuotes) {
      if (ch === "\"") {
        if (content[i + 1] === "\"") {
          cell += "\"";
          i += 1;
          continue;
        }
        inQuotes = false;
        continue;
      }
      cell += ch;
      continue;
    }

    if (ch === "\"") {
      inQuotes = true;
      continue;
    }
    if (ch === ",") {
      row.push(cell);
      cell = "";
      continue;
    }
    if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    if (ch === "\r") {
      continue;
    }
    cell += ch;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function normalizeWhitespace(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function cleanHeader(value) {
  return normalizeWhitespace(value).replace(/^\uFEFF/, "");
}

function cleanFieldValue(value) {
  return normalizeWhitespace(value)
    .replace(/占位符/gi, "")
    .replace(/placeholder/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function truncate(value, maxLength) {
  if (!value) return "";
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

function toLocalized(value, fallback = "") {
  const text = value || fallback;
  return { zh: text, en: text };
}

function extractOfferId(itemUrl) {
  const match = itemUrl.match(/\/offer\/(\d+)\.html/i);
  return match ? match[1] : "";
}

function slugify(name, offerId, rowIndex) {
  const ascii = name
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .slice(0, 60);

  if (ascii) {
    return offerId ? `${ascii}-${offerId}` : ascii;
  }
  if (offerId) {
    return `product-${offerId}`;
  }
  return `product-${rowIndex}`;
}

function makeUniqueSlug(base, usedSlugs) {
  if (!usedSlugs.has(base)) {
    usedSlugs.add(base);
    return base;
  }

  let index = 2;
  while (usedSlugs.has(`${base}-${index}`)) {
    index += 1;
  }
  const candidate = `${base}-${index}`;
  usedSlugs.add(candidate);
  return candidate;
}

function parseMaterial(attributes) {
  if (!attributes.includes("材质")) {
    return "";
  }

  const begin = attributes.indexOf("材质") + 2;
  if (begin < 2) return "";

  let end = attributes.length;
  for (const keyword of MATERIAL_STOP_WORDS) {
    const found = attributes.indexOf(keyword, begin);
    if (found !== -1 && found < end) {
      end = found;
    }
  }

  return cleanFieldValue(attributes.slice(begin, end)).slice(0, 40);
}

function buildKeywords(values) {
  const seen = new Set();
  const result = [];

  for (const source of values) {
    const text = cleanFieldValue(source);
    if (!text) continue;
    for (const token of text.split(/[，,;；|/]+/)) {
      const item = token.trim();
      if (!item) continue;
      if (seen.has(item)) continue;
      seen.add(item);
      result.push(item);
      if (result.length >= 10) return result;
    }
  }

  return result;
}

function parseNumberPrice(value) {
  const clean = cleanFieldValue(value);
  if (!clean) return "";
  if (/[¥￥]/.test(clean)) return clean;
  return `¥${clean}`;
}

function extractUrls(value) {
  if (!value) return [];
  const text = String(value);
  const matches = text.match(/https?:\/\/[^\s"'<>]+/g) ?? [];
  return matches.map((url) => url.replace(/[)\],]+$/, ""));
}

function dedupe(values) {
  const seen = new Set();
  const result = [];

  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }

  return result;
}

function getFileExtFromUrl(url) {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    const match = pathname.match(/\.([a-z0-9]+)(?:$|\?)/i);
    if (!match) return "";
    return match[1];
  } catch {
    return "";
  }
}

function isVideoUrl(url) {
  const ext = getFileExtFromUrl(url);
  if (VIDEO_EXTENSIONS.has(ext)) return true;
  return /video|\/video\//i.test(url);
}

function isImageUrl(url) {
  const ext = getFileExtFromUrl(url);
  if (IMAGE_EXTENSIONS.has(ext)) return true;
  return /cbu\d+\.alicdn\.com|img\.alicdn\.com/i.test(url);
}

function shouldIgnoreImageUrl(url) {
  return /-2-tps-\d+-\d+\.(png|jpg|jpeg|webp|gif)(\?|$)/i.test(url);
}

function collectMediaUrls(record, headers) {
  const imageUrls = [];
  const videoUrls = [];

  for (const header of headers) {
    const value = record[header];
    if (!value) continue;

    const urls = extractUrls(value);
    for (const url of urls) {
      if (isVideoUrl(url)) {
        videoUrls.push(url);
        continue;
      }

      if ((header.startsWith("image") || isImageUrl(url)) && !shouldIgnoreImageUrl(url)) {
        imageUrls.push(url);
      }
    }
  }

  return {
    images: dedupe(imageUrls),
    videos: dedupe(videoUrls),
  };
}

function extFromContentType(contentType, mediaKind) {
  if (!contentType) return mediaKind === "video" ? "mp4" : "jpg";
  const normalized = contentType.toLowerCase();
  if (normalized.includes("image/jpeg")) return "jpg";
  if (normalized.includes("image/png")) return "png";
  if (normalized.includes("image/webp")) return "webp";
  if (normalized.includes("image/gif")) return "gif";
  if (normalized.includes("image/avif")) return "avif";
  if (normalized.includes("image/svg")) return "svg";
  if (normalized.includes("video/mp4")) return "mp4";
  if (normalized.includes("video/webm")) return "webm";
  if (normalized.includes("application/vnd.apple.mpegurl")) return "m3u8";
  if (normalized.includes("application/x-mpegurl")) return "m3u8";
  return mediaKind === "video" ? "mp4" : "jpg";
}

function chooseExtension(url, contentType, mediaKind) {
  const extFromUrl = getFileExtFromUrl(url);
  if (mediaKind === "video" && VIDEO_EXTENSIONS.has(extFromUrl)) return extFromUrl;
  if (mediaKind === "image" && IMAGE_EXTENSIONS.has(extFromUrl)) return extFromUrl;
  return extFromContentType(contentType, mediaKind);
}

async function fetchBufferWithRetry(url, maxAttempts = 3) {
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), 20000);

    try {
      const response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: abortController.signal,
        headers: {
          "user-agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          accept: "*/*",
          referer: "https://detail.1688.com/",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const contentType = response.headers.get("content-type") ?? "";
      clearTimeout(timeout);
      return { buffer, contentType };
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
      if (attempt < maxAttempts) {
        await sleep(attempt * 500);
      }
    }
  }

  throw lastError ?? new Error("Unknown download error");
}

async function downloadMediaFiles(urls, mediaKind, absoluteDir, publicRelativeDir) {
  const localPaths = [];
  let failures = 0;

  for (const [index, url] of urls.entries()) {
    try {
      const { buffer, contentType } = await fetchBufferWithRetry(url);
      const ext = chooseExtension(url, contentType, mediaKind);
      const filename = `${mediaKind}-${String(index + 1).padStart(2, "0")}.${ext}`;
      const outputPath = path.join(absoluteDir, filename);
      await fs.writeFile(outputPath, buffer);
      localPaths.push(`/${path.posix.join(publicRelativeDir, filename)}`);
      process.stdout.write(`  ${mediaKind} ${index + 1}/${urls.length} -> ${filename}\n`);
    } catch (error) {
      failures += 1;
      const errorMessage = error instanceof Error ? error.message : String(error);
      process.stdout.write(`  ${mediaKind} ${index + 1}/${urls.length} failed: ${errorMessage}\n`);
    }
  }

  return { localPaths, failures };
}

function toPosixRelative(from, target) {
  return path.relative(from, target).split(path.sep).join("/");
}

function buildSpecs({ price, moq, shippingLocation, offerId }) {
  return [
    {
      label: toLocalized("价格"),
      value: toLocalized(price || "详询"),
    },
    {
      label: toLocalized("起订"),
      value: toLocalized(moq || "详询"),
    },
    {
      label: toLocalized("发货地"),
      value: toLocalized(shippingLocation || "详询"),
    },
    {
      label: toLocalized("商品编号"),
      value: toLocalized(offerId || "详询"),
    },
  ];
}

function buildDetailText(record, fallbackName) {
  const text33 = cleanFieldValue(record.text_33);
  if (text33) return truncate(text33, 260);

  const text35 = cleanFieldValue(record.text_35);
  if (text35) return truncate(text35, 260);

  const pageTitle = cleanFieldValue(record.item_page_title);
  if (pageTitle) return truncate(pageTitle, 260);

  return truncate(cleanFieldValue(fallbackName), 260);
}

function buildSummaryText(record, fallbackName) {
  const productTitle = cleanFieldValue(record.product_title);
  if (productTitle) return truncate(productTitle, 120);

  const itemTitle = cleanFieldValue(record.item_page_title);
  if (itemTitle) return truncate(itemTitle, 120);

  return truncate(cleanFieldValue(fallbackName), 120);
}

function uniqueCompact(values) {
  return dedupe(values.map((value) => cleanFieldValue(value)).filter(Boolean));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const csvContent = await fs.readFile(args.input, "utf8");
  const rows = parseCsv(csvContent);
  if (rows.length < 2) {
    throw new Error("CSV does not contain product rows.");
  }

  const headers = rows[0].map(cleanHeader);
  const dataRows = rows.slice(1, args.limit ? args.limit + 1 : undefined);
  const usedSlugs = new Set();

  await fs.mkdir(path.dirname(args.output), { recursive: true });
  await fs.mkdir(args.mediaRoot, { recursive: true });

  const products = [];
  let totalImageFailures = 0;
  let totalVideoFailures = 0;
  let totalDownloadedImages = 0;
  let totalDownloadedVideos = 0;
  let totalDetectedVideos = 0;

  for (const [index, row] of dataRows.entries()) {
    const record = {};
    for (let i = 0; i < headers.length; i += 1) {
      record[headers[i]] = row[i] ?? "";
    }

    const name = cleanFieldValue(record.name || record.product_title || record.title || record.item_page_title);
    if (!name) {
      continue;
    }

    const itemPageLink = cleanFieldValue(record.item_page_link);
    const offerId = extractOfferId(itemPageLink);
    const slugBase = slugify(name, offerId, index + 1);
    const slug = makeUniqueSlug(slugBase, usedSlugs);

    process.stdout.write(`[${index + 1}/${dataRows.length}] ${slug}\n`);

    const category = cleanFieldValue(record.seller_main_category).replace(/^主营[:：]\s*/i, "");
    const summary = buildSummaryText(record, name);
    const detail = buildDetailText(record, name);
    const material = parseMaterial(cleanFieldValue(record.text_33)) || "详见商品属性";

    const price = parseNumberPrice(record.price);
    const price2 = cleanFieldValue(record.price2);
    const minimumOrder = cleanFieldValue(record.minimum_order);
    const shippingLocation = cleanFieldValue(record.shipping_location);
    const moq = minimumOrder || price2 || "详询";

    const { images: imageUrls, videos: videoUrls } = collectMediaUrls(record, headers);
    totalDetectedVideos += videoUrls.length;

    const productMediaAbsoluteDir = path.join(args.mediaRoot, slug);
    const productMediaPublicDir = toPosixRelative(path.join(projectRoot, "public"), productMediaAbsoluteDir);

    await fs.rm(productMediaAbsoluteDir, { recursive: true, force: true });
    await fs.mkdir(productMediaAbsoluteDir, { recursive: true });

    let localImages = [];
    let localVideos = [];

    if (!args.skipDownload) {
      const downloadedImages = await downloadMediaFiles(
        imageUrls,
        "image",
        productMediaAbsoluteDir,
        productMediaPublicDir
      );
      const downloadedVideos = await downloadMediaFiles(
        videoUrls,
        "video",
        productMediaAbsoluteDir,
        productMediaPublicDir
      );

      localImages = downloadedImages.localPaths;
      localVideos = downloadedVideos.localPaths;

      totalDownloadedImages += localImages.length;
      totalDownloadedVideos += localVideos.length;
      totalImageFailures += downloadedImages.failures;
      totalVideoFailures += downloadedVideos.failures;
    }

    const primaryImage = localImages[0] ?? FALLBACK_IMAGE;
    const useCaseItems = uniqueCompact([
      category ? `类目：${category}` : "",
      shippingLocation ? `发货地：${shippingLocation}` : "",
      moq ? `起订：${moq}` : "",
    ]);

    const highlightItems = uniqueCompact([
      price ? `参考价格：${price}` : "",
      price2 ? `销售信息：${price2}` : "",
      material ? `材质：${material}` : "",
    ]);

    const keywords = buildKeywords([name, category, material, shippingLocation, cleanFieldValue(record.title)]);

    products.push({
      slug,
      title: toLocalized(name),
      badge: toLocalized(category || "1688商品"),
      summary: toLocalized(summary || name),
      detail: toLocalized(detail || summary || name),
      moq: toLocalized(moq),
      materials: toLocalized(material),
      useCases: (useCaseItems.length > 0 ? useCaseItems : [name]).map((item) => toLocalized(item)),
      highlights: (highlightItems.length > 0 ? highlightItems : [name]).map((item) => toLocalized(item)),
      specs: buildSpecs({ price, moq, shippingLocation, offerId }),
      seoKeywords: {
        zh: keywords.length > 0 ? keywords : [name],
        en: keywords.length > 0 ? keywords : [name],
      },
      image: primaryImage,
      gallery: localImages,
      videos: localVideos,
      sourceUrl: itemPageLink,
      sourcePrice: price,
      sourceMinimumOrder: minimumOrder || price2,
      sourceShippingLocation: shippingLocation,
    });
  }

  const sourceRelativePath = toPosixRelative(projectRoot, args.input);
  const generatedAt = new Date().toISOString();

  const output = `import type { Product } from "@/content/site/shared";

// Auto-generated by scripts/import-1688-csv.mjs
// Source CSV: ${sourceRelativePath}
// Generated at: ${generatedAt}
export const importedProducts: Product[] = ${JSON.stringify(products, null, 2)} as Product[];

export const importedProductsMeta = {
  source: "${sourceRelativePath}",
  generatedAt: "${generatedAt}",
  totalProducts: ${products.length},
  totalDownloadedImages: ${totalDownloadedImages},
  totalDownloadedVideos: ${totalDownloadedVideos},
  totalDetectedVideoUrls: ${totalDetectedVideos},
  imageDownloadFailures: ${totalImageFailures},
  videoDownloadFailures: ${totalVideoFailures}
} as const;
`;

  await fs.writeFile(args.output, output, "utf8");

  process.stdout.write("\nImport complete.\n");
  process.stdout.write(`Products: ${products.length}\n`);
  process.stdout.write(`Downloaded images: ${totalDownloadedImages}, failures: ${totalImageFailures}\n`);
  process.stdout.write(`Detected videos: ${totalDetectedVideos}, downloaded videos: ${totalDownloadedVideos}, failures: ${totalVideoFailures}\n`);
  process.stdout.write(`Output: ${toPosixRelative(projectRoot, args.output)}\n`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
