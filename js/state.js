// State — Izzy's Weeping Willow Wanderings
import { CATEGORIES, GEMS as STARTER_GEMS, RARITY, haversineKm, pickRandomGem } from '../data/gems.js';

const LS_KEY = 'izzy.state.v3';

const DEFAULT_STATE = {
  players: [
    { id: 'keenan', name: 'Keenan', color: '#d4a558' },
    { id: 'izzy',   name: 'Izzy',   color: '#a8606c' }
  ],
  currentPlayerId: 'keenan',
  visited: {},          // gemId -> { by, ts, note, photo, questResults }
  customGems: [],
  filters: Object.keys(CATEGORIES),
  distanceKm: 0,
  userLocation: null,
  badges: {},
  unlocks: {
    themes: ['willow'],          // unlocked themes
    activeTheme: 'willow',
    hiddenGemsRevealed: [],     // revealed private collection ids
    rewards: [],                  // earned souvenir cards
    keenanFavourites: [],         // unlocked fav place ids
    photoGalleryIds: [],          // collected photo ids
    treeProgress: 0,              // 0-100 willow tree fill
    rank: 'sapling',              // current wanderer rank
    xp: 0
  },
  soundOn: true,
  lastShownGemId: null,           // bug fix: don't repeat the same gem twice
};

let state = null;
const listeners = new Set();

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      // Try to migrate from v2
      const old = localStorage.getItem('izzy.state.v2') || localStorage.getItem('hgh.state.v1');
      if (old) {
        try {
          const parsed = JSON.parse(old);
          return migrate(parsed);
        } catch { /* fall through */ }
      }
      return structuredClone(DEFAULT_STATE);
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return structuredClone(DEFAULT_STATE);
    return migrate(parsed);
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

function migrate(parsed) {
  const s = structuredClone(DEFAULT_STATE);
  if (Array.isArray(parsed.players) && parsed.players.length === 2) s.players = parsed.players;
  if (typeof parsed.currentPlayerId === 'string') s.currentPlayerId = parsed.currentPlayerId;
  if (parsed.visited && typeof parsed.visited === 'object') {
    s.visited = parsed.visited;
  }
  if (Array.isArray(parsed.customGems)) s.customGems = parsed.customGems.filter(g => g && g.id && g.name);
  if (Array.isArray(parsed.filters)) s.filters = parsed.filters.filter(f => CATEGORIES[f]);
  if (parsed.badges && typeof parsed.badges === 'object') s.badges = parsed.badges;
  if (typeof parsed.soundOn === 'boolean') s.soundOn = parsed.soundOn;
  if (typeof parsed.distanceKm === 'number' && isFinite(parsed.distanceKm) && parsed.distanceKm >= 0) s.distanceKm = parsed.distanceKm;
  if (parsed.userLocation && typeof parsed.userLocation === 'object') s.userLocation = parsed.userLocation;
  if (parsed.lastShownGemId) s.lastShownGemId = parsed.lastShownGemId;
  if (parsed.unlocks && typeof parsed.unlocks === 'object') {
    s.unlocks = { ...s.unlocks, ...parsed.unlocks };
  }
  return s;
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

export function allGems() { const s = getState(); return [...STARTER_GEMS, ...s.customGems]; }
export function getGem(id) { return allGems().find(g => g.id === id); }
export function getCategory(catId) { return CATEGORIES[catId]; }
export function getRarity(tier) { return RARITY[tier] || RARITY[1]; }
export function getPlayer(id) { const s = getState(); return s.players.find(p => p.id === id) || s.players[0]; }
export function getCurrentPlayer() { return getPlayer(getState().currentPlayerId); }
export function setCurrentPlayer(id) { setState({ currentPlayerId: id }); }

// === Theme system ===

export function getActiveTheme() {
  return getState().unlocks.activeTheme || 'willow';
}

export function setActiveTheme(themeId) {
  const s = getState();
  if (!s.unlocks.themes.includes(themeId)) return;
  setState({ unlocks: { ...s.unlocks, activeTheme: themeId } });
  applyTheme(themeId);
}

export function applyTheme(themeId) {
  document.documentElement.setAttribute('data-theme', themeId);
}

export function unlockTheme(themeId) {
  const s = getState();
  if (s.unlocks.themes.includes(themeId)) return false;
  setState({ unlocks: { ...s.unlocks, themes: [...s.unlocks.themes, themeId] } });
  window.dispatchEvent(new CustomEvent('theme-unlocked', { detail: { themeId } }));
  return true;
}

// === Visit + photo + quests ===

export function markVisited(gemId, photoDataUrl = null, questResults = null) {
  const s = getState();
  setState({
    visited: {
      ...s.visited,
      [gemId]: {
        by: s.currentPlayerId,
        ts: Date.now(),
        note: s.visited[gemId]?.note || '',
        photo: photoDataUrl || s.visited[gemId]?.photo || null,
        questResults: questResults || s.visited[gemId]?.questResults || null
      }
    }
  });
  awardBadgesForVisit(gemId);
  awardUnlocks();
}

export function unmarkVisited(gemId) {
  const s = getState();
  const next = { ...s.visited };
  delete next[gemId];
  setState({ visited: next });
}

export function toggleVisited(gemId) {
  if (isVisited(gemId)) unmarkVisited(gemId);
  else markVisited(gemId);
  return isVisited(gemId);
}

export function setNote(gemId, note) {
  const s = getState();
  const existing = s.visited[gemId] || { by: s.currentPlayerId, ts: Date.now(), note: '', photo: null };
  setState({ visited: { ...s.visited, [gemId]: { ...existing, note } } });
}

export function setPhoto(gemId, photoDataUrl) {
  const s = getState();
  const existing = s.visited[gemId] || { by: s.currentPlayerId, ts: Date.now(), note: '', photo: null, questResults: null };
  setState({
    visited: { ...s.visited, [gemId]: { ...existing, photo: photoDataUrl } },
    unlocks: { ...s.unlocks, photoGalleryIds: [...new Set([...s.unlocks.photoGalleryIds, gemId])] }
  });
  window.dispatchEvent(new CustomEvent('photo-added', { detail: { gemId } }));
}

export function getNote(gemId) { return getState().visited[gemId]?.note || ''; }
export function isVisited(gemId) { return !!getState().visited[gemId]; }
export function getVisitedBy(gemId) { return getState().visited[gemId]?.by; }
export function getGemPhoto(gemId) { return getState().visited[gemId]?.photo || null; }

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
  return newGem;
}

