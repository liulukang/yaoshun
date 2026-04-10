import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {StructuredData} from '@/components/structured-data';
import {companyProfile, faqContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, faqContent.seo.title),
    t(locale, faqContent.seo.description),
    'faq',
    t(locale, faqContent.seo.keywords)
  );
}

export default async function FaqPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const locale = await getLocaleFromParams(params);
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqContent.questions.map((item) => ({
      '@type': 'Question',
      name: t(locale, item.q),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(locale, item.a)
      }
    }))
  };

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <StructuredData data={faqStructuredData} />
      <main className="max-w-screen-2xl pb-16 pt-16 sm:pb-20 sm:pt-20">
        <header className="mb-12 sm:mb-16 lg:mb-20">
          <span className="block font-label text-xs font-bold uppercase tracking-widest text-secondary">
            {t(locale, faqContent.hero.eyebrow)}
          </span>
          <h1 className="mt-3 font-headline text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl md:text-7xl">
            {t(locale, faqContent.hero.title)}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg">
            {t(locale, faqContent.hero.description)}
          </p>
        </header>

        <section className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary-fixed sm:h-12 sm:w-12" />
              <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{t(locale, faqContent.faqSection.title)}</h2>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {faqContent.questions.map((item) => (
                <article
                  key={t(locale, item.q)}
                  className="rounded-xl border border-transparent bg-surface-container-low p-5 transition-all hover:border-outline-variant/20 hover:bg-surface-container sm:p-6 lg:p-8"
                >
                  <h3 className="font-headline text-lg font-bold text-primary sm:text-xl">
                    {t(locale, item.q)}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">
                    {t(locale, item.a)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6 sm:space-y-8">
            <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-panel sm:p-6 lg:p-8">
              <h3 className="font-headline text-xl font-bold text-primary">{t(locale, faqContent.sidebar.primaryContactTitle)}</h3>
              <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                <p className="font-bold text-primary">{companyProfile.phone}</p>
                <p className="text-sm text-on-surface-variant">{companyProfile.email}</p>
                <p className="text-sm text-on-surface-variant">{t(locale, companyProfile.address)}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-primary-container p-5 text-white sm:p-6 lg:p-8">
              <h3 className="font-headline text-xl font-bold sm:text-2xl">{t(locale, faqContent.sidebar.supportCard.title)}</h3>
              <p className="mt-4 text-sm text-on-primary-container">{t(locale, faqContent.sidebar.supportCard.text)}</p>
            </div>
          </aside>
        </section>

        <section className="mt-12 sm:mt-16 lg:mt-20">
          <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4 lg:mb-12">
            <div className="h-10 w-10 rounded-xl bg-secondary-fixed sm:h-12 sm:w-12" />
            <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{t(locale, faqContent.procurementSection.title)}</h2>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
            {faqContent.procurementSection.items.map((item) => (
              <article key={t(locale, item.title)} className="rounded-[1.25rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
                <h3 className="font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 sm:mt-16 lg:mt-20">
          <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4 lg:mb-12">
            <div className="h-10 w-10 rounded-xl bg-tertiary-fixed sm:h-12 sm:w-12" />
            <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{t(locale, faqContent.logisticsSection.title)}</h2>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] bg-primary p-5 text-white sm:p-6 lg:p-10">
            <div className="relative z-10 grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-10">
              <div>
                <h3 className="font-headline text-2xl font-bold sm:text-3xl">{t(locale, faqContent.logisticsSection.tradeNotesTitle)}</h3>
                <ul className="mt-4 space-y-3 text-sm text-primary-fixed sm:mt-6 sm:space-y-4 sm:text-base">
                  {faqContent.logistics.map((item) => (
                    <li
                      key={t(locale, item.title)}
                      className="flex justify-between gap-6 border-b border-primary-container pb-2"
                    >
                      <span>{t(locale, item.title)}</span>
                      <span className="max-w-[16rem] text-right font-bold text-white">
                        {t(locale, item.text)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-surface-container-lowest/10 p-5 backdrop-blur-md sm:p-6 lg:p-8">
                <h4 className="text-lg font-bold sm:text-xl">{t(locale, faqContent.logisticsSection.quoteSupport.title)}</h4>
                <p className="mt-4 text-sm leading-relaxed opacity-80">{t(locale, faqContent.logisticsSection.quoteSupport.text)}</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PageLinks
        description={faqContent.journey.description}
        locale={locale}
        route="faq"
        title={faqContent.journey.title}
      />
    </div>
  );
}
