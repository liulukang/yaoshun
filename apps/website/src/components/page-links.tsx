import Link from 'next/link';

import {pageLabels, routeJourneys, sharedUi, type LocalizedText} from '@/content/site';
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
    <section className="mt-10 rounded-[2rem] bg-surface-container-low p-5 sm:mt-12 sm:p-6 md:p-8 lg:mt-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="max-w-2xl">
          <p className="font-label text-xs font-bold uppercase tracking-[0.24em] text-secondary">{t(locale, sharedUi.pageLinks.eyebrow)}</p>
          <h3 className="mt-3 font-headline text-2xl font-extrabold tracking-tighter text-primary sm:text-3xl">{t(locale, title)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-on-surface-variant sm:mt-3 sm:text-base">{t(locale, description)}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3">
        {routeJourneys[route].map((item) => (
          <Link
            key={item}
            className="group rounded-[1.5rem] border border-outline-variant/40 bg-surface-container-lowest p-5 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-secondary/40 sm:p-6"
            data-track-event="journey_link_click"
            data-track-label={item}
            data-track-location={route}
            href={localizedPath(locale, item)}
          >
            <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-outline">{t(locale, sharedUi.pageLinks.action)}</p>
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
