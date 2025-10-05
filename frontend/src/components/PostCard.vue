<template>
  <div class="post-card" :style="{ backgroundColor: color }">
    <div class="outfit-container">
      <OutfitViewer :outfit="post.outfit"/>
    </div>

    <h3 class="caption">{{ post.user.username }} : {{ post.caption || '...' }}</h3>
    <PostCardControls :post="post" />
  </div>
</template>

<script setup lang="ts">
import OutfitViewer from './OutfitViewer.vue';
import PostCardControls from './PostCardControls.vue';
import type { PostType } from '../types';
defineProps<{
  post: PostType
}>();

const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
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
  display:flex;
  justify-content:center;
}

.caption {
  margin: 0.5rem;
  width: 20rem;
  font-size: 0.9rem;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
