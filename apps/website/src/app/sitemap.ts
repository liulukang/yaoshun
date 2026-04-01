import type {MetadataRoute} from 'next';

import {products} from '@/content/site-content';
import {absoluteUrl, localePath} from '@/lib/seo';

export const dynamic = 'force-static';

const pageSlugs = ['', 'company', 'products', 'certifications', 'rnd', 'success-stories', 'faq', 'contact', 'privacy'];
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? '';
const basePath = rawBasePath ? (rawBasePath.startsWith('/') ? rawBasePath : `/${rawBasePath}`) : '';

function url(path: string): string {
  return absoluteUrl(path);
}

function rootPath(): string {
  return basePath ? `${basePath}/` : '/';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: url(rootPath()),
    lastModified: now,
    alternates: {
      languages: {
        en: url(localePath('en', '/')),
        zh: url(localePath('zh', '/'))
      }
    }
  });

  for (const slug of pageSlugs) {
    const enPath = localePath('en', slug ? `/${slug}` : '/');
    const zhPath = localePath('zh', slug ? `/${slug}` : '/');

    entries.push({
      url: url(enPath),
      lastModified: now,
      alternates: {
        languages: {
          en: url(enPath),
          zh: url(zhPath)
        }
      }
    });

    entries.push({
      url: url(zhPath),
      lastModified: now,
      alternates: {
        languages: {
          en: url(enPath),
          zh: url(zhPath)
        }
      }
    });
  }

  for (const product of products) {
    const enProductPath = localePath('en', `/products/${product.slug}`);
    const zhProductPath = localePath('zh', `/products/${product.slug}`);

    entries.push({
      url: url(enProductPath),
      lastModified: now,
      alternates: {
        languages: {
          en: url(enProductPath),
          zh: url(zhProductPath)
        }
      }
    });

    entries.push({
      url: url(zhProductPath),
      lastModified: now,
      alternates: {
        languages: {
          en: url(enProductPath),
          zh: url(zhProductPath)
        }
      }
    });
  }

  return entries;
}
