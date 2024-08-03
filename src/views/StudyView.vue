<script setup lang="ts">
import ButtonButton from '@/components/ButtonButton.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ViewSection from '@/components/ViewSection.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import StudyCard from '@/components/StudyCard.vue';
import { ref } from 'vue';
import { useStore } from '@/data';

const isFlipped = ref(false);

function flipCard() {
  isFlipped.value = !isFlipped.value
}

const { currentCard } = useStore()

</script>

<template>
  <ViewSection class="study">
    <ViewHeader
      with-back-btn
      class="study__header"
    >
      <template #title><span class="sr-only">Study</span></template>
      <ProgressBar class="study__progress" />
    </ViewHeader>

    <StudyCard
      v-if="currentCard"
      :card="currentCard"
      :is-flipped="isFlipped"
    />

    <section class="study__buttons">
      <ButtonButton
        v-if="!isFlipped"
        icon-name="eye"
        @click="flipCard"
      >
        Show Answer
      </ButtonButton>

      <template v-else>
        <ButtonButton action="hard">
          Hard
        </ButtonButton>
        <ButtonButton action="good">
          Good
        </ButtonButton>
        <ButtonButton action="easy">
          Easy
        </ButtonButton>
      </template>
    </section>
  </ViewSection>
</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.study {
  &__buttons {
    width: 100%;
    width: clamp($min-width, 100%, $max-width);
    margin: auto;
    display: flex;
    gap: var(--space-xs);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>