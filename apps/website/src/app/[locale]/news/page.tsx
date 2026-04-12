import type {Metadata} from 'next';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {newsContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {getNewsArticles, newsArticlePath} from '@/lib/news';

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
  const articles = getNewsArticles();

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-16 pt-20 sm:pb-20 sm:pt-24">
        <section>
          <span className="block font-label text-xs font-bold uppercase tracking-[0.18em] text-secondary sm:text-sm">{t(locale, newsContent.hero.eyebrow)}</span>
          <h1 className="hero-title mt-3 max-w-5xl font-headline text-4xl font-black leading-[0.98] tracking-[-0.03em] text-primary sm:text-5xl lg:text-6xl">{t(locale, newsContent.hero.title)}</h1>
          <p className="mt-4 max-w-4xl text-base leading-relaxed text-on-surface-variant sm:text-lg">{t(locale, newsContent.hero.description)}</p>
        </section>

        <section className="mt-12 rounded-[2rem] border border-outline-variant/20 bg-white p-5 shadow-panel sm:mt-16 sm:p-6 lg:mt-20 lg:p-8">
          <SectionHeading
            description={newsContent.articleLibrarySection.description}
            locale={locale}
            title={newsContent.articleLibrarySection.title}
          />
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {articles.map((item) => (
              <Link
                key={item.slug}
                className="group rounded-[1.25rem] border border-outline-variant/20 bg-surface-container-low p-5 transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 sm:p-6"
                href={newsArticlePath(locale, item.slug)}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-label text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">{t(locale, item.date)}</p>
                  <span className="rounded-full bg-primary-fixed px-3 py-1 text-[11px] font-semibold text-primary">{t(locale, item.category)}</span>
                </div>
                <h2 className="mt-3 font-headline text-xl font-bold text-primary transition-colors group-hover:text-secondary">{t(locale, item.title)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </Link>
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
