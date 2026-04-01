import type {Metadata} from 'next';

import {companyProfile, seoKeywords} from '@/content/site-content';
import {getLocalizedText} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface CompanyPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: CompanyPageProps): Promise<Metadata> {
  const {locale} = await params;
  const title = locale === 'zh' ? `${companyProfile.name} | 公司简介` : `${companyProfile.name} | Company Profile`;
  const description = getLocalizedText(companyProfile.summary, locale);

  return createPageMetadata({
    locale,
    path: '/company',
    title,
    description,
    keywords: seoKeywords
  });
}

export default async function CompanyPage({params}: CompanyPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{isZh ? 'Company Profile' : 'Company Profile'}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">
          {isZh ? '稳定制造能力与长期外贸交付经验' : 'Stable Manufacturing with Long-Term Export Delivery Experience'}
        </h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">{getLocalizedText(companyProfile.summary, locale)}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="info-card info-card-peach">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{isZh ? '成立时间' : 'Established'}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{companyProfile.establishedYear}</p>
          </article>
          <article className="info-card info-card-sky">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{isZh ? '厂房面积' : 'Factory Area'}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{companyProfile.factoryAreaSqm.toLocaleString()} m²</p>
          </article>
          <article className="info-card info-card-mint">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{isZh ? '员工人数' : 'Team Size'}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{companyProfile.employeeCount}+</p>
          </article>
          <article className="info-card info-card-violet">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{isZh ? '月产能力' : 'Monthly Capacity'}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{companyProfile.monthlyCapacityTons} {isZh ? '吨' : 'tons'}</p>
          </article>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '使命与愿景' : 'Mission & Vision'}</h2>
          <div className="mt-5 space-y-4">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">Mission: </span>
                {getLocalizedText(companyProfile.mission, locale)}
              </p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">Vision: </span>
                {getLocalizedText(companyProfile.vision, locale)}
              </p>
            </div>
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '核心优势' : 'Core Strengths'}</h2>
          <div className="mt-5 space-y-3">
            {companyProfile.coreStrengths.map((item) => (
              <div key={item.en} className="glass-list-item">
                <p className="text-sm leading-7 text-[#5c6384]">{getLocalizedText(item, locale)}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
