import type {Metadata} from "next";
import {notFound} from "next/navigation";
import Link from "next/link";

import "@/styles/pages/products.css";

import {ProductsCatalogClient} from "@/components/products/products-catalog-client";
import {Breadcrumbs} from "@/components/ui/marketing";
import {StructuredData} from "@/components/seo/structured-data";
import {categoryBuyingGuides, productCategoryContent, productCollections} from "@/content/pages/products";
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
  const buyingGuide = categoryBuyingGuides[category.key];
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
    <div className="products-page products-category-page">
      <StructuredData data={structuredData} />
      <header className="products-category-intro">
        <div className="products-category-intro-inner">
          <Breadcrumbs
            className="products-category-breadcrumbs"
            items={[
              {href: homeHref, label: {en: "Home", zh: "首页"}},
              {href: productsHref, label: {en: "Products", zh: "产品"}},
              {label: category.label},
            ]}
            locale={locale}
            trackingLocation="product_category_breadcrumbs"
          />
          <div className="products-category-intro-copy">
            <p className="products-category-intro-eyebrow">
              {t(locale, {en: "Yaoshun Source Factory Category", zh: "尧顺源头工厂品类"})}
            </p>
            <h1 className="products-category-intro-title">{copy.label}</h1>
            <p className="products-category-intro-text">{copy.description}</p>
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
      {buyingGuide ? (
        <section className="products-buying-guide" aria-labelledby="buying-guide-title">
          <h2 id="buying-guide-title">{t(locale, buyingGuide.title)}</h2>
          <div className="products-buying-guide-grid">
            {buyingGuide.sections.map((section) => (
              <article key={section.title.en}>
                <h3>{t(locale, section.title)}</h3>
                <p>{t(locale, section.text)}</p>
                {section.productIds ? (
                  <ul>
                    {section.productIds.map((id) => (
                      <li key={id}><Link href={productPath(locale, id)}>{id}</Link></li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
          <Link className="products-buying-guide-contact" href={localizedPath(locale, "contact")}>
            {t(locale, {en: "Discuss your sourcing requirements", zh: "咨询采购与定制需求"})}
          </Link>
        </section>
      ) : null}
    </div>
  );
}
