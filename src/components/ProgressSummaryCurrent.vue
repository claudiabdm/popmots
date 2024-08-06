<script lang="ts" setup>
import { useStore } from '@/data';
import { State } from 'ts-fsrs';
import { computed } from 'vue';
import ProgressSummaryBase from './ProgressSummaryBase.vue';

const { learningCards, newCards, reviewCards, relearningCards } = useStore();

const summary = computed(() => [
  { text: 'New', type: State.New as const, valueNow: newCards.value.length },
  { text: 'Learning', type: State.Learning as const, valueNow: learningCards.value.length },
  { text: 'Reviewing', type: State.Review as const, valueNow: reviewCards.value.length },
  { text: 'Relearning', type: State.Relearning as const, valueNow: relearningCards.value.length },
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