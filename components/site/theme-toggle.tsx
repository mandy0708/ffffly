"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/** Subscribe to whatever currently drives the theme: the `data-theme` attribute
 *  (explicit choice) and the OS `prefers-color-scheme` (default). Using an
 *  external store keeps the button icon in sync without a setState-in-effect and
 *  hydrates cleanly against the server snapshot below. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Server has no window; render the light icon, matching the un-toggled default.
const getServerSnapshot = (): Theme => "light";

/** Floating sun/moon control that flips the site between the paper (light) and
 *  night (dark) themes. The choice is stored in a cookie so the server can
 *  render the right colors on the next load (see app/layout.tsx). */
export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = theme === "dark";

  function toggle() {
    const next: Theme = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    // One year, site-wide; lax is fine for a first-party preference cookie.
    document.cookie = `theme=${next}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "切换到日间模式" : "切换到夜间模式"}
      title={isDark ? "日间模式" : "夜间模式"}
    >
      {isDark ? (
        // Sun
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5.2 5.2l1.7 1.7M17.1 17.1l1.7 1.7M18.8 5.2l-1.7 1.7M6.9 17.1l-1.7 1.7" />
          </g>
        </svg>
      ) : (
        // Moon
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a0.5 0.5 0 0 0-.7-.6A9 9 0 1 0 20.6 15.2a0.5 0.5 0 0 0-.6-.7Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
