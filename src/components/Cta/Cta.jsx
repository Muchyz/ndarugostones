import "./Cta.css";
import { useInView } from "../../hooks/useInView";
import { wa } from "../../data/constants";

export default function Cta({ scrollTo }) {
  const [ref, visible] = useInView();

  return (
    <section className="cta">
      <div className="cta__bg">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=85"
          alt=""
          className="cta__bg-img"
        />
        <div className="cta__bg-overlay" />
      </div>

      <div className="cta__ghost" aria-hidden="true">KENYA</div>

      <div className="cta__content">
        <div
          ref={ref}
          className="cta__inner"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.8s, transform 0.8s",
          }}
        >
          <span className="eye" style={{ color: "rgba(196,153,26,0.8)" }}>
            Start Today
          </span>
          <div className="bar" />
          <h2 className="cta__heading">
            Ready to Start Your
            <br />
            <em>Construction Project?</em>
          </h2>
          <p className="cta__sub">
            From Nairobi to Mombasa. Kisumu to Eldoret. Quality materials
            delivered to every corner of Kenya.
          </p>
          <div className="cta__buttons">
            <button
              className="btn-gold"
              style={{ padding: "16px 48px" }}
              onClick={() => scrollTo("contact")}
            >
              Request a Quote Today
            </button>
            <a
              href={wa("Hi, I want to order building materials.")}
              target="_blank"
              rel="noreferrer"
            >
              <button className="btn-ghost" style={{ padding: "15px 36px" }}>
                💬 WhatsApp Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
