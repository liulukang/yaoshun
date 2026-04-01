'use client';

const CONSENT_KEY = 'yaoshun_cookie_consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function hasMarketingConsent(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return localStorage.getItem(CONSENT_KEY) === 'all';
}

export function pushDataLayerEvent(eventName: string, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (!hasMarketingConsent()) {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    ...params
  });

  // Backward compatibility: if gtag exists, keep sending event there as well.
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
}

export const trackEvent = pushDataLayerEvent;
