<script setup lang="ts">
import ButtonLink from '@/components/ButtonLink.vue';

interface Props {
    srOnlyTitle?: boolean,
    withBackBtn?: boolean,
}

withDefaults(defineProps<Props>(), {
    srOnlyTitle: false,
    withBackBtn: false,
});
</script>

<template>
    <div :class="[
        'view-header',
        { 'view-header--with-back-btn': withBackBtn }]
        ">
        <ButtonLink
            v-if="withBackBtn"
            icon-name="back"
            action="secondary"
            class="view-header__back-btn"
            to="/"
        />
        <h2 :class="['view-header__title', { 'sr-only': srOnlyTitle }]">
            <slot name="title"></slot>
        </h2>
        <div
            class="view-header__content"
            v-if="$slots.default"
        >
            <slot />
        </div>
    </div>
</template>
<style lang="scss">
$width-back-btn: 48px;

.view-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-xs);
    padding-top: var(--space-s);
    height: calc($width-back-btn + var(--space-s));

    &--with-back-btn {
        .view-header__content {
            margin-left: calc($width-back-btn + var(--space-xs));
        }

        .view-header__title {
            margin: 0 auto;
        }
    }

    &__title {
        flex-shrink: 0;
        color: var(--primary);
        font-size: var(--font-3);
    }

    &__back-btn {
        position: absolute;
        left: 0;
        width: $width-back-btn;
        height: $width-back-btn - 4px;
        margin: 0;
        stroke: #fff;
        stroke-width: 2px;

        .button {
            padding: var(--space-2xs);
        }
    }

    &__content {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }
}
</style>