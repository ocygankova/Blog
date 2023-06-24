import rateLimit from 'express-rate-limit';

export const loginRateLimit = rateLimit({
  windowMs: 3 * 60 * 60 * 1000, // 3h
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

export const requestVerificationCodeRateLimit = rateLimit({
  windowMs: 30 * 1000, // 30sec
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});

export const createPostRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});

export const updatePostRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
});
