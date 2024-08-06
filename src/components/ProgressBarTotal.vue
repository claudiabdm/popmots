<script lang="ts" setup>
import { useStore } from '@/data';
import { computed } from 'vue';
import ProgressBarBase from './ProgressBarBase.vue';

const { totalCards, reviewTotalCards } = useStore();

const valueNow = computed(() => reviewTotalCards.value.length);
const valueMax = computed(() => totalCards.value.length);
</script>
<template>
    <ProgressBarBase
        :value-now="valueNow"
        :value-max="valueMax"
    />
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