import Link from 'next/link';

import {homepageContent, siteName} from '@/content/home-content';
import type {Locale} from '@/types/content';

interface EnterpriseHeaderProps {
  locale: Locale;
  basePath?: string;
}

function localeRoot(locale: Locale): string {
  return locale === 'zh' ? '/zh/' : '/en/';
}

export function EnterpriseHeader({locale, basePath}: EnterpriseHeaderProps) {
  const content = homepageContent[locale];
  const pageBasePath = basePath ?? localeRoot(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-[#f2d9cf] bg-[rgba(255,252,248,0.82)] backdrop-blur-xl">
      <div className="section-shell flex items-center justify-between gap-6 py-4">
        <Link href={pageBasePath} className="group inline-flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[1.2rem] border border-[#ffd4c8] bg-[linear-gradient(135deg,#ff7f66,#ffb36b)] text-sm font-semibold tracking-[0.28em] text-white shadow-[0_12px_24px_rgba(255,127,102,0.24)] transition duration-300 group-hover:-translate-y-0.5">
            AT
          </span>
          <div>
            <p className="font-heading text-sm uppercase tracking-[0.28em] text-[#ff6b57]">Toy Manufacturing</p>
            <p className="font-heading text-lg text-[#1d2340]">{siteName}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {content.nav.map((item) => (
            <Link
              key={item.href}
              href={`${pageBasePath}${item.href}`}
              className="text-sm font-medium text-[#5f6788] transition duration-300 hover:text-[#1d2340]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-full border border-[#f1dcd4] bg-white p-1 shadow-[0_8px_24px_rgba(32,43,69,0.06)] sm:flex">
            <Link
              href="/zh/"
              className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition ${
                locale === 'zh' ? 'bg-[#1d2340] text-white' : 'text-[#6c7391] hover:text-[#1d2340]'
              }`}
            >
              CN
            </Link>
            <Link
              href="/en/"
              className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] transition ${
                locale === 'en' ? 'bg-[#1d2340] text-white' : 'text-[#6c7391] hover:text-[#1d2340]'
              }`}
            >
              EN
            </Link>
          </div>

          <Link
            href={`${pageBasePath}#contact`}
            className="rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-5 py-2 text-sm font-semibold text-white shadow-[0_14px_26px_rgba(14,165,233,0.22)] transition duration-300 hover:-translate-y-0.5"
          >
            {locale === 'zh' ? '立即咨询' : 'Inquire Now'}
          </Link>
        </div>
      </div>
    </header>
  );
}