// === Pick gem — fixed to avoid same-gem-twice-in-a-row ===

export function pickGem() {
  const s = getState();
  const visited = Object.keys(s.visited);
  const opts = {
    categories: s.filters.length < Object.keys(CATEGORIES).length ? s.filters : null,
    visited,
    distanceFilter: s.distanceKm > 0 ? s.distanceKm : null,
    userLoc: s.userLocation
  };
  const gem = pickRandomGem(opts.categories, opts.visited, opts.distanceFilter, opts.userLoc);
  if (gem) {
    setState({ lastShownGemId: gem.id });
  }
  return gem;
}

export function distanceFromUser(gem) {
  const s = getState();
  if (!s.userLocation) return null;
  return haversineKm(s.userLocation, gem);
}

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

// === Score ===

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
    photoCount: s.unlocks.photoGalleryIds.length,
    playerScores: s.players.map(p => ({ ...p, score: getScore(p.id) })),
    rank: s.unlocks.rank,
    xp: s.unlocks.xp
  };
}

// === Badges (15) ===

export const BADGES = [
  { id: 'first_gem',     icon: 'sparkle', label: 'First Step',         test: s => Object.keys(s.visited).length >= 1 },
  { id: 'five_gems',     icon: 'rarity2', label: '5 Wanderings',       test: s => Object.keys(s.visited).length >= 5 },
  { id: 'ten_gems',      icon: 'rarity3', label: '10 Wanderings',      test: s => Object.keys(s.visited).length >= 10 },
  { id: 'twenty_gems',   icon: 'rarity4', label: '20 Wanderings',     test: s => Object.keys(s.visited).length >= 20 },
  { id: 'all_food',      icon: 'fork',    label: 'Food Wanderer',      test: s => allOfCategoryVisited(s, 'food') },
  { id: 'all_art',       icon: 'brush',   label: 'Art Wanderer',       test: s => allOfCategoryVisited(s, 'art') },
  { id: 'all_view',      icon: 'eye',     label: 'Skyline Wanderer',   test: s => allOfCategoryVisited(s, 'view') },
  { id: 'all_shop',      icon: 'shop',    label: 'Shop Wanderer',      test: s => allOfCategoryVisited(s, 'shop') },
  { id: 'all_history',   icon: 'column',  label: 'Time Wanderer',      test: s => allOfCategoryVisited(s, 'history') },
  { id: 'first_custom',  icon: 'plus',    label: 'Cartographer',       test: s => s.customGems.length >= 1 },
  { id: 'three_custom',  icon: 'plant',   label: 'Trailblazer',        test: s => s.customGems.length >= 3 },
  { id: 'first_legend',  icon: 'rarity5', label: 'Supernova Sight',    test: s => anyVisitedOfRarity(s, 5) },
  { id: 'three_epic',    icon: 'rarity4', label: 'Nebula Hunter',      test: s => countVisitedOfRarity(s, 4) >= 3 },
  { id: 'beat_sibling',  icon: 'trophy',  label: 'Sibling Champion',   test: s => isBeatingSibling(s) },
  { id: 'tied_sibling',  icon: 'medal',   label: 'Twin Stars',         test: s => isTiedWithSibling(s) },
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
  const me = scores.find(x => x.id === s.currentPlayerId);
  const other = scores.find(x => x.id !== s.currentPlayerId);
  return me && other && me.score > other.score;
}

