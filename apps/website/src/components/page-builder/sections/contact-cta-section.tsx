import Link from 'next/link';
import {ArrowRight, Globe2, MessageCircleMore} from 'lucide-react';

import {InquiryForm} from '@/components/forms/inquiry-form';
import type {HomeSectionRenderProps} from '@/components/page-builder/section-registry';
import {localeBasePath} from '@/components/page-builder/helpers';
import {contactSectionCopy} from '@/content/page-copy';
import {getLocalizedValue} from '@/lib/locale';
import {SectionHeading} from '@/components/ui/section-heading';

export function ContactCtaGlass({content, locale}: HomeSectionRenderProps) {
  const basePath = localeBasePath(locale);
  const copy = getLocalizedValue(contactSectionCopy, locale);

  return (
    <div className="contact-panel">
      <div className="space-y-6">
        <SectionHeading eyebrow={content.contact.eyebrow} title={content.contact.title} description={content.contact.description} />
        <div className="grid gap-4 md:grid-cols-3">
          {content.contact.channels.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href}
              data-track-event={channel.label.toLowerCase().includes('whatsapp') ? 'whatsapp_click' : channel.label.toLowerCase().includes('email') ? 'email_click' : 'cta_click'}
              data-track-location="home_contact"
              data-track-label={channel.label}
              className="channel-card"
            >
              <MessageCircleMore className="h-5 w-5 text-[#ff6b57]" />
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#7b819d]">{channel.label}</p>
              <p className="mt-2 break-all text-sm text-[#1d2340] sm:break-normal sm:text-base">{channel.value}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel-card checklist-card">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#d8edf8] bg-[#ebfbff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#1d7fb8]">
            <Globe2 className="h-4 w-4 text-[#1d7fb8]" />
            {content.contact.checklistTitle}
          </p>
          <div className="mt-6 space-y-4">
            {content.contact.checklist.map((item) => (
              <div key={item} className="glass-list-item">
                <p className="text-sm leading-7 text-[#5f6788]">{item}</p>
              </div>
            ))}
          </div>
          <Link
            href={`${basePath}/contact`}
            data-track-event="cta_click"
            data-track-location="home_contact_submit"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            {copy.goToInquiryForm}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <InquiryForm locale={locale} source="website-home-form" formName="home_contact" />
      </div>
    </div>
  );
}

export function ContactCtaSplit({content, locale}: HomeSectionRenderProps) {
  const basePath = localeBasePath(locale);
  const copy = getLocalizedValue(contactSectionCopy, locale);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="panel-card">
        <SectionHeading eyebrow={content.contact.eyebrow} title={content.contact.title} description={content.contact.description} />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {content.contact.channels.map((channel) => (
            <Link
              key={channel.label}
              href={channel.href}
              data-track-event={channel.label.toLowerCase().includes('whatsapp') ? 'whatsapp_click' : channel.label.toLowerCase().includes('email') ? 'email_click' : 'cta_click'}
              data-track-location="home_contact"
              data-track-label={channel.label}
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{channel.label}</p>
              <p className="mt-2 text-sm text-[#1d2340]">{channel.value}</p>
            </Link>
          ))}
        </div>
      </article>

      <div className="space-y-6">
        <article className="panel-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.quickBrief}</p>
          <h3 className="mt-3 font-heading text-2xl text-[#1d2340]">{copy.prepareInquiryInTwoMinutes}</h3>
          <div className="mt-5 space-y-3">
            {content.contact.checklist.map((item) => (
              <div key={item} className="glass-list-item">
                <p className="text-sm leading-7 text-[#5f6788]">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-3xl border border-[#ffd7cd] bg-[#fff1eb] px-5 py-4 text-sm leading-7 text-[#a95645]">{content.contact.notice}</p>
          <Link
            href={`${basePath}/contact`}
            data-track-event="cta_click"
            data-track-location="home_contact_submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#ff6b57,#ffaf68)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            {copy.openContactPage}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <InquiryForm locale={locale} source="website-home-form" formName="home_contact" />
      </div>
    </div>
  );
}
