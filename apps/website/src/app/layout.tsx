import type { Metadata } from "next";
import { headers } from "next/headers";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";

import { AnalyticsEvents } from "@/components/analytics-events";
import { CookieConsentBanner } from "@/components/cookie-consent-banner";
import { TawkScript } from "@/components/tawk-script";
import { TrackingScripts } from "@/components/tracking-scripts";
import { defaultLocale, localeRegistry, matchSupportedLocale } from "@/lib/i18n";
import {
  defaultOgImage,
  googleSiteVerification,
  siteDescription,
  siteName,
  siteUrl,
  toAbsoluteUrl,
} from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  keywords: [
    "尧顺",
    "尧顺科技",
    "东莞市尧顺科技有限公司",
    "AI智能玩具",
    "DIY儿童玩具",
    "玩具制造商",
    "塑胶挤出设备",
    "精密注塑",
    "Yaoshun",
    "Yaoshun Technology Co., Ltd.",
    "Dongguan Yaoshun Technology Co., Ltd.",
    "plastic extrusion equipment",
    "precision injection molding",
    "AI smart toys",
    "DIY children toys",
    "toy manufacturer",
    "OEM toy manufacturer",
    "ODM toy manufacturer",
  ],
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: siteUrl,
    locale: localeRegistry[defaultLocale].ogLocale,
    images: [
      {
        url: toAbsoluteUrl(defaultOgImage),
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [toAbsoluteUrl(defaultOgImage)],
  },
  verification: {
    google: googleSiteVerification || undefined,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const detectedLocale = matchSupportedLocale(
    requestHeaders.get("x-detected-locale"),
  );
  const htmlLang =
    localeRegistry[detectedLocale ?? defaultLocale].htmlLang;

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin=""
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TawkScript />
        <TrackingScripts />
        <CookieConsentBanner />
        <AnalyticsEvents />
        {children}
        <VercelAnalytics />
      </body>
    </html>
  );
}
