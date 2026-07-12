// Map screen — OpenStreetMap via Leaflet, category-colored pins, popup with quick actions

import { h, clear, toast } from '../ui.js';
import { getState, getCategory, allGems, isVisited, toggleVisited, getNote, setNote, getPlayer, getCurrentPlayer } from '../state.js';
import { play } from '../audio.js';

let map = null;
let mainEl = null;
let mounted = false;
const markers = new Map(); // gemId -> marker

export function mountMapScreen(main) {
  mainEl = main;
  mounted = true;
  render();
}

export function unmountMapScreen() {
  mounted = false;
  // Don't destroy map — keep it around, just hide container, so re-mount is instant
  if (map && mainEl) {
    const container = mainEl.querySelector('.map-container');
    if (container) container.remove();
  }
}

function render() {
  if (!mounted || !mainEl) return;
  const s = getState();

  const root = h('div', { class: 'screen-map' }, [
    h('div', { style: { paddingTop: '8px' } }, [
      h('div', { class: 'filter-bar', role: 'toolbar', 'aria-label': 'Map filter' },
        [{ id: 'all', emoji: '💎', label: 'All' }, ...Object.entries(getCategoryFilterList())].map(item => {
          const id = item.id;
          const isActive = id === 'all' ? s.filters.length === Object.keys(getCategoryFilterList()).length : s.filters.includes(id);
          return h('button', {
            class: 'filter-chip' + (isActive ? ' active' : ''),
            onClick: () => handleFilterToggle(id)
          }, [item.emoji + ' ' + item.label]);
        })
      )
    ]),
    h('div', { class: 'map-container' }, [
      h('div', { id: 'leaflet-map' })
    ])
  ]);
  mainEl.replaceChildren(root);
  initMap();
}

function getCategoryFilterList() {
  return {
    food:    { label: 'Food',    emoji: '🍜' },
    art:     { label: 'Art',     emoji: '🎨' },
    view:    { label: 'Views',   emoji: '🌆' },
    shop:    { label: 'Shops',   emoji: '🛍️' },
    history: { label: 'History', emoji: '🏛️' }
  };
}

function handleFilterToggle(catId) {
  play('click');
  const s = getState();
  const allCats = Object.keys(getCategoryFilterList());
  if (s.filters.length === allCats.length) {
    // Currently showing all → just toggle one
    import('../state.js').then(({ toggleFilter }) => {
      toggleFilter(catId);
      render();
    });
  } else {
    // Show all on All click, else toggle one
    import('../state.js').then(({ setState, toggleFilter }) => {
      if (catId === 'all') {
        setState({ filters: allCats });
      } else {
        toggleFilter(catId);
      }
      render();
    });
  }
}

function initMap() {
  const el = document.getElementById('leaflet-map');
  if (!el) return;
  if (!map) {
    map = L.map(el, { zoomControl: true, attributionControl: true }).setView([43.6532, -79.3832], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  } else {
    setTimeout(() => map.invalidateSize(), 50);
  }
  // Re-add markers (clear old)
  for (const m of markers.values()) map.removeLayer(m);
  markers.clear();

  const s = getState();
  const gems = allGems().filter(g => s.filters.includes(g.category));
  for (const gem of gems) {
    const cat = getCategory(gem.category);
    const icon = L.divIcon({
      className: '',
      html: `<div class="gem-pin" style="--cat-color:${cat?.color || '#FFD93D'}"><span>${cat?.emoji || '💎'}</span></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28]
    });
    const marker = L.marker([gem.lat, gem.lng], { icon }).addTo(map);
    marker.bindPopup(buildPopupHtml(gem), { maxWidth: 260 });
    markers.set(gem.id, marker);
  }
}

function buildPopupHtml(gem) {
  const cat = getCategory(gem.category);
  const visited = isVisited(gem.id);
  const visitedBy = visited ? getPlayer(getState().visited[gem.id]?.by)?.name : '';
  const note = getNote(gem.id);
  return `
    <h3>${escape(gem.name)}</h3>
    <p><strong>${escape(cat?.label || gem.category)}</strong></p>
    <p>${escape(gem.blurb)}</p>
    ${gem.tip ? `<p style="border-left:3px solid ${cat?.color}; padding-left:8px; margin-top:8px;"><em>${escape(gem.tip)}</em></p>` : ''}
    ${visited ? `<p style="color:${cat?.color}; font-weight:700; margin-top:8px;">✓ Visited by ${escape(visitedBy)}</p>` : ''}
    ${note ? `<p style="background:rgba(255,255,255,0.05); padding:6px; border-radius:6px; margin-top:6px; font-size:12px;">📝 ${escape(note)}</p>` : ''}
    <div class="popup-actions">
      <button class="visit-btn" data-gem-id="${gem.id}" data-action="visit">${visited ? 'Unvisit' : '✓ Visited'}</button>
      <button class="info-btn" data-gem-id="${gem.id}" data-action="note">Note</button>
      <button class="info-btn" data-gem-id="${gem.id}" data-action="maps">Maps</button>
    </div>
  `;
}

function escape(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

// Wire popup buttons after content rendered
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-gem-id]');
  if (!btn) return;
  const id = btn.dataset.gemId;
  const action = btn.dataset.action;
  const gem = allGems().find(g => g.id === id);
  if (!gem) return;
  if (action === 'visit') {
    const wasVisited = isVisited(gem.id);
    toggleVisited(gem.id);
    play(wasVisited ? 'click' : 'chime');
    toast(wasVisited ? 'Unvisited' : `+${getCategory(gem.category)?.points || 10} pts!`, wasVisited ? 'info' : 'success');
    initMap(); // refresh markers
    // Reopen the popup that was open
    setTimeout(() => {
      const m = markers.get(gem.id);
      m?.openPopup();
    }, 50);
  } else if (action === 'note') {
    const v = prompt('Add a note for this gem:', getNote(gem.id));
    if (v != null) {
      setNote(gem.id, v);
      initMap();
      setTimeout(() => markers.get(gem.id)?.openPopup(), 50);
    }
  } else if (action === 'maps') {
    window.open(`https://www.google.com/maps/search/?api=1&query=${gem.lat},${gem.lng}`, '_blank', 'noopener');
  }
});

export function refreshMap() {
  if (mounted) initMap();
}