<script lang="ts" setup>
import ViewHeader from '@/components/ViewHeader.vue';
import ViewSection from '@/components/ViewSection.vue';
import { useStore } from '@/data';


const { totalCards } = useStore();

// TODO: Add settings for:
// - new cards per day

</script>
<template>
  <ViewSection class="settings">
    <ViewHeader with-back-btn>
      <template #title>Settings</template>
    </ViewHeader>

    <form class="settings__form">
      <div class="settings__form-group">
        <label
          class="settings__form-label"
          for="new-cards-per-day"
        >New cards per
          day</label>
        <input
          class="settings__form-input"
          id="new-cards-per-day"
          type="number"
          name="new-cards-per-day"
          min="10"
          :max="totalCards.length"
        />
      </div>
    </form>
  </ViewSection>
</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.settings {

  &__form {
    width: clamp($min-width, 100%, $max-width);
    margin: 0 auto;
  }

  &__form-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xs);
  }

  &__form-label {
    color: var(--secondary);
    font-size: var(--font-0);
    font-weight: 700;
  }

  &__form-input {
    border: var(--border);
    border-radius: var(--border-radius);
    padding: var(--space-2xs) var(--space-xs);
    width: 100%;
    font-weight: 700;
    color: var(--secondary-darker);

    &:focus,
    &:focus-visible,
    &:focus-within {
      // outline: 2px solid var(--primary-light);
      outline: 0;
      border-color: var(--primary-light);
    }
  }
}
</style>
