<template>
  <div class="profile-page">
    <div class="profile-header">
      <img class="avatar" />
      <div>
        <h2>{{ profile.username }}</h2>
        <h3>Followers: {{ profile.followers }}</h3>
        <button @click="toggleFollow">{{ isFollowing ? 'Unfollow' : 'Follow' }}</button>
      </div>
    </div>
    <PostGrid :posts="posts" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import PostGrid from '../components/PostGrid.vue'
import { type PostType, type UserType } from "../types"
import { getFakeUser, getFakePosts } from '../fakeData.ts';

const profile = ref<UserType>(getFakeUser());
const posts = shallowRef<PostType[]>([])
const isFollowing = ref(false)
posts.value = getFakePosts(12);

function toggleFollow() {
  isFollowing.value = !isFollowing.value
}


</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.avatar {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  background-color: teal;
}
</style>
