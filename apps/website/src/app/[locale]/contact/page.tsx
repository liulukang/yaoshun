import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {QuoteForm} from '@/components/quote-form';
import {companyProfile, contactContent, pageLabels} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.contact)} | ${t(locale, companyProfile.companyName)}`, t(locale, contactContent.hero.description), 'contact');
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="overflow-x-hidden pb-16 pt-20 sm:pb-20 sm:pt-24">
        <section className="mt-8 grid grid-cols-1 items-start gap-10 sm:mt-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-6 sm:space-y-8 lg:col-span-5">
            <div>
              <span className="inline-block rounded-full bg-secondary-fixed px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest text-on-secondary-fixed">{t(locale, contactContent.hero.eyebrow)}</span>
              <h1 className="mt-4 font-headline text-4xl font-extrabold leading-[1.05] tracking-tighter text-primary sm:mt-5 sm:text-5xl lg:mt-6 lg:text-6xl">{t(locale, contactContent.hero.title)}</h1>
              <p className="mt-4 text-base font-medium leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg lg:mt-6 lg:text-xl">{t(locale, contactContent.hero.description)}</p>
            </div>

            <div className="flex items-center gap-4 rounded-xl border-l-4 border-secondary bg-primary-container p-5 text-on-primary-container shadow-lg sm:gap-6 sm:p-6">
              <div className="h-10 w-10 rounded-full bg-secondary sm:h-12 sm:w-12" />
              <div>
                <h3 className="text-lg font-bold text-white">{locale === 'en' ? '24-hour Response Goal' : '24 小时响应目标'}</h3>
                <p className="mt-1 text-sm opacity-90">{locale === 'en' ? 'Trade managers review qualified B2B inquiries as quickly as possible.' : '贸易经理会尽快审核有效的 B 端询盘。'}</p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4">
              <p className="mb-4 font-label text-xs font-bold uppercase tracking-widest text-outline sm:mb-6">{locale === 'en' ? 'Direct Channels' : '直接联系渠道'}</p>
              <div className="grid gap-3 sm:gap-4">
                {contactContent.channels.map((item) => (
                  <a key={item.href} className="group flex items-center gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-4 transition-all hover:shadow-xl sm:p-5" href={item.href} rel="noreferrer" target="_blank">
                    <div className="h-10 w-10 rounded-full bg-secondary-fixed sm:h-12 sm:w-12" />
                    <div>
                      <p className="font-label text-xs font-bold uppercase text-outline">{t(locale, item.label)}</p>
                      <p className="text-sm font-bold text-primary transition-colors group-hover:text-secondary sm:text-base">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <QuoteForm locale={locale} />
          </div>
        </section>
      </main>

      <PageLinks
        description={{en: 'After opening the quote page, continue into product details, company context, or privacy handling.', zh: '打开报价页后，可以继续查看产品详情、公司背景或隐私说明。'}}
        locale={locale}
        route="contact"
        title={{en: 'Continue From The Quote Page', zh: '从报价页继续浏览'}}
      />
    </div>
  );
}
