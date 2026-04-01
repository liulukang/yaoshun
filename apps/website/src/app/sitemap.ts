import type {MetadataRoute} from 'next';

import {products} from '@/data/site';
import {locales} from '@/lib/i18n';
import {routePathMap} from '@/lib/routes';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

function withBase(path: string): string {
  return `${baseUrl}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = Object.values(routePathMap);
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: withBase(`/${locale}${route}`),
        lastModified: now
      });
    }

    for (const product of products) {
      entries.push({
        url: withBase(`/${locale}/products/${product.slug}`),
        lastModified: now
      });
    }
  }

  return entries;
}
