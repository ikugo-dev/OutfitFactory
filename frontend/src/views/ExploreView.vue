<template>
  <div class="explore-page">
    <h2>Explore</h2>
    <h2>{{ algorithm }}</h2>

    <PostGrid :posts="posts" />

    <InfiniteLoading @infinite="load" />
  </div>
</template>

<script setup lang="ts">
import PostGrid from '../components/PostGrid.vue'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import { ref, watch } from 'vue'
import { getFakePosts } from '@/fakeData';
import type { PostType } from '@/types';

const posts = ref<PostType[]>([]);
const load = async ($state: { complete(): void, loaded(): void }) => {
  const response = getFakePosts(4)
  if (response.length === 0) {
    $state.complete();
  } else {
    posts.value.push(...response);
    $state.loaded();
  }
};

import { useRoute } from "vue-router"
const route = useRoute();
const algorithm = ref('new'); // default
watch(() => route.path, (newPath) => {
  algorithm.value = newPath.split('/')[2] || 'new'
},
  { immediate: true }
);

watch(() => route.path, () => {
  posts.value.splice(0)
})
</script>
