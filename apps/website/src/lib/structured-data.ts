import {faqItems, siteName} from '@/content/site-content';
import {getLocalizedText} from '@/lib/locale';
import {absoluteUrl, localePath} from '@/lib/seo';
import type {ProductSpec} from '@/types/content';
import type {Locale} from '@/types/content';

export function organizationJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: absoluteUrl(localePath(locale, '/')),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        availableLanguage: ['en', 'zh']
      }
    ]
  };
}

export function websiteJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: absoluteUrl(localePath(locale, '/')),
    inLanguage: locale
  };
}

export function faqJsonLd(locale: Locale): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: getLocalizedText(item.question, locale),
      acceptedAnswer: {
        '@type': 'Answer',
        text: getLocalizedText(item.answer, locale)
      }
    }))
  };
}

export function productJsonLd(locale: Locale, product: ProductSpec): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: getLocalizedText(product.name, locale),
    description: getLocalizedText(product.description, locale),
    sku: product.slug,
    brand: {
      '@type': 'Brand',
      name: siteName
    },
    image: [absoluteUrl(product.image)],
    category: 'Toy Manufacturing',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url: absoluteUrl(localePath(locale, `/products/${product.slug}`))
    }
  };
}
