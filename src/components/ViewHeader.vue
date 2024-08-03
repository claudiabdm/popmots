<script setup lang="ts">
import ButtonLink from '@/components/ButtonLink.vue';

interface Props {
    withBackBtn?: boolean
}

defineProps<Props>();
</script>

<template>
    <div class="view-header">
        <ButtonLink
            v-if="withBackBtn"
            icon-name="back"
            action="secondary"
            class="view-header__back-btn"
            to="/"
        />
        <h2 class="view-header__title">
            <slot name="title"></slot>
        </h2>
        <slot />
    </div>
</template>
<style lang="scss">
.view-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);

    &__title {
        color: var(--primary);
        font-size: var(--font-3);
    }

    &__back-btn {
        width: auto;
        margin: 0;
        stroke: #fff;
        stroke-width: 2px;
    }
}
</style>