import type {HomePageContent} from '@/content/home-content';
import type {HomeSectionConfig, HomeSectionKind} from '@/types/page-builder';
import type {Locale} from '@/types/content';

import {ContactCtaGlass, ContactCtaSplit} from '@/components/page-builder/sections/contact-cta-section';
import {HeroCentered, HeroSplit} from '@/components/page-builder/sections/hero-section';
import {HighlightsMosaic, HighlightsZigzag} from '@/components/page-builder/sections/highlights-section';
import {ProductsCards, ProductsShowcase} from '@/components/page-builder/sections/products-section';
import {StoriesCards, StoriesRibbon} from '@/components/page-builder/sections/stories-section';

export interface HomeSectionRenderProps {
  locale: Locale;
  content: HomePageContent;
  section: HomeSectionConfig;
}

type SectionComponent = (props: HomeSectionRenderProps) => React.ReactNode;
type SectionVariantRegistry = Record<HomeSectionKind, Record<string, SectionComponent>>;

const sectionVariants: SectionVariantRegistry = {
  hero: {
    split: HeroSplit,
    centered: HeroCentered
  },
  highlights: {
    mosaic: HighlightsMosaic,
    zigzag: HighlightsZigzag
  },
  products: {
    cards: ProductsCards,
    showcase: ProductsShowcase
  },
  stories: {
    cards: StoriesCards,
    ribbon: StoriesRibbon
  },
  contactCta: {
    glass: ContactCtaGlass,
    split: ContactCtaSplit
  }
};

export function resolveHomeSection(section: HomeSectionConfig): SectionComponent {
  const variants = sectionVariants[section.kind];
  const resolved = variants[section.variant];

  if (resolved) {
    return resolved;
  }

  const [fallback] = Object.values(variants);
  return fallback;
}
