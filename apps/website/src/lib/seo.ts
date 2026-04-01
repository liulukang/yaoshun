import type {Metadata} from 'next';

import {siteName} from '@/content/home-content';
import type {Locale} from '@/types/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
const basePath = rawBasePath ? (rawBasePath.startsWith('/') ? rawBasePath : `/${rawBasePath}`) : '';

function withBasePath(path: string): string {
  if (!basePath) {
    return path;
  }

  if (path === '/') {
    return `${basePath}/`;
  }

  return `${basePath}${path}`;
}

export function localePath(locale: Locale, path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const localizedRoot = locale === 'en' ? '/en/' : '/zh/';

  if (normalized === '/') {
    return withBasePath(localizedRoot);
  }

  const localizedPath = locale === 'en' ? `/en${normalized}` : `/zh${normalized}`;
  return withBasePath(localizedPath);
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
