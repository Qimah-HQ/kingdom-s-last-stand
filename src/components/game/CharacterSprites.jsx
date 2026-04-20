// ─── LORD ALDRIC - Warrior Champion ────────────────────────────────────────────────────
export function LordAldric({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes aldricBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .al-body { animation: aldricBob 2.4s ease-in-out infinite; transform-origin: 40px 85px; }
      `}</style>

      <g className="al-body">
        {/* Armor - metallic chest plate */}
        <rect x="18" y="45" width="44" height="32" rx="6" fill="#4a4a4a" stroke="#6a6a6a" strokeWidth="1"/>
        <path d="M30 48 L30 75 M50 48 L50 75" stroke="#6a6a6a" strokeWidth="0.5" opacity="0.5"/>
        
        {/* Arms - armored */}
        <rect x="10" y="50" width="10" height="28" rx="4" fill="#3a3a3a" stroke="#5a5a5a" strokeWidth="0.5"/>
        <rect x="60" y="50" width="10" height="28" rx="4" fill="#3a3a3a" stroke="#5a5a5a" strokeWidth="0.5"/>
        
        {/* Gauntlets */}
        <circle cx="12" cy="80" r="6" fill="#5a5a5a" stroke="#7a7a7a" strokeWidth="1"/>
        <circle cx="68" cy="80" r="6" fill="#5a5a5a" stroke="#7a7a7a" strokeWidth="1"/>
        
        {/* Neck guard */}
        <rect x="31" y="38" width="18" height="9" rx="2" fill="#4a4a4a" stroke="#6a6a6a" strokeWidth="0.5"/>
        
        {/* Head - strong warrior face */}
        <circle cx="40" cy="26" r="14" fill="#d4a574"/>
        
        {/* Dark brown hair - short, practical */}
        <path d="M25 15 Q25 9 40 7 Q55 9 55 15" fill="#3a2a1a"/>
        <path d="M26 20 Q24 24 24 30" stroke="#3a2a1a" strokeWidth="2.5" fill="none"/>
        <path d="M54 20 Q56 24 56 30" stroke="#3a2a1a" strokeWidth="2.5" fill="none"/>
        
        {/* Intense eyes */}
        <circle cx="32" cy="25" r="2.5" fill="#1a0a0a"/>
        <circle cx="48" cy="25" r="2.5" fill="#1a0a0a"/>
        <circle cx="33.2" cy="23.5" r="0.9" fill="#fff" opacity="0.95"/>
        <circle cx="49.2" cy="23.5" r="0.9" fill="#fff" opacity="0.95"/>
        
        {/* Stern eyebrows - battle-hardened */}
        <path d="M30 19 Q32 17 35 19.5" stroke="#1a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M45 19.5 Q48 17 50 19" stroke="#1a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        
        {/* Scar on cheek */}
        <path d="M45 27 Q47 30 46 33" stroke="#8a5030" strokeWidth="0.8" fill="none" opacity="0.6"/>
        
        {/* Strong nose */}
        <line x1="40" y1="25" x2="40" y2="31" stroke="#b88860" strokeWidth="1.2"/>
        
        {/* Determined mouth */}
        <path d="M35 34 Q40 35 45 34" stroke="#6a4030" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── QUEEN SERAPHINE - Wise Ruler ────────────────────────────────────────────────────
export function QueenSeraphine({ size = 120 }) {
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 80 130" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes serBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes crownGlow { 0%,100%{filter:drop-shadow(0 0 4px #d4af70)} 50%{filter:drop-shadow(0 0 10px #d4af70)} }
        .ser-body { animation: serBob 2.6s ease-in-out infinite; transform-origin: 40px 110px; }
        .ser-crown { animation: crownGlow 2s ease-in-out infinite; }
      `}</style>

      <g className="ser-body">
        {/* Elegant gown - green silk */}
        <path d="M20 52 L18 105 L22 128 L40 130 L58 128 L62 105 L60 52 Z" fill="#2a6a4a"/>
        <path d="M25 52 L24 102 L26 124 L40 126 L54 124 L56 102 L55 52 Z" fill="#4a8a6a" opacity="0.5"/>
        
        {/* Gold embroidered belt */}
        <rect x="20" y="50" width="40" height="5" fill="#d4af70" opacity="0.7"/>
        
        {/* Sleeves - draped */}
        <path d="M20 55 Q15 60 12 75" stroke="#2a6a4a" strokeWidth="7" fill="none" strokeLinecap="round"/>
        <path d="M60 55 Q65 60 68 75" stroke="#2a6a4a" strokeWidth="7" fill="none" strokeLinecap="round"/>
        
        {/* Elegant hands */}
        <circle cx="10" cy="75" r="5" fill="#f0d4b8"/>
        <circle cx="70" cy="75" r="5" fill="#f0d4b8"/>
        
        {/* Neck */}
        <rect x="32" y="40" width="16" height="9" rx="3" fill="#f0d4b8"/>
        
        {/* Head - graceful */}
        <circle cx="40" cy="28" r="13" fill="#f0d4b8"/>
        
        {/* Long dark hair */}
        <path d="M27 18 Q27 11 40 9 Q53 11 53 18" fill="#3a2a1a"/>
        <path d="M25 24 Q20 35 18 50 Q16 60 20 70" stroke="#3a2a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M55 24 Q60 35 62 50 Q64 60 60 70" stroke="#3a2a1a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        {/* Kind, wise eyes - green */}
        <ellipse cx="33" cy="27" rx="2.2" ry="2" fill="#4a8a6a"/>
        <ellipse cx="47" cy="27" rx="2.2" ry="2" fill="#4a8a6a"/>
        <circle cx="34.3" cy="25.5" r="0.8" fill="#fff" opacity="0.95"/>
        <circle cx="48.3" cy="25.5" r="0.8" fill="#fff" opacity="0.95"/>
        
        {/* Graceful eyebrows */}
        <path d="M31 22 Q33 20 36 22" stroke="#2a1a0a" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
        <path d="M44 22 Q47 20 49 22" stroke="#2a1a0a" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
        
        {/* Refined nose */}
        <line x1="40" y1="27" x2="40" y2="31" stroke="#d4a080" strokeWidth="0.8"/>
        
        {/* Gentle smile */}
        <path d="M35 33 Q40 34.5 45 33" stroke="#c8805a" strokeWidth="1" fill="none" strokeLinecap="round"/>
        
        {/* Royal Crown */}
        <g className="ser-crown">
          <ellipse cx="40" cy="12" rx="15" ry="4" fill="none" stroke="#d4af70" strokeWidth="1.5"/>
          <circle cx="40" cy="9" r="2.5" fill="#d4af70"/>
          <circle cx="29" cy="14" r="1.5" fill="#d4af70" opacity="0.9"/>
          <circle cx="51" cy="14" r="1.5" fill="#d4af70" opacity="0.9"/>
          <circle cx="40" cy="9" r="1.2" fill="#2d7a4a"/>
        </g>
      </g>
    </svg>
  );
}

