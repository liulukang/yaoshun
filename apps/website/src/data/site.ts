import type {Locale} from '@/lib/i18n';
import type {RouteKey} from '@/lib/routes';

export type LocalizedText = Partial<Record<Locale, string>>;

export type Product = {
  slug: string;
  title: LocalizedText;
  badge: LocalizedText;
  summary: LocalizedText;
  detail: LocalizedText;
  moq: LocalizedText;
  materials: LocalizedText;
  useCases: LocalizedText[];
  highlights: LocalizedText[];
  specs: Array<{label: LocalizedText; value: LocalizedText}>;
  image: string;
};

export const pageLabels: Record<RouteKey, LocalizedText> = {
  home: {en: 'Home', zh: '首页'},
  company: {en: 'Company', zh: '公司简介'},
  oemOdm: {en: 'OEM / ODM', zh: 'OEM / ODM'},
  products: {en: 'Products', zh: '产品目录'},
  factory: {en: 'Factory Tour', zh: '工厂展示'},
  compliance: {en: 'Compliance', zh: '资质合规'},
  faq: {en: 'FAQ & Logistics', zh: 'FAQ 与物流'},
  contact: {en: 'Get a Quote', zh: '获取报价'},
  privacy: {en: 'Privacy', zh: '隐私政策'}
};

export const desktopNav: RouteKey[] = ['company', 'oemOdm', 'products', 'factory', 'compliance', 'faq', 'contact'];
export const footerNav: RouteKey[] = ['company', 'oemOdm', 'products', 'factory', 'compliance', 'faq', 'contact', 'privacy'];

export const companyProfile = {
  brand: {
    en: 'Dongguan Yaoshun Technology',
    zh: '东莞市尧顺科技'
  },
  brandShort: {
    en: 'Yaoshun',
    zh: '尧顺'
  },
  companyName: {
    en: 'Dongguan Yaoshun Technology Co., Ltd.',
    zh: '东莞市尧顺科技有限公司'
  },
  tagline: {
    en: 'Precision manufacturing for toys, plastic profiles, and export-ready production.',
    zh: '专注玩具、塑胶型材与面向出口项目的精密制造。'
  },
  email: 'sales@lai-toys.com',
  phone: '+86 186 6552 7489',
  whatsapp: '+86 186 6552 7489',
  linkedin: 'https://www.linkedin.com/company/lai-toys-manufacturing',
  website: 'https://www.19931015.xyz/',
  address: {
    en: 'Room 201, Building 1, No.177 Yuanshan Road, Chashan Town, Dongguan, Guangdong, China',
    zh: '中国广东省东莞市茶山镇圆山路177号1号楼201室'
  }
};

const placeholderImages = {
  companyHero: '/placeholders/company-hero.svg',
  factoryHero: '/placeholders/factory-hero.svg',
  factoryFloor: '/placeholders/factory-floor.svg',
  toyLearning: '/placeholders/toy-learning.svg',
  profileSeries: '/placeholders/profile-extrusion.svg',
  engineeringSupport: '/placeholders/engineering-support.svg',
  rdLab: '/placeholders/rd-lab.svg',
  craftsmanship: '/placeholders/craftsmanship.svg',
  complianceLab: '/placeholders/compliance-lab.svg',
  oemWorkflow: '/placeholders/oem-workflow.svg',
  projectEngineering: '/placeholders/project-engineering.svg'
} as const;

export const siteStats = [
  {
    value: {en: '9 Years', zh: '9 年经验'},
    label: {en: 'Focused manufacturing experience', zh: '聚焦制造经验'}
  },
  {
    value: {en: '6,000 m2', zh: '6,000 平方米'},
    label: {en: 'Factory area', zh: '厂房面积'}
  },
  {
    value: {en: '50+', zh: '50+'},
    label: {en: 'Team capacity', zh: '团队规模'}
  },
  {
    value: {en: '200 Tons / Month', zh: '200 吨 / 月'},
    label: {en: 'Monthly capacity', zh: '月产能力'}
  }
];

