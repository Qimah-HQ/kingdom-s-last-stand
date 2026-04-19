import { Play, Loader2 } from "lucide-react";

export default function WaveButton({ waveActive, onStartWave, wave }) {
  return (
    <button
      onClick={onStartWave}
      disabled={waveActive}
      className="w-full mt-4 rounded-xl font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-150"
      style={{
        padding: "12px 16px",
        background: waveActive
          ? "linear-gradient(180deg, #64748b, #475569)"
          : "linear-gradient(180deg, #22c55e, #15803d)",
        border: waveActive
          ? "2px solid #94a3b8"
          : "2px solid #86efac",
        boxShadow: waveActive
          ? "0 4px 0 #1e293b"
          : "0 5px 0 #052e16, 0 0 20px rgba(34,197,94,0.35)",
        color: "#fff",
        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
        opacity: waveActive ? 0.7 : 1,
        cursor: waveActive ? "not-allowed" : "pointer",
        transform: waveActive ? "translateY(2px)" : "translateY(0)",
      }}
    >
      {waveActive ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Battle in Progress…
        </>
      ) : (
        <>
          <Play className="w-4 h-4" fill="white" />
          ⚔ Deploy Wave {wave}
        </>
      )}
    </button>
  );
}