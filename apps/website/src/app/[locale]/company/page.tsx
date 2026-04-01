import type {Metadata} from 'next';
import Image from 'next/image';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {companyContent, companyProfile, pageLabels, siteStats} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.company)} | ${t(locale, companyProfile.companyName)}`, t(locale, companyContent.hero.description), 'company');
}

export default async function CompanyPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="relative -mx-4 min-h-[520px] overflow-hidden sm:-mx-6 md:min-h-[720px] lg:min-h-[820px] xl:-mx-8">
        <div className="absolute inset-0">
          <Image alt={t(locale, companyProfile.companyName)} className="h-full w-full object-cover" fill sizes="100vw" src={companyContent.hero.image} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent" />
        </div>
        <div className="relative grid min-h-[520px] grid-cols-12 items-center gap-6 px-4 sm:px-6 md:min-h-[720px] md:gap-8 lg:min-h-[820px] xl:px-8">
          <div className="col-span-12 lg:col-span-7">
            <span className="inline-block rounded-full bg-secondary-container px-4 py-1 text-xs font-bold uppercase tracking-widest text-on-secondary-fixed">{t(locale, companyContent.hero.eyebrow)}</span>
            <h1 className="mt-4 font-headline text-4xl font-extrabold leading-tight tracking-tighter text-white sm:text-5xl lg:mt-6 lg:text-6xl xl:text-8xl">{t(locale, companyContent.hero.title)}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-fixed sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, companyContent.hero.description)}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:mt-8 sm:flex sm:flex-wrap sm:gap-12 lg:mt-10">
              {siteStats.slice(0, 3).map((item) => (
                <div key={t(locale, item.label)}>
                  <p className="font-headline text-2xl font-black text-secondary-fixed-dim sm:text-4xl">{t(locale, item.value)}</p>
                  <p className="text-xs text-white/70 sm:text-sm">{t(locale, item.label)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-3">
          <div className="relative overflow-hidden rounded-xl bg-primary-container p-5 sm:p-6 lg:p-12 md:col-span-2">
            <h2 className="font-headline text-3xl font-extrabold text-secondary-fixed-dim sm:text-4xl">{t(locale, companyContent.vision.title)}</h2>
            <p className="mt-4 max-w-xl text-lg leading-snug text-white sm:mt-5 sm:text-xl lg:mt-6 lg:text-2xl">{t(locale, companyContent.vision.text)}</p>
          </div>
          <div className="rounded-xl bg-surface-container-high p-5 sm:p-6 lg:p-12">
            <h3 className="font-headline text-2xl font-extrabold text-primary">{t(locale, companyContent.mission.title)}</h3>
            <p className="mt-4 leading-relaxed text-on-surface-variant">{t(locale, companyContent.mission.text)}</p>
          </div>
          <div className="rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-5 sm:p-6 lg:p-12">
            <h3 className="font-headline text-2xl font-extrabold text-primary">{locale === 'en' ? 'Core Values' : '核心价值'}</h3>
            <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
              {companyContent.values.map((item) => (
                <div key={t(locale, item.title)} className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-primary-fixed" />
                  <div>
                    <p className="font-bold text-primary">{t(locale, item.title)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-surface-container-low p-5 sm:p-6 lg:p-12 md:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12">
              {siteStats.map((item) => (
                <div key={t(locale, item.label)}>
                  <h4 className="flex items-center gap-2 font-headline text-xl font-extrabold text-primary">
                    <span className="material-dot" />
                    {t(locale, item.label)}
                  </h4>
                  <p className="mt-3 text-3xl font-black text-secondary sm:mt-4 sm:text-4xl">{t(locale, item.value)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 lg:py-20 lg:py-24">
        <div className="grid grid-cols-12 items-center gap-8 sm:gap-10 lg:gap-12">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeading
              locale={locale}
              title={{en: 'Where Concepts Become Physical Reality', zh: '从概念到量产的研发转化'}}
              description={{en: 'The current process definition in the company profile has been mapped into the desktop R&D layout from stitch.', zh: '将企业资料中的研发流程映射到 stitch 的桌面研发版式中。'}}
            />
            <div className="mt-6 space-y-4 sm:mt-8 sm:space-y-5 lg:mt-10 lg:space-y-6">
              {companyContent.rndSteps.map((item) => (
                <div key={t(locale, item.title)} className="rounded-xl border-l-4 border-secondary bg-white p-5 shadow-panel sm:p-6">
                  <h4 className="font-bold text-primary">{t(locale, item.title)}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-[2rem] shadow-panel md:col-span-2">
                <Image alt={t(locale, companyProfile.companyName)} className="aspect-[4/3] w-full object-cover" height={960} src="/placeholders/rd-lab.svg" width={1280} />
              </div>
              <div className="overflow-hidden rounded-[2rem] shadow-panel">
                <Image alt={t(locale, companyProfile.companyName)} className="aspect-square w-full object-cover" height={640} src="/placeholders/toy-learning.svg" width={640} />
              </div>
              <div className="overflow-hidden rounded-[2rem] shadow-panel">
                <Image alt={t(locale, companyProfile.companyName)} className="aspect-square w-full object-cover" height={640} src="/placeholders/craftsmanship.svg" width={640} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageLinks
        description={{en: 'Continue into development workflow, factory capability, and direct customer contact.', zh: '继续查看开发流程、工厂能力和直接联系入口。'}}
        locale={locale}
        route="company"
        title={{en: 'What To Open Next', zh: '下一步建议查看'}}
      />
    </div>
  );
}
