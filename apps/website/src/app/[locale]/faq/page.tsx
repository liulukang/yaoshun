import Link from 'next/link';
import type {Metadata} from 'next';

import {JsonLd} from '@/components/seo/json-ld';
import {contactInfo, faqItems, getSiteName, seoKeywords} from '@/content/site-content';
import {getLocalizedText} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import {faqJsonLd} from '@/lib/structured-data';
import type {Locale} from '@/types/content';

interface FaqPageProps {
  params: Promise<{locale: Locale}>;
}

function localeRoot(locale: Locale): string {
  return locale === 'zh' ? '/zh' : '/en';
}

export async function generateMetadata({params}: FaqPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);

  return createPageMetadata({
    locale,
    path: '/faq',
    title: locale === 'zh' ? `${brandName} | 常见问题` : `${brandName} | FAQ`,
    description:
      locale === 'zh'
        ? '查看 MOQ、交期、打样费、OEM / ODM、质保与认证资料的常见问题解答。'
        : 'Find answers about MOQ, lead time, sample fee, OEM/ODM, warranty and compliance documentation.',
    keywords: seoKeywords
  });
}

export default async function FaqPage({params}: FaqPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';
  const basePath = localeRoot(locale);

  return (
    <>
      <JsonLd data={faqJsonLd(locale)} />
      <section className="section-shell py-14 sm:py-20">
        <div className="panel-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">FAQ</p>
          <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{isZh ? '常见问题' : 'Frequently Asked Questions'}</h1>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">
            {isZh
              ? '以下内容覆盖外贸买家咨询频率最高的问题，可帮助你更快判断合作可行性。'
              : 'These answers cover the most frequent sourcing questions and help you evaluate cooperation feasibility faster.'}
          </p>
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
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '还有其他问题？' : 'Need More Details?'}</h2>
          <p className="mt-3 text-sm leading-7 text-[#5c6384]">
            {isZh
              ? '可直接通过 WhatsApp 或邮件发送产品型号与目标市场，我们将在 1 个工作日内回复。'
              : 'Send product model and target market via WhatsApp or email. Our team usually replies within one business day.'}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`}
              data-track-event="whatsapp_click"
              data-track-location="faq_page"
              data-track-label="whatsapp"
              className="rounded-full border border-[#d9deef] bg-white px-4 py-2 text-sm font-semibold text-[#1d2340]"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              data-track-event="email_click"
              data-track-location="faq_page"
              data-track-label="email"
              className="rounded-full border border-[#d9deef] bg-white px-4 py-2 text-sm font-semibold text-[#1d2340]"
            >
              Email
            </a>
            <Link
              href={`${basePath}/contact`}
              data-track-event="cta_click"
              data-track-location="faq_page"
              data-track-label="go_contact"
              className="rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-4 py-2 text-sm font-semibold text-white"
            >
              {isZh ? '前往联系页面' : 'Go to Contact Page'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
