'use client';

import Script from 'next/script';
import {usePathname} from 'next/navigation';
import {useEffect, useMemo, useState} from 'react';

import {pushDataLayerEvent} from '@/lib/gtag';

const CONSENT_KEY = 'yaoshun_cookie_consent';

type ConsentState = 'essential' | 'all' | null;

function readConsent(): ConsentState {
  if (typeof window === 'undefined') {
    return null;
  }

  const value = localStorage.getItem(CONSENT_KEY);
  if (value === 'essential' || value === 'all') {
    return value;
  }

  return null;
}

function toSnakeCase(input: string): string {
  return input.replace(/([a-z0-9])([A-Z])/g, '$1_$2').replace(/-/g, '_').toLowerCase();
}

export function GoogleAnalytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? '';
  const gaId = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? '';
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID?.trim() ?? '';
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    const updateConsent = () => setConsent(readConsent());

    updateConsent();
    window.addEventListener('cookie-consent-updated', updateConsent);

    return () => {
      window.removeEventListener('cookie-consent-updated', updateConsent);
    };
  }, []);

  useEffect(() => {
    if (consent !== 'all' || typeof window === 'undefined') {
      return;
    }

    const pagePath = `${pathname}${window.location.search ?? ''}`;
    pushDataLayerEvent('page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [consent, pathname]);

  useEffect(() => {
    if (consent !== 'all' || typeof document === 'undefined') {
      return;
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const trackNode = target.closest<HTMLElement>('[data-track-event]');
      if (!trackNode) {
        return;
      }

      const eventName = trackNode.dataset.trackEvent;
      if (!eventName) {
        return;
      }

      const payload: Record<string, string> = {};
      Object.entries(trackNode.dataset).forEach(([key, value]) => {
        if (key === 'trackEvent' || !value) {
          return;
        }

        if (key.startsWith('track')) {
          payload[toSnakeCase(key.slice('track'.length))] = value;
        }
      });

      pushDataLayerEvent(eventName, payload);
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [consent]);

  const initScript = useMemo(() => {
    return `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'tracking_bootstrap',
        ga_id: '${gaId}',
        ads_id: '${adsId}'
      });
      (function(w,d,s,l,i){
        w[l]=w[l]||[];
        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
        var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),
            dl=l!='dataLayer'?'&l='+l:'';
        j.async=true;
        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
        f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
  }, [adsId, gaId, gtmId]);

  if (!gtmId || consent !== 'all') {
    return null;
  }

  return (
    <Script id="gtm-bootstrap" strategy="afterInteractive">
      {initScript}
    </Script>
  );
}
