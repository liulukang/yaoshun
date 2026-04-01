import type {Metadata} from 'next';

import {companyPageCopy} from '@/content/page-copy';
import {companyProfile, enterpriseTrust, factoryArchive, factoryShowroomIntro, getSiteName, productionProfile, seoKeywords} from '@/content/site-content';
import {getLocalizedText, getLocalizedValue} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface CompanyPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: CompanyPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const copy = getLocalizedValue(companyPageCopy, locale);
  const title = `${brandName} | ${copy.metadataTitle}`;
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
  const copy = getLocalizedValue(companyPageCopy, locale);
  const trustItems = getLocalizedValue(enterpriseTrust.items, locale);
  const processItems = getLocalizedValue(productionProfile.specialProcesses, locale);
  const productionStaff = getLocalizedValue(productionProfile.staffRange, locale);
  const monthlyOutputValue = getLocalizedValue(productionProfile.monthlyOutputValue, locale);
  const rawMaterialLeadTime = getLocalizedValue(productionProfile.rawMaterialLeadTime, locale);
  const exportOrderSupport = getLocalizedValue(factoryArchive.exportOrderSupport, locale);
  const processingMethods = getLocalizedValue(factoryArchive.processingMethods, locale);
  const vatInvoice = getLocalizedValue(factoryArchive.vatInvoice, locale);

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{copy.heroTitle}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">{getLocalizedText(companyProfile.summary, locale)}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="info-card info-card-peach">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.established}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{companyProfile.establishedYear}</p>
          </article>
          <article className="info-card info-card-sky">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.annualTurnover}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{factoryArchive.annualTurnover}</p>
          </article>
          <article className="info-card info-card-mint">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.productionStaff}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{productionStaff}</p>
          </article>
          <article className="info-card info-card-violet">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b819d]">{copy.monthlyOutputValue}</p>
            <p className="mt-2 font-heading text-2xl text-[#1d2340]">{monthlyOutputValue}</p>
          </article>
        </div>
      </div>

      <div className="mt-8 panel-card">
        <h2 className="font-heading text-2xl text-[#1d2340]">{copy.factoryShowroom}</h2>
        <p className="mt-4 text-sm leading-7 text-[#5c6384]">{getLocalizedText(factoryShowroomIntro, locale)}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.factoryArchive}</h2>
          <div className="mt-5 space-y-3">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.archiveEstablishedDate}: {factoryArchive.establishedDate}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.archiveAnnualTurnover}: {factoryArchive.annualTurnover}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.archiveTotalEmployees}: {factoryArchive.employeeRange}</p>
            </div>
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.cooperationModel}</h2>
          <div className="mt-5 space-y-3">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.customMoq}: {factoryArchive.customMoq}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.privateLabelMoq}: {factoryArchive.oemMoq}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.exportOrders}: {exportOrderSupport}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.processingMethods}: {processingMethods.join(' / ')}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.invoiceTaxRate}: {factoryArchive.invoiceTaxPoint}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.vatInvoice}: {vatInvoice}</p>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.enterpriseTrust}</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item.label} className="glass-list-item">
                <p className="text-sm leading-7 text-[#5c6384]">{item.label}：{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.productionCapacity}</h2>
          <div className="mt-5 space-y-3">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.productionStaff}: {productionStaff}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.monthlyOutputValue}: {monthlyOutputValue}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.rawMaterialLeadTime}: {rawMaterialLeadTime}</p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">{copy.specialProcesses}: {processItems.join(' / ')}</p>
            </div>
          </div>
        </article>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.missionVision}</h2>
          <div className="mt-5 space-y-4">
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">{copy.missionLabel}: </span>
                {getLocalizedText(companyProfile.mission, locale)}
              </p>
            </div>
            <div className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                <span className="font-semibold text-[#1d2340]">{copy.visionLabel}: </span>
                {getLocalizedText(companyProfile.vision, locale)}
              </p>
            </div>
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.coreStrengths}</h2>
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
