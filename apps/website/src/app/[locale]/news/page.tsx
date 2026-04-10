import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {newsContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, newsContent.seo.title),
    t(locale, newsContent.seo.description),
    'news',
    t(locale, newsContent.seo.keywords)
  );
}

export default async function NewsPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-16 pt-20 sm:pb-20 sm:pt-24">
        <section>
          <span className="block font-label text-xs font-bold uppercase tracking-[0.18em] text-secondary sm:text-sm">{t(locale, newsContent.hero.eyebrow)}</span>
          <h1 className="hero-title mt-3 max-w-5xl font-headline text-4xl font-black leading-[0.98] tracking-[-0.03em] text-primary sm:text-5xl lg:text-6xl">{t(locale, newsContent.hero.title)}</h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-on-surface-variant sm:text-lg">{t(locale, newsContent.hero.description)}</p>
        </section>

        <section className="mt-12 rounded-[2rem] bg-surface-container-low p-5 sm:mt-16 sm:p-6 lg:mt-20 lg:p-10">
          <SectionHeading
            description={newsContent.featuredSection.description}
            locale={locale}
            title={newsContent.featuredSection.title}
          />
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
            {newsContent.highlights.map((item) => (
              <article key={t(locale, item.title)} className="rounded-[1.5rem] border border-outline-variant/20 bg-white p-5 shadow-panel sm:p-6 lg:p-7">
                <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-secondary">{t(locale, item.date)}</p>
                <h2 className="mt-3 font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, newsContent.timelineSection.title)}</h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
            {newsContent.timelineSection.items.map((item) => (
              <article key={t(locale, item.title)} className="relative overflow-hidden rounded-[1.5rem] border border-outline-variant/25 bg-white p-5 shadow-panel sm:p-6">
                <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-[2rem] bg-primary-fixed" />
                <p className="font-label text-[11px] font-bold uppercase tracking-[0.2em] text-secondary">{t(locale, item.month)}</p>
                <h3 className="mt-2 font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 sm:mt-16 lg:mt-20">
          <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, newsContent.newsletterSection.title)}</h2>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
            {newsContent.newsletterSection.items.map((item) => (
              <article key={t(locale, item.title)} className="rounded-[1.25rem] bg-surface-container-low p-5 sm:p-6">
                <h3 className="font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <PageLinks
        description={newsContent.journey.description}
        locale={locale}
        route="news"
        title={newsContent.journey.title}
      />
    </div>
  );
}
