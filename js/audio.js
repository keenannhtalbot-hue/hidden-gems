// Tiny audio engine — Web Audio API, lazy unlock on first user gesture
// Sounds are synthesized procedurally so the app ships zero audio assets

let ctx = null;
let enabled = true;

function ensureCtx() {
  if (!ctx) {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) ctx = new Ctx();
    } catch (e) {
      console.warn('AudioContext unavailable:', e.message);
    }
  }
  if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function setAudioEnabled(on) {
  enabled = !!on;
  if (enabled) ensureCtx();
}

export function play(name) {
  if (!enabled) return;
  const c = ensureCtx();
  if (!c) return;
  try {
    const now = c.currentTime;
    switch (name) {
      case 'tap':       beep(c, 800, 0.04, 'sine', 0.08); break;
      case 'pop':       beep(c, 1200, 0.08, 'triangle', 0.1, 0.05); break;
      case 'sparkle': {
        // Three quick rising tones — used on surprise reveal
        beep(c, 600,  0.06, 'sine', 0.1, 0);
        beep(c, 900,  0.06, 'sine', 0.1, 0.07);
        beep(c, 1400, 0.10, 'sine', 0.12, 0.14);
        break;
      }
      case 'chime':     beep(c, 1500, 0.18, 'sine', 0.16); break;
      case 'fanfare': {
        // Big "level up" sound
        beep(c, 523, 0.10, 'triangle', 0.18, 0);
        beep(c, 659, 0.10, 'triangle', 0.18, 0.10);
        beep(c, 784, 0.10, 'triangle', 0.18, 0.20);
        beep(c, 1047, 0.20, 'triangle', 0.22, 0.30);
        break;
      }
      case 'click':     beep(c, 400, 0.02, 'square', 0.06); break;
      case 'whoosh':    noise(c, 0.2, 0.08); break;
      case 'badge': {
        // Triangle chord arpeggio
        beep(c, 880, 0.08, 'sine', 0.12, 0);
        beep(c, 1108, 0.08, 'sine', 0.12, 0.08);
        beep(c, 1318, 0.16, 'sine', 0.16, 0.16);
        break;
      }
    }
  } catch (e) {
    console.warn('Audio play failed:', e.message);
  }
}

function beep(ctx, freq, dur, type = 'sine', gain = 0.1, offset = 0) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + offset);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + offset + 0.005);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(ctx.currentTime + offset);
  osc.stop(ctx.currentTime + offset + dur + 0.01);
}

function noise(ctx, dur, gain = 0.08) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(g).connect(ctx.destination);
  src.start();
}