import type {MetadataRoute} from 'next';

import {products} from '@/content/site-content';
import {locales} from '@/i18n/config';
import {absoluteUrl, localePath} from '@/lib/seo';

export const dynamic = 'force-static';

const pageSlugs = ['', 'company', 'products', 'certifications', 'rnd', 'success-stories', 'faq', 'contact', 'privacy'];

function url(path: string): string {
  return absoluteUrl(path);
}

function localizedAlternates(path: string): Record<string, string> {
  return Object.fromEntries(locales.map((locale) => [locale, url(localePath(locale, path))]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const slug of pageSlugs) {
    const pagePath = slug ? `/${slug}` : '/';
    const alternates = localizedAlternates(pagePath);

    for (const locale of locales) {
      const localizedPath = localePath(locale, pagePath);

      entries.push({
        url: url(localizedPath),
        lastModified: now,
        alternates: {
          languages: alternates
        }
      });
    }
  }

  for (const product of products) {
    const productPath = `/products/${product.slug}`;
    const alternates = localizedAlternates(productPath);

    for (const locale of locales) {
      const localizedPath = localePath(locale, productPath);

      entries.push({
        url: url(localizedPath),
        lastModified: now,
        alternates: {
          languages: alternates
        }
      });
    }
  }

  return entries;
}
