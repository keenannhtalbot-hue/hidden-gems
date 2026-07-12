// Surprise Me screen — main hero + filter chips + gem card

import { h, toast, confetti } from '../ui.js';
import { getState, getCategory, getGem, allGems, toggleVisited, isVisited, getNote, setNote, toggleFilter, getCurrentPlayer, getPlayer, getScore, getUnlockedBadges } from '../state.js';
import { play } from '../audio.js';

let currentGem = null;
let mounted = false;
let mainEl = null;

export function mountSurpriseScreen(main) {
  mainEl = main;
  mounted = true;
  render();
}

export function unmountSurpriseScreen() {
  mounted = false;
  currentGem = null;
}

function render() {
  if (!mounted || !mainEl) return;
  const s = getState();
  const cats = getState().filters;

  const root = h('div', { class: 'screen-surprise' }, [
    h('div', { class: 'surprise-hero' }, [
      h('h1', {}, ['Hidden Gems']),
      h('p', {}, ['Spin the dice. Find weird food, murals, secret views, and forgotten history. Every visit = points.']),
      h('button', {
        class: 'surprise-btn',
        onClick: handleSurprise,
        'aria-label': 'Pick a random gem'
      }, [
        h('span', { class: 'dice' }, ['🎲']),
        h('span', {}, ['Surprise Me'])
      ])
    ]),
    h('div', { class: 'filter-bar', role: 'toolbar', 'aria-label': 'Filter by category' },
      Object.entries(getCategoryLabels()).map(([catId, info]) =>
        h('button', {
          class: 'filter-chip' + (cats.includes(catId) ? ' active' : ''),
          onClick: () => { play('click'); toggleFilter(catId); render(); },
          'aria-pressed': cats.includes(catId) ? 'true' : 'false'
        }, [info.emoji + ' ' + info.label])
      )
    ),
    currentGem ? renderGemCard(currentGem) : h('div', { class: 'empty' }, [
      h('div', { class: 'icon' }, ['🗺️']),
      h('h3', {}, ['Ready when you are']),
      h('p', {}, ['Hit "Surprise Me" to pick a random gem from your filters.'])
    ])
  ]);
  mainEl.replaceChildren(root);
}

function getCategoryLabels() {
  return {
    food:    { label: 'Food',    emoji: '🍜' },
    art:     { label: 'Art',     emoji: '🎨' },
    view:    { label: 'Views',   emoji: '🌆' },
    shop:    { label: 'Shops',   emoji: '🛍️' },
    history: { label: 'History', emoji: '🏛️' }
  };
}

function renderGemCard(gem) {
  const cat = getCategory(gem.category);
  const visited = isVisited(gem.id);
  const note = getNote(gem.id);
  const player = getCurrentPlayer();
  const stars = '★'.repeat(gem.rarity || 1) + '☆'.repeat(3 - (gem.rarity || 1));

  return h('article', { class: 'gem-card', style: { '--cat-color': cat?.color || '#FFD93D' } }, [
    h('span', { class: 'category-badge' }, [(cat?.emoji || '💎') + ' ' + (cat?.label || gem.category)]),
    h('h2', {}, [gem.name]),
    h('p', { class: 'blurb' }, [gem.blurb]),
    gem.tip ? h('div', { class: 'tip' }, [
      h('div', { class: 'tip-label' }, ['Local tip']),
      gem.tip
    ]) : null,
    h('div', { class: 'meta' }, [
      h('span', { class: 'rarity' }, [
        h('span', { class: 'rarity-stars' }, [stars]),
        ' ' + (gem.rarity === 3 ? 'Rare' : gem.rarity === 2 ? 'Uncommon' : 'Common')
      ]),
      gem.address ? h('span', {}, ['📍 ' + gem.address]) : null
    ]),
    h('div', { class: 'actions' }, [
      h('button', {
        class: 'action-btn ' + (visited ? 'visited' : 'primary'),
        onClick: () => handleVisit(gem),
        'aria-pressed': visited ? 'true' : 'false'
      }, [
        visited ? '✓ Visited by ' + (getPlayer(getState().visited[gem.id]?.by)?.name || '?') : '🏆 Mark Visited'
      ]),
      h('button', {
        class: 'action-btn secondary',
        onClick: () => openInMaps(gem)
      }, ['🧭 Open in Maps'])
    ]),
    h('div', { class: 'notes-block' }, [
      h('label', { for: 'note-' + gem.id }, [player.name + "'s note"]),
      h('textarea', {
        id: 'note-' + gem.id,
        placeholder: 'E.g. "Order the doubles" or "don\'t go on Saturdays"',
        onInput: (e) => handleNoteInput(gem.id, e.target.value),
        value: note
      }, [])
    ])
  ]);
}

function handleSurprise() {
  const btn = document.querySelector('.surprise-btn');
  if (btn) { btn.classList.add('spinning'); btn.disabled = true; }
  play('whoosh');

  setTimeout(() => {
    const cats = getState().filters;
    const visited = Object.keys(getState().visited);
    let pool = allGems().filter(g => cats.includes(g.category));
    const unvisited = pool.filter(g => !visited.includes(g.id));
    const chosen = unvisited.length > 0 ? unvisited : pool;
    if (chosen.length === 0) {
      toast('No gems match your filters. Try enabling a category.', 'warn');
      if (btn) { btn.classList.remove('spinning'); btn.disabled = false; }
      return;
    }
    const gem = chosen[Math.floor(Math.random() * chosen.length)];
    currentGem = gem;
    play('sparkle');
    if (unvisited.length === 0) confetti();
    render();
    if (btn) { btn.classList.remove('spinning'); btn.disabled = false; }
    // Smooth scroll the new card into view on small screens
    setTimeout(() => {
      const card = document.querySelector('.gem-card');
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  }, 380);
}

function handleVisit(gem) {
  const visited = isVisited(gem.id);
  toggleVisited(gem.id);
  play(visited ? 'click' : 'chime');
  if (!visited) {
    confetti();
    toast(`+${getCategory(gem.category)?.points || 10} points for ${getCurrentPlayer().name}!`, 'success');
  } else {
    toast('Marked unvisited', 'info');
  }
  render();
}

function handleNoteInput(gemId, value) {
  // Debounce by storing and saving on blur instead of every keystroke
  clearTimeout(handleNoteInput._t);
  handleNoteInput._t = setTimeout(() => setNote(gemId, value), 400);
}

function openInMaps(gem) {
  play('click');
  const url = `https://www.google.com/maps/search/?api=1&query=${gem.lat},${gem.lng}`;
  window.open(url, '_blank', 'noopener');
}

// Re-render when state changes (e.g. user visits on another screen)
export function refreshSurprise() {
  if (mounted) render();
}