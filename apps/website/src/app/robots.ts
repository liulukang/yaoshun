import type {MetadataRoute} from 'next';

import {absoluteUrl, fallbackSiteUrl} from '@/lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl;
const host = (() => {
  try {
    return new URL(siteUrl).origin;
  } catch {
    return fallbackSiteUrl;
  }
})();

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/']
      }
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host
  };
}
