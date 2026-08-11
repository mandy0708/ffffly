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
    title: "品牌设计",
    desc: "从品牌定位到视觉系统的全链路设计。梳理品牌基因与设计原则，建立 LOGO、VI 到落地规范的完整体系，让抽象定位沉淀为对内对外一致的视觉语言。",
  },
  {
    title: "营销与创意",
    desc: "围绕产品发布与传播打造视觉表达。承接模型发布、活动视觉、落地物料的创意与生产，将企业最核心的信息清晰、有力地传递给市场。",
  },
  {
    title: "品牌文化",
    desc: "让品牌拥有温度与人格的延展设计。覆盖雇主品牌、文化周边与 IP 形象设定，把企业理念转译为可感知的触点，在人才与用户的第一印象中建立差异化认知。",
  },
  {
    title: "AI 工作流",
    desc: "将 AI 从个人技巧升级为团队能力。建立可复用的工作流与 skills，制定 AI 参与设计生产的边界与终审标准，让设计的效率与能力边界持续外扩。",
  },
  {
    title: "团队与交付管理",
    desc: "以规范和标准化流程保障稳定产出。管理 3–6 人设计团队及供应商网络，让交付的一致性依赖机制而非个人状态，在高频需求下保持稳定质量。",
  },
  {
    title: "知识产权",
    desc: "为品牌与技术资产提供法律保护。具备外观、实用新型专利及商标注册、著作权登记的完整报奖与申报经验，助力企业的创新成果尽快受到保护。",
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
