import {getLocalizedValue} from '@/lib/locale';
import type {Locale} from '@/types/content';

export const siteNames: Record<Locale, string> = {
  en: 'yaoshun',
  zh: '尧顺'
};

export const siteName = siteNames.en;

export function getSiteName(locale: Locale): string {
  return getLocalizedValue(siteNames, locale);
}
