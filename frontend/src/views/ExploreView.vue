<template>
  <div class="explore-page">
    <h2>Explore</h2>
    <h2>{{ algorithm }}</h2>

    <PostGrid :posts="posts" />

    <InfiniteLoading @infinite="load" />
  </div>
</template>

<script setup lang="ts">
import PostGrid from "@/components/PostGrid.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { PostType } from "@/types";

import { fetchPosts } from "@/api.ts"

const posts = ref<PostType[]>([]);
const allPosts = ref<PostType[]>([]); // store everything fetched from backend
const page = ref(0);
const limit = 8; // how many posts to load per scroll

const load = async ($state: { complete(): void, loaded(): void }) => {
  if (allPosts.value.length === 0) {
    // fetch all posts from backend once
    const response = await fetchPosts();
    allPosts.value = response || [];
  }

  // Paginate manually
  const start = page.value * limit;
  const nextChunk = allPosts.value.slice(start, start + limit);

  if (nextChunk.length === 0) {
    $state.complete();
    return;
  }

  posts.value.push(...nextChunk);
  page.value++;
  $state.loaded();
};

// Handle route/algorithm changes (reset feed)
const route = useRoute();
const algorithm = ref('new');
watch(
  () => route.path,
  (newPath) => {
    algorithm.value = newPath.split('/')[2] || 'new';
    posts.value = [];
    allPosts.value = [];
    page.value = 0;
  },
  { immediate: true }
);
</script>
