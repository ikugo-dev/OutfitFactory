<template>
  <div class="grid">
    <PostCard v-for="p in posts" :key="p.id" :post="p" />
  </div>
</template>

<script setup lang="ts">
import type { PostType } from '@/types';
import PostCard from './PostCard.vue'
defineProps<{
  posts: PostType[]
}>()
</script>

<style scoped>
.grid {
  column-count: 2;
  column-gap: 1rem;
  max-width: 1280px;
  margin: 0 auto;
}

.grid > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}

@media (max-width: 540px) {
  .grid {
    column-count: 1;
  }
}
</style>
