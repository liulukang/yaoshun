#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const websiteRoot = path.resolve(__dirname, "..");

const DEFAULT_INPUT = path.join(websiteRoot, "scripts/inputs/1688-offers-2026-04-11.json");
const DEFAULT_OUTPUT_ROOT = path.join(websiteRoot, "data/1688-products");
const DEFAULT_STATUS_CSV = path.join(websiteRoot, "scripts/outputs/1688-sync-status.csv");
const SNAPSHOT_FILENAME = "product.json";
const LEGACY_SNAPSHOT_FILENAMES = ["product.snapshot.json", "snapshot.json"];
const MODULES = ["toys", "tubes", "equipment"];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT,
    outputRoot: DEFAULT_OUTPUT_ROOT,
    statusCsv: DEFAULT_STATUS_CSV,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    const next = argv[i + 1];

    if (token === "--input" && next) {
      args.input = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--output-root" && next) {
      args.outputRoot = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
    if (token === "--status-csv" && next) {
      args.statusCsv = path.resolve(process.cwd(), next);
      i += 1;
      continue;
    }
  }

  return args;
}

function normalizeWhitespace(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function localizedToString(value) {
  if (typeof value === "string") return normalizeWhitespace(value);
  if (value && typeof value === "object") {
    return normalizeWhitespace(value.zh ?? value["zh-CN"] ?? value.cn ?? value.en ?? value["en-US"] ?? value.us ?? "");
  }
  return "";
}

function dedupe(values) {
  const seen = new Set();
  const out = [];
  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
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

function parseFlexibleUrls(raw) {
  const text = String(raw ?? "").trim();
  if (!text) return [];

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return dedupe(parsed.map((item) => normalizeWhitespace(item)));
    }
    if (parsed && typeof parsed === "object" && Array.isArray(parsed.urls)) {
      return dedupe(parsed.urls.map((item) => normalizeWhitespace(item)));
    }
  } catch {
    // not JSON
  }

  return dedupe(extractUrlsFromText(text));
}

function extractOfferId(url) {
  const match = String(url).match(/\/offer\/(\d+)\.html/i);
  return match ? match[1] : "";
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function countFiles(directory) {
  try {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    return entries.filter((entry) => entry.isFile()).length;
  } catch {
    return 0;
  }
}

async function getMtimeIso(targetPath) {
  try {
    const stats = await fs.stat(targetPath);
    return stats.mtime.toISOString();
  } catch {
    return "";
  }
}

async function resolveSnapshotPath(baseDir) {
  const candidates = [SNAPSHOT_FILENAME, ...LEGACY_SNAPSHOT_FILENAMES].map((name) => path.join(baseDir, name));
  for (const candidate of candidates) {
    if (await pathExists(candidate)) return candidate;
  }
  return "";
}

async function resolveOfferFolder(outputRoot, offerId) {
  const rootCandidate = path.join(outputRoot, offerId);
  if (await pathExists(rootCandidate)) {
    return {
      folder: rootCandidate,
      module: "",
    };
  }

  for (const moduleName of MODULES) {
    const moduleCandidate = path.join(outputRoot, moduleName, offerId);
    if (await pathExists(moduleCandidate)) {
      return {
        folder: moduleCandidate,
        module: moduleName,
      };
    }
  }

  return {
    folder: "",
    module: "",
  };
}

async function readSnapshotSummary(snapshotPath) {
  try {
    const raw = await fs.readFile(snapshotPath, "utf8");
    const parsed = JSON.parse(raw);

    if (parsed && typeof parsed === "object") {
      const tags = Array.isArray(parsed.tags)
        ? parsed.tags
          .map((item) => {
            if (typeof item === "string") return normalizeWhitespace(item);
            if (item && typeof item === "object") return normalizeWhitespace(item.key ?? item.zh ?? item.en ?? "");
            return "";
          })
          .filter(Boolean)
        : normalizeWhitespace(parsed.tag)
          ? [normalizeWhitespace(parsed.tag)]
          : [];
      return {
        title: localizedToString(parsed.title),
        tags,
        priority: Number(parsed.priority || 0),
        module: normalizeWhitespace(parsed.module),
      };
    }
  } catch {
    // ignore
  }

  return {
    title: "",
    tags: [],
    priority: 0,
    module: "",
  };
}

function formatCsvCell(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
    return `"${text.replace(/\"/g, "\"\"")}"`;
  }
  return text;
}

