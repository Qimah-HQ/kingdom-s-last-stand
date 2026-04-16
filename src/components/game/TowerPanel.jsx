import { TOWER_TYPES } from "../../lib/gameEngine";
import { cn } from "@/lib/utils";

export default function TowerPanel({ selectedTower, onSelect, gold }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs uppercase tracking-widest text-red-800/80 font-semibold mb-1 tracking-[0.2em]">
        Towers
      </h3>
      {Object.entries(TOWER_TYPES).filter(([, t]) => !t.isMerged).map(([key, tower]) => {
        const canAfford = gold >= tower.cost;
        const isSelected = selectedTower === key;

        return (
          <button
            key={key}
            onClick={() => onSelect(isSelected ? null : key)}
            disabled={!canAfford}
            className={`flex items-center gap-3 p-2.5 rounded border transition-all text-left ${
              isSelected
                ? "border-red-800 bg-red-950/50 shadow-lg shadow-red-950/30"
                : "border-stone-800/60 bg-stone-950/60 hover:bg-red-950/20 hover:border-red-900/40"
            } ${!canAfford ? "opacity-35 cursor-not-allowed" : ""}`}
          >
            <span className="text-xl">{tower.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-stone-200 truncate">
                {tower.name}
              </div>
              <div className="text-[10px] text-stone-500">{tower.description}</div>
            </div>
            <div className="text-xs font-bold text-yellow-600/90 whitespace-nowrap">
              {tower.cost}g
            </div>
          </button>
        );
      })}
    </div>
  );
}