// Add-your-own-gem screen — form with category pick, photo, location capture

import { h, toast, confetti } from '../ui.js';
import { addCustomGem, getCategory, getCurrentPlayer } from '../state.js';
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
        h('h1', { style: { fontSize: 'clamp(24px,7vw,32px)' } }, ['Add a Gem']),
        h('p', {}, ['Found somewhere cool? Save it for the trip.'])
      ]),
      buildForm()
    ])
  ]);
  mainEl.replaceChildren(root);
}

function buildForm() {
  const cats = { food: '🍜', art: '🎨', view: '🌆', shop: '🛍️', history: '🏛️' };
  let chosenCategory = 'food';

  const form = h('form', {
    class: 'add-form',
    onSubmit: (e) => { e.preventDefault(); handleSubmit(); }
  }, [
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Name']),
      h('input', {
        type: 'text', name: 'name', required: true,
        placeholder: 'E.g. Randy\'s Roti'
      })
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Category']),
      h('div', { class: 'cat-pick' },
        Object.entries(cats).map(([catId, emoji]) =>
          h('button', {
            type: 'button',
            class: 'cat-pick-btn' + (catId === chosenCategory ? ' active' : ''),
            'data-cat': catId,
            style: { '--cat-color': getCategory(catId).color },
            onClick: () => {
              chosenCategory = catId;
              form.querySelectorAll('.cat-pick-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.cat === catId);
              });
              play('click');
            }
          }, [emoji + ' ' + getCategory(catId).label])
        )
      )
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['One-liner']),
      h('input', {
        type: 'text', name: 'blurb', required: true,
        placeholder: 'What makes it special?'
      })
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Tip (optional)']),
      h('textarea', { name: 'tip', placeholder: 'Insider detail for visitors' })
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Photo (optional)']),
      h('label', { class: 'photo-pick', 'aria-label': 'Add a photo' }, [
        h('input', {
          type: 'file',
          accept: 'image/*',
          capture: 'environment',
          style: { display: 'none' },
          onChange: handlePhoto
        }),
        h('div', {}, [photoDataUrl ? 'Tap to change photo' : '📷  Tap to snap or pick a photo'])
      ])
    ]),
    h('div', { class: 'form-group' }, [
      h('label', {}, ['Location']),
      h('div', { class: 'location-row' }, [
        h('span', { class: 'coords' }, [
          coords ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}` : 'No location yet'
        ]),
        h('button', {
          type: 'button',
          onClick: handleGetLocation
        }, [gettingLoc ? '...' : coords ? '↻ Re-pick' : '📍 Use my location'])
      ])
    ]),
    h('button', { type: 'submit', class: 'submit-btn' }, ['💎 Save Gem'])
  ]);

  // Show preview if photo set
  if (photoDataUrl) {
    const pick = form.querySelector('.photo-pick');
    pick.innerHTML = '';
    const img = h('img', { src: photoDataUrl, alt: 'Preview' });
    pick.appendChild(img);
  }

  return form;
}

function handlePhoto(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) {
    toast('Photo too large (max 5MB)', 'warn');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    photoDataUrl = reader.result;
    play('pop');
    render();
  };
  reader.onerror = () => toast('Could not read photo', 'error');
  reader.readAsDataURL(file);
}

function handleGetLocation() {
  if (!navigator.geolocation) {
    toast('Geolocation not available. Enter manually.', 'warn');
    promptForManualCoords();
    return;
  }
  gettingLoc = true;
  play('click');
  render();
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      gettingLoc = false;
      play('pop');
      toast('Got your location!', 'success');
      render();
    },
    (err) => {
      gettingLoc = false;
      render();
      toast('Could not get location — enter manually', 'warn');
      promptForManualCoords();
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

function promptForManualCoords() {
  const input = prompt('Enter latitude,longitude (or leave blank):', '43.65,-79.38');
  if (!input) return;
  const [lat, lng] = input.split(',').map(s => parseFloat(s.trim()));
  if (!isFinite(lat) || !isFinite(lng)) {
    toast('Invalid coordinates', 'error');
    return;
  }
  coords = { lat, lng };
  render();
}

function handleSubmit() {
  if (!coords) {
    toast('Add a location first', 'warn');
    return;
  }
  const form = mainEl.querySelector('form');
  const fd = new FormData(form);
  const name = fd.get('name')?.trim();
  const blurb = fd.get('blurb')?.trim();
  const tip = fd.get('tip')?.trim();
  const cat = form.querySelector('.cat-pick-btn.active')?.dataset.cat;
  if (!name || !blurb || !cat) {
    toast('Fill in name, category, and one-liner', 'warn');
    return;
  }
  const player = getCurrentPlayer();
  const gem = addCustomGem({
    name,
    blurb,
    tip,
    category: cat,
    lat: coords.lat,
    lng: coords.lng,
    address: `Added by ${player.name}`,
    photo: photoDataUrl,
    custom: true
  });
  play('fanfare');
  confetti();
  toast(`💎 Saved "${gem.name}"!`, 'success');
  photoDataUrl = null;
  coords = null;
  setTimeout(() => {
    // Switch to surprise tab to show the new gem
    window.dispatchEvent(new CustomEvent('navigate', { detail: { tab: 'surprise' } }));
  }, 1200);
}