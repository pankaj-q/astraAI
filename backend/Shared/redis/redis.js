import Rides from 'ioredis'
const redis = new Rides(process.env.REDIS_URL);

redis.on('connet', () => {
    console.log("Redis connected");
})

export default redis;