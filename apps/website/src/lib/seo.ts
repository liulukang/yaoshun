import type {Metadata} from 'next';

import {siteName} from '@/content/home-content';
import type {Locale} from '@/types/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

export function localePath(locale: Locale, path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') {
    return locale === 'en' ? '/en/' : '/zh/';
  }

  return locale === 'en' ? `/en${normalized}` : `/zh${normalized}`;
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

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: localizedPath,
      languages: {
        en: localePath('en', path),
        zh: localePath('zh', path)
      }
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizedPath),
      siteName,
      locale: locale === 'en' ? 'en_US' : 'zh_CN',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}
