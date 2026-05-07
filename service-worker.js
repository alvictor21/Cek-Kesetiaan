const CACHE_NAME = "quiz-app-v1";

const FILES_TO_CACHE = [
    "/",
    "/Login.html",
    "/page1.html",
    "/pertanyaan.html",
    "/script.js",
    "/questionScript.js",
    "/musicBG.mp3",
    "/correct.mp3",
    "/wrong.mp3",
    "/areyou.png",
    "/benar.png",
    "/salah.png",
    "/bheart.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});