import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile, Strategy as GithubStrategy } from 'passport-github2';
import { VerifyCallback } from 'passport-oauth2';
import bcrypt from 'bcrypt';

import UserModel from '../models/user';
import env from '../env';

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((userId: string, cb) => {
  //string is transformed back into mongodb object id
  cb(null, { _id: new mongoose.Types.ObjectId(userId) });
});

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    try {
      const existingUser = await UserModel.findOne({ username }).select('+email +password').exec();
      if (!existingUser || !existingUser.password) {
        return cb(null, false);
      }

      const passwordMatch = await bcrypt.compare(password, existingUser.password);
      if (!passwordMatch) {
        return cb(null, false);
      }

      const user = existingUser.toObject();
      delete user.password;

      return cb(null, user);
    } catch (err) {
      cb(err);
    }
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.SERVER_URL}/users/oauth2/redirect/google`,
      scope: ['profile'],
    },
    // tokens needed if we want to make operations on user google account(we don`t)
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // if googleId exists in DB - login, else - create user
        let user = await UserModel.findOne({ googleId: profile.id }).exec();
        if (!user) {
          user = await UserModel.create({
            googleId: profile.id,
          });
        }
        cb(null, user);
      } catch (err) {
        if (err instanceof Error) {
          cb(err);
        } else {
          throw err;
        }
      }
    }
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      callbackURL: `${env.SERVER_URL}/users/oauth2/redirect/github`,
    },
    async (accessToken: string, refreshToken: string, profile: Profile, cb: VerifyCallback) => {
      try {
        let user = await UserModel.findOne({ githubId: profile.id }).exec();
        if (!user) {
          user = await UserModel.create({
            githubId: profile.id,
          });
        }
        cb(null, user);
      } catch (err) {
        if (err instanceof Error) {
          cb(err);
        } else {
          throw err;
        }
      }
    }
  )
);
