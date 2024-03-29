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
  postCoverImage: File;
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
  postCoverImage?: File;
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

export async function uploadInPostImage(image: File) {
  const formData = new FormData();
  formData.append('inPostImage', image);

  const res = await api.post<{ imageUrl: string }>('/posts/images', formData);
  return res.data;
}
