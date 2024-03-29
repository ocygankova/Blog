import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import createHttpError from 'http-errors';
import * as fs from 'fs';
import axios from 'axios';
import crypto from 'crypto';
import * as path from 'path';

import BlogPostModel from '../models/blog-post';
import CommentModel from '../models/comment';
import { assertIsDefined } from '../utils/assertIsDefined';
import {
  IBlogPostReqBody,
  IDeleteBlogPostParams,
  IGetBlogPostsReqQuery,
  IUpdateBlogPostParams,
} from '../validations/blog-posts';
import env from '../env';

// =============================================================================
export const getBlogPosts: RequestHandler<
  unknown,
  unknown,
  unknown,
  IGetBlogPostsReqQuery
> = async (req, res, next) => {
  const authorId = req.query.authorId;
  const page = parseInt(req.query.page || '1');
  const pageSize = 6;

  // author from blog-post model
  const filter = authorId ? { author: authorId } : {};

  try {
    const getBlogPostsQuery = BlogPostModel.find(filter)
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate('author') // populates 'author' from schema with document according to 'ref'(so that we receive the whole user object on frontend)
      .exec();

    const countDocumentsQuery = BlogPostModel.countDocuments(filter).exec();

    // executing multiple queries
    const [blogPosts, totalResults] = await Promise.all([getBlogPostsQuery, countDocumentsQuery]);

    const totalPages = Math.ceil(totalResults / pageSize);

    res.status(200).json({
      blogPosts,
      page,
      totalPages,
    });
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const getAllBlogPostSlugs: RequestHandler = async (req, res, next) => {
  try {
    const results = await BlogPostModel.find().select('slug').exec();
    const slugs = results.map((post) => post.slug);

    res.status(200).json(slugs);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const getBlogPostBySlug: RequestHandler = async (req, res, next) => {
  try {
    const blogPost = await BlogPostModel.findOne({
      slug: req.params.slug,
    })
      .populate('author')
      .exec();

    if (!blogPost) {
      throw createHttpError(404, 'Blog post not found');
    }

    res.status(200).json(blogPost);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const createBlogPost: RequestHandler<unknown, unknown, IBlogPostReqBody, unknown> = async (
  req,
  res,
  next
) => {
  const { slug, title, summary, body } = req.body;
  const coverImage = req.file;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(coverImage);
    assertIsDefined(authenticatedUser);

    const postWithSameSlug = await BlogPostModel.findOne({ slug }).exec();

    if (postWithSameSlug) {
      throw createHttpError(409, 'Slug already taken. Please choose a different one.');
    }

    const blogPostId = new mongoose.Types.ObjectId();
    const imageDestPath = `/uploads/post-cover-images/${blogPostId}${path.extname(
      coverImage.originalname
    )}`;

    await sharp(coverImage.buffer).resize(1000, 420).toFile(`./${imageDestPath}`);

    const newPost = await BlogPostModel.create({
      _id: blogPostId,
      slug,
      title,
      summary,
      body,
      coverImageUrl: env.SERVER_URL + imageDestPath,
      author: authenticatedUser._id,
    });

    await axios.get(
      `${env.WEBSITE_URL}/api/revalidate-post/${slug}?secret=${env.POST_REVALIDATION_KEY}`
    );

    res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const updateBlogPost: RequestHandler<
  IUpdateBlogPostParams,
  unknown,
  IBlogPostReqBody,
  unknown
> = async (req, res, next) => {
  const { blogPostId } = req.params;
  const { slug, title, summary, body } = req.body;
  const coverImage = req.file;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    const postWithSameSlug = await BlogPostModel.findOne({ slug }).exec();

    if (postWithSameSlug && !postWithSameSlug._id.equals(blogPostId)) {
      throw createHttpError(409, 'Slug already taken. Please choose a different one.');
    }

    const postToEdit = await BlogPostModel.findById(blogPostId).exec();
    if (!postToEdit) {
      throw createHttpError(404);
    }

    // should it be 403?
    if (!postToEdit.author.equals(authenticatedUser._id)) {
      throw createHttpError(401);
    }

    postToEdit.slug = slug;
    postToEdit.title = title;
    postToEdit.summary = summary;
    postToEdit.body = body;

    if (coverImage) {
      const imageDestPath = `/uploads/post-cover-images/${blogPostId}${path.extname(
        coverImage.originalname
      )}`;
      await sharp(coverImage.buffer).resize(1000, 420).toFile(`./${imageDestPath}`);

      postToEdit.coverImageUrl = env.SERVER_URL + imageDestPath + '?lastupdated=' + Date.now();
    }

    await postToEdit.save();

    await axios.get(
      `${env.WEBSITE_URL}/api/revalidate-post/${slug}?secret=${env.POST_REVALIDATION_KEY}`
    );

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

// =============================================================================
export const deleteBlogPost: RequestHandler<
  IDeleteBlogPostParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { blogPostId } = req.params;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    const postToDelete = await BlogPostModel.findById(blogPostId).exec();

    if (!postToDelete) {
      throw createHttpError(404);
    }

    if (!postToDelete.author.equals(authenticatedUser._id)) {
      throw createHttpError(401);
    }

    // check so we don't delete prod images from localhost
    if (postToDelete.coverImageUrl.startsWith(env.SERVER_URL)) {
      const imagePath = postToDelete.coverImageUrl.split(env.SERVER_URL)[1].split('?')[0];
      fs.unlinkSync('.' + imagePath);
    }

    await CommentModel.deleteMany({ blogPostId: postToDelete._id }).exec();
    await postToDelete.deleteOne();

    await axios.get(
      `${env.WEBSITE_URL}/api/revalidate-post/${postToDelete.slug}?secret=${env.POST_REVALIDATION_KEY}`
    );

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const uploadInPostImage: RequestHandler = async (req, res, next) => {
  const image = req.file;

  try {
    assertIsDefined(image);

    const fileName = crypto.randomBytes(20).toString('hex');
    const imageDestPath = `/uploads/in-post-images/${fileName}${path.extname(image.originalname)}`;
    await sharp(image.buffer)
      .resize(1920, undefined, { withoutEnlargement: true })
      .toFile(`./${imageDestPath}`);

    res.status(201).json({ imageUrl: env.SERVER_URL + imageDestPath });
  } catch (err) {
    next(err);
  }
};
