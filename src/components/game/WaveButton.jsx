import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";

export default function WaveButton({ waveActive, onStartWave, wave }) {
  return (
    <Button
      onClick={onStartWave}
      disabled={waveActive}
      className="w-full bg-red-900 hover:bg-red-800 text-red-50 font-semibold gap-2 disabled:opacity-40 mt-4 border border-red-800/50 tracking-wide"
    >
      {waveActive ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Siege in progress...
        </>
      ) : (
        <>
          <Play className="w-4 h-4" />
          Unleash Wave {wave}
        </>
      )}
    </Button>
  );
}