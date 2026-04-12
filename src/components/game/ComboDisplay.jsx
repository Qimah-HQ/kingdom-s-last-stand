import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

export default function ComboDisplay({ combo, multiplier }) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (combo >= 2) {
      setVisible(true);
      setAnimate(true);
      const t = setTimeout(() => setAnimate(false), 300);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [combo]);

  if (!visible) return null;

  const color =
    multiplier >= 5 ? "text-red-400 border-red-600/70 bg-red-950/80 shadow-red-900/60" :
    multiplier >= 3 ? "text-orange-400 border-orange-700/60 bg-orange-950/70 shadow-orange-900/40" :
    "text-yellow-400 border-yellow-800/50 bg-yellow-950/60 shadow-yellow-900/30";

  return (
    <div
      className={`fixed top-20 right-6 z-40 flex items-center gap-2 px-4 py-2 rounded-lg border font-bold tracking-widest uppercase text-sm transition-all duration-150 ${color} ${animate ? "scale-110" : "scale-100"}`}
      style={{ boxShadow: `0 0 24px var(--tw-shadow-color), inset 0 1px 0 rgba(255,255,255,0.04)` }}
    >
      <Zap className="w-4 h-4" fill="currentColor" />
      <span>{combo}x Combo</span>
      {multiplier > 1 && (
        <span className="opacity-70 text-xs font-normal">×{multiplier} gold</span>
      )}
    </div>
  );
}