export const homeContent = {
  hero: {
    eyebrow: {
      en: 'Toy Manufacturing • Plastic Profiles • Export Delivery',
      zh: '玩具制造 · 塑胶型材 · 出口交付'
    },
    title: {
      en: 'World-Class Toy Manufacturing: Where Engineering Meets Play',
      zh: '世界级玩具制造，让工程能力与儿童产品体验真正结合'
    },
    description: {
      en: 'Yaoshun supports OEM, ODM, sample-based development, and material-inclusive production for interlocking toys, PU/PVC/TPU profiles, and engineering plastic projects.',
      zh: '尧顺为拼插类玩具、PU/PVC/TPU 型材与工程塑胶项目提供 OEM、ODM、来样加工、包工包料与量产交付服务。'
    },
    primary: {
      en: 'Request Factory Tour',
      zh: '预约工厂参观'
    },
    secondary: {
      en: 'View Product Catalog',
      zh: '查看产品目录'
    },
    collage: [placeholderImages.factoryHero, placeholderImages.toyLearning, placeholderImages.factoryHero]
  },
  categories: [
    {
      title: {en: 'Interlocking Learning Toys', zh: '拼插类益智玩具'},
      description: {
        en: 'ABS / PP educational, infant, and pretend-play toy programs with OEM and private-label support.',
        zh: '以 ABS / PP 工程塑胶为主，覆盖益智、婴儿和过家家玩具，并支持 OEM 与贴牌加工。'
      },
      image: placeholderImages.toyLearning
    },
    {
      title: {en: 'PU / PVC / TPU Profiles', zh: 'PU / PVC / TPU 管材型材'},
      description: {
        en: 'LED sleeves, medical tubes, edge trims, and custom profiles with clean-processing or turnkey sourcing options.',
        zh: '适用于 LED 灯条套管、医疗管、封边条和各类异型材，支持清加工与包工包料。'
      },
      image: placeholderImages.profileSeries
    },
    {
      title: {en: 'Extrusion Equipment Support', zh: '挤出设备与工程塑胶支持'},
      description: {
        en: 'Extrusion equipment, traction systems, cutting support, and project-based engineering plastics collaboration.',
        zh: '覆盖挤出设备、牵引机、裁管机及工程塑胶制品配套，支持项目协同开发。'
      },
      image: placeholderImages.engineeringSupport
    }
  ],
  excellence: {
    title: {
      en: 'Manufacturing Excellence',
      zh: '制造能力总览'
    },
    description: {
      en: 'The current company profile highlights injection, extrusion, winding, and rotational molding under one roof, backed by raw material coordination and export-ready documentation.',
      zh: '企业资料显示，尧顺在同一工厂体系内整合注塑、挤塑、缠绕成型与滚塑工艺，并配备原料采购与出口资料支持。'
    },
    points: [
      {
        title: {en: '24-Hour Sampling Response', zh: '24 小时打样响应'},
        text: {
          en: 'The historical site materials emphasize fast sample coordination for overseas projects.',
          zh: '历史站点资料强调面向海外项目的快速打样沟通与响应能力。'
        }
      },
      {
        title: {en: '10-Day Material Procurement', zh: '10 天原料采购周期'},
        text: {
          en: 'A short procurement cycle helps fast-turn profile and toy production schedules.',
          zh: '较短的原料采购周期，适合玩具和型材项目的快节奏排产。'
        }
      },
      {
        title: {en: 'VAT Invoice Support', zh: '支持增值税发票'},
        text: {
          en: 'Suitable for structured B2B sourcing and compliant domestic or export transactions.',
          zh: '适配规范的 B 端采购流程，也利于国内外项目的合规结算。'
        }
      }
    ]
  },
  compliance: [
    {
      title: {en: 'EN71 / ASTM Support', zh: 'EN71 / ASTM 测试支持'},
      text: {
        en: 'Legacy site materials consistently positioned Yaoshun for overseas toy buyers requiring EN71 and ASTM pathways.',
        zh: '历史站点长期面向海外玩具采购商，持续围绕 EN71 与 ASTM 等测试要求组织材料。'
      }
    },
    {
      title: {en: 'ISO / CE File Readiness', zh: 'ISO / CE 资料准备'},
      text: {
        en: 'The company profile lists ISO 9000 quality documents and CE compliance files among available materials.',
        zh: '企业资料中明确列出 ISO 9000 质量管理体系文件与 CE 合规证书。'
      }
    },
    {
      title: {en: 'Tax A Rating & Credit Files', zh: 'A级税务与信用资料'},
      text: {
        en: 'Useful for distributor onboarding, due diligence, and enterprise buyer reviews.',
        zh: '便于经销商准入、客户尽调及企业采购审核。'
      }
    },
    {
      title: {en: 'Annual Reports & IP Records', zh: '年报与知识产权记录'},
      text: {
        en: 'Supports long-term customer trust and repeated compliance submissions.',
        zh: '支持长期合作客户的持续审核和资质留档。'
      }
    }
  ],
  cases: [
    {
      title: {en: 'EU Specialty Retail Group', zh: '欧洲连锁玩具渠道项目'},
      result: {en: 'Delivered 2 x 40HQ on schedule.', zh: '首单 2 x 40HQ 按期交付。'},
      text: {
        en: 'Production scheduling and packaging moved in parallel before the seasonal sales window.',
        zh: '通过排产与包装同步推进，在销售季前完成出运。'
      }
    },
    {
      title: {en: 'North America Kids Chain', zh: '北美教育玩具新品项目'},
      result: {en: 'Sampling to first batch in 8 weeks.', zh: '8 周完成打样到首批量产。'},
      text: {
        en: 'R&D, sampling, and testing advanced together to shorten market launch time.',
        zh: '研发、打样与测试并行推进，帮助客户压缩上市周期。'
      }
    },
    {
      title: {en: 'Middle East Gift Network', zh: '中东礼品渠道 ODM 项目'},
      result: {en: 'Localized packaging enabled repeat orders.', zh: '本地化包装支持后续持续复购。'},
      text: {
        en: 'Packaging and language customization were aligned to local channel needs.',
        zh: '围绕当地渠道偏好完成包装与语言版本切换。'
      }
    }
  ]
};

