// Surprise screen — cosmic, with rocket, distance slider, legendary handling

import { h, toast, confetti, supernova, haptic } from '../ui.js';
import { ICONS } from '../icons.js';
import {
  getState, getCategory, allGems, toggleVisited, isVisited, getNote, setNote,
  toggleFilter, getCurrentPlayer, getPlayer, getScore, pickGem,
  setDistance, requestUserLocation, getRarity
} from '../state.js';
import { play } from '../audio.js';

let currentGem = null;
let mounted = false;
let mainEl = null;
let distanceTouching = false;

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
  const cats = s.filters;
  const dist = s.distanceKm || 0;
  const hasLoc = !!s.userLocation;

  const root = h('div', { class: 'screen-surprise' }, [
    h('div', { class: 'surprise-hero' }, [
      h('h1', {}, ["Izzy's Interstellar Adventures"]),
      h('p', {}, ['Beam across Toronto. Find weird food, secret views, murals, and forgotten history. With your favorite local: Izzy.']),
      h('button', {
        class: 'surprise-btn',
        onClick: handleSurprise,
        'aria-label': 'Pick a random gem'
      }, [
        h('span', { class: 'rocket-icon', html: ICONS.rocket('#0c0c20') }),
        h('span', {}, ['Beam Me Up'])
      ])
    ]),
    h('div', { class: 'filter-bar', role: 'toolbar', 'aria-label': 'Filter by category' },
      renderCategoryFilters(cats)
    ),
    h('div', { class: 'distance-slider-block', style: { '--radar-color': dist > 0 ? '#4ECDC4' : '#FFD93D' } }, [
      h('div', { class: 'distance-header' }, [
        h('div', { class: 'distance-label' }, [
          h('span', { class: 'radar-icon', html: ICONS.radar(dist > 0 ? '#4ECDC4' : '#FFD93D') }),
          h('span', {}, ['Within'])
        ]),
        h('div', { class: 'distance-value' }, [
          dist === 0 ? '∞ Anywhere' : `${dist.toFixed(1)} km`
        ])
      ]),
      h('input', {
        type: 'range', class: 'distance-slider',
        min: 0, max: 25, step: 0.5, value: dist,
        'aria-label': 'Distance from your location in kilometers',
        onInput: handleDistanceChange
      }),
      h('div', { class: 'distance-legend' }, [
        h('span', {}, ['0 km']),
        h('span', {}, ['5']),
        h('span', {}, ['10']),
        h('span', {}, ['15']),
        h('span', {}, ['20+'])
      ]),
      !hasLoc ? h('button', {
        class: 'filter-chip',
        style: { marginTop: '8px', width: '100%', justifyContent: 'center' },
        onClick: handleGetLocation
      }, ['📍 Use my location for distance']) : null
    ]),
    currentGem ? renderGemCard(currentGem) : h('div', { class: 'empty' }, [
      h('div', { class: 'icon', html: ICONS.rocket('#FFD93D') }),
      h('h3', {}, ['Ready to explore the cosmos?']),
      h('p', {}, ['Hit "Beam Me Up" to be teleported to a random Toronto gem. Filter by category or set a distance from you.'])
    ])
  ]);
  mainEl.replaceChildren(root);
}

function renderCategoryFilters(activeCats) {
  const cats = {
    food:    { label: 'Food',    icon: ICONS.fork('#FF6B6B') },
    art:     { label: 'Art',     icon: ICONS.brush('#4ECDC4') },
    view:    { label: 'Views',   icon: ICONS.eye('#FFD93D') },
    shop:    { label: 'Shops',   icon: ICONS.shop('#A78BFA') },
    history: { label: 'History', icon: ICONS.column('#F472B6') }
  };
  return Object.entries(cats).map(([id, info]) =>
    h('button', {
      class: 'filter-chip' + (activeCats.includes(id) ? ' active' : ''),
      onClick: () => { play('click'); toggleFilter(id); haptic(8); render(); },
      'aria-pressed': activeCats.includes(id) ? 'true' : 'false'
    }, [
      h('span', { class: 'chip-icon', html: info.icon }),
      h('span', {}, [info.label])
    ])
  );
}

