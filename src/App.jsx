import { useEffect, useState } from "react";

const GRID_SIZE = 20;

export default function App() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      color: "#f0ede8",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Grid background */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(240,237,232,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(240,237,232,0.04) 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE * 3}px ${GRID_SIZE * 3}px`,
        pointerEvents: "none",
      }} />

      {/* Vignette */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 40%, #0a0a0a 100%)",
        pointerEvents: "none",
      }} />

      {/* Horizontal rule top */}
      <div style={{
        position: "absolute",
        top: 48,
        left: "10%",
        right: "10%",
        height: "1px",
        backgroundColor: "rgba(240,237,232,0.12)",
      }} />

      {/* Horizontal rule bottom */}
      <div style={{
        position: "absolute",
        bottom: 48,
        left: "10%",
        right: "10%",
        height: "1px",
        backgroundColor: "rgba(240,237,232,0.12)",
      }} />

      {/* Top label */}
      <div style={{
        position: "absolute",
        top: 28,
        left: "10%",
        fontSize: "10px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(240,237,232,0.3)",
        fontFamily: "'Courier New', monospace",
      }}>
        Service Suspended
      </div>

      {/* Top right label */}
      <div style={{
        position: "absolute",
        top: 28,
        right: "10%",
        fontSize: "10px",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "rgba(240,237,232,0.3)",
        fontFamily: "'Courier New', monospace",
      }}>
        Ref: INV-2026
      </div>

      {/* Main content */}
      <div style={{
        position: "relative",
        textAlign: "center",
        maxWidth: "600px",
        padding: "0 40px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        {/* Status pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid rgba(220, 80, 60, 0.4)",
          borderRadius: "2px",
          padding: "6px 16px",
          marginBottom: "48px",
          fontSize: "11px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#dc503c",
          fontFamily: "'Courier New', monospace",
        }}>
          <span style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#dc503c",
            animation: "pulse 2s ease-in-out infinite",
          }} />
          Payment Outstanding
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: "400",
          lineHeight: "1.05",
          letterSpacing: "-0.02em",
          margin: "0 0 32px",
          color: "#f0ede8",
        }}>
          This site is<br />
          <em style={{ fontStyle: "italic", color: "rgba(240,237,232,0.5)" }}>temporarily</em> offline.
        </h1>

        {/* Divider */}
        <div style={{
          width: "40px",
          height: "1px",
          backgroundColor: "rgba(240,237,232,0.2)",
          margin: "0 auto 32px",
        }} />

        {/* Body */}
        <p style={{
          fontSize: "15px",
          lineHeight: "1.8",
          color: "rgba(240,237,232,0.5)",
          margin: "0 0 12px",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.02em",
        }}>
          This website has been suspended pending resolution
          of an outstanding invoice with the site owner.
        </p>

        <p style={{
          fontSize: "15px",
          lineHeight: "1.8",
          color: "rgba(240,237,232,0.5)",
          margin: "0",
          fontFamily: "'Courier New', monospace",
          letterSpacing: "0.02em",
        }}>
          Service will be restored upon receipt of payment.
        </p>

        {/* Contact */}
        <div style={{
          marginTop: "56px",
          paddingTop: "32px",
          borderTop: "1px solid rgba(240,237,232,0.08)",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(240,237,232,0.25)",
          fontFamily: "'Courier New', monospace",
        }}>
          If you are the site owner — contact your service provider
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}