export const products: Product[] = [
  {
    slug: 'interlocking-learning-set',
    title: {en: 'Interlocking Learning Set', zh: '拼插益智组件套装'},
    badge: {en: 'OEM / Private Label', zh: 'OEM / 贴牌'},
    summary: {
      en: 'ABS / PP educational and pretend-play components designed for retail, school, and gift programs.',
      zh: '面向零售、学校和礼品渠道的 ABS / PP 拼插类益智与过家家玩具组件。'
    },
    detail: {
      en: 'This program focuses on stable sampling and mass production for educational and pretend-play lines. Yaoshun supports sample-based development, drawing-based development, and brand packaging customization.',
      zh: '该系列重点服务益智与过家家产品线，具备稳定打样与量产能力，支持来样加工、来图加工以及品牌包装定制。'
    },
    moq: {en: 'Private label MOQ: 1,000 sets', zh: '贴牌起订量：1,000 套'},
    materials: {en: 'ABS / PP engineering plastics', zh: 'ABS / PP 工程塑胶'},
    useCases: [
      {en: 'Educational retail', zh: '科教零售渠道'},
      {en: 'Gift distribution', zh: '礼品渠道'},
      {en: 'Factory store supply', zh: '工厂店配套'}
    ],
    highlights: [
      {en: 'Sample-based, drawing-based, and OEM production modes', zh: '支持来样、来图与 OEM 生产模式'},
      {en: 'Suitable for educational, infant, and pretend-play programs', zh: '覆盖益智、婴儿和过家家玩具方向'},
      {en: 'VAT invoice support for structured procurement', zh: '支持增值税发票，便于规范采购'}
    ],
    specs: [
      {
        label: {en: 'Material', zh: '材质'},
        value: {en: 'ABS / PP engineering plastics', zh: 'ABS / PP 工程塑胶'}
      },
      {
        label: {en: 'MOQ', zh: '起订量'},
        value: {en: '1,000 sets for private label', zh: '贴牌 1,000 套起'}
      },
      {
        label: {en: 'Processing modes', zh: '加工模式'},
        value: {en: 'OEM, sample-based, drawing-based', zh: 'OEM、来样加工、来图加工'}
      },
      {
        label: {en: 'Typical channels', zh: '典型渠道'},
        value: {en: 'Education, gifts, distribution', zh: '科教、礼品、分销'}
      }
    ],
    image: placeholderImages.toyLearning
  },
  {
    slug: 'pretend-play-kit',
    title: {en: 'Pretend Play Kit', zh: '过家家玩具套装'},
    badge: {en: 'Sampling Ready', zh: '可快速打样'},
    summary: {
      en: 'A retail-facing line for child-safe play concepts that balances tactile design, packaging alignment, and export preparation.',
      zh: '面向零售项目的儿童安全玩具方案，兼顾触感设计、包装协同与出口准备。'
    },
    detail: {
      en: 'Built for brand-led launches where packaging, testing items, and repeatable production quality need to move together from sampling to shipment.',
      zh: '适合需要将包装、测试项目与稳定量产一起推进的品牌型项目，从打样到出货更容易统一节奏。'
    },
    moq: {en: 'Typical MOQ: 800 - 1,200 pcs depending on structure', zh: '常规 MOQ：800 - 1,200 件，视结构复杂度而定'},
    materials: {en: 'ABS / PP and selected accessory plastics', zh: 'ABS / PP 与配套辅料塑胶'},
    useCases: [
      {en: 'Seasonal launches', zh: '季节性上新'},
      {en: 'Retail collections', zh: '零售产品线'},
      {en: 'Brand custom packaging', zh: '品牌包装定制'}
    ],
    highlights: [
      {en: 'Packaging and transport-risk checks can start during sampling', zh: '打样阶段即可同步验证包装与运输风险'},
      {en: 'Suitable for OEM appearance customization and ODM collaboration', zh: '适配 OEM 外观定制与 ODM 协同开发'},
      {en: 'Standard warranty response window after shipment', zh: '出货后默认提供质保响应周期'}
    ],
    specs: [
      {
        label: {en: 'MOQ', zh: '起订量'},
        value: {en: 'Usually 800 - 1,200 pcs', zh: '通常 800 - 1,200 件'}
      },
      {
        label: {en: 'Lead time', zh: '交期'},
        value: {en: 'Around 28 - 35 days after sample approval', zh: '样品与定金确认后约 28 - 35 天'}
      },
      {
        label: {en: 'Warranty', zh: '质保'},
        value: {en: '12 months by default', zh: '默认 12 个月'}
      },
      {
        label: {en: 'Project type', zh: '项目类型'},
        value: {en: 'OEM / ODM collaboration', zh: 'OEM / ODM 协同'}
      }
    ],
    image: placeholderImages.toyLearning
  },
  {
    slug: 'pu-pvc-profile-series',
    title: {en: 'PU / PVC / TPU Profile Series', zh: 'PU / PVC / TPU 型材系列'},
    badge: {en: 'Custom Extrusion', zh: '定制挤出'},
    summary: {
      en: 'Profiles and tube solutions for LED, medical, automotive, and home applications with clean-processing or material-inclusive delivery.',
      zh: '覆盖 LED、医疗、汽车和家装方向的型材与管材方案，支持清加工或包工包料。'
    },
    detail: {
      en: 'The profile line is built around repeatable extrusion quality and fast procurement cycles, making it suitable for volume projects that need stable dimensions and consistent lead times.',
      zh: '型材线以稳定挤出品质和较短采购周期为核心，适合需要尺寸稳定和交期可控的批量型项目。'
    },
    moq: {en: 'Custom MOQ: 5,000 meters', zh: '定制起订量：5,000 米'},
    materials: {en: 'PU / PVC / TPU', zh: 'PU / PVC / TPU'},
    useCases: [
      {en: 'LED strip sleeves', zh: 'LED 灯条套管'},
      {en: 'Medical tubes', zh: 'TPU 医疗管'},
      {en: 'Automotive trim and edge bands', zh: '汽车封边条'},
      {en: 'Home edge bands', zh: '家装封边条'}
    ],
    highlights: [
      {en: 'Supports clean-processing and turnkey material sourcing', zh: '支持清加工与包工包料'},
      {en: 'Raw material procurement cycle around 10 days', zh: '原材料采购周期约 10 天'},
      {en: 'Suitable for repeating industrial and decorative profile programs', zh: '适合长期重复性工业与装饰型材项目'}
    ],
    specs: [
      {
        label: {en: 'Material', zh: '材质'},
        value: {en: 'PU / PVC / TPU', zh: 'PU / PVC / TPU'}
      },
      {
        label: {en: 'MOQ', zh: '起订量'},
        value: {en: '5,000 meters', zh: '5,000 米'}
      },
      {
        label: {en: 'Procurement cycle', zh: '采购周期'},
        value: {en: 'About 10 days', zh: '约 10 天'}
      },
      {
        label: {en: 'Service model', zh: '服务模式'},
        value: {en: 'Clean-processing / material-inclusive', zh: '清加工 / 包工包料'}
      }
    ],
    image: placeholderImages.profileSeries
  },
  {
    slug: 'extrusion-support-line',
    title: {en: 'Extrusion Support Line', zh: '挤出设备支持线'},
    badge: {en: 'Project Collaboration', zh: '项目协同'},
    summary: {
      en: 'A support line covering extrusion equipment, tube cutting, traction systems, and engineering plastic collaboration.',
      zh: '覆盖挤出设备、裁管、牵引系统以及工程塑胶配套的支持型产品线。'
    },
    detail: {
      en: 'This line is useful for buyers who need parts, supporting equipment, or engineering evaluation around extrusion programs and related plastic products.',
      zh: '适合需要围绕挤出项目进行部件采购、配套设备支持或工程评估的客户。'
    },
    moq: {en: 'Project-based quoting', zh: '按项目报价'},
    materials: {en: 'Engineering plastics / equipment assemblies', zh: '工程塑胶 / 设备总成'},
    useCases: [
      {en: 'Extrusion projects', zh: '挤出项目'},
      {en: 'Tube cutting support', zh: '裁管配套'},
      {en: 'Traction systems', zh: '牵引系统'},
      {en: 'Engineering plastic evaluation', zh: '工程塑胶评估'}
    ],
    highlights: [
      {en: 'Supports product design, development, production, and service coordination', zh: '支持产品设计、开发、生产与服务协同'},
      {en: 'Suitable for project-based engineering discussion', zh: '适合按项目进行工程协同'},
      {en: 'Can work with downstream plastic product requirements', zh: '可配合塑胶制品需求同步评估'}
    ],
    specs: [
      {
        label: {en: 'Coverage', zh: '覆盖范围'},
        value: {en: 'Extrusion, traction, tube cutting', zh: '挤出、牵引、裁管'}
      },
      {
        label: {en: 'Cooperation mode', zh: '合作方式'},
        value: {en: 'Project-based', zh: '按项目协同'}
      },
      {
        label: {en: 'Support', zh: '支持内容'},
        value: {en: 'Engineering review and production matching', zh: '工程评估与生产配套'}
      },
      {
        label: {en: 'Target buyers', zh: '目标客户'},
        value: {en: 'Industrial and manufacturing programs', zh: '工业与制造型项目'}
      }
    ],
    image: placeholderImages.engineeringSupport
  }
];

