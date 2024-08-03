<script lang="ts" setup>
import StudyCardFront from './StudyCardFront.vue';
import StudyCardBack from './StudyCardBack.vue';

interface Props {
    name: string,
    isFlipped?: boolean
}

defineProps<Props>();

</script>
<template>
    <div class="study-card-wrapper">
        <div
            :class="['study-card-container', { 'study-card-container--flipped': isFlipped }]">
            <StudyCardFront name="Bonjour" />
            <StudyCardBack name="Bonjour" />
        </div>
    </div>
</template>


<style lang="scss">
@use '../assets/styles/_variables' as *;

.study-card-wrapper {
    position: relative;
    flex-grow: 1;
    perspective: 1000px;
}

.study-card-container {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    transition: transform 0.25s;
    transform-style: preserve-3d;

    &--flipped {
        transform: rotateY(180deg);
    }
}
</style>