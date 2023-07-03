import { RequestHandler } from 'express';
import createHttpError from 'http-errors';

import {
  ICreateCommentBody,
  ICreateCommentParams,
  IDeleteCommentParams,
  IGetCommentRepliesParams,
  IGetCommentRepliesQuery,
  IGetCommentsParams,
  IGetCommentsQuery,
  IUpdateCommentBody,
  IUpdateCommentParams,
} from '../validations/comment';
import CommentModel from '../models/comment';
import { assertIsDefined } from '../utils/assertIsDefined';

export const getCommentsForBlogPost: RequestHandler<
  IGetCommentsParams,
  unknown,
  unknown,
  IGetCommentsQuery
> = async (req, res, next) => {
  const { blogPostId } = req.params;
  const { continueAfterId } = req.query;

  const pageSize = 10;

  try {
    const query = CommentModel.find({ blogPostId, parentCommentId: undefined }).sort({ _id: -1 });

    if (continueAfterId) {
      query.lt('_id', continueAfterId); // lt = less than
    }

    const result = await query
      .limit(pageSize + 1) // +1 so we know there is next page
      .populate('author')
      .exec();

    const comments = result.slice(0, pageSize);
    const endOfPaginationReached = result.length <= pageSize;

    const commentsWithRepliesCount = await Promise.all(
      comments.map(async (comment) => {
        const repliesCount = await CommentModel.countDocuments({ parentCommentId: comment._id });
        return { ...comment.toObject(), repliesCount };
      })
    );

    res.status(200).json({
      comments: commentsWithRepliesCount,
      endOfPaginationReached,
    });
  } catch (err) {
    next(err);
  }
};
export const getCommentReplies: RequestHandler<
  IGetCommentRepliesParams,
  unknown,
  unknown,
  IGetCommentRepliesQuery
> = async (req, res, next) => {
  const { commentId: parentCommentId } = req.params;
  const { continueAfterId } = req.query;

  const pageSize = 10;

  try {
    const query = CommentModel.find({ parentCommentId });

    if (continueAfterId) {
      query.gt('_id', continueAfterId); // gt = greater than
    }

    const result = await query
      .limit(pageSize + 1) // +1 so we know there is next page
      .populate('author')
      .exec();

    const comments = result.slice(0, pageSize);
    const endOfPaginationReached = result.length <= pageSize;

    res.status(200).json({
      comments,
      endOfPaginationReached,
    });
  } catch (err) {
    next(err);
  }
};

export const createComment: RequestHandler<
  ICreateCommentParams,
  unknown,
  ICreateCommentBody,
  unknown
> = async (req, res, next) => {
  const { blogPostId } = req.params;
  const { parentCommentId, text } = req.body;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    const newComment = await CommentModel.create({
      blogPostId,
      text,
      author: authenticatedUser,
      parentCommentId,
    });

    await CommentModel.populate(newComment, { path: 'author' });

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};

export const updateComment: RequestHandler<
  IUpdateCommentParams,
  unknown,
  IUpdateCommentBody,
  unknown
> = async (req, res, next) => {
  const { commentId } = req.params;
  const { newText } = req.body;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    const commentToEdit = await CommentModel.findById(commentId).populate('author').exec();
    if (!commentToEdit) {
      throw createHttpError(404);
    }
    if (!commentToEdit.author.equals(authenticatedUser._id)) {
      throw createHttpError(401);
    }

    commentToEdit.text = newText;
    await commentToEdit.save();

    res.status(200).json(commentToEdit);
  } catch (err) {
    next(err);
  }
};

export const deleteComment: RequestHandler<
  IDeleteCommentParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { commentId } = req.params;
  const authenticatedUser = req.user;

  try {
    assertIsDefined(authenticatedUser);

    const commentToDelete = await CommentModel.findById(commentId).exec();
    if (!commentToDelete) {
      throw createHttpError(404);
    }
    if (!commentToDelete.author.equals(authenticatedUser._id)) {
      throw createHttpError(401);
    }

    await commentToDelete.deleteOne();
    await CommentModel.deleteMany({ parentCommentId: commentId }).exec();

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
