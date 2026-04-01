import {homePageConfigs} from '@/content/page-config';
import {homepageContent} from '@/content/home-content';
import {RevealSection} from '@/components/page-builder/reveal-section';
import {resolveHomeSection} from '@/components/page-builder/section-registry';
import type {Locale} from '@/types/content';

interface EnterpriseHomepageProps {
  locale: Locale;
}

export function EnterpriseHomepage({locale}: EnterpriseHomepageProps) {
  const content = homepageContent[locale];
  const pageConfig = homePageConfigs[locale];

  return (
    <div className="homepage-playful overflow-hidden text-[#1d2340]">
      {pageConfig.sections.map((section) => {
        const SectionComponent = resolveHomeSection(section);

        return (
          <RevealSection
            key={section.id}
            id={section.anchor}
            className={section.anchor ? 'section-shell scroll-mt-28 py-14 sm:scroll-mt-32 sm:py-20' : 'section-shell py-12 sm:py-16'}
          >
            <SectionComponent locale={locale} content={content} section={section} />
          </RevealSection>
        );
      })}
    </div>
  );
}
