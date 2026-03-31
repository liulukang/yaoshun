'use client';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params: Record<string, string | number | boolean> = {}): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (!window.gtag) {
    return;
  }

  window.gtag('event', eventName, params);
}
