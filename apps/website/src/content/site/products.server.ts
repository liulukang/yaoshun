import "server-only";

import fs from "node:fs";
import path from "node:path";

import type { LocalizedTag, ProductModule } from "@/content/site/shared";

export type ProductJsonLocalizedText = Partial<Record<"zh" | "en", string>>;
export type ProductJsonLocalizedList = Partial<Record<"zh" | "en", string[]>>;
export type ProductJsonPair = {
  key?: ProductJsonLocalizedText;
  value?: ProductJsonLocalizedText;
};
export type ProductJsonPriceTier = {
  quantity?: ProductJsonLocalizedText;
  price?: string;
};
export type ProductJson = {
  offerId?: string;
  module?: string;
  priority?: number;
  tags?: LocalizedTag[];
  title?: ProductJsonLocalizedText;
  summary?: ProductJsonLocalizedText;
  description?: ProductJsonLocalizedList;
  priceTiers?: ProductJsonPriceTier[];
  attributes?: ProductJsonPair[];
  packaging?: ProductJsonPair[];
  images?: string[];
  videos?: string[];
  sourceUrl?: string;
};

const PRODUCT_MODULES: ProductModule[] = ["toys", "tubes", "equipment"];
const DATA_ROOT_CANDIDATES = [
  path.join(process.cwd(), "data", "1688-products"),
  path.join(process.cwd(), "apps", "website", "data", "1688-products"),
] as const;

function resolveDataRoot(): string | null {
  for (const candidate of DATA_ROOT_CANDIDATES) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function sortProductsByPriority(items: ProductJson[]): ProductJson[] {
  return [...items].sort((a, b) => {
    const aPriority = typeof a.priority === "number" ? a.priority : Number.MAX_SAFE_INTEGER;
    const bPriority = typeof b.priority === "number" ? b.priority : Number.MAX_SAFE_INTEGER;
    if (aPriority !== bPriority) {
      return aPriority - bPriority;
    }
    return String(a.offerId || "").localeCompare(String(b.offerId || ""), undefined, { numeric: true });
  });
}

function parseProductSnapshot(filePath: string): ProductJson | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw) as ProductJson;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function loadProductsFromSnapshots(): ProductJson[] {
  const dataRoot = resolveDataRoot();
  if (!dataRoot) {
    return [];
  }

  const allProducts: ProductJson[] = [];

  for (const moduleName of PRODUCT_MODULES) {
    const moduleDir = path.join(dataRoot, moduleName);
    if (!fs.existsSync(moduleDir)) continue;

    const entries = fs.readdirSync(moduleDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
    for (const entry of entries) {
      const snapshotPath = path.join(moduleDir, entry.name, "product.json");
      if (!fs.existsSync(snapshotPath)) continue;

      const snapshot = parseProductSnapshot(snapshotPath);
      if (!snapshot) continue;

      allProducts.push(snapshot);
    }
  }

  return sortProductsByPriority(allProducts);
}

export const products: ProductJson[] = loadProductsFromSnapshots();

export const productsByModule: Record<ProductModule, ProductJson[]> = {
  toys: products.filter((item) => item.module === "toys"),
  tubes: products.filter((item) => item.module === "tubes"),
  equipment: products.filter((item) => item.module === "equipment"),
};

export const productTags: LocalizedTag[] = Array.from(
  new Map(products.flatMap((item) => item.tags ?? []).map((tag) => [tag.key, tag])).values(),
).sort((a, b) => a.key.localeCompare(b.key));
