import fs from "node:fs/promises";
import path from "node:path";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageLinks } from "@/components/page-links";
import { ProductMediaGallery } from "@/components/product-media-gallery";
import { ProductVisual } from "@/components/icon-visuals";
import { StructuredData } from "@/components/structured-data";
import { companyProfile, products, productsPageContent } from "@/content/site";
import type { Product, ProductModule } from "@/content/site/shared";
import { type Locale, getLocaleFromParams, locales, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { toAbsoluteUrl } from "@/lib/site-config";

type SnapshotLocalizedText = Partial<Record<Locale, string>>;
type SnapshotLocalizedList = Partial<Record<Locale, string[]>>;
type ProductSnapshotTag = {
  key: string;
  zh: string;
  en: string;
};
type ProductSnapshotPair = {
  key: SnapshotLocalizedText;
  value: SnapshotLocalizedText;
};
type ProductSnapshotPriceTier = {
  quantity: SnapshotLocalizedText;
  price: string;
};
type ProductSnapshot = {
  offerId: string;
  module: ProductModule;
  priority: number;
  tags: ProductSnapshotTag[];
  title: SnapshotLocalizedText;
  summary: SnapshotLocalizedText;
  description: SnapshotLocalizedList;
  priceTiers: ProductSnapshotPriceTier[];
  attributes: ProductSnapshotPair[];
  packaging: ProductSnapshotPair[];
  images: string[];
  videos: string[];
  sourceUrl?: string;
};

const DATA_ROOT = path.join(process.cwd(), "data/1688-products");
const MODULES: ProductModule[] = ["toys", "tubes", "equipment"];

const detailPageCopy = {
  module: {
    toys: { zh: "玩具", en: "Toys" },
    tubes: { zh: "管材", en: "Tubes" },
    equipment: { zh: "设备", en: "Equipment" },
  },
  summaryTitle: { zh: "产品摘要", en: "Summary" },
  descriptionTitle: { zh: "产品详情", en: "Description" },
  priceTiersTitle: { zh: "阶梯价格", en: "Price Tiers" },
  priceTierQty: { zh: "采购数量", en: "Quantity" },
  priceTierPrice: { zh: "单价", en: "Unit Price" },
  attributesTitle: { zh: "产品属性", en: "Attributes" },
  packagingTitle: { zh: "包装信息", en: "Packaging" },
  backToList: { zh: "返回产品列表", en: "Back to Products" },
  emptyData: { zh: "暂无数据", en: "No data yet" },
};

function parseJsonSafely<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function normalizeMediaUrl(offerId: string, kind: "images" | "videos", input: string): string {
  if (!input) return "";
  if (input.startsWith("/api/1688-products/")) return input;
  const filename = input.replace(/\\/g, "/").split("/").filter(Boolean).at(-1);
  if (!filename) return "";
  return `/api/1688-products/${offerId}/${kind}/${filename}`;
}

function uniqueMedia(items: string[]): string[] {
  return Array.from(new Set(items.filter(Boolean)));
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function localizeText(
  locale: Locale,
  value: SnapshotLocalizedText | undefined,
  fallback: string
): string {
  if (!value) return fallback;
  return value[locale] || value.en || value.zh || fallback;
}

function localizeList(
  locale: Locale,
  value: SnapshotLocalizedList | Partial<Record<Locale, string | string[]>> | undefined,
  fallback: string[]
): string[] {
  if (!value) return fallback;
  const localized = value[locale] || value.en || value.zh;
  if (!localized) return fallback;
  if (Array.isArray(localized)) {
    const cleaned = localized.map((item) => String(item).trim()).filter(Boolean);
    return cleaned.length > 0 ? cleaned : fallback;
  }
  if (typeof localized === "string") {
    const cleaned = splitParagraphs(localized);
    return cleaned.length > 0 ? cleaned : fallback;
  }
  return fallback;
}

async function readProductSnapshot(product: Product): Promise<ProductSnapshot | null> {
  if (!product.offerId) return null;

  const fileCandidates = [
    path.join(DATA_ROOT, product.offerId, "product.json"),
    ...MODULES.map((moduleName) => path.join(DATA_ROOT, moduleName, product.offerId!, "product.json")),
  ];

  for (const filePath of fileCandidates) {
    try {
      const raw = await fs.readFile(filePath, "utf8");
      const parsed = parseJsonSafely<ProductSnapshot>(raw);
      if (parsed?.offerId) {
        return parsed;
      }
    } catch {
      // continue probing candidates
    }
  }

  return null;
}

function moduleLabel(locale: Locale, module: ProductModule): string {
  return t(locale, detailPageCopy.module[module]);
}

function getTagLabel(locale: Locale, tag: ProductSnapshotTag): string {
  return locale === "zh" ? tag.zh : tag.en;
}

function getPairLabel(locale: Locale, pair: ProductSnapshotPair): string {
  return localizeText(locale, pair.key, "");
}

function getPairValue(locale: Locale, pair: ProductSnapshotPair): string {
  return localizeText(locale, pair.value, "");
}

function isEquipmentTag(tag: { key?: string; zh?: string; en?: string }): boolean {
  return Boolean(
    String(tag.key || "").includes("equipment") ||
      String(tag.zh || "").includes("设备") ||
      /\bequipment\b/i.test(String(tag.en || ""))
  );
}

function resolveDisplayModule(snapshot: ProductSnapshot | null, product: Product): ProductModule {
  if (snapshot?.module === "equipment" || product.module === "equipment") {
    return "equipment";
  }

  const tags = snapshot?.tags?.length ? snapshot.tags : product.tags;
  if (tags.some((tag) => isEquipmentTag(tag))) {
    return "equipment";
  }

  return snapshot?.module ?? product.module;
}

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocaleFromParams(params as Promise<{locale: string}>);
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return buildMetadata(
      locale,
      t(locale, productsPageContent.seo.title),
      t(locale, productsPageContent.seo.description),
      'products',
      t(locale, productsPageContent.seo.keywords)
    );
  }

  const snapshot = await readProductSnapshot(product);
  const productName = localizeText(locale, snapshot?.title, t(locale, product.title));
  const descriptionSource = localizeList(
    locale,
    snapshot?.description,
    splitParagraphs(localizeText(locale, snapshot?.summary, t(locale, product.summary)))
  );
  const description = descriptionSource.join(" ").trim() || t(locale, productsPageContent.seo.description);
  const title = t(locale, productsPageContent.seo.detailTitleTemplate).replace("{product}", productName);
  const keywordTags =
    snapshot?.tags
      ?.map((item) => getTagLabel(locale, item))
      .filter(Boolean)
      .slice(0, 10) ?? [];
  const keywords = keywordTags.length > 0 ? keywordTags : t(locale, product.seoKeywords);

  return buildMetadata(
    locale,
    title,
    description,
    `products/${product.slug}`,
    keywords
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocaleFromParams(params as Promise<{locale: string}>);
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const snapshot = await readProductSnapshot(product);
  const localizedTitle = localizeText(locale, snapshot?.title, t(locale, product.title));
  const localizedSummary = localizeText(locale, snapshot?.summary, t(locale, product.summary));
  const summaryParagraphs = splitParagraphs(localizedSummary);
  const descriptionParagraphs = localizeList(locale, snapshot?.description, summaryParagraphs);
  const galleryImages = uniqueMedia(
    snapshot?.offerId
      ? (snapshot.images ?? []).map((item) => normalizeMediaUrl(snapshot.offerId, "images", item))
      : [product.image, ...(product.gallery ?? [])]
  );
  const productVideos = uniqueMedia(
    snapshot?.offerId
      ? (snapshot.videos ?? []).map((item) => normalizeMediaUrl(snapshot.offerId, "videos", item))
      : product.videos ?? []
  );
  const tagItems = snapshot?.tags?.length ? snapshot.tags : product.tags;
  const priceTiers = snapshot?.priceTiers ?? [];
  const attributes = snapshot?.attributes ?? [];
  const packaging = snapshot?.packaging ?? [];
  const displayModule = resolveDisplayModule(snapshot, product);

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: localizedTitle,
    description: descriptionParagraphs.join(" "),
    image: galleryImages.map((item) => toAbsoluteUrl(item)),
    brand: {
      "@type": "Brand",
      name: t(locale, companyProfile.brandShort),
    },
    manufacturer: {
      "@type": "Organization",
      name: t(locale, companyProfile.companyName),
    },
    category: moduleLabel(locale, displayModule),
    ...(productVideos.length > 0
      ? {
          video: productVideos.map((item) => ({
            "@type": "VideoObject",
            name: localizedTitle,
            contentUrl: toAbsoluteUrl(item),
          })),
        }
      : {}),
  };

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <StructuredData data={productStructuredData} />
      <main className="pb-16 pt-8 sm:pb-20 sm:pt-10">
        <div className="mb-6 sm:mb-8">
          <Link
            className="inline-flex items-center gap-2 rounded-full border border-outline-variant/40 bg-surface px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-surface-container"
            href={localizedPath(locale, "products")}
          >
            <span>{"<-"}</span>
            <span>{t(locale, detailPageCopy.backToList)}</span>
          </Link>
        </div>
        <section className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {galleryImages.length > 0 ? (
              <ProductMediaGallery
                images={galleryImages}
                title={localizedTitle}
                videos={productVideos}
              />
            ) : (
              <div className="overflow-hidden rounded-xl shadow-2xl">
                <ProductVisual label={moduleLabel(locale, displayModule)} slug={product.slug} />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">
              {moduleLabel(locale, displayModule)}
            </span>
            <h1 className="mt-2 font-headline text-3xl font-extrabold leading-none tracking-tighter text-primary sm:text-5xl lg:text-6xl">
              {localizedTitle}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 lg:mt-8">
              {tagItems.slice(0, 8).map((tag) => (
                <span
                  key={tag.key}
                  className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary sm:text-sm"
                >
                  {getTagLabel(locale, tag)}
                </span>
              ))}
            </div>
            <div className="mt-5 space-y-3 text-base leading-relaxed text-on-surface-variant sm:mt-6 lg:text-lg">
              {summaryParagraphs.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>

            <div className="mt-8 rounded-xl bg-surface-container-low p-4 sm:mt-10 sm:p-5 lg:mt-12 lg:p-6">
              <h3 className="font-label text-xs font-bold uppercase tracking-widest text-outline">
                {t(locale, detailPageCopy.priceTiersTitle)}
              </h3>
              {priceTiers.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4">
                  {priceTiers.map((tier, index) => (
                    <div key={`${tier.price}-${index}`} className="rounded-xl bg-white/80 p-4">
                      <p className="text-xs uppercase tracking-widest text-outline">
                        {t(locale, detailPageCopy.priceTierQty)}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {localizeText(locale, tier.quantity, t(locale, detailPageCopy.emptyData))}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-widest text-outline">
                        {t(locale, detailPageCopy.priceTierPrice)}
                      </p>
                      <p className="mt-1 text-lg font-bold text-primary">{tier.price || t(locale, detailPageCopy.emptyData)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-on-surface-variant">{t(locale, detailPageCopy.emptyData)}</p>
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4 lg:mt-12">
              <Link className="flex items-center justify-center gap-3 rounded-full bg-secondary py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-on-secondary-fixed-variant sm:py-5 sm:text-xl" data-track-event="product_cta_click" data-track-label={product.slug} data-track-location="product_detail_contact" href={localizedPath(locale, "contact")}>
                {t(locale, productsPageContent.detail.primaryAction)}
                <span>{"->"}</span>
              </Link>
              <Link className="rounded-full border-2 border-outline-variant py-3.5 text-center text-base font-bold text-primary transition-colors hover:bg-surface-container-high sm:py-4 sm:text-lg" data-track-event="product_cta_click" data-track-label={product.slug} data-track-location="product_detail_compliance" href={localizedPath(locale, "compliance")}>
                {t(locale, productsPageContent.detail.secondaryAction)}
              </Link>
            </div>

          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-primary py-12 sm:mt-16 sm:py-14 lg:mt-24 lg:py-20">
          <div className="px-4 sm:px-6 md:px-12">
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-white sm:text-4xl lg:text-5xl">
              {t(locale, detailPageCopy.descriptionTitle)}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-on-primary-container sm:mt-8 sm:text-lg lg:mt-10">
              {descriptionParagraphs.length > 0 ? (
                descriptionParagraphs.map((item) => <p key={item}>{item}</p>)
              ) : (
                <p>{t(locale, detailPageCopy.emptyData)}</p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14 sm:mt-16 lg:mt-24">
          <div className="mb-8 max-w-2xl sm:mb-10 lg:mb-12">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">
              {t(locale, detailPageCopy.summaryTitle)}
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tighter text-primary sm:mt-4 sm:text-4xl lg:text-5xl">
              {t(locale, detailPageCopy.attributesTitle)}
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {attributes.length > 0 ? (
              attributes.map((item, index) => (
                <div key={`${getPairLabel(locale, item)}-${index}`} className="rounded-xl bg-surface-container p-5 sm:p-6 lg:p-8">
                  <p className="font-label text-xs font-bold uppercase tracking-widest text-outline">
                    {getPairLabel(locale, item) || t(locale, detailPageCopy.emptyData)}
                  </p>
                  <p className="mt-3 text-base font-semibold leading-relaxed text-primary sm:text-lg">
                    {getPairValue(locale, item) || t(locale, detailPageCopy.emptyData)}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-surface-container p-5 sm:p-6 lg:p-8">
                <p className="text-base text-on-surface-variant">{t(locale, detailPageCopy.emptyData)}</p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-14 sm:mt-16 lg:mt-24">
          <div className="mb-8 max-w-2xl sm:mb-10 lg:mb-12">
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-primary sm:text-4xl lg:text-5xl">
              {t(locale, detailPageCopy.packagingTitle)}
            </h2>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {packaging.length > 0 ? (
              packaging.map((item, index) => (
                <div key={`${getPairLabel(locale, item)}-${index}`} className="rounded-xl bg-surface-container-highest p-5 sm:p-6 lg:p-8">
                  <p className="font-label text-xs font-bold uppercase tracking-widest text-outline">
                    {getPairLabel(locale, item) || t(locale, detailPageCopy.emptyData)}
                  </p>
                  <p className="mt-3 text-base font-semibold leading-relaxed text-primary sm:text-lg">
                    {getPairValue(locale, item) || t(locale, detailPageCopy.emptyData)}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-surface-container-highest p-5 sm:p-6 lg:p-8">
                <p className="text-base text-on-surface-variant">{t(locale, detailPageCopy.emptyData)}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <PageLinks
        description={productsPageContent.detailJourney.description}
        locale={locale}
        route="products"
        title={productsPageContent.detailJourney.title}
      />
    </div>
  );
}
