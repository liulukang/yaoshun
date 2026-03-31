import type {Locale} from '@/types/content';

export const siteName = 'Auralyn Toys';

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
      {label: '公司概览', href: '#company'},
      {label: '核心优势', href: '#strengths'},
      {label: '资质合规', href: '#compliance'},
      {label: '产品方案', href: '#products'},
      {label: '研发定制', href: '#capability'},
      {label: '合作案例', href: '#stories'},
      {label: 'FAQ', href: '#faq'},
      {label: '联系咨询', href: '#contact'}
    ],
    hero: {
      eyebrow: '玩具外贸官网首页概念版',
      title: '年轻、明快、带点惊喜感的玩具品牌首页，也能同时打动全球采购商',
      description:
        '这版首页把传统制造官网里偏重、偏硬的表达，换成更有玩具品牌感的颜色、节奏和层次。它依然服务 B2B 采购决策，但第一眼的感受会更轻盈、更年轻，也更容易让人记住。',
      primaryCta: '查看产品方案',
      secondaryCta: '开始项目咨询',
      badges: ['OEM / ODM 定制开发', 'CE / ASTM / EN71 合规导向', '支持中英双语切换', '适配 SEO 与外贸询盘转化'],
      metrics: [
        {value: '12 年+', label: '玩具代工经验', detail: '覆盖欧美零售、礼品与教育渠道项目。'},
        {value: '24h', label: '快速打样响应', detail: '重点 SKU 与定制项目可启动快速样品流程。'},
        {value: '38 国', label: '市场服务经验', detail: '兼顾北美、欧洲、中东与东南亚渠道需求。'},
        {value: '600k+', label: '月产能规划', detail: '支持大货排产、AQL 抽检与出货协同。'}
      ],
      spotlightTitle: '首页核心叙事',
      spotlightDescription:
        '不是简单罗列工厂信息，而是按采购决策路径组织内容，让买家从“看起来靠谱”走到“值得发询盘”。',
      spotlightPoints: [
        '第一屏先传达品牌质感、产能规模与合规门槛。',
        '中段用产品参数、OEM 流程与研发能力承接商业决策。',
        '尾段用案例、FAQ 与即时联络方式促成询盘转化。'
      ]
    },
    company: {
      eyebrow: 'Company Profile',
      title: '真实工厂感依旧重要，但呈现方式可以更轻、更有品牌表情',
      description:
        '首页信息架构围绕海外客户最在意的三件事展开：你是不是稳定工厂、你能不能做复杂定制、你是否具备长期合作所需的合规与交付能力。',
      facts: [
        {label: '成立时间', value: '2014' },
        {label: '厂房面积', value: '18,000 m²' },
        {label: '员工人数', value: '260+' },
        {label: '月产能', value: '600,000 pcs' }
      ],
      cards: [
        {
          title: '品牌基底',
          description: '首页会围绕 Logo 主色、真实厂房影像与国际化排版气质建立视觉记忆点。'
        },
        {
          title: '稳定制造',
          description: '把成立年限、展厅、车间、质检实验区和出货节奏转化为买家可感知的规模语言。'
        },
        {
          title: '长期合作',
          description: '通过使命、愿景与团队协同能力，传达企业不是只接单，而是能陪品牌一起迭代。'
        }
      ]
    },
    strengths: {
      eyebrow: 'Why Us',
      title: '把“为什么选你”讲得更清楚，也讲得更有年轻品牌张力',
      description: '我们把差异化卖点做成有节奏的高价值信息块，让采购、品牌和产品经理都能快速抓住重点。',
      items: [
        {title: '24 小时样品响应机制', description: '对重点项目建立样品排期窗口，让客户看到你的配合效率。'},
        {title: '10 年以上海外 OEM / ODM 协作经验', description: '不只制造，还懂包装、认证、运输与市场节奏。'},
        {title: '自主设计与模具开发团队', description: '从概念草图、结构拆解到打样验证，缩短新品上市周期。'},
        {title: '环保材料与标准化质检流程', description: '把原料合规、跌落测试、色牢度和抽检体系讲清楚。'}
      ]
    },
    compliance: {
      eyebrow: 'Trust & Compliance',
      title: '合规资质不是附属页，而是首页必须被看见的信任资产',
      description: '玩具行业的成交起点往往不是设计，而是准入。首页需要提前释放认证、验厂和质量管理体系的可信度。',
      certifications: [
        {name: 'CE', detail: '欧盟玩具市场准入标准展示位，可放置证书编号与有效期。'},
        {name: 'ASTM', detail: '美国市场安全测试标准，对北美买家是强决策信息。'},
        {name: 'EN71', detail: '欧洲玩具安全核心规范，适合与检测报告摘要一起展示。'},
        {name: '检测报告', detail: '支持上传 PDF 摘要、检测项目截图与批次适用范围说明。'}
      ],
      audits: [
        {name: 'BSCI', detail: '强调工厂社会责任与供应链稳定性，帮助筛掉低质量竞争。'},
        {name: 'ICTI', detail: '玩具行业强信任背书，尤其适合面向大型采购商与品牌客户。'},
        {name: 'ISO9001', detail: '质量管理体系的长期承诺，强化交付一致性预期。'}
      ]
    },
    products: {
      eyebrow: 'Product Solutions',
      title: '把产品能力做成更像品牌橱窗的展示，而不是一排冰冷参数',
      description: '不是简单摆图，而是用高意向字段呈现产品价值：材质、年龄段、装箱率、CBM、MOQ、交期与定制方向。',
      items: [
        {
          name: 'AI 智能陪伴玩具',
          tagline: '面向教育互动与情绪陪伴场景的高附加值玩具方案',
          image: '/images/products/ai-smart-pup.svg',
          specs: ['材质：ABS + 毛绒 + 硅胶', '适龄：3+', 'MOQ：1000 pcs', '交期：35 days'],
          detail: '支持多语言故事包、品牌音色定制与包装本地化，适合做礼盒套装与品牌联名。'
        },
        {
          name: 'STEM 城堡搭建套装',
          tagline: '适合零售渠道与教育场景的结构拼搭类玩具',
          image: '/images/products/fort-kit.svg',
          specs: ['材质：PP + ABS', '装箱：8 sets / carton', 'CBM：0.126', 'MOQ：800 sets'],
          detail: '可做 OEM 配色、说明书本地化与零售包装升级，兼顾玩法与物流利润率。'
        },
        {
          name: '故事投影夜灯系列',
          tagline: '将氛围照明、睡前故事与礼品属性整合的畅销方向',
          image: '/images/products/wall-washer.svg',
          specs: ['材质：ABS + 光学镜片', '适龄：3+', '装箱：24 pcs / carton', '交期：28 days'],
          detail: '支持图卡内容替换、IP 本地化与跌落测试需求，适合礼赠与商超陈列场景。'
        }
      ]
    },
    capability: {
      eyebrow: 'OEM / ODM Capability',
      title: '把定制开发流程做成买家愿意继续聊下去的理由',
      description: '首页直接给出研发与定制能力路径，让客户知道从想法到出货，你们每一步都能接住。',
      workflow: [
        {step: '01 需求共创', detail: '梳理目标市场、年龄段、价位带、包装方式与认证要求。'},
        {step: '02 结构与模具评估', detail: '从功能、材料与量产可行性出发，降低后续返工成本。'},
        {step: '03 打样与测试', detail: '建立样品确认、包装同步和关键风险前置验证机制。'},
        {step: '04 量产与交付', detail: '以排产、抽检、装柜与物流节奏保证大货稳定输出。'}
      ],
      highlights: [
        '每年可规划多组新品方向，适合长期 ODM 合作。',
        '支持结构设计、外观优化、包装提案与样机验证。',
        '首页可进一步延展至模具能力、设计软件与案例图库。'
      ]
    },
    showroom: {
      eyebrow: 'Factory & Showroom',
      title: '真实工厂、真实展厅、真实出货画面，远比空泛口号更有说服力',
      description: '这一屏专门为“无法到场看厂”的海外买家准备，用视觉细节建立真实感和代入感。',
      spaces: [
        {title: '展厅氛围', detail: '展示多品类陈列、系列化陈设与新品样墙，营造成熟品牌感。'},
        {title: '生产现场', detail: '展示注塑、装配、质检与包装线，体现产线完整度与管理秩序。'},
        {title: '出货与验货', detail: '展示大货整柜、抽检记录与外箱堆码细节，强化交付可信度。'}
      ]
    },
    stories: {
      eyebrow: 'Success Stories',
      title: '案例和合作经历，是帮助买家降低试错成本的最快方式',
      description: '首页用简洁但有分量的案例摘要，传达你曾经服务过什么类型的客户、解决过什么问题。',
      items: [
        {
          title: '欧洲精品零售项目',
          result: '90 天上市周期压缩到 55 天',
          detail: '通过样品与包装并行推进，帮助客户赶上秋冬档期。'
        },
        {
          title: '北美节日礼品渠道项目',
          result: '连续两季稳定复购',
          detail: '通过 AQL 抽检与跌落测试标准，降低退货与售后风险。'
        },
        {
          title: '中东连锁渠道 ODM 项目',
          result: '实现多语言包装与内容本地化',
          detail: '首页可以继续承接品牌 Logo、展会图与大货实拍进行深度背书。'
        }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: '先回答买家最常问的问题，再减少低质量沟通成本',
      description: 'MOQ、交期、打样费、OEM 支持、质保与认证，是首页尾段最适合承接转化的高频问题。',
      items: [
        {
          question: '常规 MOQ 是多少？',
          answer: '多数项目根据结构复杂度和包装方案，起订量集中在 800 至 1200 件之间。'
        },
        {
          question: '打样周期和量产交期如何安排？',
          answer: '打样通常 7 至 15 天，样品确认后常规量产交期为 28 至 35 天。'
        },
        {
          question: '是否支持 OEM / ODM 与私模开发？',
          answer: '支持从外观、结构、包装到品牌元素的深度定制，也可协同模具开发。'
        },
        {
          question: '能否提供认证与验厂资料？',
          answer: '可以在沟通阶段按项目类型提供证书、检测报告和验厂摘要材料。'
        }
      ]
    },
    contact: {
      eyebrow: 'Inquiry & Launch',
      title: '让好感和兴趣别停在浏览里，顺手就能进入询盘',
      description: '首页底部建议放即时联系渠道、项目启动资料清单与法律合规提示，让询盘在最短路径内发生。',
      channels: [
        {label: 'WhatsApp', value: '+86 138 0000 0000', href: 'https://wa.me/8613800000000'},
        {label: 'LinkedIn', value: 'Auralyn Toys', href: 'https://www.linkedin.com/'},
        {label: 'Email', value: 'sales@auralyn-toys.com', href: 'mailto:sales@auralyn-toys.com'}
      ],
      checklistTitle: '启动官网定制前建议准备',
      checklist: [
        '矢量 Logo、品牌色与 2 至 3 个参考网站',
        '工厂 / 展厅高清实拍原片',
        '认证证书、检测报告与验厂文件',
        '产品规格表、CBM、装箱率与 MOQ 数据',
        '专业英文文案、SEO 关键词与隐私政策'
      ],
      notice: '当前首页文案与数据为高质感演示版，正式上线前建议替换为企业真实资料与授权案例。'
    },
    footer: {
      summary: '面向全球玩具采购商的 OEM / ODM 制造合作伙伴，把品牌年轻感、合规性与稳定交付放在同一张首页里。',
      legal: ['支持 HTTPS / SSL 部署', '可补充 GDPR 隐私政策与 Cookie 合规模块', '适配 Google SEO 基础信息埋点'],
      copyright: 'Auralyn Toys. All rights reserved.'
    },
    seo: {
      title: 'Auralyn Toys | 玩具外贸官网首页',
      description: '大气、多语言、适合玩具外贸 OEM / ODM 企业的官网首页方案，突出合规、产品参数、研发定制与询盘转化。',
      keywords: ['玩具外贸官网', 'toy manufacturer website', 'OEM ODM toy supplier', 'CE ASTM EN71 toys', 'multilingual B2B website']
    }
  },
  en: {
    nav: [
      {label: 'Company', href: '#company'},
      {label: 'Strengths', href: '#strengths'},
      {label: 'Compliance', href: '#compliance'},
      {label: 'Products', href: '#products'},
      {label: 'Capability', href: '#capability'},
      {label: 'Stories', href: '#stories'},
      {label: 'FAQ', href: '#faq'},
      {label: 'Contact', href: '#contact'}
    ],
    hero: {
      eyebrow: 'Toy Manufacturing Homepage Concept',
      title: 'A younger, brighter toy-manufacturer homepage that still feels ready for serious global buyers',
      description:
        'This version replaces the heavy industrial tone with a lighter, more playful brand language. It still supports B2B decision-making, but the first impression feels fresher, faster and far more memorable.',
      primaryCta: 'Explore product solutions',
      secondaryCta: 'Start an inquiry',
      badges: ['OEM / ODM custom development', 'CE / ASTM / EN71 compliance-oriented', 'English and Chinese language switch', 'Built for SEO and inquiry conversion'],
      metrics: [
        {value: '12+ years', label: 'OEM background', detail: 'Serving retail, gifting and educational toy programs.'},
        {value: '24h', label: 'Sample response', detail: 'Fast-start workflow for priority SKU and custom projects.'},
        {value: '38 markets', label: 'Export-facing know-how', detail: 'Supporting North America, Europe, Middle East and Southeast Asia.'},
        {value: '600k+', label: 'Monthly capacity plan', detail: 'Ready for scheduling, AQL inspection and shipment alignment.'}
      ],
      spotlightTitle: 'Homepage storytelling logic',
      spotlightDescription:
        'The page is structured around the real purchasing path, so buyers move naturally from initial trust to product interest to direct inquiry.',
      spotlightPoints: [
        'The opening screen communicates brand quality, capacity scale and compliance confidence.',
        'The middle sections translate product specs, OEM workflow and R&D depth into business value.',
        'The final sections use stories, FAQ and direct channels to shorten the inquiry path.'
      ]
    },
    company: {
      eyebrow: 'Company Profile',
      title: 'Factory credibility still matters, but it can be presented with much more energy',
      description:
        'The homepage is built around what serious toy buyers care about most: whether you are a stable manufacturer, whether you can handle custom development and whether your operation is compliant enough for long-term cooperation.',
      facts: [
        {label: 'Established', value: '2014'},
        {label: 'Facility Area', value: '18,000 m²'},
        {label: 'Team Size', value: '260+'},
        {label: 'Monthly Capacity', value: '600,000 pcs'}
      ],
      cards: [
        {
          title: 'Brand foundation',
          description: 'The homepage can be built around your logo system, authentic factory imagery and an international visual tone.'
        },
        {
          title: 'Stable manufacturing',
          description: 'Factory age, showroom presence, production lines, QA lab and shipment rhythm all become visible proof points.'
        },
        {
          title: 'Long-term partnership',
          description: 'Mission, vision and cross-functional collaboration help buyers see you as a partner, not only a supplier.'
        }
      ]
    },
    strengths: {
      eyebrow: 'Why Us',
      title: 'Your differentiation should feel sharper, younger and easier to remember',
      description: 'Each selling point is packaged as a premium information block so buyers, brand teams and product managers can understand your edge quickly.',
      items: [
        {title: '24-hour sample response window', description: 'A visible sign of speed and coordination for buyers under launch pressure.'},
        {title: '10+ years of overseas OEM / ODM collaboration', description: 'Not only manufacturing, but packaging, testing, freight and market timing awareness.'},
        {title: 'In-house design and mold development team', description: 'From concept sketch to structural validation, shortening the path to launch.'},
        {title: 'Eco-compliant materials and standardized QA', description: 'Clear messaging around raw material standards, drop test and inspection logic.'}
      ]
    },
    compliance: {
      eyebrow: 'Trust & Compliance',
      title: 'Compliance assets should be visible on the homepage, not buried on a secondary page',
      description: 'In toys, access often comes before creativity. The homepage should surface certification, audit and quality-system confidence early in the journey.',
      certifications: [
        {name: 'CE', detail: 'A dedicated visual slot for EU market compliance, certificate number and validity window.'},
        {name: 'ASTM', detail: 'A core decision signal for North American buyers reviewing safety readiness.'},
        {name: 'EN71', detail: 'The essential European toy safety framework, ideal with testing report highlights.'},
        {name: 'Lab Reports', detail: 'Ready to present PDF summaries, test snapshots and batch applicability notes.'}
      ],
      audits: [
        {name: 'BSCI', detail: 'Signals social responsibility and supply-chain seriousness.'},
        {name: 'ICTI', detail: 'A strong trust marker for toy brands and larger procurement teams.'},
        {name: 'ISO9001', detail: 'Shows long-term commitment to quality consistency and process discipline.'}
      ]
    },
    products: {
      eyebrow: 'Product Solutions',
      title: 'Turn product capability into a brand showcase instead of a cold specification wall',
      description: 'Instead of a shallow gallery, the section highlights the fields B2B buyers care about most: material, age range, carton rate, CBM, MOQ, lead time and customization direction.',
      items: [
        {
          name: 'AI Interactive Companion Toys',
          tagline: 'A higher-value direction for educational and emotional interaction programs',
          image: '/images/products/ai-smart-pup.svg',
          specs: ['Material: ABS + plush + silicone', 'Age: 3+', 'MOQ: 1000 pcs', 'Lead Time: 35 days'],
          detail: 'Supports multilingual story packs, mascot voice customization and localized packaging programs.'
        },
        {
          name: 'STEM Fort Building Set',
          tagline: 'Structured play for retail and educational channels',
          image: '/images/products/fort-kit.svg',
          specs: ['Material: PP + ABS', 'Carton: 8 sets / carton', 'CBM: 0.126', 'MOQ: 800 sets'],
          detail: 'Suitable for OEM colorways, instruction localization and retail-ready packaging upgrades.'
        },
        {
          name: 'Story Projector Night Light',
          tagline: 'A commercial blend of ambient lighting, bedtime storytelling and gifting appeal',
          image: '/images/products/wall-washer.svg',
          specs: ['Material: ABS + optical lens', 'Age: 3+', 'Carton: 24 pcs / carton', 'Lead Time: 28 days'],
          detail: 'Supports localized reel content, IP adaptation and drop-test-oriented packaging needs.'
        }
      ]
    },
    capability: {
      eyebrow: 'OEM / ODM Capability',
      title: 'Make the development workflow itself a reason for buyers to keep talking',
      description: 'The homepage can map your R&D and manufacturing process clearly, showing that every stage from idea to shipment is covered.',
      workflow: [
        {step: '01 Requirement Alignment', detail: 'Define market, age group, target price, packaging type and certification scope.'},
        {step: '02 Structure and Tooling Review', detail: 'Evaluate function, material and mass-production feasibility early.'},
        {step: '03 Sampling and Validation', detail: 'Run sample confirmation, packaging sync and key-risk checks in parallel.'},
        {step: '04 Production and Delivery', detail: 'Control scheduling, inspection, loading and shipping cadence for stable execution.'}
      ],
      highlights: [
        'Multiple new product directions can be planned every year for ODM cooperation.',
        'Supports structural design, visual refinement, packaging proposals and prototype validation.',
        'The section can later expand with tooling detail, software stack and project gallery assets.'
      ]
    },
    showroom: {
      eyebrow: 'Factory & Showroom',
      title: 'Real factory scenes, showroom atmosphere and shipment details speak louder than generic claims',
      description: 'This section is designed specifically for overseas buyers who cannot visit the factory in person.',
      spaces: [
        {title: 'Showroom Presence', detail: 'Display category depth, curated presentation and new-product walls to create a mature brand impression.'},
        {title: 'Production Floor', detail: 'Show injection, assembly, QA and packing lines to communicate operational completeness.'},
        {title: 'Inspection and Shipment', detail: 'Use container loading, carton stacking and inspection records to reinforce delivery trust.'}
      ]
    },
    stories: {
      eyebrow: 'Success Stories',
      title: 'Past cooperation reduces perceived risk faster than almost anything else',
      description: 'Short but meaningful case summaries show what kind of customers you served and what business problems you solved.',
      items: [
        {
          title: 'European Specialty Retail Program',
          result: 'Launch cycle reduced from 90 days to 55 days',
          detail: 'Sample and packaging tracks moved in parallel to capture the seasonal window.'
        },
        {
          title: 'North America Holiday Gifting Program',
          result: 'Stable repeat orders across two seasons',
          detail: 'AQL and drop-test discipline lowered return risk and after-sales pressure.'
        },
        {
          title: 'Middle East ODM Chain Project',
          result: 'Localized packaging and content delivery',
          detail: 'This area can later host approved logos, fair photos and shipment visuals.'
        }
      ]
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Answer the common questions early and reduce low-value back-and-forth',
      description: 'MOQ, lead time, sample fee, OEM support, warranty and certification are ideal conversion questions for the closing part of the page.',
      items: [
        {
          question: 'What is your standard MOQ?',
          answer: 'Most programs begin from 800 to 1200 units depending on structure complexity and packaging type.'
        },
        {
          question: 'How do sampling and production lead times work?',
          answer: 'Sampling is typically 7 to 15 days, and mass production usually runs 28 to 35 days after approval.'
        },
        {
          question: 'Do you support OEM, ODM and private tooling?',
          answer: 'Yes. We can support deep customization across appearance, structure, packaging and brand elements.'
        },
        {
          question: 'Can you provide certification and audit documents?',
          answer: 'Yes. Relevant certificates, reports and audit summaries can be shared according to project scope.'
        }
      ]
    },
    contact: {
      eyebrow: 'Inquiry & Launch',
      title: 'Keep the momentum alive and turn interest into inquiry in one move',
      description: 'The closing area is built to combine instant channels, a project-material checklist and legal trust signals so inquiries happen with less friction.',
      channels: [
        {label: 'WhatsApp', value: '+86 138 0000 0000', href: 'https://wa.me/8613800000000'},
        {label: 'LinkedIn', value: 'Auralyn Toys', href: 'https://www.linkedin.com/'},
        {label: 'Email', value: 'sales@auralyn-toys.com', href: 'mailto:sales@auralyn-toys.com'}
      ],
      checklistTitle: 'Recommended inputs before website production',
      checklist: [
        'Vector logo, brand colors and 2 to 3 benchmark websites',
        'High-resolution factory and showroom photography',
        'Certificates, lab reports and audit files',
        'Product specification sheets, CBM, carton data and MOQ',
        'Professional English copy, SEO keywords and privacy policy'
      ],
      notice: 'The current wording and figures are premium demo content. Replace them with approved corporate assets before launch.'
    },
    footer: {
      summary: 'An OEM / ODM manufacturing partner for global toy buyers, balancing youthful brand energy with compliance and dependable delivery.',
      legal: ['Ready for HTTPS / SSL deployment', 'Can be extended with GDPR privacy and cookie compliance modules', 'Structured for Google SEO essentials'],
      copyright: 'Auralyn Toys. All rights reserved.'
    },
    seo: {
      title: 'Auralyn Toys | Toy Manufacturer Homepage',
      description: 'A premium multilingual homepage concept for toy OEM and ODM manufacturers, focused on compliance, product depth, R&D capability and inquiry conversion.',
      keywords: ['toy manufacturer website', 'OEM ODM toy supplier', 'multilingual B2B website', 'CE ASTM EN71 toys', 'toy factory homepage']
    }
  }
};
