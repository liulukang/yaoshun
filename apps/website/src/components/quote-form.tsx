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
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const supportText = t(locale, sharedUi.quoteForm.support)
    .replace('{email}', companyProfile.email)
    .replace('{whatsapp}', companyProfile.whatsapp);
  const submitFeedback =
    locale === 'zh'
      ? {
          success: '提交成功，已通过邮件创建 Tawk 工单，我们会尽快联系你。',
          error: '提交失败，请稍后重试或直接通过邮箱/WhatsApp 联系我们。'
        }
      : {
          success: 'Submitted successfully. A Tawk ticket has been created via email and our team will follow up soon.',
          error: 'Submission failed. Please try again or contact us directly via email/WhatsApp.'
        };

  function handleFirstInteraction() {
    if (submitState !== 'idle') {
      setSubmitState('idle');
    }

    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackEvent('quote_form_start', {
      form_location: 'contact_page',
      locale,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState('submitting');
    const formElement = event.currentTarget;

    const formData = new FormData(formElement);
    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const message = String(formData.get('message') ?? '').trim();
    const leadId = `lead-${Date.now().toString(36)}`;
    let ticketDelivered = false;

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          locale
        })
      });

      ticketDelivered = response.ok;
    } catch {
      ticketDelivered = false;
    }

    trackEvent('generate_lead', {
      form_location: 'contact_page',
      locale,
      has_name: Boolean(name),
      has_email: Boolean(email),
      has_message: Boolean(message),
      message_length: message.length,
      lead_id: leadId,
      tawk_ticket_delivered: ticketDelivered,
    });

    if (ticketDelivered) {
      setSubmitState('success');
      formElement.reset();
      return;
    }

    setSubmitState('error');
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
          <label className="space-y-2">
            <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.name.label)}</span>
            <input className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3 text-sm outline-none ring-0 transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/30 sm:px-6 sm:py-4 sm:text-base" name="name" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.name.placeholder)} required type="text" />
          </label>
          <label className="space-y-2">
            <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.email.label)}</span>
            <input className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3 text-sm outline-none ring-0 transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/30 sm:px-6 sm:py-4 sm:text-base" name="email" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.email.placeholder)} required type="email" />
          </label>
          <label className="space-y-2">
            <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{t(locale, sharedUi.quoteForm.fields.message.label)}</span>
            <textarea className="w-full rounded-xl border border-outline-variant/45 bg-white px-4 py-3 text-sm outline-none ring-0 transition-all focus:border-secondary focus:ring-2 focus:ring-secondary/30 sm:px-6 sm:py-4 sm:text-base" name="message" onFocus={handleFirstInteraction} placeholder={t(locale, sharedUi.quoteForm.fields.message.placeholder)} required rows={6} />
          </label>
          <button className="flex w-full items-center justify-center gap-3 rounded-full bg-secondary py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-on-secondary-fixed-variant disabled:cursor-not-allowed disabled:opacity-70 sm:py-5 sm:text-lg" data-track-event="quote_form_submit_click" data-track-label="contact_form" data-track-location="contact_page" disabled={submitState === 'submitting'} type="submit">
            {t(locale, sharedUi.quoteForm.submit)}
            <span>{'->'}</span>
          </button>
          {submitState === 'success' ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-700">{submitFeedback.success}</p>
          ) : null}
          {submitState === 'error' ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">{submitFeedback.error}</p>
          ) : null}
          <p className="text-center text-[11px] leading-relaxed text-outline sm:text-xs">{supportText}</p>
        </form>
      </div>
    </div>
  );
}
