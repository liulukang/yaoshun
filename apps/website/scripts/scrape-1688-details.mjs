#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const IMAGE_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif", "bmp", "svg"]);
const VIDEO_EXTENSIONS = new Set(["mp4", "mov", "m4v", "webm", "m3u8", "avi"]);
const PACKAGING_KEYWORDS = [
  /包装/,
  /箱装/,
  /外箱/,
  /单箱/,
  /装箱/,
  /毛重/,
  /净重/,
  /重量/,
  /体积/,
  /尺寸/,
  /规格/,
  /包装方式/,
  /包装清单/,
  /箱规/,
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const websiteRoot = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const args = {
    input: "",
    urls: "",
    outputRoot: path.join(websiteRoot, "data/1688-products"),
    delayMs: 5500,
    timeoutMs: 45000,
    max: 0,
    headless: true,
    requireLogin: true,
    skipDownload: false,
    storageState: "",
    saveStorageState: "",
    cookie: "",
    cookieFile: "",
    reprocessExisting: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--input" && next) {
      args.input = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--urls" && next) {
      args.urls = next;
      i += 1;
      continue;
    }
    if (token === "--output-root" && next) {
      args.outputRoot = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--delay-ms" && next) {
      const parsed = Number.parseInt(next, 10);
      args.delayMs = Number.isNaN(parsed) ? args.delayMs : Math.max(parsed, 5000);
      i += 1;
      continue;
    }
    if (token === "--timeout-ms" && next) {
      const parsed = Number.parseInt(next, 10);
      args.timeoutMs = Number.isNaN(parsed) ? args.timeoutMs : Math.max(parsed, 10000);
      i += 1;
      continue;
    }
    if (token === "--max" && next) {
      const parsed = Number.parseInt(next, 10);
      args.max = Number.isNaN(parsed) ? 0 : Math.max(parsed, 0);
      i += 1;
      continue;
    }
    if (token === "--headful") {
      args.headless = false;
      continue;
    }
    if (token === "--allow-anonymous") {
      args.requireLogin = false;
      continue;
    }
    if (token === "--skip-download") {
      args.skipDownload = true;
      continue;
    }
    if (token === "--storage-state" && next) {
      args.storageState = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--save-storage-state" && next) {
      args.saveStorageState = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--cookie" && next) {
      args.cookie = next;
      i += 1;
      continue;
    }
    if (token === "--cookie-file" && next) {
      args.cookieFile = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--reprocess-existing") {
      args.reprocessExisting = true;
      continue;
    }
  }

  return args;
}

