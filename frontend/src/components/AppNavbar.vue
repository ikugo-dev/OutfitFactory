<template>
  <nav class="navbar">
    <router-link to="/explore" :class="{ 'active-link': route.path === '/explore' }">New</router-link>
    <router-link to="/following" :class="{ 'active-link': route.path === '/following' }">Following</router-link>
    <router-link to="/create" :class="{ 'active-link': route.path === '/create' }">Create</router-link>
    <router-link to="/profile" :class="{ 'active-link': route.path === '/profile' }">Profile</router-link>
    <router-link to="/garments" :class="{ 'active-link': route.path === '/garments' }">
      Garment <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </router-link>

    <button @click="isSearchOpen = true">User <font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>

    <button class="logout-button" v-if="currentUserId" @click="logout()">Logout</button>
    <button class="login-button" v-else @click="login()">Login</button>
  </nav>
  <SearchBar v-if="isSearchOpen" @close="isSearchOpen = false" />
</template>


<script setup lang="ts">
import { useRoute } from "vue-router"
import { clearUser } from "@/stores/userStore";
import { currentUserId } from "@/stores/userStore";
import router from "@/router";
import { ref } from "vue";
import SearchBar from "./SearchBar.vue";

const route = useRoute();
const isSearchOpen = ref(false);

function logout() {
  clearUser();
  router.push('/login')
}
function login() {
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  z-index: 100;
  display: flex;
  flex-grow: 1;
  justify-content: space-around;
  background: var(--background-focus);
  border-bottom: 0.2rem solid black;
  padding: 1rem 0;
  margin-bottom: 5rem;
  top: 0;
  width: 100%;
  left: 0;
  position: fixed;
}

.navbar a {
  text-decoration: none;
  color: var(--text);
  font-weight: 900;
}

.navbar a.active-link {
  color: var(--accent);
}

button {
  position: relative;
  top: -0.2em;
}

.login-button {
  background-color: var(--accent);
}
</style>
