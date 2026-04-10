import {NextResponse, type NextRequest} from 'next/server';

import {defaultLocale, getLocaleFromPathname, localeCookieName, resolvePreferredLocale} from '@/lib/i18n';

export function proxy(request: NextRequest) {
  const localeInPath = getLocaleFromPathname(request.nextUrl.pathname);
  const requestHeaders = new Headers(request.headers);

  if (localeInPath) {
    requestHeaders.set('x-detected-locale', localeInPath);
    const response = NextResponse.next({
      request: {
        headers: requestHeaders
      }
    });
    response.cookies.set(localeCookieName, localeInPath, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365
    });
    return response;
  }

  if (request.nextUrl.pathname === '/') {
    const locale = resolvePreferredLocale({
      cookieLocale: request.cookies.get(localeCookieName)?.value ?? null,
      acceptLanguage: request.headers.get('accept-language')
    });
    requestHeaders.set('x-detected-locale', locale);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;

    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname === '') {
    requestHeaders.set('x-detected-locale', defaultLocale);
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  requestHeaders.set('x-detected-locale', defaultLocale);
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};
