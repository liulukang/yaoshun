'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useEffectEvent, useMemo, useRef, useState} from 'react';

import {companyProfile, desktopNav, pageLabels, sharedUi} from '@/content/site';
import {localeRegistry, t, type Locale} from '@/lib/i18n';
import {localizedPath, replaceLocaleInPath, type RouteKey} from '@/lib/routes';

type SiteShellProps = {
  children: React.ReactNode;
  locale: Locale;
};

function isActive(pathname: string, locale: Locale, route: RouteKey): boolean {
  const target = localizedPath(locale, route);
  return route === 'home' ? pathname === target : pathname.startsWith(target);
}

export function SiteShell({children, locale}: SiteShellProps) {
  const pathname = usePathname();
  const [mobileMenuState, setMobileMenuState] = useState({open: false, pathname});
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const localeMenuRef = useRef<HTMLDivElement>(null);
  const localeEntries = useMemo(() => Object.entries(localeRegistry) as Array<[Locale, (typeof localeRegistry)[Locale]]>, []);
  const currentLocaleMeta = localeRegistry[locale];
  const whatsappLink = `https://wa.me/${companyProfile.whatsapp.replace(/\D/g, '')}`;
  const footerQuickNav: RouteKey[] = [...desktopNav, 'contact'];
  const mobileMenuOpen = mobileMenuState.open && mobileMenuState.pathname === pathname;
  const closeMobileMenu = useEffectEvent(() => {
    setMobileMenuState({open: false, pathname});
  });
  const closeLocaleMenu = useEffectEvent(() => {
    setLocaleMenuOpen(false);
  });

  useEffect(() => {
    if (!mobileMenuOpen && !localeMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }

      if (localeMenuRef.current && !localeMenuRef.current.contains(event.target as Node)) {
        closeLocaleMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMobileMenu();
        closeLocaleMenu();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown, {passive: true});
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [localeMenuOpen, mobileMenuOpen]);

  return (
    <div className="site-page">
      <header className="fixed top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
        <nav className="flex h-16 w-full items-center gap-4 px-4 sm:px-6 xl:h-20 xl:px-8">
          <Link className="min-w-0 shrink-0 text-blue-950" data-track-event="brand_home_click" data-track-label="brand" data-track-location="header" href={localizedPath(locale, 'home')}>
            <span className="font-headline text-xl font-black tracking-tight sm:hidden">{t(locale, companyProfile.brandShort)}</span>
            <span className="hidden max-w-[18rem] font-headline text-sm font-black leading-tight tracking-tight md:block xl:max-w-none xl:text-lg">
              {t(locale, companyProfile.companyName)}
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-8 lg:flex xl:gap-10">
            <div className="flex items-center gap-8 xl:gap-10">
              {desktopNav.map((item) => (
                <Link
                  key={item}
                  className={`font-headline pb-1 text-sm font-semibold tracking-[0.01em] transition-colors duration-300 xl:text-[15px] ${
                    isActive(pathname, locale, item) ? 'border-b-2 border-orange-600 text-blue-900' : 'text-slate-600 hover:text-orange-700'
                  }`}
                  data-track-event="nav_link_click"
                  data-track-label={item}
                  data-track-location="desktop_header"
                  href={localizedPath(locale, item)}
                >
                  {t(locale, pageLabels[item])}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 xl:gap-5">
              <div className="relative" ref={localeMenuRef}>
                <button
                  aria-expanded={localeMenuOpen}
                  aria-label={t(locale, sharedUi.siteShell.localeMenuLabel)}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 font-label text-xs font-bold uppercase tracking-[0.14em] text-primary transition-colors hover:bg-slate-100"
                  data-track-event="locale_menu_toggle"
                  data-track-label={localeMenuOpen ? 'close' : 'open'}
                  data-track-location="desktop_header"
                  type="button"
                  onClick={() => setLocaleMenuOpen((open) => !open)}
                >
                  <span>{currentLocaleMeta.nativeLabel}</span>
                  <span className={`text-[10px] transition-transform ${localeMenuOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                <div
                  className={`absolute right-0 top-[calc(100%+0.75rem)] min-w-[13rem] rounded-3xl border border-slate-200 bg-white p-3 shadow-float transition-all duration-200 ${
                    localeMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                  }`}
                >
                  <p className="px-2 pb-2 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t(locale, sharedUi.siteShell.localeMenuLabel)}</p>
                  <div className="grid gap-1.5">
                    {localeEntries.map(([item, meta]) => (
                      <Link
                        key={item}
                        className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                          item === locale ? 'bg-[#1f2a78] !text-white' : 'bg-surface-container-low text-primary hover:bg-primary-fixed'
                        }`}
                        data-track-event="locale_switch"
                        data-track-label={item}
                        data-track-location="desktop_locale_menu"
                        href={replaceLocaleInPath(pathname, item)}
                        onClick={() => setLocaleMenuOpen(false)}
                      >
                        {meta.nativeLabel}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link className="rounded-full bg-[#1f2a78] px-8 py-3 text-center font-headline text-[15px] font-extrabold leading-none tracking-[0.04em] !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.25)] shadow-[0_18px_36px_-20px_rgba(12,31,99,0.8)] transition-all hover:bg-[#2c3897]" data-track-event="contact_cta_click" data-track-label="header_quote" data-track-location="desktop_header" href={localizedPath(locale, 'contact')}>
                {t(locale, pageLabels.contact)}
              </Link>
            </div>
          </div>

          <div className="relative ml-auto lg:hidden" ref={mobileMenuRef}>
            <button
              aria-controls="mobile-site-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={t(locale, sharedUi.siteShell.mobileMenuAriaLabel)}
              className="inline-flex min-w-[5.5rem] items-center justify-center rounded-full bg-[#1f2a78] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.14em] !text-white shadow-[0_14px_28px_-20px_rgba(12,31,99,0.8)] transition-colors hover:bg-[#2c3897]"
              data-track-event="mobile_menu_toggle"
              data-track-label={mobileMenuOpen ? 'close' : 'open'}
              data-track-location="mobile_header"
              type="button"
              onClick={() => setMobileMenuState((state) => ({open: !(state.open && state.pathname === pathname), pathname}))}
            >
              {t(locale, sharedUi.siteShell.mobileMenuLabel)}
            </button>

            <div
              className={`fixed left-0 right-0 top-16 z-50 border-t border-outline-variant/20 bg-white px-4 py-4 shadow-float transition-all duration-200 sm:px-6 ${
                mobileMenuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
              }`}
              id="mobile-site-menu"
            >
              <div className="grid gap-2.5">
                {desktopNav.map((item) => (
                  <Link
                    key={item}
                    className={`w-full rounded-2xl px-4 py-3 text-center text-sm font-bold transition-colors ${
                      isActive(pathname, locale, item) ? 'bg-primary text-white' : 'bg-surface-container-low text-primary hover:bg-primary-fixed'
                    }`}
                    data-track-event="nav_link_click"
                    data-track-label={item}
                    data-track-location="mobile_menu"
                    href={localizedPath(locale, item)}
                    onClick={() => setMobileMenuState({open: false, pathname})}
                  >
                    {t(locale, pageLabels[item])}
                  </Link>
                ))}
              </div>
              <div className="mt-5 border-t border-slate-200 pt-5">
                <p className="mb-3 font-label text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{t(locale, sharedUi.siteShell.localeMenuLabel)}</p>
                <div className="grid gap-2.5">
                {localeEntries.map(([item, meta]) => {
                  return (
                    <Link
                      key={item}
                      className={`w-full rounded-2xl px-4 py-3 text-center text-sm font-bold tracking-[0.04em] ${item === locale ? 'bg-[#1f2a78] !text-white' : 'bg-surface-container-high text-primary'}`}
                      data-track-event="locale_switch"
                      data-track-label={item}
                      data-track-location="mobile_menu"
                      href={replaceLocaleInPath(pathname, item)}
                      onClick={() => setMobileMenuState({open: false, pathname})}
                    >
                      {meta.nativeLabel}
                    </Link>
                  );
                })}
                </div>
              </div>
              <Link
                className="mt-4 block w-full rounded-full bg-[#1f2a78] px-4 py-3 text-center font-headline text-[15px] font-extrabold leading-none tracking-[0.04em] !text-white [text-shadow:0_1px_1px_rgba(0,0,0,0.25)] shadow-[0_14px_28px_-20px_rgba(12,31,99,0.8)]"
                data-track-event="contact_cta_click"
                data-track-label="mobile_menu_quote"
                data-track-location="mobile_menu"
                href={localizedPath(locale, 'contact')}
                onClick={() => setMobileMenuState({open: false, pathname})}
              >
                {t(locale, pageLabels.contact)}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16 xl:pt-20">{children}</main>

      <footer className="mt-14 w-full border-t border-slate-200/70 bg-gradient-to-b from-slate-50 to-slate-100/80 sm:mt-16 lg:mt-20">
        <div className="w-full px-4 py-10 sm:px-6 sm:py-12 xl:px-8 xl:py-14">
          <div className="grid gap-8 rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-panel sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
            <div className="lg:col-span-5">
              <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                {t(locale, {
                  zh: '玩具制造合作伙伴',
                  en: 'Toy Manufacturing Partner',
                })}
              </p>
              <h4 className="mt-3 font-headline text-2xl font-black tracking-tight text-primary sm:text-3xl">{t(locale, companyProfile.companyName)}</h4>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {t(locale, {
                  zh: '聚焦玩具 OEM/ODM 项目协同，覆盖打样、量产、包装与出口交付；塑胶与挤出能力按项目需求提供工艺配套。',
                  en: 'Focused on toy OEM/ODM collaboration from sampling to mass production, packaging, and export handoff, with plastic and extrusion as supporting processes.',
                })}
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <span className="rounded-full bg-primary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-on-primary-fixed">
                  {t(locale, {
                    zh: '始于 2006',
                    en: 'Since 2006',
                  })}
                </span>
                <span className="rounded-full bg-secondary-fixed px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-on-secondary-fixed">
                  {t(locale, {
                    zh: '玩具 OEM/ODM',
                    en: 'Toy OEM/ODM',
                  })}
                </span>
                <span className="rounded-full bg-surface-container-low px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.16em] text-slate-700">
                  {t(locale, {
                    zh: '全球交付支持',
                    en: 'Global Delivery',
                  })}
                </span>
              </div>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
              <div>
                <h4 className="font-label text-xs font-bold uppercase tracking-widest text-blue-900">{t(locale, sharedUi.siteShell.footerQuickLinks)}</h4>
                <ul className="mt-4 grid gap-2.5">
                  {footerQuickNav.map((item) => (
                    <li key={item}>
                      <Link className="font-label text-[11px] uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-primary" data-track-event="footer_nav_click" data-track-label={item} data-track-location="footer" href={localizedPath(locale, item)}>
                        {t(locale, pageLabels[item])}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-label text-xs font-bold uppercase tracking-widest text-blue-900">{t(locale, sharedUi.siteShell.footerContact)}</h4>
                <div className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  <a className="block transition-colors hover:text-primary" data-track-event="phone_click" data-track-label="footer_phone" data-track-location="footer" href={`tel:${companyProfile.phone.replace(/\s+/g, '')}`}>{companyProfile.phone}</a>
                  <a className="block transition-colors hover:text-primary" data-track-event="email_click" data-track-label="footer_email" data-track-location="footer" href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
                  <p>{t(locale, companyProfile.address)}</p>
                </div>
              </div>

              <div>
                <h4 className="font-label text-xs font-bold uppercase tracking-widest text-blue-900">{t(locale, sharedUi.siteShell.footerSalesChannelLabel)}</h4>
                <div className="mt-4 grid gap-3 text-sm text-slate-600">
                  <a className="transition-colors hover:text-primary" data-track-event="external_link_click" data-track-label="website" data-track-location="footer" href={companyProfile.website} rel="noreferrer" target="_blank">
                    {t(locale, sharedUi.siteShell.footerWebsiteLabel)}
                  </a>
                  <a className="transition-colors hover:text-primary" data-track-event="whatsapp_click" data-track-label="footer_whatsapp" data-track-location="footer" href={whatsappLink} rel="noreferrer" target="_blank">
                    {t(locale, sharedUi.siteShell.footerWhatsappLabel)}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3 border-t border-slate-200/70 pt-5 sm:pt-6 md:flex-row md:items-center md:justify-between">
            <div className="font-label text-[10px] uppercase tracking-widest text-slate-500">© 2026 {t(locale, companyProfile.companyName)}</div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 sm:gap-6">
              <Link className="transition-colors hover:text-primary" data-track-event="footer_nav_click" data-track-label="privacy" data-track-location="footer_bottom" href={localizedPath(locale, 'privacy')}>Privacy</Link>
              <Link className="transition-colors hover:text-primary" data-track-event="footer_nav_click" data-track-label="terms" data-track-location="footer_bottom" href={localizedPath(locale, 'terms')}>Terms</Link>
              <Link className="transition-colors hover:text-primary" data-track-event="footer_nav_click" data-track-label="contact" data-track-location="footer_bottom" href={localizedPath(locale, 'contact')}>{t(locale, pageLabels.contact)}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
