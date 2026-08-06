type Rule = { keywords: string[]; reply: string };

const rules: Rule[] = [
  {
    keywords: ["ai软件", "ai工具", "用什么ai", "什么ai", "ai用"],
    reply: "我日常用 Codex 和 Figma AI 功能，图片生成用 GPT Image、LibLib 和即梦。",
  },
  {
    keywords: ["你是谁", "自我介绍", "介绍一下", "关于你", "about you", "who are you"],
    reply: "我是 Mandy，一名品牌设计师，也是个 AI 爱好者，喜欢把复杂问题拆解成清晰的解决方案。",
  },
  {
    keywords: ["服务", "能做什么", "擅长", "brand", "品牌设计", "品牌"],
    reply: "我的核心是品牌设计——从定位到完整的视觉系统，也做文化 IP 和商业插画。",
  },
  {
    keywords: ["联系", "contact", "合作", "怎么找你", "email", "微信", "wechat"],
    reply: "点一下上面的 Contact Me 卡片，或者直接在这里留言，我看到都会回你～",
  },
  {
    keywords: ["作品", "案例", "portfolio", "work", "项目"],
    reply: "可以看看 Brand Design、Culture & IP 和 Sketchbook 这几张卡片，都是我最近在做的项目。",
  },
  {
    keywords: ["麻将", "文化", "ip", "culture"],
    reply: "Culture & IP 是我把传统文化元素（比如麻将）重新设计成现代产品体验的方向，寓意和好玩都要兼顾。",
  },
  {
    keywords: ["价格", "报价", "多少钱", "预算"],
    reply: "报价要看项目范围，直接在 Contact Me 里跟我说说需求，我会尽快给你一个靠谱的估算。",
  },
];

const fallback =
  "这个问题有点特别，直接戳 Contact Me 跟我聊聊，会比我瞎猜靠谱多了～";

export function getReply(question: string): string {
  const normalized = question.trim().toLowerCase();
  if (!normalized) return fallback;

  const hit = rules.find((rule) =>
    rule.keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
  );

  return hit ? hit.reply : fallback;
}
