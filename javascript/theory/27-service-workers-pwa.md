# Service Workers & Progressive Web Apps (PWAs)

## Service Workers

A service worker is a script that your browser runs in the background, separate from a web page, enabling features that don't need a web page or user interaction.

### Key Features

- Network proxy
- Offline capabilities
- Background sync
- Push notifications
- Cache management

## Implementation

### Registration

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration);
      })
      .catch(error => {
        console.log('SW registration failed:', error);
      });
  });
}
```

### Service Worker Lifecycle

1. **Installation**
```javascript
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js'
      ]);
    })
  );
});
```

2. **Activation**
```javascript
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== 'v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

3. **Fetch Handling**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
```

## Caching Strategies

1. **Cache First**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});
```

2. **Network First**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
```

3. **Stale While Revalidate**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open('dynamic-cache').then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});
```

## Progressive Web Apps (PWAs)

PWAs are web applications that use modern web capabilities to deliver an app-like experience to users.

### PWA Requirements

1. **Web App Manifest**
```json
{
  "name": "My PWA",
  "short_name": "PWA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **Service Worker**
- Offline functionality
- Push notifications
- Background sync

3. **HTTPS**
- Required for service workers
- Ensures secure communication

## Advanced Features

1. **Background Sync**
```javascript
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Sync data with server
}
```

2. **Push Notifications**
```javascript
// Request permission
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    // Subscribe to push notifications
  }
});

// Handle push events
self.addEventListener('push', event => {
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png'
  };

  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
```

3. **Periodic Sync**
```javascript
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  }
});
```

## Best Practices

1. **Cache Management**
- Version your caches
- Clean up old caches
- Use appropriate cache strategies

2. **Error Handling**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then(response => {
            if (response) return response;
            return caches.match('/offline.html');
          });
      })
  );
});
```

3. **Performance Optimization**
- Pre-cache critical resources
- Use appropriate cache strategies
- Implement lazy loading

## Testing and Debugging

1. **Chrome DevTools**
- Application tab
- Service Workers panel
- Cache Storage
- Background Services

2. **Lighthouse**
- PWA audit
- Performance metrics
- Best practices

## Common Issues and Solutions

1. **Cache Invalidation**
```javascript
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.startsWith('my-cache-') && 
              cacheName !== 'my-cache-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

2. **Update Management**
```javascript
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});
```

3. **Offline Fallback**
```javascript
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match('/offline.html');
      })
  );
});
``` 