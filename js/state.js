// State management — Izzy's Interstellar Adventures
import { CATEGORIES, GEMS as STARTER_GEMS, RARITY, haversineKm, pickRandomGem } from '../data/gems.js';

const LS_KEY = 'izzy.state.v2';

const DEFAULT_STATE = {
  players: [
    { id: 'keenan', name: 'Keenan', color: '#FFD93D' },
    { id: 'izzy',   name: 'Izzy',   color: '#F472B6' }
  ],
  currentPlayerId: 'keenan',
  visited: {},          // gemId -> { by, ts, note }
  customGems: [],
  filters: Object.keys(CATEGORIES),
  distanceKm: 0,        // 0 = no filter, otherwise max km from user location
  userLocation: null,   // {lat, lng, ts}
  badges: {},
  soundOn: true,
};

let state = null;
const listeners = new Set();

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      // Try to migrate from old hidden-gems state v1
      const old = localStorage.getItem('hgh.state.v1');
      if (old) {
        try {
          const parsed = JSON.parse(old);
          const migrated = structuredClone(DEFAULT_STATE);
          if (Array.isArray(parsed.players) && parsed.players.length === 2) {
            migrated.players = parsed.players;
            // Rename "Maya" → "Izzy" since sister is Izzy
            const maya = migrated.players.find(p => p.name === 'Maya');
            if (maya) { maya.name = 'Izzy'; maya.color = '#F472B6'; }
          }
          if (typeof parsed.currentPlayerId === 'string') migrated.currentPlayerId = parsed.currentPlayerId;
          if (parsed.visited && typeof parsed.visited === 'object') migrated.visited = parsed.visited;
          if (Array.isArray(parsed.customGems)) migrated.customGems = parsed.customGems.filter(g => g && g.id && g.name);
          if (Array.isArray(parsed.filters)) migrated.filters = parsed.filters.filter(f => CATEGORIES[f]);
          return migrated;
        } catch { /* fall through */ }
      }
      return structuredClone(DEFAULT_STATE);
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return structuredClone(DEFAULT_STATE);
    const s = structuredClone(DEFAULT_STATE);
    if (Array.isArray(parsed.players) && parsed.players.length === 2) s.players = parsed.players;
    if (typeof parsed.currentPlayerId === 'string') s.currentPlayerId = parsed.currentPlayerId;
    if (parsed.visited && typeof parsed.visited === 'object') s.visited = parsed.visited;
    if (Array.isArray(parsed.customGems)) s.customGems = parsed.customGems.filter(g => g && g.id && g.name);
    if (Array.isArray(parsed.filters)) s.filters = parsed.filters.filter(f => CATEGORIES[f]);
    if (parsed.badges && typeof parsed.badges === 'object') s.badges = parsed.badges;
    if (typeof parsed.soundOn === 'boolean') s.soundOn = parsed.soundOn;
    if (typeof parsed.distanceKm === 'number' && isFinite(parsed.distanceKm) && parsed.distanceKm >= 0) s.distanceKm = parsed.distanceKm;
    if (parsed.userLocation && typeof parsed.userLocation === 'object') s.userLocation = parsed.userLocation;
    return s;
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); }
  catch (e) { console.warn('localStorage write failed:', e.message); }
}

export function initState() { state = loadState(); return state; }
export function getState() { if (!state) state = loadState(); return state; }

export function setState(updater) {
  if (!state) state = loadState();
  state = typeof updater === 'function' ? updater(state) : { ...state, ...updater };
  saveState();
  for (const l of listeners) l(state);
}

export function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }

// === Derived ===

export function allGems() { const s = getState(); return [...STARTER_GEMS, ...s.customGems]; }
export function getGem(id) { return allGems().find(g => g.id === id); }
export function getCategory(catId) { return CATEGORIES[catId]; }
export function getRarity(tier) { return RARITY[tier] || RARITY[1]; }
export function getPlayer(id) { const s = getState(); return s.players.find(p => p.id === id) || s.players[0]; }
export function getCurrentPlayer() { return getPlayer(getState().currentPlayerId); }
export function setCurrentPlayer(id) { setState({ currentPlayerId: id }); }

