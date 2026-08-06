"use client";

import { type FormEvent, useState } from "react";

const DEFAULT_QUESTION = "你平时都用什么AI软件，用\n在哪些需求上？";
const DEFAULT_ANSWER =
  "我日常用Codex和Figma AI功能，图片生成用GPT Image、LibLib和即梦。";

export function AskBar() {
  const [question, setQuestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [sentQuestion, setSentQuestion] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsOpen(true);

    const trimmed = question.trim();
    if (!trimmed) return;

    setSentQuestion(trimmed);
    setQuestion("");
  }

  return (
    <div className={`ask-dock${isOpen ? " is-open" : ""}`}>
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
          <p className="chat-greeting">hi，很高兴认识你，你可以用提问的方式了解更多~</p>
          <p className="chat-question">{sentQuestion ?? DEFAULT_QUESTION}</p>
          <p className="chat-answer">{DEFAULT_ANSWER}</p>
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
