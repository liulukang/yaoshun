import type {Locale} from '@/lib/i18n';

export const routePathMap = {
  home: '',
  company: '/company',
  oemOdm: '/oem-odm',
  products: '/products',
  factory: '/factory',
  compliance: '/compliance',
  faq: '/faq',
  contact: '/contact',
  privacy: '/privacy'
} as const;

export type RouteKey = keyof typeof routePathMap;

export function localizedPath(locale: Locale, route: RouteKey): string {
  return `/${locale}${routePathMap[route]}`;
}

export function productPath(locale: Locale, slug: string): string {
  return `/${locale}/products/${slug}`;
}

export function replaceLocaleInPath(pathname: string, locale: Locale): string {
  return pathname.replace(/^\/(en|zh)(?=\/|$)/, `/${locale}`);
}
