import { useEffect, useRef } from "react";

// Renders merge fusion particles + badge on a canvas overlay — no React setState in the RAF loop
export default function MergeFusionEffect({ event, canvasRef }) {
  const overlayRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!event) return;

    const canvas = canvasRef?.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const { x, y, emoji, name } = event;

    // Scale canvas coords → overlay (CSS) coords
    const rect = canvas.getBoundingClientRect();
    const scaleX = rect.width / canvas.width;
    const scaleY = rect.height / canvas.height;
    const sx = x * scaleX;
    const sy = y * scaleY;

    // Build particles
    const COUNT = 22;
    const COLORS = ["#a78bfa", "#ffd60a", "#ffffff", "#c084fc", "#fb923c", "#38bdf8"];
    const particles = Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4;
      const speed = 2 + Math.random() * 3;
      return {
        x: sx, y: sy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        life: 1,
        color: COLORS[i % COLORS.length],
        size: 3 + Math.random() * 4,
      };
    });

    const DURATION = 1500;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      if (elapsed > DURATION) {
        overlay.style.display = "none";
        return;
      }

      const ctx = overlay.getContext("2d");
      ctx.clearRect(0, 0, overlay.width, overlay.height);

      // Update + draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.93;
        p.vy = p.vy * 0.93 + 0.18;
        p.life -= 1 / 55;
        if (p.life <= 0) return;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life) * 0.9;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw badge — pop in, hold, fade out
      const t = elapsed;
      let scale, alpha;
      if (t < 300) {
        scale = t / 300 * 1.15;
        alpha = t / 300;
      } else if (t < 1100) {
        scale = 1 + Math.sin((t - 300) * 0.008) * 0.05;
        alpha = 1;
      } else {
        const out = (t - 1100) / 400;
        scale = 1 - out * 0.3;
        alpha = 1 - out;
      }

      if (alpha > 0) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.translate(sx, sy - 22 * scaleY);
        ctx.scale(scale, scale);

        // Glow halo
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, 28);
        grd.addColorStop(0, "rgba(167,139,250,0.55)");
        grd.addColorStop(1, "rgba(167,139,250,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(0, 0, 28, 0, Math.PI * 2);
        ctx.fill();

        // Emoji
        ctx.font = `${24 * scaleX}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.shadowColor = "#a78bfa";
        ctx.shadowBlur = 14;
        ctx.fillText(emoji, 0, -14 * scaleY);
        ctx.shadowBlur = 0;

        // Pill background
        const label = `✨ ${name}`;
        ctx.font = `bold ${9 * scaleX}px 'Cinzel', serif`;
        const tw = ctx.measureText(label).width;
        const ph = 14 * scaleY;
        const pw = tw + 16 * scaleX;
        const px = -pw / 2;
        const py = 2 * scaleY;

        ctx.fillStyle = "#0e0820";
        ctx.strokeStyle = "#a78bfa";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(px, py, pw, ph, ph / 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#e9d5ff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, 0, py + ph / 2);

        ctx.restore();
      }

      animRef.current = requestAnimationFrame(tick);
    };

    overlay.width = rect.width;
    overlay.height = rect.height;
    overlay.style.display = "block";
    animRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animRef.current);
      const ctx = overlayRef.current?.getContext("2d");
      ctx?.clearRect(0, 0, overlayRef.current.width, overlayRef.current.height);
      if (overlayRef.current) overlayRef.current.style.display = "none";
    };
  }, [event]);

  return (
    <canvas
      ref={overlayRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        display: "none",
        zIndex: 30,
      }}
    />
  );
}