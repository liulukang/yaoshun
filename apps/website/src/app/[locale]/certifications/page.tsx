import type {Metadata} from 'next';

import {certificationsPageCopy} from '@/content/page-copy';
import {certifications, enterpriseTrust, factoryArchive, getSiteName, productionProfile, seoKeywords} from '@/content/site-content';
import {getLocalizedText, getLocalizedValue} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface CertificationsPageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: CertificationsPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);
  const copy = getLocalizedValue(certificationsPageCopy, locale);
  const title = `${brandName} | ${copy.metadataTitle}`;
  const description = copy.metadataDescription;

  return createPageMetadata({
    locale,
    path: '/certifications',
    title,
    description,
    keywords: seoKeywords
  });
}

export default async function CertificationsPage({params}: CertificationsPageProps) {
  const {locale} = await params;
  const copy = getLocalizedValue(certificationsPageCopy, locale);
  const trustItems = getLocalizedValue(enterpriseTrust.items, locale);
  const processingMethods = getLocalizedValue(factoryArchive.processingMethods, locale);
  const productionStaff = getLocalizedValue(productionProfile.staffRange, locale);
  const monthlyOutputValue = getLocalizedValue(productionProfile.monthlyOutputValue, locale);
  const readyItems = certifications.filter((item) => item.status === 'available');
  const cooperationSupport = [
    `${copy.customMoq}: ${factoryArchive.customMoq}`,
    `${copy.privateLabelMoq}: ${factoryArchive.oemMoq}`,
    `${copy.processingMethods}: ${processingMethods.join(' / ')}`,
    `${copy.productionStaff}: ${productionStaff}`,
    `${copy.monthlyOutputValue}: ${monthlyOutputValue}`,
    `${copy.invoiceTaxRate}: ${factoryArchive.invoiceTaxPoint}`
  ];

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">{copy.eyebrow}</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{copy.title}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">{copy.description}</p>
      </div>

      <div className="mt-8 panel-card">
        <h2 className="font-heading text-2xl text-[#1d2340]">{copy.enterpriseTrust}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustItems.map((item) => (
            <div key={item.label} className="glass-list-item">
              <p className="text-sm leading-7 text-[#5c6384]">
                {item.label}：{item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.availableDocuments}</h2>
          <div className="mt-5 space-y-3">
            {readyItems.map((item) => (
              <div key={item.id} className="glass-list-item">
                <div className="flex-1">
                  <p className="font-heading text-lg text-[#1d2340]">{item.name}</p>
                  <p className="mt-1 text-sm leading-7 text-[#5c6384]">{getLocalizedText(item.description, locale)}</p>
                </div>
                <span className="rounded-full bg-[#e8fff7] px-3 py-1 text-xs font-semibold text-[#0f9f7a]">{copy.availableStatus}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel-card">
          <h2 className="font-heading text-2xl text-[#1d2340]">{copy.cooperationSupport}</h2>
          <div className="mt-5 space-y-3">
            {cooperationSupport.map((item) => (
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
