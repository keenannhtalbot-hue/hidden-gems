// Builds a dense willow arch SVG with drooping branches + many leaves
// Like the reference photos — many drooping branches with leaves cascading down

export function buildWillowArchSVG() {
  const W = 1200;
  const H = 500;

  // Branches droop down from top with leaves
  const branches = [];
  const leafColors = ['#7a9573', '#8eaa85', '#a3b89c', '#c5d4b8', '#5a7355', '#6b8e7f'];

  // Generate 9 main branches
  const branchCount = 9;
  for (let i = 0; i < branchCount; i++) {
    const baseX = (W / (branchCount - 1)) * i;
    const branchClass = `branch b${(i % 5) + 1}`;
    let branchInner = '';

    // Each branch has 5-7 sub-branches drooping down with leaves
    const subBranches = 5 + Math.floor(Math.random() * 3);
    for (let j = 0; j < subBranches; j++) {
      const sx = baseX + (Math.random() - 0.5) * 60;
      const sy = Math.random() * 30;
      const len = 150 + Math.random() * 200;

      const ex = sx + (Math.random() - 0.5) * 70;
      const ey = sy + len;
      const cx = sx + (Math.random() - 0.5) * 30;
      const cy = sy + len * 0.5;

      branchInner += `<path d="M ${sx.toFixed(0)} ${sy.toFixed(0)} Q ${cx.toFixed(0)} ${cy.toFixed(0)} ${ex.toFixed(0)} ${ey.toFixed(0)}" stroke="#3d4f3d" stroke-width="2" fill="none" opacity="0.65" stroke-linecap="round"/>`;

      // Generate 10-15 leaves along this sub-branch
      const leavesOnSub = 10 + Math.floor(Math.random() * 6);
      for (let k = 0; k < leavesOnSub; k++) {
        const t = k / leavesOnSub;
        const x = (1-t)*(1-t)*sx + 2*(1-t)*t*cx + t*t*ex;
        const y = (1-t)*(1-t)*sy + 2*(1-t)*t*cy + t*t*ey;
        const ox = (Math.random() - 0.5) * 10;
        const oy = (Math.random() - 0.5) * 6;
        const color = leafColors[Math.floor(Math.random() * leafColors.length)];
        const size = 7 + Math.random() * 8;
        const rotation = -30 + Math.random() * 40;
        const opacity = 0.55 + Math.random() * 0.35;
        branchInner += `<ellipse cx="${(x+ox).toFixed(1)}" cy="${(y+oy).toFixed(1)}" rx="${(size/2).toFixed(1)}" ry="${size.toFixed(1)}" fill="${color}" opacity="${opacity.toFixed(2)}" transform="rotate(${rotation.toFixed(0)} ${(x+ox).toFixed(1)} ${(y+oy).toFixed(1)})"/>`;
      }
    }

    branches.push(`<g class="${branchClass}">${branchInner}</g>`);
  }

  // Trunk peeking at the very top
  const trunk = `<path d="M ${W/2-30} 0 L ${W/2-25} 60 L ${W/2-15} 60 L ${W/2-20} 0 Z" fill="#3d4f3d" opacity="0.85"/>`;

  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMin slice" xmlns="http://www.w3.org/2000/svg">${trunk}${branches.join('')}</svg>`;
}

// Build the drifting leaves layer (animated leaves falling)
export function buildDriftingLeaves() {
  const leaves = [];
  for (let i = 0; i < 25; i++) {
    const left = Math.random() * 100;
    const delay = -Math.random() * 15;  // negative delay so they start mid-cycle
    const dur = 8 + Math.random() * 8;
    leaves.push(`<div class="leaf" style="left:${left.toFixed(1)}%;animation-duration:${dur.toFixed(1)}s;animation-delay:${delay.toFixed(1)}s;"></div>`);
  }
  return leaves.join('');
}
