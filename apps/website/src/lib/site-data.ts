import {newsArticles} from "@/content/pages/news";
import {type NewsArticleSeed, type ShowcaseProductSeed} from "@/content/types";
import {seoKeywordPools} from "@/content/site/shared";
import {
  products,
  type ProductJson,
  type ProductJsonPair,
} from "@/content/site/products-catalog";
import {t, type Locale} from "@/lib/i18n";
import {areSeoKeywordsSimilar, isAllowedSeoKeyword} from "@/lib/seo-keywords";

export type ShowcaseCatalogItem = ShowcaseProductSeed & {
  product: ProductJson;
  images: string[];
};

const curatedProductsFeaturedRailIds = [
  "1600884595638",
  "1600900125789",
  "1601213973459",
  "1601214840405",
  "1601316497567",
  "2026050705",
  "2026050706",
] as const;

const curatedHomeBestsellerIds = [
  "2026050701",
  "A444-9",
  "2700-3",
  "JB5038A",
  "M5S",
  "S23S",
  "599-51",
  "FC-6655B1",
] as const;

const productsFeaturedRailImageOverrides: Partial<Record<string, string>> = {
  "2026050705": "https://www.yaoshuntoys.com/media/products-q92/2026050705/2.webp",
  "2026050706": "https://www.yaoshuntoys.com/media/products-q92/2026050706/3.webp",
};

const sourcedProductCollections = new Set<ShowcaseProductSeed["collection"]>([
  "sports", "stem", "robots", "tents", "drones", "fans",
]);

function extractPieceCount(product: ProductJson) {
  const pools = [
    product.title?.en,
    product.title?.zh,
    ...(product.attributePairs || []).flatMap((item) => [item.value?.en, item.value?.zh]),
  ]
    .map((value) => String(value || "").trim())
    .filter(Boolean);

  for (const entry of pools) {
    const match = entry.match(/(\d{2,4})\s*(?:piece|pieces|pcs|pc|件)/i);
    if (match) return Number(match[1]);
  }

  for (const entry of pools) {
    const match = entry.match(/\b(\d{2,4})\b/);
    if (!match) continue;
    const count = Number(match[1]);
    if (count >= 20 && count <= 300) return count;
  }

  return 0;
}

function derivePieceBand(product: ProductJson): ShowcaseProductSeed["pieceBand"] {
  const pieceCount = extractPieceCount(product);
  if (pieceCount > 300) return "300plus";
  if (pieceCount > 200) return "201-300";
  if (pieceCount > 100) return "101-200";
  return "0-100";
}

function deriveAgeGroup(product: ProductJson): ShowcaseProductSeed["ageGroup"] {
  const pools = (product.attributePairs || [])
    .filter((item) => [item.key?.en, item.key?.zh].some((key) =>
      /^(age range|age|适用年龄|年龄)$/i.test(String(key || "").trim()),
    ))
    .flatMap((item) => [item.value?.en, item.value?.zh])
    .map((value) => String(value || ""));

  const numbers = Array.from(
    pools.join(" ").matchAll(/\d+(?:\.\d+)?/g),
    (match) => Number(match[0]),
  ).filter((value) => Number.isFinite(value));

  const minAge = numbers.length ? Math.min(...numbers) : 5;
  if (minAge >= 10) return "10plus";
  if (minAge >= 8) return "8plus";
  if (minAge >= 5) return "5plus";
  return "3plus";
}

function deriveCollection(product: ProductJson): ShowcaseProductSeed["collection"] {
  const category = product.tags?.find((tag) =>
    sourcedProductCollections.has(tag.key as ShowcaseProductSeed["collection"]),
  );
  if (category) return category.key as ShowcaseProductSeed["collection"];

  const text = [
    product.title?.en,
    product.title?.zh,
    ...(product.categories?.en || []),
    ...(product.categories?.zh || []),
  ]
    .join(" ")
    .toLowerCase();

  const isAccessory =
    /(connector|construction rod|rods|sphere|rotating ball piece|piece set|配件|连接球|连接杆)/.test(text) &&
    !/(fort building kit|fort builder|堡垒搭建|套装)/.test(text);
  if (isAccessory) return "building";
  return "building";
}

