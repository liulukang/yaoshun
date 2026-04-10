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

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="full-bleed relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_8%,rgba(255,255,255,0.18),transparent_32%),radial-gradient(circle_at_12%_90%,rgba(255,255,255,0.08),transparent_40%),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:auto,auto,120px_100%]" />
        <div className="relative flex min-h-[560px] items-center px-4 pt-6 sm:min-h-[620px] sm:px-6 sm:pt-8 md:pt-12 lg:min-h-[700px] xl:px-8">
          <div className="z-10 w-full">
            <span className="block font-label text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-fixed sm:text-xs">{t(locale, homeContent.hero.eyebrow)}</span>
            <h1 className="hero-title mt-4 max-w-5xl font-headline text-4xl font-black leading-[0.96] tracking-[-0.04em] text-white sm:mt-5 sm:text-5xl lg:mt-6 lg:text-6xl xl:text-7xl">
              {t(locale, homeContent.hero.title)}
            </h1>
            <p className="mt-4 max-w-4xl text-base font-medium leading-relaxed text-primary-fixed sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, homeContent.hero.description)}</p>
            <div className="mt-7 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
              <Link
                className="inline-block w-full cursor-pointer rounded-full bg-[#ff8a00] px-6 py-3.5 text-center text-sm font-extrabold text-[#111827] shadow-[0_16px_30px_-18px_rgba(255,138,0,0.95)] transition-all hover:bg-[#ff9f2f] hover:shadow-[0_22px_36px_-16px_rgba(255,138,0,0.98)] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
                data-track-event="hero_cta_click"
                data-track-label="home_factory"
                data-track-location="home_hero"
                href={localizedPath(locale, 'factory')}
              >
                {t(locale, homeContent.hero.primary)}
              </Link>
              <Link
                className="inline-block w-full cursor-pointer rounded-full border border-white bg-white px-6 py-3.5 text-center text-sm font-bold text-[#102166] transition-all hover:bg-[#f4f7ff] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
                data-track-event="hero_cta_click"
                data-track-label="home_products"
                data-track-location="home_hero"
                href={localizedPath(locale, 'products')}
              >
                {t(locale, homeContent.hero.secondary)}
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 xl:grid-cols-4">
              {siteStats.map((item) => (
                <div key={t(locale, item.label)} className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-panel backdrop-blur sm:p-5">
                  <p className="font-headline text-xl font-black text-secondary-fixed sm:text-3xl">{t(locale, item.value)}</p>
                  <p className="mt-2 text-xs text-primary-fixed sm:text-sm">{t(locale, item.label)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6 lg:p-10">
          <SectionHeading
            description={homeContent.entrySection.description}
            locale={locale}
            title={homeContent.entrySection.title}
          />
          <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
            {homeContent.entrySection.entries.map((item, index) => (
              <Link
                key={item.route}
                className="group cursor-pointer rounded-[1.5rem] border border-outline-variant/30 bg-white p-5 shadow-panel transition-all hover:-translate-y-1 hover:border-secondary/50 hover:shadow-float sm:p-6"
                data-track-event="home_entry_click"
                data-track-label={item.route}
                data-track-location="home_entry_grid"
                href={localizedPath(locale, item.route as RouteKey)}
              >
                <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-outline">0{index + 1}</p>
                <h3 className="mt-3 font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.description)}</p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary transition-transform group-hover:translate-x-1">
                  {locale === 'zh' ? '立即进入' : 'Open Page'}
                  <span>{'->'}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading locale={locale} description={homeContent.categoriesSection.description} title={homeContent.categoriesSection.title} />
          <Link className="cursor-pointer font-bold text-primary transition-all hover:translate-x-1" data-track-event="section_cta_click" data-track-label="home_full_catalog" data-track-location="home_categories_header" href={localizedPath(locale, 'products')}>
            {t(locale, homeContent.categoriesSection.catalogAction)}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {homeContent.categories.map((item, index) => (
            <Link
              key={t(locale, item.title)}
              className={`group cursor-pointer rounded-[2rem] p-6 shadow-panel sm:p-8 ${index === 1 ? 'bg-primary-container text-white' : 'bg-white'}`}
              data-track-event="category_card_click"
              data-track-label={index === 2 ? 'supporting_capability' : index === 1 ? 'components_process' : 'toy_programs'}
              data-track-location="home_categories"
              href={localizedPath(locale, index === 2 ? 'solutions' : 'products')}
            >
              <p className={`font-label text-xs font-bold uppercase tracking-[0.2em] ${index === 1 ? 'text-secondary-fixed' : 'text-outline'}`}>
                {index === 0 ? (locale === 'zh' ? '成品项目' : 'Finished Toys') : index === 1 ? (locale === 'zh' ? '结构与工艺配套' : 'Components & Process') : locale === 'zh' ? '项目配套能力' : 'Supporting Capability'}
              </p>
              <h3 className={`mt-4 font-headline text-3xl font-bold ${index === 1 ? 'text-white' : 'text-primary'}`}>{t(locale, item.title)}</h3>
              <p className={`mt-4 text-sm leading-relaxed sm:text-base ${index === 1 ? 'text-white/80' : 'text-on-surface-variant'}`}>{t(locale, item.description)}</p>
              <div className={`mt-6 h-1 w-16 rounded-full ${index === 1 ? 'bg-secondary-fixed' : 'bg-secondary'}`} />
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-10">
          <div className="rounded-[2rem] bg-surface-container-low p-6 sm:p-8 lg:p-10">
            <SectionHeading locale={locale} description={homeContent.excellence.description} title={homeContent.excellence.title} />
            <div className="mt-7 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">
              {homeContent.floatingStats.map((item) => (
                <div key={t(locale, item.label)} className="rounded-2xl bg-white p-5 shadow-panel sm:p-6">
                  <div className="text-3xl font-black text-primary sm:text-4xl">{item.value}</div>
                  <div className="mt-2 font-label text-[11px] font-bold uppercase tracking-[0.16em] text-on-surface-variant">{t(locale, item.label)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {homeContent.excellence.points.map((item) => (
              <article key={t(locale, item.title)} className="rounded-[1.5rem] border border-outline-variant/20 bg-white p-5 shadow-panel sm:p-6">
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">{locale === 'zh' ? '能力点' : 'Capability'}</p>
                <h4 className="mt-2 font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h4>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] bg-primary py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="absolute right-0 top-0 h-full w-1/2 translate-x-40 -skew-x-[20deg] bg-white/5" />
        <div className="relative z-10 px-4 sm:px-6 md:px-12">
          <SectionHeading
            align="center"
            description={homeContent.complianceSection.description}
            invert
            locale={locale}
            title={homeContent.complianceSection.title}
          />
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:mt-16 lg:gap-8 md:grid-cols-2 xl:grid-cols-4">
            {homeContent.compliance.map((item) => (
              <div key={t(locale, item.title)} className="rounded-[1.5rem] border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-all hover:bg-white/20 sm:p-6 lg:p-8">
                <div className="mb-4 h-8 w-8 rounded-full bg-tertiary-fixed" />
                <h3 className="text-xl font-bold text-white">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{t(locale, item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <SectionHeading
          align="center"
          description={homeContent.technologyQualitySection.description}
          locale={locale}
          title={homeContent.technologyQualitySection.title}
        />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:mt-14 lg:gap-8 md:grid-cols-3">
          {homeContent.technologyQualitySection.items.map((item) => (
            <article key={t(locale, item.title)} className="rounded-[1.5rem] border border-outline-variant/25 bg-white p-5 shadow-panel sm:p-6 lg:p-8">
              <div className="mb-4 h-2 w-14 rounded-full bg-secondary sm:mb-5" />
              <h3 className="font-headline text-xl font-bold text-primary sm:text-2xl">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <SectionHeading
          align="center"
          description={homeContent.casesSection.description}
          locale={locale}
          title={homeContent.casesSection.title}
        />
        <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:mt-16 lg:gap-10 md:grid-cols-3">
          {homeContent.cases.map((item) => (
            <article key={t(locale, item.title)} className="relative rounded-[1.5rem] bg-white p-6 shadow-panel sm:p-8 lg:p-10">
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white sm:-top-5 sm:left-10 sm:h-10 sm:w-10">&ldquo;</div>
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-4 font-label text-xs font-bold uppercase tracking-[0.18em] text-secondary">{t(locale, item.result)}</p>
              <p className="mt-4 leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
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
