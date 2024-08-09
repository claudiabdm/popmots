<script setup lang="ts">
import { useHead } from '@unhead/vue'
import ButtonButton from '@/components/ButtonButton.vue';
import ProgressBarCurrent from '@/components/ProgressBarCurrent.vue';
import ViewSection from '@/components/ViewSection.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import StudyCard from '@/components/StudyCard.vue';
import StudyRatingButtons from '@/components/StudyRatingButtons.vue';
import { ref, watch } from 'vue';
import { useStore } from '@/data';
import { useNextSessionTime } from '@/components/composables/useNextSessionTime';

useHead({
  title: 'Study'
})

const { currentCard } = useStore()
const nextSessionTime = useNextSessionTime()

const isFlipped = ref(false);

watch(currentCard, () => {
  isFlipped.value = false
})

function flipCard() {
  isFlipped.value = !isFlipped.value
}

</script>

<template>
  <ViewSection
    class="study"
    :with-copy-right="false"
  >
    <ViewHeader
      with-back-btn
      sr-only-title
    >
      <template #title>Study</template>
      <ProgressBarCurrent class="study__progress" />
    </ViewHeader>

    <div
      class="study__cards"
      v-if="currentCard"
    >
      <Transition>
        <StudyCard
          :key="currentCard?.name"
          :card="currentCard"
          :is-flipped="isFlipped"
        />
      </Transition>
    </div>

    <section class="study__buttons">
      <ButtonButton
        class="study__button"
        v-if="!isFlipped"
        :icon-name="nextSessionTime ? undefined : 'study'"
        :disabled="Boolean(nextSessionTime)"
        @click="flipCard"
      >
        <span
          v-if="nextSessionTime"
          class="study__time"
        >
          {{ nextSessionTime }}
        </span>
        <template v-else>
          Show answer
        </template>
      </ButtonButton>
      <StudyRatingButtons v-else />
    </section>
  </ViewSection>
</template>

<style lang="scss" scoped>
@use '../assets/styles/_variables' as *;


.study {
  display: grid;
  grid-template-rows: max-content 1fr var(--footer-height);
  overflow: hidden;

  &__cards {
    position: relative;

    &>* {
      position: absolute;
      inset: 0;
    }
  }

  &__buttons {
    display: flex;
    height: 50px;
    width: clamp($min-width, 100%, $max-width);
    margin: 0 auto;
    gap: var(--space-xs);
  }

  &__time {
    font-size: var(--font-0);
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

.v-enter-active,
.v-leave-active {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition:
    transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1),
    opacity 0.15s 0.15s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.v-enter-from {
  opacity: 0;
  transform: translate3d(200%, 0, 0);
}

.v-leave-to {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>