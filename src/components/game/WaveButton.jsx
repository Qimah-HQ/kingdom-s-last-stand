import { Play, Loader2, FastForward } from "lucide-react";

export default function WaveButton({ waveActive, onStartWave, wave, fastForward, onToggleFastForward }) {
  return (
    <div className="mt-4 flex gap-2">
      <button
        onClick={onStartWave}
        disabled={waveActive}
        className="flex-1 rounded-xl font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-150"
        style={{
          padding: "12px 16px",
          background: waveActive
            ? "linear-gradient(180deg, #64748b, #475569)"
            : "linear-gradient(180deg, #22c55e, #15803d)",
          border: waveActive ? "2px solid #94a3b8" : "2px solid #86efac",
          boxShadow: waveActive
            ? "0 4px 0 #1e293b, 0 0 15px rgba(148,163,184,0.3)"
            : "0 5px 0 #052e16, 0 0 30px rgba(34,197,94,0.6), 0 0 60px rgba(34,197,94,0.3)",
          color: "#fff",
          textShadow: "0 2px 4px rgba(0,0,0,0.6)",
          opacity: waveActive ? 0.7 : 1,
          cursor: waveActive ? "not-allowed" : "pointer",
          transform: waveActive ? "translateY(2px) scale(0.98)" : "translateY(0) scale(1)",
          animation: !waveActive ? "glowPulse 2s ease-in-out infinite" : "none",
        }}
      >
        {waveActive ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Battle in Progress…
          </>
        ) : (
          <>
            <Play className="w-4 h-4 drop-shadow-lg" fill="white" />
            ⚔ Deploy Wave {wave}
          </>
        )}
      </button>

      {/* 2x Speed toggle */}
      <button
        onClick={onToggleFastForward}
        title={fastForward ? "Back to normal speed" : "Fast forward 2×"}
        className="rounded-xl font-black text-sm flex items-center justify-center transition-all duration-150"
        style={{
          width: 48,
          padding: "12px 0",
          background: fastForward
            ? "linear-gradient(180deg, #f59e0b, #d97706)"
            : "linear-gradient(180deg, #1e1a2e, #16122a)",
          border: fastForward ? "2px solid #fcd34d" : "2px solid rgba(100,60,180,0.5)",
          boxShadow: fastForward
            ? "0 4px 0 #78350f, 0 0 20px rgba(245,158,11,0.5)"
            : "0 4px 0 #05030f",
          color: fastForward ? "#1c0a00" : "#7c5fa0",
          cursor: "pointer",
          transform: fastForward ? "scale(1.05)" : "scale(1)",
        }}
      >
        <FastForward className="w-4 h-4" fill={fastForward ? "currentColor" : "none"} />
      </button>
    </div>
  );
}