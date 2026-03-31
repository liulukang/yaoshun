import Link from 'next/link';

import {homepageContent, siteName} from '@/content/home-content';
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
  const pageBasePath = basePath ?? localeRoot(locale);

  return (
    <footer className="relative overflow-hidden border-t border-[#ebe6f4] bg-[linear-gradient(180deg,#fff8f3_0%,#f8fbff_100%)] text-[#1d2340]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_12%_20%,rgba(255,127,102,0.16),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(118,225,255,0.2),transparent_28%)]" />

      <div className="section-shell relative py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-xl">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] font-heading text-sm font-semibold tracking-[0.24em] text-white shadow-[0_14px_28px_rgba(255,127,102,0.22)]">
                AT
              </span>
              <div>
                <p className="font-heading text-sm uppercase tracking-[0.3em] text-[#ff6b57]">{siteName}</p>
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
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-heading text-sm uppercase tracking-[0.22em] text-[#ff6b57]">{locale === 'zh' ? '首页导航' : 'Homepage Nav'}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {content.nav.map((item) => (
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

      <div className="relative border-t border-[#ebe6f4] bg-white/55">
        <div className="section-shell flex flex-col gap-3 py-5 text-sm text-[#7b819d] sm:flex-row sm:items-center sm:justify-between">
          <p>{content.footer.copyright}</p>
          <p>{locale === 'zh' ? '首页演示版，支持继续扩展为完整官网。' : 'Homepage demo, ready to expand into a full corporate site.'}</p>
        </div>
      </div>
    </footer>
  );
}
