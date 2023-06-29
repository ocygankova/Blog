import * as yup from 'yup';
import { maxLengths } from '../utils/consts';
import { mongooseObjectIdSchema } from '../utils/validation';

const commentTextSchema = yup.string().required().max(maxLengths.postComment);

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

export const getCommentRepliesSchema = yup.object({
  params: yup.object({
    commentId: mongooseObjectIdSchema.required(),
  }),
  query: yup.object({
    continueAfterId: mongooseObjectIdSchema,
  }),
});

export type IGetCommentRepliesParams = yup.InferType<typeof getCommentRepliesSchema>['params'];
export type IGetCommentRepliesQuery = yup.InferType<typeof getCommentRepliesSchema>['query'];

export const createCommentSchema = yup.object({
  body: yup.object({
    text: commentTextSchema,
    parentCommentId: mongooseObjectIdSchema,
  }),
  params: yup.object({
    blogPostId: mongooseObjectIdSchema.required(),
  }),
});

export type ICreateCommentBody = yup.InferType<typeof createCommentSchema>['body'];
export type ICreateCommentParams = yup.InferType<typeof createCommentSchema>['params'];
