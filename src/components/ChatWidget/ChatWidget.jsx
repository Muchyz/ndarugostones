import { useState, useEffect, useRef } from "react";

const GOLD  = "#C4991A";
const INK   = "#0F0F0E";
const WARM  = "#F5F2EC";
const SAND  = "#EDE8DE";
const GREEN = "#22C55E";

function buildProductMsg(product) {
  if (!product) return "Product info unavailable. Please call us for pricing.";
  let msg = `**${product.title}**\n`;
  if (product.description) msg += `\n${product.description}\n`;
  const prices = product.city_prices;
  if (prices && Object.keys(prices).length > 0) {
    msg += `\n📍 *Prices by county:*\n`;
    for (const [city, variants] of Object.entries(prices)) {
      const variantStr = Object.entries(variants).map(([size, price]) => `${size}: ${price}`).join(" · ");
      msg += `\n• **${city}** — ${variantStr}`;
    }
    msg += `\n\n💬 Other counties? Call or WhatsApp us for a custom quote.`;
  } else {
    msg += `\nCall us for pricing — we give custom quotes based on your county and quantity.`;
  }
  return msg;
}

const STATIC_MENU = {
  delivery: {
    msg: `**Delivery & Counties** 🚚\n\n✅ We deliver to **all 47 counties** nationwide.\n\n⏱ **Same-day delivery** if you order by **10:00 AM**.\n\n🌍 **Long-distance** orders (outside Kiambu/Nairobi) — next morning delivery.\n\n💰 **Minimum order:** 1 truck load.\n\n💳 **Payment:** M-Pesa, bank transfer, or cash on delivery. 50% deposit for long-distance.`,
    options: [
      { label: "📋 Request a Delivery Quote", next: "quote_prompt" },
      { label: "🏠 Main Menu", next: "root" },
    ],
  },
  order: {
    msg: `**How to Order** 📋\n\nOrdering is simple:\n\n**1.** Tell us what you need (material + quantity)\n**2.** Tell us your delivery county\n**3.** We give you a price + delivery time\n**4.** Pay deposit (M-Pesa / bank)\n**5.** We dispatch same day or next morning\n\nYou can order via:`,
    options: [
      { label: "💬 WhatsApp Order",  next: "wa_order" },
      { label: "📝 Fill Quote Form", next: "quote_prompt" },
      { label: "📞 Call Us",         next: "human" },
      { label: "🏠 Main Menu",       next: "root" },
    ],
  },
  hours: {
    msg: `**Business Hours & Location** 🕐\n\n📅 **Mon – Sat:** 6:00 AM – 8:00 PM\n📅 **Sunday:** Emergency WhatsApp orders only\n\n📍 **Location:** Juja, Kiambu County, Kenya\n\n🌍 Serving all 47 counties nationwide.`,
    options: [
      { label: "📍 Get Directions", next: "directions" },
      { label: "📞 Call Us",        next: "human" },
      { label: "🏠 Main Menu",      next: "root" },
    ],
  },
  directions: {
    msg: `📍 **Find Us**\n\nWe're based in **Juja, Kiambu County**.\n\nClick below to open in Google Maps:`,
    options: [
      { label: "🗺️ Open Google Maps", next: "maps_link", external: "https://www.google.com/maps/search/Juja+Ndarugo+Stones+Kiambu+Kenya" },
      { label: "🏠 Main Menu", next: "root" },
    ],
  },
  human: {
    msg: `**Talk to Us Directly** 📞\n\nOur team is available:\n📅 Mon–Sat: 6AM – 8PM\n\nChoose how you'd like to reach us:`,
    options: [
      { label: "📞 Call 0729 709 938", next: "call", external: "tel:0729709938" },
      { label: "💬 WhatsApp Us", next: "wa", external: `https://wa.me/254729709938?text=${encodeURIComponent("Hi! I need help with an order.")}` },
      { label: "🏠 Main Menu", next: "root" },
    ],
  },
  wa_order: {
    msg: `Great! You'll be taken to WhatsApp. A message template will be pre-filled — just add your details and send. 👇`,
    options: [
      { label: "💬 Open WhatsApp", next: "wa_go", external: `https://wa.me/254729709938?text=${encodeURIComponent("Hi Favoured K. Suppliers! 👋\n\nI'd like to place an order:\n\n📦 Material: \n📍 County: \n🔢 Quantity: \n📱 My name: ")}` },
      { label: "🏠 Main Menu", next: "root" },
    ],
  },
  quote_prompt: {
    msg: `**Request a Quote** 📝\n\nYou can get a quote two ways:\n\n**1. Fill our quote form** on the website (we respond within 2 hours)\n**2. WhatsApp us directly** for instant reply`,
    options: [
      { label: "📝 Go to Quote Form", next: "form_link", scroll: "contact" },
      { label: "💬 WhatsApp Quote",   next: "wa_order" },
      { label: "🏠 Main Menu",        next: "root" },
    ],
  },
};

