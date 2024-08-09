<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    valueNow?: number
    valueMax?: number
}>(), {
    valueNow: 0,
    valueMax: 100
})

const complete = computed(() => props.valueNow === props.valueMax);

const barText = computed(() => {
    if (props.valueNow === props.valueMax) {
        return `Très bien! Come back later for more :)`;
    }
    return `${props.valueNow} / ${props.valueMax}`
})
</script>

<template>
    <div
        :class="['progress-bar', { 'progress-bar--complete': complete }]"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin="0"
        :aria-valuemax="valueMax"
        :aria-valuenow="valueNow"
        :style="{ '--progress-session': valueNow / valueMax * 100 + '%' }"
    >
        <span class="progress-bar__text">
            {{ barText }}
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

    &--complete.progress-bar {
        font-size: var(--font--1);

        border-color: var(--green-dark);

        &::before {
            width: 100%;
            background-color: var(--green);
        }

        .progress-bar__text {
            color: #fff;
        }
    }

    &__text {
        color: var(--primary-light);
        font-weight: 700;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 1;
    }
}
</style>