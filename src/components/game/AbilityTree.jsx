import { useState } from "react";

export const ABILITY_TREE = [
  // Row 1 — Tier 1 (1 glory point)
  {
    id: "rain_of_arrows",
    name: "Rain of Arrows",
    emoji: "🏹",
    desc: "Unleash a volley of arrows dealing heavy damage to all enemies on the path.",
    lore: "A thousand shafts blot out the sun itself.",
    tier: 1,
    cost: 1,
    cooldown: 30,
    color: "#f59e0b",
    colorRgb: "245,158,11",
    row: 0,
    col: 0,
    requires: [],
  },
  {
    id: "healing_aura",
    name: "Healing Aura",
    emoji: "💚",
    desc: "A divine light restores +3 lives to your kingdom instantly.",
    lore: "The light of Eldenmoor never truly fades.",
    tier: 1,
    cost: 1,
    cooldown: 60,
    color: "#22c55e",
    colorRgb: "34,197,94",
    row: 0,
    col: 1,
    requires: [],
  },
  {
    id: "gold_surge",
    name: "Gold Surge",
    emoji: "💰",
    desc: "A treasury blessing grants +80 gold immediately.",
    lore: "The royal coffers open at thy command.",
    tier: 1,
    cost: 1,
    cooldown: 45,
    color: "#fbbf24",
    colorRgb: "251,191,36",
    row: 0,
    col: 2,
    requires: [],
  },
  // Row 2 — Tier 2 (2 glory points)
  {
    id: "earthquake",
    name: "Earthquake",
    emoji: "🌍",
    desc: "The earth shakes — ALL enemies are stunned (frozen) for 3 seconds.",
    lore: "Even mountains bow before true fury.",
    tier: 2,
    cost: 2,
    cooldown: 50,
    color: "#a16207",
    colorRgb: "161,98,7",
    row: 1,
    col: 0,
    requires: ["rain_of_arrows"],
  },
  {
    id: "frost_nova",
    name: "Frost Nova",
    emoji: "❄️",
    desc: "An icy explosion slows ALL enemies by 70% for 5 seconds.",
    lore: "Winter answers only to the throne.",
    tier: 2,
    cost: 2,
    cooldown: 40,
    color: "#7dd3fc",
    colorRgb: "125,211,252",
    row: 1,
    col: 1,
    requires: ["healing_aura"],
  },
  {
    id: "tower_overcharge",
    name: "Tower Overcharge",
    emoji: "⚡",
    desc: "All towers fire 3× faster for 8 seconds.",
    lore: "Channel the storm through every stone.",
    tier: 2,
    cost: 2,
    cooldown: 55,
    color: "#eab308",
    colorRgb: "234,179,8",
    row: 1,
    col: 2,
    requires: ["gold_surge"],
  },
  // Row 3 — Tier 3 (3 glory points)
  {
    id: "meteor_strike",
    name: "Meteor Strike",
    emoji: "☄️",
    desc: "Call down a meteor for massive AoE damage — kills most non-boss enemies instantly.",
    lore: "The heavens themselves fight for Eldenmoor.",
    tier: 3,
    cost: 3,
    cooldown: 90,
    color: "#f97316",
    colorRgb: "249,115,22",
    row: 2,
    col: 0,
    requires: ["earthquake"],
  },
  {
    id: "divine_shield",
    name: "Divine Shield",
    emoji: "🛡️",
    desc: "A holy barrier prevents ANY lives from being lost for 10 seconds.",
    lore: "By the covenant of Eldenmoor — none shall pass.",
    tier: 3,
    cost: 3,
    cooldown: 80,
    color: "#a78bfa",
    colorRgb: "167,139,250",
    row: 2,
    col: 1,
    requires: ["frost_nova"],
  },
  {
    id: "void_wrath",
    name: "Void Wrath",
    emoji: "🌀",
    desc: "Summon void energy — enemies take 200% more damage for 6 seconds.",
    lore: "Let the darkness consume its own.",
    tier: 3,
    cost: 3,
    cooldown: 70,
    color: "#c084fc",
    colorRgb: "192,132,252",
    row: 2,
    col: 2,
    requires: ["tower_overcharge"],
  },
];

const TIER_LABELS = { 1: "Novice", 2: "Champion", 3: "Legend" };

