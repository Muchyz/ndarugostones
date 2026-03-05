import { useState, useEffect } from "react";
import "./Services.css";
import { useInView } from "../../hooks/useInView";

const PHONE = "+254712345678";
const SECTION_ORDER = ["Stones","Sand","Building Materials","Excavation Services","Other Services"];

const SECTION_META = {
  "Stones":               { eye:"Natural Stones",         heading:"Our",        em:"Stones"      },
  "Sand":                 { eye:"Natural Sand",            heading:"Our",        em:"Sand"        },
  "Building Materials":   { eye:"Construction Materials",  heading:"Building",   em:"Materials"   },
  "Excavation Services":  { eye:"Site Preparation",        heading:"Excavation", em:"Services"    },
  "Other Services":       { eye:"Additional Offerings",    heading:"Other",      em:"Services"    },
};

const WaIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
const PhoneIcon = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const PinIcon = () => <svg width="9" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;

function CityPrices({ cityPrices={}, variant }) {
  const cities = Object.entries(cityPrices);
  if (!cities.length) return null;
  return (
    <div className={`city-prices-v2${variant?` city-prices-v2--${variant}`:""}`}>
      {cities.map(([city,sizes])=>{
        const entries = typeof sizes==="object"&&!Array.isArray(sizes) ? Object.entries(sizes) : [["",sizes]];
        return (
          <div className="city-prices-v2__city" key={city}>
            <span className="city-prices-v2__city-name">{city}</span>
            <div className="city-prices-v2__sizes">
              {entries.map(([size,price])=>(
                <div className="city-prices-v2__size-row" key={size}>
                  {size&&<span className="city-prices-v2__size">{size}</span>}
                  <span className="city-prices-v2__price">{price||"—"}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ActionBtns({ waMsg, phone, variant }) {
  const num=(phone||PHONE).replace(/\D/g,"");
  return (
    <div className={`svc-actions${variant?` svc-actions--${variant}`:""}`}>
      <a href={`https://wa.me/${num}?text=${encodeURIComponent(waMsg||"")}`} target="_blank" rel="noreferrer" className="svc-btn svc-btn--wa"><WaIcon/> WhatsApp</a>
      <a href={`tel:${phone||PHONE}`} className="svc-btn svc-btn--call"><PhoneIcon/> Call Now</a>
    </div>
  );
}

function SectionBlock({ sectionName, products, globalHov, setHov }) {
  const [ref, visible] = useInView();
  const meta = SECTION_META[sectionName] || { eye: sectionName, heading: sectionName, em:"" };
  const featured = products[0];
  const rest = products.slice(1);

  const anim = (delay=0) => ({
    opacity: visible?1:0,
    transform: visible?"translateY(0)":"translateY(28px)",
    transition: `opacity 0.75s ${delay}s, transform 0.75s ${delay}s`,
  });

  return (
    <div ref={ref} className="section-block">
      {/* Section header */}
      <div className="services__hdr" style={anim(0)}>
        <div>
          <span className="eye" style={{color:"rgba(196,153,26,0.85)"}}>{meta.eye}</span>
          <div className="bar"/>
          <h2 className="services__heading">{meta.heading} <em>{meta.em}</em></h2>
        </div>
      </div>

      {/* Featured card */}
      <div className={`feat${globalHov===featured.id?" feat--hov":""}`} style={anim(0.1)} onMouseEnter={()=>setHov(featured.id)} onMouseLeave={()=>setHov(null)}>
        <div className="feat__img-wrap">
          <img src={featured.img} alt={featured.title} className="feat__img"/>
          <div className="feat__img-shade"/>
          {featured.badge&&<span className="feat__badge">{featured.badge}</span>}
        </div>
        <div className="feat__body">
          <span className="feat__cat">{featured.cat} · Featured</span>
          <h3 className="feat__title">{featured.title}</h3>
          <p className="feat__desc">{featured.desc}</p>
          {Object.keys(featured.cityPrices||{}).length>0&&<>
            <p className="prices-label"><PinIcon/> Price by Location</p>
            <CityPrices cityPrices={featured.cityPrices} variant="lg"/>
          </>}
          <ActionBtns waMsg={featured.wa} phone={featured.phone} variant="lg"/>
        </div>
      </div>

      {/* Grid */}
      {rest.length>0&&(
        <div className="svc-grid">
          {rest.map((s,i)=>(
            <div key={s.id} className={`svc-card${globalHov===s.id?" svc-card--hov":""}`} style={anim(0.16+i*0.07)} onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)}>
              <div className="svc-card__img-wrap">
                <img src={s.img} alt={s.title} className="svc-card__img"/>
                <div className="svc-card__overlay"/>
                {s.badge&&<span className="svc-card__badge">{s.badge}</span>}
                <div className="svc-card__caption">
                  <span className="svc-card__cat">{s.cat}</span>
                  <span className="svc-card__title">{s.title}</span>
                </div>
              </div>
              {Object.keys(s.cityPrices||{}).length>0&&(
                <div className="svc-card__prices-wrap">
                  <p className="prices-label prices-label--sm"><PinIcon/> Price by City</p>
                  <CityPrices cityPrices={s.cityPrices} variant="sm"/>
                </div>
              )}
              <ActionBtns waMsg={s.wa} phone={s.phone} variant="sm"/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Services({ scrollTo }) {
  const [hov, setHov]       = useState(null);
  const [products, setProds] = useState(null);

  useEffect(()=>{
    fetch("/api/products")
      .then(r=>r.ok?r.json():Promise.reject())
      .then(data=>setProds(data))
      .catch(()=>setProds([]));
  },[]);

  // Group by section
  const grouped = {};
  (products||[]).forEach(p=>{
    const s = p.section||"Building Materials";
    if(!grouped[s]) grouped[s]=[];
    grouped[s].push(p);
  });

  const activeSections = SECTION_ORDER.filter(s=>grouped[s]&&grouped[s].length>0);
  const isLoading = products===null;

  return (
    <section id="services" className="services">
      <div className="services__inner">
        {isLoading&&(
          <div className="services__loading">
            <div className="admin__spinner"/>
            <span>Loading products…</span>
          </div>
        )}
        {!isLoading&&activeSections.length===0&&(
          <div className="services__empty">No products added yet.</div>
        )}
        {!isLoading&&activeSections.map((sectionName,i)=>(
          <div key={sectionName}>
            <SectionBlock sectionName={sectionName} products={grouped[sectionName]} globalHov={hov} setHov={setHov}/>
            {i < activeSections.length-1 && <div className="section-divider"/>}
          </div>
        ))}
      </div>
    </section>
  );
}