function isTiedWithSibling(s) {
  if (s.players.length < 2) return false;
  const scores = s.players.map(p => getScore(p.id));
  return scores[0] === scores[1] && scores[0] > 0;
}

function awardBadgesForVisit() {
  const s = getState();
  const newly = [];
  const newBadges = { ...s.badges };
  for (const b of BADGES) {
    if (!newBadges[b.id] && b.test(s)) {
      newBadges[b.id] = true;
      newly.push(b);
    }
  }
  if (newly.length) {
    setState({ badges: newBadges });
    for (const b of newly) {
      window.dispatchEvent(new CustomEvent('badge-unlocked', { detail: b }));
    }
  }
}

export function getUnlockedBadges() { return getState().badges || {}; }
export function setSoundOn(on) { setState({ soundOn: !!on }); }

// === 7 UNLOCK TRACKS ===

// 1. Hidden Gem Reveal — Izzy's Private Collection
export const IZZY_PRIVATE_COLLECTION = [
  { id: 'priv-1', name: 'Izzy\'s First Bench', category: 'view', rarity: 5, lat: 43.6532, lng: -79.3832, blurb: 'The bench where Izzy sat the day she decided to stay in Toronto.', tip: 'Best at sunrise. Bring coffee. Sit quietly.', address: 'Secret — revealed after unlock' },
  { id: 'priv-2', name: 'Izzy\'s Childhood Corner', category: 'history', rarity: 4, lat: 43.6612, lng: -79.3495, blurb: 'A corner Izzy used to play in when she was small.', tip: 'Look for the old mural behind the school fence.', address: 'Secret — revealed after unlock' },
  { id: 'priv-3', name: 'Izzy\'s Pizza Place', category: 'food', rarity: 4, lat: 43.6403, lng: -79.3586, blurb: 'The first place she took Keenan when he visited.', tip: 'Order the margherita. Trust.', address: 'Secret — revealed after unlock' }
];

// 2. Custom Themes (5)
export const THEMES = [
  { id: 'willow',  label: 'Weeping Willow', icon: 'themeWillow' },
  { id: 'autumn',  label: 'Autumn Maple',   icon: 'themeAutumn',  unlockAt: 5 },   // visit 5 gems
  { id: 'blossom', label: 'Cherry Blossom', icon: 'themeBlossom', unlockAt: 10 },
  { id: 'winter',  label: 'Winter Pine',    icon: 'themeWinter',  unlockAt: 20 },
  { id: 'midnight',label: 'Midnight Bloom', icon: 'themeMidnight',unlockAt: 30 },
];

