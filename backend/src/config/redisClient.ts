import { createClient } from 'redis';

const redisClient = createClient();
redisClient.connect().catch((error) => console.log('Redis Client Error', error));

export default redisClient;
