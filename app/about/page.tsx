import type { Metadata } from "next";
import Image from "next/image";
import { DotField } from "@/components/portfolio/dot-field";
import { SiteNav } from "@/components/site/site-nav";
import portrait from "@/public/images/portfolio/about-portrait.jpg";

export const metadata: Metadata = {
  title: "About — Mandy ZhangMan",
  description: "Brand designer. Making brands for AI, with AI. Resume, education and contact.",
};

const experience = [
  {
    date: "2024.05 - 至今",
    company: "北京智谱华章科技有限公司",
    role: "品牌设计",
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

const stats = [
  { value: "13+", label: "Years of experience" },
  { value: "5", label: "Brands & teams led" },
  { value: "15+", label: "Product logo & VI systems" },
  { value: "3+", label: "International design awards" },
];

export default function AboutPage() {
  return (
    <main className="site-shell">
      <DotField fixed />
      <SiteNav />
      <div className="site-main">
        <section className="about-hero">
          <div className="about-hero-photo">
            <Image src={portrait} alt="Portrait of Mandy ZhangMan" width={168} height={168} />
          </div>
          <div className="about-hero-copy">
            <h1>Mandy ZhangMan</h1>
            <p className="tagline">Brand Designer.<br />Making brands for AI, with AI.</p>
            <p className="about-meta">
              <span>13 years of experience</span>
              <span>Brand Design Expert</span>
              <span>www.ffffly.com</span>
            </p>
          </div>
        </section>

        <div className="about-stats">
          {stats.map((stat) => (
            <div className="about-stat" key={stat.label}>
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="section-heading">
          <span className="index">01</span>
          <h2>Experience</h2>
        </div>
        <div className="timeline">
          {experience.map((job) => (
            <div className="timeline-item" key={job.company + job.date}>
              <div className="timeline-date">{job.date}</div>
              <div className="timeline-body">
                <h3>{job.company}</h3>
                <p className="role">{job.role}</p>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
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

        <div className="section-heading" id="contact">
          <span className="index">03</span>
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
    </main>
  );
}
