import type {Metadata} from 'next';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {ProductCard} from '@/components/product-card';
import {pageLabels, products, productsPageContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

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

export default async function ProductsPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

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
                <h3 className="mb-3 font-label text-[10px] font-black uppercase tracking-widest text-primary">{t(locale, productsPageContent.filters.materialTitle)}</h3>
                <div className="grid gap-2.5">
                  {productsPageContent.filters.materialOptions.map((option) => (
                    <div key={option.en} className="rounded-xl bg-white px-3 py-2.5 text-sm text-on-surface-variant">{t(locale, option)}</div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 font-label text-[10px] font-black uppercase tracking-widest text-primary">{t(locale, productsPageContent.filters.cooperationTitle)}</h3>
                <div className="grid gap-2.5">
                  {productsPageContent.filters.cooperationOptions.map((option) => (
                    <div key={option.count} className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-sm font-bold text-primary">
                      <span>{t(locale, option.label)}</span>
                      <span className="text-secondary">{option.count}</span>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h3 className="mb-3 font-label text-[10px] font-black uppercase tracking-widest text-primary">{t(locale, productsPageContent.filters.complianceTitle)}</h3>
                <div className="flex flex-wrap gap-2">
                  {productsPageContent.filters.complianceTags.map((item) => (
                    <span key={item} className="rounded-lg border border-outline-variant bg-white px-3 py-1 font-label text-[9px] font-bold uppercase text-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          <section className="grid gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10 lg:gap-y-12 md:grid-cols-2 2xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} locale={locale} product={product} />
            ))}
          </section>
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
