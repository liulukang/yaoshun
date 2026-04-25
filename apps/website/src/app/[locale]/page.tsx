import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {
  homeContent,
  siteStats,
  type LocalizedText,
  type ProductModule
} from '@/content/site';
import {
  getProductImages,
  getProductSummary,
  getProductVideos,
  products,
  productsByModule,
  type ProductJson
} from '@/content/site/products.server';
import {getLocaleFromParams, t, type Locale} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath, productPath, type RouteKey} from '@/lib/routes';

type ModuleSpotlight = {
  title: LocalizedText;
  description: LocalizedText;
  accentClass: string;
};

const moduleOrder: ProductModule[] = ['toys', 'tubes', 'equipment'];

const moduleSpotlights: Record<ProductModule, ModuleSpotlight> = {
  toys: {
    title: {en: 'Toy Programs', zh: '玩具成品与项目'},
    description: {
      en: 'Finished products, structural kits, and educational toy lines with OEM/ODM delivery support.',
      zh: '覆盖成品玩具、结构套件与益智玩具线，支持 OEM/ODM 交付。'
    },
    accentClass: 'bg-[#0f3b99] text-white'
  },
  tubes: {
    title: {en: 'Tube & Profile Manufacturing', zh: '管材与型材制造'},
    description: {
      en: 'PVC/PU profile and extrusion capabilities for toys, lighting, and industrial custom projects.',
      zh: '面向玩具、照明与工业项目提供 PVC/PU 型材与挤出配套能力。'
    },
    accentClass: 'bg-[#006b62] text-white'
  },
  equipment: {
    title: {en: 'Equipment & Engineering', zh: '设备与工程配套'},
    description: {
      en: 'Custom machine lines and engineering support for scaling production and stable delivery.',
      zh: '提供设备产线与工程配套，支撑量产落地与稳定交付。'
    },
    accentClass: 'bg-[#8a4b00] text-white'
  }
};

const moduleFallbackImage: Record<ProductModule, string> = {
  toys: homeContent.categories[0]?.image ?? '',
  tubes: homeContent.categories[1]?.image ?? '',
  equipment: homeContent.categories[2]?.image ?? ''
};

function collectImageSources(product: ProductJson): string[] {
  return getProductImages(product);
}

function countMedia(items: ProductJson[]): {images: number; videos: number} {
  const imageSet = new Set<string>();
  const videoSet = new Set<string>();

  for (const item of items) {
    for (const src of collectImageSources(item)) {
      imageSet.add(src);
    }
    for (const src of getProductVideos(item)) {
      videoSet.add(src);
    }
  }

  return {images: imageSet.size, videos: videoSet.size};
}

function pickHeroImages(items: ProductJson[], limit = 3): string[] {
  const picked: string[] = [];
  const seen = new Set<string>();

  for (const product of items) {
    for (const src of collectImageSources(product)) {
      if (seen.has(src)) continue;
      seen.add(src);
      picked.push(src);
      if (picked.length >= limit) return picked;
    }
  }

  return picked;
}

function pickTagPreview(locale: Locale, items: ProductJson[], limit = 3): string[] {
  const tags: string[] = [];
  const seen = new Set<string>();

  for (const product of items) {
    for (const tag of product.tags ?? []) {
      const label = t(locale, tag);
      if (seen.has(label)) continue;
      seen.add(label);
      tags.push(label);
      if (tags.length >= limit) return tags;
    }
  }

  return tags;
}

