import type {Metadata} from 'next';
import Image from 'next/image';

import {PageLinks} from '@/components/page-links';
import {SectionHeading} from '@/components/section-heading';
import {companyProfile, complianceContent, pageLabels} from '@/data/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(locale, `${t(locale, pageLabels.compliance)} | ${t(locale, companyProfile.companyName)}`, t(locale, complianceContent.hero.description), 'compliance');
}

export default async function CompliancePage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <section className="py-12 sm:py-14 md:py-24">
        <div className="grid grid-cols-12 items-end gap-4 sm:gap-6">
          <div className="col-span-12 lg:col-span-7">
            <span className="block font-label text-xs font-bold uppercase tracking-[0.18em] text-secondary sm:text-sm sm:tracking-[0.2em]">{t(locale, complianceContent.hero.eyebrow)}</span>
            <h1 className="mt-3 font-headline text-4xl font-extrabold leading-[0.95] tracking-tighter text-primary sm:text-5xl md:mt-4 md:text-7xl lg:text-8xl">{t(locale, complianceContent.hero.title)}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-surface-variant sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">{t(locale, complianceContent.hero.description)}</p>
          </div>
          <div className="relative col-span-12 hidden lg:col-span-5 lg:block">
            <div className="relative aspect-square rotate-3 overflow-hidden rounded-xl bg-primary-container transition-transform duration-500 hover:rotate-0">
              <Image alt={t(locale, companyProfile.companyName)} className="h-full w-full object-cover opacity-80 mix-blend-overlay" fill sizes="40vw" src={complianceContent.hero.image} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-panel rounded-xl border border-white/20 p-8 shadow-2xl">
                  <div className="h-12 w-12 rounded-full bg-primary" />
                  <p className="mt-4 font-label text-lg font-bold uppercase tracking-wider text-primary">{locale === 'en' ? 'Zero-Risk Protocol' : '风险资料预备'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-surface-container-low py-12 sm:py-14 lg:py-20">
        <div className="px-4 sm:px-6 md:px-10">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{locale === 'en' ? 'Active Documents & Certificates' : '可提供资料与证书'}</h2>
              <p className="mt-2 text-sm leading-relaxed text-on-surface-variant sm:text-base">{locale === 'en' ? 'Verified materials for buyer onboarding, due diligence, and market review.' : '适用于客户准入、尽调与市场审核的资料集合。'}</p>
            </div>
            <span className="font-label text-xs font-semibold uppercase tracking-widest italic text-outline">{locale === 'en' ? 'Updated from preserved profile' : '基于保留企业资料整理'}</span>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {complianceContent.certificates.map((item, index) => (
              <div key={t(locale, item.title)} className="flex h-full flex-col justify-between rounded-xl border-b-4 border-primary bg-surface-container-lowest p-5 shadow-panel sm:p-6 lg:p-8">
                <div>
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg sm:mb-5 sm:h-14 sm:w-14 lg:mb-6 lg:h-16 lg:w-16 ${index % 2 === 0 ? 'bg-primary-fixed' : 'bg-secondary-fixed'}`}>
                    <div className="h-6 w-6 rounded-full bg-primary sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary sm:text-2xl">{t(locale, item.title)}</h3>
                  <p className="mt-4 leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-14 rounded-[2rem] bg-primary py-12 text-white sm:mt-16 sm:py-14 lg:mt-20 lg:py-24">
        <div className="grid gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <div>
            <SectionHeading
              invert
              locale={locale}
              title={{en: 'Global Shipping & Trade Expertise', zh: '全球发货与贸易沟通支持'}}
              description={{en: 'This block keeps the visual weight of the stitch compliance logistics section, but the messaging is aligned to Yaoshun’s quote and buyer review process.', zh: '保留 stitch 合规页中物流区块的视觉重量，同时将内容调整为尧顺当前的报价与客户审核路径。'}}
            />
          </div>
          <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
            <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur sm:p-6 lg:p-8">
              <h4 className="font-bold">{locale === 'en' ? 'Document Readiness' : '资料准备'}</h4>
              <p className="mt-3 text-sm text-white/70">{locale === 'en' ? 'Business credentials, credit files, annual reports, and tax rating support.' : '工商资质、信用资料、年报与税务评级支持。'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur sm:p-6 lg:p-8">
              <h4 className="font-bold">{locale === 'en' ? 'Testing Pathways' : '测试路径'}</h4>
              <p className="mt-3 text-sm text-white/70">{locale === 'en' ? 'EN71, ASTM, ISO 9000, and CE-related file organization.' : '围绕 EN71、ASTM、ISO 9000 与 CE 的资料组织。'}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/10 p-5 backdrop-blur sm:p-6 lg:p-8">
              <h4 className="font-bold">{locale === 'en' ? 'Buyer Review Support' : '客户审核支持'}</h4>
              <p className="mt-3 text-sm text-white/70">{locale === 'en' ? 'Useful for procurement onboarding and repeated compliance submissions.' : '适合采购准入与持续合规留档。'}</p>
            </div>
          </div>
        </div>
      </section>

      <PageLinks
        description={{en: 'Continue into FAQ, direct inquiry, or privacy handling for form data.', zh: '继续查看 FAQ、提交询盘，或了解表单数据的隐私处理方式。'}}
        locale={locale}
        route="compliance"
        title={{en: 'Next Compliance-Adjacent Pages', zh: '接下来建议查看'}}
      />
    </div>
  );
}