export const companyContent = {
  hero: {
    eyebrow: {en: 'Manufacturing Excellence Since 2014', zh: '面向制造场景的持续能力建设'},
    title: {en: 'Precision Engineering for Pure Joy', zh: '把精密制造能力带到儿童产品与塑胶项目中'},
    description: {
      en: 'Yaoshun combines toy manufacturing, profile extrusion, and engineering plastics collaboration inside a practical B2B production model.',
      zh: '尧顺把玩具制造、型材挤出和工程塑胶协同整合进一套务实的 B 端生产交付体系。'
    },
    image: placeholderImages.companyHero
  },
  vision: {
    title: {en: 'Our Positioning', zh: '我们的定位'},
    text: {
      en: 'A manufacturing and processing partner serving B2B buyers with interlocking toys, PU/PVC/TPU profiles, engineering plastic products, and related equipment support.',
      zh: '面向 B 端客户的制造与加工服务商，覆盖拼插类玩具、PU/PVC/TPU 型材、工程塑胶制品以及相关设备支持。'
    }
  },
  mission: {
    title: {en: 'The Mission', zh: '我们的任务'},
    text: {
      en: 'Link sampling, packaging, compliance files, and mass production delivery into one dependable workflow for international customers.',
      zh: '为国际客户把打样、包装、合规资料和量产交付连接成一条可执行、可复用的协作流程。'
    }
  },
  values: [
    {
      title: {en: 'Absolute Compliance', zh: '合规优先'},
      text: {
        en: 'Available materials include business credentials, credit files, annual reports, tax rating A, ISO 9000, CE, and IP records.',
        zh: '可提供工商资质、信用资料、企业年报、税务 A 级、ISO 9000、CE 及知识产权登记信息。'
      }
    },
    {
      title: {en: 'Efficient Development', zh: '高效开发'},
      text: {
        en: 'The R&D flow moves from demand confirmation to structure review, sampling, and production handoff.',
        zh: '研发流程覆盖需求确认、结构与模具评估、打样验证以及量产导入。'
      }
    },
    {
      title: {en: 'Flexible Cooperation', zh: '合作灵活'},
      text: {
        en: 'Supports OEM, ODM, sample-based processing, drawing-based processing, and material-inclusive manufacturing.',
        zh: '支持 OEM、ODM、来样加工、来图加工与包工包料。'
      }
    }
  ],
  rndSteps: [
    {
      title: {en: 'Demand Confirmation', zh: '需求确认'},
      text: {
        en: 'Clarify market targets, pricing, packaging, and compliance expectations.',
        zh: '明确目标市场、价位、包装与合规标准。'
      }
    },
    {
      title: {en: 'Structure & Mold Review', zh: '结构与模具评估'},
      text: {
        en: 'Check feasibility and production risks before cost and tooling decisions.',
        zh: '在成本和模具投入前判断结构可行性与量产风险。'
      }
    },
    {
      title: {en: 'Sampling & Validation', zh: '打样与验证'},
      text: {
        en: 'Validate samples, packaging, drop tests, and transport risk together.',
        zh: '样品、包装、跌落测试与运输风险同步验证。'
      }
    },
    {
      title: {en: 'Production Launch', zh: '量产导入'},
      text: {
        en: 'Finalize engineering documents and align schedules for mass production.',
        zh: '形成工程资料并对接排产与交付。'
      }
    }
  ]
};

