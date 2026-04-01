import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {companyProfile, oemOdmContent, pageLabels} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.oemOdm)} | ${t(locale, companyProfile.companyName)}`, t(locale, oemOdmContent.hero.description), 'oem-odm');
}

export default async function OemOdmPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="relative -mx-4 min-h-[520px] overflow-hidden bg-primary-container py-12 sm:-mx-6 sm:py-14 md:min-h-[720px] lg:min-h-[820px] lg:py-24 xl:-mx-8">
        <div className="absolute inset-0 opacity-20">
          <Image alt={t(locale, companyProfile.companyName)} className="h-full w-full object-cover" fill sizes="100vw" src={oemOdmContent.hero.image} />
        </div>
        <div className="relative z-10 grid grid-cols-1 items-center gap-8 px-4 sm:gap-10 sm:px-6 xl:px-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="inline-block rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">{t(locale, oemOdmContent.hero.eyebrow)}</span>
            <h1 className="mt-4 font-headline text-4xl font-black leading-[1.05] tracking-tighter text-white sm:text-5xl lg:mt-6 lg:text-6xl xl:text-7xl">{t(locale, oemOdmContent.hero.title)}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-fixed-dim sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, oemOdmContent.hero.description)}</p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-4 lg:mt-10">
              <Link className="rounded-full bg-secondary px-6 py-3.5 text-center text-sm font-bold text-white transition-all hover:opacity-90 sm:px-8 sm:py-4 sm:text-base lg:text-lg" href={localizedPath(locale, 'contact')}>
                {locale === 'en' ? 'Start Your Project' : '启动项目'}
              </Link>
              <Link className="rounded-full border border-white/10 bg-white/10 px-6 py-3.5 text-center text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:px-8 sm:py-4 sm:text-base lg:text-lg" href={localizedPath(locale, 'company')}>
                {locale === 'en' ? 'Review Company Profile' : '查看公司资料'}
              </Link>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative">
              <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-secondary-container opacity-20 blur-3xl" />
              <div className="relative overflow-hidden rounded-xl shadow-[0_30px_80px_rgba(0,17,58,0.18)] rotate-3">
                <Image alt={t(locale, companyProfile.companyName)} className="aspect-[4/5] w-full object-cover" height={1200} src={oemOdmContent.hero.image} width={960} />
                <div className="glass-panel absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 p-6">
                  <p className="font-bold text-primary">{locale === 'en' ? 'Process-led manufacturing' : '流程驱动型制造'}</p>
                  <p className="mt-2 text-sm text-on-surface-variant">{locale === 'en' ? 'From requirement review to shipping handoff.' : '从需求确认到出货衔接。'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <SectionHeading
          locale={locale}
          title={{en: 'The Yaoshun Lifecycle', zh: '尧顺项目生命周期'}}
          description={{en: 'The desktop process bar follows the stitch OEM / ODM page, with steps replaced by the preserved company workflow.', zh: '沿用 stitch 的 OEM / ODM 桌面流程条，并替换为企业资料中的实际协作步骤。'}}
        />
        <div className="relative mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:mt-16 md:grid-cols-5">
          <div className="absolute left-0 top-12 hidden h-1 w-full bg-surface-container-highest md:block" />
          {oemOdmContent.lifecycle.map((item, index) => (
            <div key={t(locale, item.title)} className="relative z-10 rounded-xl border-b-4 border-primary bg-surface-container-lowest p-5 shadow-panel sm:p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-white sm:mb-6 sm:h-12 sm:w-12 sm:text-xl">{index + 1}</div>
              <h3 className="text-xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-12">
          <div className="overflow-hidden rounded-[2rem] bg-surface-container-lowest md:col-span-8">
            <div className="relative h-[20rem] sm:h-[24rem]">
              <Image alt={t(locale, companyProfile.companyName)} className="h-full w-full object-cover" fill sizes="(min-width: 768px) 66vw, 100vw" src="/placeholders/project-engineering.svg" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8 lg:bottom-12 lg:left-12 lg:right-12">
                <h3 className="font-headline text-2xl font-black text-white sm:text-3xl lg:text-4xl">{locale === 'en' ? 'Precision Mold & Project Engineering' : '精密模具与项目工程协同'}</h3>
                <p className="mt-3 max-w-xl text-sm text-primary-fixed-dim sm:text-base lg:mt-4 lg:text-lg">
                  {locale === 'en'
                    ? 'Use Yaoshun for cooperative design review, tooling discussion, profile support, and production matching under one communication chain.'
                    : '把设计评估、模具讨论、型材支持和生产匹配放在同一条沟通链路中执行。'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 md:col-span-4">
            {oemOdmContent.modes.map((item) => (
              <div key={t(locale, item.title)} className="rounded-[1.5rem] bg-surface-container-highest p-5 shadow-panel sm:p-6 lg:p-8">
                <h4 className="font-headline text-xl font-bold text-primary sm:text-2xl">{t(locale, item.title)}</h4>
                <p className="mt-4 leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageLinks
        description={{en: 'Continue into product lines, compliance preparation, and the quote intake page.', zh: '继续查看产品线、资质准备和报价入口。'}}
        locale={locale}
        route="oemOdm"
        title={{en: 'Open The Next Steps', zh: '继续打开下一步'}}
      />
    </div>
  );
}
