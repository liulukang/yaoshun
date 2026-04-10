import { appConfig } from "@/config/app-config";

export const siteUrl = appConfig.siteUrl;
export const siteName = 'Dongguan Yaoshun Technology Co., Ltd. | 东莞市尧顺科技有限公司';
export const siteDescription = 'Dongguan Yaoshun Technology Co., Ltd. (东莞市尧顺科技有限公司), founded in 2006, focuses on plastic extrusion equipment, precision injection molding, AI smart toys, DIY children toys, plastic profiles, and OEM/ODM manufacturing support.';
export const defaultOgImage = '/placeholders/company-hero.svg';

export const appEnvironment = appConfig.environment;
export const googleAnalyticsId = appConfig.tracking.googleAnalyticsId;
export const googleAdsId = appConfig.tracking.googleAdsId;
export const googleSiteVerification = appConfig.tracking.googleSiteVerification;

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
