import { clientsClaim } from 'workbox-core'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'

declare let self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

// Auto Update Behavior
self.skipWaiting()
clientsClaim()

self.addEventListener('fetch', (e) => {
    console.log(e.request)
})