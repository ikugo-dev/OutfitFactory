import { currentUserId } from "@/stores/userStore.ts";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false,
});
export default api;

export async function like(postId: string) {
  const res = await api.patch("/post/like", {
    id: postId,
    userId: currentUserId.value,
  });
  return res.data;
}

export async function unlike(postId: string) {
  const res = await api.patch("/post/unlike", {
    id: postId,
    userId: currentUserId.value,
  });
  return res.data;
}

export async function addComment(postId: string) {
  const res = await api.patch("/post/add_comment", {
    id: postId,
    userId: currentUserId.value,
  });
  return res.data;
}

export async function createComment(text: string) {
  const res = await api.post("/create_comment", {
    id: currentUserId.value,
    text: text,
  });
  return res.data;
}