function normalizeCatalogSummary(product: ProductJson) {
  const summary = product.summary || {};
  const trimLine = (value: string | undefined) =>
    String(value || "")
      .replace(/\s+/g, " ")
      .replace(/[|]/g, " ")
      .trim()
      .slice(0, 140);

  return {
    en: trimLine(summary.en || product.title?.en || product.productId),
    zh: trimLine(summary.zh || product.title?.zh || product.productId),
  };
}

function localizeProductText(
  locale: Locale,
  value: Partial<Record<Locale, string>> | undefined,
  fallback = "",
) {
  if (!value) return fallback;
  return value[locale] || value.en || value.zh || fallback;
}

function getKeywordPool(
  locale: Locale,
  value: Partial<Record<Locale, readonly string[]>>,
) {
  return value[locale] || value.en || value.zh || [];
}

function normalizeSeoKeyword(value: string) {
  return value
    .replace(/[|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeKeywordForMatching(keyword: string) {
  return keyword
    .toLowerCase()
    .replace(/[&,+/]/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const seoSearchIntentSignals = [
  "abs rotating",
  "ai",
  "assembly",
  "building",
  "castle",
  "connector",
  "custom",
  "drawing",
  "educational",
  "export",
  "extrusion",
  "factory",
  "fort",
  "glow",
  "injection",
  "kit",
  "manufacturer",
  "mold",
  "odm",
  "oem",
  "packaging",
  "private label",
  "rods",
  "sample",
  "source",
  "stem",
  "storage",
  "supplier",
  "tent",
  "toy",
  "sports",
  "football",
  "basketball",
  "pool",
  "robot",
  "robotics",
  "remote control",
  "drone",
  "camera",
  "fan",
  "portable",
  "cooling",
  "science",
  "experiment",
  "educational",
  "yaoshun",
  "搭建",
  "拼搭",
  "拼插",
  "积木",
  "堡垒",
  "帐篷",
  "城堡",
  "秘密基地",
  "夜光",
  "旋转球",
  "连接杆",
  "连接球",
  "收纳袋",
  "益智",
  "玩具",
  "定制",
  "贴牌",
  "包装",
  "彩盒",
  "来样",
  "来图",
  "工厂",
  "源头",
  "尧顺",
  "模具",
  "开模",
  "注塑",
  "挤出",
  "交付",
  "出口",
  "运动",
  "足球",
  "篮球",
  "机器人",
  "无人机",
  "风扇",
  "科学",
  "实验",
  "便携",
] as const;

const priorityProductSeoKeywords = [
  "fort building toy",
  "fort building kit",
  "Fort Building Kit Manufacturer",
  "fort building toy factory",
  "construction toys wholesale",
  "bulk fort building kits",
  "private label fort building kits",
] as const;

function isPriorityProductSeoKeyword(keyword: string) {
  const normalized = normalizeKeywordForMatching(keyword);

  return priorityProductSeoKeywords.some(
    (target) => normalizeKeywordForMatching(target) === normalized,
  );
}

function hasSeoSearchIntent(keyword: string) {
  const normalized = keyword
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, "")
    .trim();

  if (/^(toy|toys|kids|children|material|package|service|玩具)$/i.test(keyword)) {
    return false;
  }

  if (/^([a-z]{2,3}|[A-Z]{2,3})$/.test(keyword.trim())) {
    return false;
  }

  if (/other|mother\s+kids|其他|母婴/i.test(keyword)) {
    return false;
  }

  return (
    normalized.length > 1 &&
    seoSearchIntentSignals.some((signal) =>
      normalizeKeywordForMatching(keyword).includes(signal.toLowerCase()),
    )
  );
}

function uniqueSeoKeywords(keywords: readonly string[], limit: number) {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const item of keywords) {
    const keyword = normalizeSeoKeyword(item);
    const lookupKey = keyword.toLowerCase();

    if (
      !keyword ||
      keyword.length > 90 ||
      !isAllowedSeoKeyword(keyword) ||
      !hasSeoSearchIntent(keyword) ||
      seen.has(lookupKey) ||
      result.some(
        (existing) =>
          areSeoKeywordsSimilar(keyword, existing) &&
          !(
            isPriorityProductSeoKeyword(keyword) &&
            isPriorityProductSeoKeyword(existing)
          ),
      )
    ) {
      continue;
    }

    seen.add(lookupKey);
    result.push(keyword);

    if (result.length >= limit) {
      break;
    }
  }

  return result;
}

const categorySeoKeywordRules = [
  {
    source: ["sports and outdoor play", "运动与户外玩具"],
    keywords: {
      en: ["sports toys wholesale", "kids football basketball set"],
      zh: ["运动玩具批发", "儿童足球篮球套装"],
    },
  },
  {
    source: ["robots and rc toys", "机器人与遥控玩具"],
    keywords: {
      en: ["RC robot toy supplier", "programmable robot toy"],
      zh: ["遥控机器人玩具供应商", "可编程机器人玩具"],
    },
  },
  {
    source: ["drones", "无人机"],
    keywords: {
      en: ["camera drone supplier", "brushless toy drone"],
      zh: ["航拍无人机供应商", "无刷玩具无人机"],
    },
  },
  {
    source: ["portable fans", "便携风扇"],
    keywords: {
      en: ["portable fan supplier", "rechargeable handheld fan"],
      zh: ["便携风扇供应商", "可充电手持风扇"],
    },
  },
  {
    source: ["science experiment kits", "科学实验套装"],
    keywords: {
      en: ["science experiment kit supplier", "STEM experiment kit"],
      zh: ["科学实验套装供应商", "STEM实验套装"],
    },
  },
  {
    source: ["children's play tents", "儿童游戏帐篷"],
    keywords: {
      en: ["children's play tent supplier", "pretend play tent"],
      zh: ["儿童游戏帐篷供应商", "过家家游戏帐篷"],
    },
  },
  {
    source: ["educational toys", "益智玩具"],
    keywords: {
      en: ["STEM educational toys", "educational building toys"],
      zh: ["STEM益智玩具", "益智搭建玩具"],
    },
  },
  {
    source: ["blocks model building toys", "积木与模型拼搭玩具"],
    keywords: {
      en: ["building block assembly toys", "model building toys"],
      zh: ["积木拼搭玩具", "模型拼搭玩具"],
    },
  },
  {
    source: ["building block sets", "积木套装"],
    keywords: {
      en: ["building block sets", "fort building block sets"],
      zh: ["积木套装", "堡垒积木拼搭套装"],
    },
  },
  {
    source: ["outdoor toys structures", "户外玩具与设施"],
    keywords: {
      en: ["outdoor fort building kit", "outdoor building toys"],
      zh: ["户外堡垒拼搭套装", "户外搭建玩具"],
    },
  },
] as const;

function getMappedCategorySeoKeywords(locale: Locale, values: string[]) {
  const sourceText = normalizeKeywordForMatching(values.join(" "));

  return categorySeoKeywordRules.flatMap((rule) =>
    rule.source.some((source) =>
      sourceText.includes(normalizeKeywordForMatching(source)),
    )
      ? getKeywordPool(locale, rule.keywords)
      : [],
  );
}

function getMaterialSeoKeywords(locale: Locale, value: string) {
  const normalized = normalizeKeywordForMatching(value);
  const keywords: string[] = [];

  if (normalized.includes("pp")) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["PP rods connector balls", "PP fort building toy parts"],
        zh: ["PP连接杆连接球", "PP堡垒拼搭玩具配件"],
      }),
    );
  }

  if (normalized.includes("abs")) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["ABS rotating ball connectors", "ABS rotating ball fort building kit"],
        zh: ["ABS旋转球连接件", "ABS旋转球堡垒拼搭套装"],
      }),
    );
  }

  if (/non\s*woven|无纺布/.test(normalized)) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["non-woven fabric fort cover", "fort tent cover kit"],
        zh: ["无纺布堡垒帐篷布套", "堡垒帐篷布套"],
      }),
    );
  }

  return keywords;
}

