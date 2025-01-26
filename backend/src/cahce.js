// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

module.exports = {
  get: (key) => {
    const item = cache.get(key);
    if (item && Date.now() - item.timestamp < CACHE_DURATION) {
      return item.value;
    }
    return null;
  },
  
  set: (key, value) => {
    cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
};