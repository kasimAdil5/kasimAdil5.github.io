/* Service Worker for English Learning Website Reminders */

// Cache name
const CACHE_NAME = 'english-learning-cache-v1';

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/script.js',
  '/js/reminder.js'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Push notification event
self.addEventListener('push', event => {
  const title = 'English Learning Reminder';
  const options = {
    body: 'It\'s been 24 hours since your last study session. Keep up your daily practice!',
    icon: '/images/logo.png',
    badge: '/images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'sync-reminders') {
    event.waitUntil(syncReminders());
  }
});

// Function to sync reminders
function syncReminders() {
  // This would connect to a backend in a real implementation
  return new Promise((resolve, reject) => {
    // Simulate successful sync
    setTimeout(() => {
      console.log('Reminders synced successfully');
      resolve();
    }, 1000);
  });
}
