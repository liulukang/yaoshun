import Image from 'next/image';
import type {Metadata} from 'next';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import {ProductVisual} from '@/components/icon-visuals';
import {PageLinks} from '@/components/page-links';
import {StructuredData} from '@/components/structured-data';
import {companyProfile, products, productsPageContent} from '@/content/site';
import {getLocaleFromParams, locales, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';
import {toAbsoluteUrl} from '@/lib/site-config';

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((product) => ({locale, slug: product.slug})));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
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

  const title = t(locale, productsPageContent.seo.detailTitleTemplate).replace(
    '{product}',
    t(locale, product.title)
  );
  const description = t(locale, productsPageContent.seo.detailDescriptionTemplate).replace(
    '{product}',
    t(locale, product.title)
  );

  return buildMetadata(
    locale,
    title,
    description,
    `products/${product.slug}`,
    t(locale, product.seoKeywords)
  );
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {slug} = await params;
  const locale = await getLocaleFromParams(params as Promise<{locale: string}>);
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const galleryImages = Array.from(
    new Set([product.image, ...(product.gallery ?? [])].filter((item): item is string => Boolean(item)))
  );
  const productVideos = product.videos ?? [];

  const productStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: t(locale, product.title),
    description: t(locale, product.detail),
    image: galleryImages.map((item) => toAbsoluteUrl(item)),
    brand: {
      '@type': 'Brand',
      name: t(locale, companyProfile.brandShort)
    },
    manufacturer: {
      '@type': 'Organization',
      name: t(locale, companyProfile.companyName)
    },
    material: t(locale, product.materials),
    category: t(locale, product.badge),
    ...(productVideos.length > 0
      ? {
          video: productVideos.map((item) => ({
            '@type': 'VideoObject',
            name: t(locale, product.title),
            contentUrl: toAbsoluteUrl(item)
          }))
        }
      : {})
  };

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <StructuredData data={productStructuredData} />
      <main className="pb-16 pt-8 sm:pb-20 sm:pt-10">
        <section className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="grid gap-3 sm:gap-4 lg:col-span-7 lg:grid-cols-6">
            <div className="overflow-hidden rounded-xl shadow-2xl lg:col-span-6">
              {galleryImages[0] ? (
                <div className="relative aspect-[4/3] bg-surface-container-low">
                  <Image
                    alt={t(locale, product.title)}
                    className="object-cover"
                    fill
                    priority
                    sizes="(min-width: 1280px) 56vw, (min-width: 1024px) 52vw, 100vw"
                    src={galleryImages[0]}
                  />
                </div>
              ) : (
                <ProductVisual label={t(locale, product.badge)} slug={product.slug} />
              )}
            </div>
            <div className="overflow-hidden rounded-xl lg:col-span-3">
              {galleryImages[1] ? (
                <div className="relative aspect-[4/3] bg-surface-container-low">
                  <Image
                    alt={`${t(locale, product.title)} 2`}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 24vw, 100vw"
                    src={galleryImages[1]}
                  />
                </div>
              ) : (
                <ProductVisual compact label={t(locale, productsPageContent.detail.highlightsTitle)} slug={product.slug} />
              )}
            </div>
            <div className="overflow-hidden rounded-xl lg:col-span-3">
              {galleryImages[2] ? (
                <div className="relative aspect-[4/3] bg-surface-container-low">
                  <Image
                    alt={`${t(locale, product.title)} 3`}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 24vw, 100vw"
                    src={galleryImages[2]}
                  />
                </div>
              ) : (
                <ProductVisual compact label={t(locale, productsPageContent.detail.applicationsTitle)} slug={product.slug} />
              )}
            </div>
            {productVideos.slice(0, 1).map((video) => (
              <div key={video} className="overflow-hidden rounded-xl border border-outline-variant/20 bg-black lg:col-span-6">
                <video className="h-full w-full" controls preload="metadata">
                  <source src={video} />
                </video>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">{t(locale, product.badge)}</span>
            <h1 className="mt-2 font-headline text-3xl font-extrabold leading-none tracking-tighter text-primary sm:text-5xl lg:text-6xl">{t(locale, product.title)}</h1>
            <p className="mt-4 text-base leading-relaxed text-on-surface-variant sm:mt-6 lg:mt-8 lg:text-lg">{t(locale, product.detail)}</p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:mt-12">
              {product.specs.map((item) => (
                <div key={t(locale, item.label)} className="rounded-xl bg-surface-container-low p-4 sm:p-5 lg:p-6">
                  <span className="block font-label text-xs uppercase tracking-widest text-outline">{t(locale, item.label)}</span>
                  <span className="mt-2 block text-lg font-bold text-primary">{t(locale, item.value)}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4 lg:mt-12">
              <Link className="flex items-center justify-center gap-3 rounded-full bg-secondary py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-on-secondary-fixed-variant sm:py-5 sm:text-xl" data-track-event="product_cta_click" data-track-label={product.slug} data-track-location="product_detail_contact" href={localizedPath(locale, 'contact')}>
                {t(locale, productsPageContent.detail.primaryAction)}
                <span>{'->'}</span>
              </Link>
              <Link className="rounded-full border-2 border-outline-variant py-3.5 text-center text-base font-bold text-primary transition-colors hover:bg-surface-container-high sm:py-4 sm:text-lg" data-track-event="product_cta_click" data-track-label={product.slug} data-track-location="product_detail_compliance" href={localizedPath(locale, 'compliance')}>
                {t(locale, productsPageContent.detail.secondaryAction)}
              </Link>
            </div>

            <div className="mt-8 rounded-xl border border-outline-variant/10 bg-surface-container-lowest px-4 py-5 sm:mt-10 sm:py-6 lg:mt-12">
              <div className="flex items-center gap-5 sm:gap-8">
                <div>
                  <p className="font-label text-[10px] font-bold uppercase tracking-widest text-outline">{t(locale, productsPageContent.detail.moqLabel)}</p>
                  <p className="mt-2 font-bold text-primary">{t(locale, product.moq)}</p>
                </div>
                <div>
                  <p className="font-label text-[10px] font-bold uppercase tracking-widest text-outline">{t(locale, productsPageContent.detail.materialLabel)}</p>
                  <p className="mt-2 font-bold text-primary">{t(locale, product.materials)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-primary py-12 sm:mt-16 sm:py-14 lg:mt-32 lg:py-24">
          <div className="px-4 sm:px-6 md:px-12">
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-white sm:text-4xl lg:text-5xl">{t(locale, productsPageContent.detail.highlightsTitle)}</h2>
            <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:mt-16 lg:gap-12 md:grid-cols-3">
              {product.highlights.map((item) => (
                <div key={t(locale, item)} className="space-y-4 sm:space-y-5 lg:space-y-6">
                  <div className="h-10 w-10 rounded-full bg-secondary-container" />
                  <p className="text-base leading-relaxed text-on-primary-container sm:text-lg">{t(locale, item)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 sm:mt-16 lg:mt-32">
          <div className="mb-8 flex items-end justify-between sm:mb-10 lg:mb-12">
            <div className="max-w-2xl">
              <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">{t(locale, productsPageContent.detail.applicationsEyebrow)}</span>
              <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tighter text-primary sm:mt-4 sm:text-4xl lg:text-5xl">{t(locale, productsPageContent.detail.applicationsTitle)}</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
            <div className="relative overflow-hidden rounded-xl bg-surface-container p-5 transition-all hover:shadow-xl sm:p-6 lg:p-10 md:col-span-2">
              <h3 className="text-2xl font-bold text-primary sm:text-3xl">{t(locale, productsPageContent.detail.logisticsCardTitle)}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-on-surface-variant sm:mt-4 sm:text-base">{t(locale, productsPageContent.detail.logisticsCardText)}</p>
            </div>
            {product.useCases.map((item) => (
              <div key={t(locale, item)} className="flex flex-col justify-between rounded-xl bg-surface-container-highest p-5 sm:p-6 lg:p-8">
                <div className="h-8 w-8 rounded-full bg-primary-fixed" />
                <div>
                  <h4 className="mt-5 text-lg font-bold text-primary sm:mt-6 sm:text-xl">{t(locale, item)}</h4>
                  <p className="mt-3 text-sm font-label uppercase tracking-wider text-outline">{t(locale, productsPageContent.detail.useCaseLabel)}</p>
                </div>
              </div>
            ))}
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
