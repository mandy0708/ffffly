import type { Metadata } from "next";
import Image from "next/image";
import wechatQr from "@/public/images/about/wechat-qr.jpg";
import {
  Flag,
  Palette,
  Megaphone,
  AppWindow,
  Box,
  Gift,
} from "lucide-react";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { awards } from "@/lib/awards";

export const metadata: Metadata = {
  title: "About — Mandy ZhangMan",
  description: "Brand designer. Making brands for AI, with AI. Resume, education and contact.",
};

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
];

// "02 Skills & Expertise": 4 pastel, alternating-tilt overlapping cards —
// mirrors the colorful "What I do best?" cards on harrisonz.webflow.io (title
// color tinted from the card's own pastel, tool names as plain scattered text).
const toolGroups: { zh: string; en: string; tools: string[][] }[] = [
  {
    zh: "视觉生成",
    en: "Visual Generation",
    tools: [
      ["GPT Image", "即梦", "Liblib", "Midjourney"],
      ["TapNow", "Kling", "CapCut"],
    ],
  },
  {
    zh: "设计与原型",
    en: "Design & Prototyping",
    tools: [
      ["Figma", "Figma AI", "Photoshop"],
      ["Illustrator"],
    ],
  },
  {
    zh: "创意开发",
    en: "Creative Development",
    tools: [
      ["Claude Code", "Codex", "Figma Make"],
      ["Vercel", "Framer"],
    ],
  },
  {
    zh: "研究与协作",
    en: "Research & Collaboration",
    tools: [["Claude", "ChatGPT", "Gemini"]],
  },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      <DotField fixed />
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
              className="best-card"
              data-tilt={i % 2 === 0 ? "a" : "b"}
              data-tone={i}
              key={group.zh}
            >
              <h3 className="best-card-title">{group.zh}</h3>
              <span className="best-card-en">{group.en}</span>
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
          <div className="contact-item" id="phone">
            <span className="label">Phone</span>
            <a href="tel:18601005787">186 0100 5787</a>
          </div>
          <div className="contact-item" id="wechat">
            <span className="label">WeChat</span>
            <Image className="contact-qr" src={wechatQr} alt="Mandy ZhangMan's WeChat QR code" width={140} height={140} />
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
