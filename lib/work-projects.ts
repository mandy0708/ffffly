export type WorkProjectDetail = {
  slug: string;
  tag: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  role: string;
  deliverables: string[];
  client: string;
  projectLink?: string;
  narrative: string[];
  gallery: string[];
  galleryColumns?: number;
};

export const workProjects: WorkProjectDetail[] = [
  {
    slug: "zhipu-brand-upgrade",
    tag: "Branding",
    year: "2026",
    title: "智谱品牌升级",
    description: "Leading the brand upgrade end-to-end, from proposal to rollout.",
    role: "品牌设计师",
    deliverables: ["多方案创意提报", "品牌全新 logo", "品牌全新 VI", "全新主品牌网站"],
    client: "智谱",
    projectLink: "https://chat.z.ai",
    narrative: [
      "随着智谱从大模型研发公司走向全球化 AI 品牌（z.ai），原有品牌形象已难以承载新的业务格局与国际化表达。我作为智谱唯一的品牌设计师主导本次品牌升级：从品牌战略与受众洞察出发，提炼「AI、严谨、安全」的核心气质，完成多轮创意方案提报，并在反复对齐中推动共识落地。",
      "最终交付全新 logo 与完整 VI 体系，建立覆盖数字端与线下场景的视觉规范，确保品牌在官网、发布会、市场活动等全触点的一致性表达，支撑智谱品牌的全球化更新。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"],
  },
  {
    slug: "zhipu-agent-openday",
    tag: "Marketing",
    year: "2025",
    title: "Agent Openday",
    description: "Event visual identity and on-site design for the Agent Openday.",
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
    tag: "Marketing",
    year: "2026",
    title: "智谱基座模型发布视觉与 Benchmark",
    description: "Launch visuals and benchmark presentation for the foundation model release.",
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
    year: "2023",
    title: "第四范式品牌设计",
    description: "Defining 4Paradigm's brand visual identity system.",
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
    title: "第四范式营销设计",
    description: "Campaign and marketing visual design across brand touchpoints.",
    role: "品牌设计师",
    deliverables: ["发布会主视觉及物料延展", "雇主品牌插画规范与延展", "日常营销海报", "公司手册"],
    client: "第四范式",
    narrative: [
      "To B 企业的品牌对外露出有限，每一次出现都更显珍贵——发布会、雇主品牌、日常营销、印刷物料等每个触点，都需要传递一致的品牌印象。我们通过统一的插画风格、品牌色调与质感语言，建立了清晰、一致、具有差异性的对外活动视觉体系，覆盖发布会主视觉与全套营销物料的设计与落地。",
      "系统化的规范让每一次活动都在强化同一个品牌印象，而非重新开始，实现更持续、更有效的品牌传播。",
    ],
    gallery: ["2.jpg", "3.jpg", "4.jpg", "5.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg"],
  },
  {
    slug: "4paradigm-culture-ip",
    tag: "Culture&IP",
    year: "2023",
    title: "第四范式文化 IP 设计",
    description: "Culture IP design, translating tradition into a modern brand experience.",
    role: "品牌设计师",
    deliverables: ["IP 形象", "IP 规范"],
    client: "第四范式",
    projectLink: "learn-more",
    narrative: [
      "需求 — 企业文化落地需要一个核心载体，能与员工进行情感化沟通，进而引起员工的情感共鸣。",
      "目标 — 让每一位员工在轻松愉快的工作环境下，对公司文化有认同感，增强公司向心力与凝聚力，同时又能体现企业的个性。",
      "解决方案 — 推出企业形象 IP。形象 IP 具有强生命力，可做更丰富的延伸内容，将企业文化故事化，增强企业文化的渗透力。除此之外，IP 作为标志性的载体，与员工建立情感联系的同时，也保持了企业文化的一致性与连贯性。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg"],
  },
  {
    slug: "4paradigm-culture-system",
    tag: "Culture&IP",
    year: "2024",
    title: "第四范式企业文化视觉系统",
    description: "A culture symbol system translating 4Paradigm's vision and mission into visual language.",
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
    title: "第四范式文创周边与入职礼",
    description: "Gift box and badge system design for onboarding and work-anniversary milestones.",
    role: "品牌设计师",
    deliverables: ["入职欢迎礼盒设计", "司龄徽章系统", "文创周边设计"],
    client: "第四范式",
    narrative: [
      "为新人入职与员工司龄纪念设计了一套礼盒与徽章体系，从「Welcome」欢迎徽章到 0/1/2/4 年司龄徽章，用轻松有趣的视觉语言传递公司对员工的认可与陪伴。",
      "礼盒包装延续品牌视觉语言，让每一次拆礼盒都成为一次品牌体验的延伸。",
    ],
    gallery: ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "06.jpg", "7.jpg"],
  },
  {
    slug: "4paradigm-mahjong",
    tag: "Culture&IP",
    year: "2024",
    title: "第四范式品牌定制麻将",
    description: "A custom mahjong set that turns the brand system into a playable cultural gift.",
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
];

export function getWorkProject(slug: string) {
  return workProjects.find((project) => project.slug === slug);
}
