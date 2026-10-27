import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import migratedLocalImages from "./src/content/migrated-local-images.json";

const publicBlobOrigin =
  "https://7j7davvujdsmddan.public.blob.vercel-storage.com";
const configuredAssetBaseUrl = new URL(
  process.env.ASSET_BASE_URL || publicBlobOrigin,
);
if (
  configuredAssetBaseUrl.protocol !== "https:" ||
  configuredAssetBaseUrl.search ||
  configuredAssetBaseUrl.hash
) {
  throw new Error("ASSET_BASE_URL must be an HTTPS URL without a query or fragment.");
}
// The original Blob store keeps website files below this prefix. Accept both
// the origin and the full prefix in ASSET_BASE_URL while always generating a
// working asset URL.
const assetBasePath =
  configuredAssetBaseUrl.pathname === "/"
    ? "/yaoshun-assets"
    : configuredAssetBaseUrl.pathname.replace(/\/$/, "");
const assetBase = `${configuredAssetBaseUrl.origin}${assetBasePath}`;

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.."),
  poweredByHeader: false,
  experimental: {
    staleTimes: {
      dynamic: 600,
      static: 60 * 60 * 24,
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/site/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=604800",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/favicon-rounded.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon-rounded-192.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/site.webmanifest",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/llms-zh.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/api/contact-form",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/sitemap",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/sitemap/",
        destination: "/sitemap.xml",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Preserve published image URLs while serving their files from Blob.
      ...migratedLocalImages.map(({ source, destination }) => ({
        source,
        destination: `${assetBase}${destination}`,
      })),
      {
        source: "/media/:path*",
        destination: `${assetBase}/:path*`,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: configuredAssetBaseUrl.hostname,
        port: configuredAssetBaseUrl.port,
        pathname: `${assetBasePath}/**`,
      },
      {
        protocol: "https",
        hostname: "www.yaoshuntoys.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "s.alicdn.com",
      },
    ],
  },
};

export default nextConfig;
