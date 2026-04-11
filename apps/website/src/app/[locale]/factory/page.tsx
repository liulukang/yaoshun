import type {Metadata} from 'next';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {factoryContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, factoryContent.seo.title),
    t(locale, factoryContent.seo.description),
    'factory',
    t(locale, factoryContent.seo.keywords)
  );
}

export default async function FactoryPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="pt-8 sm:pt-10 md:pt-12">
        <div className="grid gap-6 rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8 lg:p-10">
          <div>
            <span className="inline-block rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-on-primary-fixed">{t(locale, factoryContent.hero.eyebrow)}</span>
            <h1 className="hero-title mt-4 max-w-5xl font-headline text-4xl font-black leading-[0.97] tracking-[-0.03em] text-primary sm:text-5xl lg:text-6xl">{t(locale, factoryContent.hero.title)}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant sm:text-lg">{t(locale, factoryContent.hero.description)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="rounded-full bg-[#ff8a00] px-7 py-3 text-sm font-bold text-[#111827] transition-colors hover:bg-[#ff9f2f]" data-track-event="hero_cta_click" data-track-label="factory_contact" data-track-location="factory_hero" href={localizedPath(locale, 'contact')}>
                {t(locale, factoryContent.hero.primaryAction)}
              </Link>
              <Link className="rounded-full border border-outline-variant bg-white px-7 py-3 text-sm font-bold text-primary transition-colors hover:bg-surface-container-low" data-track-event="hero_cta_click" data-track-label="factory_compliance" data-track-location="factory_hero" href={localizedPath(locale, 'compliance')}>
                {t(locale, factoryContent.hero.secondaryAction)}
              </Link>
            </div>
          </div>
          <aside className="rounded-[1.5rem] bg-white p-5 shadow-panel sm:p-6">
            <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{t(locale, {zh: '工厂核心指标', en: 'Factory Snapshot'})}</p>
            <div className="mt-4 grid gap-3">
              {factoryContent.metrics.slice(0, 3).map((item) => (
                <div key={item.label.en} className="rounded-xl bg-surface-container-low px-3 py-2.5">
                  <p className="text-sm font-bold text-primary">{t(locale, item.value)}</p>
                  <p className="text-xs text-on-surface-variant">{t(locale, item.label)}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-12">
          <div className="relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[2rem] bg-surface-container-low p-5 sm:min-h-[520px] sm:p-6 lg:min-h-[600px] lg:p-12 md:col-span-8">
            <div className="absolute right-0 top-0 p-5 sm:p-6 lg:p-12">
              <div className="h-12 w-12 rounded-full bg-primary/10 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
            </div>
            <div className="relative z-10">
              <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-primary sm:text-4xl lg:text-5xl">{t(locale, factoryContent.overview.title)}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg lg:mt-6 lg:text-xl">{t(locale, factoryContent.overview.description)}</p>
            </div>
            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-4 lg:mt-12">
              {factoryContent.metrics.map((item) => (
                <div key={t(locale, item.label)} className="rounded-2xl bg-surface-container-highest p-4 sm:p-5 lg:p-6">
                  <div className="mb-1 text-2xl font-bold tracking-tighter text-secondary sm:text-3xl">{t(locale, item.value)}</div>
                  <div className="font-label text-xs uppercase text-on-surface-variant">{t(locale, item.label)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 md:col-span-4">
            <div className="flex h-1/2 flex-col justify-between rounded-[2rem] bg-primary p-5 text-white sm:p-6 lg:p-10">
              <h3 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">{t(locale, factoryContent.accountability.title)}</h3>
              <div className="space-y-4">
                {factoryContent.accountability.items.map((item) => (
                  <div key={t(locale, item.title)} className="rounded-xl bg-white/10 p-4">
                    <p className="font-bold text-lg">{t(locale, item.title)}</p>
                    <p className="text-sm text-white/60">{t(locale, item.text)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] bg-surface-container-highest p-5 sm:p-6 lg:p-8">
              <p className="font-headline text-xl font-bold text-primary sm:text-2xl">{t(locale, factoryContent.craftsmanship.title)}</p>
              <div className="mt-5 grid gap-3">
                {factoryContent.accountability.items.map((item) => (
                  <div key={t(locale, item.title)} className="rounded-2xl bg-surface-container-low p-4">
                    <p className="font-bold text-primary">{t(locale, item.title)}</p>
                    <p className="mt-2 text-sm text-on-surface-variant">{t(locale, item.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-surface-container-low py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="px-4 sm:px-6 md:px-10">
          <SectionHeading
            description={factoryContent.processSection.description}
            locale={locale}
            title={factoryContent.processSection.title}
          />
          <div className="mt-8 flex gap-3 overflow-x-auto pb-4 sm:mt-10 sm:gap-4 lg:mt-16">
            {factoryContent.processes.map((item, index) => (
              <div key={t(locale, item.title)} className="min-w-[250px] flex-1 rounded-[2rem] bg-white p-5 shadow-panel transition-transform hover:-translate-y-2 sm:min-w-[280px] sm:p-6 lg:min-w-[300px] lg:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-2xl font-bold text-primary sm:h-14 sm:w-14 sm:text-3xl lg:h-16 lg:w-16">{index + 1}</div>
                <div className="mt-5 sm:mt-6 lg:mt-8">
                  <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary">
                    {t(locale, factoryContent.processSection.phaseLabel).replace('{index}', `0${index + 1}`)}
                  </span>
                  <h4 className="mt-2 font-headline text-xl font-bold text-primary sm:text-2xl">{t(locale, item.title)}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageLinks
        description={factoryContent.journey.description}
        locale={locale}
        route="factory"
        title={factoryContent.journey.title}
      />
    </div>
  );
}
