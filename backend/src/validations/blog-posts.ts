import * as yup from 'yup';
import { imageFileSchema, mongooseObjectIdSchema } from '../utils/validation';
import { maxLengths } from '../utils/consts';

export const getBlogPostsSchema = yup.object({
  // the whole req object passed to yup, getting req.query from it
  query: yup.object({
    authorId: mongooseObjectIdSchema,
    page: yup.string(),
  }),
});

export type IGetBlogPostsReqQuery = yup.InferType<typeof getBlogPostsSchema>['query'];

const blogPostReqBodySchema = yup.object({
  title: yup.string().required().max(maxLengths.postTitle),
  slug: yup
    .string()
    .required()
    .max(maxLengths.postSlug)
    .matches(/^[a-zA-Z0-9_-]*$/),
  summary: yup.string().required().max(maxLengths.postSummary),
  body: yup.string().required(),
});

export type IBlogPostReqBody = yup.InferType<typeof blogPostReqBodySchema>;

export const createBlogPostSchema = yup.object({
  body: blogPostReqBodySchema,
  file: imageFileSchema.required('Post image required'),
});

export const updateBlogPostSchema = yup.object({
  params: yup.object({
    blogPostId: mongooseObjectIdSchema.required(),
  }),
  body: blogPostReqBodySchema,
  file: imageFileSchema,
});

export type IUpdateBlogPostParams = yup.InferType<typeof updateBlogPostSchema>['params'];

export const deleteBlogPostSchema = yup.object({
  params: yup.object({
    blogPostId: mongooseObjectIdSchema.required(),
  }),
});

export type IDeleteBlogPostParams = yup.InferType<typeof deleteBlogPostSchema>['params'];
