"use client";

import { useRouter } from "next/navigation";
import { LANG_COOKIE, type Lang } from "@/lib/i18n";
import { useLang } from "@/components/site/lang-provider";

/** "EN / 中" toggle for the nav. Stores the choice in a cookie so the server
 *  renders the right language, then refreshes the current route. */
export function LangSwitch() {
  const lang = useLang();
  const router = useRouter();

  function choose(next: Lang) {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div className="lang-switch" role="group" aria-label="Language">
      <button type="button" aria-pressed={lang === "en"} onClick={() => choose("en")}>EN</button>
      <span aria-hidden="true">/</span>
      <button type="button" aria-pressed={lang === "zh"} onClick={() => choose("zh")}>中</button>
    </div>
  );
}
