<template>
    <section class="section">
        <slot />
    </section>
</template>
<style lang="scss">
.section {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
    min-height: 100%;
}
</style>