// ─── MORRIGAN - Shadow Mage ────────────────────────────────────────────────────
export function Morrigan({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes morBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .mor-body { animation: morBob 2.5s ease-in-out infinite; transform-origin: 40px 85px; }
      `}</style>

      <g className="mor-body">
        {/* Dark mystical robe */}
        <path d="M16 48 L14 100 L18 102 L40 104 L62 102 L66 100 L64 48 Z" fill="#2a0a3a"/>
        <path d="M20 48 L19 98 L40 102 L61 98 L60 48 Z" fill="#4a1a5a" opacity="0.5"/>
        
        {/* Purple arcane accents */}
        <rect x="28" y="52" width="24" height="2" fill="#7c3aed" opacity="0.6"/>
        
        {/* Flowing sleeves */}
        <ellipse cx="12" cy="55" rx="7" ry="24" fill="#2a0a3a"/>
        <ellipse cx="68" cy="55" rx="7" ry="24" fill="#2a0a3a"/>
        
        {/* Pale hands */}
        <circle cx="9" cy="80" r="5" fill="#e8d0f0"/>
        <circle cx="71" cy="80" r="5" fill="#e8d0f0"/>
        
        {/* Neck */}
        <rect x="31" y="39" width="18" height="10" rx="3" fill="#e8d0f0"/>
        
        {/* Head - pale, mysterious */}
        <circle cx="40" cy="26" r="13" fill="#e8d0f0"/>
        
        {/* Long dark hair */}
        <path d="M26 15 Q26 8 40 6 Q54 8 54 15" fill="#0a0a0a"/>
        <path d="M24 23 Q18 32 16 48" stroke="#0a0a0a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        <path d="M56 23 Q62 32 64 48" stroke="#0a0a0a" strokeWidth="4" fill="none" strokeLinecap="round"/>
        
        {/* Mystical purple eyes */}
        <circle cx="32" cy="25" r="2.3" fill="#5a2a7a"/>
        <circle cx="48" cy="25" r="2.3" fill="#5a2a7a"/>
        <circle cx="33.3" cy="23.5" r="0.8" fill="#c8a0ff" opacity="0.95"/>
        <circle cx="49.3" cy="23.5" r="0.8" fill="#c8a0ff" opacity="0.95"/>
        
        {/* Sharp eyebrows - mysterious */}
        <path d="M29 20 Q32 18 35 21" stroke="#0a0a0a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M45 21 Q48 18 51 20" stroke="#0a0a0a" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <line x1="40" y1="26" x2="40" y2="31" stroke="#d4a0c0" strokeWidth="0.9"/>
        
        {/* Neutral mysterious mouth */}
        <path d="M35 33 Q40 34 45 33" stroke="#a08090" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── KAEL - Ice Archer ────────────────────────────────────────────────────
export function Kael({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes kaelBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .kael-body { animation: kaelBob 2.4s ease-in-out infinite; transform-origin: 40px 85px; }
      `}</style>

      <g className="kael-body">
        {/* Icy blue tunic */}
        <rect x="20" y="45" width="40" height="35" rx="8" fill="#3a8aaa" stroke="#5aa0ca" strokeWidth="1"/>
        
        {/* Icy crystalline patterns */}
        <line x1="32" y1="50" x2="32" y2="75" stroke="#5aa0ca" strokeWidth="0.8" opacity="0.4"/>
        <line x1="48" y1="50" x2="48" y2="75" stroke="#5aa0ca" strokeWidth="0.8" opacity="0.4"/>
        
        {/* Arms - with archery bracer detail */}
        <rect x="10" y="50" width="10" height="28" rx="4" fill="#d4a574"/>
        <rect x="60" y="50" width="10" height="28" rx="4" fill="#d4a574"/>
        
        {/* Hands */}
        <circle cx="11" cy="80" r="5" fill="#d4a574"/>
        <circle cx="69" cy="80" r="5" fill="#d4a574"/>
        
        {/* Neck */}
        <rect x="31" y="38" width="18" height="10" rx="3" fill="#d4a574"/>
        
        {/* Head */}
        <circle cx="40" cy="26" r="13" fill="#d4a574"/>
        
        {/* Light blonde/silver hair - wind-swept */}
        <path d="M26 16 Q26 10 40 8 Q54 10 54 16" fill="#a89070"/>
        <path d="M26 22 Q22 28 20 38" stroke="#a89070" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M54 22 Q58 28 60 38" stroke="#a89070" strokeWidth="3" fill="none" strokeLinecap="round"/>
        
        {/* Cool ice-blue eyes */}
        <circle cx="32" cy="25" r="2.2" fill="#3a8aaa"/>
        <circle cx="48" cy="25" r="2.2" fill="#3a8aaa"/>
        <circle cx="33.2" cy="23.5" r="0.8" fill="#a8d5ff" opacity="0.95"/>
        <circle cx="49.2" cy="23.5" r="0.8" fill="#a8d5ff" opacity="0.95"/>
        
        {/* Focused eyebrows */}
        <path d="M30 20 Q32 18 35 20.5" stroke="#5a4a3a" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <path d="M45 20.5 Q48 18 50 20" stroke="#5a4a3a" strokeWidth="1" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <line x1="40" y1="26" x2="40" y2="31" stroke="#c8956f" strokeWidth="0.95"/>
        
        {/* Focused, determined mouth */}
        <path d="M36 33 Q40 34 44 33" stroke="#8a6840" strokeWidth="1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

// ─── AURORA - Sun Priestess ────────────────────────────────────────────────────
export function Aurora({ size = 100 }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 80 100" style={{ overflow: "visible" }}>
      <style>{`
        @keyframes auroraGlow { 0%,100%{filter:drop-shadow(0 0 6px #ffd60a)} 50%{filter:drop-shadow(0 0 14px #ffd60a)} }
        @keyframes auroraBob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        .aurora-body { animation: auroraBob 2.5s ease-in-out infinite; transform-origin: 40px 85px; }
        .aurora-head { animation: auroraGlow 2s ease-in-out infinite; }
      `}</style>

      <g className="aurora-body">
        {/* Golden ceremonial tunic */}
        <rect x="20" y="45" width="40" height="35" rx="8" fill="#d4a847" stroke="#ffd60a" strokeWidth="1"/>
        
        {/* Radiant sun pattern on chest */}
        <circle cx="40" cy="58" r="4" fill="#ffd60a" opacity="0.6"/>
        {[0,1,2,3,4,5].map(i => (
          <line key={i} x1="40" y1="52" x2="40" y2="48" stroke="#ffd60a" strokeWidth="0.8" opacity="0.4" transform={`rotate(${i*60} 40 58)`}/>
        ))}
        
        {/* Arms */}
        <rect x="12" y="50" width="10" height="28" rx="4" fill="#f0d4a0"/>
        <rect x="58" y="50" width="10" height="28" rx="4" fill="#f0d4a0"/>
        
        {/* Hands */}
        <circle cx="13" cy="80" r="5" fill="#f0d4a0"/>
        <circle cx="67" cy="80" r="5" fill="#f0d4a0"/>
        
        {/* Neck */}
        <rect x="31" y="38" width="18" height="10" rx="3" fill="#f0d4a0"/>
        
        {/* Head - warm golden glow */}
        <circle cx="40" cy="26" r="13" fill="#f0d4a0" className="aurora-head"/>
        
        {/* Flowing golden blonde hair */}
        <path d="M26 15 Q26 8 40 6 Q54 8 54 15" fill="#d4a070"/>
        <path d="M24 22 Q20 32 18 45" stroke="#d4a070" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        <path d="M56 22 Q60 32 62 45" stroke="#d4a070" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
        
        {/* Warm golden eyes */}
        <circle cx="32" cy="25" r="2.2" fill="#d4a070"/>
        <circle cx="48" cy="25" r="2.2" fill="#d4a070"/>
        <circle cx="33.2" cy="23.5" r="0.8" fill="#fff" opacity="0.98"/>
        <circle cx="49.2" cy="23.5" r="0.8" fill="#fff" opacity="0.98"/>
        
        {/* Warm, kind eyebrows */}
        <path d="M30 20 Q32 18 35 20" stroke="#8a6a4a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M45 20 Q48 18 50 20" stroke="#8a6a4a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        
        {/* Nose */}
        <line x1="40" y1="26" x2="40" y2="31" stroke="#d4a080" strokeWidth="0.95"/>
        
        {/* Warm, welcoming smile */}
        <path d="M36 33 Q40 35 44 33" stroke="#c8705a" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
}