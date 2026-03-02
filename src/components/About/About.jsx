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
        <div className="about__image-wrap">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=90"
            alt="Machine-cut Ndarugo stones"
            className={`about__image ${visible ? "about__image--zoomed" : ""}`}
          />
          <div className="about__badge">
            <div className="about__badge-val">15+</div>
            <div className="about__badge-label">Years of Trust</div>
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
