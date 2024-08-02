<script lang="ts" setup>

withDefaults(defineProps<{
    valueNow?: number
    valueMin?: number
    valueMax?: number
}>(), {
    valueNow: 0,
    valueMin: 0,
    valueMax: 100
})

</script>
<template>
    <div
        class="progress-bar"
        role="progressbar"
        :aria-valuemax="valueMax"
        :aria-valuemin="valueMin"
        :aria-valuenow="valueNow"
        aria-label="Progress"
        :style="{ '--progress-session': valueNow / valueMax * 100 + '%' }"
    >
        <span class="progress-bar__text">
            {{ valueNow }} / {{ valueMax }}
        </span>
    </div>
</template>


<style lang="scss" scoped>
.progress-bar {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 100%;
    border: var(--border);
    border-color: var(--primary-light);
    border-radius: var(--border-radius);
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        width: var(--progress-session);
        height: 100%;
        border-left: 8px;
        background-color: var(--primary);
    }

    &__text {
        color: var(--primary-light);
        font-weight: 700;
        z-index: 1;
    }
}
</style>