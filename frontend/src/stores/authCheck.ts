import { useRouter } from "vue-router";
import { currentUserId } from "@/stores/userStore.ts";

export function authCheck() {
  const router = useRouter();

  function requireLogin() {
    if (!currentUserId.value) {
      router.push({ name: "login page" });
    }
  }
  return { requireLogin };
}
