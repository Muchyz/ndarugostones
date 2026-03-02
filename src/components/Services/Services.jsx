import { useState } from "react";
import "./Services.css";
import { SERVICES, wa } from "../../data/constants";
import { useInView } from "../../hooks/useInView";

export default function Services({ scrollTo }) {
  const [ref, visible] = useInView();
  const [hov, setHov] = useState(null);
  const featured = SERVICES[0];
  const rest = SERVICES.slice(1);

  const anim = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    transition: `opacity 0.8s ${delay}s, transform 0.8s ${delay}s`,
  });

  return (
    <section id="services" className="services">
      <div ref={ref} className="services__inner">

        {/* Header */}
        <div className="services__header">
          <div>
            <span className="eye" style={{ color: "rgba(196,153,26,0.8)" }}>
              What We Supply
            </span>
            <div className="bar" />
            <h2 className="services__heading" style={anim(0.1)}>
              Our <em>Services</em>
            </h2>
          </div>
          <p className="services__sub" style={anim(0.25)}>
            Six material categories. Every load quality-inspected. Delivered
            anywhere in Kenya.
          </p>
        </div>

        {/* Featured card */}
        <div
          className="services__featured"
          style={anim(0.15)}
          onMouseEnter={() => setHov(0)}
          onMouseLeave={() => setHov(null)}
        >
          <div className="services__featured-img-wrap">
            <img
              src={featured.img}
              alt={featured.title}
              className="services__featured-img"
            />
          </div>
          <div className="services__featured-body">
            <span className="services__featured-cat">
              {featured.cat} · Featured
            </span>
            <h3 className="services__featured-title">{featured.title}</h3>
            <p className="services__featured-desc">{featured.desc}</p>
            <div className="services__featured-price">
              {featured.price}
              <span>/load</span>
            </div>
            <div className="services__featured-actions">
              <a
                href={wa(featured.wa)}
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn-wa">WhatsApp</button>
              </a>
              <button
                className="btn-gold"
                style={{ padding: "13px 20px", fontSize: "10px" }}
                onClick={() => scrollTo("contact")}
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>

        {/* 5-card grid */}
        <div className="services__grid">
          {rest.map((s, i) => (
            <div
              key={s.id}
              className="svc-card"
              style={anim(0.2 + i * 0.08)}
              onMouseEnter={() => setHov(s.id)}
              onMouseLeave={() => setHov(null)}
            >
              <div className="svc-card__img-wrap">
                <img
                  src={s.img}
                  alt={s.title}
                  className="svc-card__img"
                />
                <div className="svc-card__overlay" />
                <div className="svc-card__info">
                  <div className="svc-card__cat">{s.cat}</div>
                  <div className="svc-card__title">{s.title}</div>
                  <div className="svc-card__price">{s.price}</div>
                </div>
              </div>
              <div className="svc-card__actions">
                <a
                  href={wa(s.wa)}
                  target="_blank"
                  rel="noreferrer"
                  style={{ flex: 1, textDecoration: "none" }}
                >
                  <button className="svc-card__btn-wa">WA</button>
                </a>
                <button
                  className="svc-card__btn-quote"
                  onClick={() => scrollTo("contact")}
                >
                  Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
