import express from 'express';

import * as BlogPostsController from 'controllers/blog-posts';
import { postImageUpload } from 'middlewares/image-upload';
import requiresAuth from 'middlewares/requiresAuth';
import validateRequestSchema from 'middlewares/validateRequestSchema';
import {
  createBlogPostSchema,
  deleteBlogPostSchema,
  getBlogPostsSchema,
  updateBlogPostSchema,
} from 'validations/blog-posts';

const router = express.Router();

// do we need validation here?
router.get('/', validateRequestSchema(getBlogPostsSchema), BlogPostsController.getBlogPosts);

router.get('/slugs', BlogPostsController.getAllBlogPostSlugs);

router.get('/post/:slug', BlogPostsController.getBlogPostBySlug);

router.post(
  '/',
  requiresAuth,
  postImageUpload.single('postImage'),
  validateRequestSchema(createBlogPostSchema),
  BlogPostsController.createBlogPost
);

router.patch(
  '/:blogPostId',
  requiresAuth,
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
