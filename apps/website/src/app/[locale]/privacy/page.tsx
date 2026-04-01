import type {Metadata} from 'next';

import {getSiteName, seoKeywords} from '@/content/site-content';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface PrivacyPageProps {
  params: Promise<{locale: Locale}>;
}

const policySections = {
  zh: [
    {
      title: '1. 信息收集范围',
      content:
        '我们仅收集业务沟通所需信息，包括联系人姓名、公司名称、邮箱、电话、目标市场及产品需求。不会主动收集与业务无关的敏感个人信息。'
    },
    {
      title: '2. 信息使用目的',
      content:
        '收集的信息仅用于询盘回复、报价沟通、样品安排、订单执行和售后支持。未经授权，不会用于与项目无关的营销用途。'
    },
    {
      title: '3. 数据存储与安全',
      content:
        '我们采用访问权限控制和备份机制保护数据安全。业务资料仅在履约和合规范围内保存，超出必要周期的数据将定期清理。'
    },
    {
      title: '4. 第三方与跨境传输',
      content:
        '在物流、检测、支付或合规需求下，可能向必要第三方共享最小化信息。涉及跨境数据传输时，将遵循目标市场相关法律要求。'
    },
    {
      title: '5. 用户权利与合规',
      content:
        '如你所在地区适用 GDPR 等法规，可申请访问、更正或删除个人数据。我们支持按需提供欧代与德国包装法相关页面信息。'
    }
  ],
  en: [
    {
      title: '1. Information We Collect',
      content:
        'We only collect business-relevant information, including contact name, company, email, phone, target market and product requirements. We do not proactively collect unrelated sensitive personal data.'
    },
    {
      title: '2. How We Use Information',
      content:
        'Collected data is used for inquiry response, quotation communication, sample arrangement, order execution and after-sales support. It is not used for unrelated marketing purposes without authorization.'
    },
    {
      title: '3. Data Storage and Security',
      content:
        'We apply access control and backup mechanisms to protect business data. Information is retained within fulfillment and compliance scope, and outdated records are cleaned regularly.'
    },
    {
      title: '4. Third-Party Sharing and Cross-Border Transfer',
      content:
        'Minimum necessary data may be shared with required third parties for logistics, testing, payment or compliance. Cross-border processing follows applicable legal requirements of destination markets.'
    },
    {
      title: '5. Data Subject Rights',
      content:
        'If GDPR or similar laws apply in your region, you may request access, correction or deletion of personal data. EU representative and German Packaging Act related information can be provided when required.'
    }
  ]
} as const;

export async function generateMetadata({params}: PrivacyPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);

  return createPageMetadata({
    locale,
    path: '/privacy',
    title: locale === 'zh' ? `${brandName} | 隐私政策` : `${brandName} | Privacy Policy`,
    description:
      locale === 'zh'
        ? '查看尧顺的数据收集、使用、安全与 GDPR 合规相关隐私政策。'
        : 'Read yaoshun privacy policy on data collection, usage, security and GDPR-related compliance.',
    keywords: seoKeywords
  });
}

export default async function PrivacyPage({params}: PrivacyPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{isZh ? 'Privacy Policy' : 'Privacy Policy'}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{isZh ? '隐私政策' : 'Privacy Policy'}</h1>
        <p className="mt-4 text-sm leading-7 text-[#5c6384]">{isZh ? '生效日期：2026-04-01' : 'Effective Date: 2026-04-01'}</p>
      </div>

      <div className="mt-8 grid gap-4">
        {policySections[locale].map((section) => (
          <article key={section.title} className="faq-card">
            <h2 className="font-heading text-xl text-[#1d2340]">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[#5c6384]">{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
