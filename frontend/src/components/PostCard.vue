<template>
  <div v-if="!isDeleted" class="post-card" :style="{ backgroundColor: color }">

    <div class="outfit-container">
      <OutfitViewer v-if="outfit" :outfit="outfit" />
      <div v-else class="loading">Loading outfit...</div>
    </div>

    <div class="post-info">
      <span class="date">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
      •
      <span class="likes">{{ post.likes + (likedByUser ? 1 : 0) }} likes</span>
    </div>

    <ProfileWithText v-if="user" :user="user" :avatarSize="3" :text="post.text || ''" />
    <PostCardControls :postId="post._id" :isProfileOwner="isProfileOwner" @liked="likedByUser = true"
      @unliked="likedByUser = false" @deletedPost="isDeleted = true" @showComments="showComments = true" />
    <PostComments v-if="showComments" :color="color" :post="post" @close="showComments = false" />
  </div>
</template>

<script setup lang="ts">
import OutfitViewer from "./OutfitViewer.vue";
import PostCardControls from "./PostCardControls.vue";
import PostComments from "./PostComments.vue";
import type { PostType, OutfitType, UserType } from "@/types";
import { ref, computed, onMounted } from "vue";
import { fetchOutfit } from "@/api/postApi.ts";

import { currentUserId } from "@/stores/userStore";
import ProfileWithText from "./ProfileWithText.vue";
const isProfileOwner = computed(() => user.value?._id === currentUserId.value);
const isDeleted = ref(false);
const showComments = ref(false);

const { post } = defineProps<{
  post: PostType
}>();
const emit = defineEmits<{
  (e: "deletedPost"): void
}>()

const outfit = ref<OutfitType | null>(null);
const likedByUser = ref(false);

const user = computed<UserType | null>(() => // to avoid stupid null warrning
  typeof post.user === "object" ? post.user : null
);

onMounted(async () => {
  try {
    outfit.value = await fetchOutfit(post.outfit as string);
  } catch (err) {
    console.error("Failed to fetch outfit:", err);
  }
});

const color = (function randomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 70 + Math.random() * 30;
  const l = 70 + Math.random() * 30;
  return `hsl(${h}, ${s}%, ${l}%)`;
})();
</script>
<style scoped>
.post-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.5rem;
  border: 0.2rem solid black;
  justify-content: center;
}

.outfit-container {
  width: 100%;
  height: auto;
  background-color: var(--background);
  border: 0.2rem solid black;
  padding: 0.5rem 0.2rem 0.5rem;
  display: flex;
  justify-content: center;
}
</style>
