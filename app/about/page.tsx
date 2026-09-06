import type { Metadata } from "next";
import {
  Flag,
  Paintbrush,
  Palette,
  Megaphone,
  AppWindow,
  Box,
  Gift,
  Sparkles,
} from "lucide-react";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "About — Mandy ZhangMan",
  description: "Brand designer. Making brands for AI, with AI. Resume, education and contact.",
};

const experience: {
  date: string;
  companyZh: string;
  companyEn: string;
  role: string;
  description: string;
  note?: string;
}[] = [
  {
    date: "2024 — Present",
    companyZh: "智谱华章",
    companyEn: "Z.ai",
    role: "品牌设计负责人",
    description:
      "负责 AI 科技品牌从品牌升级、视觉体系到产品发布、传播、数字体验、展览及品牌资产的完整建设，并推动 AI 融入设计生产流程。",
  },
  {
    date: "2019 — 2023",
    companyZh: "第四范式",
    companyEn: "4Paradigm",
    role: "品牌设计负责人",
    description:
      "负责企业科技品牌体系建设与持续升级，覆盖品牌识别、产品与营销传播、雇主品牌、活动、IP 及实体品牌资产。",
    note: "IxDC2022 大会讲师 · 受邀为中央美术学院讲授 AI 品牌设计案例",
  },
  {
    date: "2018 — 2019",
    companyZh: "玖富数科",
    companyEn: "9F",
    role: "资深品牌设计师",
    description:
      "负责多业务线品牌与产品视觉，从品牌识别、IP 到营销活动及品牌周边，推动视觉资产系统化。",
  },
  {
    date: "2016 — 2017",
    companyZh: "万科",
    companyEn: "Vanke",
    role: "创意总监",
    description:
      "负责企业品牌与文化传播，覆盖品牌视觉、招聘与活动，并承担设计团队建设与管理。",
  },
  {
    date: "2014 — 2016",
    companyZh: "中信信托",
    companyEn: "",
    role: "品牌设计",
    description:
      "参与多个业务线品牌建设与视觉体系搭建，覆盖地产、科技及消费相关业务。",
  },
];

const awards = [
  { num: "01", title: "当代好设计奖", detail: "WINNER 2022" },
  { num: "02", title: "亚洲设计奖", detail: "2023 Grand Prize" },
  { num: "03", title: "WOLDA 世界标志设计大赛", detail: "铜奖" },
  { num: "04", title: "K DESIGN", detail: "2022 Grand Prize" },
  { num: "05", title: "Pentawards", detail: "入围奖" },
];

