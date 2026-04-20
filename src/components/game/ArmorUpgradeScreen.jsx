import { useState } from "react";

// Chapter upgrade data — 3 choices per chapter (after each land boss)
const CHAPTER_UPGRADES = {
  2: {
    title: "The Dungeon Yields Its Spoils",
    subtitle: "Chapter II — Forge Thy Gauntlets",
    lore: "From the bones of the Dungeon Overlord, the blacksmiths of Eldenmoor hammer steel anew. Choose wisely, my lord.",
    slot: "gauntlets",
    slotLabel: "Gauntlets",
    slotEmoji: "🧤",
    bg: "linear-gradient(160deg, #04040f, #0c0c25)",
    border: "#2a2a6a",
    glow: "#6366f1",
    upgrades: [
      {
        id: "iron_fist",
        name: "Iron Fist",
        emoji: "🔩",
        desc: "Reinforced iron plates. Towers deal +15% damage.",
        effect: "damage +15%",
        color: "#60a5fa",
        statBonus: { label: "Tower Damage", value: "+15%" },
      },
      {
        id: "swift_grip",
        name: "Swift Grip",
        emoji: "⚡",
        desc: "Lightweight alloy wraps. Tower fire rate +12%.",
        effect: "fireRate +12%",
        color: "#facc15",
        statBonus: { label: "Fire Rate", value: "+12%" },
      },
      {
        id: "golden_palm",
        name: "Golden Palm",
        emoji: "💰",
        desc: "Blessed by the treasury. +20 gold per wave bonus.",
        effect: "gold +20",
        color: "#fbbf24",
        statBonus: { label: "Wave Gold", value: "+20" },
      },
    ],
  },
  3: {
    title: "The Volcano's Blessing",
    subtitle: "Chapter III — The Cloak of Embers",
    lore: "The Flame Titan's pyre grants thee a mantle no mortal fire can touch. Pick the blessing that suits thy temper.",
    slot: "cloak",
    slotLabel: "Cloak",
    slotEmoji: "🧣",
    bg: "linear-gradient(160deg, #150302, #3d0800)",
    border: "#7a1a00",
    glow: "#f97316",
    upgrades: [
      {
        id: "ember_cloak",
        name: "Ember Cloak",
        emoji: "🔥",
        desc: "Wreathed in volcanic ash. Projectile speed +20%.",
        effect: "projSpeed +20%",
        color: "#f97316",
        statBonus: { label: "Proj. Speed", value: "+20%" },
      },
      {
        id: "forge_mantle",
        name: "Forge Mantle",
        emoji: "⚒️",
        desc: "Heat-tempered weave. Tower range +10% across all towers.",
        effect: "range +10%",
        color: "#fb923c",
        statBonus: { label: "Tower Range", value: "+10%" },
      },
      {
        id: "cinder_shroud",
        name: "Cinder Shroud",
        emoji: "🌋",
        desc: "Infused with lava dust. +1 extra life restored.",
        effect: "life +1",
        color: "#ef4444",
        statBonus: { label: "Lives Restored", value: "+1" },
      },
    ],
  },
  4: {
    title: "The Abyss Surrenders",
    subtitle: "Chapter IV — Pauldrons of the Frozen Throne",
    lore: "The Frost Colossus crumbles. Its glacial essence is thine to command. What power shall adorn thy shoulders?",
    slot: "pauldrons",
    slotLabel: "Pauldrons",
    slotEmoji: "🦾",
    bg: "linear-gradient(160deg, #020210, #06063a)",
    border: "#0a0a80",
    glow: "#60a5fa",
    upgrades: [
      {
        id: "frost_guard",
        name: "Frost Guard",
        emoji: "🧊",
        desc: "Glacial pauldrons. Enemies slow 10% longer from frost towers.",
        effect: "slowDuration +10%",
        color: "#7dd3fc",
        statBonus: { label: "Slow Duration", value: "+10%" },
      },
      {
        id: "storm_mantle",
        name: "Storm Mantle",
        emoji: "⛈️",
        desc: "Crackling with energy. All tower damage +20%.",
        effect: "damage +20%",
        color: "#818cf8",
        statBonus: { label: "Tower Damage", value: "+20%" },
      },
      {
        id: "titan_shoulders",
        name: "Titan Shoulders",
        emoji: "💪",
        desc: "Colossal plating. +3 lives granted immediately.",
        effect: "life +3",
        color: "#a78bfa",
        statBonus: { label: "Lives Granted", value: "+3" },
      },
    ],
  },
  5: {
    title: "The Shadow Is Broken",
    subtitle: "Chapter V — The Final Ascension",
    lore: "Thou hast endured all five lands. The Shadow Sovereign lies dead. Now claim the final blessing — the one that shall define thy legend.",
    slot: "transcendence",
    slotLabel: "Transcendence",
    slotEmoji: "✨",
    bg: "linear-gradient(160deg, #0a0010, #220050)",
    border: "#7a20c0",
    glow: "#e879f9",
    upgrades: [
      {
        id: "soul_aegis",
        name: "Soul Aegis",
        emoji: "🌟",
        desc: "The armour becomes one with thy soul. All bonuses doubled.",
        effect: "allDouble",
        color: "#e879f9",
        statBonus: { label: "All Bonuses", value: "×2" },
      },
      {
        id: "eternal_flame",
        name: "Eternal Flame",
        emoji: "🔱",
        desc: "Blazing with undying fire. Tower damage +40%, fire rate +25%.",
        effect: "damage +40%, fireRate +25%",
        color: "#ff4d6d",
        statBonus: { label: "Damage + Speed", value: "+40% / +25%" },
      },
      {
        id: "kings_resolve",
        name: "King's Resolve",
        emoji: "👑",
        desc: "The crown of Eldenmoor descends upon thee. +10 lives, +200 gold.",
        effect: "life +10, gold +200",
        color: "#ffd60a",
        statBonus: { label: "Lives + Gold", value: "+10 / +200" },
      },
    ],
  },
};

