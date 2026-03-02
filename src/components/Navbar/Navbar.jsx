import { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaPhone } from "react-icons/fa";
import "./Navbar.css";
import { wa } from "../../data/constants";

const NAV_LINKS = [
  { id: "home",     label: "Home",     num: "01" },
  { id: "services", label: "Services", num: "02" },
  { id: "about",    label: "About",    num: "03" },
  { id: "process",  label: "Process",  num: "04" },
  { id: "gallery",  label: "Gallery",  num: "05" },
  { id: "contact",  label: "Contact",  num: "06" },
];

function LogoMark({ dark }) {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" fill={dark ? "#1A1A1A" : "#1A1A1A"} />
      <rect x="7" y="7" width="9" height="9" fill="#C4991A" />
      <rect x="18" y="7" width="9" height="9" fill="#C4991A" opacity="0.5" />
      <rect x="7" y="18" width="9" height="9" fill="#C4991A" opacity="0.5" />
      <rect x="18" y="18" width="9" height="9" fill="#C4991A" />
    </svg>
  );
}

export default function Navbar({ scrollTo }) {
  const [menuOpen, setMenu] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (id) => { scrollTo(id); setMenu(false); };

  return (
    <>
      {/* ══════════════════════════════
          NAVBAR — always sand coloured
      ══════════════════════════════ */}
      <nav className="navbar" style={{
        background: menuOpen ? "#111111" : "#F7F4EF",
        borderBottom: menuOpen
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid #DDD8D0",
        boxShadow: menuOpen ? "none" : "0 2px 20px rgba(26,26,26,0.08)",
      }}>
        <div className="navbar__inner">

          {/* Logo */}
          <button className="navbar__logo" onClick={() => go("home")}>
            <LogoMark />
            <div>
              <div className="navbar__logo-name"
                style={{ color: menuOpen ? "#ffffff" : "#1A1A1A" }}>
                FAVOURED K.
              </div>
              <div className="navbar__logo-sub"
                style={{ color: menuOpen ? "rgba(255,255,255,0.4)" : "#7A7570" }}>
                Ndarugo Stones
              </div>
            </div>
          </button>

          {/* Desktop nav links */}
          <div className="navbar__links">
            {NAV_LINKS.map(({ id, label }) => (
              <button key={id} className="navbar__link" onClick={() => go(id)}>
                {label}
              </button>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="navbar__actions">
            <a href="tel:+254713788322" className="navbar__phone">
              <span className="navbar__phone-icon">
                <FaPhone size={13} color="#C4991A" />
              </span>
              <span className="navbar__phone-text">
                <span className="navbar__phone-label">Call us</span>
                <span className="navbar__phone-number">+254 713 788 322</span>
              </span>
            </a>
            <button className="btn-gold navbar__cta" onClick={() => go("contact")}>
              Get a Quote
            </button>
          </div>

          {/* Hamburger / Close toggle — mobile only */}
          <button
            className="navbar__toggle"
            onClick={() => setMenu(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: menuOpen ? "#C4991A" : "#EDEBE1",
              border: menuOpen ? "1px solid #C4991A" : "1px solid #DDD8D0",
              color: menuOpen ? "#ffffff" : "#1A1A1A",
            }}
          >
            {menuOpen ? (
              <span className="navbar__x">✕</span>
            ) : (
              <span className="navbar__bars">
                <span /><span /><span />
              </span>
            )}
          </button>

        </div>
      </nav>

      {/* ══════════════════════════════
          MOBILE MENU
      ══════════════════════════════ */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}>

        {/* Nav links */}
        <div className="mobile-menu__items">
          {NAV_LINKS.map(({ id, label, num }) => (
            <button key={id} className="mobile-menu__item" onClick={() => go(id)}>
              <span className="mobile-menu__num">{num}</span>
              <span className="mobile-menu__label">{label}</span>
              <span className="mobile-menu__arrow">→</span>
            </button>
          ))}
        </div>

        {/* Bottom */}
        <div className="mobile-menu__footer">
          <button className="btn-gold mobile-menu__cta" onClick={() => go("contact")}>
            Request a Quote
          </button>
          <div className="mobile-menu__contacts">
            <a href="tel:+254713788322" className="mobile-menu__contact">
              <FaPhone size={12} /> +254 713 788 322
            </a>
            <span className="mobile-menu__dot">·</span>
            <a href={wa("Hi!")} target="_blank" rel="noreferrer" className="mobile-menu__contact">
              <FaWhatsapp size={12} /> WhatsApp
            </a>
          </div>
          <div className="mobile-menu__socials">
            {[
              { icon: <FaFacebookF size={14} />, href: "https://facebook.com",  label: "Facebook"  },
              { icon: <FaInstagram size={14} />, href: "https://instagram.com", label: "Instagram" },
              { icon: <FaWhatsapp  size={14} />, href: wa("Hi!"),               label: "WhatsApp"  },
            ].map(({ icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                aria-label={label} className="mobile-menu__social">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
