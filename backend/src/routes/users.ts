import express from 'express';
import passport from 'passport';

import * as UsersController from '../controllers/users';
import {
  requiresAuth,
  profileImageUpload,
  setSessionReturnTo,
  validateRequestSchema,
  requestVerificationCodeRateLimit,
  loginRateLimit,
} from '../middlewares';
import {
  requestVerificationCodeSchema,
  resetPasswordSchema,
  signUpSchema,
  updateUserSchema,
} from '../validations/users';
import env from '../env';

const router = express.Router();

router.get('/me', requiresAuth, UsersController.getAuthenticatedUser);

router.get('/profile/:username', UsersController.getUserByUsername);

router.post('/signup', validateRequestSchema(signUpSchema), UsersController.signUp);

router.post(
  '/verification-code',
  requestVerificationCodeRateLimit,
  validateRequestSchema(requestVerificationCodeSchema),
  UsersController.requestEmailVerificationCode
);

router.post(
  '/reset-password-code',
  requestVerificationCodeRateLimit,
  validateRequestSchema(requestVerificationCodeSchema),
  UsersController.requestResetPasswordCode
);

router.post(
  '/reset-password',
  validateRequestSchema(resetPasswordSchema),
  UsersController.resetPassword
);

router.post('/login', loginRateLimit, passport.authenticate('local'), (req, res) =>
  res.status(200).json(req.user)
);

router.get('/login/google', setSessionReturnTo, passport.authenticate('google'));

router.get('/login/github', setSessionReturnTo, passport.authenticate('github'));

router.get(
  '/oauth2/redirect/google',
  passport.authenticate('google', {
    successReturnToOrRedirect: env.WEBSITE_URL,
    keepSessionInfo: true,
  })
);

router.get(
  '/oauth2/redirect/github',
  passport.authenticate('github', {
    successReturnToOrRedirect: env.WEBSITE_URL,
    keepSessionInfo: true,
  })
);

router.post('/logout', UsersController.logOut);

router.patch(
  '/me',
  requiresAuth,
  profileImageUpload.single('profileImage'),
  validateRequestSchema(updateUserSchema),
  UsersController.updateUser
);

export default router;
