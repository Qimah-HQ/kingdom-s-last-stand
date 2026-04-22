/**
 * EnemyProgressBar — shows enemies remaining in the current wave.
 * Floats at the bottom of the game board when a wave is active.
 */
export default function EnemyProgressBar({ waveActive, totalEnemies, enemiesAlive, waveQueue }) {
  if (!waveActive || totalEnemies === 0) return null;

  const remaining = enemiesAlive + waveQueue.length;
  const defeated  = totalEnemies - remaining;
  const pct       = Math.max(0, Math.min(1, defeated / totalEnemies));

  // Color based on progress
  const barColor  = pct < 0.4 ? "#ef4444" : pct < 0.75 ? "#f97316" : "#22c55e";
  const barGlow   = pct < 0.4 ? "rgba(239,68,68,0.5)" : pct < 0.75 ? "rgba(249,115,22,0.5)" : "rgba(34,197,94,0.5)";

  return (
    <div className="absolute bottom-2 left-2 right-2 z-20 pointer-events-none">
      <div style={{
        background: "rgba(5,3,15,0.85)",
        border: "1.5px solid rgba(100,60,180,0.4)",
        borderRadius: 10,
        padding: "6px 10px",
        backdropFilter: "blur(6px)",
      }}>
        {/* Labels */}
        <div className="flex items-center justify-between mb-1.5">
          <span style={{ fontSize: 9, fontWeight: 900, color: "#7c6faa", textTransform: "uppercase", letterSpacing: "0.18em" }}>
            ⚔ Wave Progress
          </span>
          <span style={{ fontSize: 10, fontWeight: 900, color: barColor, textShadow: `0 0 8px ${barGlow}` }}>
            {remaining} <span style={{ color: "#4a3870", fontWeight: 600 }}>remaining</span>
          </span>
        </div>

        {/* Track */}
        <div style={{ height: 8, background: "rgba(30,20,60,0.8)", borderRadius: 999, overflow: "hidden", position: "relative" }}>
          {/* Filled bar */}
          <div style={{
            height: "100%",
            width: `${pct * 100}%`,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${barColor}cc, ${barColor})`,
            boxShadow: `0 0 8px ${barGlow}`,
            transition: "width 0.35s ease-out",
          }} />
          {/* Segment ticks every 10% */}
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{
              position: "absolute", top: 0, bottom: 0,
              left: `${(i + 1) * 10}%`,
              width: 1,
              background: "rgba(0,0,0,0.4)",
            }} />
          ))}
        </div>

        {/* Skull icons for killed count */}
        <div className="flex items-center justify-between mt-1">
          <span style={{ fontSize: 8, color: "#3a2a60" }}>0</span>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(defeated, 10) }, (_, i) => (
              <span key={i} style={{ fontSize: 8, opacity: 0.7 }}>💀</span>
            ))}
            {defeated > 10 && <span style={{ fontSize: 8, color: "#7c6faa" }}>+{defeated - 10}</span>}
          </div>
          <span style={{ fontSize: 8, color: "#3a2a60" }}>{totalEnemies}</span>
        </div>
      </div>
    </div>
  );
}