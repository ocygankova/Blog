import { RequestHandler } from 'express';
import {
  ICreateCommentBody,
  ICreateCommentParams,
  IGetCommentsParams,
  IGetCommentsQuery,
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

  const pageSize = 3;

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