// 5. Keenan's Favourite Places (pre-written — fill in!)
export const KEENAN_FAVOURITES = [
  { id: 'kf-1', name: 'Randy\'s Roti', category: 'food', rarity: 4, lat: 43.6532, lng: -79.4025,
    why: 'Because the doubles are the best thing I\'ve ever eaten and I still think about them.',
    unlockAt: 3
  },
  { id: 'kf-2', name: 'Polson Pier', category: 'view', rarity: 4, lat: 43.6403, lng: -79.3586,
    why: 'Because watching the sunset from the end of the pier with you felt like being in a movie.',
    unlockAt: 7
  },
  { id: 'kf-3', name: 'Graffiti Alley', category: 'art', rarity: 4, lat: 43.6497, lng: -79.4204,
    why: 'Because every wall tells a different story and I\'d go back every weekend if I could.',
    unlockAt: 15
  }
];

// 6. Tree of Memories — ranks
export const RANKS = [
  { id: 'sapling',     label: 'Sapling',      minXp: 0,   color: '#98a496', icon: '🌱' },
  { id: 'sprout',      label: 'Sprout',       minXp: 50,  color: '#88aab5', icon: '🌿' },
  { id: 'sapling2',    label: 'Young Willow', minXp: 150, color: '#7d8fc0', icon: '🌳' },
  { id: 'branch',      label: 'Branch',       minXp: 300, color: '#8b6e9b', icon: '🍃' },
  { id: 'grove',       label: 'Grove',        minXp: 500, color: '#d4a558', icon: '🌲' },
  { id: 'forest',      label: 'Forest',       minXp: 800, color: '#c8623c', icon: '🏞️' },
  { id: 'ancient',     label: 'Ancient Willow', minXp: 1200, color: '#a8606c', icon: '🌌' }
];

export function getCurrentRank() {
  const xp = getState().unlocks.xp || 0;
  let current = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) current = r;
  }
  return current;
}

export function getNextRank() {
  const xp = getState().unlocks.xp || 0;
  for (const r of RANKS) {
    if (xp < r.minXp) return r;
  }
  return null;
}

// 3. Real-world rewards (souvenir cards)
export const REWARDS = [
  { id: 'rw-first-gem',    title: 'First Wanderer',    desc: 'Found your first gem', unlockAt: 1 },
  { id: 'rw-five-gems',    title: 'Wanderer',          desc: '5 gems discovered',   unlockAt: 5 },
  { id: 'rw-beat-izzy',    title: 'Sibling Champion',  desc: 'Beat Izzy\'s score',  unlockAt: -1 }, // dynamic
  { id: 'rw-photo-pro',    title: 'Photographer',      desc: '10 photo proofs',     unlockAt: 10 },
  { id: 'rw-legend',       title: 'Legendary Sight',   desc: 'Found a Legendary',   unlockAt: -2 },
  { id: 'rw-all-cats',     title: 'True Wanderer',     desc: 'All categories done', unlockAt: -3 }
];

// Award unlocks based on current state
function awardUnlocks() {
  const s = getState();
  const visited = Object.keys(s.visited);
  const newly = [];
  let unlocks = { ...s.unlocks };

  // Theme unlocks (by visit count)
  for (const theme of THEMES) {
    if (theme.id === 'willow') continue; // default
    if (visited.length >= theme.unlockAt && !unlocks.themes.includes(theme.id)) {
      unlocks.themes = [...unlocks.themes, theme.id];
      newly.push({ type: 'theme', ...theme });
    }
  }

  // Hidden Gem Reveal — revealed after visiting 8 gems
  if (visited.length >= 8 && unlocks.hiddenGemsRevealed.length === 0) {
    unlocks.hiddenGemsRevealed = IZZY_PRIVATE_COLLECTION.map(g => g.id);
    newly.push({ type: 'hidden-gems', count: IZZY_PRIVATE_COLLECTION.length });
  }

  // Keenan's Favourites unlock by visit count
  for (const fav of KEENAN_FAVOURITES) {
    if (visited.length >= fav.unlockAt && !unlocks.keenanFavourites.includes(fav.id)) {
      unlocks.keenanFavourites = [...unlocks.keenanFavourites, fav.id];
      newly.push({ type: 'keenan-fav', ...fav });
    }
  }

  // XP from visits (10 per gem + rarity bonus)
  const newXp = unlocks.xp + 10;
  const oldRank = s.unlocks.rank;
  const newRank = computeRank(newXp).id;
  unlocks.xp = newXp;
  unlocks.rank = newRank;
  if (oldRank !== newRank) {
    newly.push({ type: 'rank-up', from: oldRank, to: newRank });
  }

  // Tree progress = % of categories done
  const cats = ['food', 'art', 'view', 'shop', 'history'];
  const total = cats.reduce((sum, c) => sum + (STARTER_GEMS.filter(g => g.category === c).length), 0);
  const done = visited.filter(id => {
    const g = getGem(id);
    return g && !g.custom && !g.id?.startsWith('priv-') && !g.id?.startsWith('kf-');
  }).length;
  unlocks.treeProgress = Math.min(100, Math.round((done / total) * 100));

  // Rewards
  for (const r of REWARDS) {
    if (unlocks.rewards.includes(r.id)) continue;
    if (r.unlockAt > 0 && visited.length >= r.unlockAt) {
      unlocks.rewards = [...unlocks.rewards, r.id];
      newly.push({ type: 'reward', ...r });
    }
  }

  if (newly.length) {
    setState({ unlocks });
    for (const u of newly) {
      window.dispatchEvent(new CustomEvent('unlock-earned', { detail: u }));
    }
  }
}

