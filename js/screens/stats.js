// Stats / Leaderboard / Badges screen — combined into one tabbed dashboard

import { h } from '../ui.js';
import { getStats, getLeaderboard, getState, getCurrentPlayer, setCurrentPlayer, getUnlockedBadges, BADGES, setSoundOn, setState } from '../state.js';
import { play } from '../audio.js';

let mainEl = null;
let mounted = false;
let activeTab = 'stats'; // 'stats' | 'leaderboard' | 'badges'

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
    food: '🍜 Weird Food', art: '🎨 Murals', view: '🌆 Views',
    shop: '🛍️ Shops', history: '🏛️ History'
  };
  return h('div', {}, [
    h('div', { class: 'stats-grid' }, [
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.totalVisited)]),
        h('div', { class: 'label' }, ['Gems Found']),
        h('div', { class: 'sub' }, [`of ${stats.totalAvailable} total`])
      ]),
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(stats.customGems)]),
        h('div', { class: 'label' }, ['Custom Gems']),
        h('div', { class: 'sub' }, ['added by you & Maya'])
      ]),
      h('div', { class: 'stat-card' }, [
        h('div', { class: 'num' }, [String(Object.values(getUnlockedBadges()).filter(Boolean).length)]),
        h('div', { class: 'label' }, ['Badges']),
        h('div', { class: 'sub' }, [`of ${BADGES.length} possible`])
      ])
    ]),
    h('div', { class: 'cat-breakdown' }, [
      h('h3', { style: { fontSize: '16px', marginBottom: '8px' } }, ['By Category']),
      ...Object.entries(cats).map(([catId, label]) => {
        const visited = stats.byCategory[catId] || 0;
        const total = 6; // approx
        const pct = Math.min(100, (visited / total) * 100);
        const color = ({ food: '#FF6B6B', art: '#4ECDC4', view: '#FFD93D', shop: '#A78BFA', history: '#F472B6' })[catId];
        return h('div', { class: 'cat-bar' }, [
          h('div', { class: 'row' }, [
            h('span', { class: 'name' }, [label]),
            h('span', { class: 'val' }, [`${visited} / ${total}`])
          ]),
          h('div', { class: 'track' }, [
            h('div', { class: 'fill', style: { width: pct + '%', background: color } })
          ])
        ]);
      })
    ]),
    h('div', { style: { marginTop: '24px', padding: '16px', background: 'var(--bg-2)', borderRadius: '14px', border: '1px solid var(--border)' } }, [
      h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }, [
        h('span', {}, ['🔊 Sound effects']),
        h('button', {
          class: 'filter-chip' + (s.soundOn ? ' active' : ''),
          onClick: () => { const next = !s.soundOn; setSoundOn(next); play('click'); render(); }
        }, [s.soundOn ? 'On' : 'Off'])
      ]),
      h('p', { style: { fontSize: '12px', color: 'var(--text-3)', marginTop: '8px' } }, ['Synthetic sounds — no audio assets to download. Tap any button to unlock audio.'])
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
        onClick: () => { setCurrentPlayer(p.id); play('click'); render(); }
      }, [p.id === s.currentPlayerId ? '✓ ' : '', p.name])
    )),
    h('div', { class: 'lb-grid' }, lb.map((p, i) =>
      h('div', { class: 'lb-player' + (i === 0 && p.score > 0 ? ' winning' : '') }, [
        h('div', { class: 'avatar-lg', style: { background: p.color } }, [p.name.charAt(0)]),
        h('div', { class: 'name' }, [p.name]),
        h('div', { class: 'score' }, [String(p.score)]),
        h('div', { class: 'label' }, ['Points']),
        h('div', { style: { fontSize: '12px', color: 'var(--text-2)', marginTop: '8px' } }, [p.id === s.currentPlayerId ? '👈 That\'s you' : ''])
      ])
    )),
    h('div', { style: { marginTop: '24px', padding: '16px', background: 'var(--bg-2)', borderRadius: '14px', border: '1px solid var(--border)', fontSize: '13px', color: 'var(--text-2)' } }, [
      h('strong', { style: { color: 'var(--text-0)' } }, ['How points work:']),
      h('br'),
      '🍜 Food: +10 · 🎨 Art: +10 · 🛍️ Shop: +10',
      h('br'),
      '🌆 Views: +15 · 🏛️ History: +20',
      h('br'),
      'Rarer gems (★ ★ ★) are worth the same but harder to find.'
    ])
  ]);
}

function renderBadges() {
  const unlocked = getUnlockedBadges();
  return h('div', { class: 'badges-grid' }, BADGES.map(b =>
    h('div', { class: 'badge' + (unlocked[b.id] ? ' unlocked' : '') }, [
      h('div', { class: 'icon' }, [b.icon]),
      h('div', { class: 'label' }, [b.label])
    ])
  ));
}