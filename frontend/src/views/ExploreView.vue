<template>
  <div class="explore-page">
    <h2>Following</h2>

    <PostGrid :posts="posts" />

    <InfiniteLoading @infinite="load" />
  </div>
</template>

<script setup lang="ts">
import PostGrid from "@/components/PostGrid.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

import { ref } from "vue";
import type { PostType } from "@/types";

import { fetchPosts } from "@/api.ts"

const posts = ref<PostType[]>([]);
const allPosts = ref<PostType[]>([]);
const page = ref(0);
const limit = 4;

const load = async ($state: { complete(): void, loaded(): void }) => {
  if (allPosts.value.length === 0) {
    const response = await fetchPosts();
    allPosts.value = response || [];
  }

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
</script>
