import { awards } from "@/lib/awards";
import { copy } from "@/lib/copy";
import { getLang } from "@/lib/i18n-server";

export async function AwardsShowcase() {
  const lang = await getLang();
  const t = copy[lang].about;
  return (
    <section className="home-awards">
      <div className="section-title-block">
        <h2>{t.awards}</h2>
        <p className="section-subtitle">{t.awardsSub}</p>
      </div>
      <div className="awards-list">
        {awards.map((award) => (
          <div className="awards-item" key={award.num}>
            <div className="awards-item-left">
              <span className="awards-num">{award.num}</span>
              <h3 className="awards-title">{award.title[lang]}</h3>
            </div>
            <span className="awards-detail">{award.detail[lang]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
