import Image from 'next/image';
import {Boxes} from 'lucide-react';

import type {HomeSectionRenderProps} from '@/components/page-builder/section-registry';
import {SectionHeading} from '@/components/ui/section-heading';

const storyImages = ['/images/generated/story-eu-retail.jpg', '/images/generated/story-na-education.jpg', '/images/generated/story-me-gift.jpg'];

export function StoriesCards({content}: HomeSectionRenderProps) {
  return (
    <div>
      <SectionHeading eyebrow={content.stories.eyebrow} title={content.stories.title} description={content.stories.description} />
      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {content.stories.items.map((item, index) => (
          <article key={item.title} className={`story-card ${index % 3 === 0 ? 'story-card-peach' : index % 3 === 1 ? 'story-card-sky' : 'story-card-violet'}`}>
            <div className="mb-4 overflow-hidden rounded-2xl border border-white/80">
              <Image
                src={storyImages[index % storyImages.length]}
                alt={item.title}
                width={1024}
                height={576}
                className="h-40 w-full object-cover"
              />
            </div>
            <Boxes className="h-5 w-5 text-[#1d2340]" />
            <h3 className="mt-4 font-heading text-xl text-[#1d2340]">{item.title}</h3>
            <p className="mt-3 inline-flex rounded-full border border-[#ffe0d8] bg-white px-3 py-1 text-sm text-[#ff6b57]">{item.result}</p>
            <p className="mt-3 text-sm leading-7 text-[#4f5878]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function StoriesRibbon({content}: HomeSectionRenderProps) {
  return (
    <div className="panel-card checklist-card">
      <SectionHeading eyebrow={content.stories.eyebrow} title={content.stories.title} description={content.stories.description} />
      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {content.stories.items.map((item, index) => (
          <article key={item.title} className="rounded-3xl border border-[#e8edf8] bg-white/92 p-5 shadow-[0_16px_34px_rgba(92,100,138,0.08)]">
            <Image
              src={storyImages[index % storyImages.length]}
              alt={item.title}
              width={1024}
              height={576}
              className="h-36 w-full rounded-2xl border border-[#f0f3fb] object-cover"
            />
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#ff8f7f]">Case</p>
            <h3 className="mt-2 font-heading text-xl text-[#1d2340]">{item.title}</h3>
            <p className="mt-3 text-sm font-semibold text-[#ff6b57]">{item.result}</p>
            <p className="mt-3 text-sm leading-7 text-[#4f5878]">{item.detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
