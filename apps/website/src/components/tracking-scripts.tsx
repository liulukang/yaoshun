import Script from 'next/script';

import {cookieConsentStorageKey} from '@/lib/cookie-consent';
import {googleAdsId, googleAnalyticsId} from '@/lib/site-config';

function buildTrackingBootstrap() {
  const configs = [googleAnalyticsId, googleAdsId].filter(Boolean)
    .map((id) => `gtag('config', '${id}', ${id === googleAnalyticsId ? "{send_page_view: false}" : '{}'});`)
    .join('\n');

  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('consent', 'default', {
      ad_personalization: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
    try {
      var cookieConsentStatus = window.localStorage.getItem('${cookieConsentStorageKey}');
      if (cookieConsentStatus === 'granted') {
        gtag('consent', 'update', {
          ad_personalization: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          analytics_storage: 'granted'
        });
      }
    } catch (error) {}
    ${configs}
  `;
}

export function TrackingScripts() {
  const trackingId = googleAnalyticsId || googleAdsId;

  if (!trackingId) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`} strategy="afterInteractive" />
      <Script id="google-tracking-bootstrap" strategy="afterInteractive">
        {buildTrackingBootstrap()}
      </Script>
    </>
  );
}
