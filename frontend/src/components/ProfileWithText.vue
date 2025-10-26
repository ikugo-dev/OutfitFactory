<template>
  <div class="profile-with-text">
    <RouterLink :to="`/profile/${user.username}`" class="user-link">
      <img v-if="user.avatar" class="avatar" :src="user.avatar" :alt="user.username" />
      <div class="username">{{ user.username }}</div>
    </RouterLink>
    <div v-if="text.length != 0" class="caption">: {{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import type { UserType } from '@/types';

defineProps<{
  user: UserType,
  avatarSize: number,
  text: string
}>();
</script>

<style scoped>
.user-link {
  display: flex;
  align-items: center;
  color: black;
}

.profile-with-text {
  display: flex;
  align-items: center;
  margin: 0.6rem 0rem 0.6rem 0rem;
}

.avatar {
  margin-right: 0.4rem;
  width: v-bind(avatarSize+"em");
  height: v-bind(avatarSize+"em");
}
</style>