function localizeProductText(locale: Locale, value: ProductJson['title'], fallback: string): string {
  if (!value) return fallback;
  return value[locale] || value.en || value.zh || fallback;
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, homeContent.seo.title),
    t(locale, homeContent.seo.description),
    '',
    t(locale, homeContent.seo.keywords)
  );
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);
  const quickEntries = homeContent.entrySection.entries.filter((item) =>
    item.route === 'products' || item.route === 'solutions' || item.route === 'about' || item.route === 'contact'
  );
  const featuredProducts = products.filter((item) => Boolean(item.productId) && collectImageSources(item).length > 0).slice(0, 6);
  const heroImages = pickHeroImages(featuredProducts.length > 0 ? featuredProducts : products);
  const heroPrimary = heroImages[0] ?? moduleFallbackImage.toys;
  const heroSecondary = heroImages[1] ?? moduleFallbackImage.tubes;
  const heroTertiary = heroImages[2] ?? moduleFallbackImage.equipment;
  const totalOffers = new Set(
    products
      .map((item) => item.productId)
      .filter((value): value is string => Boolean(value))
  ).size;
  const totalTags = new Set(products.flatMap((item) => (item.tags ?? []).map((tag) => tag.key))).size;
  const media = countMedia(products);
  const moduleCards = moduleOrder.map((module) => {
    const moduleProducts = productsByModule[module];
    const coverProduct = moduleProducts.find((item) => collectImageSources(item).length > 0);
    const cover = (coverProduct ? collectImageSources(coverProduct)[0] : '') || moduleFallbackImage[module];
    const tags = pickTagPreview(locale, moduleProducts, 3);
    return {
      module,
      total: moduleProducts.length,
      cover,
      tags,
      ...moduleSpotlights[module]
    };
  }).filter((item) => item.total > 0);
  const overviewStats = [
    {
      value: String(products.length),
      label: {en: 'Catalog SKUs', zh: '产品 SKU 数'},
      helper: {en: 'Imported from 1688-products-new', zh: '来自 1688-products-new 数据源'}
    },
    {
      value: String(totalOffers),
      label: {en: 'Offer IDs', zh: 'Offer ID 数'},
      helper: {en: 'Traceable source mapping', zh: '可追溯源链接映射'}
    },
    {
      value: String(media.images),
      label: {en: 'Image Assets', zh: '图片素材数'},
      helper: {en: 'Used in pages and product cards', zh: '用于首页与产品详情展示'}
    },
    {
      value: String(media.videos),
      label: {en: 'Video Assets', zh: '视频素材数'},
      helper: {en: 'Ready for rich media modules', zh: '可用于富媒体展示模块'}
    },
    {
      value: String(totalTags),
      label: {en: 'Tag Categories', zh: '标签分类数'},
      helper: {en: 'Scenario and material labels', zh: '覆盖场景与材质标签'}
    },
    {
      value: String(productsByModule.toys.length),
      label: {en: 'Toy SKUs', zh: '玩具 SKU 数'},
      helper: {en: 'Toy-focused core business', zh: '玩具主业务核心库存'}
    }
  ];

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="full-bleed relative min-h-[calc(100svh-4rem)] overflow-hidden bg-[#06184a] xl:min-h-[calc(100svh-5rem)]">
        {heroPrimary ? (
          <Image
            alt={t(locale, {en: 'Factory and product visual', zh: '工厂与产品视觉图'})}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            fill
            priority
            sizes="100vw"
            src={heroPrimary}
          />
        ) : null}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.26),transparent_45%),linear-gradient(130deg,rgba(6,24,74,0.95),rgba(5,16,52,0.95)_45%,rgba(7,56,103,0.88))]" />

        <div className="relative mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:py-24 xl:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end xl:gap-10">
            <div>
              <span className="block font-label text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-fixed sm:text-xs">{t(locale, homeContent.hero.eyebrow)}</span>
              <h1 className="hero-title mt-4 max-w-4xl font-headline text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {t(locale, homeContent.hero.title)}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-primary-fixed sm:text-lg lg:mt-6">{t(locale, homeContent.hero.description)}</p>

              <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
                <Link
                  className="inline-block w-full rounded-full bg-[#ff8a00] px-6 py-3.5 text-center text-sm font-extrabold text-[#111827] shadow-[0_16px_30px_-18px_rgba(255,138,0,0.95)] transition-all hover:bg-[#ff9f2f] hover:shadow-[0_22px_36px_-16px_rgba(255,138,0,0.98)] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
                  data-track-event="hero_cta_click"
                  data-track-label="home_factory"
                  data-track-location="home_hero"
                  href={localizedPath(locale, 'factory')}
                >
                  {t(locale, homeContent.hero.primary)}
                </Link>
                <Link
                  className="inline-block w-full rounded-full border border-white/45 bg-white px-6 py-3.5 text-center text-sm font-bold text-[#102166] transition-all hover:bg-[#f4f7ff] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
                  data-track-event="hero_cta_click"
                  data-track-label="home_products"
                  data-track-location="home_hero"
                  href={localizedPath(locale, 'products')}
                >
                  {t(locale, homeContent.hero.secondary)}
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {siteStats.map((item) => (
                  <div key={t(locale, item.label)} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                    <p className="font-headline text-2xl font-black text-secondary-fixed">{t(locale, item.value)}</p>
                    <p className="mt-1 text-xs text-primary-fixed">{t(locale, item.label)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-white/20 sm:col-span-2">
                {heroSecondary ? (
                  <Image
                    alt={t(locale, {en: 'Production line', zh: '生产线展示'})}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 35vw, 95vw"
                    src={heroSecondary}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-fixed">{t(locale, {en: 'Data Synced', zh: '数据已同步'})}</p>
                  <p className="mt-1 text-lg font-extrabold text-white">
                    {t(locale, {
                      en: `${products.length} products ready for showcase`,
                      zh: `${products.length} 条产品数据可用于展示`
                    })}
                  </p>
                </div>
              </article>

              <article className="relative min-h-[150px] overflow-hidden rounded-[1.5rem] border border-white/20">
                {heroTertiary ? (
                  <Image
                    alt={t(locale, {en: 'Product components', zh: '产品结构件'})}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 17vw, 47vw"
                    src={heroTertiary}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <p className="absolute bottom-3 left-3 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                  {t(locale, {en: 'Visual Archive', zh: '图文素材库'})}
                </p>
              </article>

              <article className="rounded-[1.5rem] border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-secondary-fixed">{t(locale, {en: 'Coverage', zh: '覆盖范围'})}</p>
                <p className="mt-2 text-2xl font-black text-white">{productsByModule.toys.length + productsByModule.tubes.length + productsByModule.equipment.length}</p>
                <p className="mt-1 text-sm text-primary-fixed">{t(locale, {en: 'Toy + Tube + Equipment Modules', zh: '玩具 + 管材 + 设备三大模块'})}</p>
                <Link
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white transition-transform hover:translate-x-1"
                  href={localizedPath(locale, 'products')}
                >
                  {t(locale, {en: 'Open full catalog', zh: '进入完整目录'})}
                  <span>{'->'}</span>
                </Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <SectionHeading
          description={{
            en: 'Homepage modules are now connected to the full product archive, keeping catalog, media, and source mapping in sync.',
            zh: '首页模块已接入全量产品档案，目录、媒体与源数据映射保持同步。'
          }}
          locale={locale}
          title={{en: 'Live Data Overview', zh: '全量数据总览'}}
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {overviewStats.map((item) => (
            <article key={t(locale, item.label)} className="rounded-[1.5rem] border border-outline-variant/25 bg-white p-5 shadow-panel sm:p-6">
              <p className="font-headline text-4xl font-black text-primary">{item.value}</p>
              <h3 className="mt-3 font-headline text-xl font-bold text-primary">{t(locale, item.label)}</h3>
              <p className="mt-2 text-sm text-on-surface-variant">{t(locale, item.helper)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            description={{
              en: 'Explore by business module first, then drill down into specific products and source-linked details.',
              zh: '先按业务模块浏览，再进入具体产品与可追溯明细。'
            }}
            locale={locale}
            title={homeContent.categoriesSection.title}
          />
          <Link
            className="font-bold text-primary transition-all hover:translate-x-1"
            data-track-event="section_cta_click"
            data-track-label="home_full_catalog"
            data-track-location="home_module_header"
            href={localizedPath(locale, 'products')}
          >
            {t(locale, homeContent.categoriesSection.catalogAction)}
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {moduleCards.map((item) => (
            <article key={item.module} className="overflow-hidden rounded-[1.75rem] border border-outline-variant/20 bg-white shadow-panel">
              <div className="relative aspect-[16/10] overflow-hidden">
                {item.cover ? (
                  <Image
                    alt={t(locale, item.title)}
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 31vw, 95vw"
                    src={item.cover}
                  />
                ) : null}
                <div className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${item.accentClass}`}>
                  {t(locale, item.title)}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
                  <p className="rounded-full bg-surface-container px-3 py-1 text-sm font-bold text-primary">{item.total}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.description)}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-on-surface-variant">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-transform hover:translate-x-1"
                  href={`${localizedPath(locale, 'products')}?tag=${encodeURIComponent(item.module)}`}
                >
                  {t(locale, {en: 'Browse module', zh: '查看该模块'})}
                  <span>{'->'}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            description={{
              en: 'Representative SKUs with images, tags, and pricing references from source archives.',
              zh: '展示带图片、标签与价格参考的代表性 SKU，数据源来自归档资料。'
            }}
            locale={locale}
            title={{en: 'Featured Product Showcase', zh: '首页精选产品橱窗'}}
          />
          <Link
            className="font-bold text-primary transition-all hover:translate-x-1"
            data-track-event="section_cta_click"
            data-track-label="home_featured_products"
            data-track-location="home_featured_header"
            href={localizedPath(locale, 'products')}
          >
            {t(locale, {en: 'View All Products ->', zh: '查看全部产品 ->'})}
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredProducts.map((product) => {
            const productId = product.productId || '';
            const productTitle = localizeProductText(locale, product.title, productId);
            const productSummary = localizeProductText(locale, getProductSummary(product), productId);
            const coverImage = collectImageSources(product)[0] ?? '';
            const sourcePrice = product.pricing?.tiers?.[0]?.price ?? product.pricing?.display?.[locale] ?? product.pricing?.display?.en;
            const imageCount = collectImageSources(product).length;
            const videoCount = getProductVideos(product).length;
            return (
              <article key={productId} className="overflow-hidden rounded-[1.75rem] border border-outline-variant/20 bg-white shadow-panel transition-transform hover:-translate-y-1">
                <Link className="group block" href={productPath(locale, productId)}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
                    {coverImage ? (
                      <Image
                        alt={productTitle}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        fill
                        sizes="(min-width: 1280px) 26vw, (min-width: 768px) 43vw, 95vw"
                        src={coverImage}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                      <span>
                        {imageCount}
                        {t(locale, {en: ' images', zh: ' 张图'})}
                      </span>
                      {videoCount > 0 ? (
                        <span>
                          • {videoCount}
                          {t(locale, {en: ' videos', zh: ' 条视频'})}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-headline text-xl font-bold text-primary">{productTitle}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{productSummary}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(product.tags ?? []).slice(0, 3).map((tag) => (
                        <span key={`${productId}_${tag.key}`} className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-semibold text-on-surface-variant">
                          {t(locale, tag)}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface-container-low px-4 py-3">
                      <p className="text-sm font-bold text-primary">
                        {sourcePrice ? sourcePrice : t(locale, {en: 'Price on request', zh: '价格面议'})}
                      </p>
                      <span className="text-sm font-bold text-secondary">{t(locale, {en: 'Open detail ->', zh: '进入详情 ->'})}</span>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="relative overflow-hidden rounded-[2rem] bg-primary p-6 sm:p-8 lg:p-10">
            {heroTertiary ? (
              <Image
                alt={t(locale, {en: 'Production quality scene', zh: '质量与产线场景'})}
                className="object-cover opacity-28"
                fill
                sizes="(min-width: 1280px) 58vw, 100vw"
                src={heroTertiary}
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,17,58,0.88),rgba(0,35,102,0.86))]" />

            <div className="relative">
              <SectionHeading
                description={homeContent.complianceSection.description}
                invert
                locale={locale}
                title={homeContent.complianceSection.title}
              />
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {homeContent.compliance.map((item) => (
                  <article key={t(locale, item.title)} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                    <h3 className="text-base font-bold text-white">{t(locale, item.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80">{t(locale, item.text)}</p>
                  </article>
                ))}
              </div>
            </div>
          </article>

          <div className="space-y-5">
            <article className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 sm:p-8">
              <SectionHeading
                description={homeContent.technologyQualitySection.description}
                locale={locale}
                title={homeContent.technologyQualitySection.title}
              />
              <div className="mt-6 space-y-4">
                {homeContent.technologyQualitySection.items.map((item) => (
                  <article key={t(locale, item.title)} className="rounded-[1.1rem] bg-white p-4">
                    <h3 className="font-headline text-lg font-bold text-primary">{t(locale, item.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                  </article>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-outline-variant/20 bg-white p-6 sm:p-8">
              <SectionHeading
                description={homeContent.casesSection.description}
                locale={locale}
                title={homeContent.casesSection.title}
              />
              <div className="mt-6 space-y-4">
                {homeContent.cases.map((item) => (
                  <article key={t(locale, item.title)} className="rounded-[1.1rem] bg-surface-container-low p-4">
                    <h3 className="font-headline text-lg font-bold text-primary">{t(locale, item.title)}</h3>
                    <p className="mt-2 text-sm text-secondary">{t(locale, item.result)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                  </article>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            description={homeContent.entrySection.description}
            locale={locale}
            title={homeContent.entrySection.title}
          />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-4">
          {quickEntries.map((item) => (
            <Link
              key={item.route}
              className="group rounded-[1.5rem] border border-outline-variant/25 bg-white p-6 transition-all hover:-translate-y-1 hover:border-secondary/45 hover:shadow-panel"
              data-track-event="home_entry_click"
              data-track-label={item.route}
              data-track-location="home_entry_grid"
              href={localizedPath(locale, item.route as RouteKey)}
            >
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
                {item.route === 'products'
                  ? t(locale, {zh: '目录', en: 'Catalog'})
                  : item.route === 'solutions'
                    ? t(locale, {zh: '方案', en: 'Solutions'})
                    : item.route === 'about'
                      ? t(locale, {zh: '公司', en: 'Company'})
                      : t(locale, {zh: '报价', en: 'Quote'})}
              </p>
              <h3 className="mt-3 font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.description)}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-transform group-hover:translate-x-1">
                {t(locale, {zh: '查看详情', en: 'View Detail'})}
                <span>{'->'}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="pb-12">
        <div className="rounded-[1.75rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-7">
          <p className="font-label text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">{t(locale, {en: 'Home Data Source', zh: '首页数据来源'})}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-headline text-2xl font-black text-primary">{products.length}</p>
              <p className="mt-1 text-sm text-on-surface-variant">{t(locale, {en: 'Products loaded from local archives', zh: '本地档案已加载的产品总数'})}</p>
            </div>
            <div>
              <p className="font-headline text-2xl font-black text-primary">{media.images} / {media.videos}</p>
              <p className="mt-1 text-sm text-on-surface-variant">{t(locale, {en: 'Images / Videos available for rich homepage sections', zh: '可用于首页图文模块的图片 / 视频素材'})}</p>
            </div>
            <div>
              <p className="font-headline text-2xl font-black text-primary">{t(locale, {en: 'Synced', zh: '已同步'})}</p>
              <p className="mt-1 text-sm text-on-surface-variant">{t(locale, {en: 'Source path: data/1688-products', zh: '数据路径：data/1688-products'})}</p>
            </div>
          </div>
        </div>
      </section>

      <PageLinks
        description={homeContent.journey.description}
        locale={locale}
        route="home"
        title={homeContent.journey.title}
      />
    </div>
  );
}
