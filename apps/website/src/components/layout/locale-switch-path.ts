import {getLocalizedPath, isLocale} from '@/i18n/config';
import type {Locale} from '@/types/content';

function hasTrailingSlash(pathname: string): boolean {
  return pathname.length > 1 && pathname.endsWith('/');
}

export function buildLocaleSwitchHref(pathname: string, targetLocale: Locale): string {
  const safePath = pathname || '/';
  const trailingSlash = hasTrailingSlash(safePath);
  const segments = safePath.split('/').filter(Boolean);

  if (segments.length === 0) {
    return getLocalizedPath(targetLocale, '/');
  }

  if (isLocale(segments[0])) {
    segments[0] = targetLocale;
    const switched = `/${segments.join('/')}`;
    return trailingSlash ? `${switched}/` : switched;
  }

  const prefixed = getLocalizedPath(targetLocale, safePath);
  return trailingSlash ? `${prefixed}/` : prefixed;
}
