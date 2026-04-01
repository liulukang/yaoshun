export {getSiteName, siteName} from '@/content/site-brand';

import type {
  Certification,
  CompanyProfile,
  ContactInfo,
  FaqItem,
  Locale,
  PartnerStory,
  ProductSpec
} from '@/types/content';
import {siteName} from '@/content/site-brand';

export const seoKeywords = [
  '东莞玩具',
  '拼插类玩具',
  'PU管',
  'PVC管',
  '来样加工',
  '包工包料',
  '支持贴牌加工',
  '可开专票',
  'ISO 9000认证',
  'CE认证'
];

export const companyProfile: CompanyProfile = {
  name: siteName,
  establishedYear: 2013,
  factoryAreaSqm: 6000,
  employeeCount: 50,
  monthlyCapacityTons: 200,
  mission: {
    en: 'To deliver reliable processing and manufacturing services for toys and polymer tube products.',
    zh: '为玩具与管材客户提供稳定、可交付的加工与制造服务。'
  },
  vision: {
    en: 'To become a trusted long-term manufacturing partner in Dongguan for B2B clients.',
    zh: '成为东莞地区值得长期合作的B端制造伙伴。'
  },
  summary: {
    en: 'Dongguan Yaoshun Technology Co., Ltd. is an approved and registered enterprise, focused on extrusion equipment, engineering plastics and related processing services.',
    zh: '东莞市尧顺科技有限公司是一家经国家相关部门批准注册的企业，主营挤出设备、工程塑胶制品及相关加工服务。'
  },
  coreStrengths: [
    {
      en: 'Main category: interlocking toys with stable sampling and production capabilities.',
      zh: '主营拼插类玩具，具备稳定打样与量产能力。'
    },
    {
      en: 'PU tube and PVC tube processing support.',
      zh: '支持 PU 管与 PVC 管加工。'
    },
    {
      en: 'Supports sample-based processing and labor+material contracts.',
      zh: '支持来样加工与包工包料。'
    },
    {
      en: 'Supports private-label/OEM production and VAT special invoice issuance.',
      zh: '支持贴牌加工，并可开具增值税专票。'
    }
  ]
};

export const factoryShowroomIntro: Record<Locale, string> = {
  zh: '东莞市尧顺科技有限公司是一家经国家相关部门批准注册的企业。本公司成立于2013年，是专业生产 PP、PE、ABS、POM 厚板机械，各种管材、异型材、挤出设备、全自动裁管机、牵引机、硅胶机，以及 TPU、ABS、PC、PE、PP 等工程塑胶制品的独资企业，集注塑产品设计、开发、生产、销售、服务于一体。公司拥有先进的生产设备与完善的管理体系。现有产品包括儿童玩具、LED 灯条套管、塑胶建材、TPU 医疗管、汽车封边条、家装封边条、箱包配件、电子产品配件等。',
  en: 'Dongguan Yaoshun Technology Co., Ltd. is an officially registered enterprise. Founded in 2013, the company specializes in PP/PE/ABS/POM sheet machinery, pipe and profile extrusion equipment, automatic tube cutters, traction machines, silicone machines, and engineering plastic products (TPU/ABS/PC/PE/PP). It integrates injection-product design, development, production, sales and service. Current products include children toys, LED strip sleeves, plastic building materials, TPU medical tubes, automotive trims, home decoration trims, luggage accessories and electronic accessories.'
};

export const factoryArchive = {
  establishedDate: '2016.08.26',
  annualTurnover: '101~500万',
  employeeRange: '11~50人',
  customMoq: '5000米',
  oemMoq: '1000套',
  exportOrderSupport: {
    zh: '不支持',
    en: 'Not supported'
  },
  processingMethods: {
    zh: ['清加工', '包工包料', '来样加工', '来图加工'],
    en: ['Labor processing', 'Labor + material', 'Sample-based processing', 'Drawing-based processing']
  },
  invoiceTaxPoint: '13%',
  vatInvoice: {
    zh: '有',
    en: 'Available'
  }
};

