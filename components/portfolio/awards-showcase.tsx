import { awards } from "@/lib/awards";

export function AwardsShowcase() {
  return (
    <section className="home-awards">
      <div className="section-title-block">
        <h2>Awards &amp; Recognition</h2>
        <p className="section-subtitle">覆盖品牌、视觉识别与创意设计领域的专业认可</p>
      </div>
      <div className="awards-list">
        {awards.map((award) => (
          <div className="awards-item" key={award.num}>
            <div className="awards-item-left">
              <span className="awards-num">{award.num}</span>
              <h3 className="awards-title">{award.title}</h3>
            </div>
            <span className="awards-detail">{award.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
