import type {Locale, LocalizedText} from '@/types/content';

export function getLocalizedText(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value.en;
}
