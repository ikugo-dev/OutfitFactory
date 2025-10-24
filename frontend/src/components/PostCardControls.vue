<template>
  <div class="post-controls">
    <button @click="handleLike"><font-awesome-icon icon="fa-solid fa-thumbs-up" /></button>
    <button @click="handleUnlike"><font-awesome-icon icon="fa-solid fa-thumbs-down" /></button>
    <button @click="handleComments"><font-awesome-icon icon="fa-solid fa-comment" /></button>
    <!-- <button><font-awesome-icon icon="fa-solid fa-thumbtack" /></button> -->
    <!-- <button><font-awesome-icon icon="fa-solid fa-shirt" /></button> -->
    <button @click="handleDelete" v-if="isProfileOwner"><font-awesome-icon icon="fa-solid fa-trash" /></button>
  </div>
</template>

<script setup lang="ts">
import { deletePost, like, unlike } from "@/api/postInteractionsApi.ts"
const props = defineProps<{
  postId: string,
  isProfileOwner: boolean
}>()
const emit = defineEmits<{
  (e: "liked"): void
  (e: "unliked"): void
  (e: "deletedPost"): void
  (e: "showComments"): void
}>()

const handleLike = async () => {
  await like(props.postId);
  emit("liked");
}

const handleUnlike = async () => {
  await unlike(props.postId);
  emit("unliked");
}

const handleComments = async () => {
  emit("showComments");
}

const handleDelete = async () => {
  if (confirm("Are you sure you want to delete that post?")) {
    await deletePost(props.postId);
    emit("deletedPost")
  }
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
