import {getLocalizedValue} from '@/lib/locale';
import type {Locale} from '@/types/content';

export const headerCopy: Record<
  Locale,
  {
    brandTagline: string;
    contactLabel: string;
    contactLabelFull: string;
    collapseMenuAria: string;
    expandMenuAria: string;
  }
> = {
  zh: {
    brandTagline: 'Toy Manufacturing',
    contactLabel: '询盘',
    contactLabelFull: '立即咨询',
    collapseMenuAria: '收起菜单',
    expandMenuAria: '展开菜单'
  },
  en: {
    brandTagline: 'Toy Manufacturing',
    contactLabel: 'Contact',
    contactLabelFull: 'Inquire Now',
    collapseMenuAria: 'Collapse menu',
    expandMenuAria: 'Expand menu'
  }
};

export const footerCopy: Record<
  Locale,
  {
    sendInquiry: string;
    homepageNav: string;
    deploymentLegal: string;
    bottomSummary: string;
  }
> = {
  zh: {
    sendInquiry: '提交询盘',
    homepageNav: '首页导航',
    deploymentLegal: '部署与合规',
    bottomSummary: '专注全球玩具外贸合作，欢迎提交产品需求与目标市场。'
  },
  en: {
    sendInquiry: 'Send Inquiry',
    homepageNav: 'Homepage Nav',
    deploymentLegal: 'Deployment & Legal',
    bottomSummary: 'Focused on global toy export cooperation. Share your target market and product requirements.'
  }
};

export const productsSectionCopy: Record<
  Locale,
  {
    viewAllProducts: string;
    featuredProduct: string;
    exploreProductCenter: string;
  }
> = {
  zh: {
    viewAllProducts: '查看全部产品',
    featuredProduct: 'Featured Product',
    exploreProductCenter: '进入产品中心'
  },
  en: {
    viewAllProducts: 'View all products',
    featuredProduct: 'Featured Product',
    exploreProductCenter: 'Explore Product Center'
  }
};

export const contactSectionCopy: Record<
  Locale,
  {
    goToInquiryForm: string;
    quickBrief: string;
    prepareInquiryInTwoMinutes: string;
    openContactPage: string;
  }
> = {
  zh: {
    goToInquiryForm: '前往提交需求',
    quickBrief: 'Quick Brief',
    prepareInquiryInTwoMinutes: '两分钟准备询盘信息',
    openContactPage: '打开联系页面'
  },
  en: {
    goToInquiryForm: 'Go to Inquiry Form',
    quickBrief: 'Quick Brief',
    prepareInquiryInTwoMinutes: 'Prepare Inquiry In Two Minutes',
    openContactPage: 'Open Contact Page'
  }
};

export const companyPageCopy: Record<
  Locale,
  {
    metadataTitle: string;
    eyebrow: string;
    heroTitle: string;
    missionLabel: string;
    visionLabel: string;
    established: string;
    annualTurnover: string;
    productionStaff: string;
    monthlyOutputValue: string;
    factoryShowroom: string;
    factoryArchive: string;
    archiveEstablishedDate: string;
    archiveAnnualTurnover: string;
    archiveTotalEmployees: string;
    cooperationModel: string;
    customMoq: string;
    privateLabelMoq: string;
    exportOrders: string;
    processingMethods: string;
    invoiceTaxRate: string;
    vatInvoice: string;
    enterpriseTrust: string;
    productionCapacity: string;
    rawMaterialLeadTime: string;
    specialProcesses: string;
    missionVision: string;
    coreStrengths: string;
  }
