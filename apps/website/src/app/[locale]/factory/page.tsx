import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {companyProfile, factoryContent, pageLabels} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.factory)} | ${t(locale, companyProfile.companyName)}`, t(locale, factoryContent.hero.description), 'factory');
}

export default async function FactoryPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="relative -mx-4 min-h-[520px] overflow-hidden sm:-mx-6 md:min-h-[720px] lg:min-h-[820px] xl:-mx-8">
        <div className="absolute inset-0">
          <Image alt={t(locale, companyProfile.companyName)} className="h-full w-full object-cover grayscale-[0.4]" fill sizes="100vw" src={factoryContent.hero.image} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        </div>
        <div className="relative flex min-h-[520px] items-center px-4 sm:px-6 md:min-h-[720px] lg:min-h-[820px] xl:px-8">
          <div className="max-w-4xl">
            <span className="inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">{t(locale, factoryContent.hero.eyebrow)}</span>
            <h1 className="mt-4 font-headline text-4xl font-extrabold tracking-tighter text-white sm:text-5xl lg:mt-6 lg:text-6xl xl:text-8xl">{t(locale, factoryContent.hero.title)}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-fixed-dim sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, factoryContent.hero.description)}</p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4 lg:mt-10">
              <Link className="rounded-full bg-secondary-container px-6 py-3.5 text-center text-sm font-bold text-on-secondary-container transition-all hover:scale-105 sm:px-8 sm:py-4 sm:text-base lg:text-lg" href={localizedPath(locale, 'contact')}>
                {locale === 'en' ? 'Schedule Virtual Tour' : '预约线上参观'}
              </Link>
              <Link className="rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-center text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/20 sm:px-8 sm:py-4 sm:text-base lg:text-lg" href={localizedPath(locale, 'compliance')}>
                {locale === 'en' ? 'View Certifications' : '查看资质'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-12">
          <div className="relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[2rem] bg-surface-container-low p-5 sm:min-h-[520px] sm:p-6 lg:min-h-[600px] lg:p-12 md:col-span-8">
            <div className="absolute right-0 top-0 p-5 sm:p-6 lg:p-12">
              <div className="h-12 w-12 rounded-full bg-primary/10 sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
            </div>
            <div className="relative z-10">
              <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-primary sm:text-4xl lg:text-5xl">{locale === 'en' ? 'Precision Engineering' : '精密制造能力'}</h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:mt-5 sm:text-lg lg:mt-6 lg:text-xl">
                {locale === 'en'
                  ? 'The factory page follows the stitch bento layout while replacing inflated prototype numbers with the business profile metrics currently available.'
                  : '工厂页延续 stitch 的 bento 桌面布局，同时把原型里虚构的数字替换为当前企业资料可确认的指标。'}
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-4 lg:mt-12">
              {factoryContent.metrics.map((item) => (
                <div key={t(locale, item.label)} className="rounded-2xl bg-surface-container-highest p-4 sm:p-5 lg:p-6">
                  <div className="mb-1 text-2xl font-bold tracking-tighter text-secondary sm:text-3xl">{t(locale, item.value)}</div>
                  <div className="font-label text-xs uppercase text-on-surface-variant">{t(locale, item.label)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 md:col-span-4">
            <div className="flex h-1/2 flex-col justify-between rounded-[2rem] bg-primary p-5 text-white sm:p-6 lg:p-10">
              <h3 className="font-headline text-2xl font-bold tracking-tight sm:text-3xl">{locale === 'en' ? 'Social Accountability' : '社会责任与客户信任'}</h3>
              <div className="space-y-4">
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="font-bold text-lg">{locale === 'en' ? 'Tax Rating A' : '税务评级 A'}</p>
                  <p className="text-sm text-white/60">{locale === 'en' ? 'Included in the preserved profile materials.' : '已列入保留企业资料。'}</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4">
                  <p className="font-bold text-lg">{locale === 'en' ? 'Enterprise Credit Files' : '企业信用资料'}</p>
                  <p className="text-sm text-white/60">{locale === 'en' ? 'Useful for customer qualification review.' : '适合客户准入与审核。'}</p>
                </div>
              </div>
            </div>
            <div className="relative h-1/2 overflow-hidden rounded-[2rem] bg-surface-container-highest">
              <Image alt={t(locale, companyProfile.companyName)} className="h-full w-full object-cover grayscale" fill sizes="(min-width: 768px) 30vw, 100vw" src="/placeholders/craftsmanship.svg" />
              <div className="absolute bottom-0 left-0 p-5 text-white sm:p-6 lg:p-8">
                <p className="font-headline text-xl font-bold sm:text-2xl">{locale === 'en' ? 'Artisan Integrity' : '工艺与执行完整性'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-surface-container-low py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="px-4 sm:px-6 md:px-10">
          <SectionHeading
            locale={locale}
            title={{en: 'Precision Testing Protocol', zh: '生产与工艺流程'}}
            description={{en: 'The original stitch factory strip becomes a process summary using the current manufacturing methods listed in the company profile.', zh: '把 stitch 工厂页的流程带转换为企业资料中的实际工艺流程展示。'}}
          />
          <div className="mt-8 flex gap-3 overflow-x-auto pb-4 sm:mt-10 sm:gap-4 lg:mt-16">
            {factoryContent.processes.map((item, index) => (
              <div key={t(locale, item.title)} className="min-w-[250px] flex-1 rounded-[2rem] bg-white p-5 shadow-panel transition-transform hover:-translate-y-2 sm:min-w-[280px] sm:p-6 lg:min-w-[300px] lg:p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-fixed text-2xl font-bold text-primary sm:h-14 sm:w-14 sm:text-3xl lg:h-16 lg:w-16">{index + 1}</div>
                <div className="mt-5 sm:mt-6 lg:mt-8">
                  <span className="font-label text-xs font-bold uppercase tracking-widest text-secondary">{locale === 'en' ? `Phase 0${index + 1}` : `阶段 0${index + 1}`}</span>
                  <h4 className="mt-2 font-headline text-xl font-bold text-primary sm:text-2xl">{t(locale, item.title)}</h4>
                  <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageLinks
        description={{en: 'From the factory page you can continue into compliance files, FAQ, or the quote intake page.', zh: '从工厂页可以继续进入资质、FAQ 和报价页面。'}}
        locale={locale}
        route="factory"
        title={{en: 'Where To Go After The Tour', zh: '参观之后建议查看'}}
      />
    </div>
  );
}
