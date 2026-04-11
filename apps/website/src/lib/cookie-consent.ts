export type CookieConsentStatus = 'granted' | 'denied';

export const cookieConsentStorageKey = 'yaoshun-cookie-consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type GoogleConsentState = {
  ad_personalization: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
};

const grantedGoogleConsentState: GoogleConsentState = {
  ad_personalization: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  analytics_storage: 'granted',
};

const deniedGoogleConsentState: GoogleConsentState = {
  ad_personalization: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  analytics_storage: 'denied',
};

export function isCookieConsentStatus(value: unknown): value is CookieConsentStatus {
  return value === 'granted' || value === 'denied';
}

export function getGoogleConsentState(status: CookieConsentStatus): GoogleConsentState {
  return status === 'granted' ? grantedGoogleConsentState : deniedGoogleConsentState;
}

export function readCookieConsentStatus(): CookieConsentStatus | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const value = window.localStorage.getItem(cookieConsentStorageKey);

    return isCookieConsentStatus(value) ? value : null;
  } catch {
    return null;
  }
}

export function applyGoogleConsent(status: CookieConsentStatus) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('consent', 'update', getGoogleConsentState(status));
}

export function persistCookieConsentStatus(status: CookieConsentStatus) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(cookieConsentStorageKey, status);
  } catch {
    return;
  }
}
