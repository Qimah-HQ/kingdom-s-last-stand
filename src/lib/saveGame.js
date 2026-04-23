// Save/Load game progress using localStorage

const SAVE_KEY = 'kingdoms_last_stand_save';

export function saveGame(state) {
  try {
    const save = {
      version: 1,
      savedAt: new Date().toISOString(),
      // Core progress
      wave: state.wave,
      gold: state.gold,
      lives: state.lives,
      score: state.score,
      // Character & settings
      selectedCharacter: state.selectedCharacter,
      difficulty: state.difficulty,
      gameMode: state.gameMode,
      // Towers (only placed towers, not enemies/projectiles)
      towers: state.towers.map(t => ({
        id: t.id,
        type: t.type,
        gridX: t.gridX,
        gridY: t.gridY,
        x: t.x,
        y: t.y,
        damage: t.damage,
        range: t.range,
        fireRate: t.fireRate,
        level: t.level,
        color: t.color,
        emoji: t.emoji,
        customColor: t.customColor,
        customEffect: t.customEffect,
        customSkin: t.customSkin,
        chosenUpgradePath: t.chosenUpgradePath,
        upgradePurchased: t.upgradePurchased ? [...t.upgradePurchased] : [],
        shotCount: t.shotCount,
        // upgrade path flags
        upgradePath_splash: t.upgradePath_splash,
        upgradePath_splashRadius: t.upgradePath_splashRadius,
        upgradePath_burn: t.upgradePath_burn,
        upgradePath_burnDuration: t.upgradePath_burnDuration,
        upgradePath_poison: t.upgradePath_poison,
        upgradePath_deepPoison: t.upgradePath_deepPoison,
        upgradePath_armorBreak: t.upgradePath_armorBreak,
        upgradePath_slow: t.upgradePath_slow,
        upgradePath_slowDuration: t.upgradePath_slowDuration,
        upgradePath_freeze: t.upgradePath_freeze,
        upgradePath_freezeDuration: t.upgradePath_freezeDuration,
        upgradePath_chain: t.upgradePath_chain,
        upgradePath_pierce: t.upgradePath_pierce,
        upgradePath_trishot: t.upgradePath_trishot,
        upgradePath_multishot: t.upgradePath_multishot,
        upgradePath_slowField: t.upgradePath_slowField,
        upgradePath_aoeSlowField: t.upgradePath_aoeSlowField,
      })),
      towerMap: [...state.towerMap.entries()],
      // Perks & upgrades
      perksOwned: state.perksOwned,
      forgeRanks: state.forgeRanks,
      unlockedTowers: state.unlockedTowers,
      unlockedSkills: state.unlockedSkills,
      unlockedAbilities: state.unlockedAbilities,
      skillPoints: state.skillPoints,
      gloryPoints: state.gloryPoints,
      // Achievements
      unlockedAchievements: state.unlockedAchievements,
      seenEnemies: [...state.seenEnemies],
      // Perk multipliers
      perkMult: state.perkMult,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    return false;
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const save = JSON.parse(raw);
    if (!save || save.version !== 1) return null;
    // Restore Set types
    save.seenEnemies = new Set(save.seenEnemies || []);
    save.towers = save.towers.map(t => ({
      ...t,
      upgradePurchased: t.upgradePurchased ? new Set(t.upgradePurchased) : new Set(),
      lastFire: 0,
    }));
    save.towerMap = new Map(save.towerMap || []);
    return save;
  } catch (e) {
    console.error('Load failed:', e);
    return null;
  }
}

export function hasSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const save = JSON.parse(raw);
    return save && save.version === 1;
  } catch {
    return false;
  }
}

export function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function getSaveSummary() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const save = JSON.parse(raw);
    if (!save) return null;
    return {
      wave: save.wave,
      score: save.score,
      character: save.selectedCharacter,
      savedAt: save.savedAt,
      difficulty: save.difficulty,
    };
  } catch {
    return null;
  }
}