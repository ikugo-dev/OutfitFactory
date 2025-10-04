<!-- src/App.vue -->
<template>
  <main style="padding:24px;">
    <OutfitEditor
        :readonly="false"
      />
  </main>
</template>

<script setup lang="ts">
import OutfitEditor from '../components/OutfitEditor.vue';
import type { PostType, UserType } from './types';

const demoUser: UserType = { id: 1, username: 'alex', email: 'a@b.com' };
const demoPost: PostType = {
  id: 1,
  user: demoUser,
  outfit: undefined,
  likes: 0,
  comments: [],
  visible: true
};
</script>
