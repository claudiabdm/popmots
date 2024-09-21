<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import ButtonButton from '@/components/ButtonButton.vue';
import ButtonLabelInput from '@/components/ButtonLabelInput.vue';
import ButtonLink from '@/components/ButtonLink.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import ViewSection from '@/components/ViewSection.vue';
import { DEFAULT_NEW_CARDS_PER_DAY, DEFAULT_TOTAL_CARDS_PER_DAY, useStore, type LocalStore } from '@/data';
import { computed, onMounted, ref, watch } from 'vue';
import { updateCardsPerDay } from '@/data/utils';

useHead({
  title: 'Settings'
})

const { userCards, settings, setNewCardsPerDay, setTotalCardsPerDay, resetStore } = useStore();

const newCardsPerDayInput = ref<number>(DEFAULT_NEW_CARDS_PER_DAY);
const totalCardsPerDayInput = ref<number>(DEFAULT_NEW_CARDS_PER_DAY);

const downloadDataHref = computed(() => {
  return `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify({ userCards: userCards.value, settings: settings.value }),
  )}`
})

onMounted(() => {
  newCardsPerDayInput.value = settings.value.newCardsPerDay
  totalCardsPerDayInput.value = settings.value.totalCardsPerDay
})

watch(settings, (value) => {
  newCardsPerDayInput.value = value.newCardsPerDay
  totalCardsPerDayInput.value = value.totalCardsPerDay
})

const isSaving = ref<boolean>();
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


const isResetting = ref<boolean>();
const resetActionState = computed(() => isResetting.value == null
  ?
  'hard' : isResetting.value === false
    ?
    'easy' : 'hard'
)

const resetState = computed(() => isResetting.value == null
  ?
  'Reset all data' : isResetting.value == true
    ?
    'Reseting...' : 'Reset!'
)

function setNewCardsPerDayInput(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    newCardsPerDayInput.value = Number(e.target.value)
  }
}

function setTotalCardsPerDayInput(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    totalCardsPerDayInput.value = Number(e.target.value)
  }
}

function submitForm(e: Event) {
  if (e.target instanceof HTMLFormElement) {
    isSaving.value = true
    newCardsPerDayInput.value = Number(newCardsPerDayInput.value)
    totalCardsPerDayInput.value = Number(totalCardsPerDayInput.value)

    setNewCardsPerDay(newCardsPerDayInput.value)
    setTotalCardsPerDay(totalCardsPerDayInput.value)

    setTimeout(() => isSaving.value = false, 500)
    setTimeout(() => isSaving.value = undefined, 2000)
  }
}


function reset() {
  if (confirm('Are you sure you want to reset all cards?\nThis will erase all progress and settings.')) {
    isResetting.value = true
    resetStore()
    setTimeout(() => isResetting.value = false, 500)
    setTimeout(() => isResetting.value = undefined, 2000)
  }
}

function uploadData(e: Event) {
  if (e.target instanceof HTMLInputElement) {
    const file = e.target.files?.[0];
    if (file) {
      const fr = new FileReader();
      fr.readAsText(file)
      fr.onload = (e: any) => {
        const data: LocalStore = JSON.parse(e.target.result, (key, value) => {
          if (key === 'due' || key === 'lastReview') {
            return new Date(value)
          }
          return value;
        })

        // patch previous version files
        if (data.settings.totalCardsPerDay == null) {
          const settings = { ...data.settings, totalCardsPerDay: DEFAULT_TOTAL_CARDS_PER_DAY }
          const userCards = updateCardsPerDay(data.userCards, data.settings.totalCardsPerDay, data.settings.newCardsPerDay)
          data.settings = settings
          data.userCards = userCards
        }

        resetStore(data)
      }
    }
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
        >
          Number of new cards per day
        </label>
        <input
          class="settings__form-input"
          id="new-cards-per-day"
          type="number"
          name="new-cards-per-day"
          min="5"
          :max="totalCardsPerDayInput"
          :value="newCardsPerDayInput"
          @input="setNewCardsPerDayInput"
        />
      </div>
      <div class="settings__form-group">
        <label
          class="settings__form-label"
          for="total-cards-per-day"
        >
          Number of total cards per day
        </label>
        <input
          class="settings__form-input"
          id="total-cards-per-day"
          type="number"
          name="total-cards-per-day"
          :min="newCardsPerDayInput"
          :max="userCards.length"
          :value="totalCardsPerDayInput"
          @input="setTotalCardsPerDayInput"
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

      <ButtonLabelInput
        class="settings__form-submit"
        type="file"
        accept=".popmots"
        name="upload-data"
        action="secondary"
        :disabled="isSaving"
        @change="uploadData"
      >
        Upload .popmots file
      </ButtonLabelInput>

      <ButtonLink
        class="settings__form-submit"
        download="data.popmots"
        action="secondary"
        :disabled="isSaving"
        :href="downloadDataHref"
      >
        Download .popmots file
      </ButtonLink>

      <ButtonButton
        class="settings__form-submit"
        type="button"
        :action="resetActionState"
        :disabled="isSaving"
        @click="reset"
      >
        {{ resetState }}
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
