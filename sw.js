// Install service worker
this.addEventListener('install', (e) => {
  // Cache the fallback image
  e.waitUntil(
    caches.open('precache').then((cache) => cache.add('/broken-image-fallback.png'))
  )
})

// Check if failed request is an image
const isImage = (fetchRequest) => {
  return (
    fetchRequest.method === 'GET' && fetchRequest.destination === 'image'
  );
}

// Listen for request errors
this.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response.ok) return response;
        // User is online, but request failed
        if (isImage(e.request)) {
          // Handle failed image request
          return caches.match('/broken-image-fallback.png');
        }
      })
      .catch((err) => {
        // User is likely offline
        if (isImage(e.request)) {
          // Handle failed image request
          return caches.match('/broken-image-fallback.png');
        }
      })
  );
});