import {placeholderImages} from '@/content/site/shared';

export const homeContent = {
  seo: {
    title: {
      en: 'Dongguan Yaoshun Technology Co., Ltd. | 东莞市尧顺科技有限公司 | Interlocking & Educational Toys',
      zh: '东莞市尧顺科技有限公司 | Dongguan Yaoshun Technology Co., Ltd. | 拼插益智玩具与儿童玩具'
    },
    description: {
      en: 'Dongguan Yaoshun Technology Co., Ltd. (东莞市尧顺科技有限公司), founded in 2006, provides plastic extrusion equipment, precision injection molding, AI smart toys, DIY children toys, plastic profiles, and OEM/ODM production support for global B2B buyers.',
      zh: '东莞市尧顺科技有限公司（Dongguan Yaoshun Technology Co., Ltd.）始创于 2006 年，面向全球 B 端客户提供塑胶挤出设备、精密注塑、AI 智能玩具、DIY 儿童玩具、塑胶型材以及 OEM/ODM 生产支持。'
    },
    keywords: {
      en: [
        'Dongguan Yaoshun Technology',
        'Dongguan Yaoshun Technology Co., Ltd.',
        'Yaoshun toy manufacturer',
        'toy manufacturer',
        'toy manufacturer china',
        'b2b toy supplier',
        'educational toy manufacturer',
        'interlocking toy manufacturer',
        'pretend play toy manufacturer',
        'oem odm toy factory',
        'plastic toy manufacturer',
        'custom toy production'
      ],
      zh: [
        '东莞市尧顺科技有限公司',
        '东莞市尧顺科技',
        '尧顺玩具制造',
        '玩具厂家',
        '玩具制造工厂',
        'B2B玩具供应商',
        '益智玩具厂家',
        '拼插玩具厂家',
        '过家家玩具厂家',
        'OEM ODM玩具工厂',
        '塑胶玩具生产厂家',
        '外贸玩具工厂'
      ]
    }
  },
  hero: {
    eyebrow: {
      en: 'Toy OEM/ODM • Design To Mass Production',
      zh: '玩具 OEM/ODM · 从设计到量产'
    },
    title: {
      en: 'Toy Development And Manufacturing Partner Since 2006',
      zh: '始于 2006 年的玩具研发与制造合作伙伴'
    },
    description: {
      en: 'Yaoshun focuses on toy OEM/ODM projects, covering concept review, mold development, injection production, assembly, packaging, and export delivery. Plastic and extrusion processes are available as supporting capabilities when required.',
      zh: '尧顺以玩具 OEM/ODM 项目为核心，覆盖方案评估、模具开发、注塑生产、组装包装与出口交付；塑胶与挤出工艺作为项目配套能力按需提供。'
    },
    primary: {
      en: 'Request Factory Tour',
      zh: '预约工厂参观'
    },
    secondary: {
      en: 'View Product Catalog',
      zh: '查看产品目录'
    },
    snapshotLabel: {
      en: 'Factory Snapshot',
      zh: '工厂快照'
    },
    collage: [placeholderImages.factoryHero, placeholderImages.toyLearning, placeholderImages.factoryHero]
  },
  entrySection: {
    eyebrow: {
      en: 'Quick Entry',
      zh: '快速入口'
    },
    title: {
      en: 'Start From The Page You Need',
      zh: '按你的业务需求快速进入'
    },
    description: {
      en: 'For sourcing teams, product managers, and brand owners: jump directly to catalog, solution scope, company profile, and quote process.',
      zh: '为采购、产品与品牌团队提供清晰入口：可直接进入目录、方案、公司资料与报价流程。'
    },
    entries: [
      {
        route: 'products',
        title: {en: 'Product Catalog', zh: '产品目录'},
        description: {
          en: 'Review toy categories, structure references, and MOQ baseline by product type.',
          zh: '按品类查看玩具方案、结构参考与基础 MOQ 区间。'
        }
      },
      {
        route: 'solutions',
        title: {en: 'Solutions', zh: '解决方案'},
        description: {
          en: 'Understand OEM/ODM cooperation, development path, and process matching.',
          zh: '了解 OEM/ODM 协作模式、开发路径与工艺配套方式。'
        }
      },
      {
        route: 'about',
        title: {en: 'About Us', zh: '关于我们'},
        description: {
          en: 'Read company profile, team collaboration model, and technical positioning.',
          zh: '查看公司简介、团队协同机制与技术定位。'
        }
      },
      {
        route: 'news',
        title: {en: 'News Center', zh: '新闻中心'},
        description: {
          en: 'Track project updates, process improvements, and delivery notes.',
          zh: '跟进项目进展、工艺优化与交付动态。'
        }
      },
      {
        route: 'faq',
        title: {en: 'FAQ', zh: 'FAQ'},
        description: {
          en: 'Check lead time, sampling, packaging, shipment, and warranty details.',
          zh: '快速确认交期、打样、包装、出货与售后问题。'
        }
      },
      {
        route: 'contact',
        title: {en: 'Get a Quote', zh: '获取报价'},
        description: {
          en: 'Submit quantity, target market, and packaging requirements for evaluation.',
          zh: '提交数量、目标市场与包装要求，进入报价评估流程。'
        }
      }
    ]
  },
  categoriesSection: {
    title: {
      en: 'Our Categories',
      zh: '业务方向'
    },
    description: {
      en: 'Choose by toy business model: finished products, component development, and supporting processes.',
      zh: '按玩具业务模式快速选择：成品项目、结构件开发与配套工艺。'
    },
    catalogAction: {
      en: 'View Full Catalog ->',
      zh: '查看完整目录 ->'
    }
  },
  categories: [
    {
      title: {en: 'Toy Product Programs', zh: '玩具成品项目'},
      description: {
        en: 'DIY children toys and smart toy product lines, supporting OEM/ODM development, trial runs, and mass production delivery.',
        zh: '聚焦 DIY 儿童玩具与智能玩具产品线，支持 OEM/ODM 开发、打样验证与量产交付。'
      },
      image: placeholderImages.toyLearning
    },
    {
      title: {en: 'Toy Parts & Plastic Components', zh: '玩具结构件与塑胶配套'},
      description: {
        en: 'Supports toy housings, functional parts, and structural components with coordinated mold, injection, assembly, and packaging workflows.',
        zh: '支持玩具外壳、功能件与结构件开发，配套模具、注塑、组装与包装协同交付。'
      },
      image: placeholderImages.profileSeries
    },
    {
      title: {en: 'Supporting Plastic & Extrusion Capability', zh: '塑胶与挤出配套能力'},
      description: {
        en: 'Provides injection and extrusion support for projects requiring special materials, profile structures, or process integration.',
        zh: '针对需特殊材质、型材结构或复合工艺的项目，提供注塑与挤出配套支持。'
      },
      image: placeholderImages.engineeringSupport
    }
  ],
  floatingStats: [
    {
      value: '7',
      label: {en: 'Core Departments', zh: '核心部门'}
    },
    {
      value: '5',
      label: {en: 'Business Lines', zh: '业务板块'}
    }
  ],
  excellence: {
    title: {
      en: 'Toy Manufacturing Capability',
      zh: '玩具制造能力总览'
    },
    description: {
      en: 'The core workflow focuses on toy projects: concept confirmation, development sampling, production launch, quality checks, and shipment handoff.',
      zh: '能力主线围绕玩具项目展开：需求确认、开发打样、量产导入、品质检验与出货交接。'
    },
    points: [
      {
        title: {en: '20+ Years Of Manufacturing', zh: '20 余年制造经验'},
        text: {
          en: 'Founded in 2006, Yaoshun has accumulated long-term project experience in toy development and manufacturing delivery.',
          zh: '公司始创于 2006 年，长期服务玩具开发与制造交付项目，具备稳定项目经验。'
        }
      },
      {
        title: {en: 'Dual-Process Closed Manufacturing', zh: '双工艺闭环制造'},
        text: {
          en: 'The factory connects design, mold making, injection production, assembly, packaging, and delivery in one coordinated workflow.',
          zh: '工厂将设计、开模、注塑、组装、包装与出货串联为同一协同流程。'
        }
      },
      {
        title: {en: 'Global Orders & OEM/ODM Service', zh: '全球接单与 OEM/ODM 服务'},
        text: {
          en: 'Professional trade support helps manage OEM/ODM projects, small-batch trials, scaled production, cross-border logistics, and after-sales follow-up.',
          zh: '专业外贸团队可高效承接 OEM/ODM 项目、小批量试产、规模化生产、跨境物流与售后跟进。'
        }
      }
    ]
  },
  technologyQualitySection: {
    title: {
      en: 'Technology And Quality',
      zh: '技术与质量'
    },
    description: {
      en: 'For toy projects, engineering controls and quality checkpoints are defined before mass production to reduce launch risk and delivery variance.',
      zh: '针对玩具项目，在量产前建立工程控制点与质量检查点，降低上新风险与交付波动。'
    },
    items: [
      {
        title: {en: 'Engineering Review', zh: '工程评审'},
        text: {
          en: 'Review structure, materials, and manufacturability with drawings or samples before tooling release.',
          zh: '在开模前基于图纸或样品进行结构、材料与可制造性评审。'
        }
      },
      {
        title: {en: 'Pilot And Validation', zh: '试产与验证'},
        text: {
          en: 'Run pilot batches for assembly fit, function checks, and packaging verification before scale-up.',
          zh: '在放量前完成试产，验证装配匹配、功能表现与包装方案。'
        }
      },
      {
        title: {en: 'In-Process Quality Control', zh: '过程质量控制'},
        text: {
          en: 'Set process checkpoints for incoming material, key dimensions, assembly consistency, and shipment readiness.',
          zh: '围绕来料、关键尺寸、组装一致性和出货状态设置过程质控节点。'
        }
      }
    ]
  },
  complianceSection: {
    title: {
      en: 'Compliance And Delivery Support',
      zh: '合规与交付支持'
    },
    description: {
      en: 'Support files and test coordination are aligned to toy product categories and destination-market requirements.',
      zh: '围绕玩具品类与目标市场要求，提供测试协同与资料支持。'
    }
  },
  compliance: [
    {
      title: {en: 'EN71 / ASTM Support', zh: 'EN71 / ASTM 测试支持'},
      text: {
        en: 'Toy projects can be planned around EN71 and ASTM related test requirements.',
        zh: '玩具项目可按 EN71、ASTM 等测试要求进行开发与资料准备。'
      }
    },
    {
      title: {en: 'Quality & Environmental Standards', zh: '品质与环保标准'},
      text: {
        en: 'Production and material selection can be coordinated to match customer quality and environmental targets.',
        zh: '生产与选材可按客户质量目标和环保要求协同执行。'
      }
    },
    {
      title: {en: 'OEM / ODM File Coordination', zh: 'OEM / ODM 资料协同'},
      text: {
        en: 'Design, materials, mold changes, packaging, and production documents can be coordinated in one project flow.',
        zh: '设计、选材、改模、包装与量产资料可在同一项目流程内协同管理。'
      }
    },
    {
      title: {en: 'Global Trade Support', zh: '全球贸易支持'},
      text: {
        en: 'Foreign trade specialists support order handoff, customs coordination, logistics, and after-sales follow-up.',
        zh: '专业外贸团队可支持订单对接、报关物流以及售后跟进。'
      }
    }
  ],
  casesSection: {
    title: {
      en: 'Project Delivery Notes',
      zh: '项目交付案例'
    },
    description: {
      en: 'Typical toy project notes covering schedule, launch, and repeat-order outcomes.',
      zh: '展示玩具项目在排期、上新与复购方面的典型交付结果。'
    }
  },
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
        en: 'R&D, sampling, and testing were advanced in parallel, then transitioned into the first mass-production batch.',
        zh: '研发、打样与测试并行推进后，按计划转入首批量产。'
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
  ],
  journey: {
    title: {
      en: 'Explore The Rest Of The Site',
      zh: '继续浏览完整站点'
    },
    description: {
      en: 'Move from the overview into the product range, factory context, and direct quoting flow.',
      zh: '从首页继续进入产品、工厂和报价流程。'
    }
  }
};
