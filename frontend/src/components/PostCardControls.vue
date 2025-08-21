<template>
  <div class="post-controls">
    <button><font-awesome-icon icon="fa-solid fa-thumbs-up" /></button>
    <button><font-awesome-icon icon="fa-solid fa-thumbs-down" /></button>
    <button><font-awesome-icon icon="fa-solid fa-comment" /></button>
    <button><font-awesome-icon icon="fa-solid fa-thumbtack" /></button>
    <button><font-awesome-icon icon="fa-solid fa-shirt" /></button>
  </div>
</template>

<script setup lang="ts">
import { type PostType } from "../types.ts"
defineProps<{
  post: PostType
}>()
</script>

<style scoped>
.post-controls {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.4rem;
}
</style>
