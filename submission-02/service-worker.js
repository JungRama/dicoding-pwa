const CACHE_NAME = 'pwa-football-v1-submission';
var urlsToCache = [
	// ROOT
	'/',
	'/nav.html',
	'/index.html',
	'/manifest.json',

	// PAGES
	'/pages/favorite.html',
	'/pages/matches.html',
	'/pages/teams.html',

	// IMAGES
	'/images/loader.gif',

	// CSS
	'/css/materialize.min.css',

	// JS
	'/js/lib/materialize.min.js',
	'/js/lib/idb.js',

	'/js/pages/favorites.js',
	'/js/pages/matches.js',
	'/js/pages/teams.js',

	'/js/script.js',
	'/js/setting.js'
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'image/icons/icon-128x128.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});