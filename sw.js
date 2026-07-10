const CACHE_NAME = 'minecraft-wiki-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './styles.css',
                './app.js',
                './manifest.json',
                './favicon.svg',
                './data/versions.js',
                './data/items.js',
                './data/recipes.js',
                './data/mobs.js',
                './data/commands.js',
                './data/references.js',
                './data/enchantment_compat.js',
                './data/trading.js',
                './data/brewing.js',
                './data/food.js',
                './data/blocks.js',
                './data/structures.js',
                './data/mechanics.js',
            ]);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
});