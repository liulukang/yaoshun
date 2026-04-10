import {cookies, headers} from 'next/headers';
import {redirect} from 'next/navigation';

import {localeCookieName, resolvePreferredLocale} from '@/lib/i18n';

export default async function RootPage() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = resolvePreferredLocale({
    cookieLocale: cookieStore.get(localeCookieName)?.value ?? null,
    acceptLanguage: headerStore.get('accept-language')
  });

  redirect(`/${locale}`);
}
