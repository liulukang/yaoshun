import {notFound} from 'next/navigation';

export const localeRegistry = {
  en: {
    label: 'English',
    nativeLabel: 'English',
    markets: ['US', 'UK', 'AU']
  },
  zh: {
    label: 'Chinese',
    nativeLabel: '简体中文',
    markets: ['CN', 'SG', 'MY']
  }
} as const;

export type Locale = keyof typeof localeRegistry;
export const locales = Object.keys(localeRegistry) as Locale[];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export async function getLocaleFromParams(params: Promise<{locale: string}>): Promise<Locale> {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export function t<T>(locale: Locale, value: Partial<Record<Locale, T>>): T {
  const localized = value[locale];

  if (localized !== undefined) {
    return localized;
  }

  const fallback = value[defaultLocale];

  if (fallback !== undefined) {
    return fallback;
  }

  const firstValue = Object.values(value)[0];

  if (firstValue !== undefined) {
    return firstValue as T;
  }

  throw new Error(`Missing translation for locale "${locale}"`);
}
