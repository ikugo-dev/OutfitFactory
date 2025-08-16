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
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
  justify-items: center;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
