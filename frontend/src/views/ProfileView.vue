<template>
  <div class="profile-view">
    <div v-if="profile" class="profile-header">
      <img class="avatar" :src="profile.avatar" />

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
    <p v-else class="no-posts">No posts yet</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostGrid from "../components/PostGrid.vue";
import type { UserType, PostType } from "@/types.ts";
import { authCheck } from "@/stores/authCheck.ts";
const { requireLogin } = authCheck();

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

const isProfileOwner = computed(() => profile.value?._id === currentUserId.value);

async function loadProfile() {
  try {
    // If route has username param, we’re viewing someone else’s profile
    if (route.params.username) {
      const username = route.params.username as string;;
      const userData = await fetchUserByUsername(username);;
      profile.value = userData;
    } else {
      const userData = await fetchUserById(currentUserId.value || "");
      profile.value = userData;
    }
    posts.value = await fetchUserPosts(profile.value!._id);

    isFollowing.value = await getFollowingList().then((res) => {
      return res.includes(profile.value!._id)
    });
  } catch (err) {
    console.error("Failed to load profile:", err);
  }
}

function toggleFollow() {
  requireLogin();
  isFollowing.value
    ? unfollowUserId(profile.value!._id)
    : followUserId(profile.value!._id);
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

.avatar {
  width: 6em;
  height: 6em;
}
</style>
