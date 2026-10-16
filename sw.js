const CACHE_NAME = "taskflow-cache-v1";

const ARCHIVOS_CACHE = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./db.js"
];

// Guardar los archivos principales de la aplicación
self.addEventListener("install", function (evento) {
    evento.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(ARCHIVOS_CACHE);
            })
    );
});

// Servir archivos desde caché cuando no haya conexión
self.addEventListener("fetch", function (evento) {
    evento.respondWith(
        caches.match(evento.request)
            .then(function (respuestaCache) {
                return respuestaCache || fetch(evento.request);
            })
    );
});