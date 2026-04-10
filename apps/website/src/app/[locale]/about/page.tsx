import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {aboutContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, aboutContent.seo.title),
    t(locale, aboutContent.seo.description),
    'about',
    t(locale, aboutContent.seo.keywords)
  );
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="pt-8 sm:pt-10 md:pt-12">
        <SectionHeading
          description={aboutContent.integratedSection.description}
          locale={locale}
          title={aboutContent.integratedSection.title}
        />
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
          {aboutContent.integratedSection.cards.map((item) => (
            <article key={item.title.en} className="rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, aboutContent.valuesSection.title)}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
          {aboutContent.values.map((item) => (
            <article key={item.title.en} className="rounded-[1.25rem] bg-white p-5 shadow-panel sm:p-6">
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <SectionHeading
          description={aboutContent.rndSection.description}
          locale={locale}
          title={aboutContent.rndSection.title}
        />
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aboutContent.rndSteps.map((item, index) => (
            <article key={item.title.en} className={`rounded-[1.25rem] p-5 sm:p-6 ${index % 3 === 0 ? 'bg-primary text-white' : index % 3 === 1 ? 'bg-surface-container-low text-primary' : 'bg-white text-primary shadow-panel'}`}>
              <h3 className="font-headline text-xl font-bold">{t(locale, item.title)}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${index % 3 === 0 ? 'text-white/80' : 'text-on-surface-variant'}`}>{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, aboutContent.technologyQualitySection.title)}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
          {aboutContent.technologyQualitySection.items.map((item) => (
            <article key={item.title.en} className="rounded-[1.25rem] border border-outline-variant/25 bg-surface-container-low p-5 sm:p-6">
              <h3 className="font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <PageLinks
        description={aboutContent.journey.description}
        locale={locale}
        route="about"
        title={aboutContent.journey.title}
      />
    </div>
  );
}
