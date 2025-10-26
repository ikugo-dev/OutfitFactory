import axios from "axios";
import { currentUserId } from "@/stores/userStore.ts";
import type { CommentType } from "@/types.ts";
import "dotenv";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: false,
});
export default api;

export async function like(postId: string) {
  await api.patch("/post/like", {
    id: postId,
    userId: currentUserId.value,
  });
}

export async function unlike(postId: string) {
  await api.patch("/post/unlike", {
    id: postId,
    userId: currentUserId.value,
  });
}

export async function fetchCommentById(
  commentId: string,
): Promise<CommentType> {
  const res = await api.get(`/comment/${commentId}`);
  return res.data;
}

export async function fetchPostComments(
  postId: string,
): Promise<CommentType[]> {
  const res = await api.get(`post/${postId}/comments`);
  return res.data;
}

export async function createComment(text: string): Promise<CommentType> {
  const res = await api.post("/create_comment", {
    id: currentUserId.value,
    text: text,
  });
  return res.data;
}

export async function addCommentToPost(commentId: string, postId: string) {
  await api.patch("/post/add_comment", {
    id: postId,
    commentId: commentId,
  });
}

export async function deletePost(postId: string) {
  await api.delete(`/post/${postId}`);
}
