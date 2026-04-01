import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';

import {GoogleAnalytics} from '@/components/analytics/google-analytics';
import {EnterpriseFooter} from '@/components/layout/enterprise-footer';
import {EnterpriseHeader} from '@/components/layout/enterprise-header';
import {CookieBanner} from '@/components/ui/cookie-banner';
import {isLocale, locales} from '@/i18n/config';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export function generateStaticParams(): Array<{locale: string}> {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({locale});

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex min-h-screen flex-col">
        <GoogleAnalytics />
        <EnterpriseHeader locale={locale} />
        <main className="flex-1">{children}</main>
        <EnterpriseFooter locale={locale} />
        <CookieBanner />
      </div>
    </NextIntlClientProvider>
  );
}
