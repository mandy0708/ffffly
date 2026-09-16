import Image from "next/image";
import toteBag from "@/public/images/home/tote-bag.webp";
import cap from "@/public/images/home/cap.webp";
import thumb4 from "@/public/images/home/thumb-4.webp";
import thumb6 from "@/public/images/home/thumb-6.webp";

const photos = [toteBag, cap, thumb4, thumb6];

const items = [
  { shape: "rect" as const, photo: photos[0] },
  { shape: "circle" as const, photo: photos[1] },
  { shape: "rect" as const, photo: photos[2] },
  { shape: "rect" as const, photo: photos[3] },
  { shape: "circle" as const, photo: photos[0] },
  { shape: "rect" as const, photo: photos[1] },
  { shape: "circle" as const, photo: photos[2] },
  { shape: "rect" as const, photo: photos[3] },
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
