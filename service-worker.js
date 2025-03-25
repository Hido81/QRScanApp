const CACHE_NAME = 'qr-scanner-cache-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/styles.css',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    'https://cdnjs.cloudflare.com/ajax/libs/html5-qrcode/2.3.4/html5-qrcode.min.js'
];

// Installazione del service worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Attivazione del service worker
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Gestione delle richieste di rete
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
