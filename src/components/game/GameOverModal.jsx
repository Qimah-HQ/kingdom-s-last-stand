import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Swords } from "lucide-react";

export default function GameOverModal({ score, wave, onRestart }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Blood splatter vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-red-950/20 to-transparent pointer-events-none" />
      <div
        className="relative bg-gradient-to-b from-stone-950 to-black border border-red-900/40 rounded-xl p-8 max-w-sm w-full mx-4 text-center"
        style={{ boxShadow: '0 0 60px rgba(120,10,10,0.4), inset 0 1px 0 rgba(255,255,255,0.03)' }}
      >
        {/* Top blood line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-800/60 to-transparent" />

        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-950/80 border border-red-900/60 flex items-center justify-center"
          style={{ boxShadow: '0 0 20px rgba(153,27,27,0.4)' }}
        >
          <Swords className="w-8 h-8 text-red-600" />
        </div>

        <h2 className="text-2xl font-black text-red-100 mb-1 tracking-widest uppercase"
          style={{ fontFamily: "'Cinzel Decorative', serif", textShadow: '0 0 30px rgba(220,50,50,0.4)' }}
        >
          Kingdom Lost
        </h2>
        <p className="text-stone-600 text-xs mb-6 uppercase tracking-widest">
          The realm has fallen to darkness
        </p>

        <div className="flex justify-center gap-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Trophy className="w-4 h-4 text-yellow-700" />
              <span className="text-xl font-bold text-yellow-200/80">{score}</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-stone-600">Score</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Swords className="w-4 h-4 text-red-700" />
              <span className="text-xl font-bold text-red-200/80">{wave}</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-stone-600">Waves</span>
          </div>
        </div>

        <Button
          onClick={onRestart}
          className="w-full bg-red-900 hover:bg-red-800 text-red-50 font-semibold py-3 gap-2 border border-red-800/50 tracking-widest uppercase text-xs"
        >
          <RotateCcw className="w-4 h-4" />
          Rise Again
        </Button>
      </div>
    </div>
  );
}