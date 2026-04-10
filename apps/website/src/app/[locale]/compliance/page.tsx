import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {complianceContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, complianceContent.seo.title),
    t(locale, complianceContent.seo.description),
    'compliance',
    t(locale, complianceContent.seo.keywords)
  );
}

export default async function CompliancePage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="py-12 sm:py-14 md:py-20">
        <div className="grid grid-cols-12 items-center gap-4 sm:gap-6">
          <div className="col-span-12">
            <span className="block font-label text-xs font-bold uppercase tracking-[0.18em] text-secondary sm:text-sm sm:tracking-[0.2em]">{t(locale, complianceContent.hero.eyebrow)}</span>
            <h1 className="mt-3 max-w-[13ch] font-headline text-4xl font-black leading-[0.92] tracking-[-0.04em] text-primary sm:text-5xl md:mt-4 md:max-w-[14ch] md:text-6xl lg:text-7xl">{t(locale, complianceContent.hero.title)}</h1>
            <p className="mt-4 max-w-4xl text-base font-medium leading-relaxed text-on-surface-variant sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, complianceContent.hero.description)}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-surface-container-low py-12 sm:py-14 lg:py-20">
        <div className="px-4 sm:px-6 md:px-10">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{t(locale, complianceContent.certificatesSection.title)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant sm:text-base">{t(locale, complianceContent.certificatesSection.description)}</p>
            </div>
            <span className="font-label text-xs font-semibold uppercase tracking-widest italic text-outline">{t(locale, complianceContent.certificatesSection.note)}</span>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {complianceContent.certificates.map((item, index) => (
              <div key={t(locale, item.title)} className="flex h-full flex-col justify-between rounded-xl border-b-4 border-primary bg-surface-container-lowest p-5 shadow-panel sm:p-6 lg:p-8">
                <div>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg sm:mb-5 sm:h-14 sm:w-14 lg:mb-6 lg:h-16 lg:w-16 ${index % 2 === 0 ? 'bg-primary-fixed' : 'bg-secondary-fixed'}`}>
                    <div className="h-6 w-6 rounded-full bg-primary sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary sm:text-2xl">{t(locale, item.title)}</h3>
                  <p className="mt-4 leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] bg-primary py-12 text-white sm:mt-16 sm:py-14 lg:mt-20 lg:py-24">
        <div className="grid gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div>
            <SectionHeading
              invert
              description={complianceContent.tradeSection.description}
              locale={locale}
              title={complianceContent.tradeSection.title}
            />
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            {complianceContent.tradeSection.cards.map((item) => (
              <div key={t(locale, item.title)} className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur sm:p-6 lg:p-8">
                <h4 className="font-bold">{t(locale, item.title)}</h4>
                <p className="mt-3 text-sm text-white/70">{t(locale, item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageLinks
        description={complianceContent.journey.description}
        locale={locale}
        route="compliance"
        title={complianceContent.journey.title}
      />
    </div>
  );
}
