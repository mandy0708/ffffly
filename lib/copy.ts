import type { Lang } from "@/lib/i18n";

// UI + page copy in both languages. Long-form project copy lives in
// lib/work-projects-i18n.ts.
const en = {
  nav: { home: "Home", work: "Work", sketchbook: "Sketchbook", about: "About", cta: "Let's talk" },
  home: {
    heroEyebrow: "HELLO, I'M MANDY !",
    heroTitle: "Making brands for AI, with AI.",
    sketchbook: { title: "Sketchbook", subtitle: "Illustration, 3D and motion — loose, unbriefed exploration." },
    brand: { title: "Brand Design", subtitle: "Building brands from positioning to system." },
    about: { title: "About Me", subtitle: "Brand designer, AI tinkerer, and problem-solver." },
    contact: { title: "Contact Me" },
    culture: { title: "Culture & IP", subtitle: "Corporate culture, IP and merchandise design." },
    hello: "👋 Hello, I'm Mandy !",
    awards: "International Design Awards",
    rights: "All Rights Reserved",
    wechat: "WeChat",
    phone: "Phone",
  },
  work: {
    title: "My personal projects & creative endeavors",
    filterLabel: "Filter projects by category",
    comingSoon: "Coming soon",
    categories: { "All Projects": "All Projects", Branding: "Branding", Marketing: "Marketing", "Culture&IP": "Culture & IP" } as Record<string, string>,
  },
  project: { client: "Client", role: "Role", deliverables: "Deliverables", sep: ", ", related: "Related Works" },
  sketchbook: { title: "Visual Sketchbook", subtitle: "Fragments, ideas and experiments from the creative process" },
  about: {
    title: "Brand & Creative Expert",
    subtitle: "From brand strategy, creativity and visual systems to communication, digital experience, space and physical products — building complete brand experiences",
    capabilities: "Capabilities",
    capabilitiesSub: "From brand strategy to every touchpoint, covering the full brand chain",
    workflow: "AI-Native Creative Workflow",
    workflowSub: "Using AI deeply, from creative exploration and visual generation to design and digital experience",
    awards: "Awards & Recognition",
    awardsSub: "Professional recognition across brand, visual identity and creative design",
    contact: "Contact",
    contactSub: "Looking forward to creating impactful brands with great teams",
    email: "Email",
    phone: "Phone",
    wechat: "WeChat",
  },
  footer: { designed: "Designed by ZHANGMAN", copyright: "Copyright ©ZHANGMAN, All rights reserved" },
};

const zh: typeof en = {
  nav: { home: "首页", work: "作品", sketchbook: "速写本", about: "关于", cta: "联系我" },
  home: {
    heroEyebrow: "你好，我是 MANDY !",
    heroTitle: "为 AI 做品牌，用 AI 做品牌。",
    sketchbook: { title: "速写本", subtitle: "插画、3D 与动效——不受需求约束的自由探索。" },
    brand: { title: "品牌设计", subtitle: "从定位到系统，构建品牌。" },
    about: { title: "关于我", subtitle: "品牌设计师、AI 实践者与问题解决者。" },
    contact: { title: "联系我" },
    culture: { title: "文化与 IP", subtitle: "企业文化、IP 与周边设计。" },
    hello: "👋 你好，我是 Mandy !",
    awards: "国际设计奖项",
    rights: "版权所有",
    wechat: "微信",
    phone: "电话",
  },
  work: {
    title: "我的个人项目与创意实践",
    filterLabel: "按类别筛选项目",
    comingSoon: "筹备中",
    categories: { "All Projects": "全部作品", Branding: "品牌", Marketing: "营销", "Culture&IP": "文化与 IP" },
  },
  project: { client: "服务品牌", role: "角色", deliverables: "交付成果", sep: "、", related: "相关作品" },
  sketchbook: { title: "视觉速写本", subtitle: "记录创作过程中的视觉碎片、想法与实验" },
  about: {
    title: "品牌与创意专家",
    subtitle: "从品牌策略、创意与视觉系统，到传播、数字体验、空间与实体，构建完整的品牌体验",
    capabilities: "能力",
    capabilitiesSub: "从品牌策略到全触点落地，覆盖品牌完整链路",
    workflow: "AI 原生创意工作流",
    workflowSub: "深度使用 AI，并将其融入从创意探索、视觉生成到设计与数字体验",
    awards: "奖项与认可",
    awardsSub: "覆盖品牌、视觉识别与创意设计领域的专业认可",
    contact: "联系",
    contactSub: "期待与优秀的团队，共同创造有影响力的品牌",
    email: "邮箱",
    phone: "电话",
    wechat: "微信",
  },
  footer: { designed: "设计：ZHANGMAN", copyright: "版权所有 ©ZHANGMAN" },
};

export const copy: Record<Lang, typeof en> = { en, zh };
