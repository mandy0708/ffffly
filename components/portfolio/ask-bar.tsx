"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { getReply } from "@/components/portfolio/chat-responses";

type Message = { id: number; role: "user" | "bot"; text: string };

let nextId = 1;

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsOpen(true);

    const trimmed = question.trim();
    if (!trimmed) return;

    setQuestion("");
    setMessages((prev) => [...prev, { id: nextId++, role: "user", text: trimmed }]);
    setIsTyping(true);

    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: nextId++, role: "bot", text: getReply(trimmed) }]);
    }, 650);
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
