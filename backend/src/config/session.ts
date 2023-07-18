import crypto from 'crypto';
import { SessionOptions } from 'express-session';
import RedisStore from 'connect-redis';
// import MongoStore from 'connect-mongo';
import env from '../env';
import redisClient from './redisClient';

// const store =
//   env.NODE_ENV === 'production'
//     ? new RedisStore({
//         client: redisClient,
//       })
//     : MongoStore.create({
//         mongoUrl: env.MONGO_CONNECTION_STRING,
//       });

const store = new RedisStore({
  client: redisClient,
});

const sessionConfig: SessionOptions = {
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  rolling: true,
  store: store,
  genid(req) {
    const userId = req.user?._id;
    const randomId = crypto.randomUUID();
    if (userId) {
      return `${userId}-${randomId}`;
    } else {
      return randomId;
    }
  },
};

export default sessionConfig;
