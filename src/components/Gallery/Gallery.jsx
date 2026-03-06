import { useState } from "react";
import "./Gallery.css";
import { useInView } from "../../hooks/useInView";

const GALLERY = [
  {
    url: "/gallery-1.jpg",
    label: "Site Delivery",
    caption: "Mombasa, Kenya",
    wide: true,
  },
  {
    url: "/gallery-2.jpg",
    label: "Materials On-Site",
    caption: "Nairobi, Kenya",
    tall: true,
  },
  {
    url: "/gallery-3.jpg",
    label: "Loading Bay",
    caption: "Kisumu, Kenya",
  },
  {
    url: "/gallery-4.jpg",
    label: "Warehouse Stock",
    caption: "Eldoret, Kenya",
  },
  {
    url: "/gallery-5.jpg",
    label: "Bulk Delivery",
    caption: "Nakuru, Kenya",
    wide: true,
  },
  {
    url: "/gallery-6.jpg",
    label: "Construction Site",
    caption: "Thika, Kenya",
  },
  {
    url: "/gallery-7.jpg",
    label: "Material Quality",
    caption: "Nairobi, Kenya",
    tall: true,
  },
  {
    url: "/gallery-8.jpg",
    label: "Final Delivery",
    caption: "Mombasa, Kenya",
  },
];

export default function Gallery() {
  const [ref, visible] = useInView();
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="gallery">
      <div ref={ref} className="gallery__inner">
        <div className="gallery__header">
          <div>
            <span className="eye">Visual Portfolio</span>
            <div className="bar" />
            <h2
              className="gallery__heading"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
              }}
            >
              The <em>Gallery</em>
            </h2>
          </div>
          <p
            className="gallery__sub"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s 0.25s",
            }}
          >
            Real materials. Real sites. Real deliveries — documented across Kenya.
          </p>
        </div>

        <div className="gallery__grid">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className={[
                "gcell",
                img.wide ? "gcell--wide" : "",
                img.tall ? "gcell--tall" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.97)",
                transition: `opacity 0.7s ${0.05 * i}s, transform 0.7s ${0.05 * i}s`,
              }}
              onClick={() => setLightbox(img)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightbox(img)}
              aria-label={`View ${img.label}`}
            >
              <img src={img.url} alt={img.label} loading="lazy" />
              <div className="gcell__overlay">
                <span className="gcell__label">{img.label}</span>
                <span className="gcell__caption">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label}
        >
          <div
            className="lightbox__inner"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.url} alt={lightbox.label} />
            <div className="lightbox__meta">
              <div className="lightbox__label">{lightbox.label}</div>
              <div className="lightbox__caption">{lightbox.caption}</div>
            </div>
            <button
              className="lightbox__close"
              onClick={() => setLightbox(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
