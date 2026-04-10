export type AppEnvironment = "development" | "preview" | "production";

export type TrackingConfig = {
  googleAnalyticsId: string;
  googleAdsId: string;
  googleSiteVerification: string;
};

export type AppConfig = {
  environment: AppEnvironment;
  siteUrl: string;
  tracking: TrackingConfig;
};

export function defineAppConfig(config: AppConfig): AppConfig {
  return {
    ...config,
    siteUrl: config.siteUrl.replace(/\/+$/, ""),
    tracking: {
      googleAnalyticsId: config.tracking.googleAnalyticsId.trim(),
      googleAdsId: config.tracking.googleAdsId.trim(),
      googleSiteVerification: config.tracking.googleSiteVerification.trim(),
    },
  };
}