function computeRank(xp) {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (xp >= r.minXp) current = r;
  }
  return current;
}

// === Quest system ===

export const QUEST_TYPES = {
  TIMED: 'timed',
  SPOT: 'spot',
  CHAIN: 'chain',
  STORY: 'story'
};

// Built-in quests per category
export const QUESTS = {
  food: [
    { type: 'timed', duration: 180, title: 'Capture the feast', desc: 'Take a photo of your meal with Izzy within 3 minutes of being seated', icon: 'camera' },
    { type: 'spot', title: 'Find the kitchen', desc: 'Can you spot into the kitchen? Most restaurants have a peek.', subtasks: ['Spotted the chef', 'Saw the kitchen pass', 'Heard sizzling'] },
    { type: 'story', title: 'Food story', desc: 'Record a 30-second voice note about your reaction to the first bite' }
  ],
  art: [
    { type: 'timed', duration: 120, title: 'Strike a pose', desc: 'Mimic the pose of the art within 2 minutes', icon: 'camera' },
    { type: 'spot', title: 'Hidden details', desc: 'Find 3 things in the artwork you didn\'t notice at first', subtasks: ['Spot 1', 'Spot 2', 'Spot 3'] },
    { type: 'story', title: 'What does it feel?', desc: 'Record what this art makes you feel' }
  ],
  view: [
    { type: 'timed', duration: 240, title: 'Capture the moment', desc: 'Take a sunset (or peak) photo before the light fades', icon: 'camera' },
    { type: 'spot', title: 'Eyes open', desc: 'Find 3 landmarks visible from here', subtasks: ['Landmark 1', 'Landmark 2', 'Landmark 3'] },
    { type: 'chain', title: 'View chain', desc: 'Visit 3 view gems today to complete the chain' }
  ],
  shop: [
    { type: 'timed', duration: 300, title: 'First impressions', desc: 'Walk through and take a photo of the most surprising item', icon: 'camera' },
    { type: 'spot', title: 'Talk to the owner', desc: 'Ask the owner about their favorite thing in the shop', subtasks: ['Asked the question', 'Got an answer', 'Took a note'] },
    { type: 'story', title: 'What would you buy?', desc: 'Record what you\'d buy if you had $50' }
  ],
  history: [
    { type: 'timed', duration: 300, title: 'Time traveler', desc: 'Take a photo that could be from any era', icon: 'camera' },
    { type: 'spot', title: 'Read the plaque', desc: 'Find and read the historical marker', subtasks: ['Found the marker', 'Read it', 'Took a note'] },
    { type: 'story', title: 'Imagine then', desc: 'Record what this place was like 100 years ago' }
  ]
};

export function getQuestForGem(gem) {
  if (!gem) return null;
  const cat = gem.category;
  const list = QUESTS[cat];
  if (!list || list.length === 0) return null;
  // Pick a random quest per gem (seeded by gem id for consistency)
  const idx = gem.id.charCodeAt(0) % list.length;
  return { ...list[idx], category: cat };
}