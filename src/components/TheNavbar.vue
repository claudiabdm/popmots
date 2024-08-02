<script lang="ts" setup>
import { useRouter } from 'vue-router';

const links = useRouter().getRoutes();
</script>

<template>
    <nav class="nav">
        <RouterLink
            v-for="link in links"
            exact-active-class="nav__link--active"
            :key="link.name"
            :to="link.path"
            class="nav__link"
        >{{ link.name }}</RouterLink>
    </nav>
</template>

<style lang="scss">
.nav {
    display: flex;
    flex-direction: column;
    gap: var(--space-2xs);
    margin-top: var(--space-m);

    &__link {
        border: var(--border);
        border-color: rgba(0, 0, 0, 0);
        border-radius: var(--border-radius);
        padding: var(--space-2xs) var(--space-xs);
        color: var(--secondary);
        font-size: var(--font-base);
        font-weight: 700;
        text-transform: uppercase;
        text-decoration: none;

        &:visited {
            color: var(--secondary);
        }

        &:hover:not(.nav__link--active) {
            background-color: var(--secondary-lighter);
        }

        &--active,
        &--active:visited {
            border-color: var(--primary-light);
            color: var(--primary);
            background-color: var(--primary-lighter);
        }
    }
}
</style>