export function toggleVisited(gemId) {
  const s = getState();
  const wasVisited = !!s.visited[gemId];
  if (wasVisited) {
    const next = { ...s.visited };
    delete next[gemId];
    setState({ visited: next });
  } else {
    setState({
      visited: {
        ...s.visited,
        [gemId]: { by: s.currentPlayerId, ts: Date.now(), note: s.visited[gemId]?.note || '' }
      }
    });
    awardBadgesForVisit(gemId);
  }
  return !wasVisited;
}

export function setNote(gemId, note) {
  const s = getState();
  const existing = s.visited[gemId] || { by: s.currentPlayerId, ts: Date.now(), note: '' };
  setState({ visited: { ...s.visited, [gemId]: { ...existing, note } } });
}

export function getNote(gemId) { return getState().visited[gemId]?.note || ''; }
export function isVisited(gemId) { return !!getState().visited[gemId]; }
export function getVisitedBy(gemId) { return getState().visited[gemId]?.by; }

export function toggleFilter(catId) {
  const s = getState();
  let next = s.filters.includes(catId) ? s.filters.filter(f => f !== catId) : [...s.filters, catId];
  if (next.length === 0) return;
  setState({ filters: next });
}

export function setDistance(km) {
  setState({ distanceKm: Math.max(0, Math.min(50, km)) });
}

export function setUserLocation(loc) {
  setState({ userLocation: loc });
}

export function addCustomGem(gem) {
  const s = getState();
  const id = 'custom-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const newGem = { id, rarity: 2, ...gem };
  setState({ customGems: [...s.customGems, newGem] });
  awardBadgesForVisit();
  return newGem;
}

export function pickGem() {
  const s = getState();
  const visited = Object.keys(s.visited);
  const opts = {
    categories: s.filters.length < Object.keys(CATEGORIES).length ? s.filters : null,
    visited,
    distanceFilter: s.distanceKm > 0 ? s.distanceKm : null,
    userLoc: s.userLocation
  };
  return pickRandomGem(opts.categories, opts.visited, opts.distanceFilter, opts.userLoc);
}

export function distanceFromUser(gem) {
  const s = getState();
  if (!s.userLocation) return null;
  return haversineKm(s.userLocation, gem);
}

// === Score / leaderboard ===

export function getScore(playerId) {
  const s = getState();
  const gems = allGems();
  let score = 0;
  for (const gemId in s.visited) {
    if (s.visited[gemId]?.by === playerId) {
      const gem = gems.find(g => g.id === gemId);
      if (!gem) continue;
      const catPts = CATEGORIES[gem.category]?.points || 10;
      const rarityPts = RARITY[gem.rarity]?.points || 1;
      score += catPts * rarityPts;
    }
  }
  return score;
}

export function getLeaderboard() {
  const s = getState();
  return s.players.map(p => ({ ...p, score: getScore(p.id) })).sort((a, b) => b.score - a.score);
}

export function getStats() {
  const s = getState();
  const gems = allGems();
  const visited = Object.keys(s.visited);
  const byCategory = {};
  for (const cat in CATEGORIES) byCategory[cat] = 0;
  for (const id of visited) {
    const g = gems.find(x => x.id === id);
    if (g && byCategory[g.category] !== undefined) byCategory[g.category]++;
  }
  return {
    totalVisited: visited.length,
    totalAvailable: gems.length,
    byCategory,
    customGems: s.customGems.length,
    byRarity: {
      legendary: visited.filter(id => gems.find(g => g.id === id)?.rarity === 5).length,
      epic:      visited.filter(id => gems.find(g => g.id === id)?.rarity === 4).length,
      rare:      visited.filter(id => gems.find(g => g.id === id)?.rarity === 3).length,
    },
    playerScores: s.players.map(p => ({ ...p, score: getScore(p.id) })),
  };
}

// === Badges ===

