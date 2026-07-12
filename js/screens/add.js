// Add-your-own-gem screen — willow themed

import { h, toast, particles, serene, haptic } from '../ui.js';
import { ICONS } from '../icons.js';
import { addCustomGem, getCategory, getCurrentPlayer, requestUserLocation } from '../state.js';
import { play } from '../audio.js';

let mainEl = null;
let mounted = false;
let photoDataUrl = null;
let coords = null;
let gettingLoc = false;

export function mountAddScreen(main) {
  mainEl = main;
  mounted = true;
  render();
}

export function unmountAddScreen() {
  mounted = false;
  photoDataUrl = null;
  coords = null;
}

function render() {
  if (!mounted || !mainEl) return;
  const root = h('div', { class: 'screen-add' }, [
    h('div', { style: { paddingTop: '8px' } }, [
      h('div', { class: 'surprise-hero', style: { padding: '16px 0 8px' } }, [
        h('h1', { style: { fontSize: 'clamp(28px,7vw,34px)' } }, ['Plant a New Seed']),
        h('p', {}, ['Found somewhere special? Add it to the map for everyone.'])
      ]),
      buildForm()
    ])
  ]);
  mainEl.replaceChildren(root);
}

function buildForm() {
  const cats = {
    food: ICONS.fork('var(--cat-food)'),
    art: ICONS.brush('var(--cat-art)'),
    view: ICONS.eye('var(--cat-view)'),
    shop: ICONS.shop('var(--cat-shop)'),
    history: ICONS.column('var(--cat-history)')
  };

  const form = h('form', {
    class: 'add-form',
    onSubmit: (e) => { e.preventDefault(); handleSubmit(); }
  }, [
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Name of this place']),
      h('input', { type: 'text', name: 'name', required: true, placeholder: 'E.g. Randy\'s Roti' })
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Category']),
      h('div', { class: 'cat-pick' },
        Object.entries(cats).map(([catId, iconSvg]) =>
          h('button', {
            type: 'button',
            class: 'cat-pick-btn',
            'data-cat': catId,
            style: { '--cat-color': getCategory(catId).color },
            onClick: () => {
              chosenCategory = catId;
              form.querySelectorAll('.cat-pick-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === catId));
              play('click'); haptic(8);
            }
          }, [
            h('span', { class: 'cat-icon', html: iconSvg }),
            getCategory(catId).label
          ])
        )
      )
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['One-liner — what makes it special?']),
      h('input', { type: 'text', name: 'blurb', required: true, placeholder: 'The best peameal bacon sandwich in the city' })
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Tip (optional)']),
      h('textarea', { name: 'tip', placeholder: 'Insider detail for future visitors' })
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Photo (optional)']),
      h('label', { class: 'photo-pick' }, [
        h('input', { type: 'file', accept: 'image/*', capture: 'environment', style: { display: 'none' }, onChange: handlePhoto }),
        photoDataUrl ? 'Tap to change photo' : '📷  Tap to snap or pick a photo'
      ])
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Coordinates']),
      h('div', { class: 'location-row' }, [
        h('span', { class: 'coords' }, [
          coords ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}` : 'No location yet'
        ]),
        h('button', { type: 'button', onClick: handleGetLocation }, [
          gettingLoc ? '...' : coords ? '↻ Re-pick' : '📍 Use my location'
        ])
      ])
    ]),
    h('button', { type: 'submit', class: 'submit-btn' }, ['🌱 Plant on the map'])
  ]);

  let chosenCategory = 'food';
  setTimeout(() => {
    const first = form.querySelector('.cat-pick-btn');
    if (first && !form.querySelector('.cat-pick-btn.active')) first.classList.add('active');
  }, 0);

  if (photoDataUrl) {
    const pick = form.querySelector('.photo-pick');
    pick.innerHTML = '';
    const img = h('img', { src: photoDataUrl, alt: 'Preview' });
    pick.appendChild(img);
    const input = h('input', { type: 'file', accept: 'image/*', capture: 'environment', style: { display: 'none' }, onChange: handlePhoto });
    pick.appendChild(input);
  }

  return form;
}

function handlePhoto(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { toast('Photo too large (max 5MB)', 'warn'); return; }
  const reader = new FileReader();
  reader.onload = () => {
    photoDataUrl = reader.result;
    play('pop'); haptic(10);
    render();
  };
  reader.onerror = () => toast('Could not read photo', 'error');
  reader.readAsDataURL(file);
}

async function handleGetLocation() {
  if (!navigator.geolocation) { promptForManualCoords(); return; }
  gettingLoc = true;
  play('click');
  render();
  try {
    const loc = await requestUserLocation();
    coords = { lat: loc.lat, lng: loc.lng };
    gettingLoc = false;
    play('pop'); haptic(15);
    toast('📍 Got your location!', 'success');
    render();
  } catch (err) {
    gettingLoc = false;
    render();
    toast('Could not get location — enter manually', 'warn');
    promptForManualCoords();
  }
}

function promptForManualCoords() {
  const input = prompt('Enter latitude,longitude (or leave blank):', '43.65,-79.38');
  if (!input) return;
  const [lat, lng] = input.split(',').map(s => parseFloat(s.trim()));
  if (!isFinite(lat) || !isFinite(lng)) { toast('Invalid coordinates', 'error'); return; }
  coords = { lat, lng };
  render();
}

function handleSubmit() {
  if (!coords) { toast('Add a location first', 'warn'); haptic([10, 30, 10]); return; }
  const form = mainEl.querySelector('form');
  const fd = new FormData(form);
  const name = fd.get('name')?.trim();
  const blurb = fd.get('blurb')?.trim();
  const tip = fd.get('tip')?.trim();
  const cat = form.querySelector('.cat-pick-btn.active')?.dataset.cat;
  if (!name || !blurb || !cat) { toast('Fill in name, category, and one-liner', 'warn'); haptic([10, 30, 10]); return; }
  const player = getCurrentPlayer();
  const gem = addCustomGem({
    name, blurb, tip, category: cat,
    lat: coords.lat, lng: coords.lng,
    address: `Planted by ${player.name}`,
    photo: photoDataUrl, custom: true
  });
  play('fanfare');
  particles({ count: 50 });
  serene('Planted', '#7a9573');
  haptic([20, 40, 20]);
  toast(`🌱 "${gem.name}" planted on the map!`, 'success', 4000);
  photoDataUrl = null;
  coords = null;
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'surprise' } }));
  }, 1500);
}