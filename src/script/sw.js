import CacheHelper from './utils/cache-helper';
import 'regenerator-runtime';

self.addEventListener('install', (event) => {
  console.log('installing service worker');
  // eslint-disable-next-line no-undef
  event.waitUntil(CacheHelper.cachingAppShell([...assets, './']));
});

self.addEventListener('activate', (event) => {
  console.log('activating service worker');
  event.waitUntil(CacheHelper.deletengOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