export const oemOdmContent = {
  hero: {
    eyebrow: {en: 'Global Manufacturing Partner', zh: '制造型合作伙伴'},
    title: {en: 'Engineering Joy Through Precision', zh: '用可执行的工程流程支撑玩具与塑胶项目'},
    description: {
      en: 'Yaoshun provides end-to-end OEM / ODM support from requirement review to production launch for toy and profile projects.',
      zh: '尧顺为玩具与型材项目提供从需求确认到量产导入的全流程 OEM / ODM 支持。'
    },
    image: placeholderImages.oemWorkflow
  },
  lifecycle: [
    {
      title: {en: 'Design', zh: '设计'},
      text: {
        en: 'Industrial and structural review for manufacturability.',
        zh: '围绕可制造性开展工业设计与结构评估。'
      }
    },
    {
      title: {en: 'Mold', zh: '模具'},
      text: {
        en: 'Assess tooling paths and cost-risk tradeoffs.',
        zh: '评估模具路线以及成本与风险平衡。'
      }
    },
    {
      title: {en: 'Prototype', zh: '打样'},
      text: {
        en: 'Build and verify samples with packaging and transport checks.',
        zh: '打样时同步验证包装和运输风险。'
      }
    },
    {
      title: {en: 'Production', zh: '量产'},
      text: {
        en: 'Launch after final engineering alignment and schedule lock.',
        zh: '工程资料确认后进入排产与量产。'
      }
    },
    {
      title: {en: 'Quality Check', zh: '质检'},
      text: {
        en: 'Link shipment release with required compliance and QC files.',
        zh: '结合所需合规和质检资料安排出货。'
      }
    }
  ],
  modes: [
    {
      title: {en: 'OEM', zh: 'OEM'},
      text: {
        en: 'Brand-led manufacturing with packaging and logo support.',
        zh: '围绕品牌要求组织生产，并支持包装与标识定制。'
      }
    },
    {
      title: {en: 'ODM', zh: 'ODM'},
      text: {
        en: 'Co-development for new products and launch concepts.',
        zh: '面向新品方案的联合开发。'
      }
    },
    {
      title: {en: 'Sample-Based Processing', zh: '来样加工'},
      text: {
        en: 'Translate reference samples into pilot and mass production.',
        zh: '将客户样品转化为打样与量产方案。'
      }
    },
    {
      title: {en: 'Drawing-Based Processing', zh: '来图加工'},
      text: {
        en: 'Work from drawings and engineering intent for repeatable output.',
        zh: '根据图纸与工程要求组织可复制的批量输出。'
      }
    }
  ]
};

