import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { PageLinks } from "@/components/page-links";
import { ProductMediaGallery } from "@/components/product-media-gallery";
import { ProductVisual } from "@/components/icon-visuals";
import { StructuredData } from "@/components/structured-data";
import { companyProfile, productsPageContent } from "@/content/site";
import {
  products,
  type ProductJson,
  type ProductJsonLocalizedList,
  type ProductJsonLocalizedText,
  type ProductJsonPair,
  type ProductJsonPriceTier,
} from "@/content/site/products.server";
import type { ProductModule } from "@/content/site/shared";
import { type Locale, getLocaleFromParams, locales, t } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import { localizedPath } from "@/lib/routes";
import { toAbsoluteUrl } from "@/lib/site-config";

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

function normalizeMediaUrl(input: string): string {
  const normalized = String(input || "").replace(/\\/g, "/").trim();
  if (!normalized) return "";
  return /^https?:\/\//i.test(normalized) ? normalized : "";
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

function groupByCount<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items];
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}

function toDetailHighlights(items: string[]): string[] {
  return Array.from(
    new Set(
      items
        .map((item) => item.replace(/\s+/g, " ").trim())
        .filter(Boolean)
    )
  );
}

function localizeText(
  locale: Locale,
  value: ProductJsonLocalizedText | undefined,
  fallback: string
): string {
  if (!value) return fallback;
  return value[locale] || value.en || value.zh || fallback;
}

