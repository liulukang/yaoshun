import type {Metadata} from 'next';

import {siteName} from '@/content/home-content';
import {getLocalizedPath, locales, openGraphLocales} from '@/i18n/config';
import type {Locale} from '@/types/content';

export const fallbackSiteUrl = 'https://www.19931015.xyz';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;

export function localePath(locale: Locale, path = ''): string {
  return getLocalizedPath(locale, path);
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

interface LocalizedMetaInput {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
}

export function createPageMetadata({
  locale,
  path,
  title,
  description,
  keywords = []
}: LocalizedMetaInput): Metadata {
  const localizedPath = localePath(locale, path);
  const languageAlternates = Object.fromEntries(locales.map((localeKey) => [localeKey, localePath(localeKey, path)]));

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: localizedPath,
      languages: languageAlternates
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath),
      siteName,
      locale: openGraphLocales[locale],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
