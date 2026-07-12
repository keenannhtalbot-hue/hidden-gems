// Stats / Leaderboard / Badges — cosmic dashboard

import { h, toast } from '../ui.js';
import { ICONS } from '../icons.js';
import {
  getStats, getLeaderboard, getState, setCurrentPlayer, getUnlockedBadges,
  BADGES, setSoundOn, getRarity
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
        h('button', { class: 'filter-chip' + (activeTab === 'stats' ? ' active' : ''), role: 'tab', onClick: () => { activeTab = 'stats'; play('click'); render(); } }, ['📊 Stats']),
        h('button', { class: 'filter-chip' + (activeTab === 'leaderboard' ? ' active' : ''), role: 'tab', onClick: () => { activeTab = 'leaderboard'; play('click'); render(); } }, ['🏆 Leaderboard']),
        h('button', { class: 'filter-chip' + (activeTab === 'badges' ? ' active' : ''), role: 'tab', onClick: () => { activeTab = 'badges'; play('click'); render(); } }, ['🏅 Badges'])
      ]),
      activeTab === 'stats' ? renderStats() :
      activeTab === 'leaderboard' ? renderLeaderboard() :
      renderBadges()
    ])
  ]);
  mainEl.replaceChildren(root);
}

function renderStats() {
  const stats = getStats();
  const s = getState();
  const cats = {
    food:    { label: 'Weird Food',     icon: ICONS.fork('#FF6B6B'),     color: '#FF6B6B' },
    art:     { label: 'Murals & Art',   icon: ICONS.brush('#4ECDC4'),    color: '#4ECDC4' },
    view:    { label: 'Secret Views',   icon: ICONS.eye('#FFD93D'),      color: '#FFD93D' },
    shop:    { label: 'Weird Shops',    icon: ICONS.shop('#A78BFA'),     color: '#A78BFA' },
    history: { label: 'Forgotten History', icon: ICONS.column('#F472B6'), color: '#F472B6' }
  };
  return h('div', {}, [
    h('div', { class: 'stats-grid' }, [
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.totalVisited)]),
        h('div', { class: 'label' }, ['Planets Visited']),
        h('div', { class: 'sub' }, [`of ${stats.totalAvailable} total`])
      ]),
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.byRarity.legendary)]),
        h('div', { class: 'label' }, ['Supernovas']),
        h('div', { class: 'sub' }, ['Legendary tier'])
      ]),
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.byRarity.epic)]),
        h('div', { class: 'label' }, ['Nebulae']),
        h('div', { class: 'sub' }, ['Epic tier'])
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
        const total = 12; // approx per category in starter set
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
        h('span', { class: 'btn-icon', html: s.soundOn ? ICONS.soundOn('#FFD93D') : ICONS.soundOff('#a0a0c0') }),
        s.soundOn ? 'Sound effects on' : 'Sound effects off'
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
      }, [
        p.id === s.currentPlayerId ? '✓ ' : '',
        p.name
      ])
    )),
    h('div', { class: 'lb-grid' }, lb.map((p, i) =>
      h('div', { class: 'lb-player' + (i === 0 && p.score > 0 ? ' winning' : ''), style: { '--avatar-color': p.color } }, [
        h('div', { class: 'avatar-lg' }, [p.name.charAt(0)]),
        h('div', { class: 'name' }, [p.name]),
        h('div', { class: 'score' }, [String(p.score)]),
        h('div', { class: 'label' }, ['Points']),
        i === 0 && p.score > 0 ? h('div', { style: { marginTop: '8px', display: 'flex', justifyContent: 'center' } }, [
          h('span', { style: { width: '32px', height: '32px', display: 'inline-block' }, html: ICONS.trophy('#FFD93D') })
        ]) : null
      ])
    )),
    h('div', { style: { marginTop: '24px', padding: '16px', background: 'var(--glass)', border: '1px solid var(--border)', borderRadius: '14px', fontSize: '13px', color: 'var(--text-2)' } }, [
      h('strong', { style: { color: 'var(--text-bright)' } }, ['How points work:']),
      h('br'),
      'Each gem: base 10-20 (by category) × rarity multiplier',
      h('br'),
      '🍜 Food +10 · 🎨 Art +10 · 🛍️ Shop +10',
      h('br'),
      '🌆 Views +15 · 🏛️ History +20',
      h('br'),
      'Rarity multiplier: Common ×1 · Uncommon ×2 · Rare ×3 · Epic ×5 · Legendary ×10'
    ])
  ]);
}

function renderBadges() {
  const unlocked = getUnlockedBadges();
  return h('div', { class: 'badges-grid' }, BADGES.map(b => {
    const isUnlocked = !!unlocked[b.id];
    let iconSvg;
    if (b.icon === 'sparkle') iconSvg = ICONS.sparkle(isUnlocked ? '#FFD93D' : '#44445a');
    else if (b.icon.startsWith('rarity')) iconSvg = ICONS[b.icon]?.(isUnlocked ? '' : '') || ICONS.rarity1('#44445a');
    else if (ICONS[b.icon]) iconSvg = ICONS[b.icon](isUnlocked ? '#FFD93D' : '#44445a');
    else iconSvg = ICONS.medal(isUnlocked ? '#FFD93D' : '#44445a');

    return h('div', { class: 'badge' + (isUnlocked ? ' unlocked' : '') }, [
      h('div', { class: 'icon', html: iconSvg }),
      h('div', { class: 'label' }, [b.label])
    ]);
  }));
}