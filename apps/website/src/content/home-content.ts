import type {Locale} from '@/types/content';

export const siteNameEn = 'yaoshun';
export const siteNameZh = '尧顺';
export const siteName = siteNameEn;

export function getSiteName(locale: Locale): string {
  return locale === 'zh' ? siteNameZh : siteNameEn;
}

export interface HomePageContent {
  nav: Array<{label: string; href: string}>;
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    badges: string[];
    metrics: Array<{value: string; label: string; detail: string}>;
    spotlightTitle: string;
    spotlightDescription: string;
    spotlightPoints: string[];
  };
  company: {
    eyebrow: string;
    title: string;
    description: string;
    facts: Array<{label: string; value: string}>;
    cards: Array<{title: string; description: string}>;
  };
  strengths: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{title: string; description: string}>;
  };
  compliance: {
    eyebrow: string;
    title: string;
    description: string;
    certifications: Array<{name: string; detail: string}>;
    audits: Array<{name: string; detail: string}>;
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      name: string;
      tagline: string;
      image: string;
      specs: string[];
      detail: string;
    }>;
  };
  capability: {
    eyebrow: string;
    title: string;
    description: string;
    workflow: Array<{step: string; detail: string}>;
    highlights: string[];
  };
  showroom: {
    eyebrow: string;
    title: string;
    description: string;
    spaces: Array<{title: string; detail: string}>;
  };
  stories: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{title: string; result: string; detail: string}>;
  };
  faq: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{question: string; answer: string}>;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    channels: Array<{label: string; value: string; href: string}>;
    checklistTitle: string;
    checklist: string[];
    notice: string;
  };
  footer: {
    summary: string;
    legal: string[];
    copyright: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const homepageContent: Record<Locale, HomePageContent> = {
  zh: {
    nav: [
      {label: '公司概览', href: 'company'},
      {label: '资质合规', href: 'certifications'},
      {label: '产品方案', href: 'products'},
      {label: '研发定制', href: 'rnd'},
      {label: '合作案例', href: 'success-stories'},
      {label: 'FAQ', href: 'faq'},
      {label: '联系咨询', href: 'contact'}
    ],
    hero: {
      eyebrow: '玩具外贸官网',
      title: '尧顺专注 OEM / ODM 玩具制造，服务全球采购与品牌客户',
      description:
        '我们提供从产品开发、打样、量产到出货的一体化制造服务。页面内容围绕海外买家真实采购流程设计，帮助客户快速完成工厂评估并进入询盘。',
      primaryCta: '查看产品方案',
      secondaryCta: '发起项目咨询',
      badges: ['OEM / ODM 定制开发', '支持中英双语切换', '可提供 CE / ASTM / EN71 相关资料', 'SEO 关键词部署：wall washer / ai toys for kids / fort building kit'],
      metrics: [
        {value: '2014', label: '企业成立时间', detail: '持续服务外贸玩具客户。'},
        {value: '6,000 m²', label: '厂房面积', detail: '覆盖生产、组装、包装与仓储区域。'},
        {value: '50+', label: '员工人数', detail: '含生产、品质、工程与业务团队。'},
        {value: '200 吨 / 月', label: '月产能力', detail: '支持常规订单与定制项目排产。'}
      ],
      spotlightTitle: '采购决策路径',
      spotlightDescription: '首页按“工厂实力 - 合规背书 - 产品参数 - 联系询盘”顺序组织，买家在一个页面即可完成核心判断。',
      spotlightPoints: ['先看工厂规模、展厅与产线实拍，确认供应稳定性。', '再看认证、检测与验厂进度，评估项目风险。', '最后通过 WhatsApp 与邮件直连业务，进入打样和报价。']
    },
    company: {
      eyebrow: 'Company Profile',
      title: '2014 年成立的玩具制造工厂，专注海外 OEM / ODM 项目',
      description: '外贸 B 端买家最关注的是工厂稳定性、合规能力与执行效率。我们把这些信息前置展示，帮助客户更快判断合作可行性。',
      facts: [
        {label: '成立时间', value: '2014'},
        {label: '厂房面积', value: '6,000 m²'},
        {label: '员工人数', value: '50+'},
        {label: '月产能力', value: '200 吨'}
      ],
      cards: [
        {
          title: '品牌与视觉资产',
          description: '国内品牌视觉系统已确认，海外品牌注册正在推进，预计约 10 个月完成。'
        },
        {
          title: '工厂与展厅实拍',
          description: '我们正在安排工厂与展厅高清拍摄，重点展示生产线、质检区与出货流程。'
        },
        {
          title: '使命与愿景',
          description: 'Mission：让玩具制造更可靠。Vision：成为全球玩具品牌长期稳定的 OEM / ODM 合作伙伴。'
        }
      ]
    },
    strengths: {
      eyebrow: 'Why Us',
      title: '我们能为海外买家稳定交付的四项核心能力',
      description: '从打样速度到量产质量，每一项能力都对应采购决策中的关键问题。',
      items: [
        {title: '24 小时打样响应', description: '重点项目建立优先打样窗口，缩短前期沟通与确认周期。'},
        {title: '10 年以上外贸协作经验', description: '长期服务 OEM / ODM 项目，熟悉欧美客户对交付与合规的要求。'},
        {title: '研发与模具协同能力', description: '支持结构评估、打样优化及模具开发，兼顾新品速度与量产可行性。'},
        {title: '环保材料与过程质检', description: '原材料符合环保要求，执行 AQL 抽检与关键工序质量控制。'}
      ]
    },
    compliance: {
      eyebrow: 'Trust & Compliance',
      title: '合规与信任信息在首页即可快速核验',
      description: '玩具外贸合作首先看准入门槛。我们将认证、检测与验厂进度透明展示，减少买家决策不确定性。',
      certifications: [
        {name: 'CE', detail: '欧盟市场项目可按产品类别提供 CE 相关测试与文件支持。'},
        {name: 'ASTM', detail: '面向北美市场，可按客户要求提供 ASTM 对应测试资料。'},
        {name: 'EN71', detail: '欧洲市场项目可提供 EN71 检测支持与批次对应说明。'},
        {name: '检测报告', detail: '国际认证与检测报告可在项目确认后约 15-20 个工作日内提供。'}
      ],
      audits: [
        {name: 'BSCI', detail: '验厂项目已启动，结果将用于提升供应链透明度与客户信任。'},
        {name: 'ICTI', detail: 'ICTI 审核推进中，目标是满足玩具行业主流品牌采购要求。'},
        {name: 'ISO9001', detail: '质量体系持续完善中，确保订单执行过程稳定可追溯。'}
      ]
    },
    products: {
      eyebrow: 'Product Solutions',
      title: '核心产品与关键参数一页展示，方便买家快速评估',
      description: '我们按外贸采购逻辑展示材质、适龄、装箱率、CBM、MOQ 与交期，减少重复沟通成本。',
      items: [
        {
          name: 'AI Toys for Kids 互动陪伴犬',
          tagline: '适用于教育互动与家庭陪伴场景',
          image: '/images/products/ai-smart-pup.svg',
          specs: ['材质：ABS + 毛绒 + 硅胶', '适龄：3+', 'MOQ：1000 pcs', '交期：35 天'],
          detail: '支持语音包、本地化包装与品牌外观定制，可用于礼盒与零售渠道。'
        },
        {
          name: 'Fort Building Kit 城堡搭建套装',
          tagline: '面向 STEM 教育与创意拼搭市场',
          image: '/images/products/fort-kit.svg',
          specs: ['材质：PP + ABS', '装箱：8 sets / carton', 'CBM：0.126', 'MOQ：800 sets'],
          detail: '支持 OEM 配色、说明书本地化及包装升级，兼顾玩法体验与物流效率。'
        },
        {
          name: 'Wall Washer 故事投影夜灯',
          tagline: '结合灯光氛围与睡前故事的热门品类',
          image: '/images/products/wall-washer.svg',
          specs: ['材质：ABS + 光学镜片', '适龄：3+', '装箱：24 pcs / carton', '交期：28 天'],
          detail: '可定制图卡内容与外观结构，支持跌落测试与运输包装优化。'
        }
      ]
    },
    capability: {
      eyebrow: 'OEM / ODM Capability',
      title: '定制开发流程透明，项目从需求到出货可追踪',
      description: '针对外贸项目，我们把关键节点拆解为可执行流程，确保进度、质量和沟通节奏一致。',
      workflow: [
        {step: '01 需求确认', detail: '明确目标市场、适龄、价格区间、包装要求和合规标准。'},
        {step: '02 结构与模具评估', detail: '完成结构可行性、材料选择和模具方案评估。'},
        {step: '03 打样与验证', detail: '进行样品确认、包装同步和关键测试项验证。'},
        {step: '04 量产与交付', detail: '执行排产、AQL 抽检、装柜和出运，保障交期稳定。'}
      ],
      highlights: ['支持 OEM 外观与包装定制，也可承接 ODM 开发合作。', '工程团队可配合挤出设备（Extruder）相关部件的工艺评估。', '可根据年度规划协同客户推进新品迭代。']
    },
    showroom: {
      eyebrow: 'Factory & Showroom',
      title: '真实工厂与出货场景，是外贸买家判断合作风险的关键',
      description: '针对无法实地验厂的海外客户，我们在官网重点展示展厅、产线与出货细节。',
      spaces: [
        {title: '展厅陈列', detail: '集中展示 AI 玩具、搭建套装与投影类产品系列，便于买家快速筛选方向。'},
        {title: '生产现场', detail: '覆盖注塑、组装、质检与包装工序，体现交付组织能力。'},
        {title: '验货与装柜', detail: '展示抽检记录、外箱堆码与整柜出货流程，提升采购信心。'}
      ]
    },
    stories: {
      eyebrow: 'Success Stories',
      title: '真实项目结果，帮助新客户更快建立合作信心',
      description: '我们整理了近年的典型合作场景，展示项目执行速度、质量控制和复购表现。',
      items: [
        {
          title: '欧洲连锁玩具渠道项目',
          result: '首单 2 x 40HQ 按期交付',
          detail: '通过排产与包装同步推进，在销售季前完成出运。'
        },
        {
          title: '北美教育玩具新品项目',
          result: '8 周完成打样到首批量产',
          detail: '研发、打样与测试并行，帮助客户压缩上市周期。'
        },
        {
          title: '中东礼品渠道 ODM 项目',
          result: '实现本地化包装与语言版本切换',
          detail: '结合市场偏好完成外观与包装调整，项目进入持续复购。'
        }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: '高频问题先答清楚，减少反复沟通成本',
      description: '以下问题覆盖外贸买家最常关注的 MOQ、交期、打样、合规和定制能力。',
      items: [
        {
          question: '常规 MOQ 是多少？',
          answer: '标准产品多在 800-1200 件起订，具体以结构复杂度和包装要求为准。'
        },
        {
          question: '打样和量产交期如何安排？',
          answer: '打样通常 7-15 天，样品确认后量产交期一般为 28-35 天。'
        },
        {
          question: '是否支持 OEM / ODM？',
          answer: '支持 OEM 外观与包装定制，也可承接 ODM 研发与模具协同开发。'
        },
        {
          question: '认证和检测资料多久可提供？',
          answer: 'CE、ASTM、EN71 相关资料可在项目确认后约 15-20 个工作日内配合提供。'
        }
      ]
    },
    contact: {
      eyebrow: 'Inquiry & Launch',
      title: '从浏览到询盘，直接进入项目沟通',
      description: '欢迎通过即时通讯或邮件提交需求，我们将在 1 个工作日内回复产品建议与报价路径。',
      channels: [
        {label: 'WhatsApp', value: '+86 186 6552 7489', href: 'https://wa.me/8618665527489'},
        {label: 'LinkedIn', value: 'yaoshun Manufacturing', href: 'https://www.linkedin.com/company/lai-toys-manufacturing'},
        {label: 'Email', value: 'sales@lai-toys.com', href: 'mailto:sales@lai-toys.com'}
      ],
      checklistTitle: '项目启动资料清单',
      checklist: ['矢量 Logo 与品牌主色', '工厂 / 展厅高清实拍原片', 'CE / ASTM / EN71 与检测报告', '产品规格表（材质、尺寸、装箱率、CBM）', 'SEO 关键词、隐私政策与社媒账号'],
      notice: '如需查看证书、检测报告或验厂进度，请在询盘中注明目标市场与产品型号。'
    },
    footer: {
      summary: '尧顺面向全球采购商提供 OEM / ODM 玩具制造服务，强调合规、质量与稳定交付。',
      legal: ['支持 HTTPS / SSL 部署', '支持 GDPR 隐私政策与 Cookie 合规模块', '支持欧代与德国包装法相关页面信息展示'],
      copyright: '尧顺. All rights reserved.'
    },
    seo: {
      title: '尧顺 | 玩具 OEM / ODM 制造商',
      description: '尧顺提供玩具外贸 OEM / ODM 制造服务，涵盖 AI Toys for Kids、Fort Building Kit、Wall Washer 系列及合规交付支持。',
      keywords: ['wall washer', 'ai toys for kids', 'fort building kit', 'toy manufacturer website', 'extruder']
    }
  },
  en: {
    nav: [
      {label: 'Company', href: 'company'},
      {label: 'Compliance', href: 'certifications'},
      {label: 'Products', href: 'products'},
      {label: 'R&D', href: 'rnd'},
      {label: 'Stories', href: 'success-stories'},
      {label: 'FAQ', href: 'faq'},
      {label: 'Contact', href: 'contact'}
    ],
    hero: {
      eyebrow: 'Toy Export Website',
      title: 'yaoshun is an OEM / ODM toy manufacturer for global sourcing and brand partners',
      description:
        'We provide integrated support from product development and sampling to mass production and shipment. The homepage is structured around real B2B buying decisions so sourcing teams can evaluate and inquire faster.',
      primaryCta: 'Explore Products',
      secondaryCta: 'Start Inquiry',
      badges: ['OEM / ODM custom development', 'English / Chinese bilingual support', 'CE / ASTM / EN71 documentation support', 'SEO keywords deployed: wall washer / ai toys for kids / fort building kit'],
      metrics: [
        {value: '2014', label: 'Established', detail: 'Focused on toy export manufacturing.'},
        {value: '6,000 m²', label: 'Facility Area', detail: 'Production, assembly, packing and warehouse zones.'},
        {value: '50+', label: 'Team Size', detail: 'Engineering, QA, production and sales teams.'},
        {value: '200 tons / month', label: 'Monthly Capacity', detail: 'Supports both standard and custom projects.'}
      ],
      spotlightTitle: 'Sourcing Decision Flow',
      spotlightDescription:
        'The page follows a clear sequence: factory strength, compliance proof, product specs and direct inquiry channels.',
      spotlightPoints: [
        'Review factory scale, showroom and production visuals first.',
        'Check certification readiness and audit progress next.',
        'Connect directly via WhatsApp or email to start sampling and quotation.'
      ]
    },
    company: {
      eyebrow: 'Company Profile',
      title: 'Established in 2014, focused on export-oriented toy manufacturing',
      description:
        'Serious B2B buyers evaluate stability, compliance readiness and execution speed first. We surface those details clearly on the homepage.',
      facts: [
        {label: 'Established', value: '2014'},
        {label: 'Facility Area', value: '6,000 m²'},
        {label: 'Team Size', value: '50+'},
        {label: 'Monthly Capacity', value: '200 tons'}
      ],
      cards: [
        {
          title: 'Brand & Visual Assets',
          description: 'Domestic brand assets are finalized. International brand registration is in progress and expected in about 10 months.'
        },
        {
          title: 'Factory & Showroom Materials',
          description: 'High-resolution factory and showroom photography is being arranged to present production and QA workflows transparently.'
        },
        {
          title: 'Mission & Vision',
          description: 'Mission: Make toy manufacturing more reliable. Vision: Become a long-term OEM / ODM partner for global toy brands.'
        }
      ]
    },
    strengths: {
      eyebrow: 'Why Us',
      title: 'Four capabilities that matter most to toy sourcing teams',
      description: 'Each point addresses a key buyer concern: speed, reliability, engineering and quality consistency.',
      items: [
        {title: '24-hour sampling response', description: 'Priority projects can enter an accelerated sample scheduling window.'},
        {title: '10+ years of export collaboration', description: 'Long-term OEM / ODM execution for overseas customers with practical delivery discipline.'},
        {title: 'R&D and tooling coordination', description: 'Supports structure evaluation, sample optimization and mold-development cooperation.'},
        {title: 'Eco-compliant materials with QA control', description: 'Material compliance and AQL-based inspection are embedded into production flow.'}
      ]
    },
    compliance: {
      eyebrow: 'Trust & Compliance',
      title: 'Compliance and trust information is visible from the first screen',
      description: 'Toy sourcing decisions depend on market-entry compliance. We keep certification support and audit progress transparent.',
      certifications: [
        {name: 'CE', detail: 'CE-related support is available according to product category and destination market.'},
        {name: 'ASTM', detail: 'ASTM testing documentation can be prepared for North American projects.'},
        {name: 'EN71', detail: 'EN71 testing support can be aligned with EU project requirements.'},
        {name: 'Lab Reports', detail: 'Certification and test reports can be provided in about 15-20 working days after project confirmation.'}
      ],
      audits: [
        {name: 'BSCI', detail: 'Audit process is underway to strengthen supply-chain transparency.'},
        {name: 'ICTI', detail: 'ICTI preparation is in progress to meet toy-industry sourcing expectations.'},
        {name: 'ISO9001', detail: 'Quality system is being refined for stable and traceable project execution.'}
      ]
    },
    products: {
      eyebrow: 'Product Solutions',
      title: 'Core products with structured specs for faster buyer decisions',
      description: 'Material, age range, carton data, CBM, MOQ and lead time are displayed in a sourcing-friendly format.',
      items: [
        {
          name: 'AI Toys for Kids Companion Dog',
          tagline: 'Designed for educational and family-interaction scenarios',
          image: '/images/products/ai-smart-pup.svg',
          specs: ['Material: ABS + plush + silicone', 'Age: 3+', 'MOQ: 1000 pcs', 'Lead Time: 35 days'],
          detail: 'Supports localized voice packs, packaging customization and branded appearance updates.'
        },
        {
          name: 'Fort Building Kit',
          tagline: 'A STEM-focused construction set for retail and education channels',
          image: '/images/products/fort-kit.svg',
          specs: ['Material: PP + ABS', 'Carton: 8 sets / carton', 'CBM: 0.126', 'MOQ: 800 sets'],
          detail: 'Suitable for OEM colorways, localized instructions and retail packaging adaptation.'
        },
        {
          name: 'Wall Washer Story Projector',
          tagline: 'A toy-lighting hybrid for bedtime storytelling and gifting programs',
          image: '/images/products/wall-washer.svg',
          specs: ['Material: ABS + optical lens', 'Age: 3+', 'Carton: 24 pcs / carton', 'Lead Time: 28 days'],
          detail: 'Supports reel-content localization, housing customization and drop-test-ready packaging.'
        }
      ]
    },
    capability: {
      eyebrow: 'OEM / ODM Capability',
      title: 'Transparent development flow from requirement to shipment',
      description: 'Each stage is organized for clear progress tracking and consistent quality control in export projects.',
      workflow: [
        {step: '01 Requirement Confirmation', detail: 'Confirm market, age range, target price, packaging format and compliance scope.'},
        {step: '02 Structure & Tooling Review', detail: 'Evaluate structure feasibility, material selection and tooling plan.'},
        {step: '03 Sampling & Validation', detail: 'Run sample approval, packaging sync and key testing checks.'},
        {step: '04 Production & Delivery', detail: 'Execute scheduling, AQL inspection, container loading and shipment control.'}
      ],
      highlights: [
        'Supports both OEM appearance customization and ODM co-development.',
        'Engineering team can coordinate process reviews for Extruder-related components when required.',
        'New-product planning can be aligned with annual sourcing calendars.'
      ]
    },
    showroom: {
      eyebrow: 'Factory & Showroom',
      title: 'Real factory and shipment visuals build trust faster than claims',
      description: 'For overseas customers who cannot visit onsite, this section provides practical visual proof of operations.',
      spaces: [
        {title: 'Showroom Display', detail: 'Highlights AI toys, building kits and projector lines for quick category evaluation.'},
        {title: 'Production Floor', detail: 'Covers injection, assembly, QA and packing workflows with operational context.'},
        {title: 'Inspection & Shipment', detail: 'Shows inspection records, carton stacking and container loading standards.'}
      ]
    },
    stories: {
      eyebrow: 'Success Stories',
      title: 'Practical project outcomes help buyers evaluate risk quickly',
      description: 'Recent cooperation cases show execution speed, quality control and reorder performance.',
      items: [
        {
          title: 'European Chain Retail Program',
          result: 'First order of 2 x 40HQ delivered on schedule',
          detail: 'Production scheduling and packaging preparation were executed in parallel.'
        },
        {
          title: 'North America Education Launch',
          result: 'From sample to first production batch in 8 weeks',
          detail: 'R&D, sampling and testing workflows were synchronized for faster market entry.'
        },
        {
          title: 'Middle East Gift ODM Project',
          result: 'Localized packaging and bilingual content delivered',
          detail: 'Product appearance and packaging were adapted for local channel preferences.'
        }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Answer key sourcing questions early to improve inquiry quality',
      description: 'These are the most common B2B questions around MOQ, lead time, customization and compliance support.',
      items: [
        {
          question: 'What is your standard MOQ?',
          answer: 'Most projects start from 800-1200 units, depending on structure complexity and packaging requirements.'
        },
        {
          question: 'How long are sampling and production lead times?',
          answer: 'Sampling usually takes 7-15 days. Mass production is typically 28-35 days after sample approval.'
        },
        {
          question: 'Do you support OEM and ODM projects?',
          answer: 'Yes. We support OEM appearance/packaging customization and ODM co-development with tooling coordination.'
        },
        {
          question: 'When can certification and test documents be provided?',
          answer: 'CE, ASTM and EN71-related documentation can typically be prepared within 15-20 working days after project confirmation.'
        }
      ]
    },
    contact: {
      eyebrow: 'Inquiry & Launch',
      title: 'Move from browsing to inquiry with direct communication channels',
      description: 'Share your product requirement and target market. Our team will respond within one business day with a practical quotation path.',
      channels: [
        {label: 'WhatsApp', value: '+86 186 6552 7489', href: 'https://wa.me/8618665527489'},
        {label: 'LinkedIn', value: 'yaoshun Manufacturing', href: 'https://www.linkedin.com/company/lai-toys-manufacturing'},
        {label: 'Email', value: 'sales@lai-toys.com', href: 'mailto:sales@lai-toys.com'}
      ],
      checklistTitle: 'Project kickoff material checklist',
      checklist: [
        'Vector logo and brand color standards',
        'High-resolution factory and showroom photos',
        'CE / ASTM / EN71 files and lab reports',
        'Product specification sheets (material, size, carton rate, CBM)',
        'SEO keywords, privacy policy and social account links'
      ],
      notice: 'Please include target market and product model in your inquiry if you need certification files or audit-progress details.'
    },
    footer: {
      summary: 'yaoshun serves global toy buyers with OEM / ODM manufacturing focused on compliance, quality and reliable delivery.',
      legal: ['HTTPS / SSL deployment ready', 'GDPR privacy and cookie compliance supported', 'EU representative and German Packaging Act information can be published'],
      copyright: 'yaoshun. All rights reserved.'
    },
    seo: {
      title: 'yaoshun | OEM / ODM Toy Manufacturer',
      description: 'yaoshun provides export-oriented OEM / ODM toy manufacturing, including AI Toys for Kids, Fort Building Kit and Wall Washer product programs.',
      keywords: ['wall washer', 'ai toys for kids', 'fort building kit', 'toy manufacturer website', 'extruder']
    }
  }
};
