import { useState } from "react";
import "./Testimonials.css";
import { TESTIMONIALS } from "../../data/constants";
import { useInView } from "../../hooks/useInView";

const PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(TESTIMONIALS.length / PER_PAGE);

export default function Testimonials() {
  const [ref, visible] = useInView();
  const [page, setPage] = useState(0);

  const visible_cards = TESTIMONIALS.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section className="testimonials">
      <div ref={ref} className="testimonials__inner">

        {/* Header */}
        <div className="testimonials__header">
          <div>
            <span className="eye" style={{ color: "rgba(196,153,26,0.8)" }}>
              Client Proof
            </span>
            <div className="bar" />
            <h2
              className="testimonials__heading"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
              }}
            >
              What Contractors
              <br />
              <em>Say About Us</em>
            </h2>
          </div>
          <p
            className="testimonials__sub"
            style={{
              opacity: visible ? 1 : 0,
              transition: "opacity 0.8s 0.25s",
            }}
          >
            Trusted by engineers, developers and contractors across Kenya.
          </p>
        </div>

        {/* Cards */}
        <div className="testimonials__grid">
          {visible_cards.map((t, i) => (
            <div
              key={`${page}-${i}`}
              className="tcard"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ${0.08 * i}s, transform 0.6s ${0.08 * i}s`,
              }}
            >
              <div className="tcard__stars">
                {[...Array(5)].map((_, s) => <span key={s}>★</span>)}
              </div>
              <div className="tcard__quote-mark" aria-hidden="true">"</div>
              <p className="tcard__text">{t.text}</p>
              <div className="tcard__footer">
                <div className="tcard__avatar">{t.initials}</div>
                <div>
                  <div className="tcard__name">{t.name}</div>
                  <div className="tcard__role">{t.role}</div>
                  <div className="tcard__project">📋 {t.project}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          className="testimonials__pagination"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s 0.5s",
          }}
        >
          <button
            className="tpag__btn"
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            aria-label="Previous"
          >
            ‹‹
          </button>

          <div className="tpag__dots">
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
              <button
                key={i}
                className={`tpag__dot${i === page ? " tpag__dot--active" : ""}`}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          <span className="tpag__count">
            {page + 1} / {TOTAL_PAGES}
          </span>

          <button
            className="tpag__btn"
            onClick={() => setPage((p) => Math.min(p + 1, TOTAL_PAGES - 1))}
            disabled={page === TOTAL_PAGES - 1}
            aria-label="Next"
          >
            ››
          </button>
        </div>

      </div>
    </section>
  );
}
