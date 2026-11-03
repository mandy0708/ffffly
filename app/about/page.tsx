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
import { copy } from "@/lib/copy";
import { getLang } from "@/lib/i18n-server";

export const metadata: Metadata = {
  title: "About — Mandy ZhangMan",
  description: "Brand designer. Making brands for AI, with AI. Resume, education and contact.",
};

const capabilities = [
  {
    en: "Brand Strategy",
    zh: "品牌策略",
    icon: <Flag size={20} strokeWidth={1.5} aria-hidden="true" />,
    items: {
      zh: ["品牌定位", "品牌架构", "品牌叙事", "品牌升级", "创意策略", "设计策略"],
      en: ["Brand positioning", "Brand architecture", "Brand narrative", "Brand evolution", "Creative strategy", "Design strategy"],
    },
  },
  {
    en: "Brand Identity",
    zh: "品牌识别",
    icon: <Palette size={20} strokeWidth={1.5} aria-hidden="true" />,
    items: {
      zh: ["品牌标志", "VI 视觉识别", "品牌视觉系统", "品牌资产", "IP 形象", "品牌周边"],
      en: ["Logo", "Visual identity (VI)", "Brand visual system", "Brand assets", "IP characters", "Brand merchandise"],
    },
  },
  {
    en: "Brand Communication",
    zh: "品牌传播",
    icon: <Megaphone size={20} strokeWidth={1.5} aria-hidden="true" />,
    items: {
      zh: ["产品发布", "品牌活动", "社交媒体内容", "雇主品牌", "营销创意", "传播视觉", "内容视觉"],
      en: ["Product launches", "Brand events", "Social media content", "Employer branding", "Marketing creative", "Communication visuals", "Content visuals"],
    },
  },
  {
    en: "Digital Experience",
    zh: "数字体验",
    icon: <AppWindow size={20} strokeWidth={1.5} aria-hidden="true" />,
    items: {
      zh: ["官网", "产品视觉", "数字界面", "交互体验", "原型设计", "网站设计与上线"],
      en: ["Websites", "Product visuals", "Digital interfaces", "Interaction design", "Prototyping", "Website design & launch"],
    },
  },
  {
    en: "Space & Experience",
    zh: "空间与体验",
    icon: <Box size={20} strokeWidth={1.5} aria-hidden="true" />,
    items: {
      zh: ["展览", "展厅", "展会", "发布会", "活动空间", "线下品牌体验"],
      en: ["Exhibitions", "Showrooms", "Trade shows", "Launch events", "Event spaces", "Offline brand experience"],
    },
  },
  {
    en: "Physical & IP",
    zh: "实体与 IP",
    icon: <Gift size={20} strokeWidth={1.5} aria-hidden="true" />,
    items: {
      zh: ["包装设计", "品牌周边", "IP 衍生品", "礼赠产品", "印刷工艺", "打样", "供应链", "量产"],
      en: ["Packaging design", "Brand merchandise", "IP derivatives", "Gift products", "Print craft", "Proofing", "Supply chain", "Mass production"],
    },
  },
];

// "AI-Native Creative Workflow": four cards on the gradient colour bases.
const toolGroups: { zh: string; en: string; tools: { zh: string[][]; en: string[][] } }[] = [
  {
    zh: "视觉生成",
    en: "Visual Generation",
    tools: {
      zh: [["GPT Image", "即梦", "Liblib", "Midjourney"], ["TapNow", "Kling", "CapCut"]],
      en: [["GPT Image", "Jimeng", "Liblib", "Midjourney"], ["TapNow", "Kling", "CapCut"]],
    },
  },
  {
    zh: "设计与原型",
    en: "Design & Prototyping",
    tools: { zh: [["Figma", "Figma AI", "Photoshop"], ["Illustrator"]], en: [["Figma", "Figma AI", "Photoshop"], ["Illustrator"]] },
  },
  {
    zh: "创意开发",
    en: "Creative Development",
    tools: { zh: [["Cursor", "Codex", "Figma Make"], ["Vercel", "Framer"]], en: [["Cursor", "Codex", "Figma Make"], ["Vercel", "Framer"]] },
  },
  {
    zh: "研究与协作",
    en: "Research & Collaboration",
    tools: { zh: [["Gemini", "Claude"]], en: [["Gemini", "Claude"]] },
  },
];

export default async function AboutPage() {
  const lang = await getLang();
  const t = copy[lang].about;
  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main">
        <div className="about-title-block">
          <h1>{t.title}</h1>
          <p className="about-title-sub">{t.subtitle}</p>
        </div>

        <div className="section-title-block">
          <h2>{t.capabilities}</h2>
          <p className="section-subtitle">{t.capabilitiesSub}</p>
        </div>
        <div className="expertise-grid">
          {capabilities.map((capability) => (
            <div className="expertise-card" key={capability.en}>
              <div className="expertise-icon">{capability.icon}</div>
              <div className="expertise-head">
                <h3 className="expertise-zh">{lang === "en" ? capability.en : capability.zh}</h3>
                <span className="expertise-en">{lang === "en" ? capability.zh : capability.en}</span>
              </div>
              <p className="expertise-items">{capability.items[lang].join(" / ")}</p>
            </div>
          ))}
        </div>

        <div className="section-title-block">
          <h2>{t.workflow}</h2>
          <p className="section-subtitle">{t.workflowSub}</p>
        </div>
        <div className="best-grid">
          {toolGroups.map((group, i) => (
            <div
              className="best-card"
              data-tilt={i % 2 === 0 ? "a" : "b"}
              data-tone={i}
              key={group.zh}
            >
              <h3 className="best-card-title">{lang === "en" ? group.en : group.zh}</h3>
              <span className="best-card-en">{lang === "en" ? group.zh : group.en}</span>
              <div className="best-card-panel">
                <p className="best-card-tools">
                  {group.tools[lang].map((line, li) => (
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
          <h2>{t.awards}</h2>
          <p className="section-subtitle">{t.awardsSub}</p>
        </div>
        <div className="awards-list">
          {awards.map((award) => (
            <div className="awards-item" key={award.num}>
              <div className="awards-item-left">
                <span className="awards-num">{award.num}</span>
                <h3 className="awards-title">{award.title[lang]}</h3>
              </div>
              <span className="awards-detail">{award.detail[lang]}</span>
            </div>
          ))}
        </div>

        <div className="section-title-block" id="contact">
          <h2>{t.contact}</h2>
          <p className="section-subtitle">{t.contactSub}</p>
        </div>
        <div className="contact-block">
          <div className="contact-item">
            <span className="label">{t.email}</span>
            <a href="mailto:zh-man@163.com">zh-man@163.com</a>
          </div>
          <div className="contact-item" id="phone">
            <span className="label">{t.phone}</span>
            <a href="tel:18601005787">186 0100 5787</a>
          </div>
          <div className="contact-item" id="wechat">
            <span className="label">{t.wechat}</span>
            <Image className="contact-qr" src={wechatQr} alt="Mandy ZhangMan's WeChat QR code" width={140} height={140} />
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
