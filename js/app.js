// App root — Izzy's Interstellar Adventures

import { initState, getState, getCurrentPlayer } from './state.js';
import { mountSurpriseScreen, unmountSurpriseScreen, refreshSurprise } from './screens/surprise.js';
import { mountMapScreen, unmountMapScreen, refreshMap } from './screens/map.js';
import { mountAddScreen, unmountAddScreen } from './screens/add.js';
import { mountStatsScreen, unmountStatsScreen } from './screens/stats.js';
import { ICONS } from './icons.js';
import { play } from './audio.js';

let currentTab = 'surprise';
const TABS = [
  { id: 'surprise', label: 'Beam',    icon: ICONS.rocket('currentColor') },
  { id: 'map',      label: 'Map',     icon: ICONS.planet('currentColor') },
  { id: 'add',      label: 'Plot',    icon: ICONS.plus('currentColor') },
  { id: 'stats',    label: 'Mission', icon: ICONS.pulse('currentColor') }
];

const MOUNTERS = {
  surprise: mountSurpriseScreen,
  map: mountMapScreen,
  add: mountAddScreen,
  stats: mountStatsScreen
};
const UNMOUNTERS = {
  surprise: unmountSurpriseScreen,
  map: unmountMapScreen,
  add: unmountAddScreen,
  stats: unmountStatsScreen
};

function render() {
  const app = document.getElementById('app');
  const player = getCurrentPlayer();
  app.innerHTML = '';

  app.appendChild(h('header', { class: 'app-header' }, [
    h('div', { class: 'brand' }, [
      h('span', { class: 'brand-mark', html: ICONS.rocket('#FFD93D') }),
      h('span', {}, ['Izzy\u2019s Adventures'])
    ]),
    h('div', { class: 'player-chip', style: { '--avatar-color': player.color } }, [
      h('span', { class: 'avatar' }, [player.name.charAt(0)]),
      h('span', {}, [player.name])
    ])
  ]));

  const main = h('main', { class: 'app-main', id: 'main' });
  app.appendChild(main);

  app.appendChild(h('nav', { class: 'tab-bar', role: 'navigation', 'aria-label': 'Main' },
    TABS.map(t =>
      h('button', {
        class: 'tab' + (currentTab === t.id ? ' active' : ''),
        'aria-current': currentTab === t.id ? 'page' : 'false',
        onClick: () => switchTab(t.id)
      }, [
        h('span', { class: 'icon', html: t.icon }),
        h('span', {}, [t.label])
      ])
    )
  ));

  MOUNTERS[currentTab](main);
}

function switchTab(id) {
  if (id === currentTab) return;
  UNMOUNTERS[currentTab]();
  currentTab = id;
  play('tap');
  haptic(8);
  render();
}

// h() helper (mini, duplicated so app.js doesn't import ui.js which would create cycle)
function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
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

// === Boot ===

function boot() {
  initState();
  render();
  setupInstallPrompt();
  setupBadgeUnlockListener();
  setupNavigationListener();
}

function setupInstallPrompt() {
  let deferred = null;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferred = e;
    const prompt = document.getElementById('install-prompt');
    if (prompt) prompt.hidden = false;
  });

  document.getElementById('install-btn')?.addEventListener('click', async () => {
    if (!deferred) return;
    document.getElementById('install-prompt').hidden = true;
    deferred.prompt();
    await deferred.userChoice;
    deferred = null;
  });

  document.getElementById('install-dismiss')?.addEventListener('click', () => {
    document.getElementById('install-prompt').hidden = true;
  });
}

function setupBadgeUnlockListener() {
  window.addEventListener('badge-unlocked', (e) => {
    const badge = e.detail;
    toast(`🏅 Badge unlocked: ${badge.label}!`, 'success', 4000);
    confetti({ count: 30 });
    play('fanfare');
    haptic([15, 30, 15]);
    refreshSurprise();
    refreshMap();
  });
}

function setupNavigationListener() {
  window.addEventListener('navigate', (e) => {
    switchTab(e.detail.tab);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}