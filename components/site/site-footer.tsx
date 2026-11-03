import { copy } from "@/lib/copy";
import { getLang } from "@/lib/i18n-server";

export async function SiteFooter() {
  const t = copy[await getLang()].footer;
  return (
    <footer className="site-footer">
      <p>{t.designed}</p>
      <p>{t.copyright}</p>
    </footer>
  );
}
