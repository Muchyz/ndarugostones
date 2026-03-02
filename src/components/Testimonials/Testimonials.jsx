import "./Testimonials.css";
import { TESTIMONIALS } from "../../data/constants";
import { useInView } from "../../hooks/useInView";

export default function Testimonials() {
  const [ref, visible] = useInView();

  return (
    <section className="testimonials">
      <div ref={ref} className="testimonials__inner">
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

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="tcard"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.8s ${0.1 + i * 0.12}s, transform 0.8s ${0.1 + i * 0.12}s`,
              }}
            >
              <div className="tcard__quote-mark" aria-hidden="true">"</div>
              <p className="tcard__text">"{t.text}"</p>
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
      </div>
    </section>
  );
}
