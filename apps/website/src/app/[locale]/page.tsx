import type {Metadata} from 'next';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {homeContent, siteStats} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath, type RouteKey} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, homeContent.seo.title),
    t(locale, homeContent.seo.description),
    '',
    t(locale, homeContent.seo.keywords)
  );
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);
  const quickEntries = homeContent.entrySection.entries.filter(
    (item) => item.route === 'products' || item.route === 'solutions' || item.route === 'contact'
  );

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="full-bleed relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_14%,rgba(255,255,255,0.16),transparent_42%),radial-gradient(circle_at_12%_100%,rgba(255,255,255,0.08),transparent_45%)]" />
        <div className="relative mx-auto w-full max-w-[1280px] px-4 py-16 sm:px-6 sm:py-20 lg:py-24 xl:px-8">
          <span className="block font-label text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-fixed sm:text-xs">{t(locale, homeContent.hero.eyebrow)}</span>
          <h1 className="hero-title mt-4 max-w-5xl font-headline text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            {t(locale, homeContent.hero.title)}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-primary-fixed sm:text-lg lg:mt-6 lg:text-xl">{t(locale, homeContent.hero.description)}</p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link
              className="inline-block w-full rounded-full bg-[#ff8a00] px-6 py-3.5 text-center text-sm font-extrabold text-[#111827] shadow-[0_16px_30px_-18px_rgba(255,138,0,0.95)] transition-all hover:bg-[#ff9f2f] hover:shadow-[0_22px_36px_-16px_rgba(255,138,0,0.98)] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
              data-track-event="hero_cta_click"
              data-track-label="home_factory"
              data-track-location="home_hero"
              href={localizedPath(locale, 'factory')}
            >
              {t(locale, homeContent.hero.primary)}
            </Link>
            <Link
              className="inline-block w-full rounded-full border border-white/50 bg-white px-6 py-3.5 text-center text-sm font-bold text-[#102166] transition-all hover:bg-[#f4f7ff] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
              data-track-event="hero_cta_click"
              data-track-label="home_products"
              data-track-location="home_hero"
              href={localizedPath(locale, 'products')}
            >
              {t(locale, homeContent.hero.secondary)}
            </Link>
          </div>

          <div className="mt-10 grid gap-4 border-t border-white/20 pt-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {siteStats.map((item) => (
              <div key={t(locale, item.label)} className="py-2">
                <p className="font-headline text-2xl font-black text-secondary-fixed sm:text-3xl">{t(locale, item.value)}</p>
                <p className="mt-2 text-xs text-primary-fixed sm:text-sm">{t(locale, item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            description={homeContent.entrySection.description}
            locale={locale}
            title={homeContent.entrySection.title}
          />
          <Link
            className="font-bold text-primary transition-all hover:translate-x-1"
            data-track-event="section_cta_click"
            data-track-label="home_full_catalog"
            data-track-location="home_entry_header"
            href={localizedPath(locale, 'products')}
          >
            {t(locale, homeContent.categoriesSection.catalogAction)}
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {quickEntries.map((item) => (
            <Link
              key={item.route}
              className="group rounded-[1.5rem] border border-outline-variant/25 bg-white p-6 transition-all hover:-translate-y-1 hover:border-secondary/45 hover:shadow-panel"
              data-track-event="home_entry_click"
              data-track-label={item.route}
              data-track-location="home_entry_grid"
              href={localizedPath(locale, item.route as RouteKey)}
            >
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
                {item.route === 'products'
                  ? t(locale, {zh: '目录', en: 'Catalog'})
                  : item.route === 'solutions'
                    ? t(locale, {zh: '方案', en: 'Solutions'})
                    : t(locale, {zh: '报价', en: 'Quote'})}
              </p>
              <h3 className="mt-3 font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.description)}</p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-transform group-hover:translate-x-1">
                {t(locale, {zh: '查看详情', en: 'View Detail'})}
                <span>{'->'}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="rounded-[2rem] border border-outline-variant/20 bg-white p-6 sm:p-8 lg:p-10">
          <SectionHeading locale={locale} description={homeContent.excellence.description} title={homeContent.excellence.title} />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {homeContent.excellence.points.map((item) => (
              <article key={t(locale, item.title)} className="rounded-[1.25rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">{t(locale, {zh: '核心能力', en: 'Core Strength'})}</p>
                <h4 className="mt-2 font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h4>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-2">
            {homeContent.floatingStats.map((item) => (
              <div key={t(locale, item.label)} className="rounded-2xl bg-surface-container-low p-5">
                <p className="font-headline text-3xl font-black text-primary">{item.value}</p>
                <p className="mt-2 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">{t(locale, item.label)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-[2rem] bg-primary p-6 sm:p-8 lg:p-10">
            <SectionHeading
              description={homeContent.complianceSection.description}
              invert
              locale={locale}
              title={homeContent.complianceSection.title}
            />
            <div className="mt-7 divide-y divide-white/20">
              {homeContent.compliance.map((item) => (
                <article key={t(locale, item.title)} className="py-5 first:pt-0 last:pb-0">
                  <h3 className="text-lg font-bold text-white">{t(locale, item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{t(locale, item.text)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 sm:p-8 lg:p-10">
            <SectionHeading
              description={homeContent.technologyQualitySection.description}
              locale={locale}
              title={homeContent.technologyQualitySection.title}
            />
            <div className="mt-7 space-y-5">
              {homeContent.technologyQualitySection.items.map((item) => (
                <article key={t(locale, item.title)} className="rounded-[1.2rem] bg-white p-5">
                  <div className="mb-3 h-1 w-14 rounded-full bg-secondary" />
                  <h3 className="font-headline text-lg font-bold text-primary">{t(locale, item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PageLinks
        description={homeContent.journey.description}
        locale={locale}
        route="home"
        title={homeContent.journey.title}
      />
    </div>
  );
}
