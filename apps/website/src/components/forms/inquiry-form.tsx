'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

import {pushDataLayerEvent} from '@/lib/gtag';
import type {Locale} from '@/types/content';

interface InquiryFormProps {
  locale: Locale;
  source?: string;
  formName?: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const MIN_FILL_MS = 1800;
const THROTTLE_MS = 30_000;
const LAST_SUBMIT_KEY = 'yaoshun_inquiry_last_submit';

export function InquiryForm({locale, source = 'website-contact-form', formName = 'contact'}: InquiryFormProps) {
  const t = useTranslations('InquiryForm');
  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT?.trim() ?? '';
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [startedAt] = useState<number>(() => Date.now());

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = String(formData.get('website') ?? '').trim();
    if (honeypot) {
      setStatus('success');
      return;
    }

    if (Date.now() - startedAt < MIN_FILL_MS) {
      setStatus('error');
      setErrorMessage(t('tooFast'));
      return;
    }

    try {
      const lastSubmit = Number(localStorage.getItem(LAST_SUBMIT_KEY) ?? 0);
      if (lastSubmit > 0 && Date.now() - lastSubmit < THROTTLE_MS) {
        setStatus('error');
        setErrorMessage(t('rateLimited'));
        return;
      }
    } catch {
      // Ignore localStorage edge cases (private mode / disabled storage).
    }

    if (!endpoint) {
      setStatus('error');
      setErrorMessage(t('missingEndpoint'));
      return;
    }

    formData.append('locale', locale);
    formData.append('source', source);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      try {
        localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
      } catch {
        // Best effort only.
      }

      setStatus('success');
      form.reset();
      pushDataLayerEvent('form_submit', {
        form_name: formName,
        form_locale: locale,
        submit_status: 'success'
      });
    } catch {
      setStatus('error');
      setErrorMessage(t('error'));
      pushDataLayerEvent('form_submit', {
        form_name: formName,
        form_locale: locale,
        submit_status: 'error'
      });
    }
  }

  return (
    <form className="panel-card space-y-4" onSubmit={onSubmit} noValidate>
      <h2 className="font-heading text-2xl text-[#1d2340]">{t('title')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[#5f6788]">
          <span>{t('name')}</span>
          <input name="name" required className="w-full rounded-2xl border border-[#d9deef] bg-white px-4 py-2.5 text-sm text-[#1d2340]" />
        </label>

        <label className="space-y-2 text-sm text-[#5f6788]">
          <span>{t('email')}</span>
          <input type="email" name="email" required className="w-full rounded-2xl border border-[#d9deef] bg-white px-4 py-2.5 text-sm text-[#1d2340]" />
        </label>
      </div>

      <label className="space-y-2 text-sm text-[#5f6788]">
        <span>{t('message')}</span>
        <textarea name="message" required rows={5} className="w-full rounded-2xl border border-[#d9deef] bg-white px-4 py-3 text-sm text-[#1d2340]" />
      </label>

      <label className="hidden" aria-hidden="true">
        <span>Website</span>
        <input tabIndex={-1} autoComplete="off" name="website" />
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#1fd1c2,#0ea5e9)] px-6 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>

      {status === 'success' ? <p className="text-sm text-emerald-700">{t('success')}</p> : null}
      {status === 'error' ? <p className="text-sm text-rose-700">{errorMessage ?? t('error')}</p> : null}
    </form>
  );
}