function getPackagingSeoKeywords(locale: Locale, value: string) {
  const normalized = normalizeKeywordForMatching(value);
  const keywords: string[] = [];

  if (normalized.includes("color box") || normalized.includes("彩盒")) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["color box toy packaging", "custom color box packaging"],
        zh: ["彩盒包装定制", "玩具彩盒包装"],
      }),
    );
  }

  if (normalized.includes("storage bag") || normalized.includes("收纳袋")) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["storage bag fort kit", "building toy storage bag"],
        zh: ["收纳袋玩具套装", "搭建玩具收纳袋"],
      }),
    );
  }

  if (normalized.includes("carton") || normalized.includes("外箱")) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["export carton toy packaging"],
        zh: ["玩具出口外箱包装"],
      }),
    );
  }

  return keywords;
}

const seoPairKeyHints = [
  "type",
  "product name",
  "item name",
  "theme",
  "style",
  "function",
  "feature",
  "material",
  "service",
  "packaging",
  "package",
  "keywords",
  "产品类型",
  "产品名称",
  "主题",
  "产品风格",
  "功能",
  "特色",
  "材质",
  "服务",
  "包装方式",
  "关键词",
] as const;

function getSeoPairKeywords(locale: Locale, pair: ProductJsonPair) {
  const key = [
    localizeProductText(locale, pair.key),
    localizeProductText(locale === "zh" ? "en" : "zh", pair.key),
  ]
    .join(" ")
    .toLowerCase();
  const value = localizeProductText(locale, pair.value);

  if (key.includes("company type") || key.includes("企业类型")) {
    return [];
  }

  if (!seoPairKeyHints.some((hint) => key.includes(hint.toLowerCase()))) {
    return [];
  }

  if (key.includes("material") || key.includes("材质")) {
    return getMaterialSeoKeywords(locale, value);
  }

  if (key.includes("packaging") || key.includes("package") || key.includes("包装")) {
    return getPackagingSeoKeywords(locale, value);
  }

  if (key.includes("service") || key.includes("服务")) {
    if (/private|label|贴牌/i.test(value)) {
      return getKeywordPool(locale, {
        en: ["private label toy packaging"],
        zh: ["私标玩具包装"],
      });
    }

    if (/oem|odm|定制/i.test(value)) {
      return getKeywordPool(locale, {
        en: ["OEM ODM toy customization"],
        zh: ["OEM ODM玩具定制"],
      });
    }

    return [];
  }

  return [value];
}