export const BADGES = [
  { id: 'first_gem',     icon: 'sparkle', label: 'First Contact',     test: s => Object.keys(s.visited).length >= 1 },
  { id: 'five_gems',     icon: 'rarity2',  label: '5 Planets',         test: s => Object.keys(s.visited).length >= 5 },
  { id: 'ten_gems',      icon: 'rarity3',  label: '10 Galaxies',       test: s => Object.keys(s.visited).length >= 10 },
  { id: 'twenty_gems',   icon: 'rarity4',  label: '20 Stars',         test: s => Object.keys(s.visited).length >= 20 },
  { id: 'all_food',      icon: 'fork',     label: 'Foodie Voyager',    test: s => allOfCategoryVisited(s, 'food') },
  { id: 'all_art',       icon: 'brush',    label: 'Art Collector',     test: s => allOfCategoryVisited(s, 'art') },
  { id: 'all_view',      icon: 'eye',      label: 'Skyline Astronomer', test: s => allOfCategoryVisited(s, 'view') },
  { id: 'all_shop',      icon: 'shop',     label: 'Shop Hunter',       test: s => allOfCategoryVisited(s, 'shop') },
  { id: 'all_history',   icon: 'column',   label: 'Time Traveler',     test: s => allOfCategoryVisited(s, 'history') },
  { id: 'first_custom',  icon: 'plus',     label: 'Cartographer',      test: s => s.customGems.length >= 1 },
  { id: 'three_custom',  icon: 'planet',   label: 'Trailblazer',       test: s => s.customGems.length >= 3 },
  { id: 'first_legend',  icon: 'rarity5',  label: 'Supernova Sight',   test: s => anyVisitedOfRarity(s, 5) },
  { id: 'three_epic',    icon: 'rarity4',  label: 'Nebula Hunter',     test: s => countVisitedOfRarity(s, 4) >= 3 },
  { id: 'beat_sibling',  icon: 'trophy',   label: 'Sibling Champion',  test: s => isBeatingSibling(s) },
  { id: 'tied_sibling',  icon: 'medal',    label: 'Twin Stars',        test: s => isTiedWithSibling(s) },
];

function allOfCategoryVisited(s, catId) {
  const gemIds = [...STARTER_GEMS, ...s.customGems].filter(g => g.category === catId).map(g => g.id);
  if (gemIds.length === 0) return false;
  return gemIds.every(id => s.visited[id]);
}

function anyVisitedOfRarity(s, tier) {
  const gems = [...STARTER_GEMS, ...s.customGems];
  return Object.keys(s.visited).some(id => gems.find(g => g.id === id)?.rarity === tier);
}

function countVisitedOfRarity(s, tier) {
  const gems = [...STARTER_GEMS, ...s.customGems];
  return Object.keys(s.visited).filter(id => gems.find(g => g.id === id)?.rarity === tier).length;
}

function isBeatingSibling(s) {
  if (s.players.length < 2) return false;
  const scores = s.players.map(p => ({ id: p.id, score: getScore(p.id) }));
  const meId = s.currentPlayerId;
  const my = scores.find(x => x.id === meId);
  const other = scores.find(x => x.id !== meId);
  return my && other && my.score > other.score;
}

function isTiedWithSibling(s) {
  if (s.players.length < 2) return false;
  const scores = s.players.map(p => getScore(p.id));
  return scores[0] === scores[1] && scores[0] > 0;
}

function awardBadgesForVisit() {
  const s = getState();
  const newlyUnlocked = [];
  const newBadges = { ...s.badges };
  for (const b of BADGES) {
    if (!newBadges[b.id] && b.test(s)) {
      newBadges[b.id] = true;
      newlyUnlocked.push(b);
    }
  }
  if (newlyUnlocked.length) {
    setState({ badges: newBadges });
    for (const b of newlyUnlocked) {
      window.dispatchEvent(new CustomEvent('badge-unlocked', { detail: b }));
    }
  }
}

export function getUnlockedBadges() { return getState().badges || {}; }
export function setSoundOn(on) { setState({ soundOn: !!on }); }

// Helper: ask for user location (returns promise)
export function requestUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error('Geolocation not available'));
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude, ts: Date.now() };
        setUserLocation(loc);
        resolve(loc);
      },
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  });
}