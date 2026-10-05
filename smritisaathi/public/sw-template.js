const CACHE='smriti-__VERSION__';
const ASSETS=__ASSETS__;
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('smriti-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;if(event.request.mode==='navigate'){event.respondWith(fetch(event.request).catch(()=>caches.match('/index.html')));return;}if(ASSETS.includes(url.pathname))event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));});
// No auth credentials in the worker; foreground app replays its IndexedDB queue.
self.addEventListener('sync',event=>{if(event.tag==='smriti-sync')event.waitUntil(self.clients.matchAll({type:'window'}).then(clients=>clients.forEach(client=>client.postMessage({type:'SYNC_REQUEST'}))));});
self.addEventListener('push',event=>event.waitUntil(self.registration.showNotification('SmritiSaathi',{body:'Please open SmritiSaathi to check an update.',icon:'/icon-192.png',tag:'smriti-update'})));
self.addEventListener('notificationclick',event=>{event.notification.close();event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{const existing=clients.find(c=>new URL(c.url).origin===self.location.origin);return existing?existing.focus():self.clients.openWindow('/');}));});
