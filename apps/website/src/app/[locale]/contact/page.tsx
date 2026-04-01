import type {Metadata} from 'next';

import {InquiryForm} from '@/components/forms/inquiry-form';
import {contactInfo, getSiteName, seoKeywords} from '@/content/site-content';
import {getLocalizedText} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface ContactPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: ContactPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);

  return createPageMetadata({
    locale,
    path: '/contact',
    title: locale === 'zh' ? `${brandName} | 联系我们` : `${brandName} | Contact`,
    description:
      locale === 'zh'
        ? '通过 WhatsApp、LinkedIn 或邮件联系尧顺，提交产品需求并获取外贸项目报价路径。'
        : 'Contact yaoshun via WhatsApp, LinkedIn or email to submit product requirements and get a practical quotation path.',
    keywords: seoKeywords
  });
}

export default async function ContactPage({params}: ContactPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp.replace(/[^\d]/g, '')}`;

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="contact-panel">
        <article className="panel-card">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{isZh ? 'Inquiry & Contact' : 'Inquiry & Contact'}</p>
          <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{isZh ? '联系我们' : 'Contact Us'}</h1>
          <p className="mt-4 text-sm leading-7 text-[#5c6384]">
            {isZh
              ? '请在咨询中提供产品方向、目标市场与预估数量，我们将匹配对应业务和工程同事快速回复。'
              : 'Please include product category, target market and estimated quantity in your inquiry. Our sales and engineering team will respond quickly.'}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <a
              href={whatsappHref}
              data-track-event="whatsapp_click"
              data-track-location="contact_page"
              data-track-label="whatsapp"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">WhatsApp</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.whatsapp}</p>
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`}
              data-track-event="phone_click"
              data-track-location="contact_page"
              data-track-label="phone"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">Phone</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.phone}</p>
            </a>
            <a
              href={contactInfo.linkedin}
              data-track-event="cta_click"
              data-track-location="contact_page"
              data-track-label="linkedin"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">LinkedIn</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.linkedin.replace('https://', '')}</p>
            </a>
            <a
              href={`mailto:${contactInfo.email}`}
              data-track-event="email_click"
              data-track-location="contact_page"
              data-track-label="email"
              className="channel-card"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">Email</p>
              <p className="mt-2 text-base text-[#1d2340]">{contactInfo.email}</p>
            </a>
          </div>
        </article>

        <article className="panel-card checklist-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '咨询建议' : 'Inquiry Checklist'}</h2>
          <div className="mt-5 space-y-3">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{isZh ? '提供目标市场（如欧盟/北美/中东）与销售渠道类型。' : 'Share target market (EU / North America / Middle East) and channel type.'}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                {isZh
                  ? '提供产品规格要点：材质、尺寸、适龄、包装与认证要求。'
                  : 'Share key product requirements: material, size, age range, packaging and compliance scope.'}
              </p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{isZh ? '说明预计采购量、目标交期与首单时间窗口。' : 'Provide estimated quantity, target lead time and expected first-order window.'}</p>
            </div>
          </div>
          <p className="mt-6 rounded-3xl border border-[#ffd7cd] bg-[#fff1eb] px-5 py-4 text-sm leading-7 text-[#a95645]">
            {isZh
              ? `工厂地址：${getLocalizedText(contactInfo.address, locale)}`
              : `Factory Address: ${getLocalizedText(contactInfo.address, locale)}`}
          </p>
        </article>
      </div>

      <div className="mt-8">
        <InquiryForm locale={locale} />
      </div>
    </section>
  );
}
