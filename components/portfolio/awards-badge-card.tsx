import Image from "next/image";
import award1 from "@/public/images/awards/award-1.png";
import award2 from "@/public/images/awards/award-2-pentawards.png";
import award3 from "@/public/images/awards/award-3-a-design.png";
import award4 from "@/public/images/awards/award-4-if.png";
import award5 from "@/public/images/awards/award-5-kdesign.png";

const logos = [award1, award2, award3, award4, award5];

export function AwardsBadgeCard() {
  return (
    <div className="badge-card-awards" aria-hidden="true">
      <div className="badge-awards-stat">
        <span className="badge-awards-number">5+</span>
        <span className="badge-awards-label">International Design Awards</span>
      </div>
      <div className="badge-awards-logos">
        {logos.map((logo, i) => (
          <span className="badge-awards-logo" key={i}>
            <Image src={logo} alt="" fill sizes="40px" style={{ objectFit: "cover" }} />
          </span>
        ))}
      </div>
    </div>
  );
}
