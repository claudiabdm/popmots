<script lang="ts" setup>
import StudyCardFront from './StudyCardFront.vue';
import StudyCardBack from './StudyCardBack.vue';
import type { Card } from '@/types';

interface Props {
    card: Card,
    isFlipped?: boolean
}

defineProps<Props>();

</script>
<template>
    <div class="study-card-wrapper">
        <div
            :class="['study-card-container', { 'study-card-container--flipped': isFlipped }]">
            <StudyCardFront :name="card.name" />
            <StudyCardBack
                :name="card.name"
                :entries="card.entries"
            />
        </div>
    </div>
</template>


<style lang="scss">
@use '../assets/styles/_variables' as *;

.study-card-wrapper {
    position: relative;
    perspective: 1000px;
}

.study-card-container {
    display: flex;
    justify-content: center;
    height: 100%;
    transition: transform 0.25s;
    transform-style: preserve-3d;

    &--flipped {
        transform: rotateY(180deg);
    }
}
</style>