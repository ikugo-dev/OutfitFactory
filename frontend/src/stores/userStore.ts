import { ref } from "vue";

export const currentUserId = ref<string | null>(localStorage.getItem("userId"));
export const currentUsername = ref<string | null>(
  localStorage.getItem("username"),
);

export function setUser(id: string, username: string) {
  currentUserId.value = id;
  currentUsername.value = username;
  localStorage.setItem("userId", id);
  localStorage.setItem("username", username);
}

export function clearUser() {
  currentUserId.value = null;
  currentUsername.value = null;
  localStorage.removeItem("userId");
  localStorage.removeItem("username");
}
