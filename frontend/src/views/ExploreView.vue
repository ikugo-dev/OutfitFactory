<template>
  <div class="explore-page">
    <h2>Explore</h2>

    <select v-model="selectedAlgo" @change="getMorePosts()">
      <option value="trending">Trending</option>
      <option value="newest">Newest</option>
      <option value="forYou">For You</option>
    </select>

    <PostGrid :posts="posts" />
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import PostGrid from '../components/PostGrid.vue'
import { getFakePosts } from '@/fakeData';
import type { PostType } from '@/types';

const selectedAlgo = ref('trending')

const posts = shallowRef<PostType[]>([])

const getMorePosts = () => posts.value = getFakePosts(5);
posts.value = getFakePosts(4);

</script>
