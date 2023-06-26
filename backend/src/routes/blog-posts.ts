import express from 'express';

import * as BlogPostsController from '../controllers/blog-posts';
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

export default router;
