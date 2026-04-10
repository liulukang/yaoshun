import {redirect} from 'next/navigation';

import {getLocaleFromParams} from '@/lib/i18n';
import {localizedPath} from '@/lib/routes';

export default async function LegacyOemOdmPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);
  redirect(localizedPath(locale, 'solutions'));
}
