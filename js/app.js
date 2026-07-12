// App root — Izzy's Weeping Willow Wanderings
// With watercolor painted background (Izzy's real photos) + wind reactivity

import {
  initState, getState, getCurrentPlayer, applyTheme, getActiveTheme, THEMES
} from './state.js';
import { mountSurpriseScreen, unmountSurpriseScreen, refreshSurprise } from './screens/surprise.js?v=30';
import { mountMapScreen, unmountMapScreen, refreshMap } from './screens/map.js?v=30';
import { mountAddScreen, unmountAddScreen } from './screens/add.js?v=30';
import { mountStatsScreen, unmountStatsScreen } from './screens/stats.js?v=30';
import { ICONS } from './icons.js';
import { particles, serene, toast } from './ui.js';
import { play } from './audio.js';
import { buildDriftingLeaves } from './willow-arch.js';

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

let windState = { speed: 1, raw: 0, lastUpdate: 0 };

// === Day/Night cycle ===

function getDayNightState() {
  const hour = new Date().getHours();
  // 6am-6pm = day, 6pm-6am = night
  if (hour >= 6 && hour < 18) return 'day';
  return 'night';
}

function applyDayNight(force = null) {
  const state = force || getDayNightState();
  const dayLayer = document.querySelector('.bg-layer.day');
  const nightLayer = document.querySelector('.bg-layer.night');
  if (!dayLayer || !nightLayer) return;

  // Use style.setProperty so we don't wipe out other inline styles
  if (state === 'day') {
    dayLayer.style.setProperty('opacity', '0.25', 'important');
    nightLayer.style.setProperty('opacity', '0', 'important');
  } else {
    dayLayer.style.setProperty('opacity', '0', 'important');
    nightLayer.style.setProperty('opacity', '0.25', 'important');
  }
}

// === Wind reactivity (Open-Meteo, free, no key) ===

async function fetchWind() {
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=43.65&longitude=-79.38&current=wind_speed_10m,wind_gusts_10m&wind_speed_unit=kmh';
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!r.ok) throw new Error('bad status');
    const data = await r.json();
    const speed = data.current?.wind_speed_10m || 0;
    const gusts = data.current?.wind_gusts_10m || speed;
    const avg = (speed + gusts) / 2;
    // Map 0-60 km/h to 0.5x-3x speed multiplier (clamped)
    const multiplier = Math.max(0.5, Math.min(3.0, 0.5 + (avg / 60) * 2.5));
    windState = { speed: multiplier, raw: avg, lastUpdate: Date.now() };
    applyWindSpeed(multiplier);
    updateWindPill(avg);
    return multiplier;
  } catch (e) {
    console.warn('Wind fetch failed, using fallback:', e.message);
    // Fallback to 1.2 (slight breeze) — 5 km/h
    windState = { speed: 1.2, raw: 5, lastUpdate: Date.now() };
    applyWindSpeed(1.2);
    updateWindPill(5);
    return 1.2;
  }
}

function applyWindSpeed(multiplier) {
  document.documentElement.style.setProperty('--wind-speed', String(multiplier));
}

function updateWindPill(kmh) {
  const pill = document.getElementById('wind-pill');
  const text = pill?.querySelector('.wind-text');
  if (!pill || !text) return;
  pill.hidden = false;
  let label = 'Calm';
  if (kmh >= 30) label = 'Strong';
  else if (kmh >= 15) label = 'Breezy';
  else if (kmh >= 5) label = 'Light';
  text.textContent = `${Math.round(kmh)} km/h · ${label}`;
}

