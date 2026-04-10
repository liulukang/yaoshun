import type {Metadata} from 'next';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {solutionsContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, solutionsContent.seo.title),
    t(locale, solutionsContent.seo.description),
    'solutions',
    t(locale, solutionsContent.seo.keywords)
  );
}

export default async function SolutionsPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="pt-8 sm:pt-10 md:pt-12">
        <div className="grid gap-6 rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8 lg:p-10">
          <div>
            <span className="inline-block rounded-full bg-primary-fixed px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-on-primary-fixed">{t(locale, solutionsContent.hero.eyebrow)}</span>
            <h1 className="mt-4 max-w-4xl font-headline text-4xl font-black leading-[0.97] tracking-[-0.03em] text-primary sm:text-5xl lg:text-6xl">{t(locale, solutionsContent.hero.title)}</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant sm:text-lg">{t(locale, solutionsContent.hero.description)}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link className="rounded-full bg-[#ff8a00] px-7 py-3 text-sm font-bold text-[#111827] transition-colors hover:bg-[#ff9f2f]" data-track-event="hero_cta_click" data-track-label="oem_contact" data-track-location="oem_hero" href={localizedPath(locale, 'contact')}>
                {t(locale, solutionsContent.hero.primaryAction)}
              </Link>
              <Link className="rounded-full border border-outline-variant bg-white px-7 py-3 text-sm font-bold text-primary transition-colors hover:bg-surface-container-low" data-track-event="hero_cta_click" data-track-label="oem_company" data-track-location="oem_hero" href={localizedPath(locale, 'about')}>
                {t(locale, solutionsContent.hero.secondaryAction)}
              </Link>
            </div>
          </div>
          <aside className="rounded-[1.5rem] bg-white p-5 shadow-panel sm:p-6">
            <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{locale === 'zh' ? '项目主线' : 'Mainline'}</p>
            <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, solutionsContent.engineeringSpotlight.description)}</p>
            <div className="mt-4 grid gap-2.5">
              {solutionsContent.lifecycle.slice(0, 3).map((item) => (
                <div key={item.title.en} className="rounded-xl bg-surface-container-low px-3 py-2.5">
                  <p className="text-sm font-bold text-primary">{t(locale, item.title)}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, solutionsContent.scenarioSection.title)}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
          {solutionsContent.scenarioSection.items.map((item) => (
            <article key={item.title.en} className="rounded-[1.5rem] border border-outline-variant/20 bg-white p-5 shadow-panel sm:p-6">
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <SectionHeading
          description={solutionsContent.lifecycleSection.description}
          locale={locale}
          title={solutionsContent.lifecycleSection.title}
        />
        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 md:grid-cols-2 xl:grid-cols-5">
          {solutionsContent.lifecycle.map((item, index) => (
            <article key={item.title.en} className="rounded-[1.25rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
              <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">0{index + 1}</p>
              <h3 className="mt-2 font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-[2rem] bg-primary p-5 text-white sm:p-6 lg:p-8">
            <h3 className="font-headline text-2xl font-black sm:text-3xl lg:text-4xl">{t(locale, solutionsContent.engineeringSpotlight.title)}</h3>
            <p className="mt-3 text-sm text-primary-fixed-dim sm:text-base lg:mt-4 lg:text-lg">{t(locale, solutionsContent.engineeringSpotlight.description)}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {solutionsContent.qualitySection.items.slice(0, 2).map((item) => (
                <div key={item.title.en} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <p className="font-bold text-white">{t(locale, item.title)}</p>
                  <p className="mt-2 text-sm text-white/72">{t(locale, item.text)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 sm:gap-6 lg:gap-8">
            {solutionsContent.modes.map((item) => (
              <article key={item.title.en} className="rounded-[1.5rem] bg-surface-container-highest p-5 shadow-panel sm:p-6 lg:p-8">
                <h4 className="font-headline text-xl font-bold text-primary sm:text-2xl">{t(locale, item.title)}</h4>
                <p className="mt-4 leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, solutionsContent.qualitySection.title)}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
          {solutionsContent.qualitySection.items.map((item) => (
            <article key={item.title.en} className="rounded-[1.25rem] border border-outline-variant/20 bg-white p-5 sm:p-6">
              <h3 className="font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <PageLinks
        description={solutionsContent.journey.description}
        locale={locale}
        route="solutions"
        title={solutionsContent.journey.title}
      />
    </div>
  );
}
