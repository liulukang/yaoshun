import Link from 'next/link';
import type {Metadata} from 'next';

import {JsonLd} from '@/components/seo/json-ld';
import {faqPageCopy} from '@/content/page-copy';
import {contactInfo, faqItems, getSiteName, seoKeywords} from '@/content/site-content';
import {getLocalizedText, getLocalizedValue} from '@/lib/locale';
import {getLocaleBasePath} from '@/i18n/config';
import {createPageMetadata} from '@/lib/seo';
import {faqJsonLd} from '@/lib/structured-data';
import type {Locale} from '@/types/content';

interface FaqPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: FaqPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const copy = getLocalizedValue(faqPageCopy, locale);

  return createPageMetadata({
    locale,
    path: '/faq',
    title: `${brandName} | ${copy.metadataTitle}`,
    description: copy.metadataDescription,
    keywords: seoKeywords
  });
}

export default async function FaqPage({params}: FaqPageProps) {
  const {locale} = await params;
  const copy = getLocalizedValue(faqPageCopy, locale);
  const basePath = getLocaleBasePath(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(locale)} />
      <section className="section-shell py-14 sm:py-20">
        <div className="panel-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.eyebrow}</p>
          <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{copy.title}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">{copy.intro}</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.id} className="faq-card">
              <h2 className="font-heading text-xl text-[#1d2340]">{getLocalizedText(item.question, locale)}</h2>
              <p className="mt-3 text-sm leading-7 text-[#5c6384]">{getLocalizedText(item.answer, locale)}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.moreDetailsTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5c6384]">{copy.moreDetailsBody}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`}
              data-track-event="whatsapp_click"
              data-track-location="faq_page"
              data-track-label="whatsapp"
              className="rounded-full border border-[#d9deef] bg-white px-4 py-2 text-sm font-semibold text-[#1d2340]"
            >
              {copy.whatsappLabel}
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              data-track-event="email_click"
              data-track-location="faq_page"
              data-track-label="email"
              className="rounded-full border border-[#d9deef] bg-white px-4 py-2 text-sm font-semibold text-[#1d2340]"
            >
              {copy.emailLabel}
            </a>
            <Link
              href={`${basePath}/contact`}
              data-track-event="cta_click"
              data-track-location="faq_page"
              data-track-label="go_contact"
              className="rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-4 py-2 text-sm font-semibold text-white"
            >
              {copy.goToContactPage}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
