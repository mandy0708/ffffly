import type { Metadata } from "next";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import { WorkGrid, type WorkProject } from "@/components/site/work-grid";

export const metadata: Metadata = {
  title: "Work — Mandy ZhangMan",
  description: "Selected brand design work for Zhipu AI and 4Paradigm.",
};

const projects: WorkProject[] = [
  {
    tag: "智谱 AI",
    title: "智谱品牌升级",
    description: "Leading the brand upgrade end-to-end, from proposal to rollout.",
    tint: "linear-gradient(155deg, #1c2a4a, #0a0a0b)",
  },
  {
    tag: "智谱 AI",
    title: "Agent Openday",
    description: "Event visual identity and on-site design for the Agent Openday.",
    tint: "linear-gradient(155deg, #2a2038, #0a0a0b)",
  },
  {
    tag: "智谱 AI",
    title: "智谱基座模型发布视觉与 Benchmark",
    description: "Launch visuals and benchmark presentation for the foundation model release.",
    tint: "linear-gradient(155deg, #12312c, #0a0a0b)",
  },
  {
    tag: "智谱 AI",
    title: "智谱 V 系列多模态模型发布视觉",
    description: "Launch visual system for the V-series multimodal model.",
    tint: "linear-gradient(155deg, #33241a, #0a0a0b)",
  },
  {
    tag: "第四范式",
    title: "第四范式品牌设计",
    description: "Defining 4Paradigm's brand visual identity system.",
    tint: "linear-gradient(155deg, #1f2733, #0a0a0b)",
  },
  {
    tag: "第四范式",
    title: "第四范式营销设计",
    description: "Campaign and marketing visual design across brand touchpoints.",
    tint: "linear-gradient(155deg, #302030, #0a0a0b)",
  },
  {
    tag: "第四范式",
    title: "第四范式文化IP设计",
    description: "Culture IP design, translating tradition into a modern brand experience.",
    tint: "linear-gradient(155deg, #2c2418, #0a0a0b)",
  },
];

export default function WorkPage() {
  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main">
        <div className="work-intro">
          <h1>Work</h1>
          <p>
            Selected brand design projects from my time at 智谱 AI (Zhipu AI) and 第四范式
            (4Paradigm) — from brand systems to launch visuals and culture IP.
          </p>
        </div>
        <WorkGrid projects={projects} />
      </div>
    </main>
  );
}
