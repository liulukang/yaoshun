#!/usr/bin/env node
import assert from "node:assert/strict";

const base = new URL(process.argv[2] || "http://127.0.0.1:3000");
const includeMedia = process.argv.includes("--media");
async function request(path, options) {
  const response = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(30_000),
    ...options,
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return response;
}

assert.equal((await (await request("/api/health")).json()).ok, true);
for (const path of ["/", "/zh", "/products", "/contact"]) {
  const response = await request(path);
  assert.match(response.headers.get("content-type"), /text\/html/);
  assert.match(await response.text(), /yaoshun|尧顺/i);
  console.log(`OK ${path}`);
}
const sitemap = await request("/sitemap.xml");
assert.match(await sitemap.text(), /<urlset/);
assert.match(await (await request("/robots.txt")).text(), /Sitemap:/);
const markdown = await request("/", { headers: { Accept: "text/markdown" } });
assert.match(markdown.headers.get("content-type"), /text\/markdown/);
assert.match(await markdown.text(), /yaoshun/i);

// Invalid input must fail before sending any real inquiry email.
const invalidContact = await fetch(new URL("/api/contact-form", base), {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: "{}",
  signal: AbortSignal.timeout(10_000),
});
assert.equal(invalidContact.status, 400);

if (includeMedia) {
  for (const path of [
    "/favicon-rounded.png",
    "/media/site/home/about-factory-cf2e79b208dc.webp",
    "/site/home/about-factory.webp",
    "/media/site/solutions/core-focus-v2/stem-toy-rd-factory-review.webp",
  ]) {
    const response = await request(path);
    assert.match(response.headers.get("content-type"), /^image\//);
    assert.ok((await response.arrayBuffer()).byteLength > 0);
    console.log(`OK ${path}`);
  }
  const optimized = await request("/_next/image?url=%2Fmedia%2Fsite%2Fhome%2Fabout-factory-cf2e79b208dc.webp&w=640&q=75");
  assert.match(optimized.headers.get("content-type"), /^image\//);
}
console.log("Website smoke checks passed.");
