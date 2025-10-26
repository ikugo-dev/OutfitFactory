<template>
  <div class="post-controls">
    <button :class="{ liked: likedByUser }" @click="toggleLike"><font-awesome-icon
        icon="fa-solid fa-thumbs-up" /></button>
    <button @click="handleComments"><font-awesome-icon icon="fa-solid fa-comment" /></button>
    <!-- <button><font-awesome-icon icon="fa-solid fa-thumbtack" /></button> -->
    <button @click="handleDelete" v-if="isProfileOwner"><font-awesome-icon icon="fa-solid fa-trash" /></button>
  </div>
</template>

<script setup lang="ts">
import { deletePost, like, unlike } from "@/api/postInteractionsApi.ts"
import { authCheck } from "@/stores/authCheck.ts";
const { requireLogin } = authCheck();
const props = defineProps<{
  postId: string,
  isProfileOwner: boolean,
  likedByUser: boolean
}>()
const emit = defineEmits<{
  (e: "toggleLike"): void
  (e: "deletedPost"): void
  (e: "showComments"): void
}>()

const toggleLike = async () => {
  requireLogin();
  emit("toggleLike");
  props.likedByUser
    ? await unlike(props.postId)
    : await like(props.postId)
}

const handleComments = async () => {
  emit("showComments");
}

const handleDelete = async () => {
  requireLogin();
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

button.liked {
  background-color: var(--accent);
}
</style>
