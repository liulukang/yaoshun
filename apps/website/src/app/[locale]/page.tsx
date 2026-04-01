import type {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {companyProfile, homeContent, pageLabels, siteStats} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';
import {localizedPath} from '@/lib/routes';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, companyProfile.companyName)} | ${t(locale, pageLabels.home)}`, t(locale, homeContent.hero.description), '');
}

export default async function HomePage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell overflow-hidden px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="grid grid-cols-1 items-center gap-8 pt-6 sm:gap-10 sm:pt-8 md:pt-12 lg:min-h-[920px] lg:grid-cols-12 lg:gap-12">
        <div className="z-10 lg:col-span-6">
          <span className="block font-label text-[11px] font-bold uppercase tracking-[0.18em] text-secondary sm:text-xs">{t(locale, homeContent.hero.eyebrow)}</span>
          <h1 className="hero-title mt-4 font-headline text-3xl font-extrabold leading-[1.02] tracking-tighter text-primary sm:mt-5 sm:text-5xl lg:mt-6 lg:text-6xl xl:text-7xl">
            {t(locale, homeContent.hero.title)}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-on-surface-variant sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, homeContent.hero.description)}</p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
            <Link className="inline-block w-full rounded-full bg-secondary px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-base sm:px-10" href={localizedPath(locale, 'factory')}>
              {t(locale, homeContent.hero.primary)}
            </Link>
            <Link className="inline-block w-full rounded-full border border-outline-variant bg-surface-container-highest px-6 py-3.5 text-center text-sm font-bold text-primary transition-all hover:bg-surface-container-high sm:w-auto sm:px-8 sm:py-4 sm:text-base sm:px-10" href={localizedPath(locale, 'products')}>
              {t(locale, homeContent.hero.secondary)}
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 xl:grid-cols-4">
            {siteStats.map((item) => (
              <div key={t(locale, item.label)} className="rounded-2xl border border-outline-variant/20 bg-white/70 p-4 shadow-panel backdrop-blur sm:p-5">
                <p className="font-headline text-xl font-black text-primary sm:text-3xl">{t(locale, item.value)}</p>
                <p className="mt-2 text-xs text-on-surface-variant sm:text-sm">{t(locale, item.label)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative mx-auto aspect-square w-full max-w-[42rem]">
            <div className="absolute right-0 top-0 h-4/5 w-4/5 overflow-hidden rounded-[2rem] bg-primary-container -rotate-3">
              <Image alt={t(locale, companyProfile.companyName)} className="h-full w-full object-cover opacity-80 mix-blend-overlay" fill sizes="(min-width: 1024px) 42vw, 100vw" src={homeContent.hero.collage[0]} />
            </div>
            <div className="absolute bottom-4 left-0 z-20 h-3/4 w-3/4 rotate-6 overflow-hidden rounded-[2rem] bg-white p-4 shadow-[0_28px_64px_rgba(0,17,58,0.18)]">
              <Image alt={t(locale, homeContent.categories[0].title)} className="h-full w-full rounded-[1.5rem] object-cover" fill sizes="(min-width: 1024px) 32vw, 100vw" src={homeContent.hero.collage[1]} />
            </div>
            <div className="absolute bottom-0 right-0 z-30 w-40 rounded-[1.5rem] bg-white/88 p-4 shadow-float backdrop-blur sm:w-56 sm:p-5">
              <Image alt={t(locale, homeContent.categories[2].title)} className="h-32 w-full rounded-xl object-cover" height={128} src={homeContent.hero.collage[2]} width={208} />
              <p className="mt-4 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">{locale === 'en' ? 'Factory Snapshot' : '工厂快照'}</p>
              <p className="mt-2 font-headline text-lg font-extrabold text-primary">{t(locale, companyProfile.brandShort)}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading locale={locale} description={{en: 'Desktop layout restored from stitch with content replaced by current business scope.', zh: '按 stitch 的桌面版结构重建，并替换为当前企业业务内容。'}} title={{en: 'Our Categories', zh: '业务方向'}} />
          <Link className="font-bold text-primary transition-all hover:translate-x-1" href={localizedPath(locale, 'products')}>
            {locale === 'en' ? 'View Full Catalog ->' : '查看完整目录 ->'}
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 md:grid-cols-12 md:[grid-auto-rows:minmax(12rem,auto)] md:gap-8">
          <Link className="group relative overflow-hidden rounded-[2rem] bg-white shadow-panel md:col-span-7" href={localizedPath(locale, 'products')}>
            <Image alt={t(locale, homeContent.categories[0].title)} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" fill sizes="(min-width: 768px) 55vw, 100vw" src={homeContent.categories[0].image} />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
            <div className="relative flex min-h-[16rem] flex-col justify-end p-5 sm:min-h-[20rem] sm:p-8 lg:min-h-[26rem] lg:p-10">
              <h3 className="font-headline text-2xl font-bold text-white sm:text-3xl">{t(locale, homeContent.categories[0].title)}</h3>
              <p className="mt-2 max-w-sm text-sm text-white/80 sm:mt-3 sm:text-base">{t(locale, homeContent.categories[0].description)}</p>
            </div>
          </Link>

          <Link className="group relative overflow-hidden rounded-[2rem] bg-primary-container shadow-panel md:col-span-5" href={localizedPath(locale, 'products')}>
            <Image alt={t(locale, homeContent.categories[1].title)} className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" fill sizes="(min-width: 768px) 35vw, 100vw" src={homeContent.categories[1].image} />
            <div className="absolute inset-0 bg-secondary/20 mix-blend-overlay" />
            <div className="relative flex min-h-[16rem] flex-col justify-end p-5 sm:min-h-[20rem] sm:p-8 lg:min-h-[26rem] lg:p-10">
              <h3 className="font-headline text-2xl font-bold text-white sm:text-3xl">{t(locale, homeContent.categories[1].title)}</h3>
              <p className="mt-2 max-w-sm text-sm text-white/80 sm:mt-3 sm:text-base">{t(locale, homeContent.categories[1].description)}</p>
            </div>
          </Link>

          <Link className="group relative flex items-center justify-between overflow-hidden rounded-[2rem] bg-secondary-fixed px-5 py-6 shadow-panel sm:px-8 sm:py-8 md:col-span-12 md:px-12 md:py-10" href={localizedPath(locale, 'oemOdm')}>
            <div className="z-10">
              <h3 className="font-headline text-2xl font-bold text-on-secondary-fixed sm:text-3xl">{t(locale, homeContent.categories[2].title)}</h3>
              <p className="mt-2 max-w-3xl text-sm text-on-secondary-fixed-variant sm:mt-3 sm:text-base">{t(locale, homeContent.categories[2].description)}</p>
            </div>
            <div className="absolute right-0 top-0 h-full w-1/3 translate-x-12 skew-x-12 bg-white/20 transition-transform group-hover:translate-x-6" />
            <div className="material-dot z-10" />
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_32px_70px_rgba(0,17,58,0.14)]">
              <Image alt={t(locale, companyProfile.companyName)} className="aspect-video w-full object-cover" height={720} src={homeContent.hero.collage[2]} width={1080} />
            </div>
            <div className="absolute -bottom-6 right-0 rounded-[1.5rem] bg-white p-4 shadow-float sm:-bottom-10 sm:-right-4 sm:p-8">
              <div className="grid grid-cols-2 gap-4 sm:gap-8">
                <div>
                  <div className="text-2xl font-black text-secondary sm:text-4xl">50+</div>
                  <div className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{locale === 'en' ? 'Team Scale' : '团队规模'}</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-primary sm:text-4xl">10d</div>
                  <div className="font-label text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{locale === 'en' ? 'Procurement' : '采购周期'}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading locale={locale} description={homeContent.excellence.description} title={homeContent.excellence.title} />
            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10 lg:space-y-6">
              {homeContent.excellence.points.map((item) => (
                <div key={t(locale, item.title)} className="flex items-start gap-4 rounded-[1.5rem] bg-white p-5 shadow-panel sm:p-6">
                  <div className="mt-1 h-12 w-12 shrink-0 rounded-full bg-primary-fixed" />
                  <div>
                    <h4 className="font-bold text-primary">{t(locale, item.title)}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] bg-primary py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="absolute right-0 top-0 h-full w-1/2 translate-x-40 -skew-x-[20deg] bg-white/5" />
        <div className="relative z-10 px-4 sm:px-6 md:px-12">
          <SectionHeading
            align="center"
            description={{en: 'Desktop card rhythm mirrors the stitch compliance block while using the current document set and testing pathways.', zh: '保留 stitch 的桌面卡片节奏，同时替换为当前企业资质与测试路径。'}}
            invert
            locale={locale}
            title={{en: 'The Compliance Trust Stack', zh: '合规与资质能力栈'}}
          />
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 lg:mt-16 lg:gap-8 md:grid-cols-2 xl:grid-cols-4">
            {homeContent.compliance.map((item) => (
              <div key={t(locale, item.title)} className="cursor-pointer rounded-[1.5rem] border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-all hover:bg-white/20 sm:p-6 lg:p-8">
                <div className="mb-4 h-8 w-8 rounded-full bg-tertiary-fixed" />
                <h3 className="text-xl font-bold text-white">{t(locale, item.title)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{t(locale, item.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <SectionHeading
          align="center"
          locale={locale}
          title={{en: 'Project Delivery Notes', zh: '项目交付案例'}}
          description={{en: 'Case lines reused from the preserved company profile document.', zh: '案例内容来自保留的网站企业资料文档。'}}
        />
        <div className="mt-8 grid gap-6 sm:mt-10 sm:gap-8 lg:mt-16 lg:gap-10 md:grid-cols-3">
          {homeContent.cases.map((item) => (
            <article key={t(locale, item.title)} className="relative rounded-[1.5rem] bg-white p-6 shadow-panel sm:p-8 lg:p-10">
              <div className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-white sm:-top-5 sm:left-10 sm:h-10 sm:w-10">"</div>
              <h3 className="font-headline text-2xl font-bold text-primary">{t(locale, item.title)}</h3>
              <p className="mt-4 font-label text-xs font-bold uppercase tracking-[0.18em] text-secondary">{t(locale, item.result)}</p>
              <p className="mt-4 leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <PageLinks
        description={{en: 'Move from the overview into the product range, factory context, and direct quoting flow.', zh: '从首页继续进入产品、工厂和报价流程。'}}
        locale={locale}
        route="home"
        title={{en: 'Explore The Rest Of The Site', zh: '继续浏览完整站点'}}
      />
    </div>
  );
}
