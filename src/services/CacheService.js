import { openDB } from 'idb';

const DB_NAME = 'churchCRM';
const DB_VERSION = 1;

class CacheService {
  constructor() {
    this.dbPromise = this.initDB();
  }

  async initDB() {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // Create stores for different types of data
        if (!db.objectStoreNames.contains('members')) {
          db.createObjectStore('members', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('events')) {
          db.createObjectStore('events', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('donations')) {
          db.createObjectStore('donations', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('apiCache')) {
          const apiStore = db.createObjectStore('apiCache', { keyPath: 'url' });
          apiStore.createIndex('timestamp', 'timestamp');
        }
      },
    });
  }

  async cacheData(storeName, data) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    if (Array.isArray(data)) {
      for (const item of data) {
        await store.put(item);
      }
    } else {
      await store.put(data);
    }

    await tx.done;
  }

  async getCachedData(storeName, id) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);

    if (id) {
      return store.get(id);
    }
    return store.getAll();
  }

  async cacheAPIResponse(url, data, maxAge = 3600000) { // Default 1 hour
    const db = await this.dbPromise;
    const tx = db.transaction('apiCache', 'readwrite');
    const store = tx.objectStore('apiCache');

    await store.put({
      url,
      data,
      timestamp: Date.now(),
      maxAge
    });

    await tx.done;
  }

  async getCachedAPIResponse(url) {
    const db = await this.dbPromise;
    const tx = db.transaction('apiCache', 'readonly');
    const store = tx.objectStore('apiCache');
    const cached = await store.get(url);

    if (!cached) return null;

    // Check if cache is still valid
    const age = Date.now() - cached.timestamp;
    if (age > cached.maxAge) {
      // Cache expired, delete it
      const deleteTx = db.transaction('apiCache', 'readwrite');
      await deleteTx.objectStore('apiCache').delete(url);
      await deleteTx.done;
      return null;
    }

    return cached.data;
  }

  async clearCache(storeName) {
    const db = await this.dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    await tx.objectStore(storeName).clear();
    await tx.done;
  }

  async clearExpiredCache() {
    const db = await this.dbPromise;
    const tx = db.transaction('apiCache', 'readwrite');
    const store = tx.objectStore('apiCache');
    const index = store.index('timestamp');
    const now = Date.now();

    let cursor = await index.openCursor();
    while (cursor) {
      const cached = cursor.value;
      if (now - cached.timestamp > cached.maxAge) {
        await cursor.delete();
      }
      cursor = await cursor.continue();
    }

    await tx.done;
  }
}

export default new CacheService(); 