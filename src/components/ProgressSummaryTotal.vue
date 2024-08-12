<script lang="ts" setup>
import { useStore } from '@/data';
import { computed } from 'vue';
import ProgressSummaryBase from './ProgressSummaryBase.vue';
import { State } from 'ts-fsrs';

const { learningUserCards, newUserCards, reviewUserCards, relearningUserCards } = useStore();

const summary = computed(() => [
  { text: 'left' as const, type: State.New as const, valueNow: newUserCards.value.length },
  { text: 'learning' as const, type: State.Learning as const, valueNow: learningUserCards.value.length },
  { text: 'reviewed' as const, type: State.Review as const, valueNow: reviewUserCards.value.length },
  { text: 'relearning' as const, type: State.Relearning as const, valueNow: relearningUserCards.value.length },
])

</script>
<template>
  <ProgressSummaryBase :summary="summary" />
</template>


<style lang="scss">
.progress-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  align-content: center;
  justify-items: center;
  border: var(--border);
  border-radius: var(--border-radius);
  width: 100%;
  font-weight: 700;

  &__total {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3xs);
    width: 100%;
    padding: var(--space-xs) var(--space-2xs);
    color: var(--secondary);
    font-size: var(--font-1);

    &:not(:first-child) {
      border-left: var(--border);
    }
  }

  &__title {
    font-size: var(--font--2);
    text-transform: uppercase;

    &--reviewing {
      color: var(--green-dark);
    }

    &--learning {
      color: var(--red-dark);
    }

    &--new {
      color: var(--yellow-dark);
    }

    &--relearning {
      color: var(--purple-dark);
    }
  }

}
</style>