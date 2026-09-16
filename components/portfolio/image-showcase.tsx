import Image from "next/image";
import toteBag from "@/public/images/home/tote-bag.webp";
import cap from "@/public/images/home/cap.webp";
import waterBottle from "@/public/images/home/water-bottle.webp";
import workbook from "@/public/images/home/workbook.jpg";
import brandPortfolio from "@/public/images/home/品牌作品集260722-59.jpg";

const photos = [toteBag, cap, waterBottle, workbook, brandPortfolio];

const items = [
  { shape: "rect" as const, photo: photos[0] },
  { shape: "circle" as const, photo: photos[1] },
  { shape: "rect" as const, photo: photos[2] },
  { shape: "circle" as const, photo: photos[3] },
  { shape: "rect" as const, photo: photos[4] },
  { shape: "circle" as const, photo: photos[0] },
  { shape: "rect" as const, photo: photos[1] },
  { shape: "circle" as const, photo: photos[2] },
  { shape: "rect" as const, photo: photos[3] },
  { shape: "circle" as const, photo: photos[4] },
];

export function ImageShowcase() {
  const track = [...items, ...items];

  return (
    <section className="image-showcase" aria-label="Selected imagery">
      <div className="image-showcase-track">
        {track.map((item, i) => (
          <div
            className={`image-showcase-item image-showcase-item--${item.shape}`}
            key={i}
            aria-hidden={i >= items.length}
          >
            <Image src={item.photo} alt="" fill sizes="280px" style={{ objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
