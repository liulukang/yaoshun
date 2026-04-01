import type {Metadata} from 'next';

import {certifications, getSiteName, seoKeywords} from '@/content/site-content';
import {getLocalizedText} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface CertificationsPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: CertificationsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const title = locale === 'zh' ? `${brandName} | 资质与合规` : `${brandName} | Certifications & Compliance`;
  const description =
    locale === 'zh'
      ? '查看 CE、ASTM、EN71 及 BSCI、ICTI、ISO9001 相关进度，快速评估项目准入与合规能力。'
      : 'Review CE, ASTM, EN71 and BSCI, ICTI, ISO9001 progress to evaluate project-entry compliance quickly.';

  return createPageMetadata({
    locale,
    path: '/certifications',
    title,
    description,
    keywords: seoKeywords
  });
}

export default async function CertificationsPage({params}: CertificationsPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';
  const readyItems = certifications.filter((item) => item.status === 'available');
  const progressItems = certifications.filter((item) => item.status === 'in-progress');

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{isZh ? 'Trust & Compliance' : 'Trust & Compliance'}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{isZh ? '认证与验厂进度' : 'Certification and Audit Progress'}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">
          {isZh
            ? '针对欧美项目，我们提供证书与检测资料支持；验厂与质量体系进度持续更新，便于采购团队做风控判断。'
            : 'For EU and US projects, certification and lab documentation support is provided, while audit and quality-system progress is transparently updated.'}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '可提供资料' : 'Available Documents'}</h2>
          <div className="mt-5 space-y-3">
            {readyItems.map((item) => (
              <div key={item.id} className="glass-list-item">
                <div className="flex-1">
                  <p className="font-heading text-lg text-[#1d2340]">{item.name}</p>
                  <p className="mt-1 text-sm leading-7 text-[#5c6384]">{getLocalizedText(item.description, locale)}</p>
                </div>
                <span className="rounded-full bg-[#e8fff7] px-3 py-1 text-xs font-semibold text-[#0f9f7a]">{isZh ? '可提供' : 'Available'}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '进行中项目' : 'In-Progress Items'}</h2>
          <div className="mt-5 space-y-3">
            {progressItems.map((item) => (
              <div key={item.id} className="glass-list-item">
                <div className="flex-1">
                  <p className="font-heading text-lg text-[#1d2340]">{item.name}</p>
                  <p className="mt-1 text-sm leading-7 text-[#5c6384]">{getLocalizedText(item.description, locale)}</p>
                </div>
                <span className="rounded-full bg-[#fff4e8] px-3 py-1 text-xs font-semibold text-[#d46a28]">
                  {item.etaDays
                    ? isZh
                      ? `约 ${item.etaDays} 天`
                      : `~${item.etaDays} days`
                    : isZh
                    ? '进行中'
                    : 'In progress'}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
