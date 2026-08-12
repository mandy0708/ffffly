import type { Metadata } from "next";
import Image from "next/image";
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

const skills = [
  {
    title: "品牌定位与设计 DNA",
    desc: "梳理企业理念、战略与竞争语境，提炼品牌核心气质，转化为可执行、可延展的视觉定位与设计原则。",
  },
  {
    title: "品牌视觉系统与规范",
    desc: "建立 LOGO、VI 到落地物料的完整设计标准，沉淀对内对外一致的品牌规范体系。",
  },
  {
    title: "发布与营销视觉创意",
    desc: "围绕模型发布、产品上线与品牌活动，统筹从创意概念到落地物料的完整视觉产出。",
  },
  {
    title: "AI 设计工作流",
    desc: "搭建可复用的工作流与 skills，制定 AI 参与生产的边界与终审标准，并持续维护更新。",
  },
  {
    title: "企业文化与 IP 设计",
    desc: "在雇主品牌、文化周边与 IP 形象设定方面有丰富经验，把企业理念转译为有温度的触点。",
  },
  {
    title: "知识产权挖掘与注册",
    desc: "具备专利挖掘、材料撰写与商标、著作权注册经验，从需求梳理到证书获取全程跟进。",
  },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
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
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill.title}>
              <p className="skill-card-title">{skill.title}</p>
              <p className="skill-card-desc">{skill.desc}</p>
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
