import api from "./baseApi.ts";
import { currentUserId } from "@/stores/userStore.ts";

export async function fetchAllGarments() {
  const res = await api.get("/garments");
  return res.data;
}

export async function createOutfit() {
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

export async function fetchPosts(userId: string = "") {
  const res = await api.get("/posts", {
    params: {
      userId: userId,
    },
  });
  return res.data;
}

export async function fetchUserPosts(id: string) {
  const res = await api.get(`/user/${id}/posts`);
  return res.data;
}

export async function fetchPostById(id: string) {
  const res = await api.get(`/post/${id}`);
  return res.data;
}

export async function fetchOutfit(id: string) {
  const res = await api.get(`/outfit/${id}`);
  return res.data;
}

export async function fetchGarment(id: string) {
  const res = await api.get(`/garment/${id}`);
  return res.data;
}

export async function fetchUserById(id: string) {
  const res = await api.get(`/user/${id}`);
  return res.data;
}

export async function fetchUserByUsername(id: string) {
  const res = await api.get(`/user/by_username/${id}`);
  return res.data;
}
