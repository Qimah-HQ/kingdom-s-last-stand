// Web Audio API sound effects — no external dependencies

let ctx = null;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function playTone({ frequency = 440, type = "sine", duration = 0.1, gain = 0.3, decay = true, detune = 0 }) {
  const ac = getCtx();
  const osc = ac.createOscillator();
  const gainNode = ac.createGain();

  osc.connect(gainNode);
  gainNode.connect(ac.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ac.currentTime);
  if (detune) osc.detune.setValueAtTime(detune, ac.currentTime);
  gainNode.gain.setValueAtTime(gain, ac.currentTime);
  if (decay) gainNode.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

  osc.start(ac.currentTime);
  osc.stop(ac.currentTime + duration);
}

export function playKillSound() {
  // Quick satisfying pop
  playTone({ frequency: 320, type: "square", duration: 0.07, gain: 0.18, detune: 0 });
  setTimeout(() => playTone({ frequency: 500, type: "sine", duration: 0.06, gain: 0.12 }), 30);
}

export function playDamageSound() {
  // Low thud / grunt
  playTone({ frequency: 90, type: "sawtooth", duration: 0.15, gain: 0.4 });
  setTimeout(() => playTone({ frequency: 60, type: "sine", duration: 0.2, gain: 0.25 }), 20);
}

export function playWaveSuccessSound() {
  // Triumphant fanfare arpeggio
  const notes = [523, 659, 784, 1047];
  notes.forEach((freq, i) => {
    setTimeout(() => playTone({ frequency: freq, type: "sine", duration: 0.25, gain: 0.22 }), i * 110);
  });
}