import type {Metadata} from 'next';
import Image from 'next/image';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {aboutContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

const ABOUT_MEDIA = {
  hero: [
    '/api/1688-products/679906666095/images/image-001.jpg',
    '/api/1688-products/615665845646/images/image-002.jpg',
    '/api/1688-products/616855540047/images/image-002.jpg',
  ],
  integrated: [
    '/api/1688-products/618549405409/images/image-002.jpg',
    '/api/1688-products/557949739153/images/image-001.jpg',
    '/api/1688-products/654508208361/images/image-001.jpg',
  ],
  values: '/api/1688-products/568719941830/images/image-001.jpg',
  rnd: [
    '/api/1688-products/615665845646/images/image-003.jpg',
    '/api/1688-products/616855540047/images/image-003.jpg',
    '/api/1688-products/618549405409/images/image-003.jpg',
    '/api/1688-products/557346886779/images/image-001.jpg',
  ],
  technology: [
    '/api/1688-products/679906666095/images/image-002.jpg',
    '/api/1688-products/602070261228/images/image-001.jpg',
    '/api/1688-products/576133583262/images/image-001.jpg',
  ],
} as const;

function mediaByIndex(list: readonly string[], index: number): string {
  if (list.length === 0) return '';
  return list[index % list.length] || list[0];
}

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
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <article className="relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-2xl">
            <Image
              alt={locale === 'zh' ? '工厂设备与生产能力展示' : 'Factory equipment and production capability'}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1280px) 70vw, (min-width: 1024px) 62vw, 100vw"
              src={ABOUT_MEDIA.hero[0]}
            />
          </article>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 sm:gap-5">
            {ABOUT_MEDIA.hero.slice(1).map((image, index) => (
              <article key={image} className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] shadow-xl">
                <Image
                  alt={locale === 'zh' ? `企业能力展示 ${index + 2}` : `Enterprise capability ${index + 2}`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1280px) 28vw, (min-width: 640px) 46vw, 100vw"
                  src={image}
                />
              </article>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
          {aboutContent.integratedSection.cards.map((item, index) => (
            <article key={item.title.en} className="rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6">
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  alt={t(locale, item.title)}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, 100vw"
                  src={mediaByIndex(ABOUT_MEDIA.integrated, index)}
                />
              </div>
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <SectionHeading
          description={aboutContent.enterpriseSnapshotSection.description}
          locale={locale}
          title={aboutContent.enterpriseSnapshotSection.title}
        />
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-3">
          {aboutContent.enterpriseSnapshotSection.cards.map((card) => (
            <article key={card.title.en} className="rounded-[1.5rem] border border-outline-variant/25 bg-white p-5 shadow-panel sm:p-6">
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, card.title)}</h3>
              <dl className="mt-4 space-y-3">
                {card.items.map((item) => (
                  <div key={item.label.en} className="border-b border-outline-variant/15 pb-3 last:border-b-0 last:pb-0">
                    <dt className="font-label text-xs uppercase tracking-wider text-on-surface-variant">{t(locale, item.label)}</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-on-surface">{t(locale, item.value)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-on-surface-variant sm:mt-6">{t(locale, aboutContent.enterpriseSnapshotSection.sourceNote)}</p>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <SectionHeading
          description={aboutContent.platformMetricsSection.description}
          locale={locale}
          title={aboutContent.platformMetricsSection.title}
        />
        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {aboutContent.platformMetricsSection.metrics.map((item) => (
            <article key={item.label.en} className="rounded-[1.25rem] bg-surface-container-low p-5 sm:p-6">
              <p className="font-headline text-3xl font-black text-primary">{t(locale, item.value)}</p>
              <p className="mt-2 text-sm text-on-surface-variant">{t(locale, item.label)}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-xs text-on-surface-variant sm:mt-6">{t(locale, aboutContent.platformMetricsSection.sourceNote)}</p>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, aboutContent.valuesSection.title)}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {aboutContent.values.map((item) => (
              <article key={item.title.en} className="rounded-[1.25rem] bg-white p-5 shadow-panel sm:p-6">
                <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
          <article className="overflow-hidden rounded-[1.5rem] border border-outline-variant/20 bg-white shadow-panel">
            <div className="relative aspect-[4/5]">
              <Image
                alt={locale === 'zh' ? '工厂生产细节' : 'Factory production details'}
                className="object-cover"
                fill
                sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, 100vw"
                src={ABOUT_MEDIA.values}
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="font-label text-xs font-bold uppercase tracking-widest text-secondary">
                {locale === 'zh' ? '生产现场' : 'Production Scene'}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">
                {locale === 'zh'
                  ? '所有流程围绕稳定交付与长期协作来组织，减少跨环节信息损耗。'
                  : 'Execution is organized around stable delivery and long-term collaboration with reduced cross-team loss.'}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <SectionHeading
          description={aboutContent.rndSection.description}
          locale={locale}
          title={aboutContent.rndSection.title}
        />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-4 sm:gap-4">
          {ABOUT_MEDIA.rnd.map((image, index) => (
            <article key={image} className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
              <Image
                alt={locale === 'zh' ? `协同团队场景 ${index + 1}` : `Collaborative team scene ${index + 1}`}
                className="object-cover"
                fill
                sizes="(min-width: 1280px) 18vw, (min-width: 640px) 23vw, 48vw"
                src={image}
              />
            </article>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {aboutContent.rndSteps.map((item, index) => (
            <article key={item.title.en} className={`rounded-[1.25rem] p-5 sm:p-6 ${index % 3 === 0 ? 'bg-primary text-white' : index % 3 === 1 ? 'bg-surface-container-low text-primary' : 'bg-white text-primary shadow-panel'}`}>
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${index % 3 === 0 ? 'text-white/80' : 'text-on-surface-variant'}`}>{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20">
        <h2 className="font-headline text-3xl font-extrabold text-primary sm:text-4xl">{t(locale, aboutContent.technologyQualitySection.title)}</h2>
        <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 md:grid-cols-3">
          {aboutContent.technologyQualitySection.items.map((item, index) => (
            <article key={item.title.en} className="rounded-[1.25rem] border border-outline-variant/25 bg-surface-container-low p-5 sm:p-6">
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  alt={t(locale, item.title)}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 30vw, 100vw"
                  src={mediaByIndex(ABOUT_MEDIA.technology, index)}
                />
              </div>
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
