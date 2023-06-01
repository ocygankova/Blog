import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import sharp from 'sharp';
import crypto from 'crypto';

import UserModel from 'models/user';
import { assertIsDefined } from 'utils/assertIsDefined';
import {
  IRequestVerificationCodeBody,
  IResetPasswordBody,
  ISignUpBody,
  IUpdateUserBody,
} from 'validations/users';
import env from 'env';
import EmailVerificationToken from 'models/email-verification-token';
import PasswordResetToken from 'models/password-reset-token';
import * as Email from 'utils/email';
import { destroyAllActiveSessionsForUser } from 'utils/auth';

// =============================================================================
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  // user is added to req by passport
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    const user = await UserModel.findById(authenticatedUser._id)
      .select('+email')
      .exec();

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const getUserByUsername: RequestHandler = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      username: req.params.username,
    }).exec();

    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const signUp: RequestHandler<
  unknown,
  unknown,
  ISignUpBody,
  unknown
> = async (req, res, next) => {
  const { username, email, password: passwordRaw, verificationCode } = req.body;

  try {
    const existingUsername = await UserModel.findOne({ username })
      // collation to search for both upper and lowercase
      .collation({ locale: 'en', strength: 2 })
      .exec();
    if (existingUsername) {
      throw createHttpError(409, 'Username already taken');
    }

    const emailVerificationToken = await EmailVerificationToken.findOne({
      email,
      verificationCode,
    }).exec();
    if (!emailVerificationToken) {
      throw createHttpError(400, 'Verification code incorrect or expired.');
    } else {
      await emailVerificationToken.deleteOne();
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const result = await UserModel.create({
      username,
      email,
      displayName: username,
      password: passwordHashed,
    });

    // toObject() turns mongodb document into js object
    const newUser = result.toObject();
    delete newUser.password;

    // login from passport
    req.login(newUser, (err) => {
      if (err) throw err;
      res.status(201).json(newUser);
    });
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const requestEmailVerificationCode: RequestHandler<
  unknown,
  unknown,
  IRequestVerificationCodeBody,
  unknown
> = async (req, res, next) => {
  const { email } = req.body;

  try {
    const existingEmail = await UserModel.findOne({ email })
      .collation({ locale: 'en', strength: 2 })
      .exec();
    if (existingEmail) {
      throw createHttpError(
        409,
        'A user with this email address already exists. Please log in instead.'
      );
    }
    // crypto is a built-in node module
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    await EmailVerificationToken.create({ email, verificationCode });

    await Email.sendVerificationCode(email, verificationCode);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const requestResetPasswordCode: RequestHandler<
  unknown,
  unknown,
  IRequestVerificationCodeBody,
  unknown
> = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email })
      .collation({ locale: 'en', strength: 2 })
      .exec();

    if (!user) {
      throw createHttpError(
        404,
        'A user with this email does not exist. Please sign ip instead.'
      );
    }

    const verificationCode = crypto.randomInt(100000, 999999).toString();
    await PasswordResetToken.create({ email, verificationCode });

    await Email.sendPasswordResetCode(email, verificationCode);

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const resetPassword: RequestHandler<
  unknown,
  unknown,
  IResetPasswordBody,
  unknown
> = async (req, res, next) => {
  const { email, password: newPasswordRaw, verificationCode } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email })
      .select('+email')
      .collation({ locale: 'en', strength: 2 })
      .exec();

    if (!existingUser) {
      throw createHttpError(404, 'User not found.');
    }

    const passwordResetToken = await PasswordResetToken.findOne({
      email,
      verificationCode,
    }).exec();

    if (!passwordResetToken) {
      throw createHttpError(400, 'Verification code incorrect or expired.');
    } else {
      await passwordResetToken.deleteOne();
    }

    await destroyAllActiveSessionsForUser(existingUser._id.toString());

    const newPasswordHashed = await bcrypt.hash(newPasswordRaw, 10);

    existingUser.password = newPasswordHashed;

    await existingUser.save();

    const user = existingUser.toObject();
    delete user.password;

    // login from passport
    req.login(user, (err) => {
      if (err) throw err;
      res.status(200).json(user);
    });
  } catch (err) {
    next(err);
  }
};

// =============================================================================
//no need to try-catch without async
export const logOut: RequestHandler = (req, res) => {
  req.logout((err) => {
    if (err) throw err;
    res.sendStatus(200);
  });
};

// =============================================================================
export const updateUser: RequestHandler<
  unknown,
  unknown,
  IUpdateUserBody,
  unknown
> = async (req, res, next) => {
  const { username, displayName, about } = req.body;
  const profileImage = req.file;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    if (username) {
      const existingUsername = await UserModel.findOne({ username })
        .collation({ locale: 'en', strength: 2 })
        .exec();

      if (existingUsername) {
        throw createHttpError(409, 'Username already taken');
      }
    }

    let profileImageDestPath: string | undefined = undefined;

    if (profileImage) {
      profileImageDestPath = `/uploads/profile-images/${authenticatedUser._id}.png`;
      await sharp(profileImage.buffer)
        .resize(500, 500, { withoutEnlargement: true })
        .toFile(`./${profileImageDestPath}`);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      authenticatedUser._id,
      {
        // $set with condition to update only fields sent in the req body
        // ?lastupdated query param added so the url is different and browser refreshes image
        $set: {
          ...(username && { username }),
          ...(displayName && { displayName }),
          ...(about && { about }),
          ...(profileImage && {
            profileImageUrl:
              env.SERVER_URL +
              profileImageDestPath +
              '?lastupdated=' +
              Date.now(),
          }),
        },
      },
      //new: true so that the user is returned after update (before update by default)
      { new: true }
    ).exec();

    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