export const factoryContent = {
  hero: {
    eyebrow: {en: 'Global HQ • Production Excellence', zh: '工厂现场 · 生产体系'},
    title: {en: 'The Factory of Joy', zh: '走进制造能力真正落地的工厂现场'},
    description: {
      en: 'The company profile records 6,000 m2 of workshop area, 50+ team members, and monthly output capacity that supports both toys and profile programs.',
      zh: '企业资料记录的厂房面积为 6,000 平方米，团队规模 50+，具备支持玩具与型材项目的月产交付能力。'
    },
    image: placeholderImages.factoryFloor
  },
  metrics: [
    {
      value: {en: '200 Tons', zh: '200 吨'},
      label: {en: 'Monthly production reference', zh: '月产参考能力'}
    },
    {
      value: {en: '10 Days', zh: '10 天'},
      label: {en: 'Material procurement cycle', zh: '原料采购周期'}
    },
    {
      value: {en: '11-50+', zh: '11-50+'},
      label: {en: 'Recorded employee range and homepage scale', zh: '工厂档案与首页团队口径'}
    },
    {
      value: {en: '13%', zh: '13%'},
      label: {en: 'Invoice point', zh: '开票点数'}
    }
  ],
  processes: [
    {
      title: {en: 'Injection Molding', zh: '注塑 / 注射'},
      text: {
        en: 'Suitable for precision toy components and engineering plastic parts.',
        zh: '适用于精密玩具组件和工程塑胶件。'
      }
    },
    {
      title: {en: 'Extrusion', zh: '挤塑 / 押出'},
      text: {
        en: 'Core process for tube, trim, and custom profile output.',
        zh: '是管材、封边条和异型材输出的核心工艺。'
      }
    },
    {
      title: {en: 'Winding Forming', zh: '缠绕成型'},
      text: {
        en: 'Extends capability for specialized plastic structures.',
        zh: '扩展了对特定塑胶结构的制造适配。'
      }
    },
    {
      title: {en: 'Rotational Molding', zh: '滚塑 / 旋转成型'},
      text: {
        en: 'Adds coverage for larger and more special-form products.',
        zh: '补足更大体积和特殊结构制品的能力。'
      }
    }
  ]
};

