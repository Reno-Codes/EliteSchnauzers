const CACHE_NAME = "elite-schnauzers-cache-v1";
const GALLERY_CACHE = "gallery-cache-v1";

// Install event - cache static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        Promise.all([caches.open(CACHE_NAME), caches.open(GALLERY_CACHE)])
    );
});

// Fetch event - handle image caching
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Handle gallery image requests
    if (url.pathname.includes("/gallery/")) {
        event.respondWith(
            caches.open(GALLERY_CACHE).then((cache) => {
                return cache.match(event.request).then((response) => {
                    if (response) {
                        // Return cached image
                        return response;
                    }

                    // Fetch and cache new image
                    return fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                });
            })
        );
    }
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (
                        cacheName !== CACHE_NAME &&
                        cacheName !== GALLERY_CACHE
                    ) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
