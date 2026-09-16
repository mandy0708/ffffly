import { awards } from "@/lib/awards";

// Short monogram shown per award until real award-logo art is dropped in.
const marks: Record<string, string> = {
  "当代好设计奖": "好设计",
  "亚洲设计奖": "亚洲",
  "WOLDA 世界标志设计大赛": "WOLDA",
  "K DESIGN": "K",
  "Pentawards": "P",
};

export function AwardsBadgeCard() {
  return (
    <div className="badge-card-awards" aria-hidden="true">
      <div className="badge-awards-stat">
        <span className="badge-awards-number">5+</span>
        <span className="badge-awards-label">International Design Awards</span>
      </div>
      <div className="badge-awards-logos">
        {awards.map((award) => (
          <span className="badge-awards-logo" key={award.num} title={award.title}>
            {marks[award.title] ?? award.title}
          </span>
        ))}
      </div>
    </div>
  );
}
