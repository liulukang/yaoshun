import { defineAppConfig } from "@/config/app-config.shared";

export const appConfig = defineAppConfig({
  environment: "development",
  siteUrl: "http://localhost:3000",
  tracking: {
    googleAnalyticsId: "G-8FYB19DCJV",
    googleAdsId: "",
    googleSiteVerification: "",
  },
});
