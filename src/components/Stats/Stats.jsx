import "./Stats.css";
import { useInView } from "../../hooks/useInView";

const STATS = [
  { val: "500+", label: "Deliveries\nCompleted", sub: "Across all project sizes" },
  { val: "47",   label: "Counties\nCovered",    sub: "Full national reach" },
  { val: "100%", label: "Reliable\nTransport",  sub: "On-time, every time" },
  { val: "24hr", label: "Response\nTime",       sub: "Quote in under 2 hours" },
];

export default function Stats() {
  const [ref, visible] = useInView();

  return (
    <section className="stats">
      <div className="stats__bg">
        <img
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85"
          alt=""
          className="stats__bg-img"
        />
        <div className="stats__bg-overlay" />
      </div>

      <div className="stats__ghost" aria-hidden="true">500+</div>

      <div ref={ref} className="stats__grid">
        {STATS.map(({ val, label, sub }, i) => (
          <div
            key={val}
            className="stats__item"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ${i * 0.1}s, transform 0.7s ${i * 0.1}s`,
            }}
          >
            <div className="stats__val">{val}</div>
            <div className="stats__label">{label}</div>
            <div className="stats__sub">{sub}</div>
            <div className="stats__divider" />
          </div>
        ))}
      </div>
    </section>
  );
}
