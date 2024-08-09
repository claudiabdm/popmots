<script lang="ts" setup>
import CopyRight from './CopyRight.vue';

withDefaults(defineProps<{
    withCopyRight?: boolean
}>(), {
    withCopyRight: true
})
</script>
<template>
    <section class="section">
        <slot />
        <CopyRight v-if="withCopyRight" />
    </section>
</template>
<style lang="scss">
.section {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    min-height: 100%;
    padding: 0 var(--space-m);
}
</style>