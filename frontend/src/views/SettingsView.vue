<template>
  <div class="profile-view">
    <div v-if="profile" class="profile-header">
      <img class="avatar" :src="profile.avatar" />

      <div class="profile-info">
        <h2>{{ profile.username }}</h2>
        <button @click="saveAndExit">Save & Exit</button>
      </div>
    </div>
    <h1>Profile features will be avalable soon</h1>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { UserType, PostType } from "@/types.ts";
import { authCheck } from "@/stores/authCheck.ts";
const { requireLogin } = authCheck();

import { fetchUserById } from "@/api/userApi";
import { fetchUserPosts } from "@/api/postApi.ts";
import { currentUserId } from "@/stores/userStore.ts";

const route = useRoute();
const router = useRouter();

const profile = ref<UserType | null>(null);
const posts = ref<PostType[]>([]);

async function loadProfile() {
  try {
    const userData = await fetchUserById(currentUserId.value || "");
    profile.value = userData;
    posts.value = await fetchUserPosts(profile.value!._id);
  } catch (err) {
    console.error("Failed to load profile:", err);
  }
}

function saveAndExit() {
  router.push("/profile");
}

watch(() => route.params.username, loadProfile, { immediate: true });
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.avatar {
  width: 6em;
  height: 6em;
}
</style>
