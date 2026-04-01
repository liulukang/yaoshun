import Link from 'next/link';

import {getSiteName, homepageContent} from '@/content/home-content';
import type {Locale} from '@/types/content';

interface EnterpriseFooterProps {
  locale: Locale;
  basePath?: string;
}

function localeRoot(locale: Locale): string {
  return locale === 'zh' ? '/zh/' : '/en/';
}

export function EnterpriseFooter({locale, basePath}: EnterpriseFooterProps) {
  const content = homepageContent[locale];
  const brandName = getSiteName(locale);
  const pageBasePath = basePath ?? localeRoot(locale);
  const navItems = content.nav.slice(0, 6);
  const contactHref = `${pageBasePath}contact`;

  return (
    <footer className="relative overflow-hidden border-t border-[#e9ddd2] bg-[linear-gradient(180deg,#fff6ee_0%,#f9ebdf_100%)] text-[#1d2340]">
      <div className="section-shell relative py-10 sm:py-16">
        <div className="grid gap-4 sm:hidden">
          <div className="rounded-3xl border border-[#eadfd6] bg-white/70 p-4 shadow-[0_16px_32px_rgba(75,88,128,0.08)]">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] font-heading text-sm font-semibold tracking-[0.2em] text-white">
                AT
              </span>
              <div>
                <p className="font-heading text-sm uppercase tracking-[0.14em] text-[#ff6b57]">{brandName}</p>
                <p className="mt-2 text-sm leading-6 text-[#5c6384]">{content.footer.summary}</p>
              </div>
            </div>
            <Link
              href={contactHref}
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-4 py-2.5 text-sm font-semibold text-white"
            >
              {locale === 'zh' ? '提交询盘' : 'Send Inquiry'}
            </Link>
          </div>

          <div className="rounded-3xl border border-[#eadfd6] bg-white/70 p-4 shadow-[0_16px_32px_rgba(75,88,128,0.08)]">
            <p className="font-heading text-xs uppercase tracking-[0.14em] text-[#ff6b57]">{locale === 'zh' ? '首页导航' : 'Homepage Nav'}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={`${pageBasePath}${item.href}`}
                  className="rounded-xl border border-[#efe5dd] bg-white px-3 py-2 text-center text-xs font-medium text-[#5f6788]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#eadfd6] bg-white/70 p-4 shadow-[0_16px_32px_rgba(75,88,128,0.08)]">
            <p className="font-heading text-xs uppercase tracking-[0.14em] text-[#1d7fb8]">{locale === 'zh' ? '部署与合规' : 'Deployment & Legal'}</p>
            <div className="mt-3 space-y-2.5">
              {content.footer.legal.map((item) => (
                <p key={item} className="text-sm leading-6 text-[#5c6384]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href="/zh/" className="rounded-2xl border border-[#dfe3f1] bg-white px-4 py-2.5 text-center text-sm text-[#5f6788]">
              中文
            </Link>
            <Link href="/en/" className="rounded-2xl border border-[#dfe3f1] bg-white px-4 py-2.5 text-center text-sm text-[#5f6788]">
              English
            </Link>
          </div>
        </div>

        <div className="hidden gap-12 sm:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-xl">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] font-heading text-sm font-semibold tracking-[0.24em] text-white shadow-[0_14px_28px_rgba(255,127,102,0.22)]">
                AT
              </span>
              <div>
                <p className="font-heading text-sm uppercase tracking-[0.3em] text-[#ff6b57]">{brandName}</p>
                <p className="mt-3 text-sm leading-7 text-[#5c6384]">{content.footer.summary}</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/zh/"
                className="rounded-full border border-[#dfe3f1] bg-white px-4 py-2 text-sm text-[#5f6788] transition hover:-translate-y-0.5 hover:border-[#ffcec1] hover:text-[#1d2340]"
              >
                中文
              </Link>
              <Link
                href="/en/"
                className="rounded-full border border-[#dfe3f1] bg-white px-4 py-2 text-sm text-[#5f6788] transition hover:-translate-y-0.5 hover:border-[#cfeaf6] hover:text-[#1d2340]"
              >
                English
              </Link>
              <Link
                href={contactHref}
                className="rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(14,165,233,0.2)]"
              >
                {locale === 'zh' ? '提交询盘' : 'Send Inquiry'}
              </Link>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.22em] text-[#ff6b57]">{locale === 'zh' ? '首页导航' : 'Homepage Nav'}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`${pageBasePath}${item.href}`}
                    className="py-2 text-sm text-[#5f6788] transition hover:text-[#1d2340]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="font-heading text-sm uppercase tracking-[0.22em] text-[#1d7fb8]">{locale === 'zh' ? '部署与合规' : 'Deployment & Legal'}</p>
              <div className="mt-4 space-y-3">
                {content.footer.legal.map((item) => (
                  <p key={item} className="text-sm leading-7 text-[#5c6384]">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="section-shell flex flex-col gap-3 py-5 text-xs text-[#7b819d] sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>{content.footer.copyright}</p>
          <p>{locale === 'zh' ? '专注全球玩具外贸合作，欢迎提交产品需求与目标市场。' : 'Focused on global toy export cooperation. Share your target market and product requirements.'}</p>
        </div>
      </div>
    </footer>
  );
}
