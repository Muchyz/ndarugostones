import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";
import Navbar       from "./components/Navbar/Navbar";
import Hero         from "./components/Hero/Hero";
import About        from "./components/About/About";
import Services     from "./components/Services/Services";
import Stats        from "./components/Stats/Stats";
import Process      from "./components/Process/Process";
import Testimonials from "./components/Testimonials/Testimonials";
import Gallery      from "./components/Gallery/Gallery";
import Cta          from "./components/Cta/Cta";
import Contact      from "./components/Contact/Contact";
import Footer       from "./components/Footer/Footer";
import Admin        from "./pages/Admin";
import { wa }       from "./data/constants";
import { FaWhatsapp } from "react-icons/fa";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Home() {
  return (
    <>
      <Navbar scrollTo={scrollTo} />
      <main>
        <Hero         scrollTo={scrollTo} />
        <About        scrollTo={scrollTo} />
        <Services     scrollTo={scrollTo} />
        <Stats />
        <Process />
        <Gallery />
         <Testimonials />
        <Cta          scrollTo={scrollTo} />
        <Contact />
      </main>
      <Footer scrollTo={scrollTo} />
      <a
        className="wa-fab"
        href={wa("Hi, I'd like a quote for building materials.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={26} color="#fff" />
      </a>
      <div className="mob-cta">
        <a href="tel:+254729709938" className="mob-call" aria-label="Call us">
          <span>📞</span> CALL
        </a>
        <a
          href={wa("Hi, I need a building materials quote.")}
          target="_blank"
          rel="noreferrer"
          className="mob-wa"
          aria-label="WhatsApp us"
        >
          <FaWhatsapp size={18} color="#fff" /> WHATSAPP
        </a>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Home />}  />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
