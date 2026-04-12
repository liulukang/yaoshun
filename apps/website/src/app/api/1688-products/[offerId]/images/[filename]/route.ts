import fs from "node:fs/promises";
import path from "node:path";

const MEDIA_ROOT = path.join(process.cwd(), "data/1688-products");
const MODULES = ["toys", "tubes", "equipment"] as const;
const MIME_BY_EXTENSION: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".bmp": "image/bmp",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

function isSafeOfferId(value: string): boolean {
  return /^\d+$/.test(value);
}

function isSafeFilename(value: string): boolean {
  return /^[a-zA-Z0-9._-]+$/.test(value);
}

function mimeTypeFor(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  return MIME_BY_EXTENSION[ext] || "application/octet-stream";
}

async function resolveOfferDirectory(offerId: string): Promise<string> {
  const rootCandidate = path.join(MEDIA_ROOT, offerId);
  try {
    const stat = await fs.stat(rootCandidate);
    if (stat.isDirectory()) return rootCandidate;
  } catch {
    // noop
  }

  for (const moduleName of MODULES) {
    const moduleCandidate = path.join(MEDIA_ROOT, moduleName, offerId);
    try {
      const stat = await fs.stat(moduleCandidate);
      if (stat.isDirectory()) return moduleCandidate;
    } catch {
      // noop
    }
  }

  return "";
}

async function resolveTargetPath(offerDirectory: string, filename: string): Promise<string> {
  const candidates = [
    path.join(offerDirectory, "images", filename),
    path.join(offerDirectory, "media", "images", filename),
  ];
  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate);
      if (stat.isFile()) return candidate;
    } catch {
      // noop
    }
  }
  return "";
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ offerId: string; filename: string }> }
) {
  const { offerId, filename } = await context.params;

  if (!isSafeOfferId(offerId) || !isSafeFilename(filename)) {
    return new Response("Not Found", { status: 404 });
  }

  const offerDirectory = await resolveOfferDirectory(offerId);
  if (!offerDirectory) {
    return new Response("Not Found", { status: 404 });
  }

  const targetPath = await resolveTargetPath(offerDirectory, filename);
  if (!targetPath) {
    return new Response("Not Found", { status: 404 });
  }

  const normalizedRoot = path.resolve(MEDIA_ROOT);
  const normalizedTarget = path.resolve(targetPath);
  if (!normalizedTarget.startsWith(normalizedRoot + path.sep)) {
    return new Response("Not Found", { status: 404 });
  }

  try {
    const [buffer, stat] = await Promise.all([fs.readFile(normalizedTarget), fs.stat(normalizedTarget)]);
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": mimeTypeFor(filename),
        "Content-Length": String(stat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not Found", { status: 404 });
  }
}