function toCsv(rows) {
  const headers = [
    "index",
    "offerId",
    "url",
    "status",
    "needsSync",
    "module",
    "tags",
    "priority",
    "title",
    "imageFiles",
    "videoFiles",
    "hasSnapshotJson",
    "hasPageHtml",
    "hasProductTs",
    "lastUpdated",
    "folder",
  ];

  const lines = [headers.join(",")];
  for (const row of rows) {
    const line = [
      row.index,
      row.offerId,
      row.url,
      row.status,
      row.needsSync,
      row.module,
      row.tags,
      row.priority,
      row.title,
      row.imageFiles,
      row.videoFiles,
      row.hasSnapshotJson,
      row.hasPageHtml,
      row.hasProductTs,
      row.lastUpdated,
      row.folder,
    ].map(formatCsvCell).join(",");
    lines.push(line);
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  await fs.mkdir(args.outputRoot, { recursive: true });
  await fs.mkdir(path.dirname(args.statusCsv), { recursive: true });

  const raw = await fs.readFile(args.input, "utf8");
  const urls = parseFlexibleUrls(raw).filter((url) => /^https?:\/\/detail\.1688\.com\/offer\/\d+\.html/i.test(url));

  const rows = [];

  for (let index = 0; index < urls.length; index += 1) {
    const url = urls[index];
    const offerId = extractOfferId(url);

    const resolved = await resolveOfferFolder(args.outputRoot, offerId);
    const folder = resolved.folder;

    const effectiveSnapshotPath = folder ? await resolveSnapshotPath(folder) : "";
    const productTsPath = folder ? path.join(folder, "product.ts") : "";
    const pageHtmlPath = folder ? path.join(folder, "page.html") : "";
    const imagesDir = folder
      ? await pathExists(path.join(folder, "images"))
        ? path.join(folder, "images")
        : path.join(folder, "media/images")
      : "";
    const videosDir = folder
      ? await pathExists(path.join(folder, "videos"))
        ? path.join(folder, "videos")
        : path.join(folder, "media/videos")
      : "";

    const hasFolder = Boolean(folder);
    const hasSnapshotJson = effectiveSnapshotPath ? await pathExists(effectiveSnapshotPath) : false;
    const hasProductTs = productTsPath ? await pathExists(productTsPath) : false;
    const hasPageHtml = pageHtmlPath ? await pathExists(pageHtmlPath) : false;

    const imageFiles = hasFolder ? await countFiles(imagesDir) : 0;
    const videoFiles = hasFolder ? await countFiles(videosDir) : 0;

    const snapshotSummary = hasSnapshotJson
      ? await readSnapshotSummary(effectiveSnapshotPath)
      : { title: "", tags: [], priority: 0, module: "" };

    const moduleName = snapshotSummary.module || resolved.module;

    let status = "pending";
    if (hasSnapshotJson && imageFiles > 0) {
      status = "synced";
    } else if (hasFolder) {
      status = "partial";
    }

    const lastUpdated = hasSnapshotJson
      ? await getMtimeIso(effectiveSnapshotPath)
      : hasFolder
        ? await getMtimeIso(folder)
        : "";

    rows.push({
      index: index + 1,
      offerId,
      url,
      status,
      needsSync: status !== "synced",
      module: moduleName,
      tags: snapshotSummary.tags.join("|"),
      priority: snapshotSummary.priority,
      title: snapshotSummary.title,
      imageFiles,
      videoFiles,
      hasSnapshotJson,
      hasPageHtml,
      hasProductTs,
      lastUpdated,
      folder: folder ? path.relative(websiteRoot, folder).replace(/\\/g, "/") : "",
    });
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    input: path.relative(websiteRoot, args.input),
    outputRoot: path.relative(websiteRoot, args.outputRoot),
    total: rows.length,
    synced: rows.filter((row) => row.status === "synced").length,
    partial: rows.filter((row) => row.status === "partial").length,
    pending: rows.filter((row) => row.status === "pending").length,
    needsSync: rows.filter((row) => row.needsSync).length,
    modules: {
      toys: rows.filter((row) => row.module === "toys").length,
      tubes: rows.filter((row) => row.module === "tubes").length,
      equipment: rows.filter((row) => row.module === "equipment").length,
    },
  };

  await fs.writeFile(args.statusCsv, toCsv(rows), "utf8");

  process.stdout.write(`Status CSV: ${args.statusCsv}\n`);
  process.stdout.write(
    `Summary -> total: ${summary.total}, synced: ${summary.synced}, partial: ${summary.partial}, pending: ${summary.pending}\n`
  );
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