export const enterpriseTrust = {
  items: {
    zh: [
      {label: '主体资质', value: '1'},
      {label: '企业信用', value: '2'},
      {label: '企业年报', value: '9'},
      {label: '税务评级', value: 'A'},
      {label: '知识产权', value: '已登记'}
    ],
    en: [
      {label: 'Entity Qualifications', value: '1'},
      {label: 'Corporate Credit', value: '2'},
      {label: 'Annual Reports', value: '9'},
      {label: 'Tax Rating', value: 'A'},
      {label: 'Intellectual Property', value: 'Registered'}
    ]
  }
};

export const productionProfile = {
  staffRange: {
    zh: '11~50人',
    en: '11-50 people'
  },
  monthlyOutputValue: {
    zh: '51~100万',
    en: 'RMB 510K-1M'
  },
  rawMaterialLeadTime: {
    zh: '10天',
    en: '10 days'
  },
  specialProcesses: {
    zh: ['注塑/注射', '挤塑/押出', '缠绕成型', '滚塑/旋转成型'],
    en: ['Injection molding', 'Extrusion', 'Winding molding', 'Rotational molding']
  }
};

export const factoryStore = {
  totalProducts: 119,
  categories: {
    zh: ['全部', '餐具', '物流包装', '益智、科教玩具', '塑料管', '绝缘材料', '塑料机械', '车身及附件', '饮水用具', '山地、野营用品', '室外照明灯具', '箱包配件', '塑料异型材', '婴儿玩具', '过家家玩具', '无主灯照明', '橡胶机械'],
    en: [
      'All',
      'Tableware',
      'Logistics Packaging',
      'Educational Toys',
      'Plastic Tubes',
      'Insulation Materials',
      'Plastic Machinery',
      'Body & Accessories',
      'Drinking Utensils',
      'Mountain & Camping',
      'Outdoor Lighting',
      'Luggage Accessories',
      'Plastic Profiles',
      'Baby Toys',
      'Pretend Play Toys',
      'Mainless Lighting',
      'Rubber Machinery'
    ]
  }
};

export const certifications: Certification[] = [
  {
    id: 'business-license',
    name: '工商资质',
    description: {
      en: 'Business registration and legal entity qualification documents are available for project onboarding.',
      zh: '可提供公司工商注册与主体资质文件，用于项目立项与合作审核。'
    },
    status: 'available'
  },
  {
    id: 'enterprise-credit',
    name: '企业信用',
    description: {
      en: 'Corporate credit profile documents can be provided for cooperation review.',
      zh: '可提供企业信用相关资料，用于合作前审核。'
    },
    status: 'available'
  },
  {
    id: 'annual-reports',
    name: '企业年报',
    description: {
      en: 'Enterprise annual report records are available.',
      zh: '可提供企业年报相关记录信息。'
    },
    status: 'available'
  },
  {
    id: 'tax-rating-a',
    name: '税务评级 A',
    description: {
      en: 'Tax rating is maintained at level A.',
      zh: '企业税务评级为 A。'
    },
    status: 'available'
  },
  {
    id: 'intellectual-property',
    name: '知识产权',
    description: {
      en: 'Intellectual property registration information is available.',
      zh: '可提供知识产权登记相关信息。'
    },
    status: 'available'
  },
  {
    id: 'iso9000',
    name: 'ISO 9000',
    description: {
      en: 'Quality-management related documentation aligned with ISO 9000 standards.',
      zh: '具备 ISO 9000 相关质量管理体系文件支持。'
    },
    status: 'available'
  },
  {
    id: 'ce',
    name: 'CE',
    description: {
      en: 'EU market compliance certificate for toy safety requirements.',
      zh: '面向欧盟市场的玩具安全合规证书。'
    },
    status: 'available'
  }
];

