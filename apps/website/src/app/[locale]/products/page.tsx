import Image from 'next/image';
import Link from 'next/link';
import type {Metadata} from 'next';

import {factoryStoreCountText, productsPageCopy} from '@/content/page-copy';
import {factoryStore, getSiteName, products, seoKeywords} from '@/content/site-content';
import {getLocalizedText, getLocalizedValue} from '@/lib/locale';
import {getLocaleBasePath} from '@/i18n/config';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface ProductsPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: ProductsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const copy = getLocalizedValue(productsPageCopy, locale);
  const title = `${brandName} | ${copy.metadataTitle}`;
  const description = copy.metadataDescription;

  return createPageMetadata({
    locale,
    path: '/products',
    title,
    description,
    keywords: seoKeywords
  });
}

export default async function ProductsPage({params}: ProductsPageProps) {
  const {locale} = await params;
  const copy = getLocalizedValue(productsPageCopy, locale);
  const basePath = getLocaleBasePath(locale);
  const categories = getLocalizedValue(factoryStore.categories, locale);

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{copy.title}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">{copy.intro}</p>
      </div>

      <div className="mt-8 panel-card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.factoryStoreTitle}</h2>
          <p className="text-sm font-semibold text-[#ff6b57]">{factoryStoreCountText(locale, factoryStore.totalProducts)}</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="rounded-full border border-[#d9deef] bg-white px-3 py-1.5 text-xs font-medium text-[#5f6788]">
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {products.map((product, index) => (
          <article key={product.slug} className={`product-card-home product-card-home-${index % 3 === 0 ? 'peach' : index % 3 === 1 ? 'mint' : 'sky'}`}>
            <div className="product-image-shell">
              <Image
                src={product.image}
                alt={getLocalizedText(product.name, locale)}
                width={720}
                height={480}
                className="h-48 w-full object-contain p-6"
              />
            </div>

            <div className="space-y-4 p-6">
              <div>
                <h2 className="font-heading text-xl text-[#1d2340]">{getLocalizedText(product.name, locale)}</h2>
                <p className="mt-2 text-sm leading-7 text-[#5c6384]">{getLocalizedText(product.tagline, locale)}</p>
              </div>

              <div className="grid gap-2 text-xs text-[#5f6788]">
                <p>{copy.material}: {product.material}</p>
                <p>{copy.carton}: {product.cartonSpec}</p>
                <p>{copy.moq}: {product.moq}</p>
                <p>{copy.leadTime}: {product.leadTime}</p>
              </div>

              <Link
                href={`${basePath}/products/${product.slug}`}
                className="inline-flex items-center rounded-full border border-[#d9deef] bg-white px-4 py-2 text-sm font-semibold text-[#1d2340] transition hover:border-[#ffcec1]"
              >
                {copy.viewDetails}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