> = {
  zh: {
    metadataTitle: '公司简介',
    eyebrow: 'Company Profile',
    heroTitle: '东莞市尧顺科技有限公司',
    missionLabel: '使命',
    visionLabel: '愿景',
    established: '成立时间',
    annualTurnover: '年交易额',
    productionStaff: '生产人数',
    monthlyOutputValue: '月产值',
    factoryShowroom: '工厂展厅',
    factoryArchive: '工厂档案',
    archiveEstablishedDate: '成立时间',
    archiveAnnualTurnover: '年交易额',
    archiveTotalEmployees: '员工总数',
    cooperationModel: '合作方式',
    customMoq: '定制起订量',
    privateLabelMoq: '贴牌起订量',
    exportOrders: '接外贸订单',
    processingMethods: '加工方式',
    invoiceTaxRate: '开票点数',
    vatInvoice: '增值税发票',
    enterpriseTrust: '企业诚信',
    productionCapacity: '生产能力',
    rawMaterialLeadTime: '原材料采购时间',
    specialProcesses: '特殊工艺',
    missionVision: '使命与愿景',
    coreStrengths: '核心优势'
  },
  en: {
    metadataTitle: 'Company Profile',
    eyebrow: 'Company Profile',
    heroTitle: 'Dongguan Yaoshun Technology Co., Ltd.',
    missionLabel: 'Mission',
    visionLabel: 'Vision',
    established: 'Established',
    annualTurnover: 'Annual Turnover',
    productionStaff: 'Production Staff',
    monthlyOutputValue: 'Monthly Output Value',
    factoryShowroom: 'Factory Showroom',
    factoryArchive: 'Factory Archive',
    archiveEstablishedDate: 'Established Date',
    archiveAnnualTurnover: 'Annual Turnover',
    archiveTotalEmployees: 'Total Employees',
    cooperationModel: 'Cooperation Model',
    customMoq: 'Custom MOQ',
    privateLabelMoq: 'Private Label MOQ',
    exportOrders: 'Export Orders',
    processingMethods: 'Processing Methods',
    invoiceTaxRate: 'Invoice Tax Rate',
    vatInvoice: 'VAT Invoice',
    enterpriseTrust: 'Enterprise Trust',
    productionCapacity: 'Production Capacity',
    rawMaterialLeadTime: 'Raw Material Procurement Lead Time',
    specialProcesses: 'Special Processes',
    missionVision: 'Mission & Vision',
    coreStrengths: 'Core Strengths'
  }
};

export const certificationsPageCopy: Record<
  Locale,
  {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    description: string;
    enterpriseTrust: string;
    availableDocuments: string;
    availableStatus: string;
    cooperationSupport: string;
    customMoq: string;
    privateLabelMoq: string;
    processingMethods: string;
    productionStaff: string;
    monthlyOutputValue: string;
    invoiceTaxRate: string;
  }
> = {
  zh: {
    metadataTitle: '资质中心',
    metadataDescription: '查看工商资质、ISO 9000、CE 及其他认证资料，快速评估主体资质与合作条件。',
    eyebrow: '资质中心',
    title: '企业资质与信用信息',
    description: '本页面集中展示工商资质、认证资料与信用信息，帮助客户快速完成合作前的审核判断。',
    enterpriseTrust: '企业诚信',
    availableDocuments: '可提供资料',
    availableStatus: '可提供',
    cooperationSupport: '合作支持信息',
    customMoq: '定制起订量',
    privateLabelMoq: '贴牌起订量',
    processingMethods: '加工方式',
    productionStaff: '生产人数',
    monthlyOutputValue: '月产值',
    invoiceTaxRate: '开票点数'
  },
  en: {
    metadataTitle: 'Qualification Center',
    metadataDescription: 'Review business qualifications, ISO 9000, CE and related compliance documents to evaluate cooperation readiness quickly.',
    eyebrow: 'Qualification Center',
    title: 'Company Qualifications and Credit Profile',
    description: 'This page centralizes business qualifications, certifications and credit information for faster pre-cooperation review.',
    enterpriseTrust: 'Enterprise Trust',
    availableDocuments: 'Available Documents',
    availableStatus: 'Available',
    cooperationSupport: 'Cooperation Support',
    customMoq: 'Custom MOQ',
    privateLabelMoq: 'Private Label MOQ',
    processingMethods: 'Processing Methods',
    productionStaff: 'Production Staff',
    monthlyOutputValue: 'Monthly Output Value',
    invoiceTaxRate: 'Invoice Tax Rate'
  }
};

export const contactPageCopy: Record<
  Locale,
  {
    metadataDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    checklistTitle: string;
    checklistCategory: string;
    checklistModel: string;
    checklistMoq: string;
    factoryAddressLabel: string;
    whatsappLabel: string;
    phoneLabel: string;
    linkedinLabel: string;
    emailLabel: string;
  }
