import type {Metadata} from 'next';

import {JsonLd} from '@/components/seo/json-ld';
import {EnterpriseHomepage} from '@/components/home/enterprise-homepage';
import {homepageContent} from '@/content/home-content';
import {createPageMetadata} from '@/lib/seo';
import {organizationJsonLd, websiteJsonLd} from '@/lib/structured-data';
import type {Locale} from '@/types/content';

interface HomePageProps {
  params: Promise<{locale: Locale}>;
}

export async function generateMetadata({params}: HomePageProps): Promise<Metadata> {
  const {locale} = await params;
  const content = homepageContent[locale];

  return createPageMetadata({
    locale,
    path: '/',
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;

  return (
    <>
      <JsonLd data={[organizationJsonLd(locale), websiteJsonLd(locale)]} />
      <EnterpriseHomepage locale={locale} />
    </>
  );
}
