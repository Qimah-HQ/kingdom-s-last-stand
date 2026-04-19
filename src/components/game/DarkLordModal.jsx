import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const DIALOGUE = [
  { speaker: "Dark Lord Malachar", text: "IMPOSSIBLE! My armies... defeated by a mere mortal?! This cannot be!!", mood: "villain", emoji: "😈" },
  { speaker: "Dark Lord Malachar", text: "You think this is over?! The darkness will return... and next time... there will be NO MERCY!", mood: "villain", emoji: "😈" },
  { speaker: "You", text: "It ends here, Malachar. Your reign of terror is over.", mood: "player", emoji: "🧙" },
  { speaker: "Dark Lord Malachar", text: "Curse you... CURSE YOU ALL... *fades into shadow*", mood: "dying", emoji: "💀" },
  { speaker: "King Aldric", text: "Champion! You have done the impossible! The Dark Lord Malachar is vanquished!", mood: "king", emoji: "👑" },
  { speaker: "King Aldric", text: "A thousand years of shadow have been lifted from our land this day. Songs shall be sung of your glory!", mood: "king", emoji: "👑" },
  { speaker: "King Aldric", text: "Kneel, brave hero. By the power vested in me as King of this realm... I name you GRAND PROTECTOR OF THE REALM!", mood: "reward", emoji: "👑" },
  { speaker: "You", text: "I am humbled, Your Majesty. I fight not for glory, but for the kingdom and its people.", mood: "player", emoji: "🧙" },
  { speaker: "King Aldric", text: "Then accept this Royal Treasury — and know the kingdom is forever in your debt. Long live the Grand Protector! 🎉👑", mood: "celebration", emoji: "👑" },
];

const VILLAIN_FRAMES = ["😈", "👿", "😈"];
const KING_FRAMES = ["👑", "🤴", "👑"];

