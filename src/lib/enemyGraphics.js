/**
 * enemyGraphics.js
 * Draws simple 3D-style canvas graphics for each enemy type.
 * Each function draws centered at (0,0) — caller must translate/save/restore.
 */

const S = 18; // base size unit

function sphere(ctx, r, color, highlight = "#ffffff") {
  const grad = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.05, 0, 0, r);
  grad.addColorStop(0, highlight);
  grad.addColorStop(0.4, color);
  grad.addColorStop(1, shadeColor(color, -55));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
}

function ellipsoid(ctx, rx, ry, color, highlight = "#ffffff") {
  ctx.save();
  ctx.scale(rx / ry, 1);
  sphere(ctx, ry, color, highlight);
  ctx.restore();
}

function shadeColor(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function drawBody(ctx, w, h, color) {
  const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
  grad.addColorStop(0, shadeColor(color, 60));
  grad.addColorStop(0.5, color);
  grad.addColorStop(1, shadeColor(color, -60));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, 4);
  ctx.fill();
  // highlight strip
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.beginPath();
  ctx.roundRect(-w / 2 + 2, -h / 2 + 2, w * 0.35, h - 4, 3);
  ctx.fill();
}

// ── Enemy draw functions ──────────────────────────────────────────────────────

export function drawPeasant(ctx) {
  // Brown rounded body, tan head
  drawBody(ctx, S * 1.1, S * 1.2, "#8B5E3C");
  // head
  sphere(ctx, S * 0.55, "#D4A76A", "#ffe5b8");
  ctx.translate(0, -S * 0.3);
  // hat
  ctx.fillStyle = "#5C3A1E";
  ctx.beginPath();
  ctx.ellipse(0, -S * 0.5, S * 0.6, S * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#5C3A1E";
  ctx.beginPath();
  ctx.roundRect(-S * 0.25, -S * 0.85, S * 0.5, S * 0.4, 4);
  ctx.fill();
}

export function drawSoldier(ctx) {
  // Silver armor body
  drawBody(ctx, S * 1.2, S * 1.3, "#8090a0");
  sphere(ctx, S * 0.52, "#8090a0", "#c8d8e8");
  ctx.translate(0, -S * 0.3);
  // helmet
  ctx.fillStyle = "#607080";
  ctx.beginPath();
  ctx.arc(0, -S * 0.52, S * 0.55, Math.PI, 0);
  ctx.fill();
  // visor slit
  ctx.fillStyle = "#2a3540";
  ctx.fillRect(-S * 0.3, -S * 0.55, S * 0.6, S * 0.14);
  // sword
  ctx.save();
  ctx.rotate(0.4);
  ctx.fillStyle = "#b0c8d8";
  ctx.fillRect(S * 0.6, -S * 0.8, S * 0.14, S * 1.1);
  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(S * 0.45, -S * 0.05, S * 0.44, S * 0.14);
  ctx.restore();
}

export function drawKnight(ctx) {
  // Heavy armored — dark steel
  drawBody(ctx, S * 1.4, S * 1.5, "#556070");
  sphere(ctx, S * 0.58, "#556070", "#8ba0b0");
  ctx.translate(0, -S * 0.35);
  // great helm
  ctx.fillStyle = "#445060";
  ctx.beginPath();
  ctx.arc(0, -S * 0.55, S * 0.62, Math.PI, 0);
  ctx.fill();
  ctx.fillRect(-S * 0.62, -S * 0.55, S * 1.24, S * 0.28);
  // narrow eye slot
  ctx.fillStyle = "#ff6600";
  ctx.fillRect(-S * 0.35, -S * 0.52, S * 0.7, S * 0.1);
  // shield
  ctx.save();
  ctx.translate(-S * 0.75, 0);
  ctx.fillStyle = "#c0392b";
  ctx.beginPath();
  ctx.moveTo(-S * 0.3, -S * 0.45);
  ctx.lineTo(S * 0.3, -S * 0.45);
  ctx.lineTo(S * 0.3, S * 0.2);
  ctx.lineTo(0, S * 0.5);
  ctx.lineTo(-S * 0.3, S * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#ffd60a";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

export function drawHorseman(ctx) {
  // Horse body (light brown ellipse)
  ctx.save();
  ctx.translate(0, S * 0.35);
  ellipsoid(ctx, S * 1.5, S * 0.85, "#c49a6c", "#e8c89a");
  ctx.restore();
  // legs
  ctx.fillStyle = shadeColor("#c49a6c", -40);
  for (let i = -1; i <= 1; i += 2) {
    ctx.fillRect(i * S * 0.55, S * 0.55, S * 0.22, S * 0.55);
  }
  // rider head
  ctx.translate(S * 0.15, -S * 0.25);
  sphere(ctx, S * 0.44, "#D4A76A", "#ffe5b8");
  // rider helm
  ctx.fillStyle = "#607080";
  ctx.beginPath();
  ctx.arc(0, -S * 0.42, S * 0.46, Math.PI, 0);
  ctx.fill();
}

export function drawSkeleton(ctx) {
  // Bone-white boxy body
  drawBody(ctx, S * 0.95, S * 1.2, "#e8e0d0");
  // Rib lines
  ctx.strokeStyle = "#b0a898";
  ctx.lineWidth = 1;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(-S * 0.35, i * S * 0.18);
    ctx.lineTo(S * 0.35, i * S * 0.18);
    ctx.stroke();
  }
  // Skull
  ctx.translate(0, -S * 0.45);
  sphere(ctx, S * 0.52, "#e8e4dc", "#ffffff");
  // eye sockets
  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.arc(-S * 0.18, -S * 0.08, S * 0.14, 0, Math.PI * 2);
  ctx.arc(S * 0.18, -S * 0.08, S * 0.14, 0, Math.PI * 2);
  ctx.fill();
  // teeth
  ctx.fillStyle = "#ffffff";
  for (let i = -1; i <= 1; i++) {
    ctx.fillRect(i * S * 0.18 - S * 0.06, S * 0.25, S * 0.12, S * 0.16);
  }
}

export function drawWraith(ctx) {
  // Ghostly translucent swirling form
  ctx.save();
  ctx.globalAlpha = 0.85;
  // Body swirl
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 1.1);
  grad.addColorStop(0, "#c084fc");
  grad.addColorStop(0.6, "#7c3aed88");
  grad.addColorStop(1, "#7c3aed00");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(0, S * 0.2, S * 0.7, S * 1.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
  // Face
  ctx.translate(0, -S * 0.15);
  sphere(ctx, S * 0.5, "#e9d5ff", "#ffffff");
  // hollow eyes
  ctx.fillStyle = "#4c1d95";
  ctx.beginPath();
  ctx.arc(-S * 0.17, -S * 0.08, S * 0.13, 0, Math.PI * 2);
  ctx.arc(S * 0.17, -S * 0.08, S * 0.13, 0, Math.PI * 2);
  ctx.fill();
}

export function drawNecromancer(ctx) {
  // Dark robe
  ctx.fillStyle = "#2d1b4e";
  ctx.beginPath();
  ctx.moveTo(-S * 0.65, S * 0.7);
  ctx.lineTo(S * 0.65, S * 0.7);
  ctx.lineTo(S * 0.45, -S * 0.4);
  ctx.lineTo(-S * 0.45, -S * 0.4);
  ctx.closePath();
  ctx.fill();
  // robe highlight
  ctx.fillStyle = "rgba(139,92,246,0.25)";
  ctx.beginPath();
  ctx.moveTo(-S * 0.2, S * 0.7);
  ctx.lineTo(-S * 0.05, -S * 0.4);
  ctx.lineTo(S * 0.05, -S * 0.4);
  ctx.lineTo(S * 0.2, S * 0.7);
  ctx.closePath();
  ctx.fill();
  // head
  ctx.translate(0, -S * 0.42);
  sphere(ctx, S * 0.5, "#c4a882", "#ffe5b8");
  // pointed hood
  ctx.fillStyle = "#1e0a3e";
  ctx.beginPath();
  ctx.moveTo(-S * 0.55, S * 0.1);
  ctx.lineTo(S * 0.55, S * 0.1);
  ctx.lineTo(0, -S * 1.0);
  ctx.closePath();
  ctx.fill();
  // glowing staff orb
  ctx.save();
  ctx.translate(S * 0.75, S * 0.5);
  const orbGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 0.3);
  orbGrad.addColorStop(0, "#ffffff");
  orbGrad.addColorStop(0.4, "#a855f7");
  orbGrad.addColorStop(1, "#4c1d9500");
  ctx.fillStyle = orbGrad;
  ctx.beginPath();
  ctx.arc(0, 0, S * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawKing(ctx) {
  // Royal purple robe
  drawBody(ctx, S * 1.3, S * 1.5, "#5b21b6");
  // gold trim
  ctx.strokeStyle = "#ffd60a";
  ctx.lineWidth = 2;
  ctx.strokeRect(-S * 0.65, -S * 0.75, S * 1.3, S * 1.5);
  // head
  ctx.translate(0, -S * 0.55);
  sphere(ctx, S * 0.55, "#d4a76a", "#ffe5b8");
  // crown
  ctx.fillStyle = "#ffd60a";
  ctx.beginPath();
  ctx.rect(-S * 0.55, -S * 0.55, S * 1.1, S * 0.3);
  ctx.fill();
  // crown points
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * S * 0.38 - S * 0.15, -S * 0.55);
    ctx.lineTo(i * S * 0.38, -S * 0.9);
    ctx.lineTo(i * S * 0.38 + S * 0.15, -S * 0.55);
    ctx.fill();
  }
  // gems
  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.arc(0, -S * 0.62, S * 0.1, 0, Math.PI * 2);
  ctx.fill();
}

export function drawDemon(ctx) {
  drawBody(ctx, S * 1.3, S * 1.5, "#7f1d1d");
  // shoulder spikes
  ctx.fillStyle = "#991b1b";
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * S * 0.65, -S * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, -S * 0.5);
    ctx.lineTo(-i * S * 0.2, S * 0.2);
    ctx.lineTo(i * S * 0.2, S * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // head
  ctx.translate(0, -S * 0.55);
  sphere(ctx, S * 0.57, "#991b1b", "#ef4444");
  // horns
  ctx.fillStyle = "#450a0a";
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * S * 0.3, -S * 0.45);
    ctx.rotate(i * 0.5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-i * S * 0.15, -S * 0.55);
    ctx.lineTo(i * S * 0.08, -S * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // eyes
  ctx.fillStyle = "#ffd60a";
  ctx.beginPath();
  ctx.ellipse(-S * 0.2, -S * 0.05, S * 0.14, S * 0.1, 0, 0, Math.PI * 2);
  ctx.ellipse(S * 0.2, -S * 0.05, S * 0.14, S * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function drawGolem(ctx) {
  // Rock-grey blocky body
  drawBody(ctx, S * 1.7, S * 1.8, "#6b7280");
  // Rock texture cracks
  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-S * 0.5, -S * 0.4);
  ctx.lineTo(S * 0.1, S * 0.2);
  ctx.lineTo(S * 0.55, -S * 0.1);
  ctx.stroke();
  // head boulder
  ctx.translate(0, -S * 0.62);
  sphere(ctx, S * 0.65, "#6b7280", "#9ca3af");
  // glowing eyes
  ctx.fillStyle = "#f97316";
  ctx.shadowColor = "#f97316";
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(-S * 0.22, -S * 0.08, S * 0.14, 0, Math.PI * 2);
  ctx.arc(S * 0.22, -S * 0.08, S * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function drawLavaSpawn(ctx) {
  // Lava blob
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 1.05);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.25, "#fbbf24");
  grad.addColorStop(0.6, "#f97316");
  grad.addColorStop(1, "#7f1d1d");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, S * 1.05, 0, Math.PI * 2);
  ctx.fill();
  // cracks of lava
  ctx.strokeStyle = "#ffd60a";
  ctx.lineWidth = 1.5;
  ctx.shadowColor = "#fbbf24";
  ctx.shadowBlur = 6;
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(a) * S * 0.8, Math.sin(a) * S * 0.8);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
}

