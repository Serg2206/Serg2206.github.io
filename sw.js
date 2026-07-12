// Online-first PWA. Medical pages are never cached, preventing stale clinical content.
const CACHE = 'ssvnauka-static-v1';
const STATIC_ASSETS = ['/offline.html', '/styles.css', '/images/icon-192x192.png', '/images/icon-512x512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).catch(() => caches.match('/offline.html')));
    return;
  }
  if (url.origin === self.location.origin && /\.(?:css|png|svg|jpg|jpeg|webp)$/.test(url.pathname)) {
    event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
  }
});
