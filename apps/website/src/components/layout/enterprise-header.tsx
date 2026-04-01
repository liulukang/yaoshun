'use client';

import Link from 'next/link';
import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import {usePathname} from 'next/navigation';

import {getSiteName, homepageContent} from '@/content/home-content';
import type {Locale} from '@/types/content';

interface EnterpriseHeaderProps {
  locale: Locale;
  basePath?: string;
}

function localeRoot(locale: Locale): string {
  return locale === 'zh' ? '/zh/' : '/en/';
}

function normalizePath(pathname: string): string {
  if (!pathname) {
    return '/';
  }

  const withLeadingSlash = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (withLeadingSlash === '/') {
    return withLeadingSlash;
  }

  return withLeadingSlash.endsWith('/') ? withLeadingSlash.slice(0, -1) : withLeadingSlash;
}

function isNavItemActive(pathname: string, itemHref: string, pageBasePath: string): boolean {
  const currentPath = normalizePath(pathname);
  const targetPath = normalizePath(`${pageBasePath}${itemHref}`);

  if (itemHref === 'products') {
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  }

  return currentPath === targetPath;
}

export function EnterpriseHeader({locale, basePath}: EnterpriseHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const content = homepageContent[locale];
  const brandName = getSiteName(locale);
  const pageBasePath = basePath ?? localeRoot(locale);
  const navItems = content.nav.slice(0, 6);
  const contactLabel = locale === 'zh' ? '询盘' : 'Contact';
  const contactLabelFull = locale === 'zh' ? '立即咨询' : 'Inquire Now';
  const contactHref = `${pageBasePath}contact`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#f2d9cf] bg-[rgba(255,252,248,0.82)] backdrop-blur-xl">
      <div className="section-shell py-3">
        <div className="flex items-center justify-between gap-3 lg:gap-6">
          <Link href={pageBasePath} className="group inline-flex min-w-0 items-center gap-2.5">
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[1.1rem] border border-[#ffd4c8] bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] text-xs font-semibold tracking-[0.22em] text-white shadow-[0_10px_20px_rgba(255,127,102,0.2)] transition duration-300 group-hover:-translate-y-0.5 sm:h-11 sm:w-11 sm:text-sm sm:tracking-[0.28em]">
              AT
            </span>
            <div className="min-w-0">
              <p className="hidden font-heading text-xs uppercase tracking-[0.18em] text-[#ff6b57] sm:block sm:text-sm sm:tracking-[0.28em]">
                Toy Manufacturing
              </p>
              <p className="truncate font-heading text-base text-[#1d2340] sm:text-lg">{brandName}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => {
              const active = isNavItemActive(pathname, item.href, pageBasePath);

              return (
                <Link
                  key={item.href}
                  href={`${pageBasePath}${item.href}`}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition duration-300 ${
                    active
                      ? 'bg-[#ffe9e2] text-[#1d2340] shadow-[0_8px_18px_rgba(255,127,102,0.14)]'
                      : 'text-[#5f6788] hover:text-[#1d2340]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden flex-none items-center gap-3 lg:flex">
            <div className="rounded-full border border-[#f1dcd4] bg-white p-1 shadow-[0_8px_24px_rgba(32,43,69,0.06)]">
              <Link
                href="/zh/"
                className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition ${
                  locale === 'zh' ? 'bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] text-white shadow-[0_10px_20px_rgba(255,127,102,0.2)]' : 'text-[#6c7391] hover:text-[#1d2340]'
                }`}
              >
                CN
              </Link>
              <Link
                href="/en/"
                className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition ${
                  locale === 'en' ? 'bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] text-white shadow-[0_10px_20px_rgba(255,127,102,0.2)]' : 'text-[#6c7391] hover:text-[#1d2340]'
                }`}
              >
                EN
              </Link>
            </div>

            <Link
              href={contactHref}
              className="rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-5 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(14,165,233,0.2)] transition duration-300 hover:-translate-y-0.5"
            >
              {contactLabelFull}
            </Link>
          </div>

          <div className="flex flex-none items-center gap-2 lg:hidden">
            <div className="rounded-full border border-[#f1dcd4] bg-white p-1 shadow-[0_8px_24px_rgba(32,43,69,0.06)]">
              <Link
                href="/zh/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] transition ${
                  locale === 'zh' ? 'bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] text-white shadow-[0_8px_18px_rgba(255,127,102,0.2)]' : 'text-[#6c7391]'
                }`}
              >
                CN
              </Link>
              <Link
                href="/en/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] transition ${
                  locale === 'en' ? 'bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] text-white shadow-[0_8px_18px_rgba(255,127,102,0.2)]' : 'text-[#6c7391]'
                }`}
              >
                EN
              </Link>
            </div>

            <Link
              href={contactHref}
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(14,165,233,0.2)]"
            >
              {contactLabel}
            </Link>

            <button
              type="button"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMobileMenuOpen ? (locale === 'zh' ? '收起菜单' : 'Collapse menu') : locale === 'zh' ? '展开菜单' : 'Expand menu'}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ece1d9] bg-white/95 text-[#5f6788] shadow-[0_8px_18px_rgba(32,43,69,0.04)]"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <nav id="mobile-nav" className="mt-3 grid grid-cols-3 gap-2 lg:hidden">
            {navItems.map((item) => {
              const active = isNavItemActive(pathname, item.href, pageBasePath);

              return (
                <Link
                  key={item.href}
                  href={`${pageBasePath}${item.href}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-2xl border bg-white/95 px-2 py-2 text-center text-xs font-medium shadow-[0_8px_18px_rgba(32,43,69,0.04)] ${
                    active ? 'border-[#ffcabd] text-[#1d2340]' : 'border-[#ece1d9] text-[#5f6788]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
