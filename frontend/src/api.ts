import axios from "axios";
import { setUser } from "@/stores/userStore.ts";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false,
});

export async function login(username: string, email: string, password: string) {
  const res = await api.post("/user/login", {
    username: username,
    email: email,
    password: password,
  });

  const user = res.data.findRes?.[0];
  if (!user) {
    console.log("User not found");
    return;
  }

  setUser(user._id, user.username);
}

export async function fetchAllGarments() {
  const res = await api.get("/garments");
  return res.data;
}

export async function createOutfit(userId: string) {
  const res = await api.post("/create_outfit", { id: userId });
  return res.data;
}

export async function addGarmentToOutfit(outfitId: string, garmentId: string) {
  await api.patch("/outfit/add_garment", { id: outfitId, garmentId });
}

export async function createPost(
  userId: string,
  text: string,
  outfitId: string,
) {
  await api.post("/post/create_post", { id: userId, text, outfitId });
}
