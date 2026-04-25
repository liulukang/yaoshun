import type {Metadata} from 'next';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {ProductCard} from '@/components/product-card';
import {pageLabels, productsPageContent, type LocalizedTag} from '@/content/site';
import {productTags, products, type ProductJson} from '@/content/site/products.server';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';

const MATERIAL_TAG_KEYS = new Set([
  'abs',
  'pp',
  'pc',
  'pvc',
  'pu',
  'tpu',
  'pe',
  'pla',
  'etfe',
  'ptfe',
]);

const MODULE_FILTER_TAGS: LocalizedTag[] = [
  {key: 'toys', zh: '玩具', en: 'Toys'},
  {key: 'tubes', zh: '管材', en: 'Tubes'},
  {key: 'equipment', zh: '设备', en: 'Equipment'},
];
const MODULE_FILTER_KEY_SET = new Set(MODULE_FILTER_TAGS.map((item) => item.key));
const PRODUCTS_PER_PAGE = 12;

function isEquipmentProduct(product: ProductJson): boolean {
  if (product.module === 'equipment') return true;
  return (product.tags ?? []).some((tag) =>
    tag.key.includes('equipment') ||
    tag.zh.includes('设备') ||
    /\bequipment\b/i.test(tag.en)
  );
}

function moduleFilterKeyFor(product: ProductJson): 'toys' | 'tubes' | 'equipment' {
  if (isEquipmentProduct(product)) return 'equipment';
  if (product.module === 'toys') return 'toys';
  return 'tubes';
}

function buildTagCountByKey(items: ProductJson[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const product of items) {
    for (const tag of product.tags ?? []) {
      counts.set(tag.key, (counts.get(tag.key) ?? 0) + 1);
    }
  }
  return counts;
}

