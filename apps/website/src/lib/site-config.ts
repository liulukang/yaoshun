const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").trim();
export const siteUrl = rawSiteUrl.replace(/\/+$/, "");
export const siteName = 'Dongguan Yaoshun Technology Co., Ltd. | 东莞市尧顺科技有限公司';
export const siteDescription = 'Dongguan Yaoshun Technology Co., Ltd. (东莞市尧顺科技有限公司), founded in 2006, focuses on plastic extrusion equipment, precision injection molding, AI smart toys, DIY children toys, plastic profiles, and OEM/ODM manufacturing support.';
export const defaultOgImage = '/api/1688-products/601805200838/images/image-002.jpg';

export const googleAnalyticsId = (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "").trim();
export const googleAdsId = (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "").trim();
export const googleAdsLeadConversionSendTo = (process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_CONVERSION_SEND_TO || "").trim();
export const googleSiteVerification = (
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  || process.env.GOOGLE_SITE_VERIFICATION
  || ""
).trim();

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
