import { useState } from "react";
import { X, ShoppingBag, Zap, Shield, Coins, Star, Wind, Swords } from "lucide-react";

export const PERKS = [
  {
    id: "gold_rush",
    name: "Gold Rush",
    desc: "Enemies drop +25% more gold for the rest of the game.",
    icon: "💰",
    cost: 80,
    emoji: <Coins className="w-5 h-5" />,
    color: { from: "#ffd60a", to: "#e09c00", border: "#ffe566", shadow: "#7a5200", text: "#3a2000" },
    stackable: true,
    maxStack: 3,
  },
  {
    id: "extra_life",
    name: "Royal Guard",
    desc: "Restore 3 lives immediately.",
    icon: "❤️",
    cost: 120,
    emoji: <Shield className="w-5 h-5" />,
    color: { from: "#ff4d6d", to: "#c9184a", border: "#ff758f", shadow: "#7b0028", text: "#fff" },
    stackable: true,
    maxStack: 5,
  },
  {
    id: "tower_power",
    name: "Forgemaster",
    desc: "All towers deal +15% damage permanently.",
    icon: "⚔️",
    cost: 100,
    emoji: <Swords className="w-5 h-5" />,
    color: { from: "#ef4444", to: "#b91c1c", border: "#fca5a5", shadow: "#450a0a", text: "#fff" },
    stackable: true,
    maxStack: 4,
  },
  {
    id: "swift_reload",
    name: "Swift Reload",
    desc: "All towers fire 10% faster permanently.",
    icon: "⚡",
    cost: 100,
    emoji: <Zap className="w-5 h-5" />,
    color: { from: "#fbbf24", to: "#d97706", border: "#fde68a", shadow: "#78350f", text: "#3a2000" },
    stackable: true,
    maxStack: 4,
  },
  {
    id: "wide_range",
    name: "Eagle Eye",
    desc: "All towers gain +10% range permanently.",
    icon: "🎯",
    cost: 80,
    emoji: <Star className="w-5 h-5" />,
    color: { from: "#22c55e", to: "#15803d", border: "#86efac", shadow: "#052e16", text: "#fff" },
    stackable: true,
    maxStack: 4,
  },
  {
    id: "wave_gold",
    name: "War Chest",
    desc: "Gain +75 bonus gold immediately.",
    icon: "💎",
    cost: 0,
    emoji: <ShoppingBag className="w-5 h-5" />,
    color: { from: "#a78bfa", to: "#7c3aed", border: "#c4b5fd", shadow: "#3b0764", text: "#fff" },
    stackable: true,
    maxStack: 99,
    reward: 75,
  },
  {
    id: "whirlwind",
    name: "Whirlwind",
    desc: "Projectiles move 20% faster permanently.",
    icon: "🌀",
    cost: 90,
    emoji: <Wind className="w-5 h-5" />,
    color: { from: "#38bdf8", to: "#0369a1", border: "#7dd3fc", shadow: "#082f49", text: "#fff" },
    stackable: true,
    maxStack: 3,
  },
];

export default function PerkShop({ show, wave, gold, perksOwned, onBuy, onClose }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.88)" }}>
      <div className="relative w-full max-w-lg mx-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #1a1535, #100e22)",
          border: "2px solid rgba(139,92,246,0.5)",
          boxShadow: "0 0 60px rgba(100,60,200,0.3), 0 8px 0 #05030f",
        }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(139,92,246,0.25)", background: "rgba(100,60,180,0.15)" }}>
          <div>
            <h2 className="text-base font-black uppercase tracking-widest"
              style={{ color: "#e9d5ff", fontFamily: "'Cinzel Decorative', serif", textShadow: "0 0 20px rgba(199,125,255,0.5)" }}>
              ⚔ Royal Perk Shop
            </h2>
            <p className="text-[10px] mt-0.5 font-semibold uppercase tracking-widest" style={{ color: "#7c5fa0" }}>
              Wave {wave - 1} complete — spend your gold wisely
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full font-black text-sm"
              style={{
                background: "linear-gradient(180deg, #ffd60a, #e09c00)",
                border: "2px solid #ffe566",
                boxShadow: "0 2px 0 #7a5200",
                color: "#3a2000",
              }}>
              💰 {gold}
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(139,92,246,0.3)", color: "#7c6faa" }}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Perk grid */}
        <div className="p-4 grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {PERKS.map((perk) => {
            const owned = perksOwned[perk.id] ?? 0;
            const maxed = owned >= perk.maxStack;
            const canAfford = gold >= perk.cost;
            const available = !maxed && (perk.cost === 0 || canAfford);
            const c = perk.color;

            return (
              <button
                key={perk.id}
                onClick={() => available && onBuy(perk)}
                disabled={!available}
                className="relative text-left rounded-xl p-3 transition-all duration-150 flex flex-col gap-1.5"
                style={{
                  background: available
                    ? `linear-gradient(160deg, ${c.from}22, ${c.to}33)`
                    : "rgba(20,16,36,0.6)",
                  border: `2px solid ${available ? c.border + "66" : "rgba(60,50,90,0.4)"}`,
                  boxShadow: available ? `0 3px 0 ${c.shadow}` : "0 2px 0 #0a0814",
                  opacity: maxed ? 0.45 : (!canAfford && perk.cost > 0) ? 0.6 : 1,
                  cursor: available ? "pointer" : "not-allowed",
                  transform: available ? "translateY(0)" : "translateY(1px)",
                }}
              >
                {/* Icon + name row */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: available ? `linear-gradient(160deg, ${c.from}, ${c.to})` : "rgba(40,32,60,0.8)",
                      border: `1.5px solid ${available ? c.border + "88" : "rgba(60,50,90,0.5)"}`,
                      boxShadow: available ? `0 2px 0 ${c.shadow}` : "none",
                    }}>
                    {perk.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black truncate" style={{ color: available ? "#e9d5ff" : "#4a4070" }}>
                      {perk.name}
                    </div>
                    {owned > 0 && (
                      <div className="text-[9px] font-bold" style={{ color: c.border }}>
                        Owned ×{owned}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[9px] leading-relaxed" style={{ color: available ? "#8b80b0" : "#3a3060" }}>
                  {perk.desc}
                </p>

                {/* Cost badge */}
                <div className="flex justify-end">
                  {maxed ? (
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(40,32,60,0.8)", color: "#4a4070" }}>MAXED</span>
                  ) : perk.cost === 0 ? (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: `linear-gradient(180deg, ${c.from}, ${c.to})`, color: c.text, boxShadow: `0 1px 0 ${c.shadow}` }}>
                      FREE
                    </span>
                  ) : (
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{
                        background: canAfford ? "linear-gradient(180deg, #ffd60a, #e09c00)" : "rgba(40,32,60,0.8)",
                        color: canAfford ? "#3a2000" : "#4a4070",
                        boxShadow: canAfford ? "0 1px 0 #7a5200" : "none",
                      }}>
                      💰 {perk.cost}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3" style={{ borderTop: "1px solid rgba(139,92,246,0.2)" }}>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-black text-sm tracking-widest uppercase transition-all"
            style={{
              background: "linear-gradient(180deg, #7c3aed, #4c1d95)",
              border: "2px solid #a78bfa",
              boxShadow: "0 4px 0 #1e0a4a",
              color: "#e9d5ff",
            }}>
            ⚔ Close Shop & Continue
          </button>
        </div>
      </div>
    </div>
  );
}