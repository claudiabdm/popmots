<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
import TheLoadingScreen from './components/TheLoadingScreen.vue';
import { useStore } from './data';

useHead({
  titleTemplate: title => `${title == null || title === 'Home' ? 'PopMots' : `${title} | PopMots`}`,
})

const store = useStore();
store.initStore();
</script>

<template>
  <TheLoadingScreen :isLoading="store.isLoading.value" />
  <div
    class="app"
    v-if="!store.isLoading.value"
  >
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
  padding: 0 0 calc(var(--footer-height) * 2 + var(--space-s-m));
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (min-width: $screen-s) {
    padding-bottom: var(--footer-height);
  }

}
</style>
