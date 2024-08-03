<script setup lang="ts">
import ButtonLink from '@/components/ButtonLink.vue';
import ForecastChart from '@/components/ForecastChart.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ProgressSummary from '@/components/ProgressSummary.vue';
import SvgIcon from '@/components/IconBase.vue';
import ViewSection from '@/components/ViewSection.vue';
import ViewHeader from '@/components/ViewHeader.vue';


const DONE_SESSION = 15
const TOTAL_SESSION = 23
const TOTAL = 10000

const summary = [
  { type: 'reviewed' as const, valueNow: 10, valueMax: 13 },
  { type: 'learning' as const, valueNow: 3, valueMax: 7 },
  { type: 'new' as const, valueNow: 2, valueMax: 3 }
]

</script>

<template>
  <ViewSection>
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
      <ProgressBar
        :value-max="TOTAL_SESSION"
        :value-now="DONE_SESSION"
      />
      <ProgressSummary :summary="summary" />
    </article>

    <ButtonLink
      to="/study"
      icon-name="study"
      action="easy"
    >
      Go to study
    </ButtonLink>

    <article class="home__section">
      <h3 class="home__subtitle">7 days review forecast</h3>
      <ForecastChart />
    </article>

    <article class="home__section">
      <h3 class="home__subtitle">Total memorized</h3>
      <ProgressBar
        :value-max="TOTAL"
        :value-now="DONE_SESSION"
      />
    </article>

  </ViewSection>


</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.home {

  &__link-btn {
    display: flex;

    &:hover svg {
      opacity: 0.5;
    }
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

}
</style>