<template>
  <div class="profile-page">
    <div v-if="profile" class="profile-header">
      <img class="avatar" :src="profile.avatar" alt="avatar" />

      <div class="profile-info">
        <h2>{{ profile.username }}</h2>
        <h3>Followers: {{ profile.followers?.length || 0 }}</h3>

        <div class="profile-actions">
          <button v-if="isProfileOwner" @click="openSettings">Settings</button>
          <button v-else @click="toggleFollow">
            {{ isFollowing ? 'Unfollow' : 'Follow' }}
          </button>
        </div>
      </div>
    </div>

    <PostGrid v-if="posts.length" :posts="posts" />
    <p v-else class="no-posts">No posts yet.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PostGrid from '../components/PostGrid.vue'
import type { UserType, PostType } from '@/types.ts'

import { fetchUser, fetchUserPosts } from '@/api.ts'
import { currentUserId } from '@/stores/userStore.ts'

const route = useRoute()
const router = useRouter()

const profile = ref<UserType | null>(null)
const posts = ref<PostType[]>([])
const isFollowing = ref(false)

// Determine if it's your own profile
const isProfileOwner = computed(() => profile.value?._id === currentUserId.value)

// Load profile + posts
async function loadProfile() {
  try {
    let userId = ""

    // If route has username param, we’re viewing someone else’s profile
    if (route.params.username) {
      const username = route.params.username as string
      const userData = await fetchUser(username) // assuming fetchUser can handle username or id
      profile.value = userData
      userId = userData.id
    } else {
      // Own profile
      userId = currentUserId.value || ""
      profile.value = await fetchUser(userId)
    }

    // Fetch that user's posts
    posts.value = await fetchUserPosts(userId)
  } catch (err) {
    console.error('Failed to load profile:', err)
  }
}

function toggleFollow() {
  isFollowing.value = !isFollowing.value
  // TODO: Call API follow/unfollow
}

function openSettings() {
  router.push('/settings')
}

watch(() => route.params.username, loadProfile, { immediate: true })
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
  border: 0.2rem solid black;
  background-color: teal;
}
</style>
