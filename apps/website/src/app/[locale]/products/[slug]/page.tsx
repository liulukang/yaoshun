import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';

import {PageLinks} from '@/components/page-links';
import {companyProfile, pageLabels, products} from '@/data/site';
import {getLocaleFromParams, locales, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';

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
    return buildMetadata(locale, t(locale, companyProfile.companyName), t(locale, companyProfile.tagline), 'products');
  }

  return buildMetadata(locale, `${t(locale, product.title)} | ${t(locale, companyProfile.companyName)}`, t(locale, product.summary), `products/${product.slug}`);
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

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-16 pt-8 sm:pb-20 sm:pt-10">
        <section className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="grid gap-3 sm:gap-4 lg:col-span-7 lg:grid-cols-6">
            <div className="relative overflow-hidden rounded-xl shadow-2xl lg:col-span-6">
              <Image alt={t(locale, product.title)} className="h-[340px] w-full object-cover sm:h-[420px] lg:h-[600px]" height={1200} src={product.image} width={1200} />
              <div className="absolute left-4 top-4 rounded-lg border border-white/20 bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary backdrop-blur sm:left-6 sm:top-6 sm:px-4 sm:py-2 sm:text-xs">
                {t(locale, product.badge)}
              </div>
            </div>
            <div className="overflow-hidden rounded-xl lg:col-span-3">
              <Image alt={t(locale, product.title)} className="aspect-square w-full object-cover" height={640} src={product.image} width={640} />
            </div>
            <div className="overflow-hidden rounded-xl lg:col-span-3">
              <Image alt={t(locale, product.title)} className="aspect-square w-full object-cover" height={640} src={product.image} width={640} />
            </div>
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
              <Link className="flex items-center justify-center gap-3 rounded-full bg-secondary py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-on-secondary-fixed-variant sm:py-5 sm:text-xl" href={localizedPath(locale, 'contact')}>
                {locale === 'en' ? 'Request Bulk Pricing' : '获取批量报价'}
                <span>{'->'}</span>
              </Link>
              <Link className="rounded-full border-2 border-outline-variant py-3.5 text-center text-base font-bold text-primary transition-colors hover:bg-surface-container-high sm:py-4 sm:text-lg" href={localizedPath(locale, 'compliance')}>
                {locale === 'en' ? 'Review Compliance Files' : '查看资质资料'}
              </Link>
            </div>

            <div className="mt-8 rounded-xl border border-outline-variant/10 bg-surface-container-lowest px-4 py-5 sm:mt-10 sm:py-6 lg:mt-12">
              <div className="flex items-center gap-5 sm:gap-8">
                <div>
                  <p className="font-label text-[10px] font-bold uppercase tracking-widest text-outline">{locale === 'en' ? 'MOQ' : '起订量'}</p>
                  <p className="mt-2 font-bold text-primary">{t(locale, product.moq)}</p>
                </div>
                <div>
                  <p className="font-label text-[10px] font-bold uppercase tracking-widest text-outline">{locale === 'en' ? 'Material' : '材质'}</p>
                  <p className="mt-2 font-bold text-primary">{t(locale, product.materials)}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] bg-primary py-12 sm:mt-16 sm:py-14 lg:mt-32 lg:py-24">
          <div className="px-4 sm:px-6 md:px-12">
            <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-white sm:text-4xl lg:text-5xl">{locale === 'en' ? 'Designed For Real Projects' : '为真实项目而组织的能力点'}</h2>
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
              <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary sm:text-sm">{locale === 'en' ? 'Applications' : '应用方向'}</span>
              <h2 className="mt-3 font-headline text-3xl font-extrabold tracking-tighter text-primary sm:mt-4 sm:text-4xl lg:text-5xl">{locale === 'en' ? 'Use Cases & Delivery Notes' : '应用场景与交付说明'}</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-4">
            <div className="relative overflow-hidden rounded-xl bg-surface-container p-5 transition-all hover:shadow-xl sm:p-6 lg:p-10 md:col-span-2">
              <h3 className="text-2xl font-bold text-primary sm:text-3xl">{locale === 'en' ? 'Complete Logistics Kit' : '完整资料包支持'}</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-on-surface-variant sm:mt-4 sm:text-base">
                {locale === 'en'
                  ? 'Quotation discussion can be paired with packaging direction, compliance file preparation, and shipping readiness.'
                  : '报价沟通可以与包装方向、合规资料准备和出货节奏一起推进。'}
              </p>
            </div>
            {product.useCases.map((item) => (
              <div key={t(locale, item)} className="flex flex-col justify-between rounded-xl bg-surface-container-highest p-5 sm:p-6 lg:p-8">
                <div className="h-8 w-8 rounded-full bg-primary-fixed" />
                <div>
                  <h4 className="mt-5 text-lg font-bold text-primary sm:mt-6 sm:text-xl">{t(locale, item)}</h4>
                  <p className="mt-3 text-sm font-label uppercase tracking-wider text-outline">{locale === 'en' ? 'Use case' : '应用方向'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <PageLinks
        description={{en: 'Go back to the catalog, move to compliance review, or open the quote intake page.', zh: '返回目录、查看资质，或直接进入报价流程。'}}
        locale={locale}
        route="products"
        title={{en: 'Continue From This Product', zh: '从当前产品继续'}}
      />
    </div>
  );
}
