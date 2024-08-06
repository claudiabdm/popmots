<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
import { useStore } from './data';

const store = useStore();
store.initStore()
</script>

<template>
  <div class="app">
    <TheHeader />
    <main class="main">
      <div
        v-if="store.isLoading.value"
        class="loader"
      >
        Popmots
      </div>
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
  padding: var(--space-s-m) 0 calc(var(--footer-height) * 2 + var(--space-s-m));
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (min-width: $screen-s) {
    padding-bottom: var(--footer-height);
  }

}


.loader {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary);
  background-color: #fff;
  font-size: var(--font-5);
  font-weight: 700;
  pointer-events: none;
  user-select: none;
  z-index: 9999;
}
</style>
