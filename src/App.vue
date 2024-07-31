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
  display: grid;
  grid-template-columns: 1fr;
  min-height: 100vh;

  @media screen and (min-width: $screen-s) {
    grid-template-columns: 0.25fr 1fr;
  }
}

.main {
  width: 100%;
  padding: var(--space-s-m);
}
</style>