export const complianceContent = {
  hero: {
    eyebrow: {en: 'Precision Play Engineered', zh: '围绕出口项目的合规组织'},
    title: {en: 'Global Standard Integrity', zh: '把资质、信用与测试资料组织成可信交付'},
    description: {
      en: 'Yaoshun can prepare business credentials, tax and credit files, annual reports, IP records, ISO 9000 quality files, and CE-related materials for buyer review.',
      zh: '尧顺可为客户审核准备工商资质、税务与信用资料、企业年报、知识产权记录、ISO 9000 质量文件以及 CE 相关材料。'
    },
    image: placeholderImages.complianceLab
  },
  certificates: [
    {
      title: {en: 'Business Credentials', zh: '工商资质'},
      text: {en: 'Registered entity materials for customer due diligence.', zh: '支持客户尽调的主体注册资料。'}
    },
    {
      title: {en: 'Corporate Credit Files', zh: '企业信用资料'},
      text: {en: 'Useful for distributor onboarding and enterprise review.', zh: '适合经销商准入和企业采购审核。'}
    },
    {
      title: {en: 'Annual Reports', zh: '企业年报'},
      text: {en: 'Historical filing support for long-term partnerships.', zh: '为长期合作提供持续留档支持。'}
    },
    {
      title: {en: 'Tax Rating A', zh: '税务评级 A'},
      text: {en: 'Adds confidence for structured business cooperation.', zh: '增强规范商业合作的可信度。'}
    },
    {
      title: {en: 'ISO 9000 Files', zh: 'ISO 9000 文件'},
      text: {en: 'Quality management materials available for review.', zh: '可提供质量管理体系资料供审核。'}
    },
    {
      title: {en: 'CE and IP Records', zh: 'CE 与知识产权资料'},
      text: {en: 'Supports market entry and brand collaboration documentation.', zh: '支持市场准入与品牌合作资料准备。'}
    }
  ]
};

