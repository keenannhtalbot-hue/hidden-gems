// App root — Izzy's Weeping Willow Wanderings

import {
  initState, getState, getCurrentPlayer, applyTheme, getActiveTheme, THEMES,
  unlockTheme
} from './state.js';
import { mountSurpriseScreen, unmountSurpriseScreen, refreshSurprise } from './screens/surprise.js';
import { mountMapScreen, unmountMapScreen, refreshMap } from './screens/map.js';
import { mountAddScreen, unmountAddScreen } from './screens/add.js';
import { mountStatsScreen, unmountStatsScreen } from './screens/stats.js';
import { ICONS } from './icons.js';
import { particles, serene, toast } from './ui.js';
import { play } from './audio.js';

let currentTab = 'surprise';
const TABS = [
  { id: 'surprise', label: 'Wander', icon: ICONS.wind('currentColor') },
  { id: 'map',      label: 'Map',    icon: ICONS.map('currentColor') },
  { id: 'add',      label: 'Plant',  icon: ICONS.plus('currentColor') },
  { id: 'stats',    label: 'Grow',   icon: ICONS.chart('currentColor') }
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
      h('span', { class: 'brand-mark', html: ICONS.willow('#7a9573') }),
      h('span', {}, ['Izzy\u2019s Wanderings'])
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

// h() helper
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

// === Splash screen ===

function showSplash() {
  const splash = h('div', { id: 'splash' }, [
    h('div', { class: 'splash-content' }, [
      h('div', { html: ICONS.willow('#7a9573') }),
      h('div', { style: { fontFamily: 'var(--font-serif)', fontSize: '20px', color: 'var(--text-bright)', fontWeight: 500 } }, ['Izzy\u2019s Wanderings'])
    ])
  ]);
  document.body.appendChild(splash);
  setTimeout(() => splash.remove(), 1700);
}

// === Boot ===

function boot() {
  initState();
  applyTheme(getActiveTheme());
  showSplash();
  setTimeout(() => render(), 200);
  setupInstallPrompt();
  setupUnlockListener();
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

function setupUnlockListener() {
  window.addEventListener('badge-unlocked', (e) => {
    const badge = e.detail;
    toast(`🏅 Badge unlocked: ${badge.label}!`, 'success', 4000);
    particles({ count: 30 });
    play('fanfare');
    haptic([15, 30, 15]);
    refreshSurprise();
    refreshMap();
  });

  window.addEventListener('theme-unlocked', (e) => {
    const { themeId } = e.detail;
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
      toast(`🎨 New theme unlocked: ${theme.label}! Check the Grow tab.`, 'legendary', 5000);
      particles({ count: 40 });
      serene('A new season', '#d4a558');
      play('fanfare');
    }
  });

  window.addEventListener('unlock-earned', (e) => {
    const u = e.detail;
    if (u.type === 'hidden-gems') {
      toast(`🗺️ ${u.count} of Izzy's private spots unlocked!`, 'legendary', 5000);
      serene('Izzy reveals', '#a8606c');
      particles({ count: 40 });
    } else if (u.type === 'keenan-fav') {
      toast(`💚 Keenan's Favourite unlocked: ${u.name}!`, 'legendary', 5000);
      serene('From Keenan', '#d4a558');
      particles({ count: 30 });
    } else if (u.type === 'reward') {
      toast(`🏆 Reward unlocked: ${u.title}!`, 'success', 4000);
      particles({ count: 25 });
      play('chime');
    } else if (u.type === 'rank-up') {
      const ranks = ['sapling','sprout','sapling2','branch','grove','forest','ancient'];
      const newRankLabel = u.to.charAt(0).toUpperCase() + u.to.slice(1);
      toast(`🌳 Rank up! You are now a ${newRankLabel}!`, 'legendary', 5000);
      serene(newRankLabel, '#d4a558');
      particles({ count: 50 });
    }
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