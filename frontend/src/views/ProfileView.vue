<template>
  <div class="profile-view">
    <div v-if="profile" class="profile-header">
      <img class="avatar" :src="profile.avatar" alt="avatar" />

      <div class="profile-info">
        <h2>{{ profile.username }}</h2>
        <h3>Followers: {{ profile.followers?.length }}</h3>

        <div class="profile-actions">
          <button v-if="isProfileOwner" @click="openSettings">Settings</button>
          <button v-else @click="toggleFollow">
            {{ isFollowing ? "Unfollow" : "Follow" }}
          </button>
        </div>
      </div>
    </div>

    <PostGrid v-if="posts.length" :posts="posts" />
    <p v-else class="no-posts">No posts yet.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostGrid from "../components/PostGrid.vue";
import type { UserType, PostType } from "@/types.ts";

import {
  fetchUserById, fetchUserByUsername,
  followUserId, unfollowUserId, getFollowingList
} from "@/api/userApi";
import { fetchUserPosts } from "@/api/postApi.ts";
import { currentUserId } from "@/stores/userStore.ts";

const route = useRoute();
const router = useRouter();

const profile = ref<UserType | null>(null);
const posts = ref<PostType[]>([]);
const isFollowing = ref(false);
const userId = ref("");

const isProfileOwner = computed(() => profile.value?._id === currentUserId.value);

async function loadProfile() {
  try {
    // If route has username param, we’re viewing someone else’s profile
    if (route.params.username) {
      const username = route.params.username as string;;
      const userData = await fetchUserByUsername(username);;
      profile.value = userData;
      userId.value = userData._id;
    } else {
      userId.value = currentUserId.value || "";
      profile.value = await fetchUserById(userId.value);
    }
    posts.value = await fetchUserPosts(userId.value);

    isFollowing.value = await getFollowingList().then((res) => {
      return (res as string[]).includes(userId.value)
    });
  } catch (err) {
    console.error("Failed to load profile:", err);
  }
}

function toggleFollow() {
  if (isFollowing.value) {
    unfollowUserId(userId.value);
  } else {
    followUserId(userId.value);
  }
  isFollowing.value = !isFollowing.value;
}

function openSettings() {
  router.push("/settings");
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
</style>
