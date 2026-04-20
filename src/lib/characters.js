// 5 Playable Characters with Unique Stories and Motivations

export const CHARACTERS = {
  aldric: {
    id: "aldric",
    name: "Lord Aldric",
    title: "The Warrior",
    emoji: "🛡️",
    color: "#c9915a",
    story: "Once a decorated general of the realm, Aldric seeks redemption for a military failure that cost innocent lives. He believes defending Eldenmoor is his final chance to prove his worth.",
    motivation: "If I fall, the blood of thousands more will be on my hands. I must not fail.",
    stats: { healthBonus: 0, damageBonus: 0, rangeBonus: 0, costReduction: 0 },
    abilityUnlocked: null,
  },
  seraphine: {
    id: "seraphine",
    name: "Queen Seraphine",
    title: "The Green Sentinel",
    emoji: "🌿",
    color: "#5a9a7a",
    story: "The Queen herself has taken up arms alongside her people. She fights to protect not just her kingdom, but the ancient forests and sacred groves that are Eldenmoor's heart.",
    motivation: "These lands are my responsibility. I will not watch them burn while I hide behind walls.",
    stats: { healthBonus: 0.15, damageBonus: 0, rangeBonus: 0.25, costReduction: 0 },
    abilityUnlocked: "healing_aura",
  },
  morrigan: {
    id: "morrigan",
    name: "Morrigan",
    title: "The Shadow Mage",
    emoji: "🔮",
    color: "#7c3aed",
    story: "Once a court advisor to the king, Morrigan was accused of dark magic and banished. She returns now to prove her power is not a curse, but salvation—if Eldenmoor will have her.",
    motivation: "My exile ends today. I will show them that my magic can save kingdoms, not destroy them.",
    stats: { healthBonus: 0, damageBonus: 0.20, rangeBonus: 0, costReduction: 0.15 },
    abilityUnlocked: "frost_nova",
  },
  kael: {
    id: "kael",
    name: "Kael Ironbow",
    title: "The Ranger",
    emoji: "🏹",
    color: "#b8824a",
    story: "A wanderer from the borderlands, Kael has watched the darkness creep closer for years. Now he finally has a chance to make a stand and protect the innocent he could not save in his travels.",
    motivation: "Every arrow I loose is for those I couldn't save. This time, I will not run.",
    stats: { healthBonus: 0, damageBonus: 0, rangeBonus: 0, costReduction: 0 },
    abilityUnlocked: "rain_of_arrows",
  },
  aurora: {
    id: "aurora",
    name: "Aurora",
    title: "The Paladin",
    emoji: "✨",
    color: "#ffd60a",
    story: "A holy warrior sworn to protect the innocent, Aurora left her sacred order when she witnessed a darkness that threatened all faith. She believes this is her divine calling.",
    motivation: "Light shall shine upon this land once more. Not through faith alone, but through steel and will.",
    stats: { healthBonus: 0.25, damageBonus: 0.10, rangeBonus: 0, costReduction: 0 },
    abilityUnlocked: "divine_shield",
  },
};

export function getCharacter(id) {
  return CHARACTERS[id] || CHARACTERS.aldric;
}

export function getAllCharacters() {
  return Object.values(CHARACTERS);
}