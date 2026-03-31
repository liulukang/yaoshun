import {notFound} from 'next/navigation';

import {EnterpriseFooter} from '@/components/layout/enterprise-footer';
import {EnterpriseHeader} from '@/components/layout/enterprise-header';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export function generateStaticParams(): Array<{locale: string}> {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export default async function LocaleLayout({children, params}: LocaleLayoutProps) {
  const {locale} = await params;

  if (locale !== 'en' && locale !== 'zh') {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <EnterpriseHeader locale={locale} />
      <main className="section-shell flex-1 py-8 sm:py-10">{children}</main>
      <EnterpriseFooter locale={locale} />
    </div>
  );
}
