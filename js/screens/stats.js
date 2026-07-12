// Stats / Leaderboard / Badges / Themes / Tree / Gallery — cosmic-themed dashboard

import { h, toast, particles } from '../ui.js';
import { ICONS } from '../icons.js';
import {
  getStats, getLeaderboard, getState, setCurrentPlayer, getUnlockedBadges,
  BADGES, setSoundOn, getRarity, setActiveTheme, getActiveTheme, THEMES,
  IZZY_PRIVATE_COLLECTION, KEENAN_FAVOURITES, REWARDS, getCurrentRank, getNextRank, RANKS
} from '../state.js';
import { play } from '../audio.js';

let mainEl = null;
let mounted = false;
let activeTab = 'stats';

export function mountStatsScreen(main) {
  mainEl = main;
  mounted = true;
  render();
}

export function unmountStatsScreen() {
  mounted = false;
}

function render() {
  if (!mounted || !mainEl) return;
  const root = h('div', { class: 'screen-stats' }, [
    h('div', { style: { paddingTop: '8px' } }, [
      h('div', { class: 'filter-bar', role: 'tablist' }, [
        h('button', { class: 'filter-chip' + (activeTab === 'stats' ? ' active' : ''), role: 'tab', onClick: () => { activeTab = 'stats'; play('click'); render(); } }, ['📊 Wander']),
        h('button', { class: 'filter-chip' + (activeTab === 'leaderboard' ? ' active' : ''), role: 'tab', onClick: () => { activeTab = 'leaderboard'; play('click'); render(); } }, ['🏆 Sibling']),
        h('button', { class: 'filter-chip' + (activeTab === 'badges' ? ' active' : ''), role: 'tab', onClick: () => { activeTab = 'badges'; play('click'); render(); } }, ['🏅 Medals']),
        h('button', { class: 'filter-chip' + (activeTab === 'unlocks' ? ' active' : ''), role: 'tab', onClick: () => { activeTab = 'unlocks'; play('click'); render(); } }, ['🌿 Unlocks'])
      ]),
      activeTab === 'stats' ? renderStats() :
      activeTab === 'leaderboard' ? renderLeaderboard() :
      activeTab === 'badges' ? renderBadges() :
      renderUnlocks()
    ])
  ]);
  mainEl.replaceChildren(root);
}

