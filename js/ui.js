// Cosmic UI helpers — toast, confetti, supernova, h()

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

export function confetti(opts = {}) {
  const colors = opts.colors || ['#FFD93D', '#FF6B6B', '#4ECDC4', '#A78BFA', '#F472B6', '#7dd3fc'];
  const count = opts.count || 40;
  const host = document.createElement('div');
  host.className = 'confetti-host';
  document.body.appendChild(host);
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = (50 + (Math.random() - 0.5) * 8) + '%';
    piece.style.top = '40%';
    piece.style.background = colors[i % colors.length];
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const distance = 200 + Math.random() * 280;
    piece.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
    piece.style.setProperty('--ty', (Math.sin(angle) * distance + 400) + 'px');
    piece.style.setProperty('--rot', (Math.random() * 1080 - 540) + 'deg');
    host.appendChild(piece);
  }
  setTimeout(() => host.remove(), 1600);
}

// Supernova burst — used for Legendary reveals
export function supernova() {
  const host = document.createElement('div');
  host.className = 'supernova-host';
  document.body.appendChild(host);
  // Flash
  const flash = document.createElement('div');
  flash.className = 'supernova-flash';
  host.appendChild(flash);
  // Rings
  for (let i = 0; i < 3; i++) {
    const ring = document.createElement('div');
    ring.className = 'supernova-ring';
    ring.style.animationDelay = (i * 200) + 'ms';
    host.appendChild(ring);
  }
  confetti({ count: 60 });
  setTimeout(() => host.remove(), 1400);
}

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

// Tiny haptic feedback (vibrate if available, otherwise no-op)
export function haptic(pattern = 10) {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try { navigator.vibrate(pattern); } catch {}
  }
}