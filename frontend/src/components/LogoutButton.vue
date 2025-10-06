<template>
  <button class="logout-btn" @click="logout">Logout</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { clearUser } from "@/stores/userStore";

const router = useRouter();

function logout() {
  clearUser();
  router.push("/login");
}
</script>

<style scoped>
.logout-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}
.logout-btn:hover {
  background-color: #ff7875;
}
</style>

