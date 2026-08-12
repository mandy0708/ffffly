import { Fragment, type ReactNode } from "react";

// 轻量 markdown 渲染器：零依赖，输出 React 节点（不使用 dangerouslySetInnerHTML）。
// 覆盖聊天场景常见语法：**加粗**、*斜体*、`代码`、[链接](url)、
// 无序/有序列表、标题(#)、以及段落换行。流式输出时半截语法会先按纯文本显示，
// 等后续 chunk 补全后自动重渲染。

// 行内解析：加粗 / 斜体 / 行内代码 / 链接
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern =
    /(`[^`]+`)|(\*\*[^*]+?\*\*)|(\*[^*]+?\*)|(\[[^\]]+\]\([^)\s]+\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    const key = `${keyPrefix}-i${i++}`;

    if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*")) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (link && /^(https?:|mailto:)/i.test(link[2])) {
        nodes.push(
          <a key={key} href={link[2]} target="_blank" rel="noopener noreferrer">
            {link[1]}
          </a>
        );
      } else {
        // 非法/危险协议链接，按纯文本处理
        nodes.push(token);
      }
    }
    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

// 多行段落：单个换行渲染成 <br/>
function renderParagraph(lines: string[], key: string): ReactNode {
  return (
    <p key={key} className="chat-md-p">
      {lines.map((line, idx) => (
        <Fragment key={idx}>
          {idx > 0 && <br />}
          {renderInline(line, `${key}-l${idx}`)}
        </Fragment>
      ))}
    </p>
  );
}

const BULLET = /^\s*[-*]\s+/;
const ORDERED = /^\s*\d+\.\s+/;
const HEADING = /^\s*(#{1,6})\s+(.*)$/;

export function Markdown({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let b = 0;

  while (i < lines.length) {
    const line = lines[i];

    // 空行：跳过
    if (line.trim() === "") {
      i++;
      continue;
    }

    // 标题
    const heading = HEADING.exec(line);
    if (heading) {
      const key = `b${b++}`;
      blocks.push(
        <p key={key} className="chat-md-h">
          {renderInline(heading[2], key)}
        </p>
      );
      i++;
      continue;
    }

    // 无序列表
    if (BULLET.test(line)) {
      const items: string[] = [];
      while (i < lines.length && BULLET.test(lines[i])) {
        items.push(lines[i].replace(BULLET, ""));
        i++;
      }
      const key = `b${b++}`;
      blocks.push(
        <ul key={key} className="chat-md-ul">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item, `${key}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // 有序列表
    if (ORDERED.test(line)) {
      const items: string[] = [];
      while (i < lines.length && ORDERED.test(lines[i])) {
        items.push(lines[i].replace(ORDERED, ""));
        i++;
      }
      const key = `b${b++}`;
      blocks.push(
        <ol key={key} className="chat-md-ol">
          {items.map((item, idx) => (
            <li key={idx}>{renderInline(item, `${key}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // 段落：收集到下一个空行 / 列表 / 标题为止
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !BULLET.test(lines[i]) &&
      !ORDERED.test(lines[i]) &&
      !HEADING.test(lines[i])
    ) {
      para.push(lines[i]);
      i++;
    }
    blocks.push(renderParagraph(para, `b${b++}`));
  }

  return <>{blocks}</>;
}
