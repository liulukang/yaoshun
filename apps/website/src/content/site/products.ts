import { importedProducts } from "@/content/site/products.generated";
import { visualAssets, type LocalizedTag, type Product, type ProductModule } from "@/content/site/shared";

const fallbackTagCatalog: Record<string, LocalizedTag> = {
  "玩具": { key: "toys", zh: "玩具", en: "Toys" },
  "玩具-STEM": { key: "toys-stem", zh: "玩具-STEM", en: "Toys - STEM" },
  "玩具-DIY": { key: "toys-diy", zh: "玩具-DIY", en: "Toys - DIY" },
  "管材": { key: "tubes", zh: "管材", en: "Tubes" },
  "设备": { key: "equipment", zh: "设备", en: "Equipment" },
  "管材-设备": { key: "tubes-equipment", zh: "管材-设备", en: "Tubes - Equipment" },
  "管材-通用": { key: "tubes-general", zh: "管材-通用", en: "Tubes - General" },
};

function toFallbackTags(labels: string[]): LocalizedTag[] {
  return labels
    .map((label) => fallbackTagCatalog[label] ?? { key: label, zh: label, en: label })
    .filter((item, index, arr) => arr.findIndex((it) => it.key === item.key) === index);
}

const fallbackProducts: Product[] = [
  {
    slug: "interlocking-learning-set",
    module: "toys",
    tags: toFallbackTags(["玩具-DIY", "玩具"]),
    priority: 100,
    title: { en: "DIY Children Toy Series", zh: "DIY 儿童玩具系列" },
    badge: { en: "OEM / ODM Toys", zh: "OEM / ODM 玩具" },
    summary: {
      en: "Environmentally friendly and customizable DIY children toys supported by precision injection molding, structure customization, and full finished-goods delivery.",
      zh: "环保安全、支持定制的 DIY 儿童玩具系列，依托精密注塑、结构定制与完整成品交付能力。"
    },
    detail: {
      en: "This series focuses on child-safe and assembly-based toy products with support for mold development, precision injection molding, assembly, packaging, and OEM / ODM customization.",
      zh: "该系列面向儿童安全与拼装益智场景，支持开模、精密注塑、组装、包装以及 OEM / ODM 定制开发。"
    },
    moq: { en: "Flexible from trial runs to scaled production", zh: "支持试产到规模化生产" },
    materials: { en: "ABS / PP and child-safe plastics", zh: "ABS / PP 及儿童安全塑胶材质" },
    useCases: [
      { en: "DIY educational programs", zh: "DIY 益智项目" },
      { en: "Children retail collections", zh: "儿童零售产品线" },
      { en: "Custom toy launches", zh: "定制玩具上新" },
    ],
    highlights: [
      {
        en: "Supports OEM / ODM, mold development, and brand customization",
        zh: "支持 OEM / ODM、开模及品牌定制",
      },
      {
        en: "Suitable for DIY and educational toy product programs",
        zh: "适用于 DIY 与益智玩具项目开发",
      },
      {
        en: "Can be delivered with assembly, packaging, and export support",
        zh: "可配套组装、包装与出口交付",
      },
    ],
    specs: [
      {
        label: { en: "Material", zh: "材质" },
        value: { en: "ABS / PP and child-safe plastics", zh: "ABS / PP 及儿童安全塑胶材质" },
      },
      {
        label: { en: "MOQ", zh: "起订量" },
        value: { en: "Flexible by project stage", zh: "可按项目阶段灵活匹配" },
      },
      {
        label: { en: "Processing modes", zh: "加工模式" },
        value: {
          en: "OEM, ODM, mold development, assembly",
          zh: "OEM、ODM、开模、组装",
        },
      },
      {
        label: { en: "Typical channels", zh: "典型渠道" },
        value: { en: "Education, retail, export", zh: "科教、零售、出口" },
      },
    ],
    seoKeywords: {
      en: [
        "interlocking toy manufacturer",
        "diy children toy manufacturer",
        "educational toy supplier",
        "oem odm toy manufacturer",
        "custom toy production",
        "plastic toy factory",
      ],
      zh: ["DIY儿童玩具厂家", "益智玩具供应商", "玩具OEM ODM厂家", "定制玩具生产", "塑胶玩具工厂"],
    },
    image: visualAssets.toyLearning,
  },
  {
    slug: "pretend-play-kit",
    module: "toys",
    tags: toFallbackTags(["玩具-STEM", "玩具"]),
    priority: 110,
    title: { en: "AI Smart Toy & Robot Parts", zh: "AI 智能玩具与机器人配件" },
    badge: { en: "Precision Injection", zh: "精密注塑" },
    summary: {
      en: "Precision injection molded structures, housings, and functional parts for AI toys, smart toys, and robot plastic component programs.",
      zh: "面向 AI 玩具、智能玩具与机器人塑胶配件项目的精密注塑结构件、外壳与功能组件。"
    },
    detail: {
      en: "Built for smart hardware and interactive toy projects that need mold development, precision structures, stable mass production, assembly, and export-ready packaging.",
      zh: "适用于需要开模、精密结构、稳定量产、组装与出口包装的智能硬件和互动玩具项目。"
    },
    moq: { en: "Flexible by mold and production plan", zh: "按模具与生产方案灵活匹配" },
    materials: {
      en: "ABS, PP, PC, and engineering plastics",
      zh: "ABS、PP、PC 及工程塑胶",
    },
    useCases: [
      { en: "AI smart toys", zh: "AI 智能玩具" },
      { en: "Robot plastic parts", zh: "机器人塑胶配件" },
      { en: "Smart hardware housings", zh: "智能硬件外壳" },
    ],
    highlights: [
      {
        en: "Precision injection molding for complex structures and stable output",
        zh: "适合复杂结构与稳定量产的精密注塑能力",
      },
      {
        en: "Supports mold development, trial runs, and engineering revisions",
        zh: "支持开模、试模与工程迭代",
      },
      {
        en: "Can be paired with assembly, testing, and export packaging",
        zh: "可配套组装、检测与出口包装",
      },
    ],
    specs: [
      {
        label: { en: "MOQ", zh: "起订量" },
        value: { en: "Defined by mold and order plan", zh: "按模具与订单方案确定" },
      },
      {
        label: { en: "Lead time", zh: "交期" },
        value: {
          en: "Flexible for trial, validation, and scaled production",
          zh: "可匹配试产、验证与规模化生产节奏",
        },
      },
      {
        label: { en: "Core process", zh: "核心工艺" },
        value: { en: "Precision injection molding", zh: "精密注塑" },
      },
      {
        label: { en: "Project type", zh: "项目类型" },
        value: { en: "AI toys / smart components", zh: "AI 玩具 / 智能配件" },
      },
    ],
    seoKeywords: {
      en: [
        "ai smart toy manufacturer",
        "robot plastic parts supplier",
        "precision injection molding factory",
        "smart toy plastic components",
        "oem odm smart toy supplier",
      ],
      zh: ["AI智能玩具厂家", "机器人塑胶配件", "精密注塑工厂", "智能玩具塑胶件", "智能玩具OEM ODM"],
    },
    image: visualAssets.toyLearning,
  },
  {
    slug: "pu-pvc-profile-series",
    module: "tubes",
    tags: toFallbackTags(["管材-通用", "管材"]),
    priority: 210,
    title: {
      en: "LED Flexible Strip & Plastic Profile Series",
      zh: "LED 柔性灯带与塑胶型材系列",
    },
    badge: { en: "Plastic Extrusion", zh: "塑胶挤出" },
    summary: {
      en: "Extruded profiles and accessories for LED flexible strips, medical tubing, seals, rods, decorative trims, and custom industrial profile programs.",
      zh: "面向 LED 柔性灯带、医疗导管、密封条、棒材、装饰线条及工业定制项目的塑胶挤出型材与配件。"
    },
    detail: {
      en: "The profile line supports multiple materials including TPU, PC, PVC, ABS, PP, PE, PMMA, and fluoroplastics for applications requiring heat resistance, aging resistance, dimensional stability, and custom section shapes.",
      zh: "型材线支持 TPU、PC、PVC、ABS、PP、PE、PMMA、氟塑料等多种材料，适用于对耐温、抗老化、尺寸稳定和截面定制有要求的项目。"
    },
    moq: { en: "Defined by section and material plan", zh: "按截面与材料方案确定" },
    materials: { en: "TPU / PC / PVC / ABS / PP / PE / PMMA / fluoroplastics", zh: "TPU / PC / PVC / ABS / PP / PE / PMMA / 氟塑料" },
    useCases: [
      { en: "LED flexible strip parts", zh: "LED 柔性灯带配件" },
      { en: "Medical tubing", zh: "医疗导管" },
      { en: "Seals and trims", zh: "密封条与封边条" },
      { en: "Decorative plastic profiles", zh: "装饰塑胶型材" },
    ],
    highlights: [
      {
        en: "Supports multi-material extrusion customization",
        zh: "支持多材料挤出定制",
      },
      {
        en: "Suitable for heat-resistant, aging-resistant, and precision profile applications",
        zh: "适用于耐温、抗老化与高精度型材场景",
      },
      {
        en: "Can be paired with equipment, molds, and export packaging support",
        zh: "可配套设备、模具与出口包装服务",
      },
    ],
    specs: [
      {
        label: { en: "Material", zh: "材质" },
        value: { en: "TPU / PC / PVC / ABS / PP / PE / PMMA / fluoroplastics", zh: "TPU / PC / PVC / ABS / PP / PE / PMMA / 氟塑料" },
      },
      {
        label: { en: "MOQ", zh: "起订量" },
        value: { en: "By section and material plan", zh: "按截面与材料方案确定" },
      },
      {
        label: { en: "Core capability", zh: "核心能力" },
        value: { en: "Custom extrusion profiles", zh: "定制挤出型材" },
      },
      {
        label: { en: "Service model", zh: "服务模式" },
        value: {
          en: "Customization / OEM / ODM",
          zh: "定制 / OEM / ODM",
        },
      },
    ],
    seoKeywords: {
      en: [
        "plastic extrusion profile manufacturer",
        "led strip plastic parts supplier",
        "medical tube extrusion manufacturer",
        "custom plastic profile supplier",
        "multi-material extrusion factory",
      ],
      zh: ["塑胶挤出型材厂家", "LED灯带塑胶配件", "医疗导管厂家", "定制塑胶型材", "多材料挤出工厂"],
    },
    image: visualAssets.profileSeries,
  },
  {
    slug: "extrusion-support-line",
    module: "tubes",
    tags: toFallbackTags(["管材-设备", "管材"]),
    priority: 220,
    title: { en: "Plastic Extrusion Equipment", zh: "塑胶挤出设备" },
    badge: { en: "Self-Developed Equipment", zh: "自研自产设备" },
    summary: {
      en: "Self-developed extrusion hosts, auxiliary equipment, and complete production lines for internal manufacturing and external industry customers.",
      zh: "面向内部制造与行业客户的自研挤出主机、辅机及完整生产线。"
    },
    detail: {
      en: "The equipment line supports installation, commissioning, technical training, maintenance, and project matching for extrusion production needs.",
      zh: "设备线可提供安装调试、技术培训、维护服务与项目匹配，适合各类挤出生产需求。"
    },
    moq: { en: "Project-based quoting", zh: "按项目报价" },
    materials: {
      en: "Engineering plastics / equipment assemblies",
      zh: "工程塑胶 / 设备总成",
    },
    useCases: [
      { en: "Extrusion hosts", zh: "挤出主机" },
      { en: "Auxiliary lines", zh: "辅机与产线" },
      { en: "Installation and setup", zh: "安装调试" },
      { en: "Technical support", zh: "技术支持" },
    ],
    highlights: [
      {
        en: "Self-developed equipment that supports both internal production and external delivery",
        zh: "设备自研自产，可同时服务内部生产与外部客户",
      },
      {
        en: "Provides installation, commissioning, and technical guidance",
        zh: "提供安装调试与技术指导",
      },
      {
        en: "Can be matched with molds, profiles, and downstream manufacturing programs",
        zh: "可与模具、型材及下游制造项目配套协同",
      },
    ],
    specs: [
      {
        label: { en: "Coverage", zh: "覆盖范围" },
        value: {
          en: "Hosts, auxiliaries, complete lines",
          zh: "主机、辅机、完整产线",
        },
      },
      {
        label: { en: "Cooperation mode", zh: "合作方式" },
        value: { en: "Project-based", zh: "按项目协同" },
      },
      {
        label: { en: "Support", zh: "支持内容" },
        value: {
          en: "Installation, training, maintenance",
          zh: "安装、培训、维护",
        },
      },
      {
        label: { en: "Target buyers", zh: "目标客户" },
        value: {
          en: "Manufacturing and extrusion programs",
          zh: "制造与挤出项目客户",
        },
      },
    ],
    seoKeywords: {
      en: [
        "plastic extrusion equipment manufacturer",
        "extrusion line supplier",
        "extrusion machine factory",
        "auxiliary extrusion equipment",
        "extrusion equipment technical support",
      ],
      zh: ["塑胶挤出设备厂家", "挤出生产线供应商", "挤出机械工厂", "挤出辅机", "挤出设备技术支持"],
    },
    image: visualAssets.engineeringSupport,
  },
  {
    slug: "custom-injection-extrusion-solutions",
    module: "tubes",
    tags: toFallbackTags(["管材-通用", "管材"]),
    priority: 230,
    title: { en: "Custom Injection & Extrusion Products", zh: "定制注塑与挤出产品" },
    badge: { en: "Drawing / Sample Based", zh: "来图 / 来样定制" },
    summary: {
      en: "Custom plastic products for consumer electronics, lighting, home, toys, and smart hardware, developed from drawings, samples, or functional requirements.",
      zh: "面向消费电子、照明、家居、玩具与智能硬件领域的定制塑胶产品，支持来图、来样与功能需求开发。"
    },
    detail: {
      en: "This service line combines mold development, extrusion, injection molding, assembly, and packaging for custom parts and finished products across multiple industries.",
      zh: "该服务线可将开模、挤出、注塑、组装与包装结合起来，支持多行业定制零部件与成品开发。"
    },
    moq: { en: "Defined by function, tooling, and batch plan", zh: "按功能、模具与批量方案确定" },
    materials: { en: "Engineering plastics and custom compounds", zh: "工程塑胶及定制复合材料" },
    useCases: [
      { en: "Consumer electronics", zh: "消费电子" },
      { en: "Lighting products", zh: "照明产品" },
      { en: "Home products", zh: "家居产品" },
      { en: "Smart hardware", zh: "智能硬件" },
    ],
    highlights: [
      {
        en: "Supports drawings, samples, and function-based customization",
        zh: "支持来图、来样与功能需求定制",
      },
      {
        en: "Combines mold development, production, and packaging in one factory chain",
        zh: "在同一工厂链路内完成开模、生产与包装",
      },
      {
        en: "Suitable for OEM / ODM and cross-category plastic product projects",
        zh: "适用于 OEM / ODM 及跨品类塑胶产品项目",
      },
    ],
    specs: [
      {
        label: { en: "Customization input", zh: "定制输入" },
        value: { en: "Drawings, samples, function briefs", zh: "图纸、样品、功能需求" },
      },
      {
        label: { en: "Core process", zh: "核心工艺" },
        value: { en: "Mold, extrusion, injection, assembly", zh: "模具、挤出、注塑、组装" },
      },
      {
        label: { en: "Industries", zh: "应用行业" },
        value: { en: "Electronics, lighting, toys, smart hardware", zh: "电子、照明、玩具、智能硬件" },
      },
      {
        label: { en: "Service mode", zh: "服务模式" },
        value: { en: "OEM / ODM / custom manufacturing", zh: "OEM / ODM / 定制制造" },
      },
    ],
    seoKeywords: {
      en: [
        "custom injection molding products",
        "custom plastic extrusion products",
        "oem odm plastic manufacturing",
        "drawing based plastic parts",
        "sample based plastic product development",
      ],
      zh: ["定制注塑产品", "定制挤出产品", "塑胶OEM ODM制造", "来图塑胶件", "来样塑胶产品开发"],
    },
    image: visualAssets.projectEngineering,
  },
];

