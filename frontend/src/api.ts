import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: false,
});

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
  outfitId: string,
  text: string,
) {
  await api.post("/create_post", { userId, outfitId, text });
}
