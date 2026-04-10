import type {Metadata} from 'next';

import {PageLinks} from '@/components/page-links';
import {QuoteForm} from '@/components/quote-form';
import {SectionHeading} from '@/components/section-heading';
import {companyProfile, contactContent} from '@/content/site';
import {getLocaleFromParams, t} from '@/lib/i18n';
import {buildMetadata} from '@/lib/metadata';

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const locale = await getLocaleFromParams(params);
  return buildMetadata(
    locale,
    t(locale, contactContent.seo.title),
    t(locale, contactContent.seo.description),
    'contact',
    t(locale, contactContent.seo.keywords)
  );
}

export default async function ContactPage({params}: {params: Promise<{locale: string}>}) {
  const locale = await getLocaleFromParams(params);
  const businessIdentity = [
    {label: contactContent.businessIdentityFields.companyName, value: companyProfile.companyName},
    {label: contactContent.businessIdentityFields.phone, value: {en: companyProfile.phone, zh: companyProfile.phone}},
    {label: contactContent.businessIdentityFields.email, value: {en: companyProfile.email, zh: companyProfile.email}},
    {label: contactContent.businessIdentityFields.address, value: companyProfile.address}
  ];

  return (
    <div className="desktop-shell px-4 pb-16 sm:px-6 sm:pb-20 xl:px-8">
      <main className="pb-16 pt-20 sm:pb-20 sm:pt-24">
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-8 lg:col-span-7 lg:space-y-10">
            <div>
              <span className="inline-block rounded-full bg-primary-fixed px-4 py-1.5 font-label text-xs font-bold uppercase tracking-widest text-on-primary-fixed">{t(locale, contactContent.hero.eyebrow)}</span>
              <h1 className="hero-title mt-4 font-headline text-4xl font-extrabold leading-[1.02] tracking-tighter text-primary sm:text-5xl lg:text-6xl">{t(locale, contactContent.hero.title)}</h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-surface-variant sm:text-lg">{t(locale, contactContent.hero.description)}</p>
            </div>

            <div className="rounded-[1.5rem] border border-outline-variant/20 bg-surface-container-low p-5 sm:p-6 lg:p-8">
              <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{t(locale, contactContent.responseGoal.title)}</h2>
              <p className="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">{t(locale, contactContent.responseGoal.text)}</p>
            </div>

            <div>
              <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{t(locale, contactContent.serviceCommitmentSection.title)}</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {contactContent.serviceCommitmentSection.items.map((item) => (
                  <article key={t(locale, item.title)} className="rounded-[1.25rem] border border-outline-variant/20 bg-white p-5 shadow-panel">
                    <h3 className="font-headline text-lg font-bold text-primary">{t(locale, item.title)}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <QuoteForm locale={locale} />
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] bg-surface-container-low p-5 sm:mt-16 sm:p-6 lg:mt-20 lg:p-10">
          <SectionHeading
            description={contactContent.quoteFlowSection.description}
            locale={locale}
            title={contactContent.quoteFlowSection.title}
          />
          <div className="mt-6 grid gap-4 sm:mt-8 sm:gap-5 xl:grid-cols-4">
            {contactContent.quoteFlowSection.steps.map((item, index) => (
              <article key={t(locale, item.title)} className="rounded-[1.25rem] border border-outline-variant/20 bg-white p-5 shadow-panel sm:p-6">
                <p className="font-label text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">0{index + 1}</p>
                <h3 className="mt-2 font-headline text-xl font-bold text-primary">{t(locale, item.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <div className="rounded-[2rem] border border-outline-variant/20 bg-white p-6 shadow-panel sm:p-8 lg:col-span-7">
            <h2 className="font-headline text-2xl font-bold text-primary sm:text-3xl">{t(locale, contactContent.quoteChecklistSection.title)}</h2>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant sm:text-base">{t(locale, contactContent.quoteChecklistSection.description)}</p>
            <div className="mt-5 grid gap-4 sm:mt-6 sm:gap-5 md:grid-cols-2">
              {contactContent.quoteChecklistSection.items.map((item) => (
                <article key={t(locale, item.title)} className="rounded-xl bg-surface-container-low p-4 sm:p-5">
                  <h3 className="font-bold text-primary">{t(locale, item.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{t(locale, item.text)}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] bg-primary p-6 text-white shadow-panel sm:p-8 lg:col-span-5">
            <p className="font-label text-xs font-bold uppercase tracking-[0.2em] text-primary-fixed">{t(locale, contactContent.businessIdentityLabel)}</p>
            <div className="mt-4 space-y-4">
              {businessIdentity.map((item) => (
                <div key={t(locale, item.label)} className="rounded-xl bg-white/10 p-4">
                  <p className="font-label text-[10px] font-bold uppercase tracking-[0.18em] text-primary-fixed">{t(locale, item.label)}</p>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-white">{t(locale, item.value)}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-12 sm:mt-16 lg:mt-20">
          <p className="mb-4 font-label text-xs font-bold uppercase tracking-widest text-outline sm:mb-6">{t(locale, contactContent.directChannelsLabel)}</p>
          <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
            {contactContent.channels.map((item) => (
              <a
                key={item.href}
                className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-4 transition-all hover:shadow-xl sm:p-5"
                data-track-event={item.href.startsWith('https://wa.me') ? 'whatsapp_click' : item.href.startsWith('mailto:') ? 'email_click' : 'external_link_click'}
                data-track-label={item.value}
                data-track-location="contact_channels"
                href={item.href}
                rel="noreferrer"
                target="_blank"
              >
                <div className="h-10 w-10 rounded-full bg-secondary-fixed sm:h-12 sm:w-12" />
                <div>
                  <p className="font-label text-xs font-bold uppercase text-outline">{t(locale, item.label)}</p>
                  <p className="text-sm font-bold text-primary transition-colors group-hover:text-secondary sm:text-base">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <PageLinks
        description={contactContent.journey.description}
        locale={locale}
        route="contact"
        title={contactContent.journey.title}
      />
    </div>
  );
}
