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
  height: 150px;
  width: 200px;
  background-color: teal;
  display: block;
}
</style>
