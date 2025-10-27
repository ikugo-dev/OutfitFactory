<template>
  <div class="profile-with-text">
    <RouterLink :to="`/profile/${user.username}`" class="user-link">
      <img v-if="user.avatar" class="avatar" :src="user.avatar" :alt="user.username" />
      <div class="username">{{ user.username }}</div>
    </RouterLink>
    <div v-if="text.length" class="caption">
      <span class="caption-text">:&nbsp;{{ text }}</span>
      <!-- optional slot for anything else (buttons, icons, etc.) -->
      <slot />
    </div>
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
  flex-shrink: 0;
}

.profile-with-text {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0.6rem 0rem 0.6rem 0rem;
}

.avatar {
  margin-right: 0.4rem;
  width: v-bind(avatarSize+"em");
  height: v-bind(avatarSize+"em");
}

.caption {
  white-space: nowrap;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.caption-text {
  white-space: normal;
}
</style>