const SECTION_EMOJI = {
  "Stones": "🪨", "Sand": "🏖️", "Building Materials": "🧱",
  "Excavation Services": "🚜", "Other Services": "🔧",
};

function MdText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : p.split("\n").map((line, j, arr) => (
              <span key={`${i}-${j}`}>{line}{j < arr.length - 1 && <br />}</span>
            ))
      )}
    </span>
  );
}

function Bubble({ msg, isBot }) {
  return (
    <div style={{ display: "flex", justifyContent: isBot ? "flex-start" : "flex-end", marginBottom: 8 }}>
      {isBot && <div style={{ width: 28, height: 28, borderRadius: "50%", background: GOLD, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginRight: 7, alignSelf: "flex-end" }}>🪨</div>}
      <div style={{ maxWidth: "82%", background: isBot ? WARM : GOLD, color: INK, padding: "10px 13px", borderRadius: isBot ? "2px 14px 14px 14px" : "14px 2px 14px 14px", fontSize: 13, lineHeight: 1.65, boxShadow: "0 1px 4px rgba(0,0,0,0.08)", border: isBot ? `1px solid ${SAND}` : "none" }}>
        <MdText text={msg} />
      </div>
    </div>
  );
}

function Options({ options, onSelect }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4, marginLeft: 35 }}>
      {options.map((opt) => {
        const isNav = opt.label.startsWith("← ") || opt.label === "🏠 Main Menu";
        return (
          <button key={opt.label} onClick={() => onSelect(opt)}
            style={{ background: isNav ? "transparent" : "#fff", border: `1px solid ${isNav ? "rgba(0,0,0,0.12)" : GOLD}`, color: isNav ? "#888" : INK, padding: "8px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", textAlign: "left", transition: "all 0.15s", fontFamily: "inherit" }}
            onMouseOver={e => { if (!isNav) { e.currentTarget.style.background = GOLD; } }}
            onMouseOut={e => { if (!isNav) { e.currentTarget.style.background = "#fff"; } }}
          >{opt.label}</button>
        );
      })}
    </div>
  );
}

