import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import session from 'express-session';
import passport from 'passport';

import env from './env';
import usersRoutes from './routes/users';
import blogPostsRoutes from './routes/blog-posts';
import { errorHandler } from './middlewares';
import sessionConfig from './config/session';
import './config/passport';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use(
  cors({
    origin: env.WEBSITE_URL,
    // enable auth cookies from different url(combined with axios setup on frontend)
    credentials: true,
  })
);

app.use(session(sessionConfig));

app.use(passport.authenticate('session'));

app.use('/uploads/profile-images', express.static('uploads/profile-images'));
app.use('/uploads/post-cover-images', express.static('uploads/post-cover-images'));

app.use('/users', usersRoutes);
app.use('/posts', blogPostsRoutes);

app.use((req, res, next) => next(createHttpError(404, 'Endpoint not found')));

app.use(errorHandler);

export default app;
