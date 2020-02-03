importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },  
    { url: '/index.html', revision: '1' }, 
    { url: '/nav.html', revision: '1' }, 
	{ url: '/manifest.json', revision: '1' }, 
	
    { url: '/css/materialize.min.css', revision: '1' }, 
	{ url: '/js/lib/materialize.min.js', revision: '1' }, 
	

	{ url: '/js/lib/idb.js', revision: '1' }, 
	{ url: '/js/script.js', revision: '1' },
	{ url: '/js/setting.js', revision: '1' },

	{ url: '/images/loader.gif', revision: '1' }, 
	{ url: '/images/icons/icon-72x72.png', revision: '1' }, 
	{ url: '/images/icons/icon-192x192.png', revision: '1' }, 
	{ url: '/images/icons/icon-512x512.png', revision: '1' },

]);

workbox.routing.registerRoute(
	new RegExp('/pages/'),
	workbox.strategies.networkFirst({
		cacheName: 'pagesCache'
	})
);

workbox.routing.registerRoute(
	'https://api.football-data.org/v2/competitions/2021/matches',
	workbox.strategies.networkFirst({
		cacheName: 'API'
	})
);

workbox.routing.registerRoute(
	'https://api.football-data.org/v2/competitions/2021/teams',
	workbox.strategies.networkFirst({
		cacheName: 'API'
	})
);

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
