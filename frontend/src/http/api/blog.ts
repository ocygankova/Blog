import api from '@/http/axiosInstance';
import { IBlogPost, IBlogPostsPage } from '@/models/blogPost';
import { IComment, ICommentsPage } from '@/models/comment';

export async function getBlogPosts(page: number = 1) {
  const res = await api.get<IBlogPostsPage>(`/posts?page=${page}`);
  return res.data;
}

export async function getBlogPostsByUser(userId: string, page: number = 1) {
  const res = await api.get<IBlogPostsPage>(`/posts?authorId=${userId}&page=${page}`);
  return res.data;
}

export async function getAllBlogPostSlugs() {
  const res = await api.get<string[]>('/posts/slugs');
  return res.data;
}

export async function getBlogPostBySlug(slug: string) {
  const res = await api.get<IBlogPost>(`/posts/post/${slug}`);
  return res.data;
}

interface ICreateBlogPostValues {
  slug: string;
  title: string;
  summary: string;
  body: string;
  postImage: File;
}

export async function createBlogPost(input: ICreateBlogPostValues) {
  const formData = new FormData(); //using FormData instead of json to send file
  Object.entries(input).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await api.post<IBlogPost>('/posts', formData);
  return res.data;
}

interface IUpdateBlogPostValues {
  slug: string;
  title: string;
  summary: string;
  body: string;
  postImage?: File;
}

export async function updateBlogPost(blogPostId: string, input: IUpdateBlogPostValues) {
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    if (value !== undefined) formData.append(key, value);
  });

  await api.patch(`/posts/${blogPostId}`, formData);
}

export async function deleteBlogPost(blogPostId: string) {
  await api.delete(`/posts/${blogPostId}`);
}

export async function getCommentsForBlogPost(blogPostId: string, continueAfterId?: string) {
  const query = continueAfterId ? `?continueAfterId=${continueAfterId}` : '';

  const res = await api.get<ICommentsPage>(`/posts/${blogPostId}/comments${query}`);
  return res.data;
}

export async function createComment(
  blogPostId: string,
  parentCommentId: string | undefined,
  text: string
) {
  const res = await api.post<IComment>(`/posts/${blogPostId}/comments`, {
    text,
    parentCommentId,
  });
  return res.data;
}
