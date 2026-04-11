'use client';

import {type FormEvent, useState} from 'react';

import {companyProfile, sharedUi} from '@/content/site';
import {reportGoogleAdsLeadConversion, trackEvent} from '@/lib/analytics';
import {t, type Locale} from '@/lib/i18n';

type QuoteFormProps = {
  locale: Locale;
};

export function QuoteForm({locale}: QuoteFormProps) {
  const [hasStarted, setHasStarted] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const isFeedbackVisible = submitState === 'success' || submitState === 'error';
  const isSuccess = submitState === 'success';
  const supportText = t(locale, sharedUi.quoteForm.support)
    .replace('{email}', companyProfile.email)
    .replace('{whatsapp}', companyProfile.whatsapp);
  const submitFeedback = {
    success: t(locale, {
      zh: '已收到你的咨询，感谢信任。我们的顾问会尽快与你取得联系，请留意邮箱或 WhatsApp 消息。',
      en: 'Thanks for your inquiry. Our consultant will contact you soon, please keep an eye on your email or WhatsApp.',
    }),
    error: t(locale, {
      zh: '提交失败，请稍后重试或直接通过邮箱/WhatsApp 联系我们。',
      en: 'Submission failed. Please try again or contact us directly via email/WhatsApp.',
    }),
  };
  const feedbackTitle = isSuccess
    ? t(locale, {
      zh: '感谢你的咨询',
      en: 'Submission Received',
    })
    : t(locale, {
      zh: '提交失败',
      en: 'Submission Failed',
    });
  const feedbackActionText = t(locale, {
    zh: '我知道了',
    en: 'Got it',
  });

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
      reportGoogleAdsLeadConversion({
        currency: 'CNY',
        value: 1,
      });
      setSubmitState('success');
      formElement.reset();
      return;
    }

    setSubmitState('error');
  }

  function handleDismissFeedback() {
    setSubmitState('idle');
  }

  return (
    <>
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
            <p className="text-center text-[11px] leading-relaxed text-outline sm:text-xs">{supportText}</p>
          </form>
        </div>
      </div>
      {isFeedbackVisible ? (
        <div aria-live="assertive" className="fixed inset-0 z-[90] flex items-center justify-center bg-primary/40 px-4 backdrop-blur-md" role="dialog">
          <div className={`relative w-full max-w-[520px] overflow-hidden rounded-[1.75rem] border bg-white shadow-[0_24px_65px_-20px_rgba(16,24,40,0.42)] ${isSuccess ? 'border-emerald-200' : 'border-red-200'}`}>
            <div className={`absolute inset-x-0 top-0 h-1.5 ${isSuccess ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500' : 'bg-gradient-to-r from-red-400 via-rose-500 to-red-500'}`} />
            <div className="relative p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg ${isSuccess ? 'bg-emerald-500 shadow-emerald-300/70' : 'bg-red-500 shadow-red-300/70'}`}>
                  {isSuccess ? '✓' : '!'}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-headline text-2xl font-black tracking-tight text-primary">{feedbackTitle}</h3>
                  <p className={`mt-2 text-sm leading-relaxed sm:text-base ${isSuccess ? 'text-emerald-800' : 'text-red-700'}`}>
                    {isSuccess ? submitFeedback.success : submitFeedback.error}
                  </p>
                </div>
              </div>
              <button className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01] sm:mt-7 sm:text-base ${isSuccess ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`} onClick={handleDismissFeedback} type="button">
                {feedbackActionText}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
