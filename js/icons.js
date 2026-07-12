// Weeping Willow icon set — nature-themed

export const ICONS = {
  // Brand mark — willow branch with drooping leaves
  willow: (color = '#7a9573') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 8v48"/>
    <path d="M32 16 Q 18 22 14 36 M32 22 Q 14 28 8 44 M32 28 Q 20 36 16 48" />
    <path d="M32 16 Q 46 22 50 36 M32 22 Q 50 28 56 44 M32 28 Q 44 36 48 48" />
    <ellipse cx="14" cy="36" rx="3" ry="5" fill="${color}" opacity="0.5" transform="rotate(-20 14 36)"/>
    <ellipse cx="8" cy="44" rx="2.5" ry="4" fill="${color}" opacity="0.4" transform="rotate(-15 8 44)"/>
    <ellipse cx="50" cy="36" rx="3" ry="5" fill="${color}" opacity="0.5" transform="rotate(20 50 36)"/>
    <ellipse cx="56" cy="44" rx="2.5" ry="4" fill="${color}" opacity="0.4" transform="rotate(15 56 44)"/>
    <ellipse cx="20" cy="48" rx="2" ry="3.5" fill="${color}" opacity="0.4" transform="rotate(-25 20 48)"/>
    <ellipse cx="44" cy="48" rx="2" ry="3.5" fill="${color}" opacity="0.4" transform="rotate(25 44 48)"/>
  </svg>`,

  // Wind gust (Blow Me Away button)
  wind: (color = 'currentColor') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 24 Q 24 18 32 24 T 56 24"/>
    <path d="M8 36 Q 28 30 40 36 T 56 36"/>
    <path d="M8 48 Q 22 42 30 48 T 52 48"/>
  </svg>`,

  // Tab icons
  map: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 8l8-2 8 2 8-2v18l-8 2-8-2-8 2z"/>
    <path d="M12 6v18M20 8v18"/>
  </svg>`,

  plant: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M16 28V16"/>
    <path d="M16 20c-4-2-6-6-6-12 4 0 8 4 6 12z" fill="${color}" opacity="0.3"/>
    <path d="M16 16c4-2 6-6 6-12-4 0-8 4-6 12z" fill="${color}" opacity="0.3"/>
    <path d="M12 28h8"/>
  </svg>`,

  plus: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round">
    <circle cx="16" cy="16" r="12" opacity="0.2" fill="${color}"/>
    <path d="M16 8v16M8 16h16"/>
  </svg>`,

  chart: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 24c4 0 4-12 8-12s4 12 8 12 4-16 8-16"/>
    <path d="M4 28h24"/>
  </svg>`,

  // Categories — nature-themed
  fork: (color = '#c8623c') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M20 8v20M20 28v28"/>
    <path d="M20 8c-4 0-8 4-8 12s4 12 8 12M20 8c4 0 8 4 8 12s-4 12-8 12"/>
    <path d="M44 8c-4 4-6 10-6 16s2 12 6 16M44 8v48"/>
  </svg>`,

  brush: (color = '#6b8e7f') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 50c-2-4 0-8 4-10s8 0 10 4-2 8-6 8"/>
    <path d="M28 36l20-20c2-2 6-2 8 0s2 6 0 8L36 44"/>
    <path d="M22 44l16-16"/>
    <path d="M28 36l-8 8"/>
  </svg>`,

  eye: (color = '#d4a558') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 32s10-18 26-18 26 18 26 18-10 18-26 18S6 32 6 32z"/>
    <circle cx="32" cy="32" r="9" fill="${color}" opacity="0.3"/>
    <circle cx="32" cy="32" r="5" fill="${color}"/>
  </svg>`,

  shop: (color = '#8b6e9b') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 24l4-12h40l4 12"/>
    <path d="M10 24v24h44V24"/>
    <rect x="26" y="32" width="12" height="16" fill="${color}" opacity="0.3"/>
    <path d="M16 28a4 4 0 008 0M28 28a4 4 0 008 0M40 28a4 4 0 008 0" />
  </svg>`,

  column: (color = '#a8606c') => `<svg viewBox="0 0 64 64" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 14h48"/>
    <path d="M14 14v40M22 14v40M30 14v40M38 14v40M46 14v40M54 14v40" opacity="0.4"/>
    <path d="M10 14L32 6l22 8"/>
    <path d="M14 54h36"/>
  </svg>`,

  // Rarity — leaves & organic
  rarity1: (color = '#98a496') => `<svg viewBox="0 0 32 32">
    <path d="M16 6 L16 26 M8 14 L16 6 L24 14" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="${color}" opacity="0.5"/>
    <path d="M8 26 Q 16 18 24 26" stroke="${color}" stroke-width="1.5" fill="none"/>
  </svg>`,

  rarity2: (color = '#88aab5') => `<svg viewBox="0 0 32 32">
    <path d="M16 6 L16 26 M6 12 L16 6 L26 12" stroke="${color}" stroke-width="2" stroke-linecap="round" fill="${color}" opacity="0.6"/>
    <path d="M6 28 Q 16 20 26 28" stroke="${color}" stroke-width="1.5" fill="none"/>
  </svg>`,

  rarity3: (color = '#8b6e9b') => `<svg viewBox="0 0 32 32">
    <path d="M16 4 L16 28 M4 10 L16 4 L28 10" stroke="${color}" stroke-width="2.2" stroke-linecap="round" fill="${color}" opacity="0.7"/>
    <path d="M4 28 Q 16 20 28 28" stroke="${color}" stroke-width="2" fill="none"/>
    <circle cx="16" cy="14" r="2" fill="white" opacity="0.5"/>
  </svg>`,

  rarity4: (color = '#d4a558') => `<svg viewBox="0 0 32 32">
    <defs>
      <radialGradient id="epic-glow">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="14" fill="url(#epic-glow)"/>
    <path d="M16 2 L16 30 M2 12 L16 2 L30 12" stroke="${color}" stroke-width="2.5" stroke-linecap="round" fill="${color}" opacity="0.85"/>
    <path d="M2 28 Q 16 18 30 28" stroke="${color}" stroke-width="2" fill="none"/>
    <circle cx="16" cy="14" r="3" fill="white" opacity="0.7"/>
  </svg>`,

  rarity5: (color = '#c8623c') => `<svg viewBox="0 0 32 32">
    <defs>
      <radialGradient id="leg-glow">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="${color}" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <circle cx="16" cy="16" r="15" fill="url(#leg-glow)"/>
    <path d="M16 2 L16 30 M2 12 L16 2 L30 12" stroke="${color}" stroke-width="2.5" stroke-linecap="round" fill="${color}" opacity="0.9"/>
    <path d="M2 28 Q 16 18 30 28" stroke="${color}" stroke-width="2" fill="none"/>
    <circle cx="16" cy="14" r="3.5" fill="white" opacity="0.9"/>
    <path d="M16 0v3M16 29v3M0 16h3M29 16h3" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.8"/>
  </svg>`,

  // Map pin (nature themed — leaf-shaped)
  pin: (color = '#7a9573', legendary = false) => {
    if (legendary) {
      return `<svg viewBox="0 0 40 56" fill="none">
        <defs>
          <radialGradient id="leg-halo-${color}">
            <stop offset="0%" stop-color="${color}" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="20" cy="28" r="20" fill="url(#leg-halo-${color})"/>
        <path d="M20 6C12 6 7 11 7 18c0 10 13 32 13 32s13-22 13-32c0-7-5-12-13-12z" fill="${color}"/>
        <circle cx="20" cy="18" r="5" fill="white" opacity="0.7"/>
        <circle cx="20" cy="18" r="2.5" fill="${color}"/>
      </svg>`;
    }
    return `<svg viewBox="0 0 32 44" fill="none">
      <ellipse cx="16" cy="42" rx="7" ry="2" fill="${color}" opacity="0.3"/>
      <path d="M16 4C9 4 4 9 4 16c0 9 12 24 12 24s12-15 12-24c0-7-5-12-12-12z" fill="${color}"/>
      <circle cx="16" cy="16" r="4" fill="white" opacity="0.6"/>
      <circle cx="16" cy="16" r="2" fill="${color}"/>
    </svg>`;
  },

  trophy: (color = '#d4a558') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 4h12v8c0 4-3 7-6 7s-6-3-6-7V4z" fill="${color}" opacity="0.3"/>
    <path d="M10 4h12v8c0 4-3 7-6 7s-6-3-6-7V4z"/>
    <path d="M10 8H6c0 4 2 6 4 6M22 8h4c0 4-2 6-4 6"/>
    <path d="M13 22h6l-1 5h-4z"/>
    <path d="M10 28h12"/>
  </svg>`,

  medal: (color = '#d4a558') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round">
    <path d="M10 4l-2 12 8 4 8-4-2-12z" fill="${color}" opacity="0.4"/>
    <circle cx="16" cy="22" r="6" fill="${color}" opacity="0.3"/>
    <circle cx="16" cy="22" r="6"/>
    <circle cx="16" cy="22" r="2.5" fill="${color}"/>
  </svg>`,

  radar: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
    <circle cx="16" cy="16" r="3" fill="${color}"/>
    <circle cx="16" cy="16" r="9" opacity="0.5"/>
    <circle cx="16" cy="16" r="14" opacity="0.25"/>
    <path d="M16 16L28 8" stroke-width="2.5"/>
  </svg>`,

  compass: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="16" r="12"/>
    <path d="M20 12l-2 8-8 2 2-8z" fill="${color}" opacity="0.3"/>
  </svg>`,

  check: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="16" r="13" fill="${color}" opacity="0.2"/>
    <path d="M9 17l5 5 9-11"/>
  </svg>`,

  note: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 26l4-1 16-16-3-3L7 22z"/>
    <path d="M19 9l3 3"/>
  </svg>`,

  camera: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 10h6l2-3h8l2 3h6v16H4z"/>
    <circle cx="16" cy="17" r="5"/>
    <circle cx="16" cy="17" r="2" fill="${color}"/>
  </svg>`,

  soundOn: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12h5l7-6v20l-7-6H4z" fill="${color}" opacity="0.3"/>
    <path d="M21 11c2 2 3 4 3 5s-1 3-3 5"/>
    <path d="M25 7c4 4 5 7 5 9s-1 5-5 9"/>
  </svg>`,

  soundOff: (color = 'currentColor') => `<svg viewBox="0 0 32 32" fill="none" stroke="${color}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 12h5l7-6v20l-7-6H4z" fill="${color}" opacity="0.3"/>
    <path d="M22 12l6 8M28 12l-6 8"/>
  </svg>`,

  sparkle: (color = '#d4a558') => `<svg viewBox="0 0 32 32" fill="${color}">
    <path d="M16 2l2 12 12 2-12 2-2 14-2-14L2 16l12-2z"/>
  </svg>`,

  // Theme preview icons
  themeWillow: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#faf6ec"/><path d="M32 12v44" stroke="#7a9573" stroke-width="2.5" stroke-linecap="round"/><path d="M32 18 Q 22 22 18 32 M32 24 Q 16 28 12 38 M32 30 Q 22 34 20 42" stroke="#7a9573" stroke-width="1.8" fill="none"/><path d="M32 18 Q 42 22 46 32 M32 24 Q 48 28 52 38 M32 30 Q 42 34 44 42" stroke="#7a9573" stroke-width="1.8" fill="none"/><ellipse cx="18" cy="32" rx="2.5" ry="4" fill="#a3b89c" transform="rotate(-15 18 32)"/><ellipse cx="46" cy="32" rx="2.5" ry="4" fill="#a3b89c" transform="rotate(15 46 32)"/></svg>`,

  themeAutumn: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#fdf2e0"/><path d="M32 8 Q 24 24 20 40 Q 32 32 44 40 Q 40 24 32 8z" fill="#e89244" opacity="0.8"/><path d="M16 36 L 14 42 M 48 36 L 50 42 M 32 44 L 32 50" stroke="#c4622c" stroke-width="1.5" stroke-linecap="round"/><circle cx="32" cy="32" r="3" fill="#c4622c"/></svg>`,

  themeBlossom: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#fdf6f9"/><g transform="translate(32 32)"><ellipse cx="0" cy="-8" rx="5" ry="8" fill="#f0c4d2"/><ellipse cx="0" cy="-8" rx="5" ry="8" fill="#f0c4d2" transform="rotate(72)"/><ellipse cx="0" cy="-8" rx="5" ry="8" fill="#f0c4d2" transform="rotate(144)"/><ellipse cx="0" cy="-8" rx="5" ry="8" fill="#f0c4d2" transform="rotate(216)"/><ellipse cx="0" cy="-8" rx="5" ry="8" fill="#f0c4d2" transform="rotate(288)"/><circle cx="0" cy="0" r="3" fill="#d87090"/></g></svg>`,

  themeWinter: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#f0f5fa"/><g transform="translate(32 32)" stroke="#88a4b2" stroke-width="2" stroke-linecap="round"><line x1="0" y1="-16" x2="0" y2="16"/><line x1="-16" y1="0" x2="16" y2="0"/><line x1="-11" y1="-11" x2="11" y2="11"/><line x1="-11" y1="11" x2="11" y2="-11"/><line x1="0" y1="-12" x2="-4" y2="-8"/><line x1="0" y1="-12" x2="4" y2="-8"/><line x1="0" y1="12" x2="-4" y2="8"/><line x1="0" y1="12" x2="4" y2="8"/></g></svg>`,

  themeMidnight: `<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="#0e1228"/><path d="M40 14 A 18 18 0 1 0 50 36 A 14 14 0 0 1 40 14z" fill="#f0d878"/><circle cx="20" cy="14" r="1" fill="white"/><circle cx="48" cy="20" r="1" fill="white"/><circle cx="14" cy="40" r="1" fill="white"/><circle cx="52" cy="44" r="1" fill="white"/></svg>`,

  // Unlock icons (5 of them)
  unlockHidden: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 14l10-10 10 10v16H6z"/><circle cx="16" cy="22" r="2" fill="currentColor"/></svg>`,
  unlockTheme: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="16" r="10"/><path d="M16 6v20M6 16h20M9 9l14 14M23 9L9 23"/></svg>`,
  unlockTrophy: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 4h12v8c0 4-3 7-6 7s-6-3-6-7V4z"/><path d="M13 22h6l-1 5h-4zM10 28h12"/></svg>`,
  unlockGallery: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="4" y="6" width="24" height="20" rx="2"/><circle cx="11" cy="13" r="2"/><path d="M4 22l6-6 6 6 4-4 8 8"/></svg>`,
  unlockHeart: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 28S4 20 4 12c0-4 3-8 8-8 3 0 4 2 4 2s1-2 4-2c5 0 8 4 8 8 0 8-12 16-12 16z"/></svg>`,
  unlockTree: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 28V8M16 8c-4-4-10-4-10 2s10 6 10 6M16 8c4-4 10-4 10 2s-10 6-10 6M16 20c-3-3-8-3-8 1s8 4 8 4M16 20c3-3 8-3 8 1s-8 4-8 4"/></svg>`,
  unlockCrown: `<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10l4 14h16l4-14-8 6-4-8-4 8z"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>`,
};

export function rarityIcon(tier, color) {
  return ICONS[`rarity${tier}`]?.(color) || ICONS.rarity1(color);
}

export function pinSvg(category, color, legendary = false) {
  return ICONS.pin(color, legendary);
}