> = {
  zh: {
    metadataDescription: '通过 WhatsApp、LinkedIn 或邮件联系尧顺，提交品类需求与加工方式，获取合作回复。',
    eyebrow: 'Inquiry & Contact',
    title: '联系我们',
    intro: '请在咨询中提供品类方向、加工方式与预计数量，我们将匹配对应业务同事快速回复。',
    checklistTitle: '咨询建议',
    checklistCategory: '说明产品大类（如拼插玩具、PU/PVC管材、塑料机械等）。',
    checklistModel: '提供合作方式：清加工、包工包料、来样加工或来图加工。',
    checklistMoq: '说明预计采购量、起订要求、是否需要贴牌及开票。',
    factoryAddressLabel: '工厂地址',
    whatsappLabel: 'WhatsApp',
    phoneLabel: '电话',
    linkedinLabel: 'LinkedIn',
    emailLabel: '邮箱'
  },
  en: {
    metadataDescription: 'Contact yaoshun via WhatsApp, LinkedIn or email with required category and processing model to get cooperation details.',
    eyebrow: 'Inquiry & Contact',
    title: 'Contact Us',
    intro: 'Please include your product category, processing model and estimated quantity. Our team will respond quickly.',
    checklistTitle: 'Inquiry Checklist',
    checklistCategory: 'Specify the product category (interlocking toys, PU/PVC tubes, plastic machinery, etc.).',
    checklistModel: 'Share the cooperation model: labor-only, labor+material, sample-based or drawing-based processing.',
    checklistMoq: 'Provide estimated quantity, MOQ expectations, and whether private-label/invoice support is needed.',
    factoryAddressLabel: 'Factory Address',
    whatsappLabel: 'WhatsApp',
    phoneLabel: 'Phone',
    linkedinLabel: 'LinkedIn',
    emailLabel: 'Email'
  }
};

export const faqPageCopy: Record<
  Locale,
  {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    moreDetailsTitle: string;
    moreDetailsBody: string;
    whatsappLabel: string;
    emailLabel: string;
    goToContactPage: string;
  }
> = {
  zh: {
    metadataTitle: '常见问题',
    metadataDescription: '查看 MOQ、交期、打样费、OEM / ODM、质保与认证资料的常见问题解答。',
    eyebrow: 'FAQ',
    title: '常见问题',
    intro: '以下内容覆盖外贸买家咨询频率最高的问题，可帮助你更快判断合作可行性。',
    moreDetailsTitle: '还有其他问题？',
    moreDetailsBody: '可直接通过 WhatsApp 或邮件发送产品型号与目标市场，我们将在 1 个工作日内回复。',
    whatsappLabel: 'WhatsApp',
    emailLabel: '邮箱',
    goToContactPage: '前往联系页面'
  },
  en: {
    metadataTitle: 'FAQ',
    metadataDescription: 'Find answers about MOQ, lead time, sample fee, OEM/ODM, warranty and compliance documentation.',
    eyebrow: 'FAQ',
    title: 'Frequently Asked Questions',
    intro: 'These answers cover the most frequent sourcing questions and help you evaluate cooperation feasibility faster.',
    moreDetailsTitle: 'Need More Details?',
    moreDetailsBody: 'Send product model and target market via WhatsApp or email. Our team usually replies within one business day.',
    whatsappLabel: 'WhatsApp',
    emailLabel: 'Email',
    goToContactPage: 'Go to Contact Page'
  }
};

export const productsPageCopy: Record<
  Locale,
  {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    factoryStoreTitle: string;
    material: string;
    carton: string;
    moq: string;
    leadTime: string;
    viewDetails: string;
  }
> = {
  zh: {
    metadataTitle: '工厂店产品中心',
    metadataDescription: '查看工厂店品类与主营产品信息，覆盖拼插玩具、塑料管材、绝缘材料、塑料机械与配件加工服务。',
    eyebrow: 'Product Solutions',
    title: '工厂店产品中心',
    intro: '页面集中展示工厂店主营品类与合作加工能力，便于快速匹配业务方向。',
    factoryStoreTitle: '工厂店',
    material: '材质',
    carton: '装箱',
    moq: 'MOQ',
    leadTime: '交期',
    viewDetails: '查看详情'
  },
  en: {
    metadataTitle: 'Factory Store Products',
    metadataDescription: 'Browse factory-store categories and core products, including interlocking toys, plastic tubes, insulation materials, machinery and accessories.',
    eyebrow: 'Product Solutions',
    title: 'Factory Store Product Center',
    intro: 'This page summarizes factory-store categories and processing capabilities for quick business matching.',
    factoryStoreTitle: 'Factory Store',
    material: 'Material',
    carton: 'Carton',
    moq: 'MOQ',
    leadTime: 'Lead Time',
    viewDetails: 'View Details'
  }
};