function renderStats() {
  const stats = getStats();
  const s = getState();
  const rank = getCurrentRank();
  const nextRank = getNextRank();
  const xpToNext = nextRank ? nextRank.minXp - s.unlocks.xp : 0;
  const cats = {
    food:    { label: 'Weird Food',        icon: ICONS.fork('var(--cat-food)'),     color: 'var(--cat-food)' },
    art:     { label: 'Murals & Art',      icon: ICONS.brush('var(--cat-art)'),     color: 'var(--cat-art)' },
    view:    { label: 'Secret Views',      icon: ICONS.eye('var(--cat-view)'),      color: 'var(--cat-view)' },
    shop:    { label: 'Weird Shops',       icon: ICONS.shop('var(--cat-shop)'),     color: 'var(--cat-shop)' },
    history: { label: 'Forgotten History', icon: ICONS.column('var(--cat-history)'), color: 'var(--cat-history)' }
  };

  const treePct = s.unlocks.treeProgress || 0;

  return h('div', {}, [
    // Rank card
    h('div', { class: 'stat-card', style: { background: 'linear-gradient(135deg, var(--accent-soft), var(--surface))', border: '1px solid var(--accent)' } }, [
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }, [
        h('div', {}, [
          h('div', { style: { fontSize: '11px', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.08em' } }, ['Current Rank']),
          h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: 'var(--accent)', marginTop: '4px' } }, [rank.label])
        ]),
        h('div', { style: { fontSize: '48px' } }, [rank.icon])
      ]),
      h('div', { style: { marginTop: '12px' } }, [
        h('div', { class: 'cat-bar' }, [
          h('div', { class: 'row' }, [
            h('span', { class: 'name' }, [`${s.unlocks.xp} XP`]),
            h('span', { class: 'val' }, [nextRank ? `${xpToNext} to ${nextRank.label}` : 'Max rank!'])
          ]),
          h('div', { class: 'track' }, [
            h('div', { class: 'fill', style: { width: nextRank ? Math.min(100, (s.unlocks.xp - rank.minXp) / (nextRank.minXp - rank.minXp) * 100) + '%' : '100%', '--cat-color': rank.color } })
          ])
        ])
      ])
    ]),

    // Tree of memories
    h('div', { class: 'stat-card', style: { marginTop: '12px' } }, [
      h('div', { style: { fontSize: '11px', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.08em' } }, ['Tree of Memories']),
      h('div', { style: { fontSize: '48px', textAlign: 'center', margin: '8px 0', animation: 'float 4s ease-in-out infinite' } }, [treePct >= 100 ? '🌳' : treePct >= 75 ? '🌲' : treePct >= 50 ? '🌿' : '🌱']),
      h('div', { class: 'cat-bar' }, [
        h('div', { class: 'row' }, [
          h('span', { class: 'name' }, [`Branches filled`]),
          h('span', { class: 'val' }, [`${treePct}%`])
        ]),
        h('div', { class: 'track' }, [
          h('div', { class: 'fill', style: { width: treePct + '%', '--cat-color': 'var(--cat-art)' } })
        ])
      ])
    ]),

    h('div', { class: 'stats-grid' }, [
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.totalVisited)]),
        h('div', { class: 'label' }, ['Seeds Planted']),
        h('div', { class: 'sub' }, [`of ${stats.totalAvailable} gems`])
      ]),
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.byRarity.legendary)]),
        h('div', { class: 'label' }, ['Supernovas']),
        h('div', { class: 'sub' }, ['Legendary finds'])
      ]),
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.photoCount)]),
        h('div', { class: 'label' }, ['Photos']),
        h('div', { class: 'sub' }, ['Memories captured'])
      ]),
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(Object.values(getUnlockedBadges()).filter(Boolean).length)]),
        h('div', { class: 'label' }, ['Medals']),
        h('div', { class: 'sub' }, [`of ${BADGES.length} possible`])
      ])
    ]),
    h('div', { class: 'cat-breakdown' }, [
      h('h3', { style: { fontSize: '16px', marginBottom: '8px', fontFamily: 'var(--font-display)' } }, ['By Category']),
      ...Object.entries(cats).map(([catId, info]) => {
        const visited = stats.byCategory[catId] || 0;
        const total = 12;
        const pct = Math.min(100, (visited / total) * 100);
        return h('div', { class: 'cat-bar' }, [
          h('div', { class: 'row' }, [
            h('span', { class: 'name' }, [
              h('span', { class: 'cat-icon', html: info.icon }),
              info.label
            ]),
            h('span', { class: 'val' }, [`${visited} / ${total}`])
          ]),
          h('div', { class: 'track' }, [
            h('div', { class: 'fill', style: { width: pct + '%', '--cat-color': info.color } })
          ])
        ]);
      })
    ]),
    h('div', { class: 'sound-toggle' }, [
      h('span', {}, [
        h('span', { class: 'btn-icon', html: s.soundOn ? ICONS.soundOn('var(--accent)') : ICONS.soundOff('var(--text-2)') }),
        s.soundOn ? 'Wind chimes on' : 'Silent'
      ]),
      h('button', {
        class: 'filter-chip' + (s.soundOn ? ' active' : ''),
        onClick: () => { const next = !s.soundOn; setSoundOn(next); play('click'); render(); }
      }, [s.soundOn ? 'On' : 'Off'])
    ])
  ]);
}

function renderLeaderboard() {
  const lb = getLeaderboard();
  const s = getState();
  return h('div', {}, [
    h('div', { class: 'player-pick' }, s.players.map(p =>
      h('button', {
        class: 'player-pick-btn' + (s.currentPlayerId === p.id ? ' active' : ''),
        style: s.currentPlayerId === p.id ? { '--avatar-color': p.color } : {},
        onClick: () => { setCurrentPlayer(p.id); play('click'); render(); }
      }, [p.id === s.currentPlayerId ? '✓ ' : '', p.name])
    )),
    h('div', { class: 'lb-grid' }, lb.map((p, i) =>
      h('div', { class: 'lb-player' + (i === 0 && p.score > 0 ? ' winning' : ''), style: { '--avatar-color': p.color } }, [
        h('div', { class: 'avatar-lg' }, [p.name.charAt(0)]),
        h('div', { class: 'name' }, [p.name]),
        h('div', { class: 'score' }, [String(p.score)]),
        h('div', { class: 'label' }, ['Wander Points']),
        i === 0 && p.score > 0 ? h('div', { style: { marginTop: '8px', display: 'flex', justifyContent: 'center' } }, [
          h('span', { style: { width: '32px', height: '32px', display: 'inline-block' }, html: ICONS.trophy('var(--rarity-epic)') })
        ]) : null
      ])
    )),
    h('div', { style: { marginTop: '24px', padding: '16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', fontSize: '13px', color: 'var(--text-2)' } }, [
      h('strong', { style: { color: 'var(--text-bright)' } }, ['How points work:']),
      h('br'), 'Each gem: base 10-20 (by category) × rarity multiplier',
      h('br'), '🍜 Food +10 · 🎨 Art +10 · 🛍️ Shop +10',
      h('br'), '🌆 Views +15 · 🏛️ History +20',
      h('br'), 'Common ×1 · Uncommon ×2 · Rare ×3 · Epic ×5 · Legendary ×10'
    ])
  ]);
}