function getPieceCountSeoKeywords(locale: Locale, product: ProductJson) {
  const pieceCount = extractPieceCount(product);

  if (!pieceCount) {
    return [];
  }

  const titleText = [
    product.title?.en,
    product.title?.zh,
    ...(product.categories?.en || []),
    ...(product.categories?.zh || []),
  ]
    .join(" ")
    .toLowerCase();
  if (!/fort|building|construction|拼搭|堡垒|积木|连接杆/.test(titleText)) {
    return [];
  }
  const isGlow = /glow|luminous|发光|夜光/.test(titleText);
  const isSecretBase = /secret base|秘密基地/.test(titleText);

  if (isGlow) {
    return getKeywordPool(locale, {
      en: [`${pieceCount}-piece glow fort kit`],
      zh: [`${pieceCount}件夜光堡垒拼搭套装`],
    });
  }

  if (isSecretBase) {
    return getKeywordPool(locale, {
      en: [`${pieceCount}-piece secret base fort kit`],
      zh: [`${pieceCount}件秘密基地堡垒拼搭套装`],
    });
  }

  return getKeywordPool(locale, {
    en: [`${pieceCount}-piece fort building kit`],
    zh: [`${pieceCount}件堡垒拼搭套装`],
  });
}

function getProductCustomizationSeoKeywords(locale: Locale, product: ProductJson) {
  const text = [
    ...(product.customizationOptions || []).flatMap((item) => [
      item.label?.en,
      item.label?.zh,
    ]),
    ...(product.specifications || []).flatMap((item) => [
      item.value?.en,
      item.value?.zh,
    ]),
  ]
    .join(" ")
    .toLowerCase();
  const keywords: string[] = [];

  if (/logo|packaging|graphic|custom|oem|odm|定制|包装|图文/.test(text)) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["custom toy packaging"],
        zh: ["玩具包装定制"],
      }),
    );
  }

  if (/private|label|贴牌/.test(text)) {
    keywords.push(
      ...getKeywordPool(locale, {
        en: ["private label toy supplier"],
        zh: ["私标玩具供应商"],
      }),
    );
  }

  return keywords;
}

