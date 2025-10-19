
const CACHE = 'dinamita-v1';
const ASSETS = [
  '/mnt/data/dinamita-web/index.html',
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./','./index.html','./styles.css','./app.js','./manifest.json','./icon-192.png','./icon-512.png','./products.json'])));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
