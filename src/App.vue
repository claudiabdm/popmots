<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue';
import { useStore } from './data';
import LogoLoading from './components/LogoLoading.vue';

const store = useStore();
store.initStore()

useHead({
  titleTemplate: title => `${title === 'Home' ? 'PopMots' : `${title} | PopMots`}`,
})
</script>

<template>
  <div class="app">
    <TheHeader />
    <main class="main">
      <LogoLoading />
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
