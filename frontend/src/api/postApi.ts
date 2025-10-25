import axios from "axios";
import { currentUserId } from "@/stores/userStore.ts";
import "dotenv";

const api = axios.create({
  baseURL: `${import.meta.env.BACKEND_URL}/api`,
  withCredentials: false,
});
export default api;

import type { GarmentType, OutfitType, PostType } from "@/types.ts";

export async function fetchAllGarments(): Promise<GarmentType[]> {
  const res = await api.get("/garments");
  return res.data;
}

export async function createOutfit(): Promise<OutfitType> {
  const res = await api.post("/create_outfit", {
    id: currentUserId.value,
  });
  return res.data;
}

export async function addGarmentToOutfit(outfitId: string, garmentId: string) {
  await api.patch("/outfit/add_garment", {
    id: outfitId,
    garmentId,
  });
}

export async function fetchOutfit(id: string): Promise<OutfitType> {
  const res = await api.get(`/outfit/${id}`);
  return res.data;
}

export async function fetchGarment(id: string): Promise<GarmentType> {
  const res = await api.get(`/garment/${id}`);
  return res.data;
}

export async function createPost(
  text: string,
  outfitId: string,
) {
  await api.post("/post/create_post", {
    id: currentUserId.value,
    text,
    outfitId,
  });
}

export async function fetchPosts(userId: string = ""): Promise<PostType[]> {
  const res = await api.get("/posts", {
    params: {
      userId: userId,
    },
  });
  return res.data;
}

export async function fetchUserPosts(id: string): Promise<PostType[]> {
  const res = await api.get(`/user/${id}/posts`);
  return res.data;
}

export async function fetchPostById(id: string): Promise<PostType> {
  const res = await api.get(`/post/${id}`);
  return res.data;
}
