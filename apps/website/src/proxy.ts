import { NextResponse, type NextRequest } from "next/server";

import {
  defaultLocale,
  getLocaleFromPathname,
  localeCookieName,
  localePathPrefix,
} from "@/lib/i18n";
import {
  consentRequiredCookieName,
  isConsentRequiredCountry,
} from "@/lib/privacy-region";
import {
  agentHomepageMarkdown,
  agentNotFoundMarkdown,
} from "@/content/agent-markdown";

const oneYearInSeconds = 60 * 60 * 24 * 365;
const thirtyDaysInSeconds = 60 * 60 * 24 * 30;
const internalLocaleRewriteHeader = "x-yaoshun-internal-locale-rewrite";

function acceptsMarkdown(request: NextRequest) {
  return request.headers.get("accept")?.toLowerCase().includes("text/markdown") ?? false;
}

function getMarkdownLocale(pathname: string) {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}

function isKnownMarkdownPage(pathname: string) {
  const localePath = pathname.replace(/^\/zh(?=\/|$)/, "") || "/";
  const knownPages = new Set([
    "/",
    "/about",
    "/solutions",
    "/products",
    "/news",
    "/faq",
    "/contact",
    "/privacy",
    "/refund-return",
    "/terms",
  ]);

  if (knownPages.has(localePath)) return true;
  const categoryMatch = localePath.match(/^\/products\/category\/([^/]+)$/);
  if (categoryMatch) {
    return new Set(["building", "sports", "stem", "robots", "tents", "drones", "fans"]).has(
      categoryMatch[1],
    );
  }
  if (/^\/products\/(?:\d{8,13}|(?=[A-Za-z0-9-]*[A-Z])[A-Za-z0-9-]+)$/.test(localePath)) return true;
  if (/^\/news\/[^/]+$/.test(localePath)) return true;
  return false;
}

function markdownResponse(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: {
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}

function applyPaginationRobots(response: NextResponse, request: NextRequest) {
  if (
    request.nextUrl.searchParams.has("page") &&
    /^\/(?:zh\/)?products\/category\//.test(request.nextUrl.pathname)
  ) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

function resolveCountryCode(request: NextRequest): string | null {
  return (
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code")
  );
}

function isPrefetchRequest(request: NextRequest) {
  return (
    request.headers.get("next-router-prefetch") === "1" ||
    request.headers.get("purpose") === "prefetch" ||
    request.headers.get("sec-purpose")?.includes("prefetch")
  );
}

function applyContextCookies(
  response: NextResponse,
  request: NextRequest,
  locale: string,
  consentRequired: boolean,
) {
  if (isPrefetchRequest(request)) {
    return;
  }

  const consentRequiredValue = consentRequired ? "1" : "0";

  if (request.cookies.get(localeCookieName)?.value !== locale) {
    response.cookies.set(localeCookieName, locale, {
      path: "/",
      maxAge: oneYearInSeconds,
    });
  }

  if (request.cookies.get(consentRequiredCookieName)?.value !== consentRequiredValue) {
    response.cookies.set(consentRequiredCookieName, consentRequiredValue, {
      path: "/",
      maxAge: thirtyDaysInSeconds,
    });
  }
}

function rewriteDefaultLocalePath(
  request: NextRequest,
  consentRequired: boolean,
) {
  const url = request.nextUrl.clone();
  url.pathname =
    request.nextUrl.pathname === "/"
      ? `/${defaultLocale}`
      : `/${defaultLocale}${request.nextUrl.pathname}`;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(internalLocaleRewriteHeader, "1");

  const response = NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  });
  applyContextCookies(response, request, defaultLocale, consentRequired);
  return applyPaginationRobots(response, request);
}

export function proxy(request: NextRequest) {
  if (acceptsMarkdown(request)) {
    const pathname = request.nextUrl.pathname;
    const isHomepage = pathname === "/" || pathname === "/en" || pathname === "/zh";

    if (isHomepage) {
      return markdownResponse(agentHomepageMarkdown[getMarkdownLocale(pathname)]);
    }

    if (!isKnownMarkdownPage(pathname)) {
      return markdownResponse(agentNotFoundMarkdown, 404);
    }
  }

  if (request.nextUrl.pathname === "/sitemap" || request.nextUrl.pathname === "/sitemap/") {
    const url = request.nextUrl.clone();
    url.pathname = "/sitemap.xml";
    return NextResponse.redirect(url, 308);
  }

  const localeInPath = getLocaleFromPathname(request.nextUrl.pathname);
  const consentRequired = isConsentRequiredCountry(resolveCountryCode(request));

  if (localeInPath) {
    const isInternalLocaleRewrite =
      request.headers.get(internalLocaleRewriteHeader) === "1";

    if (
      localeInPath === defaultLocale &&
      localePathPrefix(defaultLocale) === "" &&
      !isInternalLocaleRewrite
    ) {
      const url = request.nextUrl.clone();
      url.pathname = request.nextUrl.pathname.replace(
        new RegExp(`^/${defaultLocale}(?=/|$)`),
        "",
      ) || "/";
      const response = NextResponse.redirect(url, 308);
      applyContextCookies(response, request, defaultLocale, consentRequired);
      return response;
    }

    const response = NextResponse.next();
    applyContextCookies(response, request, localeInPath, consentRequired);
    return applyPaginationRobots(response, request);
  }

  return rewriteDefaultLocalePath(request, consentRequired);
}

export const config = {
  matcher: ["/((?!api|media|_next|.*\\..*).*)"],
};
