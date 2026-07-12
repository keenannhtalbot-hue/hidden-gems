// Izzy's Weeping Willow Wanderings — Service Worker
// Minimal SW for PWA install support + offline cache

const CACHE = 'izzy-wanderings-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/app.css',
  './js/app.js',
  './js/state.js',
  './js/ui.js',
  './js/icons.js',
  './js/willow-arch.js',
  './js/screens/surprise.js',
  './js/screens/map.js',
  './js/screens/add.js',
  './js/screens/stats.js',
  './js/audio.js',
  './assets/willow-day.jpg',
  './assets/willow-night.jpg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE_ASSETS).catch(() => {
      // Cache what we can, ignore failures
      return Promise.all(
        CORE_ASSETS.map((url) =>
          cache.add(url).catch(() => null)
        )
      );
    }))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  // Don't intercept the day/night photo URLs since they're already cached separately if needed
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Cache successful responses
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});