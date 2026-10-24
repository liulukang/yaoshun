const customSideImage = "/site/products/custom-sourcing-showcase.webp";

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
