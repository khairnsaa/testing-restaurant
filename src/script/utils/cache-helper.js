import CONFIG from '../global/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    cache.addAll(requests);
  },

  async deletengOldCache() {
    const cacheNames = await caches.keys();
    cacheNames
      .filter((cache) => cache !== CONFIG.CACHE_NAME)
      .map((filteredCache) => caches.delete(filteredCache));
  },

  async revalidateCache(req) {
    const response = await caches.match(req);

    if (response) {
      this._fetchRequest(req);
      return response;
    }

    return this._fetchRequest(req);
  },

  _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(req) {
    const response = await fetch(req);

    if (!response || response.status !== 200) {
      return response;
    }

    await this._addCache(req);
    return response;
  },

  async _addCache(req) {
    const cache = await this._openCache();
    cache.add(req);
  },

};

export default CacheHelper;
