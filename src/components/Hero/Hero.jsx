import { useState, useEffect, useRef } from "react";
import "./Hero.css";

const FRAMES = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=90",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=90",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90",
];

// target = final number, suffix = "+", "hr", etc., duration = ms
const TRUST = [
  { target: 5000, suffix: "+", label: "Deliveries", duration: 2200 },
  { target: 47,   suffix: "",  label: "Counties",   duration: 1600 },
  { target: 15,   suffix: "+", label: "Years",      duration: 1400 },
  { target: 24,   suffix: "hr",label: "Response",   duration: 1200 },
];

const PRODUCTS = ["Ndarugo Stone", "Ballast", "River Sand", "Aggregates"];

// Easing: ease-out cubic
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function useCountUp(target, duration, started) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(easeOut(progress) * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target, duration]);

  return count;
}

function TrustItem({ target, suffix, label, duration, started, index }) {
  const count = useCountUp(target, duration, started);
  return (
    <div className="hero__trust-item" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="hero__trust-val">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="hero__trust-label">{label}</div>
    </div>
  );
}

export default function Hero({ scrollTo }) {
  const [frame, setFrame]     = useState(0);
  const [loaded, setLoaded]   = useState(false);
  const [tick, setTick]       = useState(0);
  const [counting, setCounting] = useState(false);

  useEffect(() => {
    const INTERVAL = 5000;
    let start = performance.now();

    const id = setInterval(() => {
      setFrame(f => (f + 1) % FRAMES.length);
      start = performance.now();
    }, INTERVAL);

    let raf;
    const loop = (now) => {
      setTick(((now - start) / INTERVAL) * 100);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Start counting once trust strip animates in (~1.05s delay + 0.3s)
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setCounting(true), 1350);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <section id="home" className={`hero${loaded ? " hero--in" : ""}`}>

      {/* ── Backgrounds ── */}
      {FRAMES.map((src, i) => (
        <div
          key={i}
          className={`hero__bg${frame === i ? " hero__bg--on" : ""}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      {/* ── Overlays ── */}
      <div className="hero__ov-main" />
      <div className="hero__ov-bottom" />

      {/* ── Texture grain (matches body::before) ── */}
      <div className="hero__grain" />

      {/* ── Decorative vertical rule ── */}
      <div className="hero__rule">
        <div className="hero__rule-shimmer" />
      </div>

      {/* ── Top meta bar ── */}
      <div className="hero__meta">
        <div className="hero__meta-left">
          <span className="eye">Est. 2009</span>
        </div>
        <div className="hero__meta-right">
          {PRODUCTS.map((p, i) => (
            <span key={i} className="hero__meta-tag">{p}</span>
          ))}
        </div>
      </div>

      {/* ── Slide progress bar ── */}
      <div className="hero__progress">
        {FRAMES.map((_, i) => (
          <div key={i} className="hero__progress-track">
            <div
              className="hero__progress-fill"
              style={{
                transform: `scaleX(${
                  i < frame ? 1
                  : i === frame ? tick / 100
                  : 0
                })`,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Ghost watermark ── */}
      <div className="hero__ghost" aria-hidden="true">BUILD</div>

      {/* ── Main content ── */}
      <div className="hero__body">

        {/* Eyebrow */}
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-line" />
          <span className="eye">Est. 2009 &nbsp;·&nbsp; Licensed Supplier</span>
        </p>

        {/* Headline */}
        <h1 className="hero__headline" aria-label="We Build Kenya">
          <span className="hero__hl-row hero__hl-row--1">
            <em className="hero__hl-thin">We</em>
          </span>
          <span className="hero__hl-row hero__hl-row--2">
            <strong className="hero__hl-solid">Build</strong>
          </span>
          <span className="hero__hl-row hero__hl-row--3">
            <em className="hero__hl-gold">Kenya</em>
            <span className="hero__hl-dot">.</span>
          </span>
        </h1>

        {/* Sub */}
        <p className="hero__sub">
          Kenya's trusted source for machine-cut Ndarugo stone, ballast, river sand
          and aggregates. Bulk supply with guaranteed delivery to every county —
          on schedule, every time.
        </p>

        {/* CTAs */}
        <div className="hero__ctas">
          <button className="btn-gold hero__btn-primary" onClick={() => scrollTo("contact")}>
            Request a Quote
            <span className="hero__btn-arrow" aria-hidden="true">→</span>
          </button>
          <a href="tel:+254713788322" style={{ textDecoration: "none" }}>
            <button className="btn-ghost hero__btn-secondary">
              ✆ &nbsp;Call Now
            </button>
          </a>

        </div>

        {/* Trust strip */}
        <div className="hero__trust">
          {TRUST.map(({ target, suffix, label, duration }, i) => (
            <TrustItem
              key={label}
              target={target}
              suffix={suffix}
              label={label}
              duration={duration}
              started={counting}
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <button className="hero__scroll" onClick={() => scrollTo("services")} aria-label="Scroll down">
        <span className="hero__scroll-label">Scroll</span>
        <span className="hero__scroll-track">
          <span className="hero__scroll-thumb" />
        </span>
      </button>

    </section>
  );
}
