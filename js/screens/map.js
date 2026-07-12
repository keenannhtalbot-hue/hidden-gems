// Map screen — Leaflet + category-colored pins + distance ring from user

import { h, toast, confetti } from '../ui.js';
import { ICONS, pinSvg } from '../icons.js';
import {
  getState, getCategory, allGems, isVisited, toggleVisited, getNote, setNote,
  getPlayer, getCurrentPlayer, getRarity, getScore, setDistance, requestUserLocation
} from '../state.js';
import { play } from '../audio.js';

let map = null;
let mainEl = null;
let mounted = false;
let distanceCircle = null;
let userMarker = null;
const markers = new Map();

export function mountMapScreen(main) {
  mainEl = main;
  mounted = true;
  render();
}

export function unmountMapScreen() {
  mounted = false;
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
        renderMapFilters(s)
      )
    ]),
    h('div', { class: 'map-container' }, [
      h('div', { id: 'leaflet-map' })
    ])
  ]);
  mainEl.replaceChildren(root);
  initMap();
}

function renderMapFilters(s) {
  const cats = {
    food:    { label: 'Food',    icon: ICONS.fork('#FF6B6B') },
    art:     { label: 'Art',     icon: ICONS.brush('#4ECDC4') },
    view:    { label: 'Views',   icon: ICONS.eye('#FFD93D') },
    shop:    { label: 'Shops',   icon: ICONS.shop('#A78BFA') },
    history: { label: 'History', icon: ICONS.column('#F472B6') }
  };
  const allCats = Object.keys(cats);
  return [
    h('button', {
      class: 'filter-chip' + (s.filters.length === allCats.length ? ' active' : ''),
      onClick: () => handleAllClick()
    }, ['💎 All']),
    ...Object.entries(cats).map(([id, info]) =>
      h('button', {
        class: 'filter-chip' + (s.filters.includes(id) ? ' active' : ''),
        onClick: () => { play('click'); toggleFilterFromMap(id); render(); }
      }, [
        h('span', { class: 'chip-icon', html: info.icon }),
        h('span', {}, [info.label])
      ])
    )
  ];
}

function handleAllClick() {
  import('../state.js').then(({ setState }) => {
    setState({ filters: ['food','art','view','shop','history'] });
    render();
  });
}

function toggleFilterFromMap(catId) {
  import('../state.js').then(({ setState }) => {
    const s = getState();
    const allCats = ['food','art','view','shop','history'];
    if (s.filters.length === allCats.length) {
      setState({ filters: [catId] });
    } else if (s.filters.includes(catId)) {
      const next = s.filters.filter(f => f !== catId);
      if (next.length > 0) setState({ filters: next });
    } else {
      setState({ filters: [...s.filters, catId] });
    }
  });
}

function initMap() {
  const el = document.getElementById('leaflet-map');
  if (!el) return;
  if (!map) {
    map = L.map(el, { zoomControl: true, attributionControl: true }).setView([43.6532, -79.3832], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);
  } else {
    setTimeout(() => map.invalidateSize(), 50);
  }

  for (const m of markers.values()) map.removeLayer(m);
  markers.clear();
  if (distanceCircle) { map.removeLayer(distanceCircle); distanceCircle = null; }
  if (userMarker) { map.removeLayer(userMarker); userMarker = null; }

  const s = getState();
  const gems = allGems().filter(g => s.filters.includes(g.category));

  for (const gem of gems) {
    const cat = getCategory(gem.category);
    const color = cat?.color || '#FFD93D';
    const isLegendary = gem.rarity === 5;
    const html = pinSvg(gem.category, color, isLegendary);
    const iconSize = isLegendary ? [40, 56] : [32, 44];
    const iconAnchor = isLegendary ? [20, 56] : [16, 44];

    const icon = L.divIcon({
      className: 'gem-pin-leaflet',
      html,
      iconSize,
      iconAnchor,
      popupAnchor: [0, -iconAnchor[1]]
    });
    const marker = L.marker([gem.lat, gem.lng], { icon }).addTo(map);
    marker.bindPopup(buildPopupHtml(gem), { maxWidth: 280 });
    markers.set(gem.id, marker);
  }

  // User location + distance ring
  if (s.userLocation) {
    userMarker = L.marker([s.userLocation.lat, s.userLocation.lng], {
      icon: L.divIcon({
        className: 'user-location-pulse',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      })
    }).addTo(map);
    userMarker.bindPopup('📍 You are here');

    if (s.distanceKm > 0) {
      distanceCircle = L.circle([s.userLocation.lat, s.userLocation.lng], {
        radius: s.distanceKm * 1000,
        color: '#4ECDC4',
        fillColor: '#4ECDC4',
        fillOpacity: 0.06,
        weight: 2,
        dashArray: '6 6'
      }).addTo(map);
    }
  }

  // Auto-fit to user location if available
  if (s.userLocation) {
    const bounds = L.latLngBounds([[s.userLocation.lat, s.userLocation.lng]]);
    for (const gem of gems) bounds.extend([gem.lat, gem.lng]);
    if (s.distanceKm > 0) {
      map.fitBounds(distanceCircle.getBounds(), { padding: [20, 20], maxZoom: 14 });
    } else {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }
  }
}

