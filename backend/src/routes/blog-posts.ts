import express from 'express';

import * as BlogPostsController from '../controllers/blog-posts';
import * as CommentsController from '../controllers/comments';
import {
  requiresAuth,
  validateRequestSchema,
  postCoverImageUpload,
  createPostRateLimit,
  updatePostRateLimit,
  uploadImageRateLimit,
  inPostImageUpload,
} from '../middlewares';
import {
  createBlogPostSchema,
  deleteBlogPostSchema,
  getBlogPostsSchema,
  updateBlogPostSchema,
  uploadInPostImageSchema,
} from '../validations/blog-posts';
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentRepliesSchema,
  getCommentsSchema,
  updateCommentSchema,
} from '../validations/comment';

const router = express.Router();

// do we need validation here?
router.get('/', validateRequestSchema(getBlogPostsSchema), BlogPostsController.getBlogPosts);

router.get('/slugs', BlogPostsController.getAllBlogPostSlugs);

router.get('/post/:slug', BlogPostsController.getBlogPostBySlug);

router.post(
  '/',
  requiresAuth,
  createPostRateLimit,
  postCoverImageUpload.single('postCoverImage'),
  validateRequestSchema(createBlogPostSchema),
  BlogPostsController.createBlogPost
);

router.patch(
  '/:blogPostId',
  requiresAuth,
  updatePostRateLimit,
  postCoverImageUpload.single('postCoverImage'),
  validateRequestSchema(updateBlogPostSchema),
  BlogPostsController.updateBlogPost
);

router.delete(
  '/:blogPostId',
  requiresAuth,
  validateRequestSchema(deleteBlogPostSchema),
  BlogPostsController.deleteBlogPost
);

router.post(
  '/images',
  requiresAuth,
  uploadImageRateLimit,
  inPostImageUpload.single('inPostImage'),
  validateRequestSchema(uploadInPostImageSchema),
  BlogPostsController.uploadInPostImage
);

router.get(
  '/:blogPostId/comments',
  validateRequestSchema(getCommentsSchema),
  CommentsController.getCommentsForBlogPost
);

router.post(
  '/:blogPostId/comments',
  requiresAuth,
  validateRequestSchema(createCommentSchema),
  CommentsController.createComment
);

router.get(
  '/comments/:commentId/replies',
  validateRequestSchema(getCommentRepliesSchema),
  CommentsController.getCommentReplies
);

router.patch(
  '/comments/:commentId',
  requiresAuth,
  validateRequestSchema(updateCommentSchema),
  CommentsController.updateComment
);

router.delete(
  '/comments/:commentId',
  requiresAuth,
  validateRequestSchema(deleteCommentSchema),
  CommentsController.deleteComment
);

export default router;
