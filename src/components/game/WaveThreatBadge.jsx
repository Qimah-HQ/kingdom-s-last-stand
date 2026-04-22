/**
 * WaveThreatBadge — shown BEFORE a wave starts, below the Deploy button.
 * Displays threat level (1–5 skulls) and a summary of what's coming.
 */
import { ENEMY_TYPES } from "../../lib/gameEngine";

const THREAT_LEVELS = [
  { min: 1,  max: 3,  label: "Skirmish",   color: "#22c55e", bg: "rgba(34,197,94,0.12)",   border: "#22c55e55", skulls: 1 },
  { min: 4,  max: 7,  label: "Assault",    color: "#facc15", bg: "rgba(250,204,21,0.12)",  border: "#facc1555", skulls: 2 },
  { min: 8,  max: 12, label: "Siege",      color: "#f97316", bg: "rgba(249,115,22,0.12)",  border: "#f9731655", skulls: 3 },
  { min: 13, max: 18, label: "Onslaught",  color: "#ef4444", bg: "rgba(239,68,68,0.12)",   border: "#ef444455", skulls: 4 },
  { min: 19, max: 99, label: "APOCALYPSE", color: "#a855f7", bg: "rgba(168,85,247,0.15)",  border: "#a855f755", skulls: 5 },
];

function getThreat(wave, hasBoss) {
  const base = Math.floor(wave / 4);
  const level = Math.min(hasBoss ? base + 2 : base, 4);
  return THREAT_LEVELS[level];
}

function getEnemySummary(wave) {
  // Simple heuristic — real wave types based on wave ranges
  if (wave <= 5)  return { types: ["Peasants", "Soldiers", "Knights"], color: "#86efac" };
  if (wave <= 10) return { types: ["Skeletons", "Wraiths", "Necromancers"], color: "#c084fc" };
  if (wave <= 15) return { types: ["Demons", "Golems", "Firedrakes"], color: "#fb923c" };
  if (wave <= 20) return { types: ["Specters", "Frost Giants", "Ice Walkers"], color: "#7dd3fc" };
  if (wave <= 25) return { types: ["Voidlings", "Soul Reapers", "Doom Knights"], color: "#a78bfa" };
  if (wave <= 30) return { types: ["Abyss Lords", "Doom Knights", "Soul Reapers"], color: "#f43f5e" };
  if (wave <= 35) return { types: ["Gate Guardians", "Void Entities"], color: "#818cf8" };
  if (wave <= 40) return { types: ["Corrupted Beasts", "Grove Horrors"], color: "#86efac" };
  if (wave <= 45) return { types: ["Plague Swarms", "Undead Hordes"], color: "#a3e635" };
  if (wave <= 50) return { types: ["Crystal Elementals", "Frost Shadows"], color: "#67e8f9" };
  return { types: ["Ancient Horrors", "Void Lords"], color: "#f43f5e" };
}

function isBossWave(wave) {
  return [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75].includes(wave);
}

export default function WaveThreatBadge({ wave }) {
  if (!wave) return null;

  const boss = isBossWave(wave);
  const threat = getThreat(wave, boss);
  const summary = getEnemySummary(wave);

  return (
    <div className="mt-3 rounded-xl overflow-hidden"
      style={{
        background: threat.bg,
        border: `1.5px solid ${threat.border}`,
        boxShadow: `0 0 16px ${threat.border}`,
      }}>

      {/* Threat header */}
      <div className="flex items-center justify-between px-3 py-2"
        style={{ borderBottom: `1px solid ${threat.border}` }}>
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 11, fontWeight: 900, letterSpacing: "0.12em", color: threat.color, fontFamily: "'Cinzel', serif", textTransform: "uppercase" }}>
            {threat.label}
          </span>
        </div>
        {/* Skull rating */}
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ fontSize: 11, opacity: i < threat.skulls ? 1 : 0.18, filter: i < threat.skulls ? `drop-shadow(0 0 4px ${threat.color})` : 'none' }}>
              💀
            </span>
          ))}
        </div>
      </div>

      {/* Enemy types */}
      <div className="px-3 py-2">
        <div style={{ fontSize: 9, color: "#5a4880", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 4 }}>
          ⚔ Incoming
        </div>
        <div className="flex flex-wrap gap-1">
          {summary.types.map(t => (
            <span key={t} style={{
              fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 999,
              background: `${summary.color}18`, border: `1px solid ${summary.color}44`,
              color: summary.color,
            }}>{t}</span>
          ))}
          {boss && (
            <span style={{
              fontSize: 9, fontWeight: 900, padding: "2px 7px", borderRadius: 999,
              background: "rgba(239,68,68,0.18)", border: "1px solid rgba(239,68,68,0.5)",
              color: "#ef4444", animation: "glowPulse 1.5s ease-in-out infinite",
            }}>👑 BOSS</span>
          )}
        </div>
      </div>
    </div>
  );
}