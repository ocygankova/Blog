import { IUser } from '@/models/user';

export interface IComment {
  _id: string;
  blogPostId: string;
  parentCommentId?: string;
  author: IUser;
  text: string;
  createdAt: string;
  updatedAt: string;
  repliesCount?: number;
}

export interface ICommentsPage {
  comments: IComment[];
  endOfPaginationReached: boolean;
}
