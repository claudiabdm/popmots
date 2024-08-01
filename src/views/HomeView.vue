<script setup lang="ts">
import ForecastChart from '@/components/ForecastChart.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ProgressSummary from '@/components/ProgressSummary.vue';
import SvgIcon from '@/components/SvgIcon.vue';


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
  <section class="home">
    <div class="home__title-container">
      <h2 class="home__title">Your progress</h2>
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
    </div>

    <article>
      <h3 class="home__subtitle">Current session</h3>
      <ProgressBar
        :value-max="TOTAL_SESSION"
        :value-now="DONE_SESSION"
      />

      <ProgressSummary :summary="summary" />
    </article>

    <section>
      <h3 class="home__subtitle">7 days review forecast</h3>
      <ForecastChart />
    </section>

    <section>
      <h3 class="home__subtitle">Total memorized</h3>
      <ProgressBar
        :value-max="TOTAL"
        :value-now="DONE_SESSION"
      />
    </section>
  </section>


</template>

<style lang="scss">
@use '../assets/styles/_variables' as *;

.home {
  display: flex;
  flex-direction: column;
  gap: var(--space-l);

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    color: var(--primary);
    font-size: var(--font-4xl);
  }

  &__link-btn {
    display: flex;

    &:hover svg {
      opacity: 0.5;
    }
  }

  &__subtitle {
    color: var(--secondary);
    font-size: var(--font-xl);
  }

}
</style>