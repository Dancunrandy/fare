const Redis = require('redis');

// Create Redis client
const redisClient = Redis.createClient();

// Log errors
redisClient.on('error', err => console.error('Redis Client Error:', err));

// Log connection status
redisClient.on('connect', () => console.log('Connected to Redis'));

module.exports = redisClient;