// Pure falling leaves + birds + atmosphere - no SVG willow
// The PHOTO is the willow art. This just adds motion around it.

// Stub willow arch SVG (kept for compatibility — photo is the real art)
export function buildWillowArchSVG() {
  return `<svg viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"></svg>`;
}

export function buildDriftingLeaves(count = 80) {
  const leaves = [];
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const delay = -Math.random() * 20;
    const dur = 6 + Math.random() * 14;
    const size = 8 + Math.random() * 14;
    const op = 0.5 + Math.random() * 0.4;
    const rot = Math.random() * 360;
    const drift = (Math.random() - 0.5) * 80; // horizontal drift
    leaves.push(`<div class="drift-leaf" style="left:${left.toFixed(1)}%;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s;width:${size.toFixed(1)}px;height:${(size*1.8).toFixed(1)}px;opacity:${op.toFixed(2)};transform:rotate(${rot.toFixed(0)}deg);--drift:${drift}px;"></div>`);
  }
  return leaves.join('');
}

export function buildAtmosphereParticles(count = 50) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = -Math.random() * 25;
    const dur = 12 + Math.random() * 25;
    const size = 2 + Math.random() * 4;
    particles.push(`<div class="atmosphere-p" style="left:${left.toFixed(1)}%;top:${top.toFixed(1)}%;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;"></div>`);
  }
  return particles.join('');
}

export function buildBirds() {
  const birds = [];
  for (let i = 0; i < 5; i++) {
    const top = 5 + Math.random() * 25;
    const delay = i * 14 + Math.random() * 8;
    const dur = 35 + Math.random() * 25;
    birds.push(`<div class="bird" style="top:${top.toFixed(1)}%;animation-duration:${dur.toFixed(0)}s;animation-delay:${delay.toFixed(0)}s;">
      <svg viewBox="0 0 40 12" width="40" height="12">
        <path d="M 2 8 Q 8 2 14 6 Q 20 2 26 6 Q 32 2 38 8" stroke="#2d3a2e" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="1.2s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>`);
  }
  return birds.join('');
}
