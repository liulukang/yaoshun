import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {companyProfile, pageLabels, privacyContent} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.privacy)} | ${t(locale, companyProfile.companyName)}`, t(locale, privacyContent.hero.description), 'privacy');
}

export default async function PrivacyPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="mx-auto max-w-6xl pb-16 pt-20 sm:pb-20 sm:pt-24 lg:pt-32">
        <header className="mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-4 py-1.5 text-on-primary-fixed">
            <span className="font-label text-xs font-bold uppercase tracking-widest">{t(locale, privacyContent.hero.eyebrow)}</span>
          </div>
          <h1 className="mt-5 font-headline text-4xl font-extrabold leading-[0.95] tracking-tighter text-primary sm:mt-6 sm:text-5xl md:text-7xl">{t(locale, privacyContent.hero.title)}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, privacyContent.hero.description)}</p>
        </header>

        <div className="mb-14 grid gap-4 sm:mb-16 sm:gap-6 lg:mb-24 lg:gap-8 md:grid-cols-12">
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-5 sm:p-6 lg:p-10 md:col-span-7">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">{locale === 'en' ? 'Data Collection' : '数据收集'}</h2>
            <div className="mt-4 space-y-5 sm:mt-5 sm:space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary-container sm:h-12 sm:w-12" />
                <div>
                  <h3 className="text-lg font-bold text-primary">{locale === 'en' ? 'Contact Forms' : '联系表单'}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{locale === 'en' ? 'We collect company name, email, market notes, and production requirements to answer B2B requests.' : '我们会收集公司名称、邮箱、目标市场和生产需求，用于回复 B 端询盘。'}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary-container sm:h-12 sm:w-12" />
                <div>
                  <h3 className="text-lg font-bold text-primary">{locale === 'en' ? 'Cookies & Analytics' : 'Cookie 与分析'}</h3>
                  <p className="mt-1 text-sm text-on-surface-variant">{locale === 'en' ? 'Essential site performance and form experience measurement only.' : '仅用于站点基础性能和表单体验分析。'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-xl bg-primary-container p-5 text-white shadow-xl sm:p-6 lg:p-10 md:col-span-5">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{locale === 'en' ? 'Business-Grade Handling' : '企业级处理方式'}</h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-fixed">{locale === 'en' ? 'Form data is used for quotation follow-up, project evaluation, and communication continuity only.' : '表单数据仅用于报价跟进、项目评估与持续沟通。'}</p>
            </div>
            <div className="mt-6 border-t border-white/10 pt-6 sm:mt-8 sm:pt-8">
              <span className="text-xs font-bold uppercase tracking-widest text-tertiary-fixed">{locale === 'en' ? 'Protected Contact Flow' : '受保护的联系流程'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-14 sm:space-y-16 lg:space-y-20">
          <section className="grid gap-6 sm:gap-8 lg:gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">{locale === 'en' ? 'Section 01' : '第 01 节'}</h3>
              <h2 className="mt-3 font-headline text-3xl font-extrabold leading-none text-primary sm:mt-4 sm:text-4xl">{locale === 'en' ? 'Your Rights' : '您的权利'}</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:gap-8 md:col-span-8">
              {[
                {title: {en: 'Right to Access', zh: '访问权'}, text: {en: 'Request a copy of the information submitted through business forms.', zh: '可申请查看通过商务表单提交的信息副本。'}},
                {title: {en: 'Right to Rectification', zh: '更正权'}, text: {en: 'Update incorrect business contact details or shipping notes.', zh: '可以更正错误的商务联系人或发货信息。'}},
                {title: {en: 'Right to Erasure', zh: '删除权'}, text: {en: 'Marketing follow-up data can be removed upon request unless required for a live transaction.', zh: '在不影响正在执行的交易前提下，可申请删除营销跟进数据。'}},
                {title: {en: 'Data Portability', zh: '数据可携带权'}, text: {en: 'Quote-related records can be exported for handover if needed.', zh: '如有需要，可导出与报价相关的记录用于交接。'}}
              ].map((item) => (
                <div key={t(locale, item.title)} className="rounded-xl bg-surface-container p-5 sm:p-6 lg:p-8">
                  <h4 className="text-lg font-bold text-primary">{t(locale, item.title)}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 sm:gap-8 lg:gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-secondary">{locale === 'en' ? 'Section 02' : '第 02 节'}</h3>
              <h2 className="mt-3 font-headline text-3xl font-extrabold leading-none text-primary sm:mt-4 sm:text-4xl">{locale === 'en' ? 'Cookie Policy' : 'Cookie 政策'}</h2>
            </div>
            <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest md:col-span-8">
              <table className="data-table">
                <thead className="bg-surface-container-high">
                  <tr>
                    <th>{locale === 'en' ? 'Category' : '类别'}</th>
                    <th>{locale === 'en' ? 'Purpose' : '用途'}</th>
                    <th>{locale === 'en' ? 'Retention' : '保留时间'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold text-primary">{locale === 'en' ? 'Essential' : '必要'}</td>
                    <td className="text-on-surface-variant">{locale === 'en' ? 'Form continuity and page rendering.' : '用于表单连续性和页面渲染。'}</td>
                    <td className="text-on-surface-variant">{locale === 'en' ? 'Session' : '会话期'}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-primary">{locale === 'en' ? 'Analytics' : '分析'}</td>
                    <td className="text-on-surface-variant">{locale === 'en' ? 'Measure site performance and interaction quality.' : '衡量站点性能与交互质量。'}</td>
                    <td className="text-on-surface-variant">{locale === 'en' ? 'Up to 24 months' : '最长 24 个月'}</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-primary">{locale === 'en' ? 'Marketing' : '营销'}</td>
                    <td className="text-on-surface-variant">{locale === 'en' ? 'Only if future campaign tools are enabled.' : '仅在后续启用营销工具时使用。'}</td>
                    <td className="text-on-surface-variant">{locale === 'en' ? 'As configured' : '按工具配置'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <PageLinks
        description={{en: 'From privacy handling you can return to the quote page, company information, or product catalog.', zh: '从隐私页可以返回报价页、公司资料或产品目录。'}}
        locale={locale}
        route="privacy"
        title={{en: 'Return To Business Pages', zh: '返回业务页面'}}
      />
    </div>
  );
}
