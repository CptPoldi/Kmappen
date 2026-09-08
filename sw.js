/* Offline-Cache. Bei Inhaltsänderungen VERSION hochzählen. */
const VERSION = 'kursmappen-v1';
const DATEIEN = [
  './','./index.html','./data.js','./manifest.webmanifest','./icon-192.png','./icon-512.png',
  './img/regel-1.webp','./img/regel-2.webp','./img/regel-3.webp','./img/regel-4.webp','./img/regel-5.webp',
  './img/regel-6.webp','./img/regel-7.webp','./img/regel-8.webp','./img/regel-9.webp','./img/regel-10.webp'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const kopie = res.clone();
      caches.open(VERSION).then(c => c.put(e.request, kopie)).catch(()=>{});
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});
