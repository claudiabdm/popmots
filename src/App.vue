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
  font-size: var(--font-0);
  font-family: var(--font-family);
}

.app {
  display: flex;
  overflow: hidden;
}

.main {
  width: 100%;
  height: calc(100vh - var(--header-height) - var(--footer-height) + 1px);
  padding: var(--space-s-m);
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (min-width: $screen-s) {
    height: 100vh;
  }
}
</style>
