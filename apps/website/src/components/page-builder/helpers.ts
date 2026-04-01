import {getLocaleBasePath} from '@/i18n/config';
import type {Locale} from '@/types/content';

export function localeBasePath(locale: Locale): string {
  return getLocaleBasePath(locale);
}