function getProductDimensionSeoKeywords(
  locale: Locale,
  product: ProductJson,
  categoryText: string,
) {
  const dimensionPairs = [
    ...(product.attributePairs || []),
    ...(product.productAttributes || []),
    ...(product.specifications || []),
  ].filter((pair) => {
    const key = [pair.key?.en, pair.key?.zh].filter(Boolean).join(" ");
    return /dimension|size|height|width|depth|diameter|overall|base|screen|尺寸|高度|宽度|深度|直径|屏幕/i.test(key);
  });
  const dimensions = Array.from(new Set(
    dimensionPairs
      .map((pair) => localizeProductText(locale, pair.value))
      .map((value) => value.replace(/\s+/g, " ").trim())
      .filter(Boolean),
  )).slice(0, 2);

  if (!dimensions.length) return [];

  const normalizedCategory = categoryText.toLowerCase();
  let categoryLabel = locale === "zh" ? "玩具" : "toy";
  if (normalizedCategory.includes("drone") || normalizedCategory.includes("无人机")) {
    categoryLabel = locale === "zh" ? "无人机" : "camera drone";
  } else if (normalizedCategory.includes("tent") || normalizedCategory.includes("帐篷")) {
    categoryLabel = locale === "zh" ? "儿童游戏帐篷" : "children's play tent";
  } else if (normalizedCategory.includes("sport") || normalizedCategory.includes("运动")) {
    categoryLabel = locale === "zh" ? "运动玩具" : "sports toy set";
  } else if (normalizedCategory.includes("robot") || normalizedCategory.includes("机器人")) {
    categoryLabel = locale === "zh" ? "机器人玩具" : "robot toy";
  } else if (normalizedCategory.includes("fan") || normalizedCategory.includes("风扇")) {
    categoryLabel = locale === "zh" ? "便携风扇" : "portable fan";
  } else if (normalizedCategory.includes("science") || normalizedCategory.includes("科学")) {
    categoryLabel = locale === "zh" ? "科学实验套装" : "STEM experiment kit";
  }

  return dimensions.map((dimension) =>
    locale === "zh"
      ? `${dimension}${categoryLabel}供应商`
      : `${dimension} ${categoryLabel} supplier`,
  );
}

export function getProductSeoKeywords(
  locale: Locale,
  product: ProductJson,
  limit = 6,
) {
  const title = localizeProductText(locale, product.title, product.productId);
  const sourceCategories = [
    ...(product.categories?.en || []),
    ...(product.categories?.zh || []),
  ];
  const tags =
    product.tags?.map((tag) => (locale === "zh" ? tag.zh : tag.en)) || [];
  const categorySeoKeywords = getMappedCategorySeoKeywords(locale, [
    ...sourceCategories,
    ...tags,
  ]);
  const categoryText = [...sourceCategories, ...tags].join(" ");
  const dimensionSeoKeywords = getProductDimensionSeoKeywords(
    locale,
    product,
    categoryText,
  );
  const pairValues = [
    ...(product.attributePairs || []),
    ...(product.productAttributes || []),
    ...(product.specifications || []),
    ...(product.packagingPairs || []),
  ]
    .flatMap((pair) => getSeoPairKeywords(locale, pair))
    .filter(Boolean);

  return uniqueSeoKeywords(
    [
      title,
      ...dimensionSeoKeywords,
      ...getPieceCountSeoKeywords(locale, product),
      ...categorySeoKeywords,
      ...pairValues,
      ...getProductCustomizationSeoKeywords(locale, product),
    ],
    limit,
  );
}

