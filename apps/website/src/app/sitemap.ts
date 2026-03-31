import type {MetadataRoute} from 'next';

import {products} from '@/content/site-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';
export const dynamic = 'force-static';

const staticPaths = ['/', '/company', '/products', '/certifications', '/rnd', '/success-stories', '/faq', '/contact', '/privacy'];

function url(path: string): string {
  return new URL(path, siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push({
      url: url(path),
      lastModified: now,
      alternates: {
        languages: {
          en: url(path),
          zh: url(path === '/' ? '/zh' : `/zh${path}`)
        }
      }
    });
  }

  for (const product of products) {
    const productPath = `/products/${product.slug}`;
    entries.push({
      url: url(productPath),
      lastModified: now,
      alternates: {
        languages: {
          en: url(productPath),
          zh: url(`/zh${productPath}`)
        }
      }
    });
  }

  return entries;
}
