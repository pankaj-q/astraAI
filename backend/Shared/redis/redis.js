import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL);

redis.on('connect',() => {
    console.log(`Redis is connected and running on port 6379`);
})

export default redis;