function UpgradeCard({ upgrade, selected, onSelect, accentColor }) {
  return (
    <button
      onClick={() => onSelect(upgrade.id)}
      className="relative text-left rounded-2xl transition-all duration-200 hover:scale-[1.03] p-5 w-full"
      style={{
        background: selected
          ? `linear-gradient(160deg, ${upgrade.color}18, ${upgrade.color}08)`
          : "linear-gradient(160deg, #0d0a14, #08060f)",
        border: `2px solid ${selected ? upgrade.color : "rgba(80,60,100,0.25)"}`,
        boxShadow: selected
          ? `0 0 30px ${upgrade.color}44, 0 6px 0 #000`
          : "0 4px 0 #000",
      }}>

      {selected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: upgrade.color, boxShadow: `0 0 10px ${upgrade.color}` }}>
          <span className="text-[10px] font-black text-white">✓</span>
        </div>
      )}

      <div className="text-4xl mb-3">{upgrade.emoji}</div>
      <div className="text-sm font-black mb-1" style={{ color: selected ? "#fff" : "#b0a0c0", fontFamily: "'Cinzel', serif" }}>
        {upgrade.name}
      </div>
      <p className="text-[11px] leading-relaxed mb-3" style={{ color: selected ? "#9a8ab0" : "#5a4870" }}>
        {upgrade.desc}
      </p>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
        style={{ background: `${upgrade.color}15`, border: `1px solid ${upgrade.color}33` }}>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: upgrade.color }}>
          {upgrade.statBonus.label}
        </span>
        <span className="ml-auto text-sm font-black" style={{ color: upgrade.color }}>
          {upgrade.statBonus.value}
        </span>
      </div>
    </button>
  );
}

