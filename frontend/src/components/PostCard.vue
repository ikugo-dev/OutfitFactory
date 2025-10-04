<template>
  <div class="post-card" :style="{ backgroundColor: color }">
    <div class="outfit-container">
      <OutfitEditor />
    </div>

    <h3>{{ post.user.username }} : {{ post.text || '...' }}</h3>
    <PostCardControls :post="post" />
  </div>
</template>

<script setup lang="ts">
import OutfitEditor from './OutfitEditor.vue';
import PostCardControls from './PostCardControls.vue';
import { ref } from 'vue';
import type { PostType } from '../types';

defineProps<{ post: PostType }>();

const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
</script>

<style scoped>
.post-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 3/4;
  padding: 0.5rem;
  border: 0.2rem solid black;
  justify-content: center;
}
.outfit-container {
  width: 100%;
  display:flex;
  justify-content:center;
  margin-bottom: 8px;
}
</style>
