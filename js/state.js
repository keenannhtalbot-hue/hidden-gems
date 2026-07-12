// State management — tiny reactive store, vanilla JS, no framework
// All persisted state lives here. Hydrated from localStorage on boot.

import { CATEGORIES, GEMS as STARTER_GEMS } from '../data/gems.js';

const LS_KEY = 'hgh.state.v1';

const DEFAULT_STATE = {
  // Player identity (kept simple — two named players for the sibling showdown)
  players: [
    { id: 'keenan', name: 'Keenan', color: '#FFD93D' },
    { id: 'maya',   name: 'Maya',   color: '#4ECDC4' }
  ],
  currentPlayerId: 'keenan',

  visited: {},          // gemId -> { by: playerId, ts, note }
  customGems: [],       // user-added gems
  filters: Object.keys(CATEGORIES), // all selected by default
  badges: {},           // badgeId -> true
  soundOn: true,
  lastSurpriseAt: 0,
};

let state = null;
const listeners = new Set();

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    // Trust-boundary: validate every field, fall back if invalid
    if (!parsed || typeof parsed !== 'object') return structuredClone(DEFAULT_STATE);
    const s = structuredClone(DEFAULT_STATE);
    // Merge known fields defensively
    if (Array.isArray(parsed.players) && parsed.players.length === 2) s.players = parsed.players;
    if (typeof parsed.currentPlayerId === 'string') s.currentPlayerId = parsed.currentPlayerId;
    if (parsed.visited && typeof parsed.visited === 'object') s.visited = parsed.visited;
    if (Array.isArray(parsed.customGems)) s.customGems = parsed.customGems.filter(g => g && g.id && g.name);
    if (Array.isArray(parsed.filters)) s.filters = parsed.filters.filter(f => CATEGORIES[f]);
    if (parsed.badges && typeof parsed.badges === 'object') s.badges = parsed.badges;
    if (typeof parsed.soundOn === 'boolean') s.soundOn = parsed.soundOn;
    if (typeof parsed.lastSurpriseAt === 'number') s.lastSurpriseAt = parsed.lastSurpriseAt;
    return s;
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch (e) {
    // Quota exceeded or storage disabled — silently degrade, we keep working in-memory
    console.warn('localStorage write failed:', e.message);
  }
}

export function initState() {
  state = loadState();
  return state;
}

export function getState() {
  if (!state) state = loadState();
  return state;
}

export function setState(updater) {
  if (!state) state = loadState();
  const next = typeof updater === 'function' ? updater(state) : updater;
  state = { ...state, ...next };
  saveState();
  for (const l of listeners) l(state);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// === Derived helpers ===

export function allGems() {
  const s = getState();
  return [...STARTER_GEMS, ...s.customGems];
}

export function getGem(id) {
  return allGems().find(g => g.id === id);
}

export function getCategory(catId) {
  return CATEGORIES[catId];
}

export function getPlayer(id) {
  const s = getState();
  return s.players.find(p => p.id === id) || s.players[0];
}

export function getCurrentPlayer() {
  return getPlayer(getState().currentPlayerId);
}

export function setCurrentPlayer(id) {
  setState({ currentPlayerId: id });
}

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
  setState({
    visited: { ...s.visited, [gemId]: { ...existing, note } }
  });
}

export function getNote(gemId) {
  return getState().visited[gemId]?.note || '';
}

export function isVisited(gemId) {
  return !!getState().visited[gemId];
}

export function getVisitedBy(gemId) {
  return getState().visited[gemId]?.by;
}

export function toggleFilter(catId) {
  const s = getState();
  let next;
  if (s.filters.includes(catId)) {
    next = s.filters.filter(f => f !== catId);
  } else {
    next = [...s.filters, catId];
  }
  // Don't allow zero filters — that would just show an empty app
  if (next.length === 0) return;
  setState({ filters: next });
}

export function addCustomGem(gem) {
  const s = getState();
  const id = 'custom-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6);
  const newGem = { id, rarity: 2, ...gem };
  setState({ customGems: [...s.customGems, newGem] });
  awardBadgesForAddGem();
  return newGem;
}

// === Score / leaderboard ===

export function getScore(playerId) {
  const s = getState();
  const gems = allGems();
  let score = 0;
  for (const gemId in s.visited) {
    if (s.visited[gemId]?.by === playerId) {
      const gem = gems.find(g => g.id === gemId);
      if (gem) score += CATEGORIES[gem.category]?.points || 10;
    }
  }
  return score;
}

export function getLeaderboard() {
  const s = getState();
  return s.players
    .map(p => ({ ...p, score: getScore(p.id) }))
    .sort((a, b) => b.score - a.score);
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
    playerScores: s.players.map(p => ({ ...p, score: getScore(p.id) })),
  };
}

// === Badges ===

export const BADGES = [
  { id: 'first_gem',    icon: '💎', label: 'First Gem',     test: s => Object.keys(s.visited).length >= 1 },
  { id: 'five_gems',    icon: '🌟', label: '5 Gems',        test: s => Object.keys(s.visited).length >= 5 },
  { id: 'ten_gems',     icon: '✨', label: '10 Gems',       test: s => Object.keys(s.visited).length >= 10 },
  { id: 'all_food',     icon: '🍜', label: 'Foodie',        test: s => allOfCategoryVisited(s, 'food') },
  { id: 'all_art',      icon: '🎨', label: 'Art Buff',      test: s => allOfCategoryVisited(s, 'art') },
  { id: 'all_view',     icon: '🌆', label: 'Skyline Pro',   test: s => allOfCategoryVisited(s, 'view') },
  { id: 'all_shop',     icon: '🛍️', label: 'Shop Hunter',   test: s => allOfCategoryVisited(s, 'shop') },
  { id: 'all_history',  icon: '🏛️', label: 'Historian',     test: s => allOfCategoryVisited(s, 'history') },
  { id: 'first_custom', icon: '➕', label: 'Cartographer',  test: s => s.customGems.length >= 1 },
  { id: 'three_custom', icon: '🗺️', label: 'Trailblazer',   test: s => s.customGems.length >= 3 },
  { id: 'beat_sibling', icon: '🏆', label: 'Siblings Won',  test: s => isBeatingSibling(s, true) },
  { id: 'tied_sibling', icon: '🤝', label: 'Dead Even',     test: s => isTiedWithSibling(s) },
];

function allOfCategoryVisited(s, catId) {
  const gemIds = [...STARTER_GEMS, ...s.customGems].filter(g => g.category === catId).map(g => g.id);
  if (gemIds.length === 0) return false;
  return gemIds.every(id => s.visited[id]);
}

function isBeatingSibling(s, me) {
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

function awardBadgesForVisit(gemId) {
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
    // Notify listeners so UI can show unlock animation
    for (const b of newlyUnlocked) {
      window.dispatchEvent(new CustomEvent('badge-unlocked', { detail: b }));
    }
  }
}

function awardBadgesForAddGem() {
  awardBadgesForVisit(null); // re-run all badge tests
}

export function getUnlockedBadges() {
  return getState().badges || {};
}

export function setSoundOn(on) {
  setState({ soundOn: !!on });
}