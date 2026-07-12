// Surprise screen — weeping willow theme, quests, photo evidence, leaf particles

import { h, toast, particles, serene, haptic } from '../ui.js';
import { ICONS } from '../icons.js';
import {
  getState, getCategory, allGems, toggleVisited, isVisited, getNote, setNote,
  toggleFilter, getCurrentPlayer, getPlayer, getScore, pickGem,
  setDistance, requestUserLocation, getRarity, getQuestForGem,
  setPhoto, getGemPhoto, QUESTS
} from '../state.js';
import { play } from '../audio.js';

let currentGem = null;
let mounted = false;
let mainEl = null;
let currentQuest = null;
let questTimers = {}; // questId -> { startTs, durationSec }

export function mountSurpriseScreen(main) {
  mainEl = main;
  mounted = true;
  render();
}

export function unmountSurpriseScreen() {
  mounted = false;
  currentGem = null;
  currentQuest = null;
}

function render() {
  if (!mounted || !mainEl) return;
  const s = getState();
  const cats = s.filters;
  const dist = s.distanceKm || 0;
  const hasLoc = !!s.userLocation;

  // Use night photo at night
  const heroPhoto = (s.unlocks?.activeTheme === 'midnight' || (new Date().getHours() >= 18 || new Date().getHours() < 6)) ? 'willow-night.jpg' : 'willow-day.jpg';

  const root = h('div', { class: 'screen-surprise' }, [
    // HERO PHOTO BANNER — the willow photo as a focal piece at the top
    h('div', {
      class: 'hero-photo-banner',
      style: {
        position: 'relative',
        width: '100%',
        height: '35vh',
        minHeight: '260px',
        maxHeight: '380px',
        marginTop: '-16px',
        marginLeft: '-16px',
        marginRight: '-16px',
        marginBottom: '24px',
        overflow: 'hidden',
        borderRadius: '0 0 32px 32px',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
      }
    }, [
      h('div', {
        class: 'hero-photo',
        style: {
          position: 'absolute',
          inset: '0',
          backgroundImage: `url(assets/${heroPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%'
        }
      }),
      h('div', { class: 'hero-overlay', style: { position: 'absolute', inset: '0', background: 'linear-gradient(180deg, rgba(45,58,46,0.3) 0%, rgba(45,58,46,0.1) 30%, rgba(45,58,46,0.4) 70%, rgba(45,58,46,0.85) 100%)', display: 'flex', alignItems: 'flex-end', padding: '24px' } }, [
        h('div', { class: 'hero-text', style: { color: 'white', textShadow: '0 2px 12px rgba(0,0,0,0.7)' } }, [
          h('h1', { class: 'hero-title', style: { fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(26px, 7vw, 38px)', fontWeight: '600', fontStyle: 'italic', letterSpacing: '-0.02em', lineHeight: '1', marginBottom: '6px', color: 'white' } }, ['Izzy\u2019s Weeping Willow Wanderings']),
          h('p', { class: 'hero-subtitle', style: { fontFamily: 'Space Grotesk, system-ui, sans-serif', fontSize: '12px', fontWeight: '700', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: '0.9', color: 'white' } }, ['Toronto · With your favorite local'])
        ])
      ])
    ]),
    h('div', { class: 'surprise-hero' }, [
      h('p', { class: 'today-mood' }, [renderTodayMood()]),
      h('p', { class: 'welcome-text' }, ['Wander together. Find food, art, secret views, and forgotten history.']),
      h('button', {
        class: 'blow-btn',
        onClick: handleBlow,
        'aria-label': 'Find a random gem'
      }, [
        h('span', { class: 'wind-icon', html: ICONS.wind('#0c0c20') }),
        h('span', {}, ['Blow Me Away'])
      ]),
      // Quick stats row - useful feature showing progress
      s.visited && Object.keys(s.visited).length > 0 ? h('div', { class: 'quick-stats' }, [
        h('div', { class: 'stat-pill' }, [
          h('span', { class: 'stat-num' }, [String(Object.keys(s.visited).length)]),
          h('span', { class: 'stat-label' }, ['found'])
        ]),
        h('div', { class: 'stat-pill' }, [
          h('span', { class: 'stat-num' }, [String(s.unlocks?.photoGalleryIds?.length || 0)]),
          h('span', { class: 'stat-label' }, ['photos'])
        ]),
        h('div', { class: 'stat-pill' }, [
          h('span', { class: 'stat-num' }, [String(s.customGems?.length || 0)]),
          h('span', { class: 'stat-label' }, ['planted'])
        ])
      ]) : null
    ]),
    h('div', { class: 'filter-bar', role: 'toolbar', 'aria-label': 'Filter by category' },
      renderCategoryFilters(cats)
    ),
    h('div', { class: 'distance-slider-block', style: { maxWidth: '100%', overflow: 'hidden' } }, [
      h('div', { class: 'distance-header' }, [
        h('div', { class: 'distance-label' }, [
          h('span', { class: 'radar-icon', style: { width: '18px', height: '18px', display: 'inline-block', flexShrink: 0 }, html: ICONS.radar('var(--accent)') }),
          h('span', {}, ['Within'])
        ]),
        h('div', { class: 'distance-value' }, [
          dist === 0 ? '∞ Anywhere' : `${dist.toFixed(1)} km`
        ])
      ]),
      h('input', {
        type: 'range', class: 'distance-slider',
        min: 0, max: 25, step: 0.5, value: dist,
        'aria-label': 'Distance from your location',
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
      h('div', { class: 'icon', html: ICONS.willow('var(--accent)') }),
      h('h3', {}, ['Ready to wander?']),
      h('p', {}, ['Hit "Blow Me Away" and let the wind pick your next Toronto gem. Filter by category or set a distance from you.'])
    ])
  ]);
  mainEl.replaceChildren(root);
}

function renderCategoryFilters(activeCats) {
  const cats = {
    food:    { label: 'Food',    icon: ICONS.fork('var(--cat-food)') },
    art:     { label: 'Art',     icon: ICONS.brush('var(--cat-art)') },
    view:    { label: 'Views',   icon: ICONS.eye('var(--cat-view)') },
    shop:    { label: 'Shops',   icon: ICONS.shop('var(--cat-shop)') },
    history: { label: 'History', icon: ICONS.column('var(--cat-history)') }
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
  const photo = getGemPhoto(gem.id);
  const player = getCurrentPlayer();
  const quest = getQuestForGem(gem);

  return h('article', {
    class: 'gem-card',
    style: {
      '--cat-color': cat?.color,
      '--cat-glow': (cat?.color || '#d4a558') + '40'
    }
  }, [
    gem.rarity === 5 ? h('div', { class: 'legend-tag' }, ['🌳 A place most will never find']) : null,
    h('div', { class: 'gem-card-header' }, [
      h('span', { class: 'category-badge' }, [
        h('span', { class: 'cat-icon', html: ICONS[cat?.icon]?.(cat.color) || '' }),
        cat?.label || gem.category
      ]),
      h('span', {
        class: 'rarity-badge ' + (gem.rarity === 5 ? 'legendary' : gem.rarity === 4 ? 'epic' : ''),
        style: { '--rarity-color': rarity.color }
      }, [
        h('span', { class: 'rarity-icon', html: ICONS[`rarity${gem.rarity}`]?.(rarity.color) || ICONS.rarity1(rarity.color) }),
        rarity.label
      ])
    ]),
    h('h2', {}, [gem.name]),
    h('p', { class: 'blurb' }, [gem.blurb]),
    gem.tip ? h('div', { class: 'tip' }, [
      h('div', { class: 'tip-label' }, ['Izzy-grade tip']),
      gem.tip
    ]) : null,
    h('div', { class: 'meta' }, [
      gem.address ? h('span', {}, ['📍 ' + gem.address]) : null,
      renderDistance(gem)
    ]),
    quest ? renderQuest(quest, gem) : null,
    renderPhotoEvidence(gem, photo),
    h('div', { class: 'actions' }, [
      h('button', {
        class: 'action-btn ' + (visited ? 'visited' : 'primary'),
        onClick: () => handleVisit(gem),
        'aria-pressed': visited ? 'true' : 'false'
      }, [
        h('span', { class: 'btn-icon', html: visited ? ICONS.check('white') : ICONS.sparkle('#0c0c20') }),
        visited ? ' Visited by ' + (getPlayer(getState().visited[gem.id]?.by)?.name || '?') : ' Mark Visited'
      ]),
      h('button', {
        class: 'action-btn secondary',
        onClick: () => openInMaps(gem)
      }, [
        h('span', { class: 'btn-icon', html: ICONS.compass('currentColor') }),
        'Maps'
      ])
    ]),
    h('div', { class: 'notes-block' }, [
      h('label', {}, [
        h('span', { class: 'label-icon', html: ICONS.note('var(--cat-history)') }),
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

function renderQuest(quest, gem) {
  const isTimed = quest.type === 'timed';
  const isSpot = quest.type === 'spot';
  const isStory = quest.type === 'story';

  return h('div', { class: 'quest-card' }, [
    h('div', { class: 'quest-header' }, [
      h('span', { class: 'quest-label' }, [
        h('span', { style: { marginRight: '4px' } }, [isTimed ? '⏱️' : isSpot ? '🎯' : isStory ? '🎤' : '📜']),
        quest.type.toUpperCase()
      ]),
      isTimed ? h('span', { class: 'quest-timer' }, [`${Math.floor(quest.duration / 60)}:${String(quest.duration % 60).padStart(2, '0')}`]) : null
    ]),
    h('div', { class: 'quest-title' }, [quest.title]),
    h('div', { class: 'quest-desc' }, [quest.desc]),
    isSpot ? h('div', { class: 'quest-subtask-list' },
      quest.subtasks.map((s, i) =>
        h('div', {
          class: 'quest-subtask',
          onClick: (e) => { e.currentTarget.classList.toggle('done'); haptic(10); }
        }, [
          h('div', { class: 'check', html: ICONS.check('white') }),
          h('div', { class: 'subtask-text' }, [s])
        ])
      )
    ) : null,
    isTimed ? h('button', {
      class: 'action-btn secondary',
      style: { width: '100%' },
      onClick: () => { toast(`⏱️ Quest timer started: ${quest.duration}s`, 'info', 2000); haptic([15, 30, 15]); }
    }, [
      h('span', { class: 'btn-icon', html: ICONS.camera('currentColor') }),
      'Start Timer + Take Photo'
    ]) : null,
    isStory ? h('button', {
      class: 'action-btn secondary',
      style: { width: '100%' },
      onClick: () => toast('🎤 Voice notes coming soon — for now use the text note below!', 'warn', 3000)
    }, [
      h('span', { class: 'btn-icon', html: ICONS.note('currentColor') }),
      'Record voice note'
    ]) : null
  ]);
}

function renderPhotoEvidence(gem, existingPhoto) {
  return h('div', { class: 'photo-evidence' }, [
    h('div', { class: 'photo-evidence-label' }, [
      h('span', { html: ICONS.camera('var(--accent)') }),
      'Photo evidence required'
    ]),
    h('label', { class: 'photo-evidence-area' }, [
      h('input', {
        type: 'file',
        accept: 'image/*',
        capture: 'environment',
        style: { display: 'none' },
        onChange: (e) => handlePhotoUpload(gem, e)
      }),
      existingPhoto ? h('img', { src: existingPhoto, alt: 'Photo proof' }) : h('div', {}, ['📷 Tap to take your evidence photo'])
    ]),
    h('div', { class: 'photo-evidence-status' + (existingPhoto ? ' has-photo' : '') }, [
      existingPhoto ? '✓ Photo captured — you can mark this gem as visited' : 'No photo yet — visit unlocks after you take one'
    ])
  ]);
}

function renderDistance(gem) {
  const s = getState();
  if (!s.userLocation || !gem.lat) return null;
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(gem.lat - s.userLocation.lat);
  const dLng = toRad(gem.lng - s.userLocation.lng);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(s.userLocation.lat)) * Math.cos(toRad(gem.lat)) * Math.sin(dLng/2)**2;
  const km = 2 * R * Math.asin(Math.sqrt(a));
  return h('span', {}, ['📏 ' + km.toFixed(1) + ' km']);
}

// Render "today's mood" — uses time + last known wind to set vibe
function renderTodayMood() {
  const hour = new Date().getHours();
  const visited = Object.keys(getState().visited || {}).length;

  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17 && hour < 21) greeting = 'Good evening';
  else if (hour >= 21 || hour < 5) greeting = 'Late wander';

  let vibe = '';
  // Try to read the wind pill for current speed
  const windText = document.querySelector('.wind-text')?.textContent || '';
  if (windText) {
    vibe = ' · ' + windText;
  } else {
    // Fallback: time-based vibe
    if (hour >= 6 && hour < 11) vibe = ' · misty morning';
    else if (hour >= 11 && hour < 16) vibe = ' · warm sun';
    else if (hour >= 16 && hour < 20) vibe = ' · golden hour';
    else vibe = ' · starlit';
  }

  const encouragement = visited === 0
    ? 'First wander together'
    : visited < 5
      ? 'Keep exploring'
      : visited < 15
        ? 'You\'re on a roll'
        : 'Toronto local status';

  return `${greeting} · ${encouragement}${vibe}`;
}

// === Handlers ===

function handleBlow() {
  const btn = document.querySelector('.blow-btn');
  if (btn) { btn.classList.add('blowing'); btn.disabled = true; }
  play('whoosh');
  haptic(15);

  setTimeout(() => {
    const gem = pickGem();
    if (!gem) {
      toast('No gems match your filters. Try widening.', 'warn');
      if (btn) { btn.classList.remove('blowing'); btn.disabled = false; }
      return;
    }
    currentGem = gem;
    currentQuest = getQuestForGem(gem);

    const isLegendary = gem.rarity === 5;
    const isEpic = gem.rarity === 4;

    if (isLegendary) {
      play('fanfare');
      // Serene text slides down from top
      const theme = document.documentElement.getAttribute('data-theme') || 'willow';
      const sereneColors = {
        willow: '#7a9573', autumn: '#c4622c', blossom: '#d87090', winter: '#88a4b2', midnight: '#f0d878'
      };
      serene('Serene', sereneColors[theme]);
      // Theme particles drift across
      setTimeout(() => particles({ count: 80 }), 400);
      haptic([20, 60, 20]);
    } else if (isEpic) {
      play('sparkle');
      particles({ count: 35 });
      haptic(20);
    } else {
      play('sparkle');
      haptic(10);
    }
    render();
    if (btn) { btn.classList.remove('blowing'); btn.disabled = false; }
    setTimeout(() => {
      const card = document.querySelector('.gem-card');
      card?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }, 700);
}

function handleVisit(gem) {
  const visited = isVisited(gem.id);
  const photo = getGemPhoto(gem.id);

  // Photo required
  if (!visited && !photo) {
    toast('📷 Take a photo first — your evidence is required', 'warn');
    haptic([10, 30, 10]);
    return;
  }

  toggleVisited(gem.id);
  play(visited ? 'click' : 'chime');

  if (!visited) {
    const cat = getCategory(gem.category);
    const rar = getRarity(gem.rarity);
    const pts = (cat?.points || 10) * (rar.points);
    if (gem.rarity === 5) {
      const theme = document.documentElement.getAttribute('data-theme') || 'willow';
      const sereneColors = {
        willow: '#7a9573', autumn: '#c4622c', blossom: '#d87090', winter: '#88a4b2', midnight: '#f0d878'
      };
      serene('Discovered', sereneColors[theme]);
      setTimeout(() => particles({ count: 80 }), 300);
    } else {
      particles({ count: 30 });
    }
    haptic([15, 30, 15]);
    toast(`+${pts} points for ${getCurrentPlayer().name}!`, 'success');
  } else {
    haptic(8);
    toast('Marked unvisited', 'info');
  }
  render();
}

function handlePhotoUpload(gem, e) {
  const file = e.target.files?.[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast('Photo too large (max 5MB)', 'warn'); return; }
  const reader = new FileReader();
  reader.onload = () => {
    setPhoto(gem.id, reader.result);
    play('pop');
    haptic([15, 30, 15]);
    toast('📷 Photo captured!', 'success');
    render();
  };
  reader.onerror = () => toast('Could not read photo', 'error');
  reader.readAsDataURL(file);
}

function handleNoteInput(gemId, value) {
  clearTimeout(handleNoteInput._t);
  handleNoteInput._t = setTimeout(() => setNote(gemId, value), 400);
}

function handleDistanceChange(e) {
  const v = parseFloat(e.target.value);
  setDistance(v);
  const valEl = document.querySelector('.distance-value');
  if (valEl) valEl.textContent = v === 0 ? '∞ Anywhere' : `${v.toFixed(1)} km`;
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
    toast('Could not get location — check permissions', 'warn');
  }
}

function openInMaps(gem) {
  play('click');
  haptic(8);
  window.open(`https://www.google.com/maps/search/?api=1&query=${gem.lat},${gem.lng}`, '_blank', 'noopener');
}

export function refreshSurprise() {
  if (mounted) render();
}