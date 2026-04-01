import type {Locale} from '@/types/content';

export function localeBasePath(locale: Locale): string {
  return locale === 'zh' ? '/zh' : '/en';
}
