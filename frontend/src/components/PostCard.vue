<template>
  <div class="post-card" :style="{ backgroundColor: color }">
    <canvas ref="canvas" class="canvas"></canvas>
    <h3>{{ post.user.username }} : Lorem ipsum!{{ post.text }}</h3>
    <PostCardControls :post=post />
  </div>
</template>

<script setup lang="ts">
import PostCardControls from './PostCardControls.vue'
import { onMounted, ref } from "vue";
import { type PostType } from "../types.ts"
defineProps<{
  post: PostType
}>()

const color = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");

const canvas = ref<HTMLCanvasElement | null>(null);
onMounted(() => {
  if (canvas.value) {
    canvas.value.width = 300;  // internal resolution
    canvas.value.height = 400; // 4:3 aspect ratio
  }
});
</script>

<style scoped>
.post-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  aspect-ratio: 3 / 4;
  padding: 0.5rem;
  padding-bottom: 1rem;
  border: 0.2rem solid black;
  justify-content: center;
}

.canvas {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  background-color: var(--background);
  border: 0.2rem solid black;
}
</style>
