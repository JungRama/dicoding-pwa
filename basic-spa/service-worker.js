const CACHE_NAME = 'pwa-app-v2-submission';
var urlsToCache = [
	// ROOT
	'/',
	'/nav.html',
	'/index.html',
	'/manifest.json',

	// PAGES
	'/pages/home.html',
	'/pages/about.html',
	'/pages/gallery.html',
	'/pages/contact.html',

	// IMAGES
	'/images/image-01.jpg',
	'/images/image-02.jpg',
	'/images/image-03.jpg',
	'/images/image-04.jpg',

	// CSS
	'/css/materialize.min.css',

	// JS
	'/js/materialize.min.js',
	'/js/script.js'
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