<script setup lang="ts">
import { useHead } from '@unhead/vue'
import ViewSection from '@/components/ViewSection.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import SvgIcon from '@/components/IconBase.vue';
import ButtonLink from '@/components/ButtonLink.vue';
import ForecastChart from '@/components/ForecastChart.vue';
import ProgressBarCurrent from '@/components/ProgressBarCurrent.vue';
import ProgressSummaryTotal from '@/components/ProgressSummaryTotal.vue';
import ProgressBarTotal from '@/components/ProgressBarTotal.vue';
import ProgressSummaryCurrent from '@/components/ProgressSummaryCurrent.vue';
import { useNextSessionTime } from '@/components/composables/useNextSessionTime';

useHead({
  title: 'Home'
})

const nextSessionTime = useNextSessionTime()
</script>

<template>
  <ViewSection class="home">
    <ViewHeader>
      <template #title>Your progress</template>
      <RouterLink
        to="/settings"
        class="home__link-btn"
      >
        <SvgIcon
          name="settings"
          size="l"
          color="var(--secondary)"
        />
      </RouterLink>
    </ViewHeader>


    <article class="home__section">
      <h3 class="home__subtitle">Current session</h3>
      <ProgressBarCurrent class="study__progress" />
      <ProgressSummaryCurrent />
      <ButtonLink
        :class="['home__button', { 'home__button--disabled': Boolean(nextSessionTime) }]"
        to="/study"
        action="easy"
        :icon-name="nextSessionTime ? undefined : 'study'"
        :disabled="Boolean(nextSessionTime)"
      >
        <span
          v-if="nextSessionTime"
          class="home__time"
        >
          {{ nextSessionTime }}
        </span>
        <template v-else>
          Show answer
        </template>
      </ButtonLink>
    </article>


    <article class="home__section">
      <h3 class="home__subtitle">7 days review forecast</h3>
      <ForecastChart />
    </article>

    <article class="home__section">
      <h3 class="home__subtitle">Total memorized</h3>
      <ProgressBarTotal />
      <ProgressSummaryTotal />
    </article>

  </ViewSection>


</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.home {
  width: clamp($min-width, 100%, $screen-s);
  margin: 0 auto;

  &__link-btn {
    display: flex;

    &:hover svg {
      opacity: 0.5;
    }
  }

  &__button {
    width: max-content;
  }

  &__subtitle {
    color: var(--secondary);
    font-size: var(--font-0);
  }

  &__section {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }

  &__time {
    font-size: var(--font-0);
  }

}
</style>