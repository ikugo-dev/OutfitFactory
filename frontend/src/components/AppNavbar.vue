<template>
  <nav class="navbar">
    <router-link to="/explore">Explore</router-link>
    <router-link to="/profile">Profile</router-link>
    <!-- <a href="/create.html">Create</a> > -->
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-around;
  background: white;
  border-top: 1px solid #ccc;
  padding: 0.5rem 0;
}
.navbar a {
  text-decoration: none;
}
</style>
