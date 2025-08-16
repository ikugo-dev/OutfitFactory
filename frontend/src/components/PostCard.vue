<template>
  <div class="post-card" :style="{ backgroundColor: color }">
    <h1>{{ post.user.username }} : {{ post.id }}</h1>
  </div>
</template>

<script setup lang="ts">
import { type PostType } from "../types.ts"
defineProps<{
  post: PostType
}>()

const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
</script>

<style scoped>
.post-card {
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: teal;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