function buildPopupHtml(gem) {
  const cat = getCategory(gem.category);
  const rarity = getRarity(gem.rarity);
  const visited = isVisited(gem.id);
  const visitedBy = visited ? getPlayer(getState().visited[gem.id]?.by)?.name : '';
  const note = getNote(gem.id);
  return `
    ${gem.rarity === 5 ? '<div style="background:linear-gradient(135deg,#FF6B6B,#FFD93D);padding:6px 10px;border-radius:8px;color:#0c0c20;font-weight:800;font-size:11px;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em;">⭐ Most locals don\'t know this</div>' : ''}
    <h3>${escape(gem.name)}</h3>
    <p><strong style="color:${cat?.color}">${escape(cat?.label || gem.category)}</strong> · <span style="color:${rarity.color}">${escape(rarity.label)}</span></p>
    <p>${escape(gem.blurb)}</p>
    ${gem.tip ? `<p style="border-left:3px solid #FFD93D; padding-left:8px; margin-top:8px; font-style:italic; font-size:12px;">${escape(gem.tip)}</p>` : ''}
    ${visited ? `<p style="color:#4ECDC4; font-weight:700; margin-top:8px;">✓ Visited by ${escape(visitedBy)}</p>` : ''}
    ${note ? `<p style="background:rgba(255,255,255,0.05); padding:6px; border-radius:6px; margin-top:6px; font-size:12px;">📝 ${escape(note)}</p>` : ''}
    <div class="popup-actions">
      <button class="visit-btn" data-gem-id="${gem.id}" data-action="visit">${visited ? 'Unvisit' : '✓ Visited'}</button>
      <button class="info-btn" data-gem-id="${gem.id}" data-action="note">📝 Note</button>
      <button class="info-btn" data-gem-id="${gem.id}" data-action="maps">🧭 Maps</button>
    </div>
  `;
}

function escape(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

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
    if (gem.rarity === 5 && !wasVisited) {
      import('../ui.js').then(({ supernova }) => supernova());
    }
    toast(wasVisited ? 'Unvisited' : `+${(getCategory(gem.category)?.points || 10) * (getRarity(gem.rarity).points)} pts!`, wasVisited ? 'info' : 'success');
    initMap();
    setTimeout(() => markers.get(gem.id)?.openPopup(), 60);
  } else if (action === 'note') {
    const v = prompt('Add a note for this gem:', getNote(gem.id));
    if (v != null) {
      setNote(gem.id, v);
      initMap();
      setTimeout(() => markers.get(gem.id)?.openPopup(), 60);
    }
  } else if (action === 'maps') {
    window.open(`https://www.google.com/maps/search/?api=1&query=${gem.lat},${gem.lng}`, '_blank', 'noopener');
  }
});

export function refreshMap() {
  if (mounted) initMap();
}