import { currentUserId, setUser } from "@/stores/userStore.ts";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
  withCredentials: false,
});
export default api;

export async function loginUser(
  username: string,
  email: string,
  password: string,
) {
  const res = await api.post("/login", {
    username: username,
    email: email,
    password: password,
  });
  const user = res.data.findRes?.[0];
  if (!user) {
    console.error("User not found");
    return;
  }
  setUser(user._id, user.username);
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const res = await api.post("/create_account", {
    username: username,
    email: email,
    password: password,
  });
  return res.status;
}

export async function fetchUserById(id: string) {
  const res = await api.get(`/${id}`);
  return res.data;
}

export async function fetchUserByUsername(id: string) {
  const res = await api.get(`/by_username/${id}`);
  return res.data;
}

export async function unfollowUserId(idToFollow: string) {
  const res = await api.patch("/unfollow", {
    id: currentUserId.value,
    idToUnfollow: idToFollow,
  });
  return res.status;
}

export async function followUserId(idToFollow: string) {
  const res = await api.patch("/follow", {
    id: currentUserId.value,
    idToFollow: idToFollow,
  });
  return res.status;
}

export async function getFollowingList() {
  const res = await api.get(`${currentUserId.value}/following`);
  return res.data;
}
