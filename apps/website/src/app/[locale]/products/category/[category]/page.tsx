import type {Metadata} from "next";
import {notFound} from "next/navigation";

import "@/styles/pages/products.css";

import {ProductsCatalogClient} from "@/components/products/products-catalog-client";
import {StructuredData} from "@/components/seo/structured-data";
import {productCategoryContent, productCollections} from "@/content/pages/products";
import {buildMetadata} from "@/lib/metadata";
import {getLocaleFromParams, locales, t, type Locale} from "@/lib/i18n";
import {
  getProductPiecesLabel,
  getProductPriceLabel,
  getShowcaseCatalog,
} from "@/lib/site-data";
import {localizedPath, localizedUrlPath, productPath} from "@/lib/routes";
import {toAbsoluteUrl} from "@/lib/site-config";

type CategoryParams = {
  locale: string;
  category: string;
};

function getCategory(category: string) {
  return productCollections.find((item) => item.key === category);
}

function categoryCopy(locale: Locale, category: keyof typeof productCategoryContent) {
  return {
    title: t(locale, productCategoryContent[category].title),
    description: t(locale, productCategoryContent[category].description),
    keywords: t(locale, productCategoryContent[category].keywords),
    label: t(locale, productCollections.find((item) => item.key === category)?.label || {}),
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    productCollections.map((collection) => ({
      locale,
      category: collection.key,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryParams>;
}): Promise<Metadata> {
  const {locale: localeParam, category: categoryParam} = await params;
  const locale = await getLocaleFromParams(Promise.resolve({locale: localeParam}));
  const category = getCategory(categoryParam);

  if (!category) notFound();

  const copy = categoryCopy(locale, category.key);
  return buildMetadata(
    locale,
    copy.title,
    copy.description,
    `/products/category/${category.key}`,
    [
      ...copy.keywords,
      copy.label,
    ],
  );
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  const {locale: localeParam, category: categoryParam} = await params;
  const locale = await getLocaleFromParams(Promise.resolve({locale: localeParam}));
  const category = getCategory(categoryParam);

  if (!category) notFound();

  const copy = categoryCopy(locale, category.key);
  const catalog = getShowcaseCatalog().filter(
    (item) => item.collection === category.key,
  );
  const pageHref = localizedUrlPath(
    locale,
    `/products/category/${category.key}`,
  );
  const productsHref = localizedPath(locale, "products");
  const homeHref = localizedPath(locale, "home");
  const catalogItems = catalog.map((item) => ({
    productId: item.product.productId,
    label: item.label,
    summary: item.summary,
    collection: item.collection,
    images: item.images.slice(0, 1),
    piecesLabel: getProductPiecesLabel(item),
    priceLabel: getProductPriceLabel(item, locale),
    bestseller: item.bestseller,
  }));

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: t(locale, {en: "Home", zh: "首页"}),
          item: toAbsoluteUrl(homeHref),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: t(locale, {en: "Products", zh: "产品"}),
          item: toAbsoluteUrl(productsHref),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: copy.label,
          item: toAbsoluteUrl(pageHref),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: copy.title,
      description: copy.description,
      url: toAbsoluteUrl(pageHref),
      inLanguage: locale === "zh" ? "zh-CN" : "en-US",
      about: {
        "@type": "Thing",
        name: copy.label,
      },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: catalogItems.length,
        itemListElement: catalogItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: t(locale, item.label),
          url: toAbsoluteUrl(productPath(locale, item.productId)),
        })),
      },
    },
  ];

  return (
    <div className="products-page">
      <StructuredData data={structuredData} />
      <header className="products-hero">
        <div className="products-hero-inner">
          <div className="products-hero-grid">
            <div className="products-hero-copy">
              <p className="products-hero-eyebrow">
                {t(locale, {en: "Yaoshun Source Factory Category", zh: "尧顺源头工厂品类"})}
              </p>
              <h1 className="products-hero-title">{copy.label}</h1>
              <p className="products-hero-text">{copy.description}</p>
            </div>
          </div>
        </div>
      </header>

      <ProductsCatalogClient
        catalog={catalogItems}
        initialQuery={{category: category.key}}
        locale={locale}
        paginationHref={pageHref}
        text={{
          allProducts: t(locale, {en: "All Products", zh: "全部产品"}),
          categories: t(locale, {en: "Categories", zh: "分类"}),
        }}
      />
    </div>
  );
}
