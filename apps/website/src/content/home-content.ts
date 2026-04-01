export {getSiteName, siteName} from '@/content/site-brand';

import {siteName} from '@/content/site-brand';
import type {Locale} from '@/types/content';

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
      {label: '资质中心', href: 'certifications'},
      {label: '产品方案', href: 'products'},
      {label: '研发定制', href: 'rnd'},
      {label: '合作案例', href: 'success-stories'},
      {label: 'FAQ', href: 'faq'},
      {label: '联系咨询', href: 'contact'}
    ],
    hero: {
      eyebrow: '玩具外贸官网',
      title: '东莞市尧顺科技有限公司，专注B端制造与加工服务',
      description:
        '我们提供从来样加工、包工包料到量产交付的一体化服务，主营拼插类玩具、PU管、PVC管，支持贴牌加工与开具专票。',
      primaryCta: '查看产品方案',
      secondaryCta: '发起项目咨询',
      badges: ['工商资质可查', 'ISO 9000 / CE 认证支持', '支持拿样与来样加工', '支持包工包料与贴牌加工'],
      metrics: [
        {value: '9年', label: '主营经验', detail: '持续服务B端制造与加工客户。'},
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
      title: '东莞市尧顺科技有限公司，9年B端制造经验',
      description: '客户最关注的是主体资质、稳定交付与加工能力。我们将工商资质、认证信息与主营方向集中展示，便于快速评估合作可行性。',
      facts: [
        {label: '主营经验', value: '9年'},
        {label: '厂房面积', value: '6,000 m²'},
        {label: '员工人数', value: '50+'},
        {label: '月产能力', value: '200 吨'}
      ],
      cards: [
        {
          title: '公司主体信息',
          description: '公司名称：东莞市尧顺科技有限公司；地址：广东东莞茶山镇圆山路177号1号楼201室。'
        },
        {
          title: '主营业务',
          description: '拼插类玩具、PU管、PVC管；支持来样加工、包工包料、拿样与贴牌加工。'
        },
        {
          title: '资质与服务能力',
          description: '可提供工商资质、ISO 9000 与 CE 认证资料，支持开具增值税专票。'
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
      eyebrow: 'Qualification Center',
      title: '资质中心信息前置展示，便于快速核验',
      description: '围绕客户常见的合作审核需求，我们集中展示工商资质、质量认证与项目资料支持能力。',
      certifications: [
        {name: '工商资质', detail: '可提供工商注册主体信息与基础资质材料。'},
        {name: 'ISO 9000', detail: '可提供 ISO 9000 相关质量管理体系资料。'},
        {name: 'CE', detail: '欧盟市场项目可按产品类别提供 CE 相关测试与文件支持。'},
        {name: '检测报告', detail: '项目确认后可按需求配合提供检测与认证资料。'}
      ],
      audits: [
        {name: '支持拿样', detail: '可按沟通方案提供样品，帮助客户快速完成前期验证。'},
        {name: '来样加工', detail: '支持客户来样加工与工艺打样优化。'},
        {name: '包工包料', detail: '支持包工包料整体交付，降低采购协同成本。'}
      ]
    },
    products: {
      eyebrow: 'Product Solutions',
      title: '工厂店主营产品与加工能力一页展示',
      description: '围绕实际主营方向展示拼插玩具、塑料管材与挤出设备相关能力，帮助客户快速匹配合作方式。',
      items: [
        {
          name: '拼插类益智玩具',
          tagline: '适用于益智、科教、婴儿及过家家玩具方向',
          image: '/images/products/ai-smart-pup.svg',
          specs: ['材质：ABS / PP 工程塑胶', '支持拿样', '支持来样加工', '贴牌起订量：1000套'],
          detail: '支持来样加工、来图加工、贴牌加工，可开具增值税专票。'
        },
        {
          name: 'PU / PVC 管材与异型材',
          tagline: '面向物流包装、绝缘材料、饮水用具等配套场景',
          image: '/images/products/fort-kit.svg',
          specs: ['材质：PU / PVC / TPU', '定制起订量：5000米', '采购周期：10天', '支持包工包料'],
          detail: '适配 LED 灯条套管、医疗管、车身与家装封边条等产品需求。'
        },
        {
          name: '塑料机械与挤出设备',
          tagline: '覆盖塑料机械、橡胶机械及相关工程塑胶配套',
          image: '/images/products/wall-washer.svg',
          specs: ['工艺：注塑/挤塑/缠绕/滚塑', '设备：裁管机 / 牵引机', '支持来图加工', '合作方式灵活'],
          detail: '提供注塑产品设计、开发、生产、销售、服务一体化能力。'
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
      checklist: ['主营方向（拼插玩具 / 管材 / 机械）', '合作方式（清加工 / 包工包料 / 来样加工 / 来图加工）', '起订量与交期要求', '是否需要贴牌加工与开票', '资质文件需求（工商资质 / ISO 9000 / CE）'],
      notice: '如需查看企业诚信、税务评级或资质文件，请在询盘中注明具体用途。'
    },
    footer: {
      summary: '尧顺面向全球采购商提供 OEM / ODM 玩具制造服务，强调合规、质量与稳定交付。',
      legal: ['支持 HTTPS / SSL 部署', '支持 GDPR 隐私政策与 Cookie 合规模块', '支持欧代与德国包装法相关页面信息展示'],
      copyright: '尧顺. All rights reserved.'
    },
    seo: {
      title: '尧顺 | 玩具 OEM / ODM 制造商',
      description: '东莞市尧顺科技有限公司主营拼插类玩具、PU管、PVC管，支持来样加工、包工包料、贴牌加工与资质资料配合。',
      keywords: ['东莞玩具', '拼插类玩具', 'PU管', 'PVC管', '来样加工', '包工包料', '支持贴牌加工', '可开专票', 'ISO 9000认证', 'CE认证']
    }
  },
  en: {
    nav: [
      {label: 'Company', href: 'company'},
      {label: 'Qualification Center', href: 'certifications'},
      {label: 'Products', href: 'products'},
      {label: 'R&D', href: 'rnd'},
      {label: 'Stories', href: 'success-stories'},
      {label: 'FAQ', href: 'faq'},
      {label: 'Contact', href: 'contact'}
    ],
    hero: {
      eyebrow: 'Factory Website',
      title: 'Dongguan Yaoshun Technology Co., Ltd. | Factory Store and Processing Services',
      description:
        'We focus on interlocking toys, PU/PVC tubes, profiles, plastic machinery and engineering plastic products, with flexible processing and private-label support.',
      primaryCta: 'View Factory Store',
      secondaryCta: 'Send Inquiry',
      badges: ['Business qualifications available', 'ISO 9000 and CE support', 'Sample and drawing-based processing support', 'Private-label and VAT invoice support'],
      metrics: [
        {value: '2013', label: 'Company Established', detail: 'Approved and registered enterprise.'},
        {value: '11-50', label: 'Production Staff', detail: 'Stable team for flexible processing and delivery.'},
        {value: 'RMB 510K-1M', label: 'Monthly Output Value', detail: 'Supports ongoing factory-store and project orders.'},
        {value: '10 days', label: 'Raw Material Lead Time', detail: 'Fast procurement cycle for common materials.'}
      ],
      spotlightTitle: 'Cooperation Decision Flow',
      spotlightDescription:
        'The homepage follows a clear order: qualifications, factory profile, product categories and direct inquiry.',
      spotlightPoints: [
        'Review business qualifications and trust profile first.',
        'Check factory archive, processing methods and MOQ conditions.',
        'Submit inquiry with your required category and processing model.'
      ]
    },
    company: {
      eyebrow: 'Company Profile',
      title: 'Factory profile and capabilities at a glance',
      description:
        'B2B customers usually evaluate legal qualifications, stable execution and category match first. We show those details clearly.',
      facts: [
        {label: 'Established', value: '2013'},
        {label: 'Archive Date', value: '2016.08.26'},
        {label: 'Annual Turnover', value: 'RMB 1.01M-5M'},
        {label: 'Staff', value: '11-50'}
      ],
      cards: [
        {
          title: 'Main Categories',
          description: 'Interlocking toys, PU/PVC tubes, profiles, plastic machinery and accessories.'
        },
        {
          title: 'Processing Models',
          description: 'Labor processing, labor+material, sample-based processing and drawing-based processing.'
        },
        {
          title: 'Commercial Support',
          description: 'Private-label support, VAT invoice availability, and qualification documents for onboarding.'
        }
      ]
    },
    strengths: {
      eyebrow: 'Why Us',
      title: 'Four practical strengths for project execution',
      description: 'Each point maps directly to common cooperation requirements.',
      items: [
        {title: 'Category Coverage', description: 'From toys to tubes and machinery-related plastic products.'},
        {title: 'Flexible Processing', description: 'Supports multiple processing routes and cooperation models.'},
        {title: 'Stable Procurement', description: 'Raw material procurement lead time is about 10 days.'},
        {title: 'Qualification Ready', description: 'Business qualification, ISO 9000, CE and trust profile available.'}
      ]
    },
    compliance: {
      eyebrow: 'Qualification Center',
      title: 'Qualification and trust information shown up front',
      description: 'This section centralizes legal, certification and enterprise-trust information.',
      certifications: [
        {name: 'Entity Qualifications', detail: 'Business registration and subject qualification documents are available.'},
        {name: 'ISO 9000', detail: 'Quality-management related documentation support is available.'},
        {name: 'CE', detail: 'CE-related documentation can be provided per project category.'},
        {name: 'Tax Rating', detail: 'Tax rating and trust profile information can be provided for review.'}
      ],
      audits: [
        {name: 'Sample Support', detail: 'Sample requests are supported for project validation.'},
        {name: 'Sample-Based Processing', detail: 'Sample and drawing-based processing are both supported.'},
        {name: 'Labor + Material', detail: 'Integrated labor+material delivery is supported.'}
      ]
    },
    products: {
      eyebrow: 'Product Solutions',
      title: 'Factory-store categories and practical delivery conditions',
      description: 'The page focuses on main categories, MOQ and processing capabilities.',
      items: [
        {
          name: 'Interlocking and Educational Toys',
          tagline: 'For educational, baby and pretend-play toy channels',
          image: '/images/products/ai-smart-pup.svg',
          specs: ['Material: ABS / PP', 'Sample support: Yes', 'Private-label MOQ: 1000 sets', 'Processing: Sample / drawing based'],
          detail: 'Supports private-label processing and VAT invoicing.'
        },
        {
          name: 'PU / PVC Tubes and Profiles',
          tagline: 'For packaging, insulation and utility applications',
          image: '/images/products/fort-kit.svg',
          specs: ['Material: PU / PVC / TPU', 'Custom MOQ: 5000 meters', 'Lead time: 10 days', 'Model: Labor + material'],
          detail: 'Supports LED sleeves, medical tubes and trim-strip scenarios.'
        },
        {
          name: 'Plastic Machinery and Extrusion Support',
          tagline: 'Machinery and engineering-plastic matching services',
          image: '/images/products/wall-washer.svg',
          specs: ['Processes: Injection / extrusion / winding / rotational', 'Equipment: Tube cutter / traction machine', 'Drawing-based processing: Yes', 'Tax invoice: 13% VAT'],
          detail: 'Integrated design, development, production and after-service support.'
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
      title: 'Move from category browsing to direct inquiry',
      description: 'Share required category, processing model and MOQ. Our team will respond with practical cooperation details.',
      channels: [
        {label: 'WhatsApp', value: '+86 186 6552 7489', href: 'https://wa.me/8618665527489'},
        {label: 'LinkedIn', value: 'yaoshun Manufacturing', href: 'https://www.linkedin.com/company/lai-toys-manufacturing'},
        {label: 'Email', value: 'sales@lai-toys.com', href: 'mailto:sales@lai-toys.com'}
      ],
      checklistTitle: 'Project kickoff material checklist',
      checklist: [
        'Required category (toys / tubes / machinery / accessories)',
        'Cooperation model (labor-only / labor+material / sample-based / drawing-based)',
        'MOQ and lead-time expectations',
        'Whether private-label and invoice support are needed',
        'Qualification document requirements (entity / ISO 9000 / CE / trust profile)'
      ],
      notice: 'Please mention your intended usage scenario if you need qualification or trust documents.'
    },
    footer: {
      summary: 'yaoshun provides B2B processing and manufacturing services with clear qualification, category and cooperation information.',
      legal: ['HTTPS / SSL deployment ready', 'GDPR privacy and cookie compliance supported', 'EU representative and German Packaging Act information can be published'],
      copyright: 'yaoshun. All rights reserved.'
    },
    seo: {
      title: 'yaoshun | Factory Store and Processing Services',
      description: 'Dongguan Yaoshun provides interlocking toys, PU/PVC tubes, profile processing, machinery support and flexible B2B cooperation models.',
      keywords: ['dongguan toys', 'interlocking toys', 'pu tube', 'pvc tube', 'sample-based processing', 'private-label processing', 'iso 9000', 'ce']
    }
  }
};
