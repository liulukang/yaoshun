import type {MetadataRoute} from 'next';

import {absoluteUrl} from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
const basePath = rawBasePath ? (rawBasePath.startsWith('/') ? rawBasePath : `/${rawBasePath}`) : '';
const sitemapPath = `${basePath || ''}/sitemap.xml`;
const host = (() => {
  try {
    return new URL(siteUrl).origin;
  } catch {
    return 'https://example.com';
  }
})();

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: `${basePath || '/'}`,
        disallow: ['/api/']
      }
    ],
    sitemap: absoluteUrl(sitemapPath),
    host
  };
}
