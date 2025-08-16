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
  flex-grow: 1;
  justify-content: space-around;
  background: teal;
  border-bottom: 5px solid black;
  padding: 0.5rem 0;
  top: 0;
  width: 100%;
  left: 0;
  position: fixed;
}

.navbar a {
  text-decoration: none;
  color: white;
  font-weight: 900;
}

.navbar a:hover {
  background-color: black;
}
</style>
