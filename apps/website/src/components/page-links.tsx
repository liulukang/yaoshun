import Link from 'next/link';

import {pageLabels, type LocalizedText, routeJourneys} from '@/data/site';
import {t, type Locale} from '@/lib/i18n';
import {localizedPath, type RouteKey} from '@/lib/routes';

type PageLinksProps = {
  locale: Locale;
  route: RouteKey;
  title: LocalizedText;
  description: LocalizedText;
};

export function PageLinks({locale, route, title, description}: PageLinksProps) {
  return (
    <section className="mt-14 rounded-[2rem] bg-surface-container-low p-5 sm:mt-16 sm:p-6 md:p-10 lg:mt-20 md:rounded-[2rem]">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="max-w-2xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-secondary">{locale === 'en' ? 'Continue Exploring' : '继续浏览'}</p>
          <h3 className="mt-3 font-headline text-2xl font-extrabold tracking-tighter text-primary sm:text-3xl">{t(locale, title)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant sm:mt-3 sm:text-base">{t(locale, description)}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
        {routeJourneys[route].map((item) => (
          <Link
            key={item}
            className="group rounded-[1.5rem] border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 sm:p-6"
            href={localizedPath(locale, item)}
          >
            <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-outline">{locale === 'en' ? 'Open Page' : '打开页面'}</p>
            <div className="mt-3 flex items-center justify-between gap-4 sm:mt-4">
              <h4 className="font-headline text-lg font-bold text-primary sm:text-xl">{t(locale, pageLabels[item])}</h4>
              <span className="text-secondary transition-transform group-hover:translate-x-1">{'->'}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
