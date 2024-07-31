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
body {
  font-family: var(--font-family);
}

.app {
  display: grid;
  grid-template-columns: 0.25fr 1fr;
  min-height: 100vh;
}

.main {
  padding: var(--space-l);
}
</style>
