<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="search-bar">
      <div class="input-fields">
        <input type="text" v-model="input" placeholder="Search for users..." />
        <button class="close" @click="$emit('close')">✕</button>
      </div>
      <div class="item" v-for="user in filteredList()" :key="user._id">
        <ProfileWithText @click="$emit('close')" :user="user" :avatarSize="2" :text="''" />
      </div>
      <div class="item error" v-if="input && !filteredList().length">
        <p>No results found!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchAllUsers } from "@/api/userApi";
import { type UserType } from "@/types";
import { onMounted, ref } from "vue";
import ProfileWithText from "./ProfileWithText.vue";
let input = ref("");

const users = ref<UserType[]>([]);

onMounted(async () => {
  users.value = await fetchAllUsers();
  console.log(users.value);
});
function filteredList() {
  return users.value.filter((user) =>
    user.username.toLowerCase().includes(input.value.toLowerCase())
  );
}
</script>


<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.search-bar {
  background: var(--background);
  padding: 2rem;
  border: 0.2rem solid black;
  width: 100%;
  max-width: 500px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-fields {
  width: 100%;
  display: flex;
}

.input-fields>input {
  flex-grow: 1;
}

.error {
  text-align: center;
  color: red;
}
</style>
