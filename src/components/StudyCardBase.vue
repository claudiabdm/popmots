<script lang="ts" setup>
</script>
<template>
    <article class="study-card">
        <slot />
    </article>
</template>


<style lang="scss">
@use '../assets/styles/_variables' as *;

.study-card {
    position: absolute;
    width: clamp($min-width, 100%, $screen-s);
    height: 100%;
    padding: var(--space-xs);
    border: var(--border);
    border-radius: var(--border-radius);
    background-color: #fff;
    backface-visibility: hidden;
    overflow: auto;
}
</style>