export default function ArmorUpgradeScreen({ chapter, armorId, onConfirm }) {
  const [selected, setSelected] = useState(null);
  const data = CHAPTER_UPGRADES[chapter];
  if (!data) return null;

  const chosenUpgrade = data.upgrades.find(u => u.id === selected);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.97)" }}>

      {/* BG texture */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #8b0000 0px, #8b0000 1px, transparent 1px, transparent 40%)`,
          backgroundSize: "16px 16px",
        }} />

      {/* Glow vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at center, ${data.glow}08 0%, transparent 70%)` }} />

      <div className="relative w-full max-w-2xl mx-4 flex flex-col max-h-[95vh]">

        {/* Chapter badge */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full mb-3"
            style={{ background: `${data.glow}18`, border: `1px solid ${data.glow}44`, color: data.glow }}>
            <span className="text-sm">{data.slotEmoji}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">{data.subtitle}</span>
          </div>
          <h2 className="text-xl font-black"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              background: `linear-gradient(135deg, #fff, ${data.glow}, #fff)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 12px ${data.glow}88)`,
            }}>
            {data.title}
          </h2>
        </div>

        {/* Lore box */}
        <div className="mx-2 mb-5 rounded-xl px-5 py-3 text-center"
          style={{ background: "rgba(0,0,0,0.5)", border: `1px solid ${data.border}` }}>
          <p className="text-sm italic leading-relaxed" style={{ color: "#9a8a8a", fontFamily: "'Cinzel', serif" }}>
            "{data.lore}"
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-1 h-1 rounded-full" style={{ background: data.glow }} />
            <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: "#5a3a50" }}>
              The Royal Chronicler
            </span>
            <div className="w-1 h-1 rounded-full" style={{ background: data.glow }} />
          </div>
        </div>

        {/* Chapter progress dots */}
        <div className="flex items-center justify-center gap-2 mb-5">
          {[1, 2, 3, 4, 5].map(c => (
            <div key={c} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                style={{
                  background: c < chapter ? data.glow : c === chapter ? `linear-gradient(180deg, ${data.glow}, ${data.border})` : "rgba(40,30,60,0.6)",
                  border: `2px solid ${c <= chapter ? data.glow : "rgba(80,60,100,0.3)"}`,
                  boxShadow: c === chapter ? `0 0 12px ${data.glow}88` : "none",
                  color: c <= chapter ? "#fff" : "#3a2a50",
                }}>
                {c < chapter ? "✓" : c}
              </div>
              {c < 5 && (
                <div className="w-5 h-0.5 rounded-full"
                  style={{ background: c < chapter ? data.glow : "rgba(80,60,100,0.2)" }} />
              )}
            </div>
          ))}
        </div>

        {/* Upgrade cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mx-2 overflow-y-auto flex-1">
          {data.upgrades.map(u => (
            <UpgradeCard
              key={u.id}
              upgrade={u}
              selected={selected === u.id}
              onSelect={setSelected}
              accentColor={data.glow}
            />
          ))}
        </div>

        {/* Confirm */}
        <div className="mt-4 mx-2 pb-1">
          <button
            disabled={!selected}
            onClick={() => onConfirm(selected)}
            className="w-full rounded-xl py-4 font-black text-base uppercase tracking-widest transition-all"
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              background: selected
                ? `linear-gradient(180deg, ${chosenUpgrade?.color ?? data.glow}, ${data.border})`
                : "linear-gradient(180deg, #1a1225, #0d0a18)",
              border: `3px solid ${selected ? (chosenUpgrade?.color ?? data.glow) : "rgba(80,60,100,0.3)"}`,
              boxShadow: selected ? `0 6px 0 #000, 0 0 30px ${chosenUpgrade?.color ?? data.glow}44` : "0 4px 0 #000",
              color: selected ? "#fff" : "#3a2a50",
              textShadow: selected ? "0 2px 4px rgba(0,0,0,0.7)" : "none",
              cursor: selected ? "pointer" : "not-allowed",
              transform: selected ? "none" : "none",
            }}>
            {selected ? `${chosenUpgrade?.emoji} Forge the ${chosenUpgrade?.name}` : "Choose an Upgrade to Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}