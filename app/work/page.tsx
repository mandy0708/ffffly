import type { Metadata } from "next";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import { WorkGrid, type WorkProject } from "@/components/site/work-grid";
import zhipuBrandUpgrade from "@/public/images/work/zhipu-brand-upgrade.jpg";
import zhipuAgentOpenday from "@/public/images/work/zhipu-agent-openday.jpg";
import zhipuFoundationModel from "@/public/images/work/zhipu-foundation-model.jpg";
import zhipuMultimodal from "@/public/images/work/zhipu-multimodal.jpg";
import fourParadigmBranding from "@/public/images/work/4paradigm-branding.jpg";
import fourParadigmMarketing from "@/public/images/work/4paradigm-marketing.jpg";
import fourParadigmCultureIp from "@/public/images/work/4paradigm-culture-ip.jpg";

export const metadata: Metadata = {
  title: "Work — Mandy ZhangMan",
  description: "Selected brand design work for Zhipu AI and 4Paradigm.",
};

const projects: WorkProject[] = [
  {
    tag: "Branding",
    title: "智谱品牌升级",
    description: "Leading the brand upgrade end-to-end, from proposal to rollout.",
    image: zhipuBrandUpgrade,
  },
  {
    tag: "Marketing",
    title: "Agent Openday",
    description: "Event visual identity and on-site design for the Agent Openday.",
    image: zhipuAgentOpenday,
  },
  {
    tag: "Marketing",
    title: "智谱基座模型发布视觉与 Benchmark",
    description: "Launch visuals and benchmark presentation for the foundation model release.",
    image: zhipuFoundationModel,
  },
  {
    tag: "Marketing",
    title: "智谱 V 系列多模态模型发布视觉",
    description: "Launch visual system for the V-series multimodal model.",
    image: zhipuMultimodal,
  },
  {
    tag: "Branding",
    title: "第四范式品牌设计",
    description: "Defining 4Paradigm's brand visual identity system.",
    image: fourParadigmBranding,
  },
  {
    tag: "Marketing",
    title: "第四范式营销设计",
    description: "Campaign and marketing visual design across brand touchpoints.",
    image: fourParadigmMarketing,
  },
  {
    tag: "Culture&IP",
    title: "第四范式文化IP设计",
    description: "Culture IP design, translating tradition into a modern brand experience.",
    image: fourParadigmCultureIp,
  },
];

export default function WorkPage() {
  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main">
        <div className="work-intro">
          <h1>My personal projects &amp; creative endeavors</h1>
        </div>
        <WorkGrid projects={projects} />
      </div>
    </main>
  );
}
