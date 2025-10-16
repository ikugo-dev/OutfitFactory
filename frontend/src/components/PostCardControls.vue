<template>
  <div class="post-controls">
    <button @click="handleLike"><font-awesome-icon icon="fa-solid fa-thumbs-up" /></button>
    <button @click="handleUnlike"><font-awesome-icon icon="fa-solid fa-thumbs-down" /></button>
    <button><font-awesome-icon icon="fa-solid fa-comment" /></button>
    <button><font-awesome-icon icon="fa-solid fa-thumbtack" /></button>
    <button><font-awesome-icon icon="fa-solid fa-shirt" /></button>
  </div>
</template>

<script setup lang="ts">
import { like, unlike } from "@/api/postInteractionsApi.ts"
const props = defineProps<{
  postId: string
}>()
const emit = defineEmits<{
  (e: "liked"): void
  (e: "unliked"): void
}>()

const handleLike = async () => {
  await like(props.postId)
  emit("liked")
}

const handleUnlike = async () => {
  await unlike(props.postId)
  emit("unliked")
}
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
