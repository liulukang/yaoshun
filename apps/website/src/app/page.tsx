import {redirect} from 'next/navigation';

import {getLocaleRootPath} from '@/i18n/config';

export default function RootPage() {
  redirect(getLocaleRootPath('en'));
}