function normalizeWhitespace(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function dedupe(values) {
  const set = new Set();
  const out = [];
  for (const value of values) {
    if (!value) continue;
    if (set.has(value)) continue;
    set.add(value);
    out.push(value);
  }
  return out;
}

function extractUrlsFromText(text) {
  if (!text) return [];
  const source = String(text);
  const absolute = source.match(/https?:\/\/[^\s"'<>\\]+/g) ?? [];
  const protocolRelative = source.match(/\/\/[a-z0-9.-]+\.[a-z]{2,}\/[^\s"'<>\\]+/gi) ?? [];
  return dedupe([
    ...absolute,
    ...protocolRelative.map((entry) => `https:${entry}`),
  ]).map((url) => url.replace(/[)\],]+$/, ""));
}

function extractOfferId(url) {
  const match = String(url).match(/\/offer\/(\d+)\.html/i);
  return match ? match[1] : "";
}

function getProductFolderByUrl(outputRoot, url) {
  const offerId = extractOfferId(url);
  if (!offerId) return "";
  return path.join(outputRoot, offerId);
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function isExistingSyncedProduct(outputRoot, url) {
  const folder = getProductFolderByUrl(outputRoot, url);
  if (!folder) return false;
  return pathExists(path.join(folder, "product.ts"));
}

function toSafeFileToken(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function classifyMediaUrl(url) {
  try {
    const normalized = new URL(url);
    const extMatch = normalized.pathname.toLowerCase().match(/\.([a-z0-9]+)$/);
    const ext = extMatch ? extMatch[1] : "";
    if (VIDEO_EXTENSIONS.has(ext)) return "video";
    if (IMAGE_EXTENSIONS.has(ext)) return "image";
    if (/video|\/video\//i.test(url)) return "video";
    return "unknown";
  } catch {
    return "unknown";
  }
}

function shouldIgnoreMediaUrl(url) {
  try {
    const parsed = new URL(url);
    const pathname = parsed.pathname.toLowerCase();

    if (/\.html?$/.test(pathname)) return true;
    if (/\/offer\/\d+\.html/.test(pathname)) return true;
    if (/favicon|sprite|iconfont/.test(pathname)) return true;
    if (/\.ico($|\?)/.test(pathname)) return true;
    if (/imgextra/.test(pathname) && /-2-tps-\d+-\d+\./.test(pathname)) return true;
    if (/-55-tps-\d+-\d+\./.test(pathname)) return true;

    const sizeMatch = pathname.match(/-tps-(\d+)-(\d+)\./);
    if (sizeMatch) {
      const width = Number.parseInt(sizeMatch[1], 10);
      const height = Number.parseInt(sizeMatch[2], 10);
      if (!Number.isNaN(width) && !Number.isNaN(height) && width <= 120 && height <= 120) {
        return true;
      }
    }

    return false;
  } catch {
    return true;
  }
}

function normalizeCandidateUrl(candidate, baseUrl) {
  if (!candidate) return "";
  const cleaned = String(candidate).trim().replace(/^["']|["']$/g, "");
  if (!cleaned) return "";
  if (/^data:/i.test(cleaned)) return "";
  if (/^javascript:/i.test(cleaned)) return "";
  if (cleaned.startsWith("#")) return "";

  try {
    const finalUrl = cleaned.startsWith("//")
      ? new URL(`https:${cleaned}`)
      : new URL(cleaned, baseUrl);
    finalUrl.hash = "";
    return finalUrl.toString();
  } catch {
    return "";
  }
}

function looksLikeLoginText(text) {
  const t = normalizeWhitespace(text);
  if (!t) return false;
  return [
    "请先登录",
    "登录后可见",
    "登录后查看",
    "扫码登录",
    "密码登录",
    "手机验证码登录",
    "账号登录",
  ].some((keyword) => t.includes(keyword));
}

function normalizePairs(pairs) {
  const seen = new Set();
  const out = [];

  for (const item of pairs) {
    if (!item) continue;
    const name = normalizeWhitespace(item.name);
    const value = normalizeWhitespace(item.value);
    if (!name || !value) continue;
    const key = `${name}__${value}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name, value });
  }

  return out;
}

function splitAttributesAndPackaging(pairs) {
  const attributes = [];
  const packaging = [];

  for (const pair of pairs) {
    const isPackaging = PACKAGING_KEYWORDS.some((rule) => rule.test(pair.name));
    if (isPackaging) {
      packaging.push(pair);
      continue;
    }
    attributes.push(pair);
  }

  return { attributes, packaging };
}

function inferExt(url, contentType, kind) {
  const fromType = (() => {
    const ct = String(contentType ?? "").toLowerCase();
    if (ct.includes("image/jpeg")) return "jpg";
    if (ct.includes("image/png")) return "png";
    if (ct.includes("image/webp")) return "webp";
    if (ct.includes("image/gif")) return "gif";
    if (ct.includes("image/avif")) return "avif";
    if (ct.includes("image/svg")) return "svg";
    if (ct.includes("video/mp4")) return "mp4";
    if (ct.includes("video/webm")) return "webm";
    if (ct.includes("application/vnd.apple.mpegurl")) return "m3u8";
    if (ct.includes("application/x-mpegurl")) return "m3u8";
    return "";
  })();

  if (fromType) return fromType;

  try {
    const pathname = new URL(url).pathname.toLowerCase();
    const match = pathname.match(/\.([a-z0-9]+)$/);
    if (match?.[1]) return match[1];
  } catch {
    // noop
  }

  return kind === "video" ? "mp4" : "jpg";
}

async function readInputUrls(args) {
  if (args.urls) {
    const directUrls = parseFlexibleUrls(args.urls);
    if (directUrls.length > 0) {
      return args.max > 0 ? directUrls.slice(0, args.max) : directUrls;
    }
  }

  if (!args.input) {
    throw new Error("Missing URL source. Use --input <file> or --urls '<json-array>'.");
  }

  const raw = await fs.readFile(args.input, "utf8");
  const urls = parseFlexibleUrls(raw);
  if (urls.length === 0) {
    throw new Error(`No URLs found in input file: ${args.input}`);
  }
  return args.max > 0 ? urls.slice(0, args.max) : urls;
}

function parseFlexibleUrls(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return dedupe(
        parsed
          .map((item) => normalizeWhitespace(item))
          .filter((item) => /^https?:\/\/detail\.1688\.com\/offer\/\d+\.html/i.test(item))
      );
    }
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.urls)) {
      return dedupe(
        parsed.urls
          .map((item) => normalizeWhitespace(item))
          .filter((item) => /^https?:\/\/detail\.1688\.com\/offer\/\d+\.html/i.test(item))
      );
    }
  } catch {
    // not JSON
  }

  const discovered = extractUrlsFromText(text);
  return dedupe(discovered.filter((item) => /^https?:\/\/detail\.1688\.com\/offer\/\d+\.html/i.test(item)));
}

async function readCookiePayload(args) {
  if (args.cookie) {
    return normalizeWhitespace(args.cookie);
  }
  if (!args.cookieFile) {
    return "";
  }
  const raw = await fs.readFile(args.cookieFile, "utf8");
  return raw.trim();
}

function parseCookieHeader(cookieHeader) {
  const cookies = [];
  const pairs = String(cookieHeader)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);

  for (const pair of pairs) {
    const index = pair.indexOf("=");
    if (index <= 0) continue;
    const name = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    if (!name) continue;

    cookies.push(
      {
        name,
        value,
        domain: ".1688.com",
        path: "/",
        secure: true,
      },
      {
        name,
        value,
        domain: "detail.1688.com",
        path: "/",
        secure: true,
      }
    );
  }

  return cookies;
}

async function injectCookies(context, cookiePayload) {
  const payload = cookiePayload.trim();
  if (!payload) return 0;

  try {
    const parsed = JSON.parse(payload);
    if (Array.isArray(parsed)) {
      const normalized = parsed
        .filter((item) => item && typeof item === "object" && item.name && item.value)
        .map((item) => ({
          name: String(item.name),
          value: String(item.value),
          domain: String(item.domain ?? ".1688.com"),
          path: String(item.path ?? "/"),
          secure: Boolean(item.secure ?? true),
          httpOnly: Boolean(item.httpOnly ?? false),
          expires: typeof item.expires === "number" ? item.expires : undefined,
          sameSite: ["Strict", "Lax", "None"].includes(item.sameSite) ? item.sameSite : undefined,
        }));

      if (normalized.length > 0) {
        await context.addCookies(normalized);
        return normalized.length;
      }
    }
  } catch {
    // try cookie-header mode below
  }

  const headerCookies = parseCookieHeader(payload);
  if (headerCookies.length > 0) {
    await context.addCookies(headerCookies);
  }
  return headerCookies.length;
}

async function autoScrollForLazyLoad(page) {
  await page.waitForTimeout(1000);

  let stableCount = 0;
  let previousHeight = 0;

  for (let i = 0; i < 32; i += 1) {
    const [height, y, viewport] = await page.evaluate(() => [
      Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
      window.scrollY,
      window.innerHeight,
    ]);

    await page.evaluate(() => window.scrollBy(0, Math.max(window.innerHeight * 0.85, 700)));
    await page.waitForTimeout(420);

    const reachedBottom = y + viewport >= height - 4;
    if (height === previousHeight || reachedBottom) {
      stableCount += 1;
    } else {
      stableCount = 0;
    }
    previousHeight = height;
    if (stableCount >= 3) break;
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
}

async function collectSnapshot(page) {
  const main = await page.evaluate(() => {
    const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
    const dedupe = (values) => {
      const set = new Set();
      const out = [];
      for (const value of values) {
        const text = normalize(value);
        if (!text) continue;
        if (set.has(text)) continue;
        set.add(text);
        out.push(text);
      }
      return out;
    };
    const extractStyleUrls = (styleText) => {
      const result = [];
      const hits = String(styleText ?? "").match(/url\(([^)]+)\)/g) ?? [];
      for (const hit of hits) {
        result.push(hit.replace(/^url\(/, "").replace(/\)$/, "").trim().replace(/^['"]|['"]$/g, ""));
      }
      return result;
    };
    const collectMediaFromSelector = (selector) => {
      const list = [];
      for (const node of document.querySelectorAll(selector)) {
        for (const attr of [
          "src",
          "data-src",
          "data-src-retina",
          "data-lazy-src",
          "data-ks-lazyload",
          "data-original",
          "data-img",
          "data-url",
          "poster",
          "href",
        ]) {
          const value = node.getAttribute?.(attr);
          if (value) list.push(value);
        }

        const srcset = node.getAttribute?.("srcset");
        if (srcset) {
          const chunks = String(srcset)
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
          for (const chunk of chunks) {
            const first = chunk.split(/\s+/)[0];
            if (first) list.push(first);
          }
        }

        const styleUrls = extractStyleUrls(node.getAttribute?.("style"));
        for (const styleUrl of styleUrls) {
          list.push(styleUrl);
        }
      }
      return dedupe(list);
    };

    const scriptText = Array.from(document.querySelectorAll("script"))
      .map((node) => node.textContent ?? "")
      .join("\n");
    const scriptMediaCandidates = [];

    const keyedMediaPattern = /"(fullPathImageURI|coverUrl|ios|android|videoUrl|videoURI|videoPlayUrl)"\s*:\s*"([^"]+)"/g;
    let keyedMatch = keyedMediaPattern.exec(scriptText);
    while (keyedMatch) {
      scriptMediaCandidates.push(keyedMatch[2]);
      keyedMatch = keyedMediaPattern.exec(scriptText);
    }

    const fallbackMediaPattern = /https?:\/\/[^\s"'<>\\]+?\.(?:jpg|jpeg|png|webp|gif|avif|bmp|svg|mp4|mov|m4v|webm|m3u8)(?:\?[^\s"'<>\\]*)?/gi;
    const fallbackMediaMatches = scriptText.match(fallbackMediaPattern) ?? [];
    scriptMediaCandidates.push(...fallbackMediaMatches);

    const relativeImagePattern = /"imageURI"\s*:\s*"([^"]+)"/g;
    let relativeImageMatch = relativeImagePattern.exec(scriptText);
    while (relativeImageMatch) {
      const candidate = relativeImageMatch[1];
      if (candidate.startsWith("img/")) {
        scriptMediaCandidates.push(`https://cbu01.alicdn.com/${candidate}`);
      }
      relativeImageMatch = relativeImagePattern.exec(scriptText);
    }

    const attributePairs = [];
    for (const row of document.querySelectorAll("#productAttributes table tr")) {
      const labels = Array.from(row.querySelectorAll("th.ant-descriptions-item-label, th"));
      const values = Array.from(row.querySelectorAll("td.ant-descriptions-item-content, td"));
      const pairCount = Math.min(labels.length, values.length);
      for (let index = 0; index < pairCount; index += 1) {
        const name = normalize(labels[index].textContent);
        const value = normalize(values[index].textContent);
        if (name && value) {
          attributePairs.push({ name, value });
        }
      }
    }

    const packagingPairs = [];
    for (const table of document.querySelectorAll("#productPackInfo table")) {
      const headers = Array.from(table.querySelectorAll("thead th"))
        .map((node) => normalize(node.textContent))
        .filter(Boolean);
      const bodyRows = Array.from(table.querySelectorAll("tbody tr"));

      if (headers.length > 0 && bodyRows.length > 0) {
        for (const row of bodyRows) {
          const cells = Array.from(row.querySelectorAll("td"))
            .map((node) => normalize(node.textContent))
            .filter(Boolean);
          if (cells.length === 0) continue;
          for (let i = 0; i < Math.min(headers.length, cells.length); i += 1) {
            packagingPairs.push({ name: headers[i], value: cells[i] });
          }
        }
      } else {
        for (const row of table.querySelectorAll("tr")) {
          const cells = Array.from(row.querySelectorAll("th, td"))
            .map((node) => normalize(node.textContent))
            .filter(Boolean);
          if (cells.length >= 2) {
            packagingPairs.push({ name: cells[0], value: cells.slice(1).join(" ") });
          }
        }
      }
    }

    const priceSourceTexts = [
      normalize(document.querySelector("#mainPrice")?.textContent),
      ...Array.from(document.querySelectorAll("#skuSelection .item-price-stock"))
        .map((node) => normalize(node.textContent))
        .filter(Boolean),
    ];
    const priceTokenMatches = [];
    for (const item of priceSourceTexts) {
      const matches = item.match(/[¥￥]\s*\d+(?:\.\d+)?(?:\s*起)?/g) ?? [];
      priceTokenMatches.push(...matches);
    }
    const priceTexts = dedupe([
      ...priceTokenMatches.map((item) => normalize(item)),
      ...priceSourceTexts.filter((item) => /[¥￥]\s*\d/.test(item)),
    ]).slice(0, 40);

    const titleCandidates = dedupe([
      normalize(document.querySelector("#productTitle h1")?.textContent),
      normalize(document.title),
      normalize(document.querySelector("meta[property='og:title']")?.getAttribute("content")),
      normalize(document.querySelector("meta[name='keywords']")?.getAttribute("content")),
    ]).slice(0, 20);

    const summarySections = [
      normalize(document.querySelector("#productTitle")?.innerText),
      normalize(document.querySelector("#mainPrice")?.innerText),
      normalize(document.querySelector("#shippingServices")?.innerText),
      normalize(document.querySelector("#productAttributes")?.innerText),
      normalize(document.querySelector("#productPackInfo")?.innerText),
      normalize(document.querySelector("#description .collapse-body")?.innerText),
    ].filter(Boolean);

    return {
      url: location.href,
      titleCandidates,
      metaDescription: normalize(document.querySelector("meta[name='description']")?.getAttribute("content")),
      bodyTextSample: normalize(summarySections.join(" ")).slice(0, 8000),
      priceTexts,
      galleryMediaCandidates: collectMediaFromSelector(
        "#gallery img, #gallery source, #gallery video, #gallery [style*='background-image'], #gallery [data-src], #gallery [data-original], #gallery [poster]"
      ).slice(0, 240),
      descriptionMediaCandidates: collectMediaFromSelector(
        "#description img, #description source, #description video, #description [style*='background-image'], #description [data-src], #description [data-original], #description [poster]"
      ).slice(0, 260),
      scriptMediaCandidates: dedupe(scriptMediaCandidates).slice(0, 300),
      attributePairs: dedupe(
        attributePairs.map((pair) => `${pair.name}:::${pair.value}`)
      ).map((pair) => {
        const [name, value] = pair.split(":::");
        return { name, value };
      }).slice(0, 240),
      packagingPairs: dedupe(
        packagingPairs.map((pair) => `${pair.name}:::${pair.value}`)
      ).map((pair) => {
        const [name, value] = pair.split(":::");
        return { name, value };
      }).slice(0, 120),
    };
  });

  const frameSnapshots = [];
  const frames = page.frames().filter((frame) => frame !== page.mainFrame());
  for (const frame of frames) {
    try {
      const data = await frame.evaluate(() => {
        const normalize = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
        const dedupe = (values) => {
          const set = new Set();
          const out = [];
          for (const value of values) {
            const text = normalize(value);
            if (!text) continue;
            if (set.has(text)) continue;
            set.add(text);
            out.push(text);
          }
          return out;
        };
        const mediaCandidates = [];
        for (const node of document.querySelectorAll("img, source, video, [data-src], [data-original], [poster], [style*='background-image']")) {
          for (const attr of [
            "src",
            "data-src",
            "data-lazy-src",
            "data-original",
            "data-img",
            "data-url",
            "poster",
            "href",
            "srcset",
          ]) {
            const value = node.getAttribute?.(attr);
            if (!value) continue;
            mediaCandidates.push(value);
            if (attr === "srcset") {
              const pieces = String(value)
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
              for (const piece of pieces) {
                const first = piece.split(/\s+/)[0];
                if (first) mediaCandidates.push(first);
              }
            }
          }

          const styleText = node.getAttribute?.("style") ?? "";
          const styleUrls = styleText.match(/url\(([^)]+)\)/g) ?? [];
          for (const styleUrl of styleUrls) {
            mediaCandidates.push(
              styleUrl.replace(/^url\(/, "").replace(/\)$/, "").trim().replace(/^['"]|['"]$/g, "")
            );
          }
        }

        return {
          title: normalize(document.title),
          textSample: normalize(document.body?.innerText ?? "").slice(0, 3200),
          mediaCandidates: dedupe(mediaCandidates).slice(0, 300),
        };
      });

      frameSnapshots.push({
        url: frame.url(),
        ...data,
      });
    } catch {
      frameSnapshots.push({
        url: frame.url(),
        title: "",
        textSample: "",
        mediaCandidates: [],
      });
    }
  }

  return { main, frames: frameSnapshots };
}

async function dumpFrameHtml(page, folder) {
  const detailFolder = path.join(folder, "detail-frames");
  await fs.mkdir(detailFolder, { recursive: true });

  const htmlFiles = [];
  const frames = page.frames().filter((frame) => frame !== page.mainFrame());
  for (let i = 0; i < frames.length; i += 1) {
    const frame = frames[i];
    try {
      const html = await frame.content();
      if (!normalizeWhitespace(html)) continue;
      const filename = `frame-${String(i + 1).padStart(2, "0")}.html`;
      await fs.writeFile(path.join(detailFolder, filename), html, "utf8");
      htmlFiles.push(`./detail-frames/${filename}`);
    } catch {
      // ignore non-accessible frame
    }
  }

  return htmlFiles;
}

function buildMediaPool(snapshot) {
  const remoteImageUrlMap = new Map();
  const remoteVideoUrls = [];

  const imageVariantKey = (url) => {
    return url
      .replace(/\.search(?=\.[a-z0-9]+(?:$|\?))/i, "")
      .replace(/\.summ(?=\.[a-z0-9]+(?:$|\?))/i, "")
      .replace(/\.220x220(?=\.[a-z0-9]+(?:$|\?))/i, "")
      .replace(/\.310x310(?=\.[a-z0-9]+(?:$|\?))/i, "")
      .replace(/\.jpg_\.webp(?=$|\?)/i, ".jpg");
  };
  const imageScore = (url) => {
    let score = 0;
    if (/fullpath|\/img\/ibank\//i.test(url)) score += 4;
    if (/\.search\.|\.summ\.|\.220x220\.|\.310x310\./i.test(url)) score -= 2;
    if (/imgextra/i.test(url)) score -= 2;
    return score;
  };

  const consume = (candidate, baseUrl) => {
    const normalized = normalizeCandidateUrl(candidate, baseUrl);
    if (!normalized) return;
    if (shouldIgnoreMediaUrl(normalized)) return;

    const kind = classifyMediaUrl(normalized);
    if (kind === "video") {
      remoteVideoUrls.push(normalized);
      return;
    }
    if (kind === "image") {
      const key = imageVariantKey(normalized);
      const existing = remoteImageUrlMap.get(key);
      if (!existing || imageScore(normalized) > imageScore(existing)) {
        remoteImageUrlMap.set(key, normalized);
      }
    }
  };

  for (const value of snapshot.main.scriptMediaCandidates) {
    consume(value, snapshot.main.url);
  }

  for (const value of snapshot.main.galleryMediaCandidates) {
    consume(value, snapshot.main.url);
  }

  for (const value of snapshot.main.descriptionMediaCandidates) {
    consume(value, snapshot.main.url);
  }

  for (const frame of snapshot.frames) {
    for (const value of frame.mediaCandidates) {
      consume(value, frame.url || snapshot.main.url);
    }
  }

  return {
    images: dedupe([...remoteImageUrlMap.values()]).slice(0, 220),
    videos: dedupe(remoteVideoUrls).slice(0, 80),
  };
}

function buildAttributePool(snapshot) {
  return {
    attributes: normalizePairs(snapshot.main.attributePairs).slice(0, 300),
    packaging: normalizePairs(snapshot.main.packagingPairs).slice(0, 120),
  };
}

function pickTitle(snapshot, fallbackUrl) {
  const offerId = extractOfferId(fallbackUrl);
  for (const candidate of snapshot.main.titleCandidates) {
    const text = normalizeWhitespace(candidate);
    if (!text) continue;
    if (/1688/.test(text) && text.length < 8) continue;
    return text;
  }
  return offerId ? `product-${offerId}` : "product";
}

async function downloadOne(context, url, referer, outputPath) {
  const response = await context.request.get(url, {
    timeout: 25000,
    headers: {
      "user-agent": USER_AGENT,
      accept: "*/*",
      referer,
    },
  });

  if (!response.ok()) {
    throw new Error(`HTTP ${response.status()}`);
  }

  const buffer = await response.body();
  const headers = response.headers();
  const contentType = headers["content-type"] ?? "";
  await fs.writeFile(outputPath, buffer);
  return { size: buffer.length, contentType };
}

async function downloadMediaGroup({
  context,
  urls,
  kind,
  productFolder,
  referer,
}) {
  const folder = kind === "image"
    ? path.join(productFolder, "media/images")
    : path.join(productFolder, "media/videos");
  await fs.mkdir(folder, { recursive: true });

  const downloaded = [];
  const failed = [];

  for (let i = 0; i < urls.length; i += 1) {
    const remoteUrl = urls[i];
    const token = String(i + 1).padStart(3, "0");

    let done = false;
    let lastError = "";
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        const ext = inferExt(remoteUrl, "", kind);
        const filename = `${kind}-${token}.${ext}`;
        const outputPath = path.join(folder, filename);
        const { size, contentType } = await downloadOne(context, remoteUrl, referer, outputPath);

        if (contentType && !contentType.includes("text/html")) {
          const realExt = inferExt(remoteUrl, contentType, kind);
          if (realExt !== ext) {
            const renamed = `${kind}-${token}.${realExt}`;
            await fs.rename(outputPath, path.join(folder, renamed));
            downloaded.push({
              remoteUrl,
              localPath: `./media/${kind === "image" ? "images" : "videos"}/${renamed}`,
              contentType,
              size,
            });
          } else {
            downloaded.push({
              remoteUrl,
              localPath: `./media/${kind === "image" ? "images" : "videos"}/${filename}`,
              contentType,
              size,
            });
          }
          done = true;
          break;
        }

        lastError = `Unexpected content-type: ${contentType || "unknown"}`;
        await fs.rm(outputPath, { force: true });
      } catch (error) {
        lastError = error instanceof Error ? error.message : String(error);
      }

      if (attempt < 3) {
        await sleep(600 * attempt);
      }
    }

    if (!done) {
      failed.push({ remoteUrl, reason: lastError || "download failed" });
    }
  }

  return { downloaded, failed };
}

async function ensureLoginIfRequired(page, requireLogin) {
  const currentUrl = page.url();
  const bodyText = normalizeWhitespace(await page.locator("body").innerText().catch(() => ""));

  const loginByUrl = /login|passport|signin/i.test(currentUrl);
  const loginByText = looksLikeLoginText(bodyText);

  if ((loginByUrl || loginByText) && requireLogin) {
    throw new Error("Detected unauthenticated state. Please provide logged-in cookies/storageState.");
  }
}

function buildTsModule(product) {
  return `/* eslint-disable */
export interface ProductArchive {
  offerId: string;
  sourceUrl: string;
  scrapedAt: string;
  title: string;
  metaDescription: string;
  priceTexts: string[];
  summaryText: string;
  attributes: Array<{ name: string; value: string }>;
  packaging: Array<{ name: string; value: string }>;
  media: {
    images: string[];
    videos: string[];
    imageDownloads: Array<{
      remoteUrl: string;
      localPath: string;
      contentType: string;
      size: number;
    }>;
    videoDownloads: Array<{
      remoteUrl: string;
      localPath: string;
      contentType: string;
      size: number;
    }>;
    imageDownloadFailures: Array<{ remoteUrl: string; reason: string }>;
    videoDownloadFailures: Array<{ remoteUrl: string; reason: string }>;
  };
  snapshots: {
    mainHtml: string;
    frameHtmlFiles: string[];
  };
}

export const productArchive: ProductArchive = ${JSON.stringify(product, null, 2)} as const;

export default productArchive;
`;
}

async function scrapeOne({
  context,
  url,
  outputRoot,
  timeoutMs,
  skipDownload,
  requireLogin,
}) {
  const offerId = extractOfferId(url);
  const folderName = offerId ? offerId : toSafeFileToken(url).slice(0, 64) || "unknown-offer";
  const productFolder = path.join(outputRoot, folderName);

  await fs.rm(productFolder, { recursive: true, force: true });
  await fs.mkdir(productFolder, { recursive: true });

  const page = await context.newPage();
  await page.setExtraHTTPHeaders({
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
  });

  try {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: timeoutMs,
    });
    await page.waitForTimeout(1200);
    await ensureLoginIfRequired(page, requireLogin);
    await autoScrollForLazyLoad(page);
    await page.waitForLoadState("networkidle", { timeout: 10000 }).catch(() => {});
    await ensureLoginIfRequired(page, requireLogin);

    const html = await page.content();
    await fs.writeFile(path.join(productFolder, "page.html"), html, "utf8");

    const snapshot = await collectSnapshot(page);
    const frameHtmlFiles = await dumpFrameHtml(page, productFolder);

    const mediaPool = buildMediaPool(snapshot);
    const attributePool = buildAttributePool(snapshot);
    const classifiedPairs = splitAttributesAndPackaging([
      ...attributePool.attributes,
      ...attributePool.packaging,
    ]);
    const attributes = classifiedPairs.attributes;
    const packaging = normalizePairs([
      ...attributePool.packaging,
      ...classifiedPairs.packaging,
    ]);
    const title = pickTitle(snapshot, url);

    const imageUrls = mediaPool.images;
    const videoUrls = mediaPool.videos;

    let imageDownloads = [];
    let videoDownloads = [];
    let imageDownloadFailures = [];
    let videoDownloadFailures = [];

    if (!skipDownload) {
      const images = await downloadMediaGroup({
        context,
        urls: imageUrls,
        kind: "image",
        productFolder,
        referer: page.url(),
      });
      const videos = await downloadMediaGroup({
        context,
        urls: videoUrls,
        kind: "video",
        productFolder,
        referer: page.url(),
      });
      imageDownloads = images.downloaded;
      videoDownloads = videos.downloaded;
      imageDownloadFailures = images.failed;
      videoDownloadFailures = videos.failed;
    }

    const productArchive = {
      offerId: offerId || "",
      sourceUrl: url,
      scrapedAt: new Date().toISOString(),
      title,
      metaDescription: snapshot.main.metaDescription || "",
      priceTexts: snapshot.main.priceTexts,
      summaryText: snapshot.main.bodyTextSample,
      attributes,
      packaging,
      media: {
        images: imageUrls,
        videos: videoUrls,
        imageDownloads,
        videoDownloads,
        imageDownloadFailures,
        videoDownloadFailures,
      },
      snapshots: {
        mainHtml: "./page.html",
        frameHtmlFiles,
      },
    };

    await fs.writeFile(path.join(productFolder, "product.ts"), buildTsModule(productArchive), "utf8");
    await fs.writeFile(path.join(productFolder, "raw.snapshot.json"), JSON.stringify(snapshot, null, 2), "utf8");

    return {
      url,
      offerId: offerId || "",
      folder: productFolder,
      title,
      imageCount: imageUrls.length,
      videoCount: videoUrls.length,
      downloadedImages: imageDownloads.length,
      downloadedVideos: videoDownloads.length,
      failedImages: imageDownloadFailures.length,
      failedVideos: videoDownloadFailures.length,
    };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const urls = await readInputUrls(args);
  await fs.mkdir(args.outputRoot, { recursive: true });

  const browser = await chromium.launch({ headless: args.headless });
  const context = await browser.newContext({
    userAgent: USER_AGENT,
    locale: "zh-CN",
    viewport: { width: 1440, height: 1100 },
    storageState: args.storageState || undefined,
  });

  try {
    const cookiePayload = await readCookiePayload(args);
    if (cookiePayload) {
      const added = await injectCookies(context, cookiePayload);
      process.stdout.write(`Loaded cookies: ${added}\n`);
    }

    if (args.saveStorageState) {
      const temp = await context.newPage();
      await temp.goto("https://detail.1688.com/", { waitUntil: "domcontentloaded", timeout: 30000 });
      await temp.waitForTimeout(1000);
      await context.storageState({ path: args.saveStorageState });
      await temp.close();
      process.stdout.write(`Storage state saved to: ${args.saveStorageState}\n`);
    }

    const results = [];
    let visitedCount = 0;

    for (let i = 0; i < urls.length; i += 1) {
      const url = urls[i];

      if (!args.reprocessExisting && await isExistingSyncedProduct(args.outputRoot, url)) {
        const offerId = extractOfferId(url);
        const folder = getProductFolderByUrl(args.outputRoot, url);
        results.push({
          status: "skipped_existing",
          url,
          offerId,
          folder,
          reason: "Existing product.ts detected",
        });
        process.stdout.write(`\n[${i + 1}/${urls.length}] ${url}\n`);
        process.stdout.write("  skipped: existing synced result\n");
        continue;
      }

      if (visitedCount > 0) {
        await sleep(args.delayMs);
      }

      process.stdout.write(`\n[${i + 1}/${urls.length}] ${url}\n`);
      try {
        const result = await scrapeOne({
          context,
          url,
          outputRoot: args.outputRoot,
          timeoutMs: args.timeoutMs,
          skipDownload: args.skipDownload,
          requireLogin: args.requireLogin,
        });
        results.push({ status: "ok", ...result });
        process.stdout.write(
          `  done: images ${result.downloadedImages}/${result.imageCount}, videos ${result.downloadedVideos}/${result.videoCount}\n`
        );
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        results.push({ status: "failed", url, reason });
        process.stdout.write(`  failed: ${reason}\n`);
      }
      visitedCount += 1;
    }

    const report = {
      generatedAt: new Date().toISOString(),
      total: results.length,
      success: results.filter((item) => item.status === "ok").length,
      failed: results.filter((item) => item.status === "failed").length,
      skippedExisting: results.filter((item) => item.status === "skipped_existing").length,
      delayMs: args.delayMs,
      requireLogin: args.requireLogin,
      reprocessExisting: args.reprocessExisting,
      outputRoot: args.outputRoot,
      results,
    };

    await fs.writeFile(path.join(args.outputRoot, "report.json"), JSON.stringify(report, null, 2), "utf8");
    process.stdout.write(`\nReport: ${path.join(args.outputRoot, "report.json")}\n`);
  } finally {
    await context.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
