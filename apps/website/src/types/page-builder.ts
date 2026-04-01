import type {Locale} from '@/types/content';

export type HomeSectionKind = 'hero' | 'highlights' | 'products' | 'stories' | 'contactCta';

export interface HomeSectionConfig {
  id: string;
  kind: HomeSectionKind;
  variant: string;
  anchor?: string;
}

export interface HomePageConfig {
  locale: Locale;
  sections: HomeSectionConfig[];
}
