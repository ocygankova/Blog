import * as yup from 'yup';
import { maxLengths } from '../utils/consts';
import { mongooseObjectIdSchema } from '../utils/validation';

const commentBodySchema = yup.string().required().max(maxLengths.postComment);

export const getCommentsSchema = yup.object({
  params: yup.object({
    blogPostId: mongooseObjectIdSchema.required(),
  }),
  query: yup.object({
    continueAfterId: mongooseObjectIdSchema,
  }),
});

export type IGetCommentsParams = yup.InferType<typeof getCommentsSchema>['params'];
export type IGetCommentsQuery = yup.InferType<typeof getCommentsSchema>['query'];

export const createCommentSchema = yup.object({
  body: yup.object({
    body: commentBodySchema,
    parentCommentId: mongooseObjectIdSchema,
  }),
  params: yup.object({
    blogPostId: mongooseObjectIdSchema.required(),
  }),
});

export type ICreateCommentBody = yup.InferType<typeof createCommentSchema>['body'];
export type ICreateCommentParams = yup.InferType<typeof createCommentSchema>['params'];
