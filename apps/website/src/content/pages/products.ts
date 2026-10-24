const customSideImage = "https://www.yaoshuntoys.com/media/site/products/custom-sourcing-showcase-8ba251863d01.webp";

import type {LocalizedText, ShowcaseProductSeed} from "@/content/types";

export const productCollections: Array<{key: ShowcaseProductSeed["collection"]; label: LocalizedText}> = [
  {key: "building", label: {en: "Fort Building Kits", zh: "堡垒拼搭套装"}},
  {key: "sports", label: {en: "Sports & Outdoor Play", zh: "运动与户外玩具"}},
  {key: "stem", label: {en: "Science Experiment Kits", zh: "科学实验套装"}},
  {key: "robots", label: {en: "Robots & RC Toys", zh: "机器人与遥控玩具"}},
  {key: "tents", label: {en: "Play Tents", zh: "儿童游戏帐篷"}},
  {key: "drones", label: {en: "Drones", zh: "无人机"}},
  {key: "fans", label: {en: "Portable Fans", zh: "便携风扇"}},
];

export const productCategoryContent: Record<
  ShowcaseProductSeed["collection"],
  {
    title: LocalizedText;
    description: LocalizedText;
    keywords: Partial<Record<"en" | "zh", string[]>>;
  }
> = {
  building: {
    title: {
      en: "Fort Building Kits | Wholesale & OEM/ODM",
      zh: "堡垒拼搭套装 | 批发与 OEM/ODM",
    },
    description: {
      en: "Source fort building kits from Yaoshun's Dongguan toy factory. Review piece counts, materials, packaging and private-label OEM/ODM options.",
      zh: "从尧顺东莞玩具工厂采购堡垒拼搭套装，查看件数、材质、包装和私标 OEM/ODM 定制方案。",
    },
    keywords: {
      en: ["fort building kit wholesale", "private label fort building kits", "fort building toy OEM"],
      zh: ["堡垒拼搭套装批发", "堡垒玩具 OEM", "私标堡垒套装"],
    },
  },
  sports: {
    title: {
      en: "Sports & Outdoor Toy Sets | Wholesale OEM/ODM",
      zh: "运动与户外玩具套装 | 批发与 OEM/ODM",
    },
    description: {
      en: "Browse sports and outdoor toy sets for wholesale sourcing, including football goals, basketball sets, ring toss and pool-play products with OEM/ODM support.",
      zh: "浏览足球门、篮球架、套圈和水上运动等运动与户外玩具，支持批发采购及 OEM/ODM 定制。",
    },
    keywords: {
      en: ["sports toy wholesale", "football goal set supplier", "outdoor toy OEM"],
      zh: ["运动玩具批发", "足球门套装厂家", "户外玩具 OEM"],
    },
  },
  stem: {
    title: {
      en: "Science Experiment Kits | Wholesale & Custom Toy OEM",
      zh: "科学实验套装 | 批发与定制玩具 OEM",
    },
    description: {
      en: "Explore science experiment and STEM toy kits for schools, retailers and education channels, with packaging, sampling and OEM/ODM development support.",
      zh: "面向学校、零售和教育渠道采购科学实验与 STEM 玩具套装，支持包装、打样和 OEM/ODM 开发。",
    },
    keywords: {
      en: ["science experiment kit supplier", "STEM toy wholesale", "educational toy OEM"],
      zh: ["科学实验套装厂家", "STEM 玩具批发", "益智玩具 OEM"],
    },
  },
  robots: {
    title: {
      en: "Robots & RC Toys | Wholesale Toy Manufacturer",
      zh: "机器人与遥控玩具 | 玩具批发厂家",
    },
    description: {
      en: "Source programmable robots, robot dogs and RC toys from Yaoshun for wholesale, private-label and custom toy programs.",
      zh: "从尧顺采购编程机器人、机器狗和遥控玩具，支持批发、私标和定制玩具项目。",
    },
    keywords: {
      en: ["robot toy wholesale", "RC toy manufacturer", "programmable robot OEM"],
      zh: ["机器人玩具批发", "遥控玩具厂家", "编程机器人 OEM"],
    },
  },
  tents: {
    title: {
      en: "Children's Play Tents | Wholesale & Private Label",
      zh: "儿童游戏帐篷 | 批发与私标定制",
    },
    description: {
      en: "Browse children's play tents, themed playhouses and ball-pit tents for retail, preschool and private-label sourcing with packaging support.",
      zh: "浏览儿童游戏帐篷、主题游戏屋和海洋球帐篷，适合零售、幼儿园与私标采购，并支持包装定制。",
    },
    keywords: {
      en: ["children's play tent wholesale", "playhouse tent supplier", "kids tent private label"],
      zh: ["儿童游戏帐篷批发", "游戏屋帐篷厂家", "儿童帐篷私标"],
    },
  },
  drones: {
    title: {
      en: "Camera Drones | Wholesale & Custom Toy Supply",
      zh: "航拍无人机 | 批发与定制玩具供应",
    },
    description: {
      en: "Review camera drones with obstacle avoidance and screen controllers for wholesale toy sourcing, packaging projects and custom supply programs.",
      zh: "查看带避障和屏幕控制器的航拍无人机，适合玩具批发选品、包装项目和定制供应。",
    },
    keywords: {
      en: ["camera drone wholesale", "drone toy supplier", "obstacle avoidance drone OEM"],
      zh: ["航拍无人机批发", "无人机玩具厂家", "避障无人机 OEM"],
    },
  },
  fans: {
    title: {
      en: "Portable Fans | Wholesale & OEM/ODM Supply",
      zh: "便携风扇 | 批发与 OEM/ODM 供应",
    },
    description: {
      en: "Browse handheld and neck-strap portable fans for wholesale sourcing, gift programs and private-label packaging with product specification support.",
      zh: "浏览手持和挂脖便携风扇，适合批发采购、礼品项目和私标包装，并提供规格资料支持。",
    },
    keywords: {
      en: ["portable fan wholesale", "handheld fan supplier", "private label fan"],
      zh: ["便携风扇批发", "手持风扇厂家", "私标风扇"],
    },
  },
};

