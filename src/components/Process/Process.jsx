import "./Process.css";
import { useInView } from "../../hooks/useInView";

const STEPS = [
  {
    n: "01",
    title: "Order Placement",
    desc: "Contact us by phone, WhatsApp or our form. We assess your needs and provide an accurate quote within 2 hours.",
  },
  {
    n: "02",
    title: "Quality Inspection",
    desc: "Every batch is rigorously inspected — grading, moisture and structural integrity verified before dispatch.",
  },
  {
    n: "03",
    title: "Secure Loading",
    desc: "Materials loaded under strict supervision using calibrated equipment. Accurate weighing guaranteed every time.",
  },
  {
    n: "04",
    title: "Timely Delivery",
    desc: "Our fleet delivers directly to your site, anywhere in Kenya. Most sites receive delivery within 24 hours.",
    highlight: true,
  },
];

export default function Process() {
  const [ref, visible] = useInView();

  return (
    <section id="process" className="process">
      <div ref={ref} className="process__inner">
        <div className="process__header">
          <span className="eye">How It Works</span>
          <div className="bar" />
          <h2
            className="process__heading"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
            }}
          >
            Our <em>Process</em>
          </h2>
        </div>

        <div className="process__steps">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`process__step ${visible ? "process__step--visible" : ""}`}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.8s ${0.1 + i * 0.12}s, transform 0.8s ${0.1 + i * 0.12}s, border-color 0.5s ${0.1 + i * 0.12}s`,
              }}
            >
              <div className="process__step-num">{step.n}</div>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.desc}</p>
              {step.highlight && (
                <div className="process__step-highlight">
                  ✓ 24hr delivery on most orders
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
