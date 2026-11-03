import { cookies } from "next/headers";
import { DEFAULT_LANG, LANG_COOKIE, isLang, type Lang } from "@/lib/i18n";

/** Reads the visitor's language (set by the nav switch) on the server. */
export async function getLang(): Promise<Lang> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}
