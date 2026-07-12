// Aggressive willow atmosphere — uses Izzy's photos as the central artwork
// and surrounds them with MOTION: many falling leaves, water reflections, particles

export function buildWillowArchSVG() {
  // The willow arch is a stylized watercolor silhouette overlay
  // Drawn at the top, arching down with leaves cascading
  const W = 1200;
  const H = 500;
  const leafColors = ['#7a9573', '#8eaa85', '#a3b89c', '#c5d4b8', '#5a7355', '#6b8e7f', '#9bb593'];

  // Generate many drooping branches
  const branches = [];

  // 14 main branches spread across the top
  const branchCount = 14;
  for (let i = 0; i < branchCount; i++) {
    const baseX = (W / (branchCount - 1)) * i;
    const branchClass = `branch b${(i % 5) + 1}`;
    let branchInner = '';

    // Each branch has 4-6 drooping sub-branches
    const subBranches = 4 + Math.floor(Math.random() * 3);
    for (let j = 0; j < subBranches; j++) {
      const sx = baseX + (Math.random() - 0.5) * 50;
      const sy = Math.random() * 20;
      const len = 180 + Math.random() * 220;
      const ex = sx + (Math.random() - 0.5) * 80;
      const ey = sy + len;
      const cx = sx + (Math.random() - 0.5) * 30;
      const cy = sy + len * 0.5;

      branchInner += `<path d="M ${sx.toFixed(0)} ${sy.toFixed(0)} Q ${cx.toFixed(0)} ${cy.toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}" stroke="#2d3a2e" stroke-width="2.2" fill="none" opacity="0.6" stroke-linecap="round"/>`;

      // 14-22 leaves along this sub-branch
      const leavesOnSub = 14 + Math.floor(Math.random() * 9);
      for (let k = 0; k < leavesOnSub; k++) {
        const t = k / leavesOnSub;
        const x = (1-t)*(1-t)*sx + 2*(1-t)*t*cx + t*t*ex;
        const y = (1-t)*(1-t)*sy + 2*(1-t)*t*cy + t*t*ey;
        const ox = (Math.random() - 0.5) * 12;
        const oy = (Math.random() - 0.5) * 8;
        const color = leafColors[Math.floor(Math.random() * leafColors.length)];
        const size = 7 + Math.random() * 9;
        const rotation = -40 + Math.random() * 50;
        const opacity = 0.55 + Math.random() * 0.4;
        branchInner += `<ellipse cx="${(x+ox).toFixed(1)}" cy="${(y+oy).toFixed(1)}" rx="${(size/2).toFixed(1)}" ry="${size.toFixed(1)}" fill="${color}" opacity="${opacity.toFixed(2)}" transform="rotate(${rotation.toFixed(0)} ${(x+ox).toFixed(1)} ${(y+oy).toFixed(1)})"/>`;
      }
    }

    branches.push(`<g class="${branchClass}">${branchInner}</g>`);
  }

  // Trunk at top center
  const trunk = `<path d="M ${W/2-30} 0 L ${W/2-25} 80 L ${W/2-15} 80 L ${W/2-20} 0 Z" fill="#2d3a2e" opacity="0.85"/>`;

  // Secondary trunk/branches
  const secondaryTrunk = `<path d="M ${W/2-150} 0 Q ${W/2-120} 30 ${W/2-80} 50" stroke="#3d4f3d" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>`;
  const secondaryTrunk2 = `<path d="M ${W/2+150} 0 Q ${W/2+120} 30 ${W/2+80} 50" stroke="#3d4f3d" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">${trunk}${secondaryTrunk}${secondaryTrunk2}${branches.join('')}</svg>`;
}

// Many drifting leaves
export function buildDriftingLeaves(count = 60) {
  const leaves = [];
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const delay = -Math.random() * 20;
    const dur = 8 + Math.random() * 14;
    const size = 6 + Math.random() * 8;
    const op = 0.4 + Math.random() * 0.5;
    const rot = Math.random() * 360;
    leaves.push(`<div class="drift-leaf" style="left:${left.toFixed(1)}%;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s;width:${size.toFixed(1)}px;height:${(size*1.6).toFixed(1)}px;opacity:${op.toFixed(2)};transform:rotate(${rot.toFixed(0)}deg);"></div>`);
  }
  return leaves.join('');
}

// Small floating particles for atmosphere (pollen, dust, light motes)
export function buildAtmosphereParticles(count = 40) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = -Math.random() * 20;
    const dur = 15 + Math.random() * 25;
    const size = 1 + Math.random() * 3;
    particles.push(`<div class="atmosphere-p" style="left:${left.toFixed(1)}%;top:${top.toFixed(1)}%;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s;width:${size.toFixed(1)}px;height:${size.toFixed(1)}px;"></div>`);
  }
  return particles.join('');
}

// Birds — small silhouettes drifting across
export function buildBirds() {
  const birds = [];
  for (let i = 0; i < 4; i++) {
    const top = 10 + Math.random() * 30;
    const delay = i * 18 + Math.random() * 10;
    birds.push(`<div class="bird" style="top:${top.toFixed(1)}%;animation-delay:${delay.toFixed(0)}s;">
      <svg viewBox="0 0 40 12" width="40" height="12">
        <path d="M 2 8 Q 8 2 14 6 Q 20 2 26 6 Q 32 2 38 8" stroke="#2d3a2e" stroke-width="1.5" fill="none" stroke-linecap="round" opacity="0.5">
          <animateTransform attributeName="transform" type="translate" values="0,0; 0,-3; 0,0" dur="1.2s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>`);
  }
  return birds.join('');
}