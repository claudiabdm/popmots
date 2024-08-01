<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
</script>

<template>
  <div class="app">
    <TheHeader />
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="scss">
@use './assets/styles/_variables' as *;

body {
  font-size: var(--font-base);
  font-family: var(--font-family);
}

.app {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main {
  width: 100%;
  padding: var(--space-s-m);
  overflow: auto;
}
</style>
