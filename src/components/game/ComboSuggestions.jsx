import { useState } from "react";
import { ChevronDown, ChevronUp, Swords } from "lucide-react";

const TIER_STYLES = {
  MERGE: { bg: "rgba(60,40,10,0.5)",   border: "rgba(180,120,40,0.35)",  label: "bg-amber-900/60 text-amber-300",   dot: "#d97706" },
  NEW:   { bg: "rgba(20,10,60,0.5)",   border: "rgba(120,80,220,0.4)",   label: "bg-indigo-900/60 text-indigo-300", dot: "#818cf8" },
  MEGA:  { bg: "rgba(60,10,10,0.5)",   border: "rgba(200,40,40,0.4)",    label: "bg-red-900/60 text-red-300",       dot: "#f87171" },
  ULTRA: { bg: "rgba(80,5,20,0.6)",    border: "rgba(240,60,80,0.5)",    label: "bg-rose-900/60 text-rose-200",     dot: "#fb7185" },
};

const COMBOS = [
  // ── Cannon tree ──────────────────────────────────────────────
  { a: "🧝 Archer",    b: "💣 Cannon",       result: "🎯 Siege Ballista",      resultDesc: "Fast & devastating",         color: "#fbbf24", tier: "MERGE" },
  { a: "💣 Cannon",    b: "💣 Cannon",        result: "🔴 War Cannon",           resultDesc: "Brutal heavy fire",          color: "#f87171", tier: "MERGE" },
  { a: "🔴 War Cannon",b: "🎯 Ballista",      result: "💥 Doomsday Cannon",      resultDesc: "Ultimate destroyer",         color: "#fca5a5", tier: "MEGA"  },

  // ── Archer tree ──────────────────────────────────────────────
  { a: "🧝 Archer",    b: "🧝 Archer",        result: "⚡ Storm Archer",          resultDesc: "Lightning-fast volley",      color: "#fde68a", tier: "MERGE" },
  { a: "🏹 Crossbow",  b: "🧝 Archer",        result: "🏹⚡ Arrow Storm",         resultDesc: "Rapid bolt volley",          color: "#fde68a", tier: "MERGE" },

  // ── Siege tree ───────────────────────────────────────────────
  { a: "💣 Cannon",    b: "⚙️ Trebuchet",     result: "⚙️ Siege Engine",         resultDesc: "Ultimate siege power",       color: "#fdba74", tier: "MERGE" },
  { a: "💣 Cannon",    b: "🪨 Catapult",      result: "💣🪨 War Machine",         resultDesc: "Heavy barrage",              color: "#fcd34d", tier: "MERGE" },
  { a: "⚙️ Trebuchet", b: "🪨 Catapult",      result: "🔥⚙️ Inferno Trebuchet",  resultDesc: "Volcanic long-range siege",  color: "#fca5a5", tier: "NEW"   },
  { a: "⚙️ Siege Eng.",b: "💥 Doom Cannon",   result: "💥⚙️ Doom Siege",         resultDesc: "Total annihilation",         color: "#fda4af", tier: "ULTRA" },

  // ── Mage tree ────────────────────────────────────────────────
  { a: "🔮 Mage",      b: "🔮 Mage",          result: "🌀 Spellcaster",           resultDesc: "Arcane barrage",             color: "#c4b5fd", tier: "MERGE" },
  { a: "🔮 Mage",      b: "❄️ Frost",         result: "🧊 Frozen Mage",           resultDesc: "Slows & deals magic dmg",    color: "#67e8f9", tier: "MERGE" },
  { a: "🔮 Mage",      b: "💣 Cannon",        result: "🔯 Arcane Cannoneer",      resultDesc: "Heavy arcane shells",        color: "#d8b4fe", tier: "MERGE" },
  { a: "🔮 Mage",      b: "🧝 Archer",        result: "🌑🔮 Shadow Mage",         resultDesc: "Poison & slow bolts",        color: "#a5b4fc", tier: "NEW"   },
  { a: "🔮 Mage",      b: "🔴 War Cannon",    result: "🌀💣 Void Cannon",         resultDesc: "Arcane void explosions",     color: "#c084fc", tier: "NEW"   },
  { a: "⚡ Storm Arch.",b: "🔮 Mage",          result: "⚡🏹 Thunder Archer",      resultDesc: "Lightning chain volley",     color: "#fef08a", tier: "NEW"   },
  { a: "🏹 Crossbow",  b: "🔮 Mage",          result: "☠️🏹 Venom Crossbow",      resultDesc: "Rapid arcane poison bolts",  color: "#86efac", tier: "NEW"   },
  { a: "🌀 Spellcast.", b: "⚙️ Trebuchet",    result: "🔯⚙️ Arcane Siege",       resultDesc: "Arcane boulders with AoE",   color: "#e879f9", tier: "NEW"   },

  // ── Frost tree ───────────────────────────────────────────────
  { a: "❄️ Frost",     b: "❄️ Frost",         result: "❄️🌀 Blizzard Tower",     resultDesc: "Powerful AoE slow",          color: "#7dd3fc", tier: "MERGE" },
  { a: "❄️ Frost",     b: "💣 Cannon",        result: "🧊💣 Frost Cannoneer",     resultDesc: "Freezing heavy shells",      color: "#93c5fd", tier: "MERGE" },
  { a: "❄️ Frost",     b: "🎯 Ballista",      result: "🧊🎯 Glacial Ballista",    resultDesc: "Freezing piercing bolts",    color: "#a5f3fc", tier: "NEW"   },
  { a: "❄️ Blizzard",  b: "🏹⚡ Arrow Storm", result: "❄️⚡ Frost Storm",         resultDesc: "Freezing rapid volley",      color: "#bae6fd", tier: "NEW"   },
];

