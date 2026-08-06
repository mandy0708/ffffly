"use client";

import { type FormEvent, useState } from "react";

export function AskBar() {
  const [question, setQuestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sentQuestion, setSentQuestion] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsOpen(true);

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setSentQuestion(trimmedQuestion);
    setQuestion("");
  }

  function closeChat() {
    setIsOpen(false);
  }

  return (
    <div className={`ask-dock${isOpen ? " is-open" : ""}`}>
      {isOpen && (
        <section className="chat-panel" aria-label="Chat with Mandy">
          <button className="chat-close" type="button" onClick={closeChat} aria-label="Close chat">
            <span aria-hidden="true">×</span>
          </button>
          <p className="chat-greeting">hi，很高兴认识你，你可以<br />用提问的方式了解更多~</p>
          <p className="chat-question">{sentQuestion ?? "你平时都用什么AI软件，用\n在哪些需求上？"}</p>
          <p className="chat-answer">我日常用Codex和Figma AI功能，图片生成用GPT Image、LibLib和即梦。</p>
        </section>
      )}
      <form className="ask-bar" onSubmit={handleSubmit}>
        <span className="ai-badge" aria-hidden="true">✦</span>
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
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M12 19V5M18 11L12 5L6 11" />
          </svg>
        </button>
      </form>
    </div>
  );
}
