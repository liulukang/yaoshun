import {execFileSync} from "node:child_process";
import {existsSync, readdirSync, readFileSync, writeFileSync} from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = path.join(appRoot, "src/content/content-file-dates.json");
const previous = existsSync(snapshotPath) ? JSON.parse(readFileSync(snapshotPath, "utf8")) : {};
let repoRoot;
try {
  repoRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], {cwd: appRoot, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"]}).trim();
} catch {
  // Deployment archives keep the checked-in snapshot. Never use extraction mtime.
  console.log("Content dates: using the saved snapshot (Git unavailable).");
  process.exit(0);
}

const changedDate = process.argv.find((arg) => arg.startsWith("--changed-date="))?.split("=")[1];
if (changedDate && (!/^\d{4}-\d{2}-\d{2}$/.test(changedDate) || !Number.isFinite(Date.parse(changedDate)))) {
  throw new Error("Use --changed-date=YYYY-MM-DD for a confirmed content update.");
}
function walk(dir) {
  return readdirSync(dir, {withFileTypes: true}).flatMap((item) => {
    const file = path.join(dir, item.name);
    return item.isDirectory() ? walk(file) : [file];
  });
}
const files = [
  ...walk(path.join(appRoot, "data")).filter((file) => /\/(product|news)\.json$/.test(file)),
  ...walk(path.join(appRoot, "src/content/site")).filter((file) => file.endsWith(".ts") && !file.endsWith("/products-catalog.ts") && !file.endsWith("/index.ts")),
  ...walk(path.join(appRoot, "src/content/pages")).filter((file) => file.endsWith(".ts") && !file.endsWith("/news.ts")),
];
const dates = {};
for (const file of files.sort()) {
  const key = path.relative(repoRoot, file).split(path.sep).join("/");
  const committed = execFileSync("git", ["log", "-1", "--format=%cI", "--", key], {cwd: repoRoot, encoding: "utf8"}).trim();
  const modified = changedDate && execFileSync("git", ["status", "--porcelain", "--", key], {cwd: repoRoot, encoding: "utf8"}).trim();
  const candidates = [previous[key], committed, modified ? `${changedDate}T00:00:00.000Z` : undefined]
    .filter((value) => value && Number.isFinite(Date.parse(value)));
  if (candidates.length) dates[key] = new Date(Math.max(...candidates.map(Date.parse))).toISOString();
}
writeFileSync(snapshotPath, `${JSON.stringify(dates, null, 2)}\n`);
console.log(`Content dates: saved ${Object.keys(dates).length} source dates.`);
