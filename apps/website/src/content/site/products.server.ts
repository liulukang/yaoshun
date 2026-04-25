import "server-only";

import fs from "node:fs";
import path from "node:path";

import type {LocalizedTag, ProductModule} from "@/content/site/shared";

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
export type ProductJsonCustomizationOption = {
  label?: ProductJsonLocalizedText;
  minOrder?: ProductJsonLocalizedText;
};
export type ProductJsonMediaItem = {
  type?: "image" | "video" | string;
  url?: string;
};
export type ProductJsonDetailBlock = {
  sectionTitle?: ProductJsonLocalizedText;
  type?: string;
  text?: ProductJsonLocalizedText;
};
export type ProductJson = {
  productId: string;
  module: ProductModule;
  priority?: number;
  tags?: LocalizedTag[];
  title?: ProductJsonLocalizedText;
  sourceUrl?: string;
  categories?: ProductJsonLocalizedList;
  pricing?: {
    display?: ProductJsonLocalizedText;
    currency?: string;
    min?: number;
    max?: number;
    isRange?: boolean;
    minOrder?: ProductJsonLocalizedText;
    tiers?: ProductJsonPriceTier[];
  };
  customizationOptions?: ProductJsonCustomizationOption[];
  specifications?: ProductJsonPair[];
  productAttributes?: ProductJsonPair[];
  packagingAndShipping?: {
    unitSize?: string;
    unitVolume?: string;
    unitWeight?: string;
    summary?: ProductJsonLocalizedText;
    blocks?: Array<{
      title?: ProductJsonLocalizedText;
      text?: ProductJsonLocalizedText;
      label?: ProductJsonLocalizedText;
      value?: ProductJsonLocalizedText;
    }>;
  };
  leadTime?: {
    tiers?: Array<{
      minQuantity?: string;
      maxQuantity?: string;
      processPeriodDays?: number;
    }>;
  };
  videoDescription?: {
    title?: ProductJsonLocalizedText;
    url?: string;
    duration?: string;
  };
  media?: {
    main?: ProductJsonMediaItem[];
    detail?: ProductJsonMediaItem[];
  };
  productDetails?: ProductJsonDetailBlock[];
  files?: unknown[];
};

const DATA_ROOT_CANDIDATES = [
  path.join(process.cwd(), "data", "1688-products"),
  path.join(process.cwd(), "apps", "website", "data", "1688-products"),
] as const;

const PRODUCT_MODULES: ProductModule[] = ["toys", "tubes", "equipment"];
const MODULE_SORT_ORDER = new Map<ProductModule, number>(
  PRODUCT_MODULES.map((moduleName, index) => [moduleName, index])
);

