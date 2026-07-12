// Cosmic SVG icons — replaces emojis everywhere
// Each icon is a hand-crafted, color-aware SVG that picks up --cat-color from CSS

export const ICONS = {
  // Surprise button — rocket
  rocket: (color = '#FFD93D') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 6c8 8 12 18 12 28l-12 12-12-12c0-10 4-20 12-28z"/>
    <circle cx="32" cy="22" r="5"/>
    <path d="M20 38l-8 8 8-2M44 38l8 8-8-2"/>
    <path d="M28 50l-4 8 8-2M36 50l4 8-8-2" fill="${color}" opacity="0.5"/>
  </svg>`,

  // Categories
  fork:   (color = '#FF6B6B') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 8v22M22 30v26"/>
    <path d="M22 8c-4 0-8 4-8 12s4 12 8 12M22 8c4 0 8 4 8 12s-4 12-8 12"/>
    <path d="M42 8c-4 4-6 10-6 16s2 12 6 16M42 8v48"/>
  </svg>`,

  brush:  (color = '#4ECDC4') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M40 12l12 12-22 22H18V34z"/>
    <path d="M18 50l-8 8M28 50l-6 8M36 46l-2 10" stroke-width="2.5" opacity="0.6"/>
    <circle cx="46" cy="18" r="2" fill="${color}"/>
  </svg>`,

  eye:    (color = '#FFD93D') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 32s10-18 26-18 26 18 26 18-10 18-26 18S6 32 6 32z"/>
    <circle cx="32" cy="32" r="9" fill="${color}" opacity="0.2"/>
    <circle cx="32" cy="32" r="5" fill="${color}"/>
    <circle cx="34" cy="30" r="1.5" fill="${color}" opacity="0.6"/>
  </svg>`,

  shop:   (color = '#A78BFA') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 24l4-12h40l4 12"/>
    <path d="M8 24c0 4 3 6 6 6s6-2 6-6M20 24c0 4 3 6 6 6s6-2 6-6M32 24c0 4 3 6 6 6s6-2 6-6M44 24c0 4 3 6 6 6s6-2 6-6"/>
    <path d="M10 30v24h44V30"/>
    <rect x="26" y="36" width="12" height="18" fill="${color}" opacity="0.2"/>
  </svg>`,

  column: (color = '#F472B6') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 14h48"/>
    <path d="M14 14v40M22 14v40M30 14v40M38 14v40M46 14v40M54 14v40" opacity="0.5"/>
    <path d="M14 14L32 6l18 8M14 54h36"/>
  </svg>`,

  // Tabs (cosmic navigation)
  planet:  (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="16" r="6"/>
    <ellipse cx="16" cy="16" rx="13" ry="4" transform="rotate(-25 16 16)"/>
  </svg>`,

  comet: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="22" cy="10" r="5" fill="${color}" opacity="0.3"/>
    <path d="M18 14L4 28M16 12L6 22M20 12L10 22"/>
    <circle cx="22" cy="10" r="2" fill="${color}"/>
  </svg>`,

  // Add
  plus: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
    <circle cx="16" cy="16" r="12" opacity="0.2" fill="${color}"/>
    <path d="M16 8v16M8 16h16"/>
  </svg>`,

  // Stats
  pulse: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 16h6l3-10 4 20 4-14 3 8 3-4h5"/>
  </svg>`,

  // Rarity icons (5 tiers) — used in badges, gem cards, stats
  rarity1: (color = '#9aa0b4') => `<svg viewBox="0 0 32 32">
    <path d="M16 4l3 8h8l-6.5 5 2.5 9-7-5-7 5 2.5-9L5 12h8z" fill="${color}" opacity="0.5" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,

  rarity2: (color = '#7dd3fc') => `<svg viewBox="0 0 32 32">
    <path d="M16 4l3.5 8 8.5.5-6 5 2 9-8-5-8 5 2-9-6-5 8.5-.5z" fill="${color}" opacity="0.7" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
  </svg>`,

  rarity3: (color = '#c084fc') => `<svg viewBox="0 0 32 32">
    <path d="M16 2l4 9 9 1-6.5 6 2 10-8.5-5-8.5 5 2-10L3 12l9-1z" fill="${color}" opacity="0.85" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="16" cy="14" r="2.5" fill="white" opacity="0.5"/>
  </svg>`,

  rarity4: (color = '#FFD93D') => `<svg viewBox="0 0 32 32">
    <defs>
      <radialGradient id="epic-glow">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#epic-glow)"/>
    <path d="M16 2l4 9 9 1-6.5 6 2 10-8.5-5-8.5 5 2-10L3 12l9-1z" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="16" cy="14" r="2.5" fill="white" opacity="0.7"/>
  </svg>`,

  rarity5: (color = '#FF6B6B') => `<svg viewBox="0 0 32 32">
    <defs>
      <radialGradient id="leg-glow">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="${color}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="15" fill="url(#leg-glow)"/>
    <path d="M16 2l4 9 9 1-6.5 6 2 10-8.5-5-8.5 5 2-10L3 12l9-1z" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/>
    <circle cx="16" cy="14" r="3" fill="white" opacity="0.9"/>
    <!-- rays -->
    <path d="M16 0v4M16 28v4M0 16h4M28 16h4M4 4l3 3M25 25l3 3M4 28l3-3M25 7l3-3" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
  </svg>`,

  // Map pin (gem-pin)
  pin: (color = '#FFD93D') => `<svg viewBox="0 0 32 44" fill="none">
    <defs>
      <radialGradient id="pin-glow-${color}">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="16" cy="42" rx="8" ry="2" fill="${color}" opacity="0.3"/>
    <path d="M16 2C8 2 3 7 3 14c0 9 13 26 13 26s13-17 13-26c0-7-5-12-13-12z" fill="${color}"/>
    <circle cx="16" cy="14" r="5" fill="white" opacity="0.5"/>
    <circle cx="16" cy="14" r="3" fill="${color}"/>
  </svg>`,

  // Trophy (leaderboard)
  trophy: (color = '#FFD93D') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 4h12v8c0 4-3 7-6 7s-6-3-6-7V4z" fill="${color}" opacity="0.3"/>
    <path d="M10 4h12v8c0 4-3 7-6 7s-6-3-6-7V4z"/>
    <path d="M10 8H6c0 4 2 6 4 6M22 8h4c0 4-2 6-4 6"/>
    <path d="M13 22h6l-1 5h-4z"/>
    <path d="M10 28h12"/>
  </svg>`,

  // Medal (badge)
  medal: (color = '#FFD93D') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round">
    <path d="M10 4l-2 12 8 4 8-4-2-12z" fill="${color}" opacity="0.4"/>
    <circle cx="16" cy="22" r="6" fill="${color}" opacity="0.3"/>
    <circle cx="16" cy="22" r="6"/>
    <circle cx="16" cy="22" r="2.5" fill="${color}"/>
  </svg>`,

  // Distance (radar)
  radar: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
    <circle cx="16" cy="16" r="3" fill="${color}"/>
    <circle cx="16" cy="16" r="9" opacity="0.5"/>
    <circle cx="16" cy="16" r="14" opacity="0.25"/>
    <path d="M16 16L28 8" stroke-width="2.5"/>
  </svg>`,

  // Compass / maps link
  compass: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="16" r="12"/>
    <path d="M20 12l-2 8-8 2 2-8z" fill="${color}" opacity="0.3"/>
  </svg>`,

  // Check (visited)
  check: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="16" r="13" fill="${color}" opacity="0.2"/>
    <path d="M9 17l5 5 9-11"/>
  </svg>`,

  // Note / pencil
  note: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 26l4-1 16-16-3-3L7 22z"/>
    <path d="M19 9l3 3"/>
  </svg>`,

  // Sound on/off
  soundOn: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12h5l7-6v20l-7-6H4z" fill="${color}" opacity="0.3"/>
    <path d="M21 11c2 2 3 4 3 5s-1 3-3 5"/>
    <path d="M25 7c4 4 5 7 5 9s-1 5-5 9"/>
  </svg>`,

  soundOff: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12h5l7-6v20l-7-6H4z" fill="${color}" opacity="0.3"/>
    <path d="M22 12l6 8M28 12l-6 8"/>
  </svg>`,

  // Sparkle (gem reveal)
  sparkle: (color = '#FFD93D') => `<svg viewBox="0 0 32 32" fill="${color}">
    <path d="M16 0l2 12 12 2-12 2-2 14-2-14L2 14l12-2z"/>
  </svg>`,
};

// Get rarity icon by tier number
export function rarityIcon(tier, color) {
  return ICONS[`rarity${tier}`]?.(color) || ICONS.rarity1(color);
}

// Map pin for the map screen — colored by category
export function pinSvg(category, color, legend = false) {
  if (legend) {
    // Legendary pins get a halo
    return `<svg viewBox="0 0 40 56" fill="none">
      <defs>
        <radialGradient id="legend-halo-${color}">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="20" cy="28" r="20" fill="url(#legend-halo-${color})"/>
      <path d="M20 4C12 4 7 9 7 16c0 9 13 32 13 32s13-23 13-32c0-7-5-12-13-12z" fill="${color}"/>
      <circle cx="20" cy="16" r="5" fill="white" opacity="0.7"/>
      <circle cx="20" cy="16" r="2.5" fill="${color}"/>
    </svg>`;
  }
  return `<svg viewBox="0 0 32 44" fill="none">
    <ellipse cx="16" cy="42" rx="8" ry="2" fill="${color}" opacity="0.3"/>
    <path d="M16 2C8 2 3 7 3 14c0 9 13 26 13 26s13-17 13-26c0-7-5-12-13-12z" fill="${color}"/>
    <circle cx="16" cy="14" r="5" fill="white" opacity="0.5"/>
    <circle cx="16" cy="14" r="3" fill="${color}"/>
  </svg>`;
}