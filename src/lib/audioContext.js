// Global mute state — simple module-level flag
let _muted = false;

export function isMuted() { return _muted; }
export function setMuted(val) { _muted = val; }
export function toggleMute() { _muted = !_muted; return _muted; }