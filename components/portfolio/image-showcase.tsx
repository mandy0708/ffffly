const items = [
  { shape: "rect" as const },
  { shape: "circle" as const },
  { shape: "rect" as const },
  { shape: "rect" as const },
  { shape: "circle" as const },
  { shape: "rect" as const },
  { shape: "circle" as const },
  { shape: "rect" as const },
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
          />
        ))}
      </div>
    </section>
  );
}
