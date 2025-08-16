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
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}
</style>
