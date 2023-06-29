import express from 'express';

import * as BlogPostsController from '../controllers/blog-posts';
import * as CommentsController from '../controllers/comments';
import {
  requiresAuth,
  validateRequestSchema,
  postImageUpload,
  createPostRateLimit,
  updatePostRateLimit,
} from '../middlewares';
import {
  createBlogPostSchema,
  deleteBlogPostSchema,
  getBlogPostsSchema,
  updateBlogPostSchema,
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
  postImageUpload.single('postImage'),
  validateRequestSchema(createBlogPostSchema),
  BlogPostsController.createBlogPost
);

router.patch(
  '/:blogPostId',
  requiresAuth,
  updatePostRateLimit,
  postImageUpload.single('postImage'),
  validateRequestSchema(updateBlogPostSchema),
  BlogPostsController.updateBlogPost
);

router.delete(
  '/:blogPostId',
  requiresAuth,
  validateRequestSchema(deleteBlogPostSchema),
  BlogPostsController.deleteBlogPost
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
