import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {companyProfile, faqContent, pageLabels} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.faq)} | ${t(locale, companyProfile.companyName)}`, t(locale, faqContent.hero.description), 'faq');
}

export default async function FaqPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="max-w-screen-2xl pb-16 pt-16 sm:pb-20 sm:pt-20">
        <header className="mb-12 sm:mb-16 lg:mb-20">
          <span className="block font-label text-xs font-bold uppercase tracking-widest text-secondary">{t(locale, faqContent.hero.eyebrow)}</span>
          <h1 className="mt-3 font-headline text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl md:text-7xl">{t(locale, faqContent.hero.title)}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg">{t(locale, faqContent.hero.description)}</p>
        </header>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12">
          <section className="space-y-6 sm:space-y-8 lg:col-span-8">
            <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <div className="h-10 w-10 rounded-xl bg-primary-fixed sm:h-12 sm:w-12" />
              <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{locale === 'en' ? 'Manufacturing FAQ' : '制造常见问题'}</h2>
            </div>
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {faqContent.questions.map((item) => (
                <article key={t(locale, item.q)} className="rounded-xl border border-transparent bg-surface-container-low p-5 transition-all hover:border-outline-variant/20 hover:bg-surface-container sm:p-6 lg:p-8">
                  <h3 className="font-headline text-lg font-bold text-primary sm:text-xl">{t(locale, item.q)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.a)}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 sm:mt-16 lg:mt-20">
              <div className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4 lg:mb-12">
                <div className="h-10 w-10 rounded-xl bg-tertiary-fixed sm:h-12 sm:w-12" />
                <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{locale === 'en' ? 'Logistics & Global Shipping' : '物流与全球发货'}</h2>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] bg-primary p-5 text-white sm:p-6 lg:p-12">
                <div className="relative z-10 grid gap-6 sm:gap-8 md:grid-cols-2 lg:gap-12">
                  <div>
                    <h3 className="font-headline text-2xl font-bold sm:text-3xl">{locale === 'en' ? 'Trade Coordination Notes' : '贸易协作说明'}</h3>
                    <ul className="mt-4 space-y-3 text-sm text-primary-fixed sm:mt-6 sm:space-y-4 sm:text-base">
                      {faqContent.logistics.map((item) => (
                        <li key={t(locale, item.title)} className="flex justify-between border-b border-primary-container pb-2">
                          <span>{t(locale, item.title)}</span>
                          <span className="max-w-[14rem] text-right font-bold text-white">{t(locale, item.text)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-surface-container-lowest/10 p-5 backdrop-blur-md sm:p-6 lg:p-8">
                    <h4 className="text-lg font-bold sm:text-xl">{locale === 'en' ? 'Quote Support' : '报价支持'}</h4>
                    <p className="mt-4 text-sm leading-relaxed opacity-80">
                      {locale === 'en'
                        ? 'Need a custom shipping or production response? Move directly to the quote page with your market, quantity, and packaging notes.'
                        : '如果需要定制物流或生产方案，可直接携带市场、数量和包装要求进入报价页。'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6 sm:space-y-8 lg:col-span-4">
            <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-panel sm:p-6 lg:p-8">
              <h3 className="font-headline text-xl font-bold text-primary">{locale === 'en' ? 'Primary Export Contact' : '主要出口联系'}</h3>
              <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                <p className="font-bold text-primary">{companyProfile.phone}</p>
                <p className="text-sm text-on-surface-variant">{companyProfile.email}</p>
                <p className="text-sm text-on-surface-variant">{t(locale, companyProfile.address)}</p>
              </div>
            </div>
            <div className="rounded-2xl bg-primary-container p-5 text-white sm:p-6 lg:p-8">
              <h3 className="font-headline text-xl font-bold sm:text-2xl">{locale === 'en' ? 'Expert Trade Support' : '贸易沟通支持'}</h3>
              <p className="mt-4 text-sm text-on-primary-container">{locale === 'en' ? 'The preserved profile already contains your core B2B contact points.' : '保留的企业资料已经覆盖核心 B 端联系信息。'}</p>
            </div>
          </aside>
        </div>
      </main>

      <PageLinks
        description={{en: 'Open the quote page, revisit the product catalog, or review privacy handling for submitted data.', zh: '继续打开报价页、返回产品目录，或查看提交数据的隐私处理。'}}
        locale={locale}
        route="faq"
        title={{en: 'Continue From FAQ', zh: '从 FAQ 继续浏览'}}
      />
    </div>
  );
}
