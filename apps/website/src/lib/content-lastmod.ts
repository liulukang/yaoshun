import "server-only";

import contentFileDates from "@/content/content-file-dates.json";
import {newsArticles, newsSourcePathBySlug} from "@/content/pages/news";
import {seoRevisions} from "@/content/seo-revisions";
import {productSourcePathById} from "@/content/site/products-catalog";

// Only content sources belong here. TSX templates, CSS and import registries
// are intentionally excluded; meaningful shared changes use seoRevisions.
const staticRouteSourcePaths: Record<string, string[]> = {
  "": ["site/home.ts", "pages/home.ts", "pages/certificates.ts", "pages/company-showcase.ts", "site/shared.ts"],
  "/about": ["site/about.ts", "pages/certificates.ts", "pages/company-showcase.ts", "site/shared.ts"],
  "/solutions": ["site/solutions.ts", "pages/solutions.ts", "site/shared.ts"],
  "/products": ["site/products.ts", "pages/products.ts", "site/shared.ts"],
  "/news": ["site/news.ts", "site/shared.ts"],
  "/faq": ["site/faq.ts", "pages/faq.ts", "site/shared.ts"],
  "/contact": ["site/contact.ts", "pages/contact.ts", "site/shared.ts"],
  "/privacy": ["site/privacy.ts"],
  "/refund-return": ["site/refund-return.ts"],
  "/terms": ["site/terms.ts"],
};

function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : undefined;
}

function getFileLastModified(sourcePath: string | undefined) {
  return sourcePath
    ? parseDate((contentFileDates as Record<string, string>)[sourcePath])
    : undefined;
}

function getLatestDate(dates: Array<Date | undefined>): Date | undefined {
  const timestamps = dates.flatMap((value) => value ? [value.getTime()] : []);
  return timestamps.length ? new Date(Math.max(...timestamps)) : undefined;
}

export function getStaticRouteLastModified(route: string): Date | undefined {
  return getLatestDate([
    parseDate(seoRevisions.site),
    parseDate(seoRevisions.routes[route]),
    ...(staticRouteSourcePaths[route] || []).map((file) =>
      getFileLastModified(`apps/website/src/content/${file}`),
    ),
    ...(route === "/products"
      ? Array.from(productSourcePathById.keys(), getProductLastModified)
      : []),
    ...(route === "/news"
      ? newsArticles.map((article) => getNewsLastModified(article.slug, article.publishedAt, article.modifiedAt))
      : []),
  ]);
}

export function getProductLastModified(productId: string): Date | undefined {
  return getLatestDate([
    getFileLastModified(productSourcePathById.get(productId)),
    parseDate(seoRevisions.site),
    parseDate(seoRevisions.products),
  ]);
}

export function getCategoryLastModified(category: string, productIds: string[]): Date | undefined {
  return getLatestDate([
    getFileLastModified("apps/website/src/content/pages/products.ts"),
    parseDate(seoRevisions.site),
    parseDate(seoRevisions.categories[category]),
    ...productIds.map(getProductLastModified),
  ]);
}

export function getNewsLastModified(slug: string, publishedAt: string, modifiedAt?: string): Date {
  // publishedAt is required content, so articles always have a reliable date.
  return getLatestDate([
    parseDate(publishedAt),
    parseDate(modifiedAt),
    getFileLastModified(newsSourcePathBySlug.get(slug)),
    parseDate(seoRevisions.site),
    parseDate(seoRevisions.news),
  ]) ?? new Date(publishedAt);
}
