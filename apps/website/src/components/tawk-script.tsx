'use client';

import Script from 'next/script';
import {useSyncExternalStore} from 'react';

import {readCookieConsentStatus, subscribeToCookieConsent} from '@/lib/cookie-consent';

const tawkEmbedUrl = 'https://embed.tawk.to/69d908d883428a1c31aa6460/1jlrsl4kk';

export function TawkScript() {
  const consentStatus = useSyncExternalStore(
    subscribeToCookieConsent,
    readCookieConsentStatus,
    () => null
  );

  if (consentStatus !== 'granted') {
    return null;
  }

  return (
    <Script id="tawk-to-script" strategy="afterInteractive">
      {`
        var Tawk_API = window.Tawk_API || {}, Tawk_LoadStart = new Date();
        (function() {
          var s1 = document.createElement('script');
          var s0 = document.getElementsByTagName('script')[0];
          s1.async = true;
          s1.src = '${tawkEmbedUrl}';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
