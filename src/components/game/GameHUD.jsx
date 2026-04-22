import { useRef, useEffect, useState } from "react";

function usePulse(value) {
  const [pulse, setPulse] = useState(false);
  const prev = useRef(value);
  useEffect(() => {
    if (prev.current !== value) {
      setPulse(true);
      setTimeout(() => setPulse(false), 280);
      prev.current = value;
    }
  }, [value]);
  return pulse;
}

export default function GameHUD({ lives, gold, wave, score }) {
  const goldPulse = usePulse(gold);
  const livesPulse = usePulse(lives);
  const scorePulse = usePulse(score);

  return (
    <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-end">
      {/* Hearts */}
      <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-black text-xs sm:text-sm"
        style={{
          background: "linear-gradient(180deg, #ff4d6d 0%, #c9184a 100%)",
          border: "2px solid #ff758f",
          boxShadow: "0 3px 0 #7b0028, 0 0 20px rgba(255,77,109,0.6), 0 0 40px rgba(255,77,109,0.3)",
          color: "#fff",
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          transition: "transform 0.15s cubic-bezier(0.34,1.6,0.64,1)",
          transform: livesPulse ? "scale(1.2)" : "scale(1)",
        }}>
        ❤️ <span>{lives}</span>
      </div>

      {/* Gold */}
      <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-black text-xs sm:text-sm"
        style={{
          background: "linear-gradient(180deg, #ffd60a 0%, #e09c00 100%)",
          border: "2px solid #ffe566",
          boxShadow: "0 3px 0 #7a5200, 0 0 25px rgba(255,214,10,0.7), 0 0 50px rgba(255,214,10,0.35)",
          color: "#3a2000",
          textShadow: "0 2px 4px rgba(0,0,0,0.4)",
          transition: "transform 0.15s cubic-bezier(0.34,1.6,0.64,1)",
          transform: goldPulse ? "scale(1.2)" : "scale(1)",
        }}>
        💰 <span>{gold}</span>
      </div>

      {/* Wave */}
      <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-black text-xs sm:text-sm"
        style={{
          background: "linear-gradient(180deg, #4ea8de 0%, #1d6fa4 100%)",
          border: "2px solid #74c0fc",
          boxShadow: "0 3px 0 #0d3d5e, 0 0 18px rgba(78,168,222,0.5), 0 0 36px rgba(78,168,222,0.25)",
          color: "#fff",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}>
        ⚔️ <span>Wave {wave}</span>
      </div>

      {/* Score — hidden on very small screens */}
      <div className="hidden sm:flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full font-black text-xs sm:text-sm"
        style={{
          background: "linear-gradient(180deg, #c77dff 0%, #7b2fbe 100%)",
          border: "2px solid #da9fff",
          boxShadow: "0 3px 0 #40076e, 0 0 20px rgba(199,125,255,0.6), 0 0 40px rgba(199,125,255,0.3)",
          color: "#fff",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
          transition: "transform 0.15s cubic-bezier(0.34,1.6,0.64,1)",
          transform: scorePulse ? "scale(1.2)" : "scale(1)",
        }}>
        🏆 <span>{score}</span>
      </div>
    </div>
  );
}