export type Lang = "en" | "zh";
export const LANG_COOKIE = "lang";
export const DEFAULT_LANG: Lang = "en";
export const isLang = (value: unknown): value is Lang => value === "en" || value === "zh";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-03-18" → "Mar 18, 2026" (en) / "2026年3月18日" (zh). */
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  return lang === "zh" ? `${y}年${m}月${d}日` : `${MONTHS[m - 1]} ${d}, ${y}`;
}
