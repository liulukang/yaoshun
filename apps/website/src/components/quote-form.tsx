'use client';

import {type FormEvent, useState} from 'react';

import {companyProfile, sharedUi} from '@/content/site';
import {trackEvent} from '@/lib/analytics';
import {t, type Locale} from '@/lib/i18n';

type QuoteFormProps = {
  locale: Locale;
};

export function QuoteForm({locale}: QuoteFormProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const supportText = t(locale, sharedUi.quoteForm.support)
    .replace('{email}', companyProfile.email)
    .replace('{whatsapp}', companyProfile.whatsapp);

  function handleFirstInteraction() {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackEvent('quote_form_start', {
      form_location: 'contact_page',
      locale,
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') ?? '').trim();
    const company = String(formData.get('company') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const country = String(formData.get('country') ?? '').trim();
    const quantity = String(formData.get('quantity') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();

    trackEvent('generate_lead', {
      form_location: 'contact_page',
      locale,
      has_name: Boolean(name),
      has_company: Boolean(company),
      has_email: Boolean(email),
      has_country: Boolean(country),
      has_quantity: Boolean(quantity),
      has_message: Boolean(message),
      message_length: message.length,
    });
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-float sm:p-6 lg:p-12">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/5" />
      <div className="relative z-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">{t(locale, sharedUi.quoteForm.title)}</h2>
            <p className="mt-1.5 text-sm text-on-surface-variant sm:mt-2 sm:text-base">{t(locale, sharedUi.quoteForm.description)}</p>
          </div>
          <div className="sm:text-right">
            <span className="font-label text-xs font-bold text-secondary sm:text-sm">{t(locale, sharedUi.quoteForm.step)}</span>
            <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-surface-container-high sm:w-32">
              <div className="h-full w-1/2 bg-secondary" />
            </div>
          </div>
        </div>

        <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
            <label className="space-y-2">
              <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.name.label)}</span>
              <input className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" name="name" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.name.placeholder)} type="text" />
            </label>
            <label className="space-y-2">
              <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.company.label)}</span>
              <input className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" name="company" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.company.placeholder)} type="text" />
            </label>
            <label className="space-y-2">
              <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.email.label)}</span>
              <input className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" name="email" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.email.placeholder)} type="email" />
            </label>
            <label className="space-y-2">
              <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.country.label)}</span>
              <input className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" name="country" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.country.placeholder)} type="text" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.quantity.label)}</span>
              <input className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" name="quantity" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.quantity.placeholder)} type="text" />
            </label>
          </div>
          <label className="space-y-2">
            <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.message.label)}</span>
            <textarea className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" name="message" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.message.placeholder)} rows={5} />
          </label>
          <button className="flex w-full items-center justify-center gap-3 rounded-full bg-secondary py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-on-secondary-fixed-variant sm:py-5 sm:text-lg" data-track-event="quote_form_submit_click" data-track-label="contact_form" data-track-location="contact_page" type="submit">
            {t(locale, sharedUi.quoteForm.submit)}
            <span>{'->'}</span>
          </button>
          <p className="text-center text-[11px] leading-relaxed text-outline sm:text-xs">{supportText}</p>
        </form>
      </div>
    </div>
  );
}
