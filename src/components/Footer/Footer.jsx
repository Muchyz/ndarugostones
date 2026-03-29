import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
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
  { icon: <FaPhone size={13} />,        val: "+254729709938" },
  { icon: <FaEnvelope size={13} />,     val: "Favouredksuppliers@gmail.com" },
  { icon: <FaMapMarkerAlt size={13} />, val: "Juja, Kiambu" },
  { icon: <FaTruck size={13} />,        val: "All 47 Counties" },
];

const SOCIALS = [
  { icon: <FaFacebookF size={14} />, href: "https://www.facebook.com/Njoho001",                                 label: "Facebook",    active: true },
  { icon: <FaInstagram size={14} />, href: "https://www.instagram.com/peterndarugomawe?igsh=NjZ0YnN6b2NocTc=", label: "Instagram",   active: true },
  { icon: <FaWhatsapp  size={14} />, href: "https://wa.me/254729709938",                                        label: "WhatsApp",    active: true },
  { icon: <FaTiktok    size={14} />, href: "https://www.tiktok.com/@buildersforum1?_r=1&_t=ZS-94Lg9bMZkQS",   label: "TikTok",      active: true },
  { icon: <FaTwitter   size={14} />, href: null,                                                                 label: "Twitter / X", active: false },
];

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
              {SOCIALS.map(({ icon, href, label,