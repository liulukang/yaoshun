import type {Metadata} from 'next';

import {privacyPageCopy} from '@/content/page-copy';
import {getSiteName, seoKeywords} from '@/content/site-content';
import {getLocalizedValue} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface PrivacyPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: PrivacyPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const copy = getLocalizedValue(privacyPageCopy, locale);

  return createPageMetadata({
    locale,
    path: '/privacy',
    title: `${brandName} | ${copy.metadataTitle}`,
    description: copy.metadataDescription,
    keywords: seoKeywords
  });
}

export default async function PrivacyPage({params}: PrivacyPageProps) {
  const {locale} = await params;
  const copy = getLocalizedValue(privacyPageCopy, locale);

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{copy.title}</h1>
        <p className="mt-4 text-sm leading-7 text-[#5c6384]">{copy.effectiveDate}</p>
      </div>

      <div className="mt-8 grid gap-4">
        {copy.sections.map((section) => (
          <article key={section.title} className="faq-card">
            <h2 className="font-heading text-xl text-[#1d2340]">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#5c6384]">{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
