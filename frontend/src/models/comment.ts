import { IUser } from '@/models/user';

export interface IComment {
  _id: string;
  blogPostId: string;
  parentCommentId?: string;
  author: IUser;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentsPage {
  comments: IComment[];
  endOfPaginationReached: boolean;
}
