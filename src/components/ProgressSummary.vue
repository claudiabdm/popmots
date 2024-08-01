<script lang="ts" setup>
interface Props {
  summary: Array<
    {
      valueNow: number
      valueMax: number
      type: 'reviewed' | 'learning' | 'new'
    }
  >

}
defineProps<Props>();

</script>
<template>
  <div class="progress-summary">
    <article
      v-for="total in summary"
      :key="total.type"
      class="progress-summary__total"
    >
      <span>
        {{ `${total.valueNow} / ${total.valueMax}` }}
      </span>
      <h4
        :class="['progress-summary__title', `progress-summary__title--${total.type}`]"
      >
        {{ total.type }}
      </h4>
    </article>
  </div>
</template>


<style lang="scss">
.progress-summary {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  margin-top: var(--space-xs);
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
    padding: var(--space-xs);
    color: var(--secondary);
    font-size: var(--font-2xl);

    &:first-child {
      border-right: var(--border);
    }

    &:last-child {
      border-left: var(--border);
    }
  }

  &__title {
    font-size: var(--font-xs);
    text-transform: uppercase;

    &--reviewed {
      color: var(--green-dark);
    }

    &--learning {
      color: var(--red-dark);
    }

    &--new {
      color: var(--yellow-dark);
    }
  }

}
</style>