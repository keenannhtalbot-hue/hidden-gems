// Watercolor / hand-painted icon set — matches the willow scene aesthetic
// Style: ink outlines + watercolor fill washes + soft hand-drawn feel

export const ICONS = {
  // Brand mark — willow tree silhouette (watercolor)
  willow: (color = '#5a7355') => `<svg viewBox="0 0 64 64" fill="none">
    <defs>
      <radialGradient id="willow-leaf-fill">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0.3"/>
      </radialGradient>
      <filter id="willow-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="0.4"/>
      </filter>
    </defs>
    <!-- Trunk -->
    <path d="M30 56 Q 32 40 31 28 Q 30 18 33 8 Q 35 18 34 28 Q 35 40 34 56" fill="${color}" opacity="0.85" stroke="#3a4d3a" stroke-width="1" stroke-linejoin="round"/>
    <!-- Drooping branches -->
    <path d="M32 12 Q 18 18 12 32 M32 14 Q 14 20 6 38 M32 16 Q 20 22 16 40" stroke="${color}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.8"/>
    <path d="M32 12 Q 46 18 52 32 M32 14 Q 50 20 58 38 M32 16 Q 44 22 48 40" stroke="${color}" stroke-width="1.2" fill="none" stroke-linecap="round" opacity="0.8"/>
    <!-- Leaf clusters (watercolor wash) -->
    <ellipse cx="14" cy="32" rx="5" ry="9" fill="url(#willow-leaf-fill)" filter="url(#willow-soft)"/>
    <ellipse cx="8" cy="38" rx="4" ry="8" fill="url(#willow-leaf-fill)" filter="url(#willow-soft)"/>
    <ellipse cx="20" cy="42" rx="4" ry="7" fill="url(#willow-leaf-fill)" filter="url(#willow-soft)"/>
    <ellipse cx="50" cy="32" rx="5" ry="9" fill="url(#willow-leaf-fill)" filter="url(#willow-soft)"/>
    <ellipse cx="56" cy="38" rx="4" ry="8" fill="url(#willow-leaf-fill)" filter="url(#willow-soft)"/>
    <ellipse cx="44" cy="42" rx="4" ry="7" fill="url(#willow-leaf-fill)" filter="url(#willow-soft)"/>
    <!-- Individual leaves -->
    <path d="M14 28 Q 12 32 14 36" stroke="${color}" stroke-width="0.6" fill="none"/>
    <path d="M8 35 Q 6 39 8 43" stroke="${color}" stroke-width="0.6" fill="none"/>
    <path d="M50 28 Q 52 32 50 36" stroke="${color}" stroke-width="0.6" fill="none"/>
  </svg>`,

  // Wind gust (painted, brushstroke style)
  wind: (color = '#3a4d3a') => `<svg viewBox="0 0 64 64" fill="none">
    <path d="M6 22 Q 20 16 30 22 T 56 22" stroke="${color}" stroke-width="2.8" stroke-linecap="round" fill="none"/>
    <path d="M28 18 Q 32 14 38 18" stroke="${color}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M6 36 Q 22 30 36 36 T 58 36" stroke="${color}" stroke-width="2.8" stroke-linecap="round" fill="none"/>
    <path d="M40 32 Q 44 28 50 32" stroke="${color}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <path d="M6 50 Q 20 44 28 50 T 50 50" stroke="${color}" stroke-width="2.8" stroke-linecap="round" fill="none"/>
    <path d="M32 46 Q 36 42 42 46" stroke="${color}" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    <!-- Watercolor wash accents -->
    <ellipse cx="40" cy="22" rx="8" ry="2" fill="${color}" opacity="0.15"/>
    <ellipse cx="44" cy="36" rx="10" ry="2" fill="${color}" opacity="0.15"/>
    <ellipse cx="36" cy="50" rx="8" ry="2" fill="${color}" opacity="0.15"/>
  </svg>`,

  // Tab icons (painted)
  map: (color = '#3a4d3a') => `<svg viewBox="0 0 32 32" fill="none">
    <path d="M4 8 L 12 6 L 20 8 L 28 6 L 28 24 L 20 26 L 12 24 L 4 26 Z" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M12 6 L 12 24 M20 8 L 20 26" stroke="${color}" stroke-width="1.4" stroke-linecap="round"/>
    <!-- Watercolor wash -->
    <ellipse cx="16" cy="16" rx="14" ry="10" fill="${color}" opacity="0.06"/>
  </svg>`,

  plant: (color = '#3a4d3a') => `<svg viewBox="0 0 32 32" fill="none">
    <!-- Pot -->
    <path d="M10 22 L 11 28 L 21 28 L 22 22 Z" fill="${color}" fill-opacity="0.25" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
    <!-- Stem -->
    <path d="M16 22 Q 14 16 16 10 Q 18 16 16 22" fill="${color}" fill-opacity="0.4" stroke="${color}" stroke-width="1.4"/>
    <!-- Leaves -->
    <path d="M16 14 Q 8 12 6 6 Q 14 8 16 14 Z" fill="${color}" fill-opacity="0.5" stroke="${color}" stroke-width="1.3"/>
    <path d="M16 12 Q 24 10 26 4 Q 18 6 16 12 Z" fill="${color}" fill-opacity="0.5" stroke="${color}" stroke-width="1.3"/>
    <path d="M16 18 Q 10 18 8 14" stroke="${color}" stroke-width="1.2" fill="none"/>
  </svg>`,

  plus: (color = '#3a4d3a') => `<svg viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" fill="${color}" fill-opacity="0.12" stroke="${color}" stroke-width="1.8" stroke-dasharray="3 2"/>
    <path d="M16 8 L 16 24 M8 16 L 24 16" stroke="${color}" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`,

  chart: (color = '#3a4d3a') => `<svg viewBox="0 0 32 32" fill="none">
    <!-- Watercolor mountain chart -->
    <path d="M4 26 Q 8 12 12 18 Q 16 8 20 20 Q 24 14 28 22" stroke="${color}" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    <path d="M4 26 Q 8 12 12 18 Q 16 8 20 20 Q 24 14 28 22 L 28 28 L 4 28 Z" fill="${color}" fill-opacity="0.18"/>
    <!-- Watercolor wash -->
    <ellipse cx="16" cy="20" rx="14" ry="8" fill="${color}" opacity="0.06"/>
    <line x1="4" y1="28" x2="28" y2="28" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
  </svg>`,

  // Categories — hand-painted, each with watercolor fill
  fork: (color = '#c8623c') => `<svg viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="32" rx="26" ry="26" fill="${color}" fill-opacity="0.08"/>
    <path d="M22 10 L 22 32" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <path d="M22 10 Q 14 14 14 22 Q 14 30 22 32" stroke="${color}" stroke-width="3" fill="${color}" fill-opacity="0.15" stroke-linecap="round"/>
    <path d="M22 10 Q 30 14 30 22 Q 30 30 22 32" stroke="${color}" stroke-width="3" fill="${color}" fill-opacity="0.15" stroke-linecap="round"/>
    <path d="M22 32 L 22 56" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <path d="M44 10 Q 36 16 36 28 Q 36 40 44 50 L 44 10" stroke="${color}" stroke-width="3" fill="${color}" fill-opacity="0.15" stroke-linecap="round"/>
  </svg>`,

  brush: (color = '#6b8e7f') => `<svg viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="32" rx="26" ry="26" fill="${color}" fill-opacity="0.08"/>
    <!-- Brush handle -->
    <path d="M20 44 L 42 22 L 50 30 L 28 52" stroke="${color}" stroke-width="3" fill="${color}" fill-opacity="0.2" stroke-linejoin="round"/>
    <!-- Bristles -->
    <path d="M20 44 Q 14 48 12 56 Q 18 54 22 52 Q 18 50 20 44" stroke="${color}" stroke-width="2.5" fill="${color}" fill-opacity="0.4" stroke-linejoin="round"/>
    <!-- Ferrule -->
    <path d="M28 36 L 36 44" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <!-- Paint stroke -->
    <path d="M44 18 Q 52 14 56 8" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  eye: (color = '#d4a558') => `<svg viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="32" rx="26" ry="26" fill="${color}" fill-opacity="0.08"/>
    <!-- Eye outline -->
    <path d="M6 32 Q 18 16 32 16 Q 46 16 58 32 Q 46 48 32 48 Q 18 48 6 32 Z" stroke="${color}" stroke-width="2.8" fill="${color}" fill-opacity="0.15" stroke-linejoin="round"/>
    <!-- Iris -->
    <circle cx="32" cy="32" r="10" fill="${color}" fill-opacity="0.5"/>
    <circle cx="32" cy="32" r="10" stroke="${color}" stroke-width="2"/>
    <circle cx="32" cy="32" r="4" fill="white" opacity="0.6"/>
    <!-- Lash -->
    <path d="M28 24 L 32 20 L 36 24" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`,

  shop: (color = '#8b6e9b') => `<svg viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="32" rx="26" ry="26" fill="${color}" fill-opacity="0.08"/>
    <!-- Awning -->
    <path d="M8 24 L 12 12 L 52 12 L 56 24" stroke="${color}" stroke-width="2.8" fill="${color}" fill-opacity="0.25" stroke-linejoin="round"/>
    <!-- Shop body -->
    <path d="M10 24 L 10 52 L 54 52 L 54 24" stroke="${color}" stroke-width="2.8" fill="${color}" fill-opacity="0.15" stroke-linejoin="round"/>
    <!-- Awning stripes -->
    <path d="M16 12 L 14 24 M26 12 L 24 24 M36 12 L 36 24 M46 12 L 48 24" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
    <!-- Door -->
    <path d="M26 52 L 26 36 Q 26 32 32 32 Q 38 32 38 36 L 38 52" stroke="${color}" stroke-width="2.4" fill="${color}" fill-opacity="0.3"/>
  </svg>`,

  column: (color = '#a8606c') => `<svg viewBox="0 0 64 64" fill="none">
    <ellipse cx="32" cy="32" rx="26" ry="26" fill="${color}" fill-opacity="0.08"/>
    <!-- Greek temple / columns -->
    <path d="M8 14 L 56 14" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <path d="M8 54 L 56 54" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <!-- Roof triangle -->
    <path d="M8 14 L 32 4 L 56 14" stroke="${color}" stroke-width="2.8" fill="${color}" fill-opacity="0.25" stroke-linejoin="round"/>
    <!-- Columns (3) -->
    <path d="M16 14 L 16 54 M14 14 L 14 54 M18 14 L 18 54 M30 14 L 30 54 M28 14 L 28 54 M32 14 L 32 54 M44 14 L 44 54 M42 14 L 42 54 M46 14 L 46 54" stroke="${color}" stroke-width="1.8" stroke-linecap="round" opacity="0.85"/>
  </svg>`,

  // Rarity — leaves (willow style)
  rarity1: (color = '#98a496') => `<svg viewBox="0 0 32 32">
    <path d="M16 4 Q 12 12 16 28 M16 4 Q 20 12 16 28" fill="${color}" fill-opacity="0.6" stroke="${color}" stroke-width="1.2"/>
    <ellipse cx="16" cy="14" rx="3" ry="5" fill="${color}" opacity="0.5"/>
    <ellipse cx="13" cy="22" rx="2.5" ry="4" fill="${color}" opacity="0.4"/>
    <ellipse cx="19" cy="22" rx="2.5" ry="4" fill="${color}" opacity="0.4"/>
  </svg>`,

  rarity2: (color = '#88aab5') => `<svg viewBox="0 0 32 32">
    <path d="M16 2 Q 10 14 16 30 M16 2 Q 22 14 16 30" fill="${color}" fill-opacity="0.7" stroke="${color}" stroke-width="1.3"/>
    <ellipse cx="16" cy="10" rx="3" ry="6" fill="${color}" opacity="0.6"/>
    <ellipse cx="12" cy="20" rx="2.5" ry="5" fill="${color}" opacity="0.5"/>
    <ellipse cx="20" cy="20" rx="2.5" ry="5" fill="${color}" opacity="0.5"/>
  </svg>`,

  rarity3: (color = '#8b6e9b') => `<svg viewBox="0 0 32 32">
    <path d="M16 2 Q 8 14 16 30 M16 2 Q 24 14 16 30" fill="${color}" fill-opacity="0.8" stroke="${color}" stroke-width="1.4"/>
    <ellipse cx="16" cy="8" rx="3.5" ry="6" fill="${color}" opacity="0.7"/>
    <ellipse cx="11" cy="18" rx="3" ry="5" fill="${color}" opacity="0.6"/>
    <ellipse cx="21" cy="18" rx="3" ry="5" fill="${color}" opacity="0.6"/>
    <ellipse cx="16" cy="26" rx="2.5" ry="3" fill="${color}" opacity="0.5"/>
    <circle cx="16" cy="14" r="2" fill="white" opacity="0.6"/>
  </svg>`,

  rarity4: (color = '#d4a558') => `<svg viewBox="0 0 32 32">
    <defs>
      <radialGradient id="epic-glow-r">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#epic-glow-r)"/>
    <path d="M16 2 Q 6 14 16 30 M16 2 Q 26 14 16 30" fill="${color}" fill-opacity="0.85" stroke="${color}" stroke-width="1.5"/>
    <ellipse cx="16" cy="6" rx="4" ry="6" fill="${color}" opacity="0.8"/>
    <ellipse cx="10" cy="18" rx="3.5" ry="6" fill="${color}" opacity="0.7"/>
    <ellipse cx="22" cy="18" rx="3.5" ry="6" fill="${color}" opacity="0.7"/>
    <ellipse cx="16" cy="28" rx="3" ry="2.5" fill="${color}" opacity="0.6"/>
    <circle cx="16" cy="12" r="2.5" fill="white" opacity="0.7"/>
  </svg>`,

  rarity5: (color = '#c8623c') => `<svg viewBox="0 0 32 32">
    <defs>
      <radialGradient id="leg-glow-r">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="${color}" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="15" fill="url(#leg-glow-r)"/>
    <path d="M16 2 Q 4 14 16 30 M16 2 Q 28 14 16 30" fill="${color}" fill-opacity="0.9" stroke="${color}" stroke-width="1.6"/>
    <ellipse cx="16" cy="4" rx="5" ry="6" fill="${color}" opacity="0.9"/>
    <ellipse cx="9" cy="18" rx="4" ry="6" fill="${color}" opacity="0.8"/>
    <ellipse cx="23" cy="18" rx="4" ry="6" fill="${color}" opacity="0.8"/>
    <ellipse cx="16" cy="28" rx="3.5" ry="3" fill="${color}" opacity="0.7"/>
    <circle cx="16" cy="11" r="3" fill="white" opacity="0.9"/>
    <path d="M16 0 L 16 3 M16 29 L 16 32 M0 16 L 3 16 M29 16 L 32 16" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
  </svg>`,

  // Map pin — willow leaf shape (painted)
  pin: (color = '#7a9573', legendary = false) => {
    if (legendary) {
      return `<svg viewBox="0 0 40 56" fill="none">
        <defs>
          <radialGradient id="leg-halo-${color.replace('#','')}">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="20" cy="28" r="20" fill="url(#leg-halo-${color.replace('#','')})"/>
        <ellipse cx="20" cy="20" rx="14" ry="18" fill="${color}" fill-opacity="0.85" stroke="#3a4d3a" stroke-width="1"/>
        <path d="M20 8 Q 16 16 18 24 M20 8 Q 24 16 22 24" stroke="white" stroke-width="1" fill="none" opacity="0.5"/>
      </svg>`;
    }
    return `<svg viewBox="0 0 32 44" fill="none">
      <ellipse cx="16" cy="42" rx="8" ry="2" fill="${color}" opacity="0.3"/>
      <ellipse cx="16" cy="18" rx="12" ry="16" fill="${color}" fill-opacity="0.9" stroke="#3a4d3a" stroke-width="1"/>
      <path d="M16 6 Q 12 14 14 22 M16 6 Q 20 14 18 22" stroke="white" stroke-width="0.8" fill="none" opacity="0.5"/>
    </svg>`;
  },

  // Camera — painted (photo evidence)
  camera: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="18" rx="14" ry="11" fill="${color}" fill-opacity="0.1"/>
    <path d="M4 12 L 6 8 L 12 8 L 14 6 L 18 6 L 20 8 L 26 8 L 28 12 L 28 26 L 4 26 Z" stroke="${color}" stroke-width="1.8" fill="${color}" fill-opacity="0.15" stroke-linejoin="round"/>
    <circle cx="16" cy="18" r="5" fill="${color}" fill-opacity="0.4"/>
    <circle cx="16" cy="18" r="5" stroke="${color}" stroke-width="1.5"/>
    <circle cx="16" cy="18" r="2" fill="${color}"/>
    <circle cx="24" cy="13" r="1" fill="${color}"/>
  </svg>`,

  // Other icons (painted style)
  trophy: (color = '#d4a558') => `<svg viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="14" rx="12" ry="10" fill="${color}" fill-opacity="0.1"/>
    <path d="M10 4 L 22 4 L 22 12 Q 22 18 16 18 Q 10 18 10 12 Z" stroke="${color}" stroke-width="2" fill="${color}" fill-opacity="0.35"/>
    <path d="M10 8 L 6 8 Q 6 14 10 14 M22 8 L 26 8 Q 26 14 22 14" stroke="${color}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M14 18 L 18 18 L 17 24 L 15 24 Z" fill="${color}" fill-opacity="0.4" stroke="${color}" stroke-width="1.5"/>
    <path d="M10 26 L 22 26" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  medal: (color = '#d4a558') => `<svg viewBox="0 0 32 32" fill="none">
    <path d="M10 4 L 8 16 L 16 20 L 24 16 L 22 4 Z" fill="${color}" fill-opacity="0.4" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="16" cy="22" r="6" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="1.8"/>
    <circle cx="16" cy="22" r="2.5" fill="${color}"/>
  </svg>`,

  radar: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="16" rx="12" ry="12" fill="${color}" fill-opacity="0.05"/>
    <circle cx="16" cy="16" r="3" fill="${color}"/>
    <circle cx="16" cy="16" r="9" stroke="${color}" stroke-width="1.5" fill="none" opacity="0.5" stroke-dasharray="2 3"/>
    <circle cx="16" cy="16" r="14" stroke="${color}" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="3 4"/>
    <path d="M16 16 L 26 10" stroke="${color}" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,

  compass: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="12" stroke="${color}" stroke-width="1.8" fill="${color}" fill-opacity="0.08"/>
    <path d="M20 12 L 17 17 L 12 20 L 15 15 Z" fill="${color}" fill-opacity="0.5" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,

  check: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="13" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="1.8" stroke-dasharray="4 2"/>
    <path d="M9 17 L 14 22 L 23 12" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,

  note: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none">
    <path d="M6 26 L 10 25 L 24 11 L 21 8 L 7 22 Z" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M19 9 L 23 13" stroke="${color}" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M6 26 L 4 28 L 6 28 L 8 28" stroke="${color}" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  </svg>`,

  soundOn: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none">
    <path d="M4 12 L 9 12 L 16 6 L 16 26 L 9 20 L 4 20 Z" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M21 11 Q 23 14 21 17" stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M25 7 Q 29 12 25 19" stroke="${color}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  </svg>`,

  soundOff: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none">
    <path d="M4 12 L 9 12 L 16 6 L 16 26 L 9 20 L 4 20 Z" fill="${color}" fill-opacity="0.3" stroke="${color}" stroke-width="1.8" stroke-linejoin="round"/>
    <path d="M22 12 L 28 20 M28 12 L 22 20" stroke="${color}" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  sparkle: (color = '#d4a558') => `<svg viewBox="0 0 32 32" fill="none">
    <path d="M16 2 Q 14 14 16 16 Q 18 14 16 2 Z" fill="${color}" opacity="0.9"/>
    <path d="M16 30 Q 18 18 16 16 Q 14 18 16 30 Z" fill="${color}" opacity="0.9"/>
    <path d="M2 16 Q 14 14 16 16 Q 14 18 2 16 Z" fill="${color}" opacity="0.9"/>
    <path d="M30 16 Q 18 18 16 16 Q 18 14 30 16 Z" fill="${color}" opacity="0.9"/>
    <circle cx="16" cy="16" r="3" fill="${color}"/>
  </svg>`,

  // Theme preview icons — hand-painted small swatches
  themeWillow: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#faf6ec"/><path d="M32 12 Q 28 22 30 32 M32 12 Q 36 22 34 32" stroke="#5a7355" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M32 18 Q 18 26 12 38 M32 18 Q 46 26 52 38" stroke="#7a9573" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="14" cy="38" rx="5" ry="8" fill="#a3b89c" opacity="0.7" transform="rotate(-15 14 38)"/><ellipse cx="50" cy="38" rx="5" ry="8" fill="#a3b89c" opacity="0.7" transform="rotate(15 50 38)"/><ellipse cx="20" cy="50" rx="4" ry="6" fill="#a3b89c" opacity="0.6" transform="rotate(-20 20 50)"/><ellipse cx="44" cy="50" rx="4" ry="6" fill="#a3b89c" opacity="0.6" transform="rotate(20 44 50)"/><ellipse cx="32" cy="56" rx="3" ry="4" fill="#7a9573" opacity="0.7"/></svg>`,

  themeAutumn: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#fdf2e0"/><path d="M32 6 Q 24 18 22 32 Q 32 26 42 32 Q 40 18 32 6 Z" fill="#e89244" opacity="0.85"/><path d="M16 36 L 12 42 M 48 36 L 52 42 M 32 44 L 32 50" stroke="#c4622c" stroke-width="1.5" stroke-linecap="round"/><circle cx="32" cy="32" r="2" fill="#c4622c"/></svg>`,

  themeBlossom: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#fdf6f9"/><g transform="translate(32 32)"><ellipse cx="0" cy="-9" rx="6" ry="9" fill="#f0c4d2" opacity="0.85"/><ellipse cx="0" cy="-9" rx="6" ry="9" fill="#f0c4d2" opacity="0.85" transform="rotate(72)"/><ellipse cx="0" cy="-9" rx="6" ry="9" fill="#f0c4d2" opacity="0.85" transform="rotate(144)"/><ellipse cx="0" cy="-9" rx="6" ry="9" fill="#f0c4d2" opacity="0.85" transform="rotate(216)"/><ellipse cx="0" cy="-9" rx="6" ry="9" fill="#f0c4d2" opacity="0.85" transform="rotate(288)"/><circle cx="0" cy="0" r="4" fill="#d87090"/></g></svg>`,

  themeWinter: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#f0f5fa"/><g transform="translate(32 32)" stroke="#88a4b2" stroke-width="2.2" stroke-linecap="round"><line x1="0" y1="-18" x2="0" y2="18"/><line x1="-18" y1="0" x2="18" y2="0"/><line x1="-13" y1="-13" x2="13" y2="13"/><line x1="-13" y1="13" x2="13" y2="-13"/><line x1="0" y1="-13" x2="-5" y2="-8"/><line x1="0" y1="-13" x2="5" y2="-8"/><line x1="0" y1="13" x2="-5" y2="8"/><line x1="0" y1="13" x2="5" y2="8"/></g></svg>`,

  themeMidnight: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#0e1228"/><path d="M40 12 A 20 20 0 1 0 52 38 A 16 16 0 0 1 40 12z" fill="#f0d878" opacity="0.9"/><circle cx="18" cy="14" r="1" fill="white" opacity="0.9"/><circle cx="48" cy="20" r="1" fill="white" opacity="0.9"/><circle cx="14" cy="40" r="1" fill="white" opacity="0.9"/><circle cx="52" cy="44" r="1" fill="white" opacity="0.9"/><circle cx="20" cy="52" r="0.8" fill="white" opacity="0.7"/></svg>`,
};

export function rarityIcon(tier, color) {
  return ICONS[`rarity${tier}`]?.(color) || ICONS.rarity1(color);
}

export function pinSvg(category, color, legendary = false) {
  return ICONS.pin(color, legendary);
}