function renderBadges() {
  const unlocked = getUnlockedBadges();
  return h('div', { class: 'badges-grid' }, BADGES.map(b => {
    const isUnlocked = !!unlocked[b.id];
    let iconSvg;
    if (b.icon === 'sparkle') iconSvg = ICONS.sparkle(isUnlocked ? 'var(--rarity-epic)' : '#444');
    else if (ICONS[b.icon]) iconSvg = ICONS[b.icon](isUnlocked ? 'var(--rarity-epic)' : '#444');
    else iconSvg = ICONS.medal(isUnlocked ? 'var(--rarity-epic)' : '#444');

    return h('div', { class: 'badge' + (isUnlocked ? ' unlocked' : '') }, [
      h('div', { class: 'icon', html: iconSvg }),
      h('div', { class: 'label' }, [b.label])
    ]);
  }));
}

function renderUnlocks() {
  const s = getState();
  const activeTheme = getActiveTheme();

  return h('div', {}, [
    // Theme selector
    h('div', { class: 'stat-card', style: { marginTop: '12px' } }, [
      h('div', { style: { fontSize: '11px', fontWeight: 800, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' } }, ['Seasonal Themes']),
      h('div', { class: 'theme-selector' },
        THEMES.map(t => {
          const isUnlocked = s.unlocks.themes.includes(t.id);
          const isActive = activeTheme === t.id;
          const gradients = {
            willow: 'linear-gradient(135deg, #faf6ec 0%, #a3b89c 100%)',
            autumn: 'linear-gradient(135deg, #fdf2e0 0%, #c4622c 100%)',
            blossom: 'linear-gradient(135deg, #fdf6f9 0%, #f0c4d2 100%)',
            winter: 'linear-gradient(135deg, #f0f5fa 0%, #88a4b2 100%)',
            midnight: 'linear-gradient(135deg, #0e1228 0%, #4a5a8c 100%)'
          };
          return h('div', {
            class: 'theme-swatch' + (isActive ? ' active' : ''),
            onClick: () => {
              if (!isUnlocked) {
                toast('🔒 This theme unlocks as you discover more gems', 'warn');
                return;
              }
              setActiveTheme(t.id);
              particles({ count: 20 });
              play('chime');
              toast(`✨ Theme: ${t.label}`, 'success');
              render();
            }
          }, [
            h('div', { class: 'swatch-bg', style: { background: gradients[t.id] } }),
            h('div', { class: 'swatch-label' }, [isUnlocked ? t.label : '🔒'])
          ]);
        })
      )
    ]),

    // Unlock tracks (7)
    h('div', { class: 'cat-breakdown', style: { marginTop: '12px' } }, [
      h('h3', { style: { fontSize: '16px', marginBottom: '12px', fontFamily: 'var(--font-display)' } }, ['7 Unlock Tracks']),
      renderUnlockRow('🌳', 'Hidden Gem Reveal', s.unlocks.hiddenGemsRevealed.length > 0 ? `${IZZY_PRIVATE_COLLECTION.length} of Izzy's spots revealed` : 'Visit 8 gems to reveal', s.unlocks.hiddenGemsRevealed.length > 0),
      renderUnlockRow('🎨', 'Custom Themes', `${s.unlocks.themes.length} of ${THEMES.length} unlocked`, s.unlocks.themes.length === THEMES.length),
      renderUnlockRow('🏆', 'Souvenir Rewards', `${s.unlocks.rewards.length} of ${REWARDS.length} earned`, s.unlocks.rewards.length > 0),
      renderUnlockRow('📷', 'Photo Gallery', `${s.unlocks.photoGalleryIds.length} photos captured`, s.unlocks.photoGalleryIds.length > 0),
      renderUnlockRow('💚', "Keenan's Favourites", `${s.unlocks.keenanFavourites.length} of ${KEENAN_FAVOURITES.length} unlocked`, s.unlocks.keenanFavourites.length > 0),
      renderUnlockRow('🌳', 'Tree of Memories', `${s.unlocks.treeProgress}% branches filled`, s.unlocks.treeProgress >= 100),
      renderUnlockRow('👑', 'Wanderer Rank', getCurrentRank().label, s.unlocks.xp >= 100)
    ])
  ]);
}

function renderUnlockRow(icon, title, status, isDone) {
  return h('div', { class: 'cat-bar', style: { padding: '12px 0', borderBottom: '1px solid var(--border)' } }, [
    h('div', { class: 'row' }, [
      h('span', { class: 'name', style: { fontSize: '14px' } }, [
        h('span', { style: { marginRight: '6px', fontSize: '18px' } }, [icon]),
        title
      ]),
      h('span', { class: 'val', style: { color: isDone ? 'var(--cat-art)' : 'var(--text-2)', fontWeight: isDone ? 700 : 400 } }, [
        isDone ? '✓ ' : '',
        status
      ])
    ])
  ]);
}