<template>
  <div class="explore-page">
    <h2>Explore</h2>

    <select v-model="selectedAlgo" @change="getMorePosts()">
      <option value="trending">Trending</option>
      <option value="newest">Newest</option>
      <option value="forYou">For You</option>
    </select>

    <PostGrid :posts="posts" />

    <InfiniteLoading @infinite="load" />
  </div>
</template>

<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { ref } from 'vue'
import PostGrid from '../components/PostGrid.vue'
import { getFakePosts } from '@/fakeData';
import type { PostType } from '@/types';

const posts = ref<PostType[]>([]);
posts.value = getFakePosts(2);
const load = async ($state: { complete(): void, loaded(): void }) => {
  const response = getFakePosts(4)
  if (response.length === 0) {
    $state.complete();
  } else {
    posts.value.push(...response);
    $state.loaded();
  }
};

const selectedAlgo = ref('trending')

const getMorePosts = () => posts.value = getFakePosts(5);
posts.value = getFakePosts(4);

</script>
