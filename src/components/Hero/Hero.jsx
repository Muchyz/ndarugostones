import { useState, useEffect, useRef } from "react";
import "./Hero.css";

const FRAMES = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80",
];

const STATS = [
  { target: 5000, suffix: "+",  label: "Deliveries", dur: 2400 },
  { target: 47,   suffix: "",   label: "Counties",   dur: 1600 },
  { target: 15,   suffix: "+",  label: "Years",      dur: 1400 },
  { target: 24,   suffix: "hr", label: "Response",   dur: 1200 },
];

const TAGS = ["Ndarugo Stone", "Ballast", "River Sand", "Aggregates"];

function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function useCountUp(target, dur, started) {
  const [count, setCount] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!started) return;
    const t0 = performance.now();
    const step = (now) => {
      const t = Math.min((now - t0) / dur, 1);
      setCount(Math.floor(easeOut(t) * target));
      if (t < 1) raf.current = requestAnimationFrame(step);
      else setCount(target);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [started, target, dur]);
  return count;
}

function StatItem({ target, suffix, label, dur, started }) {
  const count = useCountUp(target, dur, started);
  return (
    <div className="hero__stat">
      <div className="hero__stat-val">{count.toLocaleString()}{suffix}</div>
      <div className="hero__stat-label">{label}</div>
    </div>
  );
}

export default function Hero({ scrollTo }) {
  const [frame, setFrame]     = useState(0);
  const [loaded, setLoaded]   = useState(false);
  const [tick, setTick]       = useState(0);
  const [counting, setCounting] = useState(false);

  // Slideshow + progress bar
  useEffect(() => {
    const INTERVAL = 6000;
    let start = performance.now();
    const id = setInterval(() => {
      setFrame(f => (f + 1) % FRAMES.length);
      start = performance.now();
    }, INTERVAL);
    let raf;
    const loop = (now) => {
      setTick(Math.min((now - start) / INTERVAL, 1) * 100);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, []);

  // Entrance
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Start count-up after footer animates in
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setCounting(true), 1400);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <section id="home" className={`hero${loaded ? " hero--in" : ""}`}>

      {/* ── Photo layer ── */}
      {FRAMES.map((src, i) => (
        <div
          key={i}
          className={`hero__ambient${frame === i ? " hero__ambient--on" : ""}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
      <div className="hero__cast" />
      <div className="hero__grain" />

      {/* ── Progress bar ── */}
      <div className="hero__progress">
        {FRAMES.map((_, i) => (
          <div key={i} className="hero__pt">
            <div
              className="hero__pf"
              style={{
                transform: `scaleX(${
                  i < frame ? 1 : i === frame ? tick / 100 : 0
                })`,
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Decorations ── */}
      <div className="hero__vrule" />
      <div className="hero__ghost" aria-hidden="true">BUILD</div>
      <button
        className="hero__scrollcue"
        onClick={() => scrollTo("services")}
        aria-label="Scroll to services"
      >
        <span className="hero__scrollcue-label">Scroll</span>
        <span className="hero__scrollcue-track">
          <span className="hero__scrollcue-thumb" />
        </span>
      </button>

      {/* ── Nav strip ── */}
      <div className="hero__nav">
        <div className="hero__nav-est">Est. 2009 &nbsp;·&nbsp; Licensed Supplier</div>
        <div className="hero__nav-tags">
          {TAGS.map(t => <span key={t} className="hero__nav-tag">{t}</span>)}
        </div>
      </div>

      {/* ── Main stage ── */}
      <div className="hero__stage">

        <div className="hero__overline">
          <span className="hero__overline-bar" />
          <span className="hero__overline-text">Kenya's Premier Building Materials Supplier</span>
        </div>

        <h1 className="hero__hed" aria-label="We Build Kenya">
          <span className="hero__row">
            <span className="hero__w hero__w--thin">We</span>
          </span>
          <span className="hero__row">
            <span className="hero__w hero__w--bold">Build</span>
          </span>
          <span className="hero__row">
            <span className="hero__w hero__w--gold">
              Kenya<span className="hero__period">.</span>
            </span>
          </span>
        </h1>

        <div className="hero__descriptor">
          <p className="hero__desc-text">
            <strong>Machine-cut Ndarugo stone, ballast, river sand &amp; aggregates.</strong><br />
            Bulk supply with guaranteed delivery to every county — on schedule, every time.
          </p>
          <div className="hero__desc-loc">
            <span className="hero__desc-loc-city">Juja</span>
            <span className="hero__desc-loc-country">Kenya</span>
            <span className="hero__desc-loc-tag">Countrywide</span>
          </div>
        </div>

        <div className="hero__actions">
          <button className="hero__btn-primary" onClick={() => scrollTo("contact")}>
            Request a Quote
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </button>
          <a href="tel:0729709938" style={{ textDecoration: "none" }}>
            <button className="hero__btn-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.22 1.18 2 2 0 012.22 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.56-.56a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              0729709938
            </button>
          </a>
        </div>

      </div>

      {/* ── Stats footer ── */}
      <div className="hero__footer">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} started={counting} />
        ))}
      </div>

    </section>
  );
}
