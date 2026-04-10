import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {privacyContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, privacyContent.seo.title),
    t(locale, privacyContent.seo.description),
    'privacy',
    t(locale, privacyContent.seo.keywords)
  );
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);
  const rightsEyebrow = t(locale, privacyContent.rightsSection.eyebrow).replace('{number}', '01');
  const cookiesEyebrow = t(locale, privacyContent.cookiesSection.eyebrow).replace('{number}', '02');

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pt-32">
        <header className="mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-on-primary-fixed">
            <span className="font-label text-xs font-bold uppercase tracking-widest">{t(locale, privacyContent.hero.eyebrow)}</span>
          </div>
          <h1 className="mt-5 font-headline text-4xl font-extrabold leading-[0.95] tracking-tighter text-primary sm:mt-6 sm:text-5xl md:text-7xl">{t(locale, privacyContent.hero.title)}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, privacyContent.hero.description)}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs sm:mt-6">
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 font-label font-bold uppercase tracking-[0.14em] text-on-surface-variant">
              {t(locale, privacyContent.policyMeta.effectiveDateLabel)}: {t(locale, privacyContent.policyMeta.effectiveDate)}
            </span>
            <span className="rounded-full bg-surface-container-low px-3 py-1.5 font-label font-bold uppercase tracking-[0.14em] text-on-surface-variant">
              {t(locale, privacyContent.policyMeta.updatedDateLabel)}: {t(locale, privacyContent.policyMeta.updatedDate)}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-6xl">
          <div className="mb-14 grid gap-4 sm:mb-16 sm:gap-6 lg:mb-24 lg:gap-8 md:grid-cols-12">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-5 sm:p-6 lg:p-10 md:col-span-7">
              <h2 className="text-2xl font-bold text-primary sm:text-3xl">{t(locale, privacyContent.collectionSection.title)}</h2>
              <div className="mt-4 space-y-5 sm:mt-5 sm:space-y-6">
                {privacyContent.collectionSection.items.map((item) => (
                  <div key={t(locale, item.title)} className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary-container sm:h-12 sm:w-12" />
                    <div>
                      <h3 className="text-lg font-bold text-primary">{t(locale, item.title)}</h3>
                      <p className="mt-1 text-sm text-on-surface-variant">{t(locale, item.text)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-between rounded-xl bg-primary-container p-5 text-white shadow-xl sm:p-6 lg:p-10 md:col-span-5">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">{t(locale, privacyContent.handlingCard.title)}</h2>
                <p className="mt-4 text-sm leading-relaxed text-primary-fixed">{t(locale, privacyContent.handlingCard.text)}</p>
              </div>
              <div className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-8">
                <span className="text-xs font-bold uppercase tracking-widest text-tertiary-fixed">{t(locale, privacyContent.handlingCard.note)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-14 sm:space-y-16 lg:space-y-20">
            <section className="grid gap-6 sm:gap-8 lg:gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">{rightsEyebrow}</h3>
                <h2 className="mt-3 font-headline text-3xl font-extrabold leading-none text-primary sm:mt-4 sm:text-4xl">{t(locale, privacyContent.rightsSection.title)}</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8 md:col-span-8">
                {privacyContent.rightsSection.items.map((item) => (
                  <div key={t(locale, item.title)} className="rounded-xl bg-surface-container p-5 sm:p-6 lg:p-8">
                    <h4 className="text-lg font-bold text-primary">{t(locale, item.title)}</h4>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid gap-6 sm:gap-8 lg:gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">{cookiesEyebrow}</h3>
                <h2 className="mt-3 font-headline text-3xl font-extrabold leading-none text-primary sm:mt-4 sm:text-4xl">{t(locale, privacyContent.cookiesSection.title)}</h2>
              </div>
              <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest md:col-span-8">
                <table className="data-table">
                  <thead className="bg-surface-container-high">
                    <tr>
                      <th>{t(locale, privacyContent.cookiesSection.headers.category)}</th>
                      <th>{t(locale, privacyContent.cookiesSection.headers.purpose)}</th>
                      <th>{t(locale, privacyContent.cookiesSection.headers.retention)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privacyContent.cookiesSection.rows.map((row) => (
                      <tr key={t(locale, row.category)}>
                        <td className="font-bold text-primary">{t(locale, row.category)}</td>
                        <td className="text-on-surface-variant">{t(locale, row.purpose)}</td>
                        <td className="text-on-surface-variant">{t(locale, row.retention)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="font-headline text-3xl font-extrabold leading-none text-primary sm:text-4xl">{t(locale, privacyContent.advertisingSection.title)}</h2>
              <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
                {privacyContent.advertisingSection.items.map((item) => (
                  <article key={t(locale, item.title)} className="rounded-xl bg-surface-container-low p-5 sm:p-6">
                    <h3 className="text-lg font-bold text-primary">{t(locale, item.title)}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <PageLinks
        description={privacyContent.journey.description}
        locale={locale}
        route="privacy"
        title={privacyContent.journey.title}
      />
    </div>
  );
}
