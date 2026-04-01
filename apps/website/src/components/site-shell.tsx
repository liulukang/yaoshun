'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect, useMemo, useRef, useState} from 'react';

import {companyProfile, desktopNav, footerNav, pageLabels} from '@/data/site';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const localeEntries = useMemo(() => Object.entries(localeRegistry) as Array<[Locale, (typeof localeRegistry)[Locale]]>, []);
  const whatsappLink = `https://wa.me/${companyProfile.whatsapp.replace(/\D/g, '')}`;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
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
  }, [mobileMenuOpen]);

  return (
    <div className="site-page">
      <header className="fixed top-0 z-50 w-full bg-white/80 shadow-sm backdrop-blur-md">
        <nav className="desktop-shell flex h-16 items-center justify-between px-4 sm:px-6 xl:h-20 xl:px-8">
          <Link className="font-headline text-xl font-black tracking-tighter text-blue-950 sm:text-2xl" href={localizedPath(locale, 'home')}>
            {t(locale, companyProfile.brandShort)}
          </Link>

          <div className="hidden items-center gap-5 lg:flex xl:gap-6">
            {desktopNav.map((item) => (
              <Link
                key={item}
                className={`font-headline text-xs font-bold tracking-tight transition-colors duration-300 xl:text-sm ${
                  isActive(pathname, locale, item) ? 'border-b-2 border-orange-600 pb-1 text-blue-900' : 'text-slate-600 hover:text-orange-700'
                }`}
                href={localizedPath(locale, item)}
              >
                {t(locale, pageLabels[item])}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            {localeEntries.map(([item, meta]) => {
              return (
                <Link
                  key={item}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors ${
                    item === locale ? 'bg-primary text-white' : 'bg-surface-container-high text-primary hover:bg-primary-fixed'
                  }`}
                  href={replaceLocaleInPath(pathname, item)}
                >
                  {meta.nativeLabel}
                </Link>
              );
            })}
            <Link className="rounded-full bg-primary px-8 py-3 text-center font-label text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-primary-container" href={localizedPath(locale, 'contact')}>
              {t(locale, pageLabels.contact)}
            </Link>
          </div>

          <div className="relative lg:hidden" ref={mobileMenuRef}>
            <button
              aria-controls="mobile-site-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={locale === 'en' ? 'Toggle navigation menu' : '切换导航菜单'}
              className="inline-flex min-w-[5rem] items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-container"
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {locale === 'en' ? 'Menu' : '菜单'}
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
                    href={localizedPath(locale, item)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(locale, pageLabels[item])}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex w-full gap-2">
                {localeEntries.map(([item, meta]) => {
                  return (
                    <Link
                      key={item}
                      className={`flex-1 rounded-full px-3 py-2 text-center text-xs font-bold tracking-[0.04em] ${item === locale ? 'bg-primary text-white' : 'bg-surface-container-high text-primary'}`}
                      href={replaceLocaleInPath(pathname, item)}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {meta.nativeLabel}
                    </Link>
                  );
                })}
              </div>
              <Link
                className="mt-4 block w-full rounded-full bg-secondary-container px-4 py-3 text-center font-label text-xs font-bold uppercase tracking-[0.18em] text-primary"
                href={localizedPath(locale, 'contact')}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t(locale, pageLabels.contact)}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-16 xl:pt-20">{children}</main>

      <footer className="mt-14 bg-slate-50 sm:mt-16 lg:mt-20">
        <div className="desktop-shell grid gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 md:gap-10 xl:grid-cols-4 xl:px-8 xl:py-14">
          <div>
            <div className="font-headline text-lg font-bold text-blue-900">{t(locale, companyProfile.companyName)}</div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500 sm:mt-5">{t(locale, companyProfile.tagline)}</p>
          </div>
          <div>
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-blue-900">{locale === 'en' ? 'Quick Links' : '快速链接'}</h4>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:mt-5 md:grid-cols-1">
              {footerNav.map((item) => (
                <li key={item}>
                  <Link className="font-label text-[11px] uppercase tracking-[0.16em] text-slate-500 transition-colors hover:text-primary" href={localizedPath(locale, item)}>
                    {t(locale, pageLabels[item])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-blue-900">{locale === 'en' ? 'Contact' : '联系信息'}</h4>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-500 sm:mt-5">
              <p>{companyProfile.email}</p>
              <p>{companyProfile.phone}</p>
              <p>{t(locale, companyProfile.address)}</p>
            </div>
          </div>
          <div>
            <h4 className="font-label text-xs font-bold uppercase tracking-widest text-blue-900">{locale === 'en' ? 'Stay Connected' : '保持联系'}</h4>
            <div className="mt-4 flex border-b border-outline-variant pb-2 sm:mt-5">
              <input className="w-full border-none bg-transparent text-sm outline-none" placeholder={locale === 'en' ? 'Corporate Email' : '企业邮箱'} type="email" />
              <span className="text-secondary">{'->'}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-400 sm:mt-5 sm:gap-6">
              <a href={companyProfile.website} rel="noreferrer" target="_blank">
                Web
              </a>
              <a href={`mailto:${companyProfile.email}`}>Mail</a>
              <a href={companyProfile.linkedin} rel="noreferrer" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="desktop-shell flex flex-col gap-3 border-t border-slate-200/60 px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-center md:justify-between xl:px-8">
          <div className="font-label text-[10px] uppercase tracking-widest text-slate-400">© 2026 {t(locale, companyProfile.companyName)}</div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400 sm:gap-6">
            <a href={`mailto:${companyProfile.email}`}>Email</a>
            <a href={whatsappLink} rel="noreferrer" target="_blank">
              WhatsApp
            </a>
            <a href={companyProfile.linkedin} rel="noreferrer" target="_blank">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
