import {SiteShell} from '@/components/site-shell';
import {getLocaleFromParams, locales} from '@/lib/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const locale = await getLocaleFromParams(params);

  return <SiteShell locale={locale}>{children}</SiteShell>;
}
