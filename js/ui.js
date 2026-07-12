// UI helpers — toast, particles (theme-aware), serene text, h(), confetti, haptic

export function toast(msg, kind = 'info', dur = 3000) {
  const host = document.getElementById('toast-host');
  if (!host) return;
  const el = document.createElement('div');
  el.className = `toast ${kind}`;
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => {
    el.classList.add('leaving');
    setTimeout(() => el.remove(), 260);
  }, dur);
}

// Theme-aware particle system — replaces confetti for Legendary reveals
export function particles(opts = {}) {
  const theme = document.documentElement.getAttribute('data-theme') || 'willow';
  const shape = opts.shape || themeParticle(theme);
  const count = opts.count || 50;
  const color = opts.color || 'currentColor';
  const host = document.createElement('div');
  host.className = 'particle-host';
  document.body.appendChild(host);
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = `particle ${shape}`;
    if (shape === 'firefly') {
      piece.style.background = opts.color || '#f0d878';
      piece.style.color = opts.color || '#f0d878';
    }
    piece.style.left = (Math.random() * 100) + '%';
    piece.style.top = '-20px';
    const tx = (Math.random() - 0.5) * 200 + 'px';
    const ty = (window.innerHeight + 100) + 'px';
    const rot = (Math.random() * 720 - 360) + 'deg';
    piece.style.setProperty('--tx', tx);
    piece.style.setProperty('--ty', ty);
    piece.style.setProperty('--rot', rot);
    piece.style.animationDelay = (Math.random() * 800) + 'ms';
    piece.style.animationDuration = (3000 + Math.random() * 3000) + 'ms';
    host.appendChild(piece);
  }
  setTimeout(() => host.remove(), 6000);
}

function themeParticle(theme) {
  return {
    willow: 'willow',
    autumn: 'maple',
    blossom: 'petal',
    winter: 'snowflake',
    midnight: 'firefly'
  }[theme] || 'willow';
}

// Serene text — slides down from top for Legendary reveals
export function serene(text, color) {
  const el = document.createElement('div');
  el.className = 'serene-text';
  el.textContent = text;
  el.style.setProperty('--serene-color', color || 'var(--rarity-legendary)');
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// Keep old confetti for compatibility (uses particle system now)
export function confetti(opts = {}) {
  particles(opts);
}

// Soft haptic
export function haptic(pattern = 10) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch {}
  }
}

// h() helper
export function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k === 'dataset' && typeof v === 'object') Object.assign(el.dataset, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === 'html') el.innerHTML = v;
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  if (Array.isArray(children)) {
    for (const c of children) {
      if (c == null || c === false) continue;
      el.appendChild(typeof c === 'string' || typeof c === 'number' ? document.createTextNode(String(c)) : c);
    }
  } else if (children != null) {
    el.appendChild(typeof children === 'string' ? document.createTextNode(children) : children);
  }
  return el;
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}