export function getCatalogSeoKeywords(locale: Locale, limit = 2) {
  return uniqueSeoKeywords(
    getKeywordPool(locale, {
      en: [
        "fort building toys wholesale",
        "sports toy wholesale",
        "STEM toy supplier",
        "robot toy manufacturer",
        "children's play tent supplier",
        "camera drone supplier",
        "portable fan wholesale",
      ],
      zh: [
        "堡垒拼搭套装批发",
        "运动玩具批发",
        "STEM玩具供应商",
        "机器人玩具厂家",
        "儿童游戏帐篷供应商",
        "航拍无人机供应商",
        "便携风扇批发",
      ],
    }),
    limit,
  );
}

function getBusinessCategoryPairValue(locale: Locale, pair: ProductJsonPair) {
  const key = [
    localizeProductText(locale, pair.key),
    localizeProductText(locale === "zh" ? "en" : "zh", pair.key),
  ]
    .join(" ")
    .toLowerCase();

  if (key.includes("company type") || key.includes("企业类型")) {
    return "";
  }

  if (
    ![
      "type",
      "product type",
      "product name",
      "theme",
      "style",
      "产品类型",
      "产品名称",
      "主题",
      "产品风格",
    ].some((hint) => key.includes(hint.toLowerCase()))
  ) {
    return "";
  }

  return localizeProductText(locale, pair.value);
}

export function getProductBusinessCategories(
  locale: Locale,
  product: ProductJson,
  limit = 2,
) {
  const sourceCategories = [
    ...(product.categories?.en || []),
    ...(product.categories?.zh || []),
    ...(product.tags?.flatMap((tag) => [tag.en, tag.zh]) || []),
  ];
  const pairCategories = [
    ...(product.attributePairs || []),
    ...(product.productAttributes || []),
    ...(product.specifications || []),
  ]
    .map((pair) => getBusinessCategoryPairValue(locale, pair))
    .filter(Boolean);

  return uniqueSeoKeywords(
    [
      ...pairCategories,
      ...getMappedCategorySeoKeywords(locale, sourceCategories),
      ...getKeywordPool(locale, seoKeywordPools.products),
    ],
    limit,
  );
}

export function getShowcaseCatalog(): ShowcaseCatalogItem[] {
  return products.map((product, index) => {
    const seed: ShowcaseProductSeed = {
      productId: product.productId,
      label: {
        en: product.title?.en || product.productId,
        zh: product.title?.zh || product.title?.en || product.productId,
      },
      summary: normalizeCatalogSummary(product),
      collection: deriveCollection(product),
      ageGroup: deriveAgeGroup(product),
      pieceBand: derivePieceBand(product),
      hero: index < 3,
      bestseller: index < 4,
    };

    return {
      ...seed,
      product,
      images: product.images || [],
    };
  });
}

function getCuratedShowcaseItems(
  productIds: readonly string[],
  fallbackLimit = productIds.length,
) {
  const catalog = getShowcaseCatalog();
  const byId = new Map(catalog.map((item) => [item.product.productId, item]));
  const curated = productIds
    .map((productId) => byId.get(productId))
    .filter((item): item is ShowcaseCatalogItem => Boolean(item));

  if (curated.length >= fallbackLimit) {
    return curated;
  }

  const selectedIds = new Set(curated.map((item) => item.product.productId));

  return [
    ...curated,
    ...catalog
      .filter((item) => !selectedIds.has(item.product.productId))
      .slice(0, fallbackLimit - curated.length),
  ];
}

export function getHomeFeaturedShowcaseCatalog() {
  return getCuratedShowcaseItems(curatedHomeBestsellerIds);
}

export function getProductsFeaturedRailCatalog() {
  return getCuratedShowcaseItems(
    curatedProductsFeaturedRailIds,
    curatedProductsFeaturedRailIds.length,
  ).map((item) => {
    const overrideImage = productsFeaturedRailImageOverrides[item.product.productId];

    return overrideImage
      ? {
          ...item,
          images: [overrideImage, ...item.images.filter((image) => image !== overrideImage)],
        }
      : item;
  });
}

