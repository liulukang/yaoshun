import type {Metadata} from 'next';

import {locales, type Locale} from '@/lib/i18n';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export function buildMetadata(locale: Locale, title: string, description: string, path: string): Metadata {
  const normalizedPath = path ? `/${path.replace(/^\/+/, '')}` : '';

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}${normalizedPath}`,
      languages: Object.fromEntries(locales.map((item) => [item, `${baseUrl}/${item}${normalizedPath}`]))
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}${normalizedPath}`,
      locale,
      type: 'website'
    }
  };
}
