import { RequestHandler } from 'express';
import { IGetCommentsParams, IGetCommentsQuery } from '../validations/comment';
import CommentModel from '../models/comment';

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

    res.status(200).json({
      comments,
      endOfPaginationReached,
    });
  } catch (err) {
    next(err);
  }
};
