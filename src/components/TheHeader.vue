<script setup lang="ts">
import TheNavbar from './TheNavbar.vue';
</script>

<template>
    <header class="header">
        <h1 class="header__title">Popmots</h1>
        <TheNavbar />
    </header>
</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.header {
    display: none;

    @media screen and (min-width: $screen-s) {
        display: flex;
        flex-direction: column;
        font-size: var(--font-l);
        border: var(--border);
        padding: var(--space-m);

        &__title {
            color: var(--primary);
            padding: 0 var(--space-xs);
        }
    }
}
</style>