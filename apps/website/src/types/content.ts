export type Locale = 'en' | 'zh';

export type LocalizedText = Record<Locale, string>;

export interface CompanyProfile {
  name: string;
  establishedYear: number;
  factoryAreaSqm: number;
  employeeCount: number;
  monthlyCapacityTons: number;
  mission: LocalizedText;
  vision: LocalizedText;
  summary: LocalizedText;
  coreStrengths: LocalizedText[];
}

export interface Certification {
  id: string;
  name: string;
  description: LocalizedText;
  status: 'available' | 'in-progress';
  etaDays?: number;
}

export interface ProductSpec {
  slug: string;
  name: LocalizedText;
  tagline: LocalizedText;
  description: LocalizedText;
  material: string;
  size: string;
  ageRange: string;
  cartonSpec: string;
  cbm: string;
  moq: string;
  leadTime: string;
  image: string;
  keywords: string[];
  certifications: string[];
  highlights: LocalizedText[];
}

export interface PartnerStory {
  id: string;
  partner: string;
  region: string;
  orderScale: string;
  outcome: LocalizedText;
}

export interface FaqItem {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
}

export interface ContactInfo {
  whatsapp: string;
  phone: string;
  linkedin: string;
  email: string;
  address: LocalizedText;
}