export const products: ProductSpec[] = [
  {
    slug: 'interlocking-educational-toys',
    name: {
      en: 'Interlocking Educational Toys',
      zh: '拼插类益智玩具'
    },
    tagline: {
      en: 'Factory-direct interlocking and science-toy category with custom processing support.',
      zh: '工厂直供拼插类、科教类玩具，支持定制加工。'
    },
    description: {
      en: 'Suitable for educational channels, gift channels and factory-store distribution with private-label and sample-based processing support.',
      zh: '适用于科教渠道、礼品渠道及工厂店分销，支持贴牌与来样加工。'
    },
    material: 'ABS / PP engineering plastics',
    size: 'Depends on model',
    ageRange: '3+ years',
    cartonSpec: 'Based on SKU mix',
    cbm: 'Based on order',
    moq: '1000 sets',
    leadTime: '10-20 days',
    image: '/images/products/fort-kit.svg',
    keywords: ['拼插类玩具', '益智玩具', '来样加工', '支持贴牌加工'],
    certifications: ['工商资质', 'ISO 9000', 'CE'],
    highlights: [
      {
        en: 'Supports sample-based and drawing-based processing.',
        zh: '支持来样加工与来图加工。'
      },
      {
        en: 'Supports private-label/OEM and VAT invoicing.',
        zh: '支持贴牌加工并可开具增值税发票。'
      }
    ]
  },
  {
    slug: 'pu-pvc-industrial-tubes',
    name: {
      en: 'PU / PVC Plastic Tubes',
      zh: 'PU / PVC 管材加工'
    },
    tagline: {
      en: 'Focused on plastic tube and profile processing for industrial and consumer applications.',
      zh: '专注塑料管材与异型材加工，覆盖工业与消费品配套场景。'
    },
    description: {
      en: 'Supports LED strip sleeves, TPU medical tubes, automotive and home edge trims, and related accessories.',
      zh: '可用于 LED 灯条套管、TPU 医疗管、汽车封边条、家装封边条等产品配套。'
    },
    material: 'PU / PVC / TPU',
    size: 'Custom profile size',
    ageRange: 'N/A',
    cartonSpec: 'Based on shipment plan',
    cbm: 'Based on order',
    moq: '5000 meters',
    leadTime: '10 days',
    image: '/images/products/wall-washer.svg',
    keywords: ['PU管', 'PVC管', '塑料异型材', '包工包料'],
    certifications: ['工商资质', 'ISO 9000'],
    highlights: [
      {
        en: 'Supports labor-only and labor+material cooperation models.',
        zh: '支持清加工与包工包料两种合作方式。'
      },
      {
        en: 'Raw material procurement cycle is about 10 days.',
        zh: '原材料采购周期约 10 天。'
      }
    ]
  },
  {
    slug: 'extrusion-and-plastic-machinery',
    name: {
      en: 'Extrusion & Plastic Machinery',
      zh: '塑料机械与挤出设备'
    },
    tagline: {
      en: 'Machinery and engineering plastics solutions for extrusion and forming production lines.',
      zh: '为挤出与成型产线提供塑料机械与工程塑胶制品方案。'
    },
    description: {
      en: 'Includes thick-plate machinery, extruders, automatic tube cutters, traction machines and related equipment support.',
      zh: '覆盖厚板机械、挤出设备、全自动裁管机、牵引机等设备支持。'
    },
    material: 'PP / PE / ABS / POM / PC engineering plastics',
    size: 'Equipment-dependent',
    ageRange: 'N/A',
    cartonSpec: 'Project-based',
    cbm: 'Project-based',
    moq: '1000 sets',
    leadTime: 'Negotiable by project',
    image: '/images/products/ai-smart-pup.svg',
    keywords: ['塑料机械', '挤出设备', '全自动裁管机', '牵引机'],
    certifications: ['工商资质', 'ISO 9000', 'CE'],
    highlights: [
      {
        en: 'Supports processing routes: injection, extrusion, winding and rotational molding.',
        zh: '支持注塑/注射、挤塑/押出、缠绕成型、滚塑/旋转成型。'
      },
      {
        en: 'Integrated design, development, production and service capabilities.',
        zh: '具备注塑产品设计、开发、生产与服务一体化能力。'
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
  },
  {
    id: 'middle-east-gift',
    partner: 'Middle East Gift Distribution Network',
    region: 'UAE',
    orderScale: '2 seasonal launches per year',
    outcome: {
      en: 'Completed localized packaging and bilingual content adaptation for recurring holiday campaigns.',
      zh: '完成本地化包装与双语内容适配，连续支持节日档期复购项目。'
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
    en: 'Room 201, Building 1, No. 177 Yuanshan Road, Chashan Town, Dongguan, Guangdong, China',
    zh: '广东东莞茶山镇圆山路177号1号楼201室'
  }
};
