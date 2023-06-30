import api from '@/http/axiosInstance';
import { IComment, ICommentsPage } from '@/models/comment';

export async function getCommentsForBlogPost(blogPostId: string, continueAfterId?: string) {
  const query = continueAfterId ? `?continueAfterId=${continueAfterId}` : '';

  const res = await api.get<ICommentsPage>(`/posts/${blogPostId}/comments${query}`);
  return res.data;
}

export async function getRepliesForComment(commentId: string, continueAfterId?: string) {
  const query = continueAfterId ? `?continueAfterId=${continueAfterId}` : '';

  const res = await api.get<ICommentsPage>(`/posts/comments/${commentId}/replies${query}`);
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

export async function updateComment(commentId: string, newText: string) {
  const res = await api.patch<IComment>(`/posts/comments/${commentId}`, {
    newText,
  });
  return res.data;
}

export async function deleteComment(commentId: string) {
  await api.delete(`/posts/comments/${commentId}`);
}
