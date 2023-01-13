const STATIC_CACHE = "static-v1";
// const DYNAMIC_CACHE = "dynamic-v1";
const UNMUTABLE_CACHE = "unmutable-v1";

const APP_SHELL = [
  "index.html",
  "css/style.css",
  "img/favicon.ico",
  "img/avatars/hulk.jpg",
  "img/avatars/ironman.jpg",
  "img/avatars/spiderman.jpg",
  "img/avatars/thor.jpg",
  "img/avatars/wolverine.jpg",
  "js/app.js",
];

// const APP_SHELL_DYNAMIC = [];

const APP_SHELL_UNMUTABLE = [
  "https://fonts.googleapis.com/css?family=Quicksand:300,400",
  "https://fonts.googleapis.com/css?family=Lato:400,300",
  "https://kit.fontawesome.com/76256c1da6.js",
  "css/animate.css",
  "js/libs/jquery.js",
];

self.addEventListener("install", (e) => {
  const cacheStatic = caches
    .open(STATIC_CACHE)
    .then((cache) => cache.addAll(APP_SHELL));

  // const cacheDynamic = caches
  // .open(DYNAMIC_CACHE)
  // .then((cache) => cache.addAll(APP_SHELL_DYNAMIC));

  const cacheUnmutable = caches
    .open(UNMUTABLE_CACHE)
    .then((cache) => cache.addAll(APP_SHELL_UNMUTABLE));

  e.waitUntil(Promise.all([cacheStatic, cacheUnmutable]));
});

self.addEventListener("activate", (e) => {
  const activacion = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== STATIC_CACHE && key.includes("static")) {
        return caches.delete(key);
      }
    });
  });

  e.waitUntil(activacion);
});

self.addEventListener('fetch', e => {
    caches.match( e.request).then (res => {
        if (res) {
            return res;
        } else {
            console.log( e.request.url);
        }
    });
});