export function factoryStoreCountText(locale: Locale, count: number): string {
  const countLabel = getLocalizedValue(
    {
      zh: `共${count}个商品 >`,
      en: `${count} products >`
    },
    locale
  );

  return countLabel;
}

export const productDetailPageCopy: Record<
  Locale,
  {
    metadataTitleSuffix: string;
    backToProducts: string;
    keySpecifications: string;
    certificationsAndHighlights: string;
    material: string;
    size: string;
    ageRange: string;
    cartonSpec: string;
    cbm: string;
    moq: string;
    leadTime: string;
  }
> = {
  zh: {
    metadataTitleSuffix: '产品详情',
    backToProducts: '← 返回产品列表',
    keySpecifications: '关键参数',
    certificationsAndHighlights: '认证与亮点',
    material: '材质',
    size: '尺寸',
    ageRange: '适龄',
    cartonSpec: '装箱规格',
    cbm: 'CBM',
    moq: 'MOQ',
    leadTime: '交期'
  },
  en: {
    metadataTitleSuffix: 'Product Detail',
    backToProducts: '← Back to Products',
    keySpecifications: 'Key Specifications',
    certificationsAndHighlights: 'Certifications & Highlights',
    material: 'Material',
    size: 'Size',
    ageRange: 'Age Range',
    cartonSpec: 'Carton Spec',
    cbm: 'CBM',
    moq: 'MOQ',
    leadTime: 'Lead Time'
  }
};

export const rndPageCopy: Record<
  Locale,
  {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    workflowStages: string;
    highlights: string;
    steps: string[];
    highlightItems: string[];
  }
> = {
  zh: {
    metadataTitle: '研发与定制能力',
    metadataDescription: '查看尧顺的 OEM / ODM 研发流程、打样验证机制与量产落地能力。',
    eyebrow: 'R&D Capability',
    title: '研发与定制能力',
    intro: '我们按外贸项目执行节奏搭建研发流程，从需求确认、结构评估到打样与验证，最终无缝衔接量产。',
    workflowStages: '流程阶段',
    highlights: '研发亮点',
    steps: [
      '需求确认：明确市场、价位、包装与合规标准。',
      '结构与模具评估：判断功能可行性与量产风险。',
      '打样与验证：同步进行样品、包装与关键测试项验证。',
      '量产导入：形成工程资料并对接排产交付。'
    ],
    highlightItems: [
      '产品结构评估与成本优化并行推进，缩短立项周期。',
      '打样阶段同步验证包装、跌落与运输风险。',
      '支持 OEM 外观定制与 ODM 新品协同开发。',
      '可配合挤出设备（Extruder）相关部件的工程评估。'
    ]
  },
  en: {
    metadataTitle: 'R&D and Customization',
    metadataDescription: 'Explore yaoshun OEM / ODM workflow, sample validation process and production-ready engineering capability.',
    eyebrow: 'R&D Capability',
    title: 'R&D and Customization Capability',
    intro: 'Our R&D flow is aligned with export project timelines, from requirement confirmation and structure review to sampling, validation and production handoff.',
    workflowStages: 'Workflow Stages',
    highlights: 'R&D Highlights',
    steps: [
      'Requirement confirmation: define market, target pricing, packaging and compliance scope.',
      'Structure and tooling review: evaluate functionality feasibility and production risk.',
      'Sampling and validation: align sample confirmation with packaging and key test checks.',
      'Production handoff: finalize engineering documentation and connect to production scheduling.'
    ],
    highlightItems: [
      'Structure feasibility and cost optimization are reviewed in parallel.',
      'Sampling is aligned with packaging, drop-test and transport-risk checks.',
      'Supports both OEM appearance customization and ODM new-product development.',
      'Engineering review can cover Extruder-related component requirements.'
    ]
  }
};

export const successStoriesPageCopy: Record<
  Locale,
  {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    heroAlt: string;
  }