function sortProductsByPriority(items: Product[]): Product[] {
  return [...items].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.slug.localeCompare(b.slug, undefined, { numeric: true });
  });
}

const importedSortedProducts = sortProductsByPriority(importedProducts);
const fallbackSortedProducts = sortProductsByPriority(fallbackProducts);

export const products: Product[] = importedSortedProducts.length > 0 ? importedSortedProducts : fallbackSortedProducts;
export const productsByModule: Record<ProductModule, Product[]> = {
  toys: products.filter((item) => item.module === "toys"),
  tubes: products.filter((item) => item.module === "tubes"),
  equipment: products.filter((item) => item.module === "equipment"),
};
export const productTags = Array.from(
  new Map(products.flatMap((item) => item.tags).map((tag) => [tag.key, tag])).values()
).sort((a, b) => a.key.localeCompare(b.key));

export const productsPageContent = {
  seo: {
    title: {
      en: 'Product Catalog | Dongguan Yaoshun Technology Co., Ltd. | 东莞市尧顺科技有限公司',
      zh: '产品目录 | 东莞市尧顺科技有限公司 | Dongguan Yaoshun Technology Co., Ltd.'
    },
    description: {
      en: 'Explore toy-focused product programs from Dongguan Yaoshun Technology Co., Ltd., including finished toy lines, plastic toy components, and process-support capabilities for OEM/ODM delivery.',
      zh: '查看东莞市尧顺科技有限公司以玩具为核心的产品方案，涵盖成品玩具项目、玩具结构件与 OEM/ODM 交付所需配套工艺能力。'
    },
    detailTitleTemplate: {
      en: '{product} | Dongguan Yaoshun Technology Co., Ltd. | 东莞市尧顺科技有限公司',
      zh: '{product} | 东莞市尧顺科技有限公司 | Dongguan Yaoshun Technology Co., Ltd.'
    },
    detailDescriptionTemplate: {
      en: '{product} from Dongguan Yaoshun Technology Co., Ltd., with toy manufacturing, OEM/ODM support, quality checkpoints, and delivery collaboration.',
      zh: '{product} 由东莞市尧顺科技有限公司提供，支持玩具制造、OEM/ODM 协作、质量控制与交付配合。'
    },
    keywords: {
      en: [
        'toy product catalog',
        'b2b toy supplier catalog',
        'educational toys wholesale',
        'toy oem odm products',
        'custom toy project catalog',
        'toy components supplier'
      ],
      zh: [
        '玩具产品目录',
        'B2B玩具供应商目录',
        '益智玩具目录',
        '玩具OEM ODM产品',
        '玩具项目目录',
        '玩具结构件供应'
      ]
    }
  },
  hero: {
    title: {en: 'Toy Product Catalog', zh: '玩具产品目录'},
    description: {
      en: 'Browse by project type instead of generic categories: finished toy lines, component development, and supporting process capabilities.',
      zh: '按项目类型而非泛化品类浏览：成品玩具线、结构件开发与配套工艺能力。'
    }
  },
  catalogPillars: [
    {
      title: {en: 'Finished Toy Programs', zh: '成品玩具项目'},
      text: {
        en: 'For brands requiring complete toy development, assembly, packaging, and shipment handoff.',
        zh: '适合需要完整开发、组装、包装和出货交接的成品玩具项目。'
      }
    },
    {
      title: {en: 'Toy Parts & Structures', zh: '玩具结构件与部件'},
      text: {
        en: 'For projects focused on housings, structural parts, and precision plastic components.',
        zh: '适合聚焦外壳、结构件与精密塑胶组件的项目需求。'
      }
    },
    {
      title: {en: 'Process Support Capability', zh: '工艺配套能力'},
      text: {
        en: 'Plastic and extrusion support available when required by specific toy engineering needs.',
        zh: '针对玩具工程中的特殊需求，按需提供塑胶与挤出配套。'
      }
    }
  ],
  sourcingSection: {
    title: {en: 'For Procurement Teams', zh: '采购团队常看信息'},
    cards: [
      {
        title: {en: 'MOQ Logic', zh: 'MOQ 逻辑'},
        text: {
          en: 'MOQ is evaluated by structure complexity, tooling route, and packaging setup rather than one fixed number.',
          zh: 'MOQ 依据结构复杂度、模具路线和包装配置综合评估，并非单一固定值。'
        }
      },
      {
        title: {en: 'Lead-Time Planning', zh: '交期规划'},
        text: {
          en: 'Lead-time references are provided by stage: sampling, pilot run, and scaled production.',
          zh: '交期通常按打样、试产、放量三个阶段给出参考。'
        }
      },
      {
        title: {en: 'Quality Gates', zh: '质量门槛'},
        text: {
          en: 'Key checkpoints are set at incoming materials, in-process controls, and pre-shipment review.',
          zh: '关键质量节点覆盖来料、过程控制和出货前检查。'
        }
      },
      {
        title: {en: 'Packaging Readiness', zh: '包装就绪度'},
        text: {
          en: 'Retail and shipping packaging are reviewed together to reduce delivery-side surprises.',
          zh: '零售包装与运输包装会同步评估，减少交付阶段风险。'
        }
      }
    ]
  },
  filters: {
    title: {en: 'Catalog Filters', zh: '目录筛选'},
    allLabel: {en: 'All Products', zh: '全部产品'},
    activeFilterPrefix: {en: 'Active Filter', zh: '当前筛选'},
    groupTitles: {
      module: {en: 'Product Modules', zh: '产品模块'},
      scenario: {en: 'Scenario Categories', zh: '场景分类'},
      material: {en: 'Material Tags', zh: '材质标签'},
      business: {en: 'Business Tags', zh: '业务标签'}
    }
  },
  detail: {
    primaryAction: {en: 'Request Bulk Pricing', zh: '获取批量报价'},
    secondaryAction: {en: 'Review Compliance Files', zh: '查看资质资料'},
    moqLabel: {en: 'MOQ', zh: '起订量'},
    materialLabel: {en: 'Material', zh: '材质'},
    highlightsTitle: {
      en: 'Designed For Real Projects',
      zh: '为真实项目而组织的能力点'
    },
    applicationsEyebrow: {en: 'Applications', zh: '应用方向'},
    applicationsTitle: {
      en: 'Use Cases & Delivery Notes',
      zh: '应用场景与交付说明'
    },
    logisticsCardTitle: {
      en: 'Complete Logistics Kit',
      zh: '完整资料包支持'
    },
    logisticsCardText: {
      en: 'Quotation discussion can be paired with packaging direction, compliance file preparation, and shipping readiness.',
      zh: '报价沟通可以与包装方向、合规资料准备和出货节奏一起推进。'
    },
    useCaseLabel: {en: 'Use case', zh: '应用方向'}
  },
  journey: {
    title: {
      en: 'Continue Through The Product Journey',
      zh: '继续完成产品浏览路径'
    },
    description: {
      en: 'Go deeper into solution workflow, FAQ details, or direct quotation intake.',
      zh: '继续进入解决方案、FAQ 或直接报价入口。'
    }
  },
  detailJourney: {
    title: {en: 'Continue From This Product', zh: '从当前产品继续'},
    description: {
      en: 'Go back to catalog, move to FAQ details, or open the quotation page.',
      zh: '返回目录、查看 FAQ，或直接进入报价流程。'
    }
  }
};