export const pieceBands: Array<{key: ShowcaseProductSeed["pieceBand"]; label: LocalizedText}> = [
  {key: "0-100", label: {en: "0-100 PCS", zh: "0-100 件"}},
  {key: "101-200", label: {en: "101-200 PCS", zh: "101-200 件"}},
  {key: "201-300", label: {en: "201-300 PCS", zh: "201-300 件"}},
  {key: "300plus", label: {en: "300+ PCS", zh: "300+ 件"}},
];

export const productsPageAssets = {
  fallbackImage: "https://www.yaoshuntoys.com/media/products-q92/1601110728943/1.webp",
  lifestyleImage: customSideImage,
} as const;

type CategoryBuyingGuide = {
  title: LocalizedText;
  sections: Array<{
    title: LocalizedText;
    text: LocalizedText;
    productIds?: string[];
  }>;
};

export const categoryBuyingGuides: Partial<Record<ShowcaseProductSeed["collection"], CategoryBuyingGuide>> = {
  fans: {
    title: {en: "Choosing a portable fan for your sourcing program", zh: "便携风扇采购选型"},
    sections: [
      {
        title: {en: "Compare cooling and carrying options", zh: "比较制冷方式与携带配置"},
        text: {
          en: "FC-6658 adds semiconductor cooling, while FC-6655B1 supports handheld use and includes a neck strap and USB cable. Both listings specify a brushless motor and an 1800 mAh 18650 lithium battery. Confirm the selected model's dimensions, weight and charging details before comparing offers.",
          zh: "FC-6658 配有半导体制冷功能；FC-6655B1 支持手持使用，附挂绳与 USB 线。两款资料均列有无刷电机及 1800 mAh 18650 锂电池。比价前应核对所选型号的尺寸、重量与充电细节。",
        },
        productIds: ["FC-6658", "FC-6655B1"],
      },
      {
        title: {en: "Confirm branding, packaging and battery documents", zh: "确认品牌包装与电池资料"},
        text: {
          en: "Send your logo artwork, color preference and retail-box requirements for a feasibility review. Confirm accessory contents, warning labels and the battery or transport documents needed for your destination and shipping method against the final configuration.",
          zh: "提供 LOGO 图稿、配色与零售包装要求，以便评估可行范围。配件清单、警示标签，以及目的地和运输方式所需的电池或运输资料，应按最终配置逐项确认。",
        },
      },
      {
        title: {en: "What to include in a fan inquiry", zh: "风扇询价需要哪些资料"},
        text: {
          en: "Include the model, order quantity, target market, carrying style, packaging language and delivery destination. Ask for the unit and carton dimensions, sample configuration and applicable test documents with the quotation.",
          zh: "询价时请提供型号、数量、目标市场、携带方式、包装语言与收货地，并随报价确认单品和外箱尺寸、样品配置及适用检测资料。",
        },
      },
    ],
  },
  stem: {
    title: {en: "Planning a science-kit assortment", zh: "科学实验套装采购要点"},
    sections: [
      {
        title: {en: "Match activities, age grading and power supply", zh: "核对实验内容、年龄与供电"},
        text: {
          en: "D2008 lists 38 accessories for mist, rotating-projection and light-guide experiments. Its packaging indicates ages 7+ and three AA batteries, which are not included. Review the accessory list and instructions against your teaching or retail use case.",
          zh: "D2008 资料列有 38 个配件，包含雾化、旋转投影和导光实验；包装标注适合 7 岁以上，使用 3 节 AA 电池且不含电池。请结合教学或零售用途核对配件清单与说明书。",
        },
        productIds: ["D2008"],
      },
      {
        title: {en: "Review the instruction and packaging brief", zh: "评估说明书与包装需求"},
        text: {
          en: "Provide the required instruction language, activity sequence, warning-label requirements and box artwork for review. Changes to experiments, accessories or electrical parts need a separate feasibility and testing assessment.",
          zh: "提供说明书语言、实验步骤安排、警示标签要求和包装图稿供评估。调整实验内容、配件或电子部件时，需要另外确认开发可行性与检测范围。",
        },
      },
      {
        title: {en: "Prepare a science-kit inquiry", zh: "准备科学套装询价资料"},
        text: {
          en: "State the target age, sales country, school or retail channel, quantity and packaging language. Request a sample to check assembly steps, component completeness and instructions, and confirm which reports cover the selected configuration.",
          zh: "说明目标年龄、销售国家、学校或零售渠道、数量与包装语言。通过样品核对搭建步骤、零件完整性及说明书，并确认检测报告是否覆盖所选配置。",
        },
      },
    ],
  },
  robots: {
    title: {en: "Compare robot functions before requesting a quote", zh: "机器人玩具功能与采购确认"},
    sections: [
      {
        title: {en: "Choose the interaction that fits your channel", zh: "按渠道选择交互方式"},
        text: {
          en: "X1 lists voice commands, programming, handshakes, dancing and stunts. Model 9901 lists remote control, touch sensing, programming, lights and music. The eight-wheel 599-51 uses a 2.4 GHz controller and includes lights and sounds. Compare each model's own function list and demonstration.",
          zh: "X1 资料列有语音指令、编程、握手、跳舞与特技；9901 列有遥控、触摸感应、编程、灯光与音乐；八轮 599-51 使用 2.4 GHz 遥控，带灯光音效。应按各型号独立的功能清单和演示选型。",
        },
        productIds: ["X1", "9901", "599-51"],
      },
      {
        title: {en: "Check language, power and customization scope", zh: "核对语言、供电与定制范围"},
        text: {
          en: "Confirm voice and instruction languages, the battery specification, charging cable and controller power requirements for the exact model. Send branding and packaging requests for review; voice, firmware or interaction changes require their own technical assessment and sample approval.",
          zh: "按具体型号确认语音及说明书语言、电池规格、充电线与遥控器供电要求。品牌和包装需求可提交评估；语音、程序或交互功能调整需单独技术评估并确认样品。",
        },
      },
      {
        title: {en: "Send a clear robot sourcing brief", zh: "提供明确的机器人采购需求"},
        text: {
          en: "Include the model, required functions, language version, sales market, quantity and packaging brief. Ask for the complete accessory list, sample demonstration and configuration-specific safety or battery documents before confirming the order.",
          zh: "提供型号、所需功能、语言版本、销售市场、数量与包装要求；下单前核对完整配件清单、样品演示，以及对应配置的安全或电池资料。",
        },
      },
    ],
  },
};