> = {
  zh: {
    metadataTitle: '成功案例',
    metadataDescription: '查看尧顺在欧洲、北美与中东渠道项目中的交付成果与合作模式。',
    eyebrow: 'Success Stories',
    title: '合作案例与交付结果',
    intro: '以下案例基于真实合作路径整理，帮助新客户快速了解我们的执行节奏与项目稳定性。',
    heroAlt: '尧顺工厂生产线场景'
  },
  en: {
    metadataTitle: 'Success Stories',
    metadataDescription: 'Review yaoshun delivery outcomes and collaboration models across Europe, North America and Middle East projects.',
    eyebrow: 'Success Stories',
    title: 'Project Cases and Delivery Results',
    intro: 'The cases below reflect real collaboration paths and help new buyers evaluate execution rhythm and delivery stability.',
    heroAlt: 'yaoshun production line scene'
  }
};

export const privacyPageCopy: Record<
  Locale,
  {
    metadataTitle: string;
    metadataDescription: string;
    eyebrow: string;
    title: string;
    effectiveDate: string;
    sections: Array<{
      title: string;
      content: string;
    }>;
  }
> = {
  zh: {
    metadataTitle: '隐私政策',
    metadataDescription: '查看尧顺的数据收集、使用、安全与 GDPR 合规相关隐私政策。',
    eyebrow: 'Privacy Policy',
    title: '隐私政策',
    effectiveDate: '生效日期：2026-04-01',
    sections: [
      {
        title: '1. 信息收集范围',
        content:
          '我们仅收集业务沟通所需信息，包括联系人姓名、公司名称、邮箱、电话、目标市场及产品需求。不会主动收集与业务无关的敏感个人信息。'
      },
      {
        title: '2. 信息使用目的',
        content:
          '收集的信息仅用于询盘回复、报价沟通、样品安排、订单执行和售后支持。未经授权，不会用于与项目无关的营销用途。'
      },
      {
        title: '3. 数据存储与安全',
        content:
          '我们采用访问权限控制和备份机制保护数据安全。业务资料仅在履约和合规范围内保存，超出必要周期的数据将定期清理。'
      },
      {
        title: '4. 第三方与跨境传输',
        content:
          '在物流、检测、支付或合规需求下，可能向必要第三方共享最小化信息。涉及跨境数据传输时，将遵循目标市场相关法律要求。'
      },
      {
        title: '5. 用户权利与合规',
        content:
          '如你所在地区适用 GDPR 等法规，可申请访问、更正或删除个人数据。我们支持按需提供欧代与德国包装法相关页面信息。'
      }
    ]
  },
  en: {
    metadataTitle: 'Privacy Policy',
    metadataDescription: 'Read yaoshun privacy policy on data collection, usage, security and GDPR-related compliance.',
    eyebrow: 'Privacy Policy',
    title: 'Privacy Policy',
    effectiveDate: 'Effective Date: 2026-04-01',
    sections: [
      {
        title: '1. Information We Collect',
        content:
          'We only collect business-relevant information, including contact name, company, email, phone, target market and product requirements. We do not proactively collect unrelated sensitive personal data.'
      },
      {
        title: '2. How We Use Information',
        content:
          'Collected data is used for inquiry response, quotation communication, sample arrangement, order execution and after-sales support. It is not used for unrelated marketing purposes without authorization.'
      },
      {
        title: '3. Data Storage and Security',
        content:
          'We apply access control and backup mechanisms to protect business data. Information is retained within fulfillment and compliance scope, and outdated records are cleaned regularly.'
      },
      {
        title: '4. Third-Party Sharing and Cross-Border Transfer',
        content:
          'Minimum necessary data may be shared with required third parties for logistics, testing, payment or compliance. Cross-border processing follows applicable legal requirements of destination markets.'
      },
      {
        title: '5. Data Subject Rights',
        content:
          'If GDPR or similar laws apply in your region, you may request access, correction or deletion of personal data. EU representative and German Packaging Act related information can be provided when required.'
      }
    ]
  }
};

export const notFoundPageCopy: Record<
  Locale,
  {
    description: string;
    backHome: string;
  }
> = {
  zh: {
    description: '页面不存在。',
    backHome: '返回首页'
  },
  en: {
    description: 'Page not found.',
    backHome: 'Back Home'
  }
};
