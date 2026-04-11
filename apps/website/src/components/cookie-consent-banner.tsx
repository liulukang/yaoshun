'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useMemo, useSyncExternalStore} from 'react';

import {trackEvent, trackPageView} from '@/lib/analytics';
import {
  applyGoogleConsent,
  cookieConsentStorageKey,
  persistCookieConsentStatus,
  readCookieConsentStatus,
  type CookieConsentStatus,
} from '@/lib/cookie-consent';
import {defaultLocale, getLocaleFromPathname, t} from '@/lib/i18n';

export function CookieConsentBanner() {
  const pathname = usePathname();
  const locale = useMemo(
    () => getLocaleFromPathname(pathname) ?? defaultLocale,
    [pathname]
  );
  const decision = useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsentStatus,
    () => null
  );
  const privacyHref = `/${locale}/privacy`;
  const copy = {
    accept: t(locale, {
      en: 'Accept All Cookies',
      zh: '接受全部 Cookie',
    }),
    decline: t(locale, {
      en: 'Essential Only',
      zh: '仅使用必要 Cookie',
    }),
    description: t(locale, {
      en: 'We use cookies to improve site experience, and only enable analytics and ads measurement after consent.',
      zh: '我们使用 Cookie 优化网站体验，并在你同意后启用统计与广告衡量功能。',
    }),
    title: t(locale, {
      en: 'Cookie Notice',
      zh: 'Cookie 使用说明',
    }),
    viewPolicy: t(locale, {
      en: 'View Privacy Policy',
      zh: '查看隐私政策',
    }),
  };

  function handleConsent(nextDecision: CookieConsentStatus) {
    persistCookieConsentStatus(nextDecision);
    applyGoogleConsent(nextDecision);
    window.dispatchEvent(new Event('cookie-consent-change'));

    if (nextDecision === 'granted') {
      trackPageView(pathname, document.title);
      trackEvent('cookie_consent_granted', {
        consent_status: 'granted',
        page_path: pathname,
      });
    }
  }

  if (decision) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-2 z-[95] sm:bottom-4">
      <div className="desktop-shell px-4 sm:px-6 xl:px-8">
        <div className="w-full overflow-hidden rounded-2xl border border-outline-variant/25 bg-white shadow-panel">
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
              <div className="min-w-0">
                <p className="font-headline text-base font-extrabold tracking-tight text-primary sm:text-lg">{copy.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-on-surface-variant sm:text-sm">{copy.description}</p>
                <Link className="mt-1.5 inline-block text-xs font-bold text-secondary transition-colors hover:text-primary sm:text-sm" href={privacyHref}>
                  {copy.viewPolicy}
                </Link>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
                <button className="rounded-full border-2 border-outline-variant px-3.5 py-1.5 text-[11px] font-bold text-primary transition-colors hover:bg-surface-container-high sm:px-4 sm:py-2 sm:text-xs" onClick={() => handleConsent('denied')} type="button">
                  {copy.decline}
                </button>
                <button className="inline-flex items-center justify-center rounded-full bg-secondary px-3.5 py-1.5 text-[11px] font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-on-secondary-fixed-variant sm:px-4 sm:py-2 sm:text-xs" onClick={() => handleConsent('granted')} type="button">
                  {copy.accept}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function subscribeToCookieConsent(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === cookieConsentStorageKey) {
      callback();
    }
  };
  const handleConsentChange = () => {
    callback();
  };

  window.addEventListener('storage', handleStorage);
  window.addEventListener('cookie-consent-change', handleConsentChange);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('cookie-consent-change', handleConsentChange);
  };
}
