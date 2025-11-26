const { getRedisClient } = require('../config/redis');

// Cache middleware for GET requests
const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    const redisClient = getRedisClient();
    
    // Skip if Redis not available
    if (!redisClient || !redisClient.isOpen) {
      return next();
    }

    const key = `cache:${req.originalUrl}`;

    try {
      const cachedData = await redisClient.get(key);
      
      if (cachedData) {
        console.log(`✅ Cache HIT: ${key}`);
        return res.json(JSON.parse(cachedData));
      }

      console.log(`❌ Cache MISS: ${key}`);
      
      // Store original res.json
      const originalJson = res.json.bind(res);
      
      // Override res.json to cache the response
      res.json = (data) => {
        redisClient.setEx(key, duration, JSON.stringify(data))
          .catch(err => console.error('Redis cache error:', err));
        return originalJson(data);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};

// Clear cache by pattern
const clearCache = async (pattern = '*') => {
  const redisClient = getRedisClient();
  if (!redisClient || !redisClient.isOpen) return;

  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log(`🗑️  Cleared ${keys.length} cache entries`);
    }
  } catch (error) {
    console.error('Clear cache error:', error);
  }
};

module.exports = { cacheMiddleware, clearCache };
