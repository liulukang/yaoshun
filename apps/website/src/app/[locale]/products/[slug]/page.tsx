import Image from 'next/image';
import Link from 'next/link';
import type {Metadata} from 'next';
import {notFound} from 'next/navigation';

import {JsonLd} from '@/components/seo/json-ld';
import {productDetailPageCopy} from '@/content/page-copy';
import {products, seoKeywords} from '@/content/site-content';
import {locales, getLocaleBasePath} from '@/i18n/config';
import {getLocalizedText, getLocalizedValue} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import {productJsonLd} from '@/lib/structured-data';
import type {Locale} from '@/types/content';

interface ProductDetailProps {
  params: Promise<{locale: Locale; slug: string}>;
}

export function generateStaticParams(): Array<{locale: Locale; slug: string}> {
  return locales.flatMap((locale) => products.map((product) => ({locale, slug: product.slug})));
}

export async function generateMetadata({params}: ProductDetailProps): Promise<Metadata> {
  const {locale, slug} = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return {};
  }

  const copy = getLocalizedValue(productDetailPageCopy, locale);
  const title = `${getLocalizedText(product.name, locale)} | ${copy.metadataTitleSuffix}`;
  const description = getLocalizedText(product.description, locale);

  return createPageMetadata({
    locale,
    path: `/products/${slug}`,
    title,
    description,
    keywords: [...seoKeywords, ...product.keywords]
  });
}

export default async function ProductDetailPage({params}: ProductDetailProps) {
  const {locale, slug} = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const copy = getLocalizedValue(productDetailPageCopy, locale);
  const basePath = getLocaleBasePath(locale);

  return (
    <>
      <JsonLd data={productJsonLd(locale, product)} />
      <section className="section-shell py-14 sm:py-20">
        <div className="panel-card">
          <Link href={`${basePath}/products`} className="text-sm font-semibold text-[#1d7fb8]">
            {copy.backToProducts}
          </Link>
          <h1 className="mt-4 font-heading text-3xl text-[#1d2340] sm:text-4xl">{getLocalizedText(product.name, locale)}</h1>
          <p className="mt-3 text-sm leading-7 text-[#5c6384]">{getLocalizedText(product.tagline, locale)}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="panel-card">
            <Image src={product.image} alt={getLocalizedText(product.name, locale)} width={900} height={560} className="h-auto w-full rounded-3xl border border-[#ece3da] bg-white p-6" />
            <p className="mt-5 text-sm leading-7 text-[#5c6384]">{getLocalizedText(product.description, locale)}</p>
          </article>

          <div className="space-y-6">
            <article className="panel-card">
              <h2 className="font-heading text-2xl text-[#1d2340]">{copy.keySpecifications}</h2>
              <div className="mt-5 grid gap-3 text-sm text-[#5c6384]">
                <p>{copy.material}: {product.material}</p>
                <p>{copy.size}: {product.size}</p>
                <p>{copy.ageRange}: {product.ageRange}</p>
                <p>{copy.cartonSpec}: {product.cartonSpec}</p>
                <p>{copy.cbm}: {product.cbm}</p>
                <p>{copy.moq}: {product.moq}</p>
                <p>{copy.leadTime}: {product.leadTime}</p>
              </div>
            </article>

            <article className="panel-card">
              <h2 className="font-heading text-2xl text-[#1d2340]">{copy.certificationsAndHighlights}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.certifications.map((item) => (
                  <span key={item} className="rounded-full border border-[#dfdfea] bg-white px-3 py-1 text-xs font-semibold text-[#5f6788]">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-3">
                {product.highlights.map((item) => (
                  <div key={item.en} className="glass-list-item">
                    <p className="text-sm leading-7 text-[#5c6384]">{getLocalizedText(item, locale)}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