function Typing() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🪨</div>
      <div style={{ background: WARM, border: `1px solid ${SAND}`, borderRadius: "2px 14px 14px 14px", padding: "10px 14px", display: "flex", gap: 4, alignItems: "center" }}>
        {[0, 0.2, 0.4].map((d, i) => (
          <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, animation: `chatBounce 1.1s ${d}s ease-in-out infinite` }} />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget({ scrollTo }) {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState([]);
  const [typing, setTyping]     = useState(false);
  const [hasNew, setHasNew]     = useState(false);
  const [started, setStarted]   = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingP, setLoadingP] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  useEffect(() => {
    const t = setTimeout(() => setHasNew(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Fetch live products from API
  useEffect(() => {
    setLoadingP(true);
    fetch("/api/products")
      .then(r => r.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(() => setProducts([]))
      .finally(() => setLoadingP(false));
  }, []);

  function buildMenu() {
    const sections = {};
    products.forEach(p => {
      const sec = p.section || "Other";
      if (!sections[sec]) sections[sec] = [];
      sections[sec].push(p);
    });

    const productOptions = Object.keys(sections).map(sec => ({
      label: `${SECTION_EMOJI[sec] || "📦"} ${sec}`,
      next: `section_${sec}`,
    }));
    productOptions.push({ label: "← Back", next: "root" });

    const menu = {
      root: {
        msg: "👋 Hello! Welcome to **Favoured K. Suppliers**.\n\nI'm here to help. What would you like to know?",
        options: [
          { label: "🪨 Products & Prices",   next: "products" },
          { label: "🚚 Delivery & Counties", next: "delivery" },
          { label: "📋 How to Order",        next: "order" },
          { label: "🕐 Hours & Location",    next: "hours" },
          { label: "📞 Talk to a Person",    next: "human" },
        ],
      },
      products: {
        msg: products.length > 0
          ? "We supply the following materials. Which section would you like pricing for?"
          : "We supply Ndarugo Stones, Ballast, River Sand, Quarry Dust and more.\n\nCall or WhatsApp us for current pricing:",
        options: products.length > 0 ? productOptions : [
          { label: "📞 Call Us",        next: "human" },
          { label: "💬 WhatsApp Quote", next: "wa_order" },
          { label: "🏠 Main Menu",      next: "root" },
        ],
      },
      ...STATIC_MENU,
    };

    Object.entries(sections).forEach(([sec, prods]) => {
      const prodOptions = prods.map(p => ({
        label: `${SECTION_EMOJI[sec] || "📦"} ${p.title}`,
        next: `product_${p.id}`,
      }));
      prodOptions.push({ label: "← Back to Products", next: "products" });
      prodOptions.push({ label: "🏠 Main Menu", next: "root" });

      menu[`section_${sec}`] = {
        msg: `**${sec}**\n\nChoose a product to see live pricing:`,
        options: prodOptions,
      };

      prods.forEach(p => {
        menu[`product_${p.id}`] = {
          msg: buildProductMsg(p),
          options: [
            { label: "📋 Request a Quote",   next: "quote_prompt" },
            { label: `← Back to ${sec}`,     next: `section_${sec}` },
            { label: "🏠 Main Menu",          next: "root" },
          ],
        };
      });
    });

    return menu;
  }

  function openChat() {
    setOpen(true);
    setHasNew(false);
    if (!started) {
      setStarted(true);
      showNode("root", null, buildMenu());
    }
  }

  function showNode(key, userLabel = null, menuOverride = null) {
    const menu = menuOverride || buildMenu();
    const n = menu[key];
    if (!n) return;
    if (userLabel) setMsgs(m => [...m, { id: Date.now(), text: userLabel, isBot: false }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, { id: Date.now() + 1, text: n.msg, isBot: true, options: n.options }]);
    }, 700);
  }

  function handleOption(opt) {
    const menu = buildMenu();
    setMsgs(m => m.map((msg, i) => i === m.length - 1 ? { ...msg, options: null } : msg));

    if (opt.external) {
      setMsgs(m => [...m, { id: Date.now(), text: opt.label, isBot: false }]);
      window.open(opt.external, "_blank");
      setTimeout(() => {
        setMsgs(m => [...m, { id: Date.now() + 1, text: "Opening for you... 👆\n\nIs there anything else I can help with?", isBot: true, options: menu["root"].options }]);
      }, 800);
      return;
    }

    if (opt.scroll && scrollTo) scrollTo(opt.scroll);
    showNode(opt.next, opt.label);
  }

  return (
    <>
      <style>{`
        @keyframes chatBounce { 0%,100%{transform:translateY(0);opacity:.4} 50%{transform:translateY(-4px);opacity:1} }
        @keyframes chatPop { from{transform:scale(.85) translateY(12px);opacity:0} to{transform:scale(1) translateY(0);opacity:1} }
        @keyframes chatPing { 0%,100%{box-shadow:0 0 0 0 rgba(196,153,26,.5)} 60%{box-shadow:0 0 0 14px rgba(196,153,26,0)} }
      `}</style>

      {/* Floating button */}
      <div style={{ position: "fixed", bottom: 80, right: 24, zIndex: 9999 }}>
        {!open && (
          <div style={{ position: "absolute", bottom: "110%", right: 0, background: INK, color: "#fff", padding: "8px 12px", borderRadius: 8, fontSize: 12, whiteSpace: "nowrap", marginBottom: 4, opacity: hasNew ? 1 : 0, transform: hasNew ? "translateY(0)" : "translateY(4px)", transition: "all 0.3s", pointerEvents: "none" }}>
            💬 Got questions? Ask me!
            <div style={{ position: "absolute", bottom: -5, right: 14, width: 10, height: 10, background: INK, transform: "rotate(45deg)" }} />
          </div>
        )}
        <button onClick={open ? () => setOpen(false) : openChat}
          style={{ width: 52, height: 52, borderRadius: "50%", background: GOLD, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 22, boxShadow: "0 4px 20px rgba(196,153,26,0.4)", animation: hasNew && !open ? "chatPing 2.5s ease infinite" : "none", transition: "transform 0.2s" }}
          onMouseOver={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
        >{open ? "✕" : "💬"}</button>
        {hasNew && !open && <div style={{ position: "absolute", top: 2, right: 2, width: 10, height: 10, borderRadius: "50%", background: "#EF4444", border: "2px solid #fff" }} />}
      </div>

      {/* Chat window */}
      {open && (
        <div style={{ position: "fixed", bottom: 144, right: 24, zIndex: 9998, width: 320, maxHeight: 520, background: "#fff", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.18)", display: "flex", flexDirection: "column", animation: "chatPop 0.25s cubic-bezier(.16,1,.3,1) both", fontFamily: "'DM Sans','Segoe UI',sans-serif", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ background: INK, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🪨</div>
            <div>
              <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Favoured K. Suppliers</div>
              <div style={{ color: GOLD, fontSize: 10, letterSpacing: "1.5px" }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: GREEN, marginRight: 4 }} />
                {loadingP ? "Loading live prices..." : "ONLINE · Prices updated live"}
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>✕</button>
          </div>

          {/* Messages */}
          <div ref={bodyRef} style={{ flex: 1, overflowY: "auto", padding: "14px 12px", background: "#FAFAF8", display: "flex", flexDirection: "column" }}>
            {msgs.map((m) => (
              <div key={m.id}>
                <Bubble msg={m.text} isBot={m.isBot} />
                {m.isBot && m.options && <Options options={m.options} onSelect={handleOption} />}
              </div>
            ))}
            {typing && <Typing />}
          </div>

          {/* Footer */}
          <div style={{ padding: "8px 12px", borderTop: `1px solid ${SAND}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#aaa" }}>Favoured K. Suppliers</span>
            <a href="https://wa.me/254729709938" target="_blank" rel="noreferrer" style={{ background: GREEN, color: "#fff", padding: "5px 10px", borderRadius: 6, fontSize: 10, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              💬 WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