function resolveDataRoot(): string | null {
  for (const candidate of DATA_ROOT_CANDIDATES) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

function normalizeWhitespace(value: unknown): string {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function localizeText(value: ProductJsonLocalizedText | undefined, fallback = ""): ProductJsonLocalizedText {
  if (!value) {
    return {en: fallback, zh: fallback};
  }
  const en = normalizeWhitespace(value.en || value.zh || fallback);
  const zh = normalizeWhitespace(value.zh || value.en || fallback);
  return {en, zh};
}

export function localizeList(
  value: ProductJsonLocalizedList | undefined,
  fallback: string[] = []
): ProductJsonLocalizedList {
  if (!value) {
    return {en: fallback, zh: fallback};
  }
  const en = Array.isArray(value.en) ? value.en.map(normalizeWhitespace).filter(Boolean) : fallback;
  const zh = Array.isArray(value.zh) ? value.zh.map(normalizeWhitespace).filter(Boolean) : en;
  return {en, zh};
}

function normalizeProduct(raw: unknown): ProductJson | null {
  if (!raw || typeof raw !== "object") return null;
  const parsed = raw as Record<string, unknown>;
  const productId = normalizeWhitespace(parsed.productId);
  const moduleName = normalizeWhitespace(parsed.module) as ProductModule;
  if (!productId || !moduleName) return null;

  return {
    ...parsed,
    productId,
    module: moduleName,
    priority: typeof parsed.priority === "number" ? parsed.priority : Number.MAX_SAFE_INTEGER,
    title: localizeText(parsed.title as ProductJsonLocalizedText, productId),
    categories: localizeList(parsed.categories as ProductJsonLocalizedList),
    pricing: parsed.pricing
      ? {
          ...(parsed.pricing as ProductJson["pricing"]),
          display: localizeText((parsed.pricing as ProductJson["pricing"])?.display),
          minOrder: localizeText((parsed.pricing as ProductJson["pricing"])?.minOrder),
          tiers: (((parsed.pricing as ProductJson["pricing"])?.tiers as ProductJsonPriceTier[]) || []).map((tier) => ({
            ...tier,
            quantity: localizeText(tier?.quantity),
          })),
        }
      : undefined,
    customizationOptions: ((parsed.customizationOptions as ProductJsonCustomizationOption[]) || []).map((item) => ({
      ...item,
      label: localizeText(item?.label),
      minOrder: localizeText(item?.minOrder),
    })),
    specifications: ((parsed.specifications as ProductJsonPair[]) || []).map((item) => ({
      key: localizeText(item?.key),
      value: localizeText(item?.value),
    })),
    productAttributes: ((parsed.productAttributes as ProductJsonPair[]) || []).map((item) => ({
      key: localizeText(item?.key),
      value: localizeText(item?.value),
    })),
    packagingAndShipping: parsed.packagingAndShipping
      ? {
          ...(parsed.packagingAndShipping as ProductJson["packagingAndShipping"]),
          summary: localizeText((parsed.packagingAndShipping as ProductJson["packagingAndShipping"])?.summary),
          blocks: (((parsed.packagingAndShipping as ProductJson["packagingAndShipping"])?.blocks as NonNullable<
            ProductJson["packagingAndShipping"]
          >["blocks"]) || []).map((block) => ({
            ...block,
            title: localizeText(block?.title),
            text: localizeText(block?.text),
            label: localizeText(block?.label),
            value: localizeText(block?.value),
          })),
        }
      : undefined,
    videoDescription: parsed.videoDescription
      ? {
          ...(parsed.videoDescription as ProductJson["videoDescription"]),
          title: localizeText((parsed.videoDescription as ProductJson["videoDescription"])?.title),
        }
      : undefined,
    productDetails: ((parsed.productDetails as ProductJsonDetailBlock[]) || []).map((item) => ({
      ...item,
      sectionTitle: localizeText(item?.sectionTitle),
      text: localizeText(item?.text),
    })),
    tags: ((parsed.tags as LocalizedTag[]) || []).map((tag) => ({
      key: normalizeWhitespace(tag?.key),
      en: normalizeWhitespace(tag?.en || tag?.zh || tag?.key),
      zh: normalizeWhitespace(tag?.zh || tag?.en || tag?.key),
    })),
  };
}

function sortProductsByPriority(items: ProductJson[]): ProductJson[] {
  return [...items].sort((a, b) => {
    const moduleDiff = (MODULE_SORT_ORDER.get(a.module) ?? Number.MAX_SAFE_INTEGER) - (MODULE_SORT_ORDER.get(b.module) ?? Number.MAX_SAFE_INTEGER);
    if (moduleDiff !== 0) return moduleDiff;
    const aPriority = typeof a.priority === "number" ? a.priority : Number.MAX_SAFE_INTEGER;
    const bPriority = typeof b.priority === "number" ? b.priority : Number.MAX_SAFE_INTEGER;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return a.productId.localeCompare(b.productId, undefined, {numeric: true});
  });
}

function parseProductSnapshot(filePath: string): ProductJson | null {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return normalizeProduct(parsed);
  } catch {
    return null;
  }
}

function loadProductsFromSnapshots(): ProductJson[] {
  const dataRoot = resolveDataRoot();
  if (!dataRoot) return [];

  const allProducts: ProductJson[] = [];

  for (const moduleName of PRODUCT_MODULES) {
    const moduleDir = path.join(dataRoot, moduleName);
    if (!fs.existsSync(moduleDir)) continue;

    const entries = fs
      .readdirSync(moduleDir, {withFileTypes: true})
      .filter((entry) => entry.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name, undefined, {numeric: true}));

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

export function getProductImages(product: ProductJson): string[] {
  const images = [
    ...(product.media?.main || []),
    ...(product.media?.detail || []),
  ]
    .filter((item) => item?.type === "image")
    .map((item) => normalizeWhitespace(item?.url))
    .filter(Boolean);

  return Array.from(new Set(images));
}

export function getProductVideos(product: ProductJson): string[] {
  const videos = [
    ...(product.media?.main || []),
    ...(product.media?.detail || []),
  ]
    .filter((item) => item?.type === "video")
    .map((item) => normalizeWhitespace(item?.url))
    .filter(Boolean);

  const videoDescriptionUrl = normalizeWhitespace(product.videoDescription?.url);
  if (videoDescriptionUrl) {
    videos.push(videoDescriptionUrl);
  }

  return Array.from(new Set(videos));
}

export function getProductSummary(product: ProductJson): ProductJsonLocalizedText {
  const title = localizeText(product.title, product.productId);
  const detailText = (product.productDetails || [])
    .map((item) => localizeText(item.text))
    .find((item) => item.en || item.zh);

  if (detailText?.en || detailText?.zh) {
    return detailText;
  }

  const categories = localizeList(product.categories);
  const firstCategory = categories.en?.[0] || categories.zh?.[0] || "";
  const minOrder = localizeText(product.pricing?.minOrder);

  const fallbackEn = [title.en, firstCategory, minOrder.en].filter(Boolean).join(" | ") || product.productId;
  const fallbackZh = [title.zh, categories.zh?.[0], minOrder.zh].filter(Boolean).join(" | ") || title.zh || product.productId;

  return {
    en: fallbackEn,
    zh: fallbackZh,
  };
}

export function getProductDescription(product: ProductJson): ProductJsonLocalizedList {
  const detailTexts = (product.productDetails || [])
    .map((item) => localizeText(item.text))
    .filter((item) => item.en || item.zh);

  if (detailTexts.length > 0) {
    return {
      en: detailTexts.map((item) => item.en).filter((item): item is string => Boolean(item)),
      zh: detailTexts.map((item) => item.zh).filter((item): item is string => Boolean(item)),
    };
  }

  const pairs = [...(product.specifications || []), ...(product.productAttributes || [])]
    .slice(0, 8)
    .map((item) => ({
      key: localizeText(item.key),
      value: localizeText(item.value),
    }));

  return {
    en: pairs.map((item) => [item.key.en, item.value.en].filter(Boolean).join(": ")).filter(Boolean),
    zh: pairs.map((item) => [item.key.zh, item.value.zh].filter(Boolean).join("：")).filter(Boolean),
  };
}

export function getProductAttributePairs(product: ProductJson): ProductJsonPair[] {
  return [...(product.specifications || []), ...(product.productAttributes || [])];
}

export function getProductPackagingPairs(product: ProductJson): ProductJsonPair[] {
  const packagingPairs: ProductJsonPair[] = [];
  const packaging = product.packagingAndShipping;

  if (packaging?.unitSize) {
    packagingPairs.push({
      key: {en: "Unit Size", zh: "单件尺寸"},
      value: {en: packaging.unitSize, zh: packaging.unitSize},
    });
  }
  if (packaging?.unitVolume) {
    packagingPairs.push({
      key: {en: "Unit Volume", zh: "单件体积"},
      value: {en: packaging.unitVolume, zh: packaging.unitVolume},
    });
  }
  if (packaging?.unitWeight) {
    packagingPairs.push({
      key: {en: "Unit Weight", zh: "单件重量"},
      value: {en: packaging.unitWeight, zh: packaging.unitWeight},
    });
  }
  if (packaging?.summary?.en || packaging?.summary?.zh) {
    packagingPairs.push({
      key: {en: "Shipping Summary", zh: "包装运输摘要"},
      value: localizeText(packaging.summary),
    });
  }

  for (const block of packaging?.blocks || []) {
    const key = localizeText(block.label || block.title);
    const value = localizeText(block.value || block.text);
    if ((key.en || key.zh) && (value.en || value.zh)) {
      packagingPairs.push({key, value});
    }
  }

  return packagingPairs;
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
