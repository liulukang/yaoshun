// Bump only for material shared content, metadata, schema or link changes.
// Layout/CSS/import-only changes must not change these dates.
export const seoRevisions = {
  site: "2026-10-24", // Complete descriptions and Organization sameAs cleanup.
  news: "2026-10-24", // Article isPartOf now references the shared WebSite ID.
  products: "2026-10-24", // Product SEO descriptions preserve complete sentences.
  routes: {
    "": "2026-10-24", // Sampling time clarified in visible copy.
    "/solutions": "2026-10-24",
    "/contact": "2026-10-24", // One clear contact heading.
  } as Record<string, string>,
  categories: {
    fans: "2026-10-24",
    stem: "2026-10-24",
    robots: "2026-10-24",
  } as Record<string, string>,
};
