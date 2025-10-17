<template>
  <div class="post-card" :style="{ backgroundColor: color }">

    <div class="outfit-container">
      <OutfitViewer v-if="outfit" :outfit="outfit" />
      <div v-else class="loading">Loading outfit...</div>
    </div>

    <div class="post-footer" v-if="user">
      <RouterLink :to="`/profile/${user.username}`" class="user-link">
        <img v-if="user.avatar" class="avatar" :src="user.avatar" :alt="user.username" />
      </RouterLink>
      <div class="username">{{ user.username }} :</div>
      <div class="caption">{{ post.text }}</div>
    </div>


    <div class="post-info">
      <span class="date">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
      •
      <span class="likes">{{ post.likes + (likedByUser ? 1 : 0) }} likes</span>
    </div>

    <PostCardControls :postId="post._id" @liked="likedByUser = true" @unliked="likedByUser = false" />
  </div>
</template>

<script setup lang="ts">
import OutfitViewer from "./OutfitViewer.vue";
import PostCardControls from "./PostCardControls.vue";
import type { PostType, OutfitType, UserType } from "@/types";
import { ref, computed, onMounted } from "vue";
import { fetchOutfit } from "@/api/postApi.ts";

const { post } = defineProps<{
  post: PostType
}>();

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

.post-footer {
  display: flex;
  align-items: center;
  margin: 0.6rem 0rem 0.6rem 0rem;
}

.post-footer * {
  margin-right: 0.5rem;
}

.avatar {
  width: 3em;
  height: 3em;
}
</style>