export function drawFiredrake(ctx) {
  // Dragon body
  ellipsoid(ctx, S * 1.5, S * 0.9, "#b91c1c", "#ef4444");
  // Wings
  ctx.fillStyle = "#7f1d1d99";
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * S * 0.4, -S * 0.2);
    ctx.rotate(i * 0.5);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(i * S * 1.1, -S * 0.7);
    ctx.lineTo(i * S * 0.9, S * 0.4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // Head
  ctx.save();
  ctx.translate(S * 0.85, -S * 0.2);
  sphere(ctx, S * 0.45, "#dc2626", "#f87171");
  // snout
  ctx.fillStyle = "#b91c1c";
  ctx.beginPath();
  ctx.ellipse(S * 0.35, S * 0.05, S * 0.35, S * 0.2, 0.3, 0, Math.PI * 2);
  ctx.fill();
  // eye
  ctx.fillStyle = "#ffd60a";
  ctx.shadowColor = "#ffd60a";
  ctx.shadowBlur = 5;
  ctx.beginPath();
  ctx.arc(S * 0.1, -S * 0.12, S * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

export function drawSpecter(ctx) {
  // Wispy ghost form
  ctx.save();
  ctx.globalAlpha = 0.8;
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, S * 1.0);
  grad.addColorStop(0, "#e0f2fe");
  grad.addColorStop(0.5, "#7dd3fc88");
  grad.addColorStop(1, "#0ea5e900");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, S * 1.0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.restore();
  // Face
  sphere(ctx, S * 0.46, "#bae6fd", "#ffffff");
  ctx.fillStyle = "#0c4a6e";
  ctx.beginPath();
  ctx.arc(-S * 0.15, -S * 0.05, S * 0.12, 0, Math.PI * 2);
  ctx.arc(S * 0.15, -S * 0.05, S * 0.12, 0, Math.PI * 2);
  ctx.fill();
}

export function drawShadow(ctx) {
  // Dark void sphere
  const grad = ctx.createRadialGradient(-S * 0.25, -S * 0.25, 0, 0, 0, S * 1.05);
  grad.addColorStop(0, "#6d28d9");
  grad.addColorStop(0.5, "#1e0a3e");
  grad.addColorStop(1, "#000000");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, S * 1.05, 0, Math.PI * 2);
  ctx.fill();
  // void eyes
  ctx.fillStyle = "#a855f7";
  ctx.shadowColor = "#a855f7";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(-S * 0.22, -S * 0.1, S * 0.15, 0, Math.PI * 2);
  ctx.arc(S * 0.22, -S * 0.1, S * 0.15, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function drawFrostGiant(ctx) {
  // Huge icy blue body
  drawBody(ctx, S * 1.8, S * 2.1, "#1e40af");
  // ice shards on body
  ctx.fillStyle = "#bfdbfe";
  for (let i = -1; i <= 1; i += 1) {
    ctx.save();
    ctx.translate(i * S * 0.55, -S * 0.2);
    ctx.beginPath();
    ctx.moveTo(0, -S * 0.4);
    ctx.lineTo(-S * 0.12, S * 0.1);
    ctx.lineTo(S * 0.12, S * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  // head
  ctx.translate(0, -S * 0.8);
  sphere(ctx, S * 0.65, "#1d4ed8", "#93c5fd");
  // icy brow
  ctx.fillStyle = "#93c5fd";
  ctx.fillRect(-S * 0.55, -S * 0.4, S * 1.1, S * 0.18);
  ctx.fillStyle = "#1e3a8a";
  ctx.beginPath();
  ctx.ellipse(-S * 0.22, -S * 0.08, S * 0.16, S * 0.11, 0, 0, Math.PI * 2);
  ctx.ellipse(S * 0.22, -S * 0.08, S * 0.16, S * 0.11, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function drawIceWalker(ctx) {
  // Crystal body
  ctx.save();
  ctx.rotate(Math.PI / 6);
  drawBody(ctx, S * 0.9, S * 1.3, "#38bdf8");
  ctx.restore();
  // head sphere
  ctx.translate(0, -S * 0.45);
  sphere(ctx, S * 0.5, "#7dd3fc", "#e0f2fe");
  // shard antennae
  ctx.fillStyle = "#bae6fd";
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * S * 0.2, -S * 0.42);
    ctx.rotate(i * 0.4);
    ctx.fillRect(-S * 0.06, -S * 0.45, S * 0.12, S * 0.45);
    ctx.restore();
  }
}

export function drawVoidling(ctx) {
  // Swirling dark orb
  const grad = ctx.createRadialGradient(-S * 0.2, -S * 0.2, 0, 0, 0, S);
  grad.addColorStop(0, "#a855f7");
  grad.addColorStop(0.45, "#4c1d95");
  grad.addColorStop(1, "#000000");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, S, 0, Math.PI * 2);
  ctx.fill();
  // orbiting rings
  ctx.save();
  ctx.strokeStyle = "#c084fc";
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.ellipse(0, 0, S * 1.2, S * 0.35, performance.now() * 0.001, 0, Math.PI * 2);
  ctx.stroke();
  ctx.globalAlpha = 1;
  ctx.restore();
  // core eye
  ctx.fillStyle = "#ffd60a";
  ctx.shadowColor = "#ffd60a";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(0, 0, S * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function drawSoulReaper(ctx) {
  // Dark robed specter with scythe
  ctx.fillStyle = "#1c1917";
  ctx.beginPath();
  ctx.moveTo(-S * 0.7, S * 0.8);
  ctx.lineTo(S * 0.7, S * 0.8);
  ctx.lineTo(S * 0.5, -S * 0.5);
  ctx.lineTo(-S * 0.5, -S * 0.5);
  ctx.closePath();
  ctx.fill();
  // robe gradient
  ctx.fillStyle = "rgba(76,29,149,0.3)";
  ctx.beginPath();
  ctx.moveTo(0, S * 0.8);
  ctx.lineTo(S * 0.2, -S * 0.5);
  ctx.lineTo(-S * 0.2, -S * 0.5);
  ctx.closePath();
  ctx.fill();
  // skull head
  ctx.translate(0, -S * 0.6);
  sphere(ctx, S * 0.52, "#e8e4dc", "#ffffff");
  ctx.fillStyle = "#1a1a2e";
  ctx.beginPath();
  ctx.arc(-S * 0.18, -S * 0.06, S * 0.13, 0, Math.PI * 2);
  ctx.arc(S * 0.18, -S * 0.06, S * 0.13, 0, Math.PI * 2);
  ctx.fill();
  // scythe
  ctx.save();
  ctx.translate(S * 0.75, S * 0.6);
  ctx.strokeStyle = "#6b7280";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -S * 1.4);
  ctx.lineTo(0, S * 0.2);
  ctx.stroke();
  ctx.fillStyle = "#9ca3af";
  ctx.beginPath();
  ctx.moveTo(0, -S * 1.4);
  ctx.quadraticCurveTo(S * 0.9, -S * 1.2, S * 0.6, -S * 0.6);
  ctx.lineTo(0, -S * 0.9);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function drawDoomKnight(ctx) {
  // Massive black armor
  drawBody(ctx, S * 1.5, S * 1.7, "#111827");
  // red glowing runes
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 1;
  ctx.shadowColor = "#ef4444";
  ctx.shadowBlur = 6;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * S * 0.35, -S * 0.5);
    ctx.lineTo(i * S * 0.2, S * 0.5);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  // head
  ctx.translate(0, -S * 0.65);
  sphere(ctx, S * 0.6, "#1f2937", "#374151");
  // visor
  ctx.fillStyle = "#ef4444";
  ctx.shadowColor = "#ef4444";
  ctx.shadowBlur = 8;
  ctx.fillRect(-S * 0.38, -S * 0.08, S * 0.76, S * 0.14);
  ctx.shadowBlur = 0;
  // horns
  ctx.fillStyle = "#ef4444";
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * S * 0.32, -S * 0.48);
    ctx.rotate(i * 0.4);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(i * S * 0.18, -S * 0.55);
    ctx.lineTo(i * S * 0.05, S * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export function drawAbyssLord(ctx) {
  // Massive dark void entity
  const grad = ctx.createRadialGradient(-S * 0.3, -S * 0.3, 0, 0, 0, S * 1.2);
  grad.addColorStop(0, "#7c3aed");
  grad.addColorStop(0.4, "#2e1065");
  grad.addColorStop(1, "#000000");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, S * 1.2, 0, Math.PI * 2);
  ctx.fill();
  // tentacles
  ctx.strokeStyle = "#4c1d95";
  ctx.lineWidth = 3;
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * S * 0.6, Math.sin(a) * S * 0.6);
    ctx.quadraticCurveTo(
      Math.cos(a + 0.8) * S * 1.3, Math.sin(a + 0.8) * S * 1.3,
      Math.cos(a + 1.2) * S * 1.6, Math.sin(a + 1.2) * S * 1.6
    );
    ctx.stroke();
  }
  // single large eye
  ctx.fillStyle = "#ffd60a";
  ctx.shadowColor = "#ffd60a";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.ellipse(0, 0, S * 0.35, S * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1a0a00";
  ctx.beginPath();
  ctx.ellipse(0, 0, S * 0.15, S * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

// ── Boss draw functions (larger, more dramatic) ───────────────────────────────

export function drawBossMeadow(ctx) {
  // Forest Drake — large green dragon
  ellipsoid(ctx, S * 2.0, S * 1.2, "#15803d", "#4ade80");
  // wings
  ctx.fillStyle = "#166534aa";
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * S * 0.5, -S * 0.5);
    ctx.rotate(i * 0.7);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(i * S * 1.6, -S * 1.1);
    ctx.lineTo(i * S * 1.3, S * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.save();
  ctx.translate(S * 1.2, -S * 0.35);
  sphere(ctx, S * 0.72, "#16a34a", "#86efac");
  ctx.fillStyle = "#ffd60a";
  ctx.shadowColor = "#ffd60a";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(-S * 0.15, -S * 0.15, S * 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();
}

export function drawBossDungeon(ctx) {
  // Dungeon Overlord — giant zombie king
  drawBody(ctx, S * 2.0, S * 2.5, "#3d2c1e");
  ctx.strokeStyle = "#6b4c2a";
  ctx.lineWidth = 2;
  for (let i = -2; i <= 2; i++) {
    ctx.beginPath();
    ctx.moveTo(-S * 0.8, i * S * 0.4);
    ctx.lineTo(S * 0.8, i * S * 0.4);
    ctx.stroke();
  }
  ctx.translate(0, -S * 0.95);
  sphere(ctx, S * 0.78, "#2d1a0e", "#5c3a1e");
  ctx.fillStyle = "#ef4444";
  ctx.shadowColor = "#ef4444";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.ellipse(-S * 0.28, -S * 0.1, S * 0.2, S * 0.14, 0, 0, Math.PI * 2);
  ctx.ellipse(S * 0.28, -S * 0.1, S * 0.2, S * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  // crown
  ctx.fillStyle = "#7c3aed";
  ctx.beginPath();
  ctx.rect(-S * 0.7, -S * 0.68, S * 1.4, S * 0.28);
  ctx.fill();
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * S * 0.45 - S * 0.15, -S * 0.68);
    ctx.lineTo(i * S * 0.45, -S * 1.05);
    ctx.lineTo(i * S * 0.45 + S * 0.15, -S * 0.68);
    ctx.fill();
  }
}

export function drawBossVolcano(ctx) {
  // Flame Titan — huge lava giant
  drawBody(ctx, S * 2.2, S * 2.8, "#7f1d1d");
  // lava cracks
  ctx.strokeStyle = "#fbbf24";
  ctx.lineWidth = 2;
  ctx.shadowColor = "#fbbf24";
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.moveTo(-S * 0.6, -S * 0.8);
  ctx.lineTo(S * 0.2, S * 0.3);
  ctx.lineTo(S * 0.7, -S * 0.5);
  ctx.stroke();
  ctx.shadowBlur = 0;
  // head
  ctx.translate(0, -S * 1.1);
  sphere(ctx, S * 0.85, "#991b1b", "#f87171");
  // lava eyes
  ctx.fillStyle = "#fbbf24";
  ctx.shadowColor = "#fbbf24";
  ctx.shadowBlur = 14;
  ctx.beginPath();
  ctx.arc(-S * 0.3, -S * 0.12, S * 0.22, 0, Math.PI * 2);
  ctx.arc(S * 0.3, -S * 0.12, S * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  // horns
  ctx.fillStyle = "#450a0a";
  for (let i = -1; i <= 1; i += 2) {
    ctx.save();
    ctx.translate(i * S * 0.45, -S * 0.65);
    ctx.rotate(i * 0.45);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-i * S * 0.22, -S * 0.75);
    ctx.lineTo(i * S * 0.1, -S * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export function drawBossAbyss(ctx) {
  // Frost Colossus — crystalline ice giant
  drawBody(ctx, S * 2.4, S * 3.0, "#1e3a8a");
  // ice plates
  ctx.fillStyle = "#93c5fd44";
  for (let i = -1; i <= 1; i++) {
    ctx.save();
    ctx.translate(i * S * 0.8, -S * 0.4);
    ctx.rotate(i * 0.3);
    ctx.beginPath();
    ctx.moveTo(0, -S * 0.7);
    ctx.lineTo(-S * 0.25, S * 0.3);
    ctx.lineTo(S * 0.25, S * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.translate(0, -S * 1.2);
  sphere(ctx, S * 0.88, "#1d4ed8", "#93c5fd");
  ctx.fillStyle = "#bfdbfe";
  ctx.fillRect(-S * 0.78, -S * 0.45, S * 1.56, S * 0.2);
  ctx.fillStyle = "#1e3a8a";
  ctx.beginPath();
  ctx.ellipse(-S * 0.3, -S * 0.12, S * 0.22, S * 0.15, 0, 0, Math.PI * 2);
  ctx.ellipse(S * 0.3, -S * 0.12, S * 0.22, S * 0.15, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function drawBossShadow(ctx) {
  // Shadow Sovereign — cosmic void entity
  const grad = ctx.createRadialGradient(-S * 0.4, -S * 0.4, 0, 0, 0, S * 1.6);
  grad.addColorStop(0, "#7c3aed");
  grad.addColorStop(0.35, "#1e0a3e");
  grad.addColorStop(1, "#000000");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, S * 1.6, 0, Math.PI * 2);
  ctx.fill();
  // void tendrils
  ctx.strokeStyle = "#6d28d9";
  ctx.lineWidth = 3;
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * S * 0.8, Math.sin(a) * S * 0.8);
    ctx.quadraticCurveTo(
      Math.cos(a + 0.6) * S * 1.5, Math.sin(a + 0.6) * S * 1.5,
      Math.cos(a + 1.0) * S * 2.1, Math.sin(a + 1.0) * S * 2.1
    );
    ctx.stroke();
  }
  // three eyes
  ctx.fillStyle = "#ffd60a";
  ctx.shadowColor = "#ffd60a";
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(0, -S * 0.2, S * 0.3, 0, Math.PI * 2);
  ctx.arc(-S * 0.5, S * 0.3, S * 0.18, 0, Math.PI * 2);
  ctx.arc(S * 0.5, S * 0.3, S * 0.18, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
}

// Generic boss fallback — dramatic skull
export function drawGenericBoss(ctx, color = "#ef4444") {
  sphere(ctx, S * 1.5, color, "#ffffff");
  ctx.fillStyle = "#000000aa";
  ctx.beginPath();
  ctx.arc(-S * 0.45, -S * 0.2, S * 0.32, 0, Math.PI * 2);
  ctx.arc(S * 0.45, -S * 0.2, S * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  for (let i = -1; i <= 1; i++) {
    ctx.fillRect(i * S * 0.35 - S * 0.1, S * 0.3, S * 0.2, S * 0.35);
  }
}

// ── Master draw dispatcher ───────────────────────────────────────────────────

const DRAW_MAP = {
  peasant:     drawPeasant,
  soldier:     drawSoldier,
  knight:      drawKnight,
  horseman:    drawHorseman,
  skeleton:    drawSkeleton,
  wraith:      drawWraith,
  necromancer: drawNecromancer,
  king:        drawKing,
  demon:       drawDemon,
  golem:       drawGolem,
  lavaSpawn:   drawLavaSpawn,
  firedrake:   drawFiredrake,
  specter:     drawSpecter,
  shadow:      drawShadow,
  frostGiant:  drawFrostGiant,
  iceWalker:   drawIceWalker,
  voidling:    drawVoidling,
  soulReaper:  drawSoulReaper,
  doomKnight:  drawDoomKnight,
  abyssLord:   drawAbyssLord,
  boss_meadow:  drawBossMeadow,
  boss_dungeon: drawBossDungeon,
  boss_volcano: drawBossVolcano,
  boss_abyss:   drawBossAbyss,
  boss_shadow:  drawBossShadow,
};

export function drawEnemyGraphic(ctx, type, isBoss) {
  const fn = DRAW_MAP[type];
  if (fn) {
    fn(ctx);
  } else if (isBoss) {
    drawGenericBoss(ctx);
  } else {
    // Fallback: colored sphere
    sphere(ctx, S * 0.8, "#6b7280", "#9ca3af");
  }
}