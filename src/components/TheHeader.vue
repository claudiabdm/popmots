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
        flex-basis: 25%;
        display: flex;
        flex-direction: column;
        border-right: var(--border);
        padding: var(--space-m);

        &__title {
            font-size: var(--font-2);
            color: var(--primary);
            padding: 0 var(--space-xs);
        }
    }
}
</style>