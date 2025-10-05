<template>
  <nav class="navbar">
    <router-link :to="{ path: '/explore/new' }"
      :class="{ 'active-link': route.path === '/explore/new' }">New</router-link>
    <router-link :to="{ path: '/explore/following' }"
      :class="{ 'active-link': route.path === '/explore/following' }">Following</router-link>
    <router-link to="/create" :class="{ 'active-link': route.path === '/create' }">Create</router-link>
    <router-link to="/profile" :class="{ 'active-link': route.path === '/profile' }">Profile</router-link>
    <!-- <a href="/create.html">Create</a> > -->
  </nav>
</template>


<script setup lang="ts">
import { useRoute } from "vue-router"
const route = useRoute();
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
</style>

<!-- .navbar a { -->
<!--   box-shadow: 6px 6px; -->
<!--   text-decoration: none; -->
<!--   background-color: var(--primary); -->
<!--   padding: 0.5em; -->
<!-- } -->
<!---->
<!-- .navbar a:hover { -->
<!--   box-shadow: 0px 0px; -->
<!-- } -->
