<template>
    <h3 class="study-card-title">
        <slot />
    </h3>
</template>

<style lang="scss">
.study-card-title {
    color: var(--primary);
    font-size: var(--font-4);
    text-transform: capitalize;
}
</style>