function localizeList(
  locale: Locale,
  value: ProductJsonLocalizedList | Partial<Record<Locale, string | string[]>> | undefined,
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

function moduleLabel(locale: Locale, module: ProductModule): string {
  return t(locale, detailPageCopy.module[module]);
}

function getTagLabel(locale: Locale, tag: { key?: string; zh?: string; en?: string }): string {
  return localizeText(
    locale,
    {
      zh: tag.zh,
      en: tag.en,
    },
    tag.en || tag.zh || tag.key || ""
  );
}

function getPairLabel(locale: Locale, pair: ProductJsonPair): string {
  return localizeText(locale, pair.key, "");
}

function getPairValue(locale: Locale, pair: ProductJsonPair): string {
  return localizeText(locale, pair.value, "");
}

function isEquipmentTag(tag: { key?: string; zh?: string; en?: string }): boolean {
  return Boolean(
    String(tag.key || "").includes("equipment") ||
      String(tag.zh || "").includes("设备") ||
      /\bequipment\b/i.test(String(tag.en || ""))
  );
}

function resolveDisplayModule(product: ProductJson): ProductModule {
  if (product.module === "equipment") {
    return "equipment";
  }

  const tags = product.tags ?? [];
  if (tags.some((tag) => isEquipmentTag(tag))) {
    return "equipment";
  }

  return product.module === "toys" ? "toys" : "tubes";
}

function findProductBySlug(slug: string): ProductJson | undefined {
  const exact = products.find((item) => item.offerId === slug);
  if (exact) return exact;
  return products.find((item) => item.offerId && slug.endsWith(`-${item.offerId}`));
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products
      .filter((product) => Boolean(product.offerId))
      .map((product) => ({ locale, slug: product.offerId as string }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocaleFromParams(params as Promise<{locale: string}>);
  const product = findProductBySlug(slug);

  if (!product) {
    return buildMetadata(
      locale,
      t(locale, productsPageContent.seo.title),
      t(locale, productsPageContent.seo.description),
      'products',
      t(locale, productsPageContent.seo.keywords)
    );
  }

  const productId = product.offerId || slug;
  const productName = localizeText(locale, product.title, productId);
  const descriptionSource = localizeList(
    locale,
    product.description,
    splitParagraphs(localizeText(locale, product.summary, productName))
  );
  const description = descriptionSource.join(" ").trim() || t(locale, productsPageContent.seo.description);
  const title = t(locale, productsPageContent.seo.detailTitleTemplate).replace("{product}", productName);
  const keywordTags =
    (product.tags ?? [])
      ?.map((item) => getTagLabel(locale, item))
      .filter(Boolean)
      .slice(0, 10);
  const keywords = keywordTags.length > 0 ? keywordTags : [productName];

  return buildMetadata(
    locale,
    title,
    description,
    `products/${productId}`,
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
  const product = findProductBySlug(slug);

  if (!product) {
    notFound();
  }
  if (!product.offerId) {
    notFound();
  }
  if (slug !== product.offerId) {
    redirect(localizedPath(locale, "products") + `/${product.offerId}`);
  }

  const localizedTitle = localizeText(locale, product.title, product.offerId);
  const localizedSummary = localizeText(locale, product.summary, localizedTitle);
  const summaryParagraphs = splitParagraphs(localizedSummary);
  const descriptionParagraphs = localizeList(locale, product.description, summaryParagraphs);
  const detailHighlights = toDetailHighlights(descriptionParagraphs);
  const galleryImages = uniqueMedia((product.images ?? []).map((item) => normalizeMediaUrl(item)));
  const productVideos = uniqueMedia((product.videos ?? []).map((item) => normalizeMediaUrl(item)));
  const tagItems = product.tags ?? [];
  const priceTiers: ProductJsonPriceTier[] = product.priceTiers ?? [];
  const attributes: ProductJsonPair[] = product.attributes ?? [];
  const packaging: ProductJsonPair[] = product.packaging ?? [];
  const attributeRows = groupByCount(attributes, 2);
  const packagingRows = groupByCount(packaging, 2);
  const displayModule = resolveDisplayModule(product);

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
                <ProductVisual label={moduleLabel(locale, displayModule)} slug={product.offerId} />
              </div>
            )}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-[1.75rem] border border-outline-variant/20 bg-surface p-5 shadow-panel sm:p-6 lg:p-7">
              <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">
                {moduleLabel(locale, displayModule)}
              </span>
              <h1 className="mt-3 font-headline text-2xl font-extrabold leading-[1.12] tracking-tight text-primary sm:text-3xl lg:text-4xl">
                {localizedTitle}
              </h1>
              <div className="mt-5 flex flex-wrap gap-2">
                {tagItems.slice(0, 8).map((tag) => (
                  <span
                    key={tag.key}
                    className="rounded-full bg-primary-fixed px-3 py-1 text-xs font-semibold text-primary sm:text-sm"
                  >
                    {getTagLabel(locale, tag)}
                  </span>
                ))}
              </div>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-on-surface-variant lg:text-lg">
                {summaryParagraphs.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-outline-variant/20 bg-surface-container-low p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-label text-xs font-bold uppercase tracking-widest text-outline">
                    {t(locale, detailPageCopy.priceTiersTitle)}
                  </h3>
                  {priceTiers.length > 0 ? (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                      {t(locale, {
                        zh: `${priceTiers.length}档报价`,
                        en: `${priceTiers.length} tiers`,
                      })}
                    </span>
                  ) : null}
                </div>
                {priceTiers.length > 0 ? (
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {priceTiers.map((tier, index) => (
                      <div
                        key={`${tier.price}-${index}`}
                        className={`rounded-lg border px-3 py-2.5 sm:px-3.5 ${
                          index === 0
                            ? "border-outline-variant/20 bg-white/90"
                            : "border-primary/25 bg-primary/5"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-outline">
                            {t(locale, {
                              zh: `档位 ${index + 1}`,
                              en: `Tier ${index + 1}`,
                            })}
                          </p>
                          {index === priceTiers.length - 1 ? (
                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold !text-white">
                              {t(locale, {zh: "推荐", en: "Best"})}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.12em] text-outline">
                          {t(locale, detailPageCopy.priceTierQty)}
                        </p>
                        <p className="mt-0.5 text-sm font-semibold leading-tight text-primary">
                          {localizeText(locale, tier.quantity, t(locale, detailPageCopy.emptyData))}
                        </p>
                        <div className="mt-2 border-t border-outline-variant/15 pt-2">
                          <p className="text-[10px] uppercase tracking-[0.12em] text-outline">
                            {t(locale, detailPageCopy.priceTierPrice)}
                          </p>
                          <p className="mt-0.5 text-base font-extrabold leading-tight text-primary sm:text-lg">
                            {tier.price || t(locale, detailPageCopy.emptyData)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-on-surface-variant">{t(locale, detailPageCopy.emptyData)}</p>
                )}
              </div>

              <div className="mt-5">
                <Link className="flex w-full items-center justify-center gap-2.5 rounded-full bg-primary py-3 text-sm font-bold !text-white shadow-lg transition-all hover:opacity-95 sm:py-3.5 sm:text-base" data-track-event="product_cta_click" data-track-label={product.offerId} data-track-location="product_detail_contact" href={localizedPath(locale, "contact")}>
                  {t(locale, productsPageContent.detail.primaryAction)}
                  <span>{"->"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-primary py-7 sm:mt-16 sm:py-9 lg:mt-20 lg:py-11">
          <div className="px-4 sm:px-6 md:px-10 lg:px-12">
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-white sm:text-4xl lg:text-5xl">
              {t(locale, detailPageCopy.descriptionTitle)}
            </h2>
            <div className="mt-5 sm:mt-6">
              {detailHighlights.length > 0 ? (
                <ul className="grid gap-2.5 sm:gap-3 lg:grid-cols-2">
                  {detailHighlights.map((item, index) => (
                    <li key={`${item}-${index}`} className="rounded-lg border border-white/15 bg-white/[0.08] px-3.5 py-3 sm:px-4">
                      <div className="flex items-start gap-2.5">
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-fixed px-1 text-[10px] font-bold leading-none text-primary">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="pt-0.5 text-sm leading-relaxed text-on-primary-container sm:text-base">{item}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm leading-relaxed text-on-primary-container sm:text-base">
                  {t(locale, detailPageCopy.emptyData)}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-14 sm:mt-16 lg:mt-24">
          <div className="mb-6 max-w-2xl sm:mb-8 lg:mb-10">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">
              {t(locale, detailPageCopy.summaryTitle)}
            </span>
            <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tighter text-primary sm:mt-4 sm:text-4xl lg:text-5xl">
              {t(locale, detailPageCopy.attributesTitle)}
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface-container-lowest">
            {attributes.length > 0 ? (
              <div className="divide-y divide-outline-variant/20">
                {attributeRows.map((row, rowIndex) => (
                  <div key={`attr-row-${rowIndex}`} className="grid md:grid-cols-2">
                    {row.map((item, itemIndex) => (
                      <div
                        key={`${getPairLabel(locale, item)}-${itemIndex}`}
                        className={`px-3 py-2.5 sm:px-4 ${
                          rowIndex % 2 === 0 ? "bg-surface-container-lowest" : "bg-surface-container-low"
                        } ${itemIndex === 1 ? "md:border-l md:border-outline-variant/20" : ""}`}
                      >
                        <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-outline sm:text-[11px]">
                          {getPairLabel(locale, item) || t(locale, detailPageCopy.emptyData)}
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold leading-tight text-primary sm:text-[15px]">
                          {getPairValue(locale, item) || t(locale, detailPageCopy.emptyData)}
                        </p>
                      </div>
                    ))}
                    {row.length === 1 ? (
                      <div className="hidden md:block md:border-l md:border-outline-variant/20" />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 sm:px-5 sm:py-4">
                <p className="text-base text-on-surface-variant">{t(locale, detailPageCopy.emptyData)}</p>
              </div>
            )}
          </div>
        </section>

        <section className="mt-14 sm:mt-16 lg:mt-24">
          <div className="mb-6 max-w-2xl sm:mb-8 lg:mb-10">
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-primary sm:text-4xl lg:text-5xl">
              {t(locale, detailPageCopy.packagingTitle)}
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface-container">
            {packaging.length > 0 ? (
              <div className="divide-y divide-outline-variant/20">
                {packagingRows.map((row, rowIndex) => (
                  <div key={`pack-row-${rowIndex}`} className="grid md:grid-cols-2">
                    {row.map((item, itemIndex) => (
                      <div
                        key={`${getPairLabel(locale, item)}-${itemIndex}`}
                        className={`px-3 py-2.5 sm:px-4 ${
                          rowIndex % 2 === 0 ? "bg-surface-container" : "bg-surface-container-high"
                        } ${itemIndex === 1 ? "md:border-l md:border-outline-variant/20" : ""}`}
                      >
                        <p className="font-label text-[10px] font-bold uppercase tracking-[0.12em] text-outline sm:text-[11px]">
                          {getPairLabel(locale, item) || t(locale, detailPageCopy.emptyData)}
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold leading-tight text-primary sm:text-[15px]">
                          {getPairValue(locale, item) || t(locale, detailPageCopy.emptyData)}
                        </p>
                      </div>
                    ))}
                    {row.length === 1 ? (
                      <div className="hidden md:block md:border-l md:border-outline-variant/20" />
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 sm:px-5 sm:py-4">
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
