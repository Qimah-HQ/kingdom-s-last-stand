import { useState } from "react";

export default function ModeSelect({ onSelect }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleSelect = (mode) => {
    onSelect(mode);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(10,4,20,0.98) 0%, rgba(20,10,40,0.98) 50%, rgba(10,4,20,0.98) 100%)",
      }}>

      {/* Background stars */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${(i * 37 + 5) % 100}%`,
          top: `${(i * 23 + 2) % 100}%`,
          width: i % 3 === 0 ? 2 : 1,
          height: i % 3 === 0 ? 2 : 1,
          borderRadius: "50%",
          background: `rgba(200,180,255,${0.3 + (i % 5) * 0.12})`,
          animation: `twinkle ${1.2 + (i % 5) * 0.4}s ease-in-out ${(i % 3) * 0.3}s infinite`,
        }} />
      ))}

      <div className="relative max-w-2xl w-full mx-4" style={{ zIndex: 10 }}>
        {/* Title */}
        <div style={{
          textAlign: "center",
          marginBottom: 48,
          fontSize: "clamp(20px, 5vw, 36px)",
          fontFamily: "'Cinzel Decorative', serif",
          fontWeight: 900,
          color: "#e9d5ff",
          letterSpacing: "0.08em",
          textShadow: "0 0 30px rgba(168,85,247,0.5)",
        }}>
          ⚔️ CHOOSE THY PATH ⚔️
        </div>

        {/* Mode cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
        }}>
          {/* Story Mode */}
          <button
            onClick={() => handleSelect("story")}
            style={{
              background: "linear-gradient(160deg, rgba(10,4,20,0.95) 0%, rgba(30,10,50,0.95) 100%)",
              border: "2px solid #5a9a7a",
              borderRadius: 16,
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 0 60px rgba(90,154,122,0.3), inset 0 1px 0 rgba(138,85,200,0.1)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 0 80px rgba(90,154,122,0.5), inset 0 1px 0 rgba(138,85,200,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 60px rgba(90,154,122,0.3), inset 0 1px 0 rgba(138,85,200,0.1)";
            }}>
            <div style={{
              fontSize: 32,
              marginBottom: 12,
            }}>📖</div>
            <h2 style={{
              fontSize: 22,
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              color: "#5a9a7a",
              marginBottom: 8,
              letterSpacing: "0.05em",
              textShadow: "0 0 15px rgba(90,154,122,0.5)",
            }}>
              Story Mode
            </h2>
            <p style={{
              fontSize: 12,
              color: "#f0e6ff",
              lineHeight: 1.6,
              fontFamily: "'Cinzel', serif",
            }}>
              Battle through 5 lands with epic boss encounters. Unlock armor upgrades and face Malgrath!
            </p>
          </button>

          {/* Endless Mode */}
          <button
            onClick={() => handleSelect("endless")}
            style={{
              background: "linear-gradient(160deg, rgba(10,4,20,0.95) 0%, rgba(30,10,50,0.95) 100%)",
              border: "2px solid #d4af70",
              borderRadius: 16,
              padding: "32px 24px",
              textAlign: "center",
              boxShadow: "0 0 60px rgba(212,175,112,0.3), inset 0 1px 0 rgba(138,85,200,0.1)",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 0 80px rgba(212,175,112,0.5), inset 0 1px 0 rgba(138,85,200,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 60px rgba(212,175,112,0.3), inset 0 1px 0 rgba(138,85,200,0.1)";
            }}>
            <div style={{
              fontSize: 32,
              marginBottom: 12,
            }}>∞</div>
            <h2 style={{
              fontSize: 22,
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              color: "#d4af70",
              marginBottom: 8,
              letterSpacing: "0.05em",
              textShadow: "0 0 15px rgba(212,175,112,0.5)",
            }}>
              Endless Mode
            </h2>
            <p style={{
              fontSize: 12,
              color: "#f0e6ff",
              lineHeight: 1.6,
              fontFamily: "'Cinzel', serif",
            }}>
              Challenge yourself in infinite waves. No story, no limits—pure tower defense!
            </p>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes twinkle { 0%,100%{opacity:0.3;transform:scale(0.8)} 50%{opacity:1;transform:scale(1.2)} }
      `}</style>
    </div>
  );
}