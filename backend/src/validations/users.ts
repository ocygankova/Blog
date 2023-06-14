import * as yup from 'yup';
import { imageFileSchema } from '../utils/validation';

const usernameSchema = yup
  .string()
  .max(20)
  .matches(/^[a-zA-Z0-9_]*$/);

const emailSchema = yup.string().email();

const passwordSchema = yup
  .string()
  .matches(/^(?!.* )/)
  .min(6);

export const signUpSchema = yup.object({
  body: yup.object({
    username: usernameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
    verificationCode: yup.string().required(),
  }),
});

export type ISignUpBody = yup.InferType<typeof signUpSchema>['body'];

export const updateUserSchema = yup.object({
  body: yup.object({
    username: usernameSchema,
    displayName: yup.string().max(40),
    about: yup.string().max(200),
  }),
  file: imageFileSchema,
});

export type IUpdateUserBody = yup.InferType<typeof updateUserSchema>['body'];

export const requestVerificationCodeSchema = yup.object({
  body: yup.object({
    email: emailSchema.required(),
  }),
});

export type IRequestVerificationCodeBody = yup.InferType<
  typeof requestVerificationCodeSchema
>['body'];

export const resetPasswordSchema = yup.object({
  body: yup.object({
    email: emailSchema.required(),
    newPassword: passwordSchema.required(),
    verificationCode: yup.string().required(),
  }),
});

export type IResetPasswordBody = yup.InferType<typeof resetPasswordSchema>['body'];
