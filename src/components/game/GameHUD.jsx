import { Heart, Coins, Swords, Trophy } from "lucide-react";

export default function GameHUD({ lives, gold, wave, score }) {
  return (
    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
      <div className="flex items-center gap-2 bg-red-950/70 border border-red-900/60 rounded px-3 py-1.5" style={{ boxShadow: '0 0 20px rgba(153,27,27,0.3)' }}>
        <Heart className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
        <span className="text-red-200 font-bold text-sm tracking-wide">{lives}</span>
      </div>
      <div className="flex items-center gap-2 bg-yellow-950/50 border border-yellow-900/40 rounded px-3 py-1.5">
        <Coins className="w-3.5 h-3.5 text-yellow-600" />
        <span className="text-yellow-200/90 font-bold text-sm tracking-wide">{gold}</span>
      </div>
      <div className="flex items-center gap-2 bg-stone-900/70 border border-stone-700/40 rounded px-3 py-1.5">
        <Swords className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-300 font-bold text-sm tracking-wide">Wave {wave}</span>
      </div>
      <div className="flex items-center gap-2 bg-stone-900/50 border border-stone-800/40 rounded px-3 py-1.5">
        <Trophy className="w-3.5 h-3.5 text-amber-700" />
        <span className="text-amber-200/80 font-bold text-sm tracking-wide">{score}</span>
      </div>
    </div>
  );
}