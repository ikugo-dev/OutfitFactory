import axios from "axios";
import { currentUserId, setUser } from "@/stores/userStore.ts";
import type { UserType } from "@/types.ts";
import "dotenv";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/user`,
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
  }
  if (res.status != 200) {
    console.error("Error while logging in");
  }
  setUser(user._id, user.username);
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  await api.post("/create_account", {
    username: username,
    email: email,
    password: password,
  });
}

export async function fetchUserById(id: string): Promise<UserType> {
  const res = await api.get(`/${id}`);
  return res.data;
}

export async function fetchUserByUsername(id: string): Promise<UserType> {
  const res = await api.get(`/by_username/${id}`);
  return res.data;
}

export async function unfollowUserId(idToFollow: string) {
  await api.patch("/unfollow", {
    id: currentUserId.value,
    idToUnfollow: idToFollow,
  });
}

export async function followUserId(idToFollow: string) {
  await api.patch("/follow", {
    id: currentUserId.value,
    idToFollow: idToFollow,
  });
}

export async function getFollowingList(): Promise<string[]> {
  const res = await api.get(`${currentUserId.value}/following`);
  return res.data;
}