function renderGemCard(gem) {
  const cat = getCategory(gem.category);
  const rarity = getRarity(gem.rarity);
  const visited = isVisited(gem.id);
  const note = getNote(gem.id);
  const player = getCurrentPlayer();
  const rarityIconSvg = ICONS[`rarity${gem.rarity}`]?.(rarity.color) || ICONS.rarity1(rarity.color);

  return h('article', {
    class: 'gem-card',
    style: {
      '--cat-color': cat?.color,
      '--cat-glow': cat?.glow
    }
  }, [
    gem.rarity === 5 ? h('div', { class: 'legend-tag' }, ['⭐ Most locals don\'t know this exists']) : null,
    h('div', { class: 'gem-card-header' }, [
      h('span', { class: 'category-badge' }, [
        h('span', { class: 'cat-icon', html: ICONS[cat?.icon]?.(cat.color) || '' }),
        cat?.label || gem.category
      ]),
      h('span', {
        class: 'rarity-badge ' + (gem.rarity === 5 ? 'legendary' : gem.rarity === 4 ? 'epic' : ''),
        style: { '--rarity-color': rarity.color }
      }, [
        h('span', { class: 'rarity-icon', html: rarityIconSvg }),
        rarity.label
      ])
    ]),
    h('h2', {}, [gem.name]),
    h('p', { class: 'blurb' }, [gem.blurb]),
    gem.tip ? h('div', { class: 'tip' }, [
      h('div', { class: 'tip-label' }, [
        h('span', { html: ICONS.sparkle('#FFD93D') }),
        h('span', {}, ['Izzy-grade tip'])
      ]),
      gem.tip
    ]) : null,
    h('div', { class: 'meta' }, [
      gem.address ? h('span', {}, ['📍 ' + gem.address]) : null,
      renderDistance(gem)
    ]),
    h('div', { class: 'actions' }, [
      h('button', {
        class: 'action-btn ' + (visited ? 'visited' : 'primary'),
        onClick: () => handleVisit(gem),
        'aria-pressed': visited ? 'true' : 'false'
      }, [
        h('span', { class: 'btn-icon', html: visited ? ICONS.check('#0c0c20') : ICONS.sparkle('#0c0c20') }),
        visited ? ' Visited by ' + (getPlayer(getState().visited[gem.id]?.by)?.name || '?') : ' Mark Visited'
      ]),
      h('button', {
        class: 'action-btn secondary',
        onClick: () => openInMaps(gem)
      }, [
        h('span', { class: 'btn-icon', html: ICONS.compass('currentColor') }),
        'Open in Maps'
      ])
    ]),
    h('div', { class: 'notes-block' }, [
      h('label', {}, [
        h('span', { class: 'label-icon', html: ICONS.note('#F472B6') }),
        player.name + "'s note"
      ]),
      h('textarea', {
        id: 'note-' + gem.id,
        placeholder: 'E.g. "Order the doubles" or "go early — they sell out"',
        onInput: (e) => handleNoteInput(gem.id, e.target.value)
      }, [])
    ])
  ]);
}

function renderDistance(gem) {
  const s = getState();
  if (!s.userLocation || !gem.lat) return null;
  // Use haversine inline (avoids extra import)
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(gem.lat - s.userLocation.lat);
  const dLng = toRad(gem.lng - s.userLocation.lng);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(s.userLocation.lat)) * Math.cos(toRad(gem.lat)) * Math.sin(dLng/2)**2;
  const km = 2 * R * Math.asin(Math.sqrt(a));
  return h('span', {}, ['📏 ' + km.toFixed(1) + ' km']);
}

function handleSurprise() {
  const btn = document.querySelector('.surprise-btn');
  if (btn) { btn.classList.add('spinning'); btn.disabled = true; }
  play('whoosh');
  haptic(15);

  setTimeout(() => {
    const gem = pickGem();
    if (!gem) {
      toast('No gems match your filters. Try enabling a category or widening distance.', 'warn');
      if (btn) { btn.classList.remove('spinning'); btn.disabled = false; }
      return;
    }
    currentGem = gem;
    const isLegendary = gem.rarity === 5;
    const isEpic = gem.rarity === 4;

    if (isLegendary) {
      play('fanfare');
      supernova();
      haptic([20, 60, 20]);
    } else if (isEpic) {
      play('sparkle');
      confetti({ count: 30 });
      haptic(20);
    } else {
      play('sparkle');
      haptic(10);
    }
    render();
    if (btn) { btn.classList.remove('spinning'); btn.disabled = false; }
    setTimeout(() => {
      const card = document.querySelector('.gem-card');
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  }, 600);
}

function handleVisit(gem) {
  const visited = isVisited(gem.id);
  toggleVisited(gem.id);
  play(visited ? 'click' : 'chime');
  if (!visited) {
    const cat = getCategory(gem.category);
    const rar = getRarity(gem.rarity);
    const pts = (cat?.points || 10) * (rar.points);
    confetti({ count: gem.rarity === 5 ? 60 : 36 });
    if (gem.rarity === 5) {
      supernova();
    }
    haptic([15, 30, 15]);
    toast(`+${pts} points for ${getCurrentPlayer().name}!`, 'success');
  } else {
    haptic(8);
    toast('Marked unvisited', 'info');
  }
  render();
}

function handleNoteInput(gemId, value) {
  clearTimeout(handleNoteInput._t);
  handleNoteInput._t = setTimeout(() => setNote(gemId, value), 400);
}

function handleDistanceChange(e) {
  const v = parseFloat(e.target.value);
  setDistance(v);
  // Don't full-render on every slider tick — just update the label color
  const block = document.querySelector('.distance-slider-block');
  const valEl = block?.querySelector('.distance-value');
  const radarIcon = block?.querySelector('.radar-icon');
  if (block) block.style.setProperty('--radar-color', v > 0 ? '#4ECDC4' : '#FFD93D');
  if (valEl) valEl.textContent = v === 0 ? '∞ Anywhere' : `${v.toFixed(1)} km`;
  if (radarIcon) radarIcon.innerHTML = ICONS.radar(v > 0 ? '#4ECDC4' : '#FFD93D');
}

async function handleGetLocation() {
  try {
    toast('Finding your location...', 'info', 2000);
    await requestUserLocation();
    play('pop');
    haptic(15);
    toast('📍 Got your location — distance slider is live!', 'success');
    render();
  } catch (e) {
    toast('Could not get location — check browser permissions', 'warn');
  }
}

function openInMaps(gem) {
  play('click');
  haptic(8);
  const url = `https://www.google.com/maps/search/?api=1&query=${gem.lat},${gem.lng}`;
  window.open(url, '_blank', 'noopener');
}

export function refreshSurprise() {
  if (mounted) render();
}