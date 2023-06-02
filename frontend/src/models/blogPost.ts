import { IUser } from "@/models/user";

export interface IBlogPost {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  imageUrl: string;
  author: IUser;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPostsPage {
  blogPosts: IBlogPost[];
  page: number;
  totalPages: number;
}
