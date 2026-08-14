import type { Metadata } from "next";
import Image from "next/image";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import portrait from "@/public/images/portfolio/about-portrait.jpg";

export const metadata: Metadata = {
  title: "About — Mandy ZhangMan",
  description: "Brand designer. Making brands for AI, with AI. Resume, education and contact.",
};

const experience = [
  {
    date: "2024.05 - 至今",
    company: "北京智谱华章科技有限公司",
    role: "品牌设计负责人",
    bullets: [
      "全面负责公司品牌视觉体系的维护与迭代，覆盖官网、发布会、市场活动及品牌周边等全触点",
      "主导品牌升级项目，从提案到落地全程负责",
      "构建 AI 驱动的设计工作流，大量设计生产环节由 AI 完成",
    ],
  },
  {
    date: "2019.07 - 2023.04",
    company: "第四范式（北京）技术有限公司",
    role: "品牌设计负责人",
    bullets: [
      "带领品牌团队获得多个设计奖项，包括德国F设计奖、当代好设计奖、亚洲设计奖等",
      "带领品牌团队获得多个实用新型/外观专利、商标许可证、著作权登记证书",
      "定义第四范式品牌视觉识别系统",
      "IxDC2022 国际体验设计大会讲师",
      "受邀参与2022 中央美术学院系列课程介绍人工智能品牌设计案例",
    ],
  },
  {
    date: "2018.02 - 2019.04",
    company: "玖富数科科技集团有限责任公司",
    role: "高级品牌设计师",
    bullets: [
      "负责品牌VI的维护和升级，共完成15+套新产品logo及VI设计，3套吉祥物设计，多次负责APP大型运营活动设计，对外礼品设计、制作及落地",
      "建立公司内部品牌资源池，实现设计与模版等资源的线上共享与自助下载",
    ],
  },
  {
    date: "2016.05 - 2017.08",
    company: "北京万科企业有限公司",
    role: "创意总监",
    bullets: [
      "在职期间，多中标并完成新品牌的 VI 形象建立，以及校招、品牌发布会、企业文化等活动的视觉设计工作",
      "带领团队创作完成向子公司的创意提报，部门由4人扩至20人，进行创意培训及日常管理",
      "2016年第三季度“绩优”员工、2016年年度“绩优”员工、北京万科销售中心2016最佳新人",
    ],
  },
  {
    date: "2014.08 - 2016.04",
    company: "中信信托-旅游地产",
    role: "创作部副经理",
    bullets: ["负责集团房地产、IT、红酒领域的 VI 视觉设计工作，参与公司品牌策划工作"],
  },
];

const education = [
  { school: "北京服装学院", degree: "本科 · 数字媒体艺术", date: "2020 - 2022" },
  { school: "哈尔滨广播电视大学", degree: "大专 · 广告学", date: "2007 - 2010" },
];

const highlights = [
  {
    index: "01",
    zh: "品牌设计",
    en: "Brand Design",
    desc: "从0到1构建品牌视觉体系，主导品牌升级项目，从提案到落地全程负责。",
  },
  {
    index: "02",
    zh: "视觉设计",
    en: "Visual Design",
    desc: "发布会、产品官网与 Campaign 视觉设计，把复杂的技术讲清楚、讲好看。",
  },
  {
    index: "03",
    zh: "文化&IP",
    en: "Culture & IP",
    desc: "企业文化与吉祥物 IP 形象设计，让品牌更有温度、更容易被记住。",
  },
  {
    index: "04",
    zh: "雇主品牌",
    en: "Employer Branding",
    desc: "校招、内部活动与员工体验设计，凝聚团队认同感，扩大雇主品牌影响力。",
  },
];

// Line icons (24x24, stroke = currentColor) shown in each expertise group's badge.
const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const expertise = [
  {
    zh: "品牌策略与系统",
    en: "Brand Strategy & System",
    icon: (
      <svg viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M15.6 8.4l-2 5.2-5.2 2 2-5.2z" />
      </svg>
    ),
    items: ["品牌定位与设计 DNA", "品牌视觉系统与规范", "企业文化与 IP 设计"],
  },
  {
    zh: "设计执行",
    en: "Design Execution",
    icon: (
      <svg viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
      </svg>
    ),
    items: ["UI 与线上视觉设计", "印刷工艺与展会落地物料", "发布与营销视觉创意"],
  },
  {
    zh: "设计方法与资产",
    en: "Method & Assets",
    icon: (
      <svg viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
        <path d="M12 3 3 8l9 5 9-5-9-5z" />
        <path d="M3 16l9 5 9-5" />
        <path d="M3 12l9 5 9-5" />
      </svg>
    ),
    items: ["AI 设计工作流", "设计投奖规划与申报", "知识产权挖掘与注册"],
  },
  {
    zh: "团队与协作",
    en: "Team & Collaboration",
    icon: (
      <svg viewBox="0 0 24 24" {...strokeProps} aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    items: ["供应商与外部协作管理", "模板标准化与规范资产沉淀", "团队行业影响力建设"],
  },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main">
        <section className="about-hero">
          <div className="about-hero-copy">
            <h1 className="tagline">Brand Designer.<br />Making brands for AI, with AI.</h1>
          </div>
        </section>

        <div className="about-highlights">
          <div className="about-highlights-col">
            {highlights.slice(0, 2).map((item) => (
              <div key={item.en}>
                <div className="about-highlight-index">{item.index}</div>
                <p className="about-highlight-title">
                  <span>{item.zh}</span>
                  <span>{item.en}</span>
                </p>
                <p className="about-highlight-desc">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="about-highlights-photo">
            <Image src={portrait} alt="Portrait of Mandy ZhangMan" width={240} height={280} />
          </div>
          <div className="about-highlights-col">
            {highlights.slice(2, 4).map((item) => (
              <div key={item.en}>
                <div className="about-highlight-index">{item.index}</div>
                <p className="about-highlight-title">
                  <span>{item.zh}</span>
                  <span>{item.en}</span>
                </p>
                <p className="about-highlight-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-heading">
          <span className="index">01</span>
          <h2>Experience</h2>
        </div>
        <div className="experience-list">
          {experience.map((job) => (
            <div className="experience-card" key={job.company + job.date}>
              <div className="experience-card-main">
                <h3>{job.company}</h3>
                <p className="role">{job.role}</p>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="experience-card-date">{job.date}</div>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <span className="index">02</span>
          <h2>Education</h2>
        </div>
        <div className="education-list">
          {education.map((edu) => (
            <div className="education-item" key={edu.school}>
              <div className="date">{edu.date}</div>
              <div>
                <p className="school">{edu.school}</p>
                <p className="degree">{edu.degree}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <span className="index">03</span>
          <h2>Skills &amp; Expertise</h2>
        </div>
        <div className="expertise-grid">
          {expertise.map((group) => (
            <div className="expertise-card" key={group.en}>
              <div className="expertise-icon">{group.icon}</div>
              <div className="expertise-head">
                <h3 className="expertise-zh">{group.zh}</h3>
                <span className="expertise-en">{group.en}</span>
              </div>
              <ul className="expertise-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="section-heading" id="contact">
          <span className="index">04</span>
          <h2>Contact</h2>
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
