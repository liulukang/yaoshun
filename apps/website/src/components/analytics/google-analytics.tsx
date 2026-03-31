'use client';

import Script from 'next/script';
import {usePathname, useSearchParams} from 'next/navigation';
import {useEffect, useState} from 'react';

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

export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
    if (!gaId || consent !== 'all' || typeof window === 'undefined') {
      return;
    }

    const pagePath = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    window.gtag?.('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href
    });
  }, [consent, gaId, pathname, searchParams]);

  if (!gaId || consent !== 'all') {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {send_page_view: false});
        `}
      </Script>
    </>
  );
}