function render() {
  const app = document.getElementById('app');
  const player = getCurrentPlayer();
  app.innerHTML = '';
  // CRITICAL: app shell must sit ABOVE all background atmosphere
  app.style.cssText = 'position:relative;z-index:100;';

  app.appendChild(h('header', {
      class: 'app-header',
      style: { position: 'sticky', top: '0', zIndex: '200' }
    }, [
      h('div', { class: 'brand' }, [
        h('span', { class: 'brand-mark', html: ICONS.willow('#5a7355') }),
        h('span', {}, ['Izzy\u2019s Wanderings'])
      ]),
      h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        h('div', { class: 'wind-pill', id: 'wind-pill', hidden: true }, [
          h('span', { class: 'wind-arrow' }, ['💨']),
          h('span', { class: 'wind-text' }, ['—'])
        ]),
        h('div', { class: 'player-chip', style: { '--avatar-color': player.color } }, [
          h('span', { class: 'avatar' }, [player.name.charAt(0)]),
          h('span', { class: 'player-name' }, [player.name]),
          h('span', { class: 'player-score' }, [String(getScore(player.id))])
        ])
      ])
    ]));

  const main = h('main', { class: 'app-main', id: 'main' });
  app.appendChild(main);

  app.appendChild(h('nav', {
    class: 'tab-bar',
    role: 'navigation',
    'aria-label': 'Main',
    style: { position: 'fixed', bottom: '0', left: '0', right: '0', zIndex: '200' }
  },
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
  render();
}

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

// === Background + Atmosphere ===

function buildBackground() {
  // bg-layer with inline styles as guaranteed fallback - now much subtler
  const bg = document.createElement('div');
  bg.className = 'bg-layer day';
  // Photo is now a SUBTLE backdrop, not dominant - hero photo lives in the page content
  bg.style.cssText = 'position:fixed !important;inset:0 !important;z-index:0 !important;pointer-events:none;overflow:hidden;width:100vw;height:100vh;background-image:linear-gradient(rgba(45,58,46,0.85),rgba(45,58,46,0.85)),url(assets/willow-day.jpg) !important;background-size:cover !important;background-position:center !important;opacity:0.25;';

  const bgNight = document.createElement('div');
  bgNight.className = 'bg-layer night';
  bgNight.style.cssText = 'position:fixed !important;inset:0 !important;z-index:0 !important;pointer-events:none;overflow:hidden;width:100vw;height:100vh;opacity:0;background-image:linear-gradient(rgba(15,20,40,0.9),rgba(15,20,40,0.9)),url(assets/willow-night.jpg) !important;background-size:cover !important;background-position:center 25% !important;';

  document.body.insertBefore(bgNight, document.body.firstChild);
  document.body.insertBefore(bg, document.body.firstChild);
  applyDayNight(); // SAFE: uses setProperty, doesn't wipe styles

  // Drifting leaves (40 - dialed back, subtle)
  const leavesHost = document.createElement('div');
  leavesHost.className = 'leaves-host';
  leavesHost.style.cssText = 'position:fixed !important;inset:0;pointer-events:none;z-index:6;opacity:0.4;';
  leavesHost.innerHTML = buildDriftingLeaves(40);
  document.body.appendChild(leavesHost);
}

// === Splash screen ===

function showSplash() {
  const splash = h('div', { id: 'splash' }, [
    h('div', { class: 'splash-content' }, [
      h('div', { html: ICONS.willow('#ffffff') }),
      h('div', { class: 'splash-title' }, ["Izzy\u2019s Wanderings"]),
      h('div', { class: 'splash-sub' }, ['Toronto · A painted journey'])
    ])
  ]);
  document.body.appendChild(splash);
  // Remove splash after animation completes
  setTimeout(() => {
    if (splash.parentNode) splash.remove();
  }, 1700);
}

// === Boot ===

function boot() {
  initState();
  applyTheme(getActiveTheme());
  buildBackground();
  showSplash();
  // Fetch wind in background
  fetchWind().then(() => {
    // Re-fetch every 30 mins
    setInterval(fetchWind, 30 * 60 * 1000);
  });
  // Re-evaluate day/night every 30 mins
  setInterval(() => applyDayNight(), 30 * 60 * 1000);
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
    refreshSurprise();
    refreshMap();
  });

  window.addEventListener('theme-unlocked', (e) => {
    const { themeId } = e.detail;
    const theme = THEMES.find(t => t.id === themeId);
    if (theme) {
      toast(`🎨 New theme unlocked: ${theme.label}!`, 'legendary', 5000);
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