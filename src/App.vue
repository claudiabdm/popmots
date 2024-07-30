<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/study">Study</RouterLink>
      <RouterLink to="/Settings">Settings</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style></style>
