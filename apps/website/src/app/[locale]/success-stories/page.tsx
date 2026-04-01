import Image from 'next/image';
import type {Metadata} from 'next';

import {getSiteName, partnerStories, seoKeywords} from '@/content/site-content';
import {getLocalizedText} from '@/lib/locale';
import {createPageMetadata} from '@/lib/seo';
import type {Locale} from '@/types/content';

interface SuccessStoriesPageProps {
  params: Promise<{locale: Locale}>;
}

const extraStory = {
  id: 'middle-east-gift',
  partner: 'Middle East Gift Distribution Network',
  region: 'UAE',
  orderScale: '2 seasonal launches per year',
  outcome: {
    en: 'Completed localized packaging and bilingual content adaptation for recurring holiday campaigns.',
    zh: '完成本地化包装与双语内容适配，连续支持节日档期复购项目。'
  }
};

const storyImageById: Record<string, string> = {
  'eu-retailer': '/images/generated/story-eu-retail.jpg',
  'north-america-chain': '/images/generated/story-na-education.jpg',
  'middle-east-gift': '/images/generated/story-me-gift.jpg'
};

export async function generateMetadata({params}: SuccessStoriesPageProps): Promise<Metadata> {
  const {locale} = await params;
  const brandName = getSiteName(locale);

  return createPageMetadata({
    locale,
    path: '/success-stories',
    title: locale === 'zh' ? `${brandName} | 成功案例` : `${brandName} | Success Stories`,
    description:
      locale === 'zh'
        ? '查看尧顺在欧洲、北美与中东渠道项目中的交付成果与合作模式。'
        : 'Review yaoshun delivery outcomes and collaboration models across Europe, North America and Middle East projects.',
    keywords: seoKeywords
  });
}

export default async function SuccessStoriesPage({params}: SuccessStoriesPageProps) {
  const {locale} = await params;
  const isZh = locale === 'zh';
  const stories = [...partnerStories, extraStory];

  return (
    <section className="section-shell py-14 sm:py-20">
      <div className="panel-card">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6b57]">Success Stories</p>
        <h1 className="mt-3 font-heading text-3xl text-[#1d2340] sm:text-4xl">{isZh ? '合作案例与交付结果' : 'Project Cases and Delivery Results'}</h1>
        <p className="mt-4 max-w-4xl text-sm leading-7 text-[#5c6384]">
          {isZh
            ? '以下案例基于真实合作路径整理，帮助新客户快速了解我们的执行节奏与项目稳定性。'
            : 'The cases below reflect real collaboration paths and help new buyers evaluate execution rhythm and delivery stability.'}
        </p>
        <div className="mt-6 overflow-hidden rounded-3xl border border-[#e8edf8] bg-white">
          <Image
            src="/images/generated/factory-production-line.jpg"
            alt={isZh ? '尧顺工厂生产线场景' : 'yaoshun production line scene'}
            width={1024}
            height={576}
            className="h-52 w-full object-cover sm:h-64"
          />
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {stories.map((story, index) => (
          <article key={story.id} className={`story-card story-card-${index % 3 === 0 ? 'peach' : index % 3 === 1 ? 'sky' : 'violet'}`}>
            <Image
              src={storyImageById[story.id] ?? '/images/generated/factory-production-line.jpg'}
              alt={story.partner}
              width={1024}
              height={576}
              className="h-36 w-full rounded-2xl border border-[#f1f3fb] object-cover"
            />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#7b819d]">{story.region}</p>
            <h2 className="mt-3 font-heading text-2xl text-[#1d2340]">{story.partner}</h2>
            <p className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#ff6b57]">{story.orderScale}</p>
            <p className="mt-4 text-sm leading-7 text-[#4f5878]">{getLocalizedText(story.outcome, locale)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
