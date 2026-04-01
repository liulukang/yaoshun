import {getRequestConfig} from 'next-intl/server';

import {isLocale} from '@/i18n/config';
import {routing} from '@/i18n/routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  if (!locale || !isLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
