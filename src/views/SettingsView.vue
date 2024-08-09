<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import ButtonButton from '@/components/ButtonButton.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ViewSection from '@/components/ViewSection.vue';
import { DEFAULT_NEW_CARDS_PER_DAY, useStore } from '@/data';
import { computed, onMounted, ref, watch } from 'vue';

useHead({
  title: 'Settings'
})


const { totalCards, settings, setNewCardsPerDay } = useStore();


const newCardsPerDayInput = ref<number>(DEFAULT_NEW_CARDS_PER_DAY);

const isSaving = ref<boolean>();

onMounted(() => {
  newCardsPerDayInput.value = settings.value.newCardsPerDay
})

watch(() => settings.value.newCardsPerDay, (value) => {
  newCardsPerDayInput.value = value
})

const actionState = computed(() => isSaving.value == null
  ?
  'primary' : isSaving.value === false
    ?
    'easy' : 'primary')

const saveState = computed(() => isSaving.value == null
  ?
  'Save' : isSaving.value == true
    ?
    'Saving...' : 'Saved!')


function setNewCardsPerDayInput(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    newCardsPerDayInput.value = Number(e.target.value)
  }
}

function submitForm(e: Event) {
  if (e.target instanceof HTMLFormElement) {
    isSaving.value = true
    newCardsPerDayInput.value = Number(newCardsPerDayInput.value)

    setNewCardsPerDay(newCardsPerDayInput.value)

    setTimeout(() => isSaving.value = false, 500)
    setTimeout(() => isSaving.value = undefined, 2000)
  }
}


</script>
<template>
  <ViewSection class="settings">
    <ViewHeader with-back-btn>
      <template #title>Settings</template>
    </ViewHeader>

    <form
      class="settings__form"
      @submit.prevent="submitForm"
    >
      <div class="settings__form-group">
        <label
          class="settings__form-label"
          for="new-cards-per-day"
        >Number of new
          cards per
          day</label>
        <input
          class="settings__form-input"
          id="new-cards-per-day"
          type="number"
          name="new-cards-per-day"
          min="5"
          :max="totalCards.length"
          :value="newCardsPerDayInput"
          @input="setNewCardsPerDayInput"
        />
      </div>
      <ButtonButton
        class="settings__form-submit"
        type="submit"
        :action="actionState"
        :disabled="isSaving"
      >
        {{ saveState }}
      </ButtonButton>
    </form>
  </ViewSection>
</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.settings {

  &__form {
    display: flex;
    flex-direction: column;
    gap: var(--space-l);
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
      outline: 0;
      border-color: var(--primary-light);
    }

    &:invalid {
      border-color: var(--red);
    }
  }
}
</style>
