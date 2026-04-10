import Script from 'next/script';

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
