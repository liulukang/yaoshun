import type {
  Locale,
  Certification,
  CompanyProfile,
  ContactInfo,
  FaqItem,
  PartnerStory,
  ProductSpec
} from '@/types/content';

export const siteNameEn = 'yaoshun';
export const siteNameZh = '尧顺';
export const siteName = siteNameEn;

export function getSiteName(locale: Locale): string {
  return locale === 'zh' ? siteNameZh : siteNameEn;
}

export const seoKeywords = [
  'wall washer',
  'ai toys for kids',
  'fort building kit',
  'toy extruder equipment',
  'OEM ODM toy manufacturer'
];

export const companyProfile: CompanyProfile = {
  name: siteName,
  establishedYear: 2014,
  factoryAreaSqm: 6000,
  employeeCount: 50,
  monthlyCapacityTons: 200,
  mission: {
    en: 'To build safe, joyful and market-ready toy products for global families.',
    zh: '为全球家庭打造安全、快乐且具市场竞争力的玩具产品。'
  },
  vision: {
    en: 'To become a long-term innovation partner for international toy brands.',
    zh: '成为国际玩具品牌值得长期合作的创新制造伙伴。'
  },
  summary: {
    en: 'Founded in 2014, yaoshun integrates product design, mold development, sampling and mass production for B2B buyers.',
    zh: '尧顺成立于2014年，打通产品设计、模具开发、打样到量产的全流程，为B端买家提供稳定交付能力。'
  },
  coreStrengths: [
    {
      en: 'Sample delivery within 24 hours for selected SKUs.',
      zh: '部分SKU支持24小时快速打样。'
    },
    {
      en: '10+ years of OEM/ODM collaboration with overseas brands.',
      zh: '10年以上海外品牌OEM/ODM合作经验。'
    },
    {
      en: 'In-house design and engineering team for rapid iteration.',
      zh: '拥有自研设计与工程团队，可快速迭代新品。'
    },
    {
      en: 'Eco-compliant raw material sourcing and inspection process.',
      zh: '原料符合环保标准并具备完整检验流程。'
    }
  ]
};

export const certifications: Certification[] = [
  {
    id: 'ce',
    name: 'CE',
    description: {
      en: 'EU market compliance certificate for toy safety requirements.',
      zh: '面向欧盟市场的玩具安全合规证书。'
    },
    status: 'available'
  },
  {
    id: 'astm',
    name: 'ASTM',
    description: {
      en: 'U.S. toy material and safety testing alignment.',
      zh: '满足美国玩具材料与安全测试标准。'
    },
    status: 'available'
  },
  {
    id: 'en71',
    name: 'EN71',
    description: {
      en: 'Core European toy safety standard set.',
      zh: '欧洲玩具安全核心标准体系。'
    },
    status: 'in-progress',
    etaDays: 20
  },
  {
    id: 'bsci',
    name: 'BSCI',
    description: {
      en: 'Factory social responsibility audit report.',
      zh: '工厂社会责任验厂报告。'
    },
    status: 'in-progress'
  },
  {
    id: 'icti',
    name: 'ICTI',
    description: {
      en: 'Toy industry audit framework aligned with international brand sourcing requirements.',
      zh: '面向国际品牌采购要求的玩具行业验厂体系。'
    },
    status: 'in-progress'
  },
  {
    id: 'iso9001',
    name: 'ISO9001',
    description: {
      en: 'Quality management system verification.',
      zh: '质量管理体系认证。'
    },
    status: 'in-progress'
  }
];

