import "./About.css";
import { useInView } from "../../hooks/useInView";

const DIFF_CARDS = [
  { title: "Same-Day Dispatch", sub: "Order by 10am, dispatched same day" },
  { title: "Quality Inspected", sub: "Every batch checked before leaving" },
  { title: "Nationwide Fleet",  sub: "All 47 counties, reliably" },
  { title: "Bulk Specialists",  sub: "From 1 load to 1,000+" },
];

export default function About({ scrollTo }) {
  const [ref, visible] = useInView();

  const anim = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ${delay}s, transform 0.8s ${delay}s`,
  });

  return (
    <section id="about" className="about">
      <div ref={ref} className="about__grid">

        {/* Left: image */}
        <div className={`about__image-wrap${visible ? " about__image-wrap--in" : ""}`}>

          {/* Corner accents on panel */}
          <span className="about__corner about__corner--tl" />
          <span className="about__corner about__corner--br" />

          {/* Framed logo */}
          <div className="about__frame">
            <div className="about__frame-shine" />
            <img
              src="/Logo5.jpeg"
              alt="Favoured K. Ndarugo Suppliers"
              className={`about__image ${visible ? "about__image--zoomed" : ""}`}
            />
          </div>

          {/* 15+ badge — bottom-left, inside panel */}
          <div className="about__badge">
            <div className="about__badge-inner">
              <div className="about__badge-val">15<span className="about__badge-plus">+</span></div>
              <div className="about__badge-divider" />
              <div className="about__badge-label">Years<br />of Trust</div>
            </div>
          </div>

        </div>

        {/* Right: content */}
        <div className="about__content">
          <div style={anim(0.1)}>
            <span className="eye">Who We Are</span>
            <div className="bar" />
          </div>

          <h2 className="about__heading" style={anim(0.2)}>
            Building Kenya<br />
            Starts With a<br />
            <em>Strong Foundation.</em>
          </h2>

          <p className="about__body" style={anim(0.32)}>
            At Favoured K. Ndarugo Stones, we supply construction materials
            engineered for{" "}
            <strong>
              durability, structural integrity, and long-term performance.
            </strong>
          </p>

          <p className="about__body-2" style={anim(0.4)}>
            For over 15 years, our materials have formed the backbone of
            Kenya's most ambitious builds — from Nairobi's skyline to
            developments across all 47 counties. We don't just supply
            materials. We supply certainty.
          </p>

          <div className="about__diff-grid" style={anim(0.48)}>
            {DIFF_CARDS.map(({ title, sub }) => (
              <div key={title} className="about__diff-card">
                <div className="about__diff-title">{title}</div>
                <div className="about__diff-sub">{sub}</div>
              </div>
            ))}
          </div>

          <div className="about__cta" style={anim(0.56)}>
            <button className="btn-ink" onClick={() => scrollTo("contact")}>
              Work With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
