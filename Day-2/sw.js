self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("v1").then((cache) => {
            cache.addAll([
                "/",
                "sw.js",
                "main.js",
                "home.html",
                "main.css",
                "imageLists.js",
                "gallery/img1.jpg",
                "gallery/img2.jpg",
                "gallery/img3.jpg",
            ]);
        })
    );
});
self.addEventListener("fetch", (event) => {
    const request = event.request;
    const url = new URL(request.url);
    if (event.request.destination === "") {
        event.respondWith(networkFirst(request));
    } else event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    } else {
        const networkResponse = await fetch(request);
        const cache = await caches.open("v1");
        cache.put(request, networkResponse.clone());
        return networkResponse;
    }
}
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open("v1");
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (err) {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        } else console.log(err);
    }
}
self.addEventListener("activate", (event) => {
    const cacheAllowlist = ["v2"];

    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheAllowlist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                    return undefined;
                })
            )
        )
    );
});
