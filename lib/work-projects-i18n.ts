import type { Lang } from "@/lib/i18n";
import type { WorkProjectDetail } from "@/lib/work-projects";

// The base data in work-projects.ts is Chinese for title/role/deliverables/
// narrative and English for the card description. This file supplies the
// opposite language for each field.
type Override = Partial<Pick<WorkProjectDetail, "title" | "description" | "role" | "deliverables" | "client" | "narrative">>;

const overrides: Record<string, Partial<Record<Lang, Override>>> = {
  "yuanhuan-intelligent": {
    en: {
      title: "Brand Design | MetaCircle",
      role: "Brand Designer",
      deliverables: ["Logo & VI", "Brand visual system", "Brand application materials"],
      narrative: [
        "MetaCircle is an enterprise digital analytics platform offering business diagnostics and quality control, and it needed a brand that carries both “intelligence” and “circulation”. Drawing on the core imagery of the name, I built the identity around dashed diamonds closing into a ring — the diamond stands for a slice of data, the ring for an analytics loop that keeps running — a simple geometric language that adds precision and order to the technological feel.",
        "A deep purple gradient with bright purple accents conveys professionalism and foresight. The mark and brand graphics extend across the website, social profiles, stationery, mugs and light-box signage, forming a unified, extensible visual system.",
      ],
    },
    zh: { description: "为企业数字化分析平台 MetaCircle 构建品牌形象与视觉系统。" },
  },
  "zhipu-brand-upgrade": {
    en: {
      title: "Zhipu Brand Positioning & Visual Upgrade",
      role: "Brand Designer",
      deliverables: ["Multiple creative proposals", "New brand logo", "New brand VI", "New main brand website"],
      client: "Zhipu AI",
      narrative: [
        "As the company grew, its existing brand image could no longer carry the new business landscape and international expression. For the Zhipu brand upgrade I started from brand strategy and audience insight, distilled the core character of “foundation models, academia and safety”, presented several rounds of creative proposals, and through repeated alignment drove consensus on a new logo and a complete VI.",
      ],
    },
    zh: { description: "主导品牌升级全流程，从提案到落地。" },
  },
  "zhipu-agent-openday": {
    en: {
      role: "Head of Brand Design",
      deliverables: ["Event key visual", "Keynote decks for guest speakers", "Core extension materials", "Stage build and venue materials guidance"],
      client: "Zhipu AI",
      narrative: [
        "Agent OpenDay was the launch event where Zhipu released AutoGLM and GLM-PC and first introduced the GLM-OS concept. Its core theme was “a shift in the human–computer interaction paradigm” — an abstract technology story that had to be felt directly by hundreds of guests and the cameras.",
        "Visually, it inherited the brand's signature tech blue-and-black base and introduced breathable gradient light effects: the steady dark stands for the established technical order, while the flowing light across the big screen points to the new interaction form Agents bring. Within this language I designed the main key visual, core extension materials and the keynote decks for key guests, and guided interns and the supplier team in extending it to stage screens, venue wayfinding and every other touchpoint. From presentation content to physical space, the whole event kept one consistent visual order.",
      ],
    },
    zh: { description: "智谱 Agent Openday 活动视觉与现场设计。" },
  },
  "4paradigm-branding": {
    en: {
      title: "4Paradigm Brand Identity System",
      role: "Head of Brand Design",
      deliverables: ["Model launch key visual", "Model leaderboard design guidelines", "Model launch marketing materials"],
      client: "4Paradigm",
      narrative: [
        "In 2019, as a fast-growing B2B AI company, 4Paradigm's brand had one problem to solve: strong technology, but no unified standard for visual expression inside and outside the company, so brand assets and value weren't accumulating. I introduced a brand-gene positioning method internally, used systematic brand analysis tools to establish the core brand character, and on that basis built a complete VI manual and a series of design standards — consistent brand guidelines for internal and external use — and drove their adoption.",
        "The brand system earned both market and professional recognition: the VI won the K-Design Award 2022, and the packaging won the German iF Design Award, the Contemporary Good Design Award and the Asia Design Prize.",
      ],
    },
    zh: { description: "构建第四范式品牌视觉识别体系。" },
  },
  "4paradigm-marketing": {
    en: {
      title: "4Paradigm Marketing Design & Employer Brand",
      role: "Brand Designer",
      deliverables: ["Launch event key visual and extensions", "Employer-brand illustration guidelines and extensions", "Everyday marketing posters", "Company handbook"],
      client: "4Paradigm",
      narrative: [
        "For a B2B company, brand exposure is limited, so every appearance matters. Around 4Paradigm's “AI for Everyone” proposition, we built two visual systems at once, marketing design and employer brand: on the marketing side covering launch key visuals, offline promotion, everyday marketing posters and the company handbook; on the employer-brand side, a unified commercial illustration style and illustration library, giving recruiting and corporate communications a clear, recognisable voice.",
        "A unified illustration style, brand palette and sense of texture run through all materials, so every external appearance reinforces the same brand impression instead of starting over, making brand communication more continuous and effective.",
      ],
    },
    zh: { description: "覆盖第四范式品牌触点的营销视觉与雇主品牌插画体系。" },
  },
  "4paradigm-culture-ip": {
    en: {
      title: "4Paradigm Culture IP Design",
      role: "Brand Designer",
      deliverables: ["IP character", "IP guidelines"],
      client: "4Paradigm",
      narrative: [
        "Need — Putting company culture into practice requires a core carrier that can communicate with employees emotionally and resonate with them.",
        "Goal — Let every employee feel recognition of the company culture in a relaxed, pleasant working environment, strengthen cohesion and belonging, and express the company's personality.",
        "Solution — Launch a company mascot IP. A character IP has strong vitality and can be extended into rich content, turning company culture into stories and deepening its reach. As an iconic carrier it builds an emotional bond with employees while keeping the culture consistent and coherent.",
      ],
    },
    zh: { description: "文化 IP 设计，将传统转译为现代的品牌体验。" },
  },
  "4paradigm-heiwa-ip": {
    en: {
      title: "Merch | Heiwa IP Design",
      role: "IP Designer",
      deliverables: ["IP character proposal"],
      client: "4Paradigm",
      narrative: [
        "“Heiwa” is a brand IP character designed around 4Paradigm's “AI For Everyone” idea — a rounded dark-gray body, lively triangular ears and a cute blank expression, using a relaxed, friendly visual language to soften the distance of a tech brand. The design keeps the brand's usual tech character (dark tones, restrained lines) while big ears and round eyes make the IP easy for employees and users to remember and love.",
        "Beyond the base character I extended a set of emotive stickers (frowning, thinking hard and other everyday states) and applied the IP to blankets, backpack badges, beanie pins and other merchandise, bringing “Heiwa” into office and daily life as a warmer connection between brand and people.",
      ],
    },
    zh: { description: "以「AI For Everyone」精神设计的吉祥物 IP。" },
  },
  "4paradigm-culture-system": {
    en: {
      title: "4Paradigm Corporate Culture Visual System",
      role: "Brand Designer",
      deliverables: ["Vision / mission statement visuals", "Culture symbol system", "Extensions such as culture T-shirts and merchandise"],
      client: "4Paradigm",
      narrative: [
        "Around 4Paradigm's “AI for Everyone” vision and mission statement, I designed an extensible culture symbol system, using a geometric graphic language that echoes the technical character of “paradigm”.",
        "The symbol system extends from vision posters to culture T-shirts and other merchandise, letting abstract corporate culture permeate daily work in a visual, tangible way.",
      ],
    },
    zh: { description: "将第四范式愿景与使命转译为视觉语言的文化符号系统。" },
  },
  "4paradigm-onboarding-gifts": {
    en: {
      title: "Merch | Onboarding Gifts",
      role: "Brand Designer",
      deliverables: ["Onboarding welcome gift box design", "Tenure badge system", "Culture merchandise design"],
      client: "4Paradigm",
      narrative: [
        "I designed a gift box and badge system for new-hire onboarding and tenure milestones, from the “Welcome” badge to the 0/1/2/4-year tenure badges, using a light, playful visual language to convey the company's recognition and companionship.",
        "The box packaging carries the brand's visual language, so every unboxing becomes an extension of the brand experience.",
      ],
    },
    zh: { description: "为入职与司龄纪念设计的礼盒与徽章体系。" },
  },
  "4paradigm-store-gifts": {
    en: {
      title: "Merch | Company Store Gifts",
      role: "Brand Designer",
      deliverables: ["Culture notebook design", "Culture sock design"],
      client: "4Paradigm",
      narrative: [
        "Based on 4Paradigm's brand IP and colour language, I designed a series of everyday office merchandise for the company store — embossed notebooks in navy and dark gray, with the walking IP character discreetly hot-stamped on the cover, combining practicality with brand recognition.",
        "I also designed contrast-colour socks using purple, green, yellow and other brand extension colours with repeated tiny IP icons, adding a playful side to a serious tech brand and turning it into wearable brand merchandise for employees.",
      ],
    },
    zh: { description: "为第四范式内部文创商店设计的笔记本与袜子。" },
  },
  "4paradigm-mahjong": {
    en: {
      title: "Merch | Mahjong Set",
      role: "Brand Designer",
      deliverables: ["Mahjong tile face design", "Custom gift box and accessories", "Brand symbol extensions"],
      client: "4Paradigm",
      narrative: [
        "I extended the brand's visual language onto a custom mahjong set — weaving 4Paradigm's “4” mark, brand colours and symbol system into the dots, bamboo and honour tiles, so the brand enters daily life in a playable, warm way.",
        "With a custom gift box and accessories such as dice and chips, the whole set carries a consistent brand texture, becoming cultural merchandise with both collectible value and reach.",
      ],
    },
    zh: { description: "定制麻将，让品牌系统成为可玩的文化礼品。" },
  },
  "tetellus-branding": {
    en: {
      title: "Brand Design | Tetellus",
      role: "Brand Designer",
      deliverables: ["Logo & VI", "Brand visual system", "Brand application materials"],
      client: "Tetellus",
      narrative: [
        "Around the brand idea “technology within reach, building a smart planet”, I created the full brand identity for Tetellus — from logo and brand colours to geometric visual language, a visual identity system that is both technological and approachable.",
        "With deep blue as the main colour and red-blue gradients as accents, together with geometric symbols such as planets and orbits, the idea of “technology within reach” becomes visual assets that extend into all kinds of applications.",
      ],
    },
    zh: { description: "为智能科技公司构建完整品牌形象。" },
  },
  "zhipu-foundation-model": {
    en: {
      title: "Zhipu Foundation Model Launch Visuals & Benchmark",
      role: "Brand Designer",
      deliverables: ["Brand design genes", "Brand VI manual"],
      client: "Zhipu AI",
      narrative: [
        "The foundation model is the core of Zhipu's technology story, and its launch visuals directly define the world's first impression of the brand, while the benchmark is the most quoted, screenshotted and shared asset in every release. In 2025–26 I set three baseline standards for high-frequency launches: key-visual layout rules, an overall style definition and benchmark chart rules, unifying how data appears in blogs and communication materials.",
        "Presenting a rigorous, trustworthy face outward, high-frequency launch visuals now follow clear rules.",
      ],
    },
    zh: { description: "基座模型发布视觉与 Benchmark 图表规范。" },
  },
};

export function localizeProject<T extends WorkProjectDetail>(project: T, lang: Lang): T {
  const override = overrides[project.slug]?.[lang];
  return override ? { ...project, ...override } : project;
}
