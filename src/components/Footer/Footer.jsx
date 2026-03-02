import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTruck,
} from "react-icons/fa";
import "./Footer.css";

const SERVICES_LIST = [
  "Ndarugo Stones",
  "Bulk Ballast",
  "River Sand",
  "Hardcore",
  "Quarry Dust",
  "Site Logistics",
];

const COMPANY_LINKS = [
  { id: "home",     label: "Home" },
  { id: "services", label: "Services" },
  { id: "about",    label: "About Us" },
  { id: "process",  label: "Our Process" },
  { id: "gallery",  label: "Gallery" },
  { id: "contact",  label: "Contact" },
];

const CONTACT_ITEMS = [
  { icon: <FaPhone size={13} />,        val: "+254 713 788 322" },
  { icon: <FaEnvelope size={13} />,     val: "Desmondchegeh50@gmail.com" },
  { icon: <FaMapMarkerAlt size={13} />, val: "Nairobi, Kenya" },
  { icon: <FaTruck size={13} />,        val: "All 47 Counties" },
];

const SOCIALS = [
  { icon: <FaFacebookF size={14} />, href: "https://facebook.com",  label: "Facebook" },
  { icon: <FaInstagram size={14} />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaWhatsapp  size={14} />, href: "https://wa.me/254713788322", label: "WhatsApp" },
  { icon: <FaYoutube   size={14} />, href: "https://youtube.com",   label: "YouTube" },
  { icon: <FaTwitter   size={14} />, href: "https://twitter.com",   label: "Twitter / X" },
];

// Logo mark
function FooterLogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 36 36">
      <rect width="36" height="36" fill="rgba(255,255,255,0.05)" />
      <rect x="8" y="8" width="9" height="9" fill="#C4991A" />
      <rect x="19" y="8" width="9" height="9" fill="#C4991A" opacity="0.5" />
      <rect x="8" y="19" width="9" height="9" fill="#C4991A" opacity="0.5" />
      <rect x="19" y="19" width="9" height="9" fill="#C4991A" />
    </svg>
  );
}

export default function Footer({ scrollTo }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__grid">

          {/* Brand */}
          <div>
            <div className="footer__brand-logo">
              <FooterLogoMark />
              <div>
                <div className="footer__brand-name">FAVOURED K.</div>
                <div className="footer__brand-sub">Ndarugo Stones</div>
              </div>
            </div>
            <p className="footer__brand-desc">
              Kenya's most trusted supplier of premium machine-cut stones and
              construction aggregates. Quality you can build on.
            </p>
            <div className="footer__tagline">"We Build Kenya"</div>

            {/* Social icons */}
            <div className="footer__socials">
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="footer__social-icon"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="footer__col-title">Services</div>
            {SERVICES_LIST.map((s) => (
              <button
                key={s}
                className="footer__link"
                onClick={() => scrollTo("services")}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Company */}
          <div>
            <div className="footer__col-title">Company</div>
            {COMPANY_LINKS.map(({ id, label }) => (
              <button
                key={id}
                className="footer__link"
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div className="footer__col-title">Contact</div>
            {CONTACT_ITEMS.map(({ icon, val }) => (
              <div key={val} className="footer__contact-item">
                <span className="footer__contact-icon">{icon}</span>
                <span className="footer__contact-val">{val}</span>
              </div>
            ))}
            <div className="footer__hours">
              <div className="footer__hours-label">Hours</div>
              <div className="footer__hours-main">Mon–Sat: 6am – 8pm</div>
              <div className="footer__hours-note">Sunday: On-call only</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Favoured K. Ndarugo Stones. All rights reserved.
          </span>
          <span className="footer__location">
            Nairobi, Kenya · Countrywide Delivery
          </span>
        </div>
      </div>
    </footer>
  );
}
