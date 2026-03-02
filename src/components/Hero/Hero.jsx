import { useState, useEffect } from "react";
import "./Hero.css";
import { wa } from "../../data/constants";

const FRAMES = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=90",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90",
];

const TRUST = [
  { val: "500+", label: "Deliveries" },
  { val: "47",   label: "Counties" },
  { val: "15+",  label: "Years" },
  { val: "24hr", label: "Response" },
];

export default function Hero({ scrollTo }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="hero">
      {/* Crossfading background images */}
      {FRAMES.map((src, i) => (
        <div
          key={i}
          className="hero__bg"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: frame === i ? 0.28 : 0,
          }}
        />
      ))}

      <div className="hero__overlay-main" />
      <div className="hero__overlay-bottom" />
      <div className="hero__rule" />
      <div className="hero__ghost-text" aria-hidden="true">BUILD</div>

      {/* Main content */}
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span className="eye">Nairobi, Kenya · Countrywide Delivery</span>
        </div>

        <div className="hero__headline">
          <div className="hero__hl-ghost" aria-hidden="true">WE</div>
          <div className="hero__hl-main">BUILD</div>
          <div className="hero__hl-accent">KENYA.</div>
        </div>

        <p className="hero__sub">
          Premium supplier of machine-cut Ndarugo stones, ballast, sand and
          aggregates — delivered to every construction site across Kenya.
        </p>

        <div className="hero__ctas">
          <button className="btn-gold" onClick={() => scrollTo("contact")}>
            Request a Quote
          </button>
          <a href="tel:+254713788322" style={{ textDecoration: "none" }}>
            <button className="btn-ghost">📞 Call Now</button>
          </a>
        </div>

        {/* Trust strip */}
        <div className="hero__trust">
          {TRUST.map(({ val, label }) => (
            <div key={label} className="hero__trust-item">
              <div className="hero__trust-val">{val}</div>
              <div className="hero__trust-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button className="hero__scroll" onClick={() => scrollTo("services")}>
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </button>
    </section>
  );
}
