import type {Metadata} from 'next';

import {InquiryForm} from '@/components/forms/inquiry-form';
import {contactPageCopy} from '@/content/page-copy';
import {contactInfo, getSiteName, seoKeywords} from '@/content/site-content';
import {getLocalizedText, getLocalizedValue} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface ContactPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: ContactPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const copy = getLocalizedValue(contactPageCopy, locale);

  return createPageMetadata({
    locale,
    path: '/contact',
    title: `${brandName} | ${copy.title}`,
    description: copy.metadataDescription,
    keywords: seoKeywords
  });
}

export default async function ContactPage({params}: ContactPageProps) {
  const {locale} = await params;
  const copy = getLocalizedValue(contactPageCopy, locale);
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`;

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="contact-panel">
        <article className="panel-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.eyebrow}</p>
          <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{copy.title}</h1>
          <p className="mt-4 text-sm leading-7 text-[#5c6384]">{copy.intro}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href={whatsappHref}
              data-track-event="whatsapp_click"
              data-track-location="contact_page"
              data-track-label="whatsapp"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.whatsappLabel}</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.whatsapp}</p>
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
              data-track-event="phone_click"
              data-track-location="contact_page"
              data-track-label="phone"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.phoneLabel}</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.phone}</p>
            </a>
            <a
              href={contactInfo.linkedin}
              data-track-event="cta_click"
              data-track-location="contact_page"
              data-track-label="linkedin"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.linkedinLabel}</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.linkedin.replace('https://', '')}</p>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              data-track-event="email_click"
              data-track-location="contact_page"
              data-track-label="email"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.emailLabel}</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.email}</p>
            </a>
          </div>
        </article>

        <article className="panel-card checklist-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.checklistTitle}</h2>
          <div className="mt-5 space-y-3">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.checklistCategory}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.checklistModel}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.checklistMoq}</p>
            </div>
          </div>
          <p className="mt-6 rounded-3xl border border-[#ffd7cd] bg-[#fff1eb] px-5 py-4 text-sm leading-7 text-[#a95645]">
            {copy.factoryAddressLabel}: {getLocalizedText(contactInfo.address, locale)}
          </p>
        </article>
      </div>

      <div className="mt-8">
        <InquiryForm locale={locale} />
      </div>
    </section>
  );
}
