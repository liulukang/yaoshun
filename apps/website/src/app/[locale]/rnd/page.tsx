import type {Metadata} from 'next';

import {getSiteName, seoKeywords} from '@/content/site-content';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface RndPageProps {
  params: Promise<{locale: Locale}>;
}

const rndHighlights = {
  zh: [
    '产品结构评估与成本优化并行推进，缩短立项周期。',
    '打样阶段同步验证包装、跌落与运输风险。',
    '支持 OEM 外观定制与 ODM 新品协同开发。',
    '可配合挤出设备（Extruder）相关部件的工程评估。'
  ],
  en: [
    'Structure feasibility and cost optimization are reviewed in parallel.',
    'Sampling is aligned with packaging, drop-test and transport-risk checks.',
    'Supports both OEM appearance customization and ODM new-product development.',
    'Engineering review can cover Extruder-related component requirements.'
  ]
} as const;

export async function generateMetadata({params}: RndPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);

  return createPageMetadata({
    locale,
    path: '/rnd',
    title: locale === 'zh' ? `${brandName} | 研发与定制能力` : `${brandName} | R&D and Customization`,
    description:
      locale === 'zh'
        ? '查看尧顺的 OEM / ODM 研发流程、打样验证机制与量产落地能力。'
        : 'Explore yaoshun OEM / ODM workflow, sample validation process and production-ready engineering capability.',
    keywords: seoKeywords
  });
}

export default async function RndPage({params}: RndPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">R&D Capability</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{isZh ? '研发与定制能力' : 'R&D and Customization Capability'}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">
          {isZh
            ? '我们按外贸项目执行节奏搭建研发流程，从需求确认、结构评估到打样与验证，最终无缝衔接量产。'
            : 'Our R&D flow is aligned with export project timelines, from requirement confirmation and structure review to sampling, validation and production handoff.'}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '流程阶段' : 'Workflow Stages'}</h2>
          <div className="mt-5 space-y-3">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">01 </span>
                {isZh ? '需求确认：明确市场、价位、包装与合规标准。' : 'Requirement confirmation: define market, target pricing, packaging and compliance scope.'}
              </p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">02 </span>
                {isZh
                  ? '结构与模具评估：判断功能可行性与量产风险。'
                  : 'Structure and tooling review: evaluate functionality feasibility and production risk.'}
              </p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">03 </span>
                {isZh ? '打样与验证：同步进行样品、包装与关键测试项验证。' : 'Sampling and validation: align sample confirmation with packaging and key test checks.'}
              </p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">04 </span>
                {isZh ? '量产导入：形成工程资料并对接排产交付。' : 'Production handoff: finalize engineering documentation and connect to production scheduling.'}
              </p>
            </div>
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{isZh ? '研发亮点' : 'R&D Highlights'}</h2>
          <div className="mt-5 space-y-3">
            {rndHighlights[locale].map((item) => (
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
