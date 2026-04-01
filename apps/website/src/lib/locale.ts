import {defaultLocale} from '@/i18n/config';
import type {Locale, LocalizedText} from '@/types/content';

export function getLocalizedText(value: LocalizedText, locale: Locale): string {
  return getLocalizedValue(value, locale);
}

export function getLocalizedValue<T>(value: Partial<Record<string, T>>, locale: string): T {
  const localizedValue = value[locale];

  if (localizedValue !== undefined) {
    return localizedValue;
  }

  const fallbackValue = value[defaultLocale];

  if (fallbackValue !== undefined) {
    return fallbackValue;
  }

  const firstAvailableValue = Object.values(value).find((item) => item !== undefined);

  if (firstAvailableValue !== undefined) {
    return firstAvailableValue;
  }

  throw new Error('Missing localized value');
}