export const products: ProductSpec[] = [
  {
    slug: 'ai-toys-for-kids-smart-pup',
    name: {
      en: 'AI Smart Pup Companion',
      zh: 'AI智能陪伴玩具狗'
    },
    tagline: {
      en: 'Interactive AI toys for kids with multilingual voice stories.',
      zh: '支持多语言故事交互的AI儿童陪伴玩具。'
    },
    description: {
      en: 'A plush-style smart toy dog designed for language interaction, emotional companionship and bedtime content playback.',
      zh: '毛绒玩具狗外形，支持语音互动、情绪陪伴与睡前内容播放。'
    },
    material: 'ABS + plush + food-grade silicone',
    size: '25 x 18 x 22 cm',
    ageRange: '3+ years',
    cartonSpec: '12 pcs/carton',
    cbm: '0.114',
    moq: '1000 pcs',
    leadTime: '35 days',
    image: '/images/products/ai-smart-pup.svg',
    keywords: ['ai toys for kids', 'interactive plush toy', 'OEM smart dog toy'],
    certifications: ['CE', 'ASTM', 'EN71'],
    highlights: [
      {
        en: 'Offline voice package support for privacy-first markets.',
        zh: '支持离线语音包，适配重视隐私的市场。'
      },
      {
        en: 'Custom mascot voice and startup melody for brand programs.',
        zh: '可定制品牌角色音色与开机音。'
      }
    ]
  },
  {
    slug: 'fort-building-kit-extruder-set',
    name: {
      en: 'Fort Building Kit Extruder Set',
      zh: '城堡搭建挤出套装'
    },
    tagline: {
      en: 'Fort building kit with modular rods, joints and safe extruder connectors.',
      zh: '模块化杆件与安全连接件组合的儿童搭建套装。'
    },
    description: {
      en: 'STEM-inspired structure play kit for family and classroom scenes, with fast assembly and compact carton loading.',
      zh: '面向家庭与课堂场景的STEM搭建玩具，拼装高效，装箱紧凑。'
    },
    material: 'PP + reinforced ABS',
    size: '58 x 32 x 12 cm (set box)',
    ageRange: '5+ years',
    cartonSpec: '8 sets/carton',
    cbm: '0.126',
    moq: '800 sets',
    leadTime: '30 days',
    image: '/images/products/fort-kit.svg',
    keywords: ['fort building kit', 'toy extruder', 'STEM construction toy'],
    certifications: ['CE', 'EN71'],
    highlights: [
      {
        en: 'Supports OEM color cards and logo engraved connectors.',
        zh: '支持OEM配色卡及连接件激光Logo。'
      },
      {
        en: 'Reduced CBM per set to optimize sea freight profit margin.',
        zh: '优化单套CBM，提升海运利润空间。'
      }
    ]
  },
  {
    slug: 'wall-washer-story-projector',
    name: {
      en: 'Wall Washer Story Projector',
      zh: '儿童墙洗投影故事灯'
    },
    tagline: {
      en: 'Wall washer style night projector for immersive bedtime storytelling.',
      zh: '墙洗光感设计的沉浸式睡前故事投影灯。'
    },
    description: {
      en: 'Combines ambient wall washer lighting with rotating picture reels, ideal for bedtime routines and retail gift bundles.',
      zh: '融合墙洗灯氛围光与旋转图卡投影，适合睡前场景与礼品组合售卖。'
    },
    material: 'ABS + PC optical lens',
    size: '19 x 9 x 11 cm',
    ageRange: '3+ years',
    cartonSpec: '24 pcs/carton',
    cbm: '0.098',
    moq: '1200 pcs',
    leadTime: '28 days',
    image: '/images/products/wall-washer.svg',
    keywords: ['wall washer', 'kids projector toy', 'bedtime story light'],
    certifications: ['CE', 'ASTM', 'EN71'],
    highlights: [
      {
        en: 'Reel cards can be localized for regional story IP licensing.',
        zh: '图卡内容可按地区语言和IP授权做本地化。'
      },
      {
        en: 'Supports retail-ready packaging and drop-test standards.',
        zh: '支持零售端包装设计与跌落测试标准。'
      }
    ]
  }
];

export const partnerStories: PartnerStory[] = [
  {
    id: 'eu-retailer',
    partner: 'EU Specialty Retail Group',
    region: 'Germany',
    orderScale: '1 x 40HQ monthly',
    outcome: {
      en: 'Reduced launch cycle from 90 to 55 days with synchronized sample + packaging workflow.',
      zh: '通过样品与包装并行流程，将上新周期从90天缩短至55天。'
    }
  },
  {
    id: 'north-america-chain',
    partner: 'North America Kids Chain',
    region: 'United States',
    orderScale: '180,000 units annual volume',
    outcome: {
      en: 'Delivered stable quality with AQL-controlled batch inspection for repeat seasonal campaigns.',
      zh: '通过AQL抽检实现批次质量稳定，连续支持季节性复购活动。'
    }
  }
];

export const faqItems: FaqItem[] = [
  {
    id: 'moq',
    question: {
      en: 'What is your MOQ?',
      zh: '你们的MOQ是多少？'
    },
    answer: {
      en: 'Most projects start from 800-1200 units depending on tooling complexity and packaging type.',
      zh: '通常根据模具复杂度与包装方案，起订量在800-1200件之间。'
    }
  },
  {
    id: 'lead-time',
    question: {
      en: 'What is the normal lead time?',
      zh: '常规交期是多久？'
    },
    answer: {
      en: 'Standard production lead time is around 28-35 days after sample and deposit confirmation.',
      zh: '在样品与定金确认后，常规量产交期约为28-35天。'
    }
  },
  {
    id: 'oem-odm',
    question: {
      en: 'Do you support OEM/ODM customization?',
      zh: '是否支持OEM/ODM定制？'
    },
    answer: {
      en: 'Yes. We support product concept adaptation, mold development, branding, packaging and compliance document matching.',
      zh: '支持。可提供概念适配、模具开发、品牌标识、包装设计及合规文件匹配。'
    }
  },
  {
    id: 'sample-fee',
    question: {
      en: 'How is sample fee handled?',
      zh: '打样费如何处理？'
    },
    answer: {
      en: 'Sample fees depend on complexity and can be partially refunded when reaching confirmed mass order quantity.',
      zh: '打样费取决于复杂度，达到约定量产订单后可按约定部分返还。'
    }
  },
  {
    id: 'warranty',
    question: {
      en: 'What is the warranty period?',
      zh: '质保周期是多久？'
    },
    answer: {
      en: 'Default warranty period is 12 months from shipment date with documented quality response workflow.',
      zh: '默认质保为出货后12个月，并配套标准化质量响应流程。'
    }
  }
];

export const contactInfo: ContactInfo = {
  whatsapp: '+86 186 6552 7489',
  phone: '+86 186 6552 7489',
  linkedin: 'https://www.linkedin.com/company/lai-toys-manufacturing',
  email: 'sales@lai-toys.com',
  address: {
    en: 'No. 88, Innovation Avenue, Chenghai District, Shantou, Guangdong, China',
    zh: '中国广东省汕头市澄海区创新大道88号'
  }
};