export function findShowcaseProduct(productId: string) {
  return getShowcaseCatalog().find((item) => item.product.productId === productId);
}

export function getRelatedShowcaseProducts(productId: string, limit = 3) {
  const catalog = getShowcaseCatalog();
  const current = catalog.find((item) => item.product.productId === productId);

  if (!current) {
    return catalog.slice(0, limit);
  }

  return catalog
    .filter((item) => item.product.productId !== productId)
    .sort((a, b) => {
      const collectionMatch = Number(b.collection === current.collection) - Number(a.collection === current.collection);
      if (collectionMatch !== 0) {
        return collectionMatch;
      }

      return a.label.en?.localeCompare(b.label.en ?? "") ?? 0;
    })
    .slice(0, limit);
}

export function getAdjacentShowcaseProducts(productId: string) {
  const catalog = getShowcaseCatalog();
  const index = catalog.findIndex((item) => item.product.productId === productId);

  return {
    previous: index > 0 ? catalog[index - 1] : undefined,
    next: index >= 0 && index < catalog.length - 1 ? catalog[index + 1] : undefined,
  };
}

export function getProductPiecesLabel(item: ShowcaseCatalogItem) {
  if (sourcedProductCollections.has(item.collection)) return item.product.productId;
  const pieceCount = extractPieceCount(item.product);
  return pieceCount ? `${pieceCount} PCS` : item.pieceBand.toUpperCase();
}

export function getProductPriceLabel(item: ShowcaseCatalogItem, locale: Locale = "en") {
  return (
    item.product.pricing?.display?.[locale] ||
    item.product.pricing?.display?.en ||
    item.product.pricing?.display?.zh ||
    "Quote on request"
  );
}

export function getPrimaryAttributes(product: ProductJson, limit = 6) {
  return (product.attributePairs || [])
    .filter((pair) => (pair.key?.en || pair.key?.zh) && (pair.value?.en || pair.value?.zh))
    .slice(0, limit);
}

export function getPackagingAttributes(product: ProductJson, limit = 4) {
  return (product.packagingPairs || [])
    .filter((pair) => (pair.key?.en || pair.key?.zh) && (pair.value?.en || pair.value?.zh))
    .slice(0, limit);
}

export function getNewsList() {
  return [...newsArticles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function findNewsArticle(slug: string): NewsArticleSeed | undefined {
  return getNewsList().find((item) => item.slug === slug);
}

export function getRecentNews(slug: string, limit = 4) {
  return getNewsList().filter((item) => item.slug !== slug).slice(0, limit);
}

export function getAdjacentNews(slug: string) {
  const list = getNewsList();
  const index = list.findIndex((item) => item.slug === slug);

  return {
    previous: index >= 0 ? list[index + 1] : undefined,
    next: index > 0 ? list[index - 1] : undefined,
  };
}

export function formatPublishedDate(locale: Locale, publishedAt: string) {
  const dateFormats: Record<Locale, Intl.DateTimeFormatOptions & {localeCode: string}> = {
    en: {localeCode: "en-US", month: "short", day: "numeric", year: "numeric"},
    zh: {localeCode: "zh-CN", month: "numeric", day: "numeric", year: "numeric"},
  };
  const {localeCode, ...formatOptions} = dateFormats[locale];

  return new Intl.DateTimeFormat(localeCode, {
    ...formatOptions,
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${publishedAt}T00:00:00Z`));
}

export function getNewsCategoryLabel(locale: Locale, article: NewsArticleSeed) {
  const labels: Record<NewsArticleSeed["category"], {en: string; zh: string}> = {
    all: {en: "All News", zh: "全部新闻"},
    company: {en: "Factory & Delivery", zh: "工厂与交付"},
    product: {en: "Products & Customization", zh: "产品与定制"},
    events: {en: "Events & Exhibitions", zh: "活动与展会"},
    insights: {en: "Industry Insights", zh: "行业洞察"},
    awards: {en: "Qualifications & Honors", zh: "资质与荣誉"},
  };

  return t(locale, labels[article.category]);
}