export const faqContent = {
  hero: {
    eyebrow: {en: 'Trade Resources', zh: '贸易支持资料'},
    title: {en: 'Logistics & Operations Center', zh: '物流与项目协作中心'},
    description: {
      en: 'A quick summary of MOQ, lead time, warranty, and export coordination topics gathered from the current profile materials.',
      zh: '基于现有企业资料整理的 MOQ、交期、质保与出口协作信息总览。'
    }
  },
  questions: [
    {
      q: {en: 'Minimum Order Quantity', zh: '最小起订量'},
      a: {
        en: 'Typical MOQ depends on mold complexity and packaging plan, usually around 800 - 1,200 pieces. Private label toy programs listed in the profile start at 1,000 sets, while custom profile projects start at 5,000 meters.',
        zh: 'MOQ 视模具复杂度和包装方案而定，通常在 800 - 1,200 件之间。资料中提到贴牌玩具项目可从 1,000 套起，型材定制项目则从 5,000 米起。'
      }
    },
    {
      q: {en: 'Production Lead Time', zh: '量产交期'},
      a: {
        en: 'After samples and deposit are confirmed, common mass production lead time is about 28 - 35 days.',
        zh: '在样品和定金确认后，常规量产交期约为 28 - 35 天。'
      }
    },
    {
      q: {en: 'Sample Fees', zh: '打样费'},
      a: {
        en: 'Sample charges depend on complexity. Once agreed mass production volume is reached, part of the fee can be credited back based on the project agreement.',
        zh: '打样费视复杂度而定，达到约定量产订单后，可按项目约定返还部分费用。'
      }
    },
    {
      q: {en: 'OEM / ODM Support', zh: '是否支持 OEM / ODM'},
      a: {
        en: 'Yes. The profile materials mention support for concept matching, mold development, branding, packaging, and compliance file alignment.',
        zh: '支持。资料中提到可提供概念适配、模具开发、品牌标识、包装设计及合规文件匹配。'
      }
    },
    {
      q: {en: 'Warranty & After-Sales', zh: '质保与售后'},
      a: {
        en: 'Default warranty cycle is 12 months after shipment, combined with a dedicated quality response process.',
        zh: '默认质保周期为出货后 12 个月，并配套质量响应流程。'
      }
    }
  ],
  logistics: [
    {
      title: {en: 'Procurement Cycle', zh: '采购周期'},
      text: {en: 'Standard raw material procurement cycle is around 10 days.', zh: '标准原材料采购周期约 10 天。'}
    },
    {
      title: {en: 'Invoice Support', zh: '发票支持'},
      text: {en: 'VAT invoice is available with a 13% invoice point reference.', zh: '支持增值税发票，开票点数参考为 13%。'}
    },
    {
      title: {en: 'Cooperation Models', zh: '合作模式'},
      text: {en: 'Clean-processing, material-inclusive, sample-based, drawing-based, OEM, and ODM.', zh: '清加工、包工包料、来样加工、来图加工、OEM、ODM。'}
    }
  ]
};

export const contactContent = {
  hero: {
    eyebrow: {en: 'Manufacturing Partnership', zh: '制造合作邀请'},
    title: {en: 'Scale Your Production with Yaoshun', zh: '让尧顺参与您的下一批量产项目'},
    description: {
      en: 'For toys, profile extrusion, and engineering plastic programs, share your volume, target market, and packaging expectations to start the quoting process.',
      zh: '如果您正在筹备玩具、型材挤出或工程塑胶项目，可以直接提交数量、目标市场和包装需求，尽快启动报价流程。'
    }
  },
  channels: [
    {
      label: {en: 'WhatsApp Trade Desk', zh: 'WhatsApp 贸易沟通'},
      value: '+86 186 6552 7489',
      href: 'https://wa.me/8618665527489'
    },
    {
      label: {en: 'Direct Email', zh: '邮箱'},
      value: 'sales@lai-toys.com',
      href: 'mailto:sales@lai-toys.com'
    },
    {
      label: {en: 'LinkedIn', zh: 'LinkedIn'},
      value: 'lai-toys-manufacturing',
      href: 'https://www.linkedin.com/company/lai-toys-manufacturing'
    }
  ]
};

export const privacyContent = {
  hero: {
    eyebrow: {en: 'Legal Document', zh: '法律文件'},
    title: {en: 'Privacy Policy & Data Protection', zh: '隐私政策与数据保护'},
    description: {
      en: 'When visitors contact Yaoshun through quotation and inquiry forms, the company uses submitted information only for business communication, production evaluation, and follow-up service.',
      zh: '当访客通过报价或询盘表单联系尧顺时，公司仅将提交的信息用于商务沟通、生产评估与后续服务。'
    }
  }
};

export const routeJourneys: Record<RouteKey, RouteKey[]> = {
  home: ['products', 'company', 'contact'],
  company: ['oemOdm', 'factory', 'contact'],
  oemOdm: ['products', 'compliance', 'contact'],
  products: ['factory', 'compliance', 'contact'],
  factory: ['compliance', 'faq', 'contact'],
  compliance: ['faq', 'contact', 'privacy'],
  faq: ['products', 'contact', 'privacy'],
  contact: ['products', 'company', 'privacy'],
  privacy: ['contact', 'company', 'products']
};
