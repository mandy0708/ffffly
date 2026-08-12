"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";

type Message = { id: number; role: "user" | "bot"; text: string };

let nextId = 1;

// 把 UI 消息历史转成 OpenAI/OpenRouter 的 messages 格式
function toApiMessages(messages: Message[], latest: string) {
  const history = messages.map((m) => ({
    role: m.role === "bot" ? ("assistant" as const) : ("user" as const),
    content: m.text,
  }));
  return [...history, { role: "user" as const, content: latest }];
}

export function AskBar() {
  const [question, setQuestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: MouseEvent) {
      if (dockRef.current && !dockRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsOpen(true);

    const trimmed = question.trim();
    if (!trimmed || isTyping) return;

    setQuestion("");
    const apiMessages = toApiMessages(messages, trimmed);
    setMessages((prev) => [...prev, { id: nextId++, role: "user", text: trimmed }]);
    setIsTyping(true);

    const botId = nextId++;
    let started = false;

    // 收到第一段文本时才把气泡插入线程，在那之前保持打字动画
    function appendChunk(chunk: string) {
      if (!chunk) return;
      if (!started) {
        started = true;
        setIsTyping(false);
        setMessages((prev) => [...prev, { id: botId, role: "bot", text: chunk }]);
        return;
      }
      setMessages((prev) =>
        prev.map((m) => (m.id === botId ? { ...m, text: m.text + chunk } : m))
      );
    }

    function showError(text: string) {
      setIsTyping(false);
      if (started) {
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, text: m.text || text } : m))
        );
      } else {
        setMessages((prev) => [...prev, { id: botId, role: "bot", text }]);
      }
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) {
        let text = "我这会儿有点忙，稍后再聊好吗？";
        try {
          const data = await res.json();
          if (data?.error) text = data.error;
        } catch {
          /* 忽略解析失败，用默认提示 */
        }
        showError(text);
        return;
      }

      // 解析 OpenRouter 的 SSE 流（标准 OpenAI 格式：一行行 `data: {...}`，以 `data: [DONE]` 结束）
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;
          const payload = trimmedLine.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            appendChunk(json.choices?.[0]?.delta?.content ?? "");
          } catch {
            /* OpenRouter 心跳/注释行等，忽略 */
          }
        }
      }

      if (!started) {
        showError("这个我暂时答不上来，直接戳 Contact Me 跟我聊聊吧～");
      }
    } catch {
      showError("网络好像开小差了，稍后再试试～");
    }
  }

  return (
    <div ref={dockRef} className={`ask-dock${isOpen ? " is-open" : ""}`}>
      {isOpen && (
        <section className="chat-panel" aria-label="Chat with Mandy">
          <button
            className="chat-close"
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <svg viewBox="0 0 42 42" fill="none" aria-hidden="true">
              <circle cx="21" cy="21" r="20.4" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" />
              <path d="M14.8 27.79 28 14.59M14.8 14.59 28 27.79" stroke="white" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </button>
          <p className="chat-greeting">
            hi，很高兴认识你，你可以用提问的方式了解更多~
          </p>
          <div className="chat-thread" ref={threadRef}>
            {messages.map((message) => (
              <p key={message.id} className={`chat-msg is-${message.role}`}>
                {message.text}
              </p>
            ))}
            {isTyping && (
              <div className="chat-typing" aria-label="Mandy is typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>
        </section>
      )}
      <form className="ask-bar" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="mandy-question">
          Ask Mandy a question
        </label>
        <input
          id="mandy-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="想了解更多，直接问"
        />
        <button type="submit" aria-label="Send question">
          <svg viewBox="0 0 42 42" fill="none" aria-hidden="true">
            <circle cx="21" cy="21" r="21" fill="black" fillOpacity="0.11" />
            <path d="M21.4 28.97V13.4M27.9 19.9 21.4 13.4 14.9 19.9" stroke="#191919" strokeOpacity="0.3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}
