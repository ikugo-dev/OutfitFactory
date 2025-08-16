<template>
  <div class="app">
    <router-view />

    <Navbar />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/AppNavbar.vue'
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
