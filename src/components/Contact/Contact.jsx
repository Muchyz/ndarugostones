import { useState } from "react";
import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaTruck,
} from "react-icons/fa";
import "./Contact.css";
import { useInView } from "../../hooks/useInView";
import { wa } from "../../data/constants";

const INFO_ITEMS = [
  { icon: <FaPhone size={16} />,        label: "Phone & WhatsApp", val: "+254 713 788 322",           href: "tel:+254713788322" },
  { icon: <FaEnvelope size={16} />,     label: "Email",            val: "Desmondchegeh50@gmail.com",  href: "mailto:Desmondchegeh50@gmail.com" },
  { icon: <FaMapMarkerAlt size={16} />, label: "Head Office",      val: "Nairobi, Kenya",             href: "#" },
  { icon: <FaClock size={16} />,        label: "Business Hours",   val: "Mon–Sat: 6am – 8pm",         href: "#" },
  { icon: <FaTruck size={16} />,        label: "Delivery",         val: "All 47 Counties, Nationwide", href: "#" },
];

const MATERIALS = [
  "Machine-Cut Ndarugo Stones",
  "Bulk Ballast",
  "River Sand",
  "Hardcore & Site Fill",
  "Quarry Dust",
  "Multiple Materials",
  "Site Delivery Logistics",
];

export default function Contact() {
  const [ref, visible] = useInView();
  const [form, setForm] = useState({ name: "", phone: "", email: "", material: "", county: "", msg: "" });
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", phone: "", email: "", material: "", county: "", msg: "" });
    setTimeout(() => setSent(false), 6000);
  };

  const anim = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0)" : "translateX(-24px)",
    transition: `opacity 0.8s ${delay}s, transform 0.8s ${delay}s`,
  });

  return (
    <section id="contact" className="contact">
      <div ref={ref} className="contact__inner">
        <div className="contact__header">
          <span className="eye">Free Consultation</span>
          <div className="bar" />
          <h2
            className="contact__heading"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s 0.1s, transform 0.8s 0.1s",
            }}
          >
            Request a <em>Quote</em>
          </h2>
        </div>

        <div className="contact__grid">
          {/* Info */}
          <div style={anim(0.2)}>
            {INFO_ITEMS.map((item) => (
              <a key={item.label} href={item.href} className="contact__info-item">
                <div className="contact__info-icon">{item.icon}</div>
                <div>
                  <div className="contact__info-label">{item.label}</div>
                  <div className="contact__info-val">{item.val}</div>
                </div>
              </a>
            ))}

            <a
              href={wa("Hi, I need a quote for building materials.")}
              target="_blank"
              rel="noreferrer"
              className="contact__wa-btn"
            >
              <FaWhatsapp size={22} color="#fff" />
              <div>
                <div className="contact__wa-title">Instant WhatsApp Quote</div>
                <div className="contact__wa-sub">Response in under 15 minutes</div>
              </div>
            </a>

            <div className="contact__map">
              <iframe
                title="Nairobi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35653956246!2d36.68258899999999!3d-1.3028617999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske"
                width="100%"
                height="170"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(24px)",
              transition: "opacity 0.8s 0.32s, transform 0.8s 0.32s",
            }}
          >
            <div className="contact__social-proof">
              <div className="contact__proof-avatar">JM</div>
              <div>
                <p className="contact__proof-quote">
                  "Consistent quality, on-time delivery — Favoured K. are reliable
                  partners on every project."
                </p>
                <div className="contact__proof-author">
                  James Mwangi · Civil Engineer, Apex Constructions
                </div>
              </div>
            </div>

            {sent ? (
              <div className="contact__success">
                <div className="contact__success-icon">✅</div>
                <div className="contact__success-title">Quote Submitted</div>
                <div className="contact__success-sub">
                  We'll contact you within 2 hours with a detailed quote. Thank you.
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="contact__form">
                <input className="fi" placeholder="Full Name *" required value={form.name} onChange={set("name")} />
                <input className="fi" placeholder="Phone Number *" required value={form.phone} onChange={set("phone")} />
                <input className="fi fi--full" placeholder="Email Address" value={form.email} onChange={set("email")} />
                <select className="fi" required value={form.material} onChange={set("material")}>
                  <option value="">Select Material *</option>
                  {MATERIALS.map((m) => <option key={m}>{m}</option>)}
                </select>
                <input className="fi" placeholder="Delivery County *" required value={form.county} onChange={set("county")} />
                <textarea className="fi fi--full" placeholder="Project details, quantities, timeline..." rows={4} style={{ resize: "vertical" }} value={form.msg} onChange={set("msg")} />
                <button type="submit" className="btn-ink contact__submit">
                  Submit Quote Request
                </button>
                <p className="contact__form-note">
                  Free consultation · No obligation · Response within 2 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
