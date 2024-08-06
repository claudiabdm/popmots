<script lang="ts" setup>
import type { State } from 'ts-fsrs';

defineProps<{
  summary: {
    valueNow: number;
    type: State,
    text: string
  }[];
}>();


</script>
<template>
  <div class="progress-summary">
    <article
      v-for="total in summary"
      :key="total.type"
      class="progress-summary__total"
    >
      <span>
        {{ total.valueNow }}
      </span>
      <h4
        :class="['progress-summary__title', `progress-summary__title--${total.type}`]"
      >
        {{ total.text }}
      </h4>
    </article>
  </div>
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

    &--0 {
      color: var(--yellow-dark);
    }

    &--1 {
      color: var(--red-dark);
    }

    &--2 {
      color: var(--green-dark);
    }

    &--3 {
      color: var(--purple-dark);
    }
  }

}
</style>