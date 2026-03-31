'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';

const CONSENT_KEY = 'yaoshun_cookie_consent';

export function CookieBanner() {
  const t = useTranslations('Cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const saveConsent = (value: 'essential' | 'all') => {
    localStorage.setItem(CONSENT_KEY, value);
    document.cookie = `yaoshun_cookie_consent=${value}; max-age=31536000; path=/; samesite=lax`;
    window.dispatchEvent(new Event('cookie-consent-updated'));
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[min(960px,calc(100%-1.5rem))] -translate-x-1/2 rounded-xl2 border border-brand-200 bg-white p-4 shadow-soft">
      <p className="mb-1 font-semibold text-brand-800">{t('title')}</p>
      <p className="text-sm text-slate-600">{t('description')}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => saveConsent('essential')}
          className="rounded-full border border-brand-200 px-4 py-2 text-xs font-semibold text-brand-700"
        >
          {t('essential')}
        </button>
        <button
          type="button"
          onClick={() => saveConsent('all')}
          className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white"
        >
          {t('acceptAll')}
        </button>
      </div>
    </div>
  );
}