export default function AbilityTree({ show, gloryPoints, unlockedAbilities, onUnlock, onClose }) {
  const [hovered, setHovered] = useState(null);

  if (!show) return null;

  const canUnlock = (ability) => {
    if (unlockedAbilities.includes(ability.id)) return false;
    if (gloryPoints < ability.cost) return false;
    return ability.requires.every(r => unlockedAbilities.includes(r));
  };

  const isLocked = (ability) => {
    if (unlockedAbilities.includes(ability.id)) return false;
    return !ability.requires.every(r => unlockedAbilities.includes(r));
  };

  const rows = [0, 1, 2].map(r => ABILITY_TREE.filter(a => a.row === r));

  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center overflow-hidden"
      style={{ background: "rgba(0,0,0,0.95)" }}>

      {/* Starfield bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{ background: "linear-gradient(180deg,#050010,#0a0020,#050015)", position: "absolute", inset: 0 }} />
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${(i * 47 + 3) % 100}%`,
            top: `${(i * 31 + 7) % 80}%`,
            width: i % 5 === 0 ? 3 : 2,
            height: i % 5 === 0 ? 3 : 2,
            borderRadius: "50%",
            background: `rgba(200,170,255,${0.2 + (i % 4) * 0.15})`,
            animation: `starTwinkle ${1.5 + (i % 5) * 0.4}s ease-in-out ${(i % 3) * 0.3}s infinite alternate`,
          }} />
        ))}
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: 500, height: 300,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }} />
      </div>

      {/* Top-right exit button */}
      <button
        onClick={onClose}
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 10,
          width: 44, height: 44, borderRadius: "50%",
          background: "linear-gradient(180deg,#4c1d95,#2e0a6a)",
          border: "2px solid #a78bfa",
          boxShadow: "0 4px 0 #1e0a4a, 0 0 16px rgba(139,92,246,0.4)",
          color: "#e9d5ff", fontSize: 20, fontWeight: 900,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1,
        }}>
        ✕
      </button>

      <div className="relative w-full max-w-3xl mx-4" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-3"
            style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.4)" }}>
            <span style={{ color: "#ffd60a", fontSize: 14 }}>⚔</span>
            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.3em", color: "#a78bfa", fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}>
              The Ability Sanctum
            </span>
            <span style={{ color: "#ffd60a", fontSize: 14 }}>⚔</span>
          </div>
          <h2 style={{
            fontFamily: "'Cinzel Decorative', serif",
            fontSize: "clamp(18px,4vw,28px)",
            fontWeight: 900,
            background: "linear-gradient(135deg,#e9d5ff,#ffd60a,#e9d5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 12px rgba(139,92,246,0.5))",
          }}>
            Ability Tree
          </h2>
          {/* Glory Points */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: "linear-gradient(135deg,rgba(255,214,10,0.15),rgba(255,214,10,0.05))", border: "1.5px solid rgba(255,214,10,0.4)" }}>
              <span style={{ fontSize: 18 }}>✨</span>
              <div>
                <div style={{ fontSize: 9, color: "#a07820", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>Glory Points</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#ffd60a", lineHeight: 1, textShadow: "0 0 12px rgba(255,214,10,0.5)" }}>
                  {gloryPoints}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 10, color: "#4a4070", maxWidth: 180, lineHeight: 1.5 }}>
              Earned by defeating boss monsters in battle
            </div>
          </div>
        </div>

        {/* Tree */}
        <div className="flex flex-col gap-4">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx}>
              {/* Tier label */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(139,92,246,0.3))" }} />
                <span style={{
                  fontSize: 9, fontWeight: 900, letterSpacing: "0.35em",
                  color: "#6b5fa0", textTransform: "uppercase", fontFamily: "'Cinzel', serif",
                }}>
                  Tier {rowIdx + 1} — {TIER_LABELS[rowIdx + 1]}
                </span>
                <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg,rgba(139,92,246,0.3),transparent)" }} />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {row.map(ability => {
                  const unlocked = unlockedAbilities.includes(ability.id);
                  const affordable = canUnlock(ability);
                  const locked = isLocked(ability);

                  return (
                    <button
                      key={ability.id}
                      onClick={() => affordable && onUnlock(ability)}
                      onMouseEnter={() => setHovered(ability.id)}
                      onMouseLeave={() => setHovered(null)}
                      disabled={!affordable && !unlocked}
                      style={{
                        position: "relative",
                        textAlign: "left",
                        borderRadius: 16,
                        padding: "14px 12px",
                        cursor: affordable ? "pointer" : "default",
                        background: unlocked
                          ? `linear-gradient(160deg,rgba(${ability.colorRgb},0.25),rgba(${ability.colorRgb},0.08))`
                          : locked
                          ? "linear-gradient(160deg,#0a0814,#060510)"
                          : "linear-gradient(160deg,#110d20,#0c0a18)",
                        border: `2px solid ${unlocked ? ability.color : locked ? "rgba(40,30,70,0.5)" : hovered === ability.id ? ability.color : "rgba(80,60,120,0.3)"}`,
                        boxShadow: unlocked
                          ? `0 0 24px rgba(${ability.colorRgb},0.35), 0 5px 0 #000`
                          : "0 4px 0 #000",
                        opacity: locked ? 0.4 : 1,
                        transition: "all 0.2s",
                        transform: hovered === ability.id && affordable ? "translateY(-3px)" : "none",
                      }}>

                      {/* Unlocked checkmark */}
                      {unlocked && (
                        <div style={{
                          position: "absolute", top: 8, right: 8,
                          width: 20, height: 20, borderRadius: "50%",
                          background: ability.color,
                          boxShadow: `0 0 10px ${ability.color}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 10, fontWeight: 900, color: "#fff",
                        }}>✓</div>
                      )}

                      {/* Lock icon */}
                      {locked && (
                        <div style={{
                          position: "absolute", top: 8, right: 8,
                          fontSize: 14, opacity: 0.5,
                        }}>🔒</div>
                      )}

                      {/* Emoji */}
                      <div style={{
                        fontSize: 30, marginBottom: 8,
                        filter: unlocked ? `drop-shadow(0 0 8px ${ability.color})` : locked ? "grayscale(1)" : "none",
                        transition: "filter 0.2s",
                      }}>{ability.emoji}</div>

                      {/* Name */}
                      <div style={{
                        fontSize: 11, fontWeight: 900, marginBottom: 3,
                        color: unlocked ? "#fff" : locked ? "#3a3060" : "#c0b0e0",
                        fontFamily: "'Cinzel', serif",
                        textShadow: unlocked ? `0 0 8px rgba(${ability.colorRgb},0.6)` : "none",
                      }}>{ability.name}</div>

                      {/* Desc */}
                      <p style={{
                        fontSize: 9, lineHeight: 1.5, marginBottom: 10,
                        color: unlocked ? "#8878b0" : locked ? "#2a2050" : "#4a3a70",
                      }}>{ability.desc}</p>

                      {/* Footer: cost + cooldown */}
                      <div className="flex items-center justify-between">
                        <div style={{
                          display: "flex", alignItems: "center", gap: 4,
                          padding: "4px 8px", borderRadius: 8,
                          background: `rgba(${ability.colorRgb},0.12)`,
                          border: `1px solid rgba(${ability.colorRgb},0.3)`,
                        }}>
                          <span style={{ fontSize: 10 }}>✨</span>
                          <span style={{ fontSize: 11, fontWeight: 900, color: unlocked ? "#888" : ability.color }}>
                            {unlocked ? "Owned" : `${ability.cost} glory`}
                          </span>
                        </div>
                        <div style={{ fontSize: 9, color: "#3a2a60" }}>
                          ⏱ {ability.cooldown}s CD
                        </div>
                      </div>

                      {/* Requires */}
                      {ability.requires.length > 0 && !unlocked && (
                        <div style={{ marginTop: 6, fontSize: 8, color: "#2a2050", letterSpacing: "0.1em" }}>
                          Requires: {ability.requires.map(r => ABILITY_TREE.find(a => a.id === r)?.name).join(", ")}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Connector arrows between rows */}
              {rowIdx < 2 && (
                <div className="flex justify-around mt-3 mb-1">
                  {[0, 1, 2].map(col => (
                    <div key={col} style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                      opacity: 0.4,
                    }}>
                      <div style={{ width: 1, height: 10, background: "rgba(139,92,246,0.5)" }} />
                      <div style={{ fontSize: 10, color: "#6b5fa0" }}>▼</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Close button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            style={{
              padding: "12px 40px",
              borderRadius: 12,
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              background: "linear-gradient(180deg,#7c3aed,#4c1d95)",
              border: "2.5px solid #a78bfa",
              boxShadow: "0 5px 0 #1e0a4a, 0 0 20px rgba(139,92,246,0.4)",
              color: "#e9d5ff",
              cursor: "pointer",
            }}>
            ⚔ &nbsp; Return to Battle &nbsp; ⚔
          </button>
        </div>
      </div>

      <style>{`
        @keyframes starTwinkle {
          from { opacity: 0.15; transform: scale(0.8); }
          to   { opacity: 1;    transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}