function buildModuleCountByKey(items: ProductJson[]): Map<string, number> {
  const counts = new Map<string, number>(
    MODULE_FILTER_TAGS.map((tag) => [tag.key, 0])
  );
  for (const product of items) {
    const key = moduleFilterKeyFor(product);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function sortTagsByPopularity(tags: LocalizedTag[], counts: Map<string, number>): LocalizedTag[] {
  return [...tags].sort((a, b) => {
    const diff = (counts.get(b.key) ?? 0) - (counts.get(a.key) ?? 0);
    if (diff !== 0) return diff;
    return a.key.localeCompare(b.key);
  });
}

function pickTopTags(
  tags: LocalizedTag[],
  predicate: (tag: LocalizedTag) => boolean,
  limit: number
): LocalizedTag[] {
  const filtered = tags.filter(predicate);
  return filtered.slice(0, limit);
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, productsPageContent.seo.title),
    t(locale, productsPageContent.seo.description),
    'products',
    t(locale, productsPageContent.seo.keywords)
  );
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{tag?: string | string[]; page?: string | string[]}>;
}) {
  const locale = await getLocaleFromParams(params);
  const resolvedSearchParams = await searchParams;
  const selectedTag = Array.isArray(resolvedSearchParams.tag) ? resolvedSearchParams.tag[0] : resolvedSearchParams.tag;
  const selectedPage = Array.isArray(resolvedSearchParams.page) ? resolvedSearchParams.page[0] : resolvedSearchParams.page;
  const selectedTagKey = selectedTag?.trim() ?? '';
  const parsedPage = Number.parseInt(String(selectedPage ?? '1'), 10);
  const currentPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const tagCountByKey = buildTagCountByKey(products);
  const moduleCountByKey = buildModuleCountByKey(products);
  const displayCountByKey = new Map(tagCountByKey);
  for (const [key, count] of moduleCountByKey.entries()) {
    displayCountByKey.set(key, count);
  }
  const sortedTags = sortTagsByPopularity(productTags, tagCountByKey);
  const selectableTagByKey = new Map<string, LocalizedTag>();
  for (const tag of [...MODULE_FILTER_TAGS, ...productTags]) {
    if (!selectableTagByKey.has(tag.key)) {
      selectableTagByKey.set(tag.key, tag);
    }
  }
  const selectedTagItem = selectableTagByKey.get(selectedTagKey);
  const filteredProducts = selectedTagItem
    ? MODULE_FILTER_KEY_SET.has(selectedTagItem.key)
      ? products.filter((product) => moduleFilterKeyFor(product) === selectedTagItem.key)
      : products.filter((product) => (product.tags ?? []).some((tag) => tag.key === selectedTagItem.key))
    : products;
  const productsPath = localizedPath(locale, 'products');
  const currentFilterLabel = selectedTagItem
    ? t(locale, selectedTagItem)
    : t(locale, productsPageContent.filters.allLabel);
  const moduleFilterTags = MODULE_FILTER_TAGS.filter((tag) => (displayCountByKey.get(tag.key) ?? 0) > 0);
  const materialFilterTags = pickTopTags(sortedTags, (tag) => MATERIAL_TAG_KEYS.has(tag.key), 4);
  const groupedFilterTags = [
    {
      key: 'module',
      title: t(locale, productsPageContent.filters.groupTitles.module),
      tags: moduleFilterTags,
    },
    {
      key: 'material',
      title: t(locale, productsPageContent.filters.groupTitles.material),
      tags: materialFilterTags,
    },
  ].filter((group) => group.tags.length > 0);
  const selectedTagInGroups = groupedFilterTags.some((group) =>
    group.tags.some((tag) => tag.key === selectedTagKey)
  );
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  function buildProductsHref(page: number, tagKey = selectedTagKey): string {
    const params = new URLSearchParams();
    if (tagKey) params.set('tag', tagKey);
    if (page > 1) params.set('page', String(page));
    const query = params.toString();
    return query ? `${productsPath}?${query}` : productsPath;
  }

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-14 pt-8 sm:pb-16 sm:pt-10 md:pt-12">
        <div className="mb-6 sm:mb-8">
          <nav className="mb-4 flex items-center gap-2 font-label text-xs uppercase tracking-widest text-outline">
            <Link className="hover:text-primary" href={`/${locale}`}>
              {t(locale, pageLabels.home)}
            </Link>
            <span>{'/'}</span>
            <span className="font-bold text-primary">{t(locale, pageLabels.products)}</span>
          </nav>
        </div>

        <section className="grid gap-8 sm:gap-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <aside className="h-fit rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-5 shadow-panel sm:p-6 lg:sticky lg:top-28 lg:p-8">
            <h2 className="font-headline text-xl font-extrabold tracking-tight text-primary">{t(locale, productsPageContent.filters.title)}</h2>
            <div className="mt-5 space-y-6">
              <section>
                <div className="grid gap-2.5">
                  <Link
                    className={`rounded-xl px-3 py-2.5 text-sm transition-colors ${
                      selectedTagItem
                        ? 'border border-outline-variant/30 bg-white text-on-surface-variant hover:border-primary/50 hover:bg-surface-container-high'
                        : 'border border-primary bg-primary font-semibold !text-white'
                    }`}
                    href={productsPath}
                  >
                    <span className="flex items-center justify-between">
                      <span>{t(locale, productsPageContent.filters.allLabel)}</span>
                      <span
                        className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          selectedTagItem ? 'bg-surface-container text-primary' : 'bg-white/20 !text-white'
                        }`}
                      >
                        {products.length}
                      </span>
                    </span>
                  </Link>
                </div>
              </section>
              {groupedFilterTags.map((group) => (
                <section key={group.key}>
                  <h3 className="mb-3 font-label text-[10px] font-black uppercase tracking-widest text-primary">{group.title}</h3>
                  <div className="grid gap-2.5">
                    {group.tags.map((tag) => {
                      const isActive = selectedTagItem?.key === tag.key;
                      const href = `${productsPath}?tag=${encodeURIComponent(tag.key)}`;
                      return (
                        <Link
                          key={tag.key}
                          className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                            isActive
                              ? 'border border-primary bg-primary font-semibold !text-white'
                                : 'border border-outline-variant/30 bg-white text-on-surface-variant hover:border-primary/50 hover:bg-surface-container-high'
                          }`}
                          href={buildProductsHref(1, tag.key)}
                        >
                            <span className={`truncate ${isActive ? '!text-white' : ''}`}>{t(locale, tag)}</span>
                          <span className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                              isActive ? 'bg-white/20 !text-white' : 'bg-surface-container text-primary'
                          }`}>
                            {displayCountByKey.get(tag.key) ?? 0}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
              {selectedTagItem && !selectedTagInGroups ? (
                <section>
                  <h3 className="mb-3 font-label text-[10px] font-black uppercase tracking-widest text-primary">
                    {t(locale, {zh: '当前标签', en: 'Current Tag'})}
                  </h3>
                  <div className="grid gap-2.5">
                    <Link
                      className="flex items-center justify-between rounded-xl border border-primary bg-primary px-3 py-2.5 text-sm font-semibold !text-white"
                      href={buildProductsHref(1, selectedTagItem.key)}
                    >
                      <span className="truncate !text-white">{t(locale, selectedTagItem)}</span>
                      <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-bold !text-white">
                        {displayCountByKey.get(selectedTagItem.key) ?? 0}
                      </span>
                    </Link>
                  </div>
                </section>
              ) : null}
            </div>
            <p className="mt-6 rounded-xl bg-white px-3 py-2.5 text-xs text-on-surface-variant">
              {t(locale, productsPageContent.filters.activeFilterPrefix)}
              {': '}
              <span className="font-bold text-primary">{currentFilterLabel}</span>
            </p>
          </aside>

          <section className="grid gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-y-12 md:grid-cols-2 2xl:grid-cols-3">
            {paginatedProducts.map((product, index) => (
              <ProductCard key={product.productId ?? `product-${index}`} locale={locale} product={product} />
            ))}
            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-6 text-sm text-on-surface-variant md:col-span-2 2xl:col-span-3">
                {t(locale, {
                  zh: '该标签下暂无商品，请切换其他标签。',
                  en: 'No products under this tag yet. Try another tag.',
                })}
              </div>
            ) : null}
          </section>
          {filteredProducts.length > 0 ? (
            <div className="mt-8 flex flex-col gap-3 rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low px-4 py-4 sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="text-sm text-on-surface-variant">
                {t(locale, {
                  zh: `第 ${safePage} / ${totalPages} 页，共 ${filteredProducts.length} 个产品`,
                  en: `Page ${safePage} of ${totalPages}, ${filteredProducts.length} products total`,
                })}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  aria-disabled={safePage <= 1}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    safePage <= 1
                      ? 'pointer-events-none border border-outline-variant/20 bg-surface-container text-outline'
                      : 'border border-outline-variant/30 bg-white text-primary hover:border-primary/50 hover:bg-surface-container-high'
                  }`}
                  href={buildProductsHref(Math.max(1, safePage - 1))}
                >
                  {t(locale, {zh: '上一页', en: 'Previous'})}
                </Link>
                <Link
                  aria-disabled={safePage >= totalPages}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    safePage >= totalPages
                      ? 'pointer-events-none border border-outline-variant/20 bg-surface-container text-outline'
                      : 'border border-primary bg-primary !text-white hover:opacity-95'
                  }`}
                  href={buildProductsHref(Math.min(totalPages, safePage + 1))}
                >
                  {t(locale, {zh: '下一页', en: 'Next'})}
                </Link>
              </div>
            </div>
          ) : null}
        </section>

        <section className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, productsPageContent.sourcingSection.title)}</h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {productsPageContent.sourcingSection.cards.map((item) => (
              <article key={item.title.en} className="rounded-[1.25rem] bg-surface-container-low p-5 sm:p-6">
                <h3 className="font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <PageLinks
        description={productsPageContent.journey.description}
        locale={locale}
        route="products"
        title={productsPageContent.journey.title}
      />
    </div>
  );
}
