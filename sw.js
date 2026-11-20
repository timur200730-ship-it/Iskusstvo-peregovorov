const CACHE="cp-negotiation-v1";
const CORE=["./", "./index.html", "./styles.css", "./app.js", "./manifest.webmanifest", "./sw.js", "./assets/slide-25.jpg", "./assets/slide-31.jpg", "./assets/rabochaya-tetrad.pdf", "./assets/slide-32.jpg", "./assets/slide-26.jpg", "./assets/slide-18.jpg", "./assets/slide-28.jpg", "./assets/slide-29.jpg", "./assets/slide-30.jpg", "./assets/icon-180.png", "./assets/icon.svg", "./assets/icon-192.png", "./assets/slide-20.jpg", "./assets/slide-23.jpg", "./assets/icon-512.png", "./assets/slide-27.jpg", "./assets/slide-22.jpg", "./assets/slide-17.jpg", "./assets/slide-24.jpg"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener("fetch",event=>{
 const req=event.request;
 if(req.method!=="GET")return;
 event.respondWith(caches.match(req).then(cached=>{
  if(cached)return cached;
  return fetch(req).then(res=>{
   if(res.ok && new URL(req.url).origin===location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}
   return res;
  }).catch(()=>caches.match("./index.html"));
 }));
});
