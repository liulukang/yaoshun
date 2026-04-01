export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  zh: '中文'
};

export const localeShortLabels: Record<Locale, string> = {
  en: 'EN',
  zh: 'CN'
};

export const openGraphLocales: Record<Locale, string> = {
  en: 'en_US',
  zh: 'zh_CN'
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleBasePath(locale: Locale): string {
  return `/${locale}`;
}

export function getLocaleRootPath(locale: Locale): string {
  return `${getLocaleBasePath(locale)}/`;
}

export function getLocalizedPath(locale: Locale, path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (normalized === '/') {
    return getLocaleRootPath(locale);
  }

  return `${getLocaleBasePath(locale)}${normalized}`;
}
