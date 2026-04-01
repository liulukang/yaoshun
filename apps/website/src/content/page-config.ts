import type {HomePageConfig} from '@/types/page-builder';
import type {Locale} from '@/types/content';

export const homePageConfigs: Record<Locale, HomePageConfig> = {
  zh: {
    locale: 'zh',
    sections: [
      {id: 'hero-main', kind: 'hero', variant: 'split'},
      {id: 'highlights-main', kind: 'highlights', variant: 'mosaic', anchor: 'company'},
      {id: 'products-main', kind: 'products', variant: 'cards', anchor: 'products'},
      {id: 'stories-main', kind: 'stories', variant: 'cards', anchor: 'stories'},
      {id: 'contact-main', kind: 'contactCta', variant: 'glass', anchor: 'contact'}
    ]
  },
  en: {
    locale: 'en',
    sections: [
      {id: 'hero-main', kind: 'hero', variant: 'centered'},
      {id: 'highlights-main', kind: 'highlights', variant: 'zigzag', anchor: 'company'},
      {id: 'products-main', kind: 'products', variant: 'showcase', anchor: 'products'},
      {id: 'stories-main', kind: 'stories', variant: 'cards', anchor: 'stories'},
      {id: 'contact-main', kind: 'contactCta', variant: 'split', anchor: 'contact'}
    ]
  }
};
