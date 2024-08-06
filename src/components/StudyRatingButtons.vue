<script lang="ts" setup>
import { useStore } from '@/data';
import ButtonButton from './ButtonButton.vue';
import { Rating } from 'ts-fsrs';

const store = useStore()

function rateHard() {
    store.rateCard(Rating.Hard)
}
function rateGood() {
    store.rateCard(Rating.Good)
}
function rateEasy() {
    store.rateCard(Rating.Easy)
}

</script>
<template>
    <ButtonButton
        action="hard"
        @click="rateHard"
    >
        Hard
    </ButtonButton>
    <ButtonButton
        action="good"
        @click="rateGood"
    >
        Good
    </ButtonButton>
    <ButtonButton
        action="easy"
        @click="rateEasy"
    >
        Easy
    </ButtonButton>
</template>

<style lang="scss"></style>