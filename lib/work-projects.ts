export type WorkProjectDetail = {
  slug: string;
  tag: string;
  categories?: string[];
  year: string;
  /** Placeholder publish date (YYYY-MM-DD), shown on the Work cards. */
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  role: string;
  deliverables: string[];
  client: string;
  narrative: string[];
  gallery: string[];
  galleryColumns?: number;
  hidden?: boolean;
};

const allWorkProjects: WorkProjectDetail[] = [
  {
    slug: "yuanhuan-intelligent",
    tag: "Branding",
    year: "2026",
    date: "2026-03-18",
    title: "品牌设计 | MetaCircle",
    description: "为企业数字化分析平台 MetaCircle 构建品牌形象与视觉系统。",
    role: "品牌设计师",
    deliverables: ["品牌 LOGO 与 VI", "品牌视觉系统", "品牌应用物料"],
    client: "MetaCircle",
    narrative: [
      "MetaCircle 是一个面向企业的数字化分析平台，提供经营诊断与质量管控服务，需要一套能承载「智能」与「循环」双重气质的品牌形象。围绕品牌名的核心意象，我以虚线菱形围合成环的图形作为核心标识——菱形代表数据切片，环形代表持续运转的分析闭环，简洁的几何语言让品牌在科技感之外多一份精密与秩序感。",
      "主色选用深紫渐变搭配亮紫点缀，传递专业与前瞻感；标识与品牌图形延展至官网、社交主页、办公文具、水杯与灯箱标识等全场景应用，构建了一套统一且具延展性的品牌视觉系统。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"],
  },
  {
    slug: "zhipu-brand-upgrade",
    tag: "Branding",
    year: "2025-2026",
    date: "2026-01-09",
    title: "智谱品牌定位及视觉升级",
    description: "主导品牌升级全流程，从提案到落地。",
    role: "品牌设计师",
    deliverables: ["多方案创意提报", "品牌全新 logo", "品牌全新 VI", "全新主品牌网站"],
    client: "智谱",
    narrative: [
      "随着企业规模的扩大，原有品牌形象已难以承载新的业务格局与国际化表达。此次为智谱进行品牌形象升级，从品牌战略与受众洞察出发，提炼「基座模型、学术、安全」的核心气质，完成多轮创意方案提报，并在反复对齐中推动共识落地了全新 logo 与完整 VI。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "7-2.mp4", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg"],
  },
  {
    slug: "zhipu-agent-openday",
    tag: "Marketing",
    year: "2025",
    date: "2025-11-20",
    title: "Agent Openday",
    description: "智谱 Agent Openday 活动视觉与现场设计。",
    role: "品牌设计负责人",
    deliverables: ["活动主 KV", "重要嘉宾演讲 PPT", "核心延展物料", "舞台搭建与会场物料指导"],
    client: "智谱",
    narrative: [
      "Agent OpenDay 是智谱发布 AutoGLM、GLM-PC、首次提出 GLM-OS 概念的发布会，核心命题是「人机交互范式的转变」——一个抽象的技术叙事，需要被现场数百位嘉宾和镜头直观感知。",
      "视觉上，承袭了品牌标志性的科技蓝黑底色，在其上引入更具呼吸感的渐变光效：深色的稳定代表既有的技术秩序，现场大平流动的光效则指向 Agent 带来的新交互形态。在这一视觉语言下，我完成了大会主视觉、核心延展物料与重要嘉宾演讲 PPT 的设计，并指导实习生与供应商团队，将其延展至舞台大屏、会场导视等全场景。从演示内容到物理空间，整场发布会保持了统一的视觉秩序。",
    ],
    gallery: ["品牌作品集260722-41.jpg", "品牌作品集260722-42.jpg"],
  },
  {
    slug: "zhipu-foundation-model",
    hidden: true,
    tag: "Marketing",
    year: "2026",
    date: "2026-02-11",
    title: "智谱基座模型发布视觉与 Benchmark",
    description: "基座模型发布视觉与 Benchmark 图表规范。",
    role: "品牌设计师",
    deliverables: ["品牌设计基因", "品牌 VI 手册"],
    client: "智谱",
    narrative: [
      "基座模型是智谱技术叙事的核心，其发布视觉直接定义外界对品牌的第一印象，而 Benchmark 作为每次发布中被引用、截图、传播最多的素材。25-26 年我围绕高频发布场景建立了三项基础规范：KV 版式规范、整体风格设定以及 Benchmark 图表规范，统一 blog 与传播物料中的数据呈现样式。",
      "技术严谨、可信的面貌对外输出，高频发布下的视觉产出也有章可循。",
    ],
    gallery: ["2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"],
  },
  {
    slug: "4paradigm-branding",
    tag: "Branding",
    year: "2021",
    date: "2021-06-15",
    title: "第四范式品牌全案设计",
    description: "构建第四范式品牌视觉识别体系。",
    role: "品牌设计负责人",
    deliverables: ["模型发布主 KV", "模型榜单设计规范", "模型发布营销物料"],
    client: "第四范式",
    narrative: [
      "在 2019 年，作为 To B 的快速增长的 AI 企业，第四范式的品牌要解决一个问题：技术能力强，但对内对外的视觉表达要统一标准，以沉淀品牌资产和价值。我从内部推行品牌基因定位法，通过系统的品牌分析工具确立品牌核心气质，在此基础上建立完整的 VI 手册与一系列设计标准，形成对内对外一致的品牌规范，并对规范进行宣贯。",
      "该品牌体系获得市场与专业双重认可：VI 获 K-Design Award 2022，包装获德国 iF 设计奖、当代好设计奖、亚洲设计奖。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "21.jpg", "22.jpg"],
  },
  {
    slug: "4paradigm-marketing",
    tag: "Marketing",
    year: "2023",
    date: "2023-09-21",
    title: "第四范式营销设计与雇主品牌",
    description: "覆盖第四范式品牌触点的营销视觉与雇主品牌插画体系。",
    role: "品牌设计师",
    deliverables: ["发布会主视觉及物料延展", "雇主品牌插画规范与延展", "日常营销海报", "公司手册"],
    client: "第四范式",
    narrative: [
      "To B 企业的品牌对外露出有限，每一次出现都更显珍贵。围绕第四范式「AI for Everyone」的品牌主张，我们同时搭建了营销设计与雇主品牌两套视觉体系：营销端覆盖发布会主视觉、线下品宣、日常营销海报与公司手册等触点；雇主品牌端沉淀出统一的商业插画风格与插画库，让招聘与企业传播拥有清晰、有辨识度的表达。",
      "统一的插画风格、品牌色调与质感语言贯穿所有物料，让每一次对外露出都在强化同一个品牌印象，而非重新开始，实现更持续、更有效的品牌传播。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg"],
  },
  {
    slug: "4paradigm-product-delivery",
    tag: "Marketing",
    year: "2020",
    date: "2020-03-05",
    title: "第四范式 产品宣传与交付设计",
    subtitle: "算力一体机｜AI 加速卡｜慢病管理一体机｜智能机器人｜行业解决方案",
    description: "为第四范式多条产品线搭建统一的宣传物料与交付资料体系。",
    role: "品牌设计负责人",
    deliverables: ["手册", "单页", "白皮书", "说明书"],
    client: "第四范式",
    narrative: [
      "随着第四范式产品线不断扩充——从算力一体机、AI 加速卡，到慢病管理一体机、智能机器人与各类行业解决方案——对外宣传与交付资料的数量和类型快速增长，却缺少统一的体系。我作为品牌设计负责人，先梳理出企业形象、产品/方案宣传、说明/资料与其他专项物料四大类，明确每一类物料的定位与设计标准。",
      "在体系之上，沉淀出品牌市场彩页的模板与规范，统一色彩、字体与版式网格，并按应用、AI 平台、AI 硬件区分版式。公司手册、产品手册、行业白皮书、产品说明书与交付手册都在同一套视觉语言下延展，并以不同主色区分产品线；同时完成算力一体机与 AI 加速卡的外观视觉设计，让宣传物料与产品实物保持一致的品牌印象。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg"],
  },
  {
    slug: "4paradigm-culture-ip",
    tag: "Culture&IP",
    year: "2023",
    date: "2023-04-12",
    title: "第四范式文化 IP 设计",
    description: "用企业形象 IP 承载企业文化，与员工建立情感连接。",
    role: "品牌设计师",
    deliverables: ["IP 形象", "IP 规范"],
    client: "第四范式",
    narrative: [
      "需求 — 企业文化落地需要一个核心载体，能与员工进行情感化沟通，进而引起员工的情感共鸣。",
      "目标 — 让每一位员工在轻松愉快的工作环境下，对公司文化有认同感，增强公司向心力与凝聚力，同时又能体现企业的个性。",
      "解决方案 — 推出企业形象 IP。形象 IP 具有强生命力，可做更丰富的延伸内容，将企业文化故事化，增强企业文化的渗透力。除此之外，IP 作为标志性的载体，与员工建立情感联系的同时，也保持了企业文化的一致性与连贯性。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"],
  },
  {
    slug: "4paradigm-heiwa-ip",
    tag: "Culture&IP",
    year: "2021",
    date: "2021-11-03",
    title: "文创周边 | 黑娃IP设计",
    description: "围绕「AI For Everyone」理念设计的品牌吉祥物 IP 形象。",
    role: "IP 设计师",
    deliverables: ["IP 形象方案"],
    client: "第四范式",
    narrative: [
      "「黑娃」是围绕第四范式「AI For Everyone」理念设计的品牌 IP 形象——圆润的深灰色身形、灵动的三角耳朵与呆萌的表情，用轻松亲和的视觉语言软化技术品牌的距离感。设计上延续品牌一贯的科技气质（深色基调、克制的线条），同时通过大耳朵、圆眼睛等萌系造型元素，让 IP 更容易被员工与用户记住和喜爱。",
      "在基础形象之外，我延展出一套情绪化表情包（皱眉、认真思考等日常状态），并将 IP 落地到毛毯、背包徽章、毛线帽别针等周边物料上，让「黑娃」真正走进办公与生活场景，成为品牌与人之间更有温度的连接点。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"],
  },
  {
    slug: "4paradigm-culture-system",
    tag: "Culture&IP",
    year: "2022",
    date: "2022-05-26",
    title: "第四范式企业文化视觉系统",
    description: "将第四范式愿景与使命转译为视觉语言的文化符号系统。",
    role: "品牌设计师",
    deliverables: ["企业愿景 / 使命宣言视觉", "文化符号系统", "文化衫等周边延展"],
    client: "第四范式",
    narrative: [
      "围绕第四范式「AI for Everyone」的企业愿景与使命宣言，设计了一套可延展的文化符号系统，用几何图形语言呼应「范式」的技术气质。",
      "符号系统从愿景海报延展至文化衫等周边物料，让抽象的企业文化以视觉化、可触达的方式渗透进日常工作场景。",
    ],
    gallery: [
      "第四范式企业文化设计方案-10.jpg",
      "第四范式企业文化设计方案-12.jpg",
      "第四范式企业文化设计方案-14.jpg",
      "第四范式企业文化设计方案-16.jpg",
      "第四范式企业文化设计方案-17.jpg",
      "第四范式企业文化设计方案-18.jpg",
      "第四范式企业文化设计方案-19.jpg",
      "第四范式企业文化设计方案-20.jpg",
      "第四范式企业文化设计方案-23.jpg",
      "第四范式企业文化设计方案-24.jpg",
      "第四范式企业文化设计方案-25.jpg",
      "第四范式企业文化设计方案-26.jpg",
      "第四范式企业文化设计方案-27.jpg",
      "第四范式企业文化设计方案-28.jpg",
    ],
  },
  {
    slug: "4paradigm-onboarding-gifts",
    tag: "Culture&IP",
    year: "2024",
    date: "2024-03-07",
    title: "文创周边 | 入职礼",
    description: "为入职与司龄纪念设计的礼盒与徽章体系。",
    role: "品牌设计师",
    deliverables: ["入职欢迎礼盒设计", "司龄徽章系统", "文创周边设计"],
    client: "第四范式",
    narrative: [
      "为新人入职与员工司龄纪念设计了一套礼盒与徽章体系，从「Welcome」欢迎徽章到 0/1/2/4 年司龄徽章，用轻松有趣的视觉语言传递公司对员工的认可与陪伴。",
      "礼盒包装延续品牌视觉语言，让每一次拆礼盒都成为一次品牌体验的延伸。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.gif", "06.jpg", "7.jpg"],
  },
  {
    slug: "4paradigm-store-gifts",
    tag: "Culture&IP",
    year: "2023",
    date: "2023-12-14",
    title: "文创周边 | 企业商店礼品",
    description: "为第四范式内部文创商店设计的笔记本与袜子。",
    role: "品牌设计师",
    deliverables: ["文创笔记本设计", "文创袜子设计"],
    client: "第四范式",
    narrative: [
      "围绕第四范式的品牌 IP 与色彩语言，为企业商店设计了一系列日常办公文创——深蓝、深灰配色的压纹笔记本，将行走的 IP 形象低调地烫印在封面上，兼具实用性与品牌辨识度。",
      "同步设计了一组撞色文创袜子，用紫、绿、黄等品牌延展色搭配重复排列的 IP 小图标，让严肃的科技品牌也多了一份轻松活泼，成为员工日常可穿戴的品牌周边。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"],
  },
  {
    slug: "4paradigm-mahjong",
    tag: "Culture&IP",
    year: "2024",
    date: "2024-08-22",
    title: "文创周边 | 麻将设计",
    description: "定制麻将，让品牌系统成为可玩的文化礼品。",
    role: "品牌设计师",
    deliverables: ["麻将牌面设计", "定制礼盒与配件", "品牌符号延展"],
    client: "第四范式",
    narrative: [
      "把品牌视觉语言延展到一副定制麻将上——将第四范式的「4」标志、品牌色与符号系统融入筒、条、字牌的牌面设计，让品牌以一种可把玩、有温度的方式融入日常。",
      "配套定制礼盒与骰子、筹码等配件，整套呈现统一的品牌质感，成为兼具收藏价值与传播力的文化周边。",
    ],
    gallery: ["3.jpg", "4.jpg", "5.jpg", "6.jpg"],
    galleryColumns: 2,
  },
  {
    slug: "tetellus-branding",
    tag: "Branding",
    year: "2018",
    date: "2018-10-09",
    title: "品牌设计 | Tetellus 谛造",
    description: "为智能科技公司构建完整品牌形象。",
    role: "品牌设计师",
    deliverables: ["品牌 LOGO 与 VI", "品牌视觉系统", "品牌应用物料"],
    client: "Tetellus 谛造",
    narrative: [
      "围绕「触手可及的科技，谛造智能星球」的品牌理念，为 Tetellus 谛造打造完整的品牌形象——从 LOGO、品牌色到几何视觉语言，构建一套兼具科技感与亲和力的视觉识别系统。",
      "以深蓝为主色、红蓝渐变为点缀，配合星球、轨道等几何符号，将「让科技触手可及」的品牌主张转化为可延展至各类应用场景的视觉资产。",
    ],
    gallery: [
      "1.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg",
      "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg", "21.jpg",
      "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg", "31.jpg",
    ],
  },
];

export const workProjects = allWorkProjects.filter((project) => !project.hidden);

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}

// Cards with no detail page yet — the work grid shows only their cover and
// title, and clicking one shows a "筹备中" toast instead of navigating.
export type ComingSoonProject = {
  slug: string;
  tag: string;
  title: string;
  description: string;
};

export const comingSoonProjects: ComingSoonProject[] = [];
