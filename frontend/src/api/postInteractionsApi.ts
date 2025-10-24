import axios from "axios";
import { currentUserId } from "@/stores/userStore.ts";
import type { CommentType } from "@/types.ts";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
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
  const res = await api.delete(`/comment/${commentId}`);
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
    id: commentId,
    postId: postId,
  });
}

export async function deletePost(postId: string) {
  await api.delete(`/post/${postId}`);
}
