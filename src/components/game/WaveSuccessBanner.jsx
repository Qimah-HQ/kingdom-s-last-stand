import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";

const MESSAGES = [
  "Victory! The siege is repelled!",
  "Kingdom stands strong!",
  "Enemies routed! Glorious!",
  "The realm endures!",
  "Wave crushed! Well fought!",
  "They flee before your might!",
  "Another wave, another triumph!",
  "Your towers hold firm!",
];

export default function WaveSuccessBanner({ wave, show }) {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (show) {
      setMsg(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div
        className="flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border border-yellow-600/60 text-center"
        style={{
          background: "rgba(10,6,0,0.92)",
          boxShadow: "0 0 60px rgba(234,179,8,0.25), 0 0 120px rgba(234,179,8,0.1)",
          animation: "waveSuccessPop 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-yellow-400 font-black text-lg uppercase tracking-[0.2em]"
            style={{ fontFamily: "'Cinzel Decorative', serif", textShadow: "0 0 20px rgba(234,179,8,0.5)" }}>
            Wave {wave - 1} Complete
          </span>
          <Trophy className="w-5 h-5 text-yellow-500" />
        </div>
        <p className="text-yellow-200/70 text-xs uppercase tracking-widest">{msg}</p>
      </div>
      <style>{`
        @keyframes waveSuccessPop {
          from { opacity: 0; transform: scale(0.7); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}