import {companyProfile} from '@/data/site';
import {t, type Locale} from '@/lib/i18n';

type QuoteFormProps = {
  locale: Locale;
};

export function QuoteForm({locale}: QuoteFormProps) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-5 shadow-float sm:p-6 lg:p-12">
      <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-secondary/5" />
      <div className="relative z-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">{locale === 'en' ? 'Request a Quote' : '获取报价'}</h2>
            <p className="mt-1.5 text-sm text-on-surface-variant sm:mt-2 sm:text-base">{locale === 'en' ? 'B2B Trade Inquiry Form' : 'B 端贸易询盘表单'}</p>
          </div>
          <div className="sm:text-right">
            <span className="font-label text-xs font-bold text-secondary sm:text-sm">{locale === 'en' ? 'STEP 1 OF 2' : '第 1 步 / 共 2 步'}</span>
            <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-surface-container-high sm:w-32">
              <div className="h-full w-1/2 bg-secondary" />
            </div>
          </div>
        </div>

        <form className="space-y-5 sm:space-y-6">
          <div className="grid gap-5 md:grid-cols-2 sm:gap-6">
            <label className="space-y-2">
              <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{locale === 'en' ? 'Name' : '姓名'}</span>
              <input className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" placeholder={locale === 'en' ? 'Your name' : '请输入姓名'} type="text" />
            </label>
            <label className="space-y-2">
              <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{locale === 'en' ? 'Email' : '邮箱'}</span>
              <input className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" placeholder={locale === 'en' ? 'you@company.com' : '请输入邮箱'} type="email" />
            </label>
          </div>
          <label className="space-y-2">
            <span className="ml-1 block font-label text-xs font-semibold text-primary sm:text-sm">{locale === 'en' ? 'Message' : '信息'}</span>
            <textarea className="w-full rounded-xl bg-surface-container-highest px-4 py-3 text-sm outline-none ring-0 transition-all focus:ring-2 focus:ring-secondary sm:px-6 sm:py-4 sm:text-base" placeholder={locale === 'en' ? 'Tell us about your project or inquiry...' : '请填写您的需求或咨询内容……'} rows={5} />
          </label>
          <button className="flex w-full items-center justify-center gap-3 rounded-full bg-secondary py-4 text-base font-bold text-white shadow-lg transition-all hover:scale-[1.01] hover:bg-on-secondary-fixed-variant sm:py-5 sm:text-lg" type="button">
            {locale === 'en' ? 'Send Project Brief' : '提交项目需求'}
            <span>{'->'}</span>
          </button>
          <p className="text-center text-[11px] leading-relaxed text-outline sm:text-xs">
            {locale === 'en'
              ? `For direct support you can also email ${companyProfile.email} or contact WhatsApp ${companyProfile.whatsapp}.`
              : `如需直接沟通，也可以发送邮件至 ${companyProfile.email} 或联系 WhatsApp ${companyProfile.whatsapp}。`}
          </p>
        </form>
      </div>
    </div>
  );
}