export default function DarkLordModal({ show, onContinue }) {
  const [visible, setVisible] = useState(false);
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);
  const [frame, setFrame] = useState(0);
  const [particles, setParticles] = useState([]);
  const [phase, setPhase] = useState("battle"); // battle | king

  useEffect(() => {
    if (show) {
      setVisible(true);
      setDialogueIdx(0);
      setDisplayed("");
      setTyping(true);
      setParticles([]);
      setPhase("battle");
      setFrame(0);
    }
  }, [show]);

  // Typewriter
  useEffect(() => {
    if (!visible || !typing) return;
    const line = DIALOGUE[dialogueIdx]?.text || "";
    if (displayed.length < line.length) {
      const t = setTimeout(() => setDisplayed(line.slice(0, displayed.length + 1)), 24);
      return () => clearTimeout(t);
    } else {
      setTyping(false);
    }
  }, [visible, typing, displayed, dialogueIdx]);

  // Frame animation
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setFrame(f => (f + 1) % 3), 800);
    return () => clearInterval(t);
  }, [visible]);

  // Particles for celebration phase
  useEffect(() => {
    const mood = DIALOGUE[dialogueIdx]?.mood;
    if (!visible || (mood !== "celebration" && mood !== "reward")) return;
    const t = setInterval(() => {
      setParticles(p => [
        ...p.slice(-12),
        {
          id: Math.random(),
          x: Math.random() * 100,
          emoji: ["✨", "🌟", "💫", "🎉", "🎊", "⭐"][Math.floor(Math.random() * 6)],
          delay: Math.random() * 0.3,
        }
      ]);
    }, 300);
    return () => clearInterval(t);
  }, [dialogueIdx, visible]);

  // Dark particles for villain phase
  useEffect(() => {
    const mood = DIALOGUE[dialogueIdx]?.mood;
    if (!visible || (mood !== "villain" && mood !== "dying")) return;
    const t = setInterval(() => {
      setParticles(p => [
        ...p.slice(-10),
        {
          id: Math.random(),
          x: Math.random() * 100,
          emoji: ["💀", "🔥", "⚡", "💥", "🌑"][Math.floor(Math.random() * 5)],
          delay: Math.random() * 0.4,
        }
      ]);
    }, 400);
    return () => clearInterval(t);
  }, [dialogueIdx, visible]);

  const advance = () => {
    if (typing) {
      setDisplayed(DIALOGUE[dialogueIdx].text);
      setTyping(false);
      return;
    }
    if (dialogueIdx < DIALOGUE.length - 1) {
      const next = dialogueIdx + 1;
      setDialogueIdx(next);
      setDisplayed("");
      setTyping(true);
      setParticles([]);
      if (next >= 4) setPhase("king");
    } else {
      setVisible(false);
      onContinue();
    }
  };

  if (!visible) return null;

  const current = DIALOGUE[dialogueIdx];
  const isPlayer = current.speaker === "You";
  const isVillain = current.mood === "villain" || current.mood === "dying";
  const isKing = current.mood === "king" || current.mood === "reward" || current.mood === "celebration";
  const isLast = dialogueIdx === DIALOGUE.length - 1;

  // Background based on phase
  const bgGradient = phase === "battle"
    ? "linear-gradient(180deg, #0a0000 0%, #1a0000 40%, #2d0a0a 100%)"
    : "linear-gradient(180deg, #0a0a1f 0%, #1a1040 40%, #2d1a00 100%)";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pb-0"
      style={{ background: "rgba(0,0,0,0.90)", backdropFilter: "blur(8px)" }}>

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div style={{ position: "absolute", inset: 0, background: bgGradient, transition: "background 1.5s" }} />

        {phase === "battle" ? (
          <>
            {/* Dark lightning */}
            {[20, 50, 75].map((x, i) => (
              <div key={i} style={{
                position: "absolute", left: `${x}%`, top: 0,
                width: 2, height: `${30 + i * 15}%`,
                background: "linear-gradient(180deg, transparent, rgba(180,0,255,0.7), transparent)",
                animation: `flicker ${0.8 + i * 0.3}s ease-in-out infinite alternate`,
                opacity: 0.6,
              }} />
            ))}
            {/* Hellfire glow at bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
              background: "linear-gradient(0deg, rgba(200,20,0,0.35) 0%, transparent 100%)",
            }} />
          </>
        ) : (
          <>
            {/* Throne room light */}
            <div style={{
              position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)",
              width: 300, height: 400,
              background: "radial-gradient(ellipse, rgba(255,200,60,0.18) 0%, transparent 75%)",
            }} />
            {/* Royal banners (simple bars) */}
            {[8, 85].map((x, i) => (
              <div key={i} style={{
                position: "absolute", left: `${x}%`, top: "10%",
                width: 28, height: 180,
                background: "linear-gradient(180deg, #7c3aed, #dc2626)",
                borderRadius: 4,
                boxShadow: "0 0 16px rgba(124,58,237,0.4)",
              }} />
            ))}
          </>
        )}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <div key={p.id} style={{
            position: "absolute", left: `${p.x}%`, bottom: "45%",
            fontSize: 18,
            animationName: "floatUp",
            animationDuration: "2.5s",
            animationDelay: `${p.delay}s`,
            animationFillMode: "forwards",
            animationTimingFunction: "ease-out",
            opacity: 0,
          }}>{p.emoji}</div>
        ))}
      </div>

      {/* LEFT character */}
      <div className="absolute flex flex-col items-center pointer-events-none"
        style={{ bottom: "22%", left: "50%", transform: "translateX(-200px)" }}>
        {phase === "battle" ? (
          <>
            <div style={{
              fontSize: current.mood === "dying" ? 64 : 80,
              lineHeight: 1,
              filter: `drop-shadow(0 0 30px rgba(200,0,255,${current.mood === "dying" ? "0.3" : "0.8"}))`,
              transform: current.mood === "dying" ? "rotate(20deg) scale(0.8)" : "none",
              transition: "all 0.5s",
              opacity: current.mood === "dying" ? 0.5 : 1,
            }}>
              {VILLAIN_FRAMES[frame]}
            </div>
            <div style={{
              width: 70, height: 28, marginTop: -6,
              background: current.mood === "dying"
                ? "linear-gradient(180deg,#4a0000,#1a0000)"
                : "linear-gradient(180deg,#6b21a8,#1a0030)",
              borderRadius: "50% 50% 10px 10px",
              boxShadow: "0 0 16px rgba(139,0,0,0.6)",
              opacity: current.mood === "dying" ? 0.4 : 1,
              transition: "all 0.5s",
            }} />
            <div className="text-xs mt-2 font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", color: current.mood === "dying" ? "#666" : "#c084fc" }}>
              Dark Lord
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 18, marginBottom: 2, animation: "spin 5s linear infinite", display: "inline-block" }}>✨</div>
            <div style={{
              fontSize: 88, lineHeight: 1,
              filter: "drop-shadow(0 0 28px rgba(255,200,60,0.8))",
            }}>
              {KING_FRAMES[frame]}
            </div>
            <div style={{
              width: 80, height: 32, marginTop: -8,
              background: "linear-gradient(180deg,#d97706,#92400e)",
              borderRadius: "50% 50% 10px 10px",
              boxShadow: "0 0 20px rgba(217,119,6,0.5)",
            }} />
            <div className="text-xs mt-2 font-semibold tracking-widest uppercase"
              style={{ fontFamily: "'Cinzel', serif", color: "#fcd34d" }}>
              King Aldric
            </div>
          </>
        )}
      </div>

      {/* RIGHT — Player */}
      <div className="absolute flex flex-col items-center pointer-events-none"
        style={{ bottom: "22%", left: "50%", transform: "translateX(70px)" }}>
        <div style={{
          fontSize: 80, lineHeight: 1,
          filter: "drop-shadow(0 0 18px rgba(255,180,60,0.6))",
        }}>🧙</div>
        <div style={{
          width: 62, height: 26, marginTop: -6,
          background: "linear-gradient(180deg,#b45309,#78350f)",
          borderRadius: "50% 50% 10px 10px",
        }} />
        <div className="text-xs mt-2 font-semibold tracking-widest uppercase"
          style={{ fontFamily: "'Cinzel', serif", color: "#fbbf24" }}>
          You
        </div>
      </div>

      {/* Title badge */}
      {phase === "king" && dialogueIdx >= 6 && (
        <div className="absolute pointer-events-none"
          style={{ top: "10%", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(90deg,#d97706,#dc2626,#d97706)",
            padding: "7px 30px", borderRadius: 999,
            fontSize: 13, fontWeight: "bold", color: "#fff",
            letterSpacing: "0.18em", textTransform: "uppercase",
            boxShadow: "0 0 30px rgba(217,119,6,0.7)",
            fontFamily: "'Cinzel', serif",
          }}>
            🏆 Grand Protector of the Realm
          </div>
        </div>
      )}

      {/* Dialogue box */}
      <div className="relative w-full max-w-2xl mx-4 mb-0" style={{ zIndex: 10 }}>
        <div style={{
          background: isVillain
            ? "linear-gradient(135deg,rgba(20,0,0,0.97) 0%,rgba(40,0,20,0.97) 100%)"
            : "linear-gradient(135deg,rgba(10,8,30,0.97) 0%,rgba(30,18,5,0.97) 100%)",
          border: `2px solid ${isVillain ? "rgba(180,0,80,0.6)" : isKing ? "rgba(217,119,6,0.6)" : "rgba(100,80,20,0.5)"}`,
          borderBottom: "none",
          borderRadius: "16px 16px 0 0",
          padding: "24px 28px 20px",
          boxShadow: isVillain
            ? "0 -8px 40px rgba(180,0,80,0.25)"
            : "0 -8px 40px rgba(217,119,6,0.25)",
          transition: "all 0.5s",
        }}>
          {/* Speaker name tag */}
          <div className="flex items-center gap-2 mb-3">
            <span style={{
              background: isPlayer
                ? "linear-gradient(90deg,#f59e0b,#d97706)"
                : isVillain
                ? "linear-gradient(90deg,#7c0000,#9d174d)"
                : "linear-gradient(90deg,#d97706,#92400e)",
              borderRadius: 999, padding: "2px 14px",
              fontSize: 11, fontWeight: "bold", color: "#fff",
              letterSpacing: "0.15em", textTransform: "uppercase",
              fontFamily: "'Cinzel', serif",
            }}>
              {current.emoji} {current.speaker}
            </span>
          </div>

          {/* Text */}
          <p style={{
            fontSize: 15, lineHeight: 1.75, minHeight: 52,
            fontFamily: "'Cinzel', serif", letterSpacing: "0.02em",
            color: isVillain ? "#fca5a5" : isKing ? "#fde68a" : "#e5e7eb",
          }}>
            {displayed}
            {typing && <span style={{ opacity: 0.5, animation: "pulse 0.8s infinite" }}>▌</span>}
          </p>

          {/* Button */}
          <div className="flex justify-end mt-4">
            <Button
              onClick={advance}
              style={{
                background: isLast && !typing
                  ? "linear-gradient(90deg,#d97706,#dc2626)"
                  : isVillain
                  ? "linear-gradient(90deg,#7c0000,#6b21a8)"
                  : "linear-gradient(90deg,#92400e,#d97706)",
                border: "none", color: "#fff",
                fontFamily: "'Cinzel', serif",
                letterSpacing: "0.12em",
                padding: "8px 28px", fontSize: 13,
              }}
            >
              {typing ? "Skip ▶" : isLast ? "🏆 Accept the Royal Honor" : "Continue ▶"}
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-180px) scale(0.4); opacity: 0; }
        }
        @keyframes flicker {
          from { opacity: 0.3; transform: scaleX(1); }
          to   { opacity: 0.9; transform: scaleX(1.4); }
        }
        @keyframes pulse {
          from { opacity: 0.4; } to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}