const capabilities = [
  {
    en: "Brand Strategy",
    zh: "品牌策略",
    icon: (
      <Flag size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: ["品牌定位", "品牌架构", "品牌叙事", "品牌升级", "创意策略", "设计策略"],
  },
  {
    en: "Creative Direction",
    zh: "创意与视觉",
    icon: (
      <Paintbrush size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: ["创意概念", "创意方向", "视觉概念", "视觉语言", "艺术指导", "主题创意"],
  },
  {
    en: "Brand Identity",
    zh: "品牌识别",
    icon: (
      <Palette size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: ["品牌标志", "VI 视觉识别", "品牌视觉系统", "品牌资产", "IP 形象", "品牌周边"],
  },
  {
    en: "Brand Communication",
    zh: "品牌传播",
    icon: (
      <Megaphone size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: ["产品发布", "品牌活动", "社交媒体内容", "雇主品牌", "营销创意", "传播视觉", "内容视觉"],
  },
  {
    en: "Digital Experience",
    zh: "数字体验",
    icon: (
      <AppWindow size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: ["官网", "产品视觉", "数字界面", "交互体验", "原型设计", "网站设计与上线"],
  },
  {
    en: "Space & Experience",
    zh: "空间与体验",
    icon: (
      <Box size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: ["展览", "展厅", "展会", "发布会", "活动空间", "线下品牌体验"],
  },
  {
    en: "Physical & IP",
    zh: "实体与 IP",
    icon: (
      <Gift size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: ["包装设计", "品牌周边", "IP 衍生品", "礼赠产品", "印刷工艺", "打样", "供应链", "量产"],
  },
  {
    en: "AI & Brand Systems",
    zh: "AI 与品牌系统",
    icon: (
      <Sparkles size={20} strokeWidth={1.5} aria-hidden="true" />
    ),
    items: [
      "AI 辅助创意", "视觉生成", "内容生产", "设计工作流", "品牌资产管理",
      "模板系统", "品牌规范", "供应商协作", "设计效率体系",
    ],
  },
];

// "02 Skills & Expertise": 4 pastel, alternating-tilt overlapping cards —
// mirrors the colorful "What I do best?" cards on harrisonz.webflow.io (title
// color tinted from the card's own pastel, tool names as plain scattered text).
const toolGroups: { zh: string; en: string; bg?: string; fg: string; dark?: boolean; tools: string[][] }[] = [
  {
    zh: "视觉生成",
    en: "Visual Generation",
    bg: "#FFFFFF",
    fg: "#171717",
    tools: [
      ["GPT Image", "即梦", "Liblib", "Midjourney"],
      ["TapNow", "Kling", "CapCut"],
    ],
  },
  {
    zh: "设计与原型",
    en: "Design & Prototyping",
    dark: true,
    fg: "#FFFFFF",
    tools: [
      ["Figma", "Figma AI", "Photoshop"],
      ["Illustrator"],
    ],
  },
  {
    zh: "创意开发",
    en: "Creative Development",
    bg: "#FFFFFF",
    fg: "#171717",
    tools: [
      ["Cursor", "Codex", "Figma Make"],
      ["Vercel", "Framer"],
    ],
  },
  {
    zh: "研究与协作",
    en: "Research & Collaboration",
    dark: true,
    fg: "#FFFFFF",
    tools: [["Gemini", "Claude"]],
  },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <div className="site-main">
        <div className="about-title-block">
          <h1>Brand &amp; Creative Expert</h1>
          <p className="about-title-sub">
            从品牌策略、创意与视觉系统，到传播、数字体验、空间与实体，构建完整的品牌体验
          </p>
        </div>

        <div className="section-title-block">
          <h2>Capabilities</h2>
          <p className="section-subtitle">从品牌策略到全触点落地，覆盖品牌完整链路</p>
        </div>
        <div className="expertise-grid">
          {capabilities.map((capability) => (
            <div className="expertise-card" key={capability.en}>
              <div className="expertise-icon">{capability.icon}</div>
              <div className="expertise-head">
                <h3 className="expertise-zh">{capability.zh}</h3>
                <span className="expertise-en">{capability.en}</span>
              </div>
              <p className="expertise-items">{capability.items.join(" / ")}</p>
            </div>
          ))}
        </div>

        <div className="section-title-block">
          <h2>AI-Native Creative Workflow</h2>
          <p className="section-subtitle">深度使用 AI，并将其融入从创意探索、视觉生成到设计与数字体验</p>
        </div>
        <div className="best-grid">
          {toolGroups.map((group, i) => (
            <div
              className={`best-card${group.dark ? " best-card--dark" : ""}`}
              data-tilt={i % 2 === 0 ? "a" : "b"}
              style={group.dark ? undefined : { background: group.bg }}
              key={group.zh}
            >
              <h3 className="best-card-title" style={{ color: group.fg }}>{group.zh}</h3>
              <span className="best-card-en" style={{ color: group.fg }}>{group.en}</span>
              <div className="best-card-panel">
                <p className="best-card-tools">
                  {group.tools.map((line, li) => (
                    <span key={li}>
                      {li > 0 && <br />}
                      {line.join("/")}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-title-block">
          <h2>Job Experience</h2>
          <p className="section-subtitle">14+ 年品牌与创意设计经验，覆盖 AI、科技、互联网与大型企业，兼具品牌全链路实践与团队管理</p>
        </div>
        <div className="job-list">
          {experience.map((job) => (
            <div className="job-item" key={job.date}>
              <h3 className="job-company">
                {job.companyZh}
                {job.companyEn && ` · ${job.companyEn}`}
              </h3>
              <div className="job-body">
                <p className="job-role">{job.role}</p>
                <p className="job-desc">{job.description}</p>
                {job.note && <p className="job-note">{job.note}</p>}
              </div>
              <p className="job-year">{job.date}</p>
            </div>
          ))}
        </div>

        <div className="section-title-block">
          <h2>Awards &amp; Recognition</h2>
          <p className="section-subtitle">覆盖品牌、视觉识别与创意设计领域的专业认可</p>
        </div>
        <div className="awards-list">
          {awards.map((award) => (
            <div className="awards-item" key={award.num}>
              <div className="awards-item-left">
                <span className="awards-num">{award.num}</span>
                <h3 className="awards-title">{award.title}</h3>
              </div>
              <span className="awards-detail">{award.detail}</span>
            </div>
          ))}
        </div>

        <div className="section-title-block" id="contact">
          <h2>Contact</h2>
          <p className="section-subtitle">期待与优秀的团队，共同创造有影响力的品牌</p>
        </div>
        <div className="contact-block">
          <div className="contact-item">
            <span className="label">Email</span>
            <a href="mailto:zh-man@163.com">zh-man@163.com</a>
          </div>
          <div className="contact-item">
            <span className="label">Phone / WeChat</span>
            <a href="tel:18601005787">186 0100 5787</a>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
