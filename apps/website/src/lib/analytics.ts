'use client';

import {getLocaleFromPathname} from '@/lib/i18n';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type AnalyticsValue = string | number | boolean;
type AnalyticsParams = Record<string, AnalyticsValue>;

function normalizeDatasetKey(key: string): string {
  return key
    .replace(/^track/, '')
    .replace(/^[A-Z]/, (match) => match.toLowerCase())
    .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
}

function parseDatasetValue(value: string): AnalyticsValue {
  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  return value;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, params);
}

export function trackPageView(pathname: string, title?: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const locale = getLocaleFromPathname(pathname);

  trackEvent('page_view', {
    page_path: pathname,
    page_location: window.location.href,
    page_title: title ?? document.title,
    locale: locale ?? 'unknown',
  });
}

export function buildTrackedDatasetParams(dataset: DOMStringMap): AnalyticsParams {
  const params: AnalyticsParams = {};

  for (const [key, value] of Object.entries(dataset)) {
    if (!value || key === 'trackEvent') {
      continue;
    }

    if (!key.startsWith('track')) {
      continue;
    }

    params[normalizeDatasetKey(key)] = parseDatasetValue(value);
  }

  return params;
}