const TIER_GROUPS = ["ULTRA", "MEGA", "NEW", "MERGE"];
const GROUP_LABELS = {
  ULTRA: "⚠ Ultra Merges",
  MEGA:  "💥 Mega Merges",
  NEW:   "✨ Advanced Merges",
  MERGE: "⚙ Basic Merges",
};

export default function ComboSuggestions() {
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState("MERGE");

  const filtered = COMBOS.filter(c => c.tier === activeGroup);

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left"
        style={{ background: "rgba(30,15,5,0.7)", border: "1px solid rgba(180,120,40,0.3)" }}
      >
        <div className="flex items-center gap-2">
          <Swords className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-black text-amber-200 uppercase tracking-widest">Merge Recipes</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-900/50 text-amber-400 font-bold">{COMBOS.length}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-amber-600" /> : <ChevronDown className="w-4 h-4 text-amber-600" />}
      </button>

      {open && (
        <div className="mt-2" style={{ background: "rgba(8,4,2,0.9)", border: "1px solid rgba(100,60,20,0.4)", borderRadius: 10, overflow: "hidden" }}>
          {/* Tier tabs */}
          <div className="flex border-b" style={{ borderColor: "rgba(80,50,10,0.4)" }}>
            {TIER_GROUPS.map(tier => {
              const ts = TIER_STYLES[tier];
              const isActive = activeGroup === tier;
              return (
                <button
                  key={tier}
                  onClick={() => setActiveGroup(tier)}
                  className="flex-1 py-1.5 text-[9px] font-black uppercase tracking-wider transition-all"
                  style={{
                    background: isActive ? ts.bg : "transparent",
                    borderBottom: isActive ? `2px solid ${ts.dot}` : "2px solid transparent",
                    color: isActive ? ts.dot : "rgba(120,100,80,0.7)",
                  }}
                >
                  {tier}
                </button>
              );
            })}
          </div>

          {/* Group label */}
          <div className="px-3 pt-2.5 pb-1">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TIER_STYLES[activeGroup].dot, opacity: 0.7 }}>
              {GROUP_LABELS[activeGroup]}
            </p>
          </div>

          {/* Recipe list */}
          <div className="px-2 pb-2 flex flex-col gap-1.5 max-h-64 overflow-y-auto">
            {filtered.map((combo, i) => {
              const ts = TIER_STYLES[combo.tier];
              return (
                <div key={i} className="rounded-lg p-2.5" style={{ background: ts.bg, border: `1px solid ${ts.border}` }}>
                  {/* Ingredients row */}
                  <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-stone-200 whitespace-nowrap">{combo.a}</span>
                    <span className="text-[10px] text-stone-500 font-black">+</span>
                    <span className="text-xs font-bold text-stone-200 whitespace-nowrap">{combo.b}</span>
                  </div>
                  {/* Arrow + result */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-black" style={{ color: ts.dot }}>→</span>
                    <span className="text-xs font-black whitespace-nowrap" style={{ color: combo.color }}>{combo.result}</span>
                  </div>
                  {/* Description */}
                  <p className="text-[10px] mt-1 leading-relaxed" style={{ color: "rgba(180,160,140,0.7)" }}>{combo.resultDesc}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}