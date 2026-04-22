import { useEffect, useRef, useState } from "react";

// Merge fusion overlay: shows particle burst + upgrade pop at given canvas position
export default function MergeFusionEffect({ event, canvasRef }) {
  const [particles, setParticles] = useState([]);
  const [badge, setBadge] = useState(null);
  const animRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!event) return;
    const { x, y, emoji, name, color } = event;

    // Build particle burst
    const count = 24;
    const cols = [color ?? "#a78bfa", "#ffd60a", "#ffffff", "#c084fc", "#fb923c"];
    const ps = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 2.5 + Math.random() * 3.5;
      return {
        id: i,
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        life: 1,
        color: cols[i % cols.length],
        size: 3 + Math.random() * 4,
        trail: [],
      };
    });

    setParticles(ps);
    setBadge({ x, y, emoji, name, phase: "in" });
    startRef.current = performance.now();

    const DURATION = 1600; // ms total

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const dt = 1 / 60;

      setParticles(prev =>
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.93,
            vy: p.vy * 0.93 + 0.15,
            life: p.life - dt / 0.9,
          }))
          .filter(p => p.life > 0)
      );

      // Badge phases: in (0–400ms) → hold (400–1200ms) → out (1200–1600ms)
      const t = elapsed;
      if (t < DURATION) {
        const phase = t < 400 ? "in" : t < 1200 ? "hold" : "out";
        setBadge(b => b ? { ...b, phase, elapsed: t } : null);
        animRef.current = requestAnimationFrame(tick);
      } else {
        setParticles([]);
        setBadge(null);
      }
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [event]);

  if (!event || (particles.length === 0 && !badge)) return null;

  // We render on top of the canvas using absolute positioned SVG/divs
  // Position is in canvas coordinate space — we need to scale to rendered size
  const canvas = canvasRef?.current;
  const rect = canvas?.getBoundingClientRect();
  const canvasW = canvas?.width ?? 1;
  const canvasH = canvas?.height ?? 1;
  const scaleX = rect ? rect.width / canvasW : 1;
  const scaleY = rect ? rect.height / canvasH : 1;

  // Convert canvas coords → overlay coords (relative to parent .relative container)
  const toScreen = (cx, cy) => ({
    left: cx * scaleX,
    top: cy * scaleY,
  });

  // Badge scale based on phase
  const badgeScale = badge
    ? badge.phase === "in"
      ? Math.min(1.2, (badge.elapsed ?? 0) / 300 * 1.2)
      : badge.phase === "hold"
      ? 1 + Math.sin(((badge.elapsed ?? 0) * 0.012)) * 0.06
      : Math.max(0, 1 - ((badge.elapsed ?? 1200) - 1200) / 400)
    : 0;

  const badgePos = badge ? toScreen(badge.x, badge.y) : null;

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 30 }}
    >
      {/* Particles */}
      {particles.map(p => {
        const pos = toScreen(p.x, p.y);
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: pos.left,
              top: pos.top,
              width: p.size * 2 * scaleX,
              height: p.size * 2 * scaleX,
              borderRadius: "50%",
              background: p.color,
              opacity: Math.max(0, p.life),
              transform: "translate(-50%, -50%)",
              boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Upgrade badge */}
      {badge && badgePos && (
        <div
          style={{
            position: "absolute",
            left: badgePos.left,
            top: badgePos.top,
            transform: `translate(-50%, -120%) scale(${badgeScale})`,
            transformOrigin: "center bottom",
            opacity: badgeScale > 0 ? 1 : 0,
            transition: "none",
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          {/* Glow ring */}
          <div style={{
            position: "absolute",
            inset: -8,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(167,139,250,0.5) 0%, transparent 70%)",
            animation: badge.phase === "hold" ? "fusionPulse 0.6s ease-in-out infinite alternate" : "none",
          }} />

          {/* Emoji burst */}
          <div style={{
            fontSize: 36,
            lineHeight: 1,
            filter: "drop-shadow(0 0 12px #a78bfa) drop-shadow(0 0 24px #ffd60a)",
            marginBottom: 4,
          }}>
            {badge.emoji}
          </div>

          {/* Name chip */}
          <div style={{
            background: "linear-gradient(160deg, #1a0f35, #0e0820)",
            border: "2px solid #a78bfa",
            borderRadius: 999,
            padding: "3px 10px",
            fontSize: 10,
            fontWeight: 900,
            fontFamily: "'Cinzel', serif",
            color: "#e9d5ff",
            letterSpacing: "0.12em",
            whiteSpace: "nowrap",
            boxShadow: "0 0 16px rgba(167,139,250,0.6), 0 3px 0 #1e0a4a",
            textShadow: "0 0 8px rgba(167,139,250,0.8)",
          }}>
            ✨ {badge.name} Forged!
          </div>
        </div>
      )}

      <style>{`
        @keyframes fusionPulse {
          from { transform: scale(0.92); opacity: 0.6; }
          to   { transform: scale(1.08); opacity: 1; }
        }
      `}</style>
    </div>
  );
}