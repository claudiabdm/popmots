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
  height: 100vh;
  padding: var(--space-s-m) var(--space-s-m) calc(var(--footer-height) * 2 + var(--space-s-m));
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (min-width: $screen-s) {
    padding-bottom: var(--footer-height);
  }
}
</style>
