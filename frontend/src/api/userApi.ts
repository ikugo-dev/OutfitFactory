import api from "./baseApi.ts";
import { currentUserId, setUser } from "@/stores/userStore.ts";

export async function loginUser(
  username: string,
  email: string,
  password: string,
) {
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

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const res = await api.post("/user/create_account", {
    username: username,
    email: email,
    password: password,
  });
  return res.status;
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
