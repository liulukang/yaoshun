import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {termsContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, termsContent.seo.title),
    t(locale, termsContent.seo.description),
    'terms',
    t(locale, termsContent.seo.keywords)
  );
}

export default async function TermsPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pt-32">
        <header className="mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-on-primary-fixed">
            <span className="font-label text-xs font-bold uppercase tracking-widest">{t(locale, termsContent.hero.eyebrow)}</span>
          </div>
          <h1 className="mt-5 font-headline text-4xl font-extrabold leading-[0.95] tracking-tighter text-primary sm:mt-6 sm:text-5xl md:text-7xl">{t(locale, termsContent.hero.title)}</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, termsContent.hero.description)}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs sm:mt-6">
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 font-label font-bold uppercase tracking-[0.14em] text-on-surface-variant">
              {t(locale, termsContent.policyMeta.effectiveDateLabel)}: {t(locale, termsContent.policyMeta.effectiveDate)}
            </span>
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 font-label font-bold uppercase tracking-[0.14em] text-on-surface-variant">
              {t(locale, termsContent.policyMeta.updatedDateLabel)}: {t(locale, termsContent.policyMeta.updatedDate)}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl">
          <section className="mb-14 rounded-xl bg-primary-container p-5 text-white shadow-xl sm:mb-16 sm:p-6 lg:mb-20 lg:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">{t(locale, termsContent.summaryCard.title)}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-primary-fixed sm:text-base">{t(locale, termsContent.summaryCard.text)}</p>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-tertiary-fixed">{t(locale, termsContent.summaryCard.note)}</p>
          </section>

          <section className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2">
            {termsContent.sections.map((section) => (
              <article key={t(locale, section.title)} className="rounded-xl bg-surface-container-low p-5 sm:p-6 lg:p-8">
                <h2 className="text-xl font-bold text-primary sm:text-2xl">{t(locale, section.title)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">{t(locale, section.text)}</p>
              </article>
            ))}
          </section>
        </div>
      </main>

      <PageLinks
        description={termsContent.journey.description}
        locale={locale}
        route="terms"
        title={termsContent.journey.title}
      />
    </div>
  );
}
