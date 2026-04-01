import type {Metadata} from 'next';

import {rndPageCopy} from '@/content/page-copy';
import {getSiteName, seoKeywords} from '@/content/site-content';
import {getLocalizedValue} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface RndPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: RndPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const copy = getLocalizedValue(rndPageCopy, locale);

  return createPageMetadata({
    locale,
    path: '/rnd',
    title: `${brandName} | ${copy.metadataTitle}`,
    description: copy.metadataDescription,
    keywords: seoKeywords
  });
}

export default async function RndPage({params}: RndPageProps) {
  const {locale} = await params;
  const copy = getLocalizedValue(rndPageCopy, locale);

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{copy.title}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">{copy.intro}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.workflowStages}</h2>
          <div className="mt-5 space-y-3">
            {copy.steps.map((step, index) => (
              <div key={step} className="glass-list-item">
                <p className="text-sm leading-7 text-[#5c6384]">
                  <span className="font-semibold text-[#1d2340]">{String(index + 1).padStart(2, '0')} </span>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.highlights}</h2>
          <div className="mt-5 space-y-3">
            {copy.highlightItems.map((item) => (
              <div key={item} className="glass-list-item">
                <p className="text-sm leading-7 text-[#5c6384]">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
