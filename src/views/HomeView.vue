<script setup lang="ts">

const DONE_SESSION = 15
const TOTAL_SESION = 23

const REVIEWED_SESSION = 10
const REVIEWED_TOTAL_SESSION = 13

const LEARNING_SESSION = 3
const LEARNING_TOTAL_SESSION = 7

const NEW_SESSION = 2
const NEW_TOTAL_SESSION = 3

</script>

<template>
  <section class="home">
    <div class="home__title-container">
      <h2 class="home__title">Your progress</h2>
      <RouterLink
        to="/settings"
        class="home__link-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            d="M17.004 10.407c.138.435-.216.842-.672.842h-3.465a.75.75 0 0 1-.65-.375l-1.732-3c-.229-.396-.053-.907.393-1.004a5.252 5.252 0 0 1 6.126 3.537ZM8.12 8.464c.307-.338.838-.235 1.066.16l1.732 3a.75.75 0 0 1 0 .75l-1.732 3c-.229.397-.76.5-1.067.161A5.23 5.23 0 0 1 6.75 12a5.23 5.23 0 0 1 1.37-3.536ZM10.878 17.13c-.447-.098-.623-.608-.394-1.004l1.733-3.002a.75.75 0 0 1 .65-.375h3.465c.457 0 .81.407.672.842a5.252 5.252 0 0 1-6.126 3.539Z"
          />
          <path
            fill-rule="evenodd"
            d="M21 12.75a.75.75 0 1 0 0-1.5h-.783a8.22 8.22 0 0 0-.237-1.357l.734-.267a.75.75 0 1 0-.513-1.41l-.735.268a8.24 8.24 0 0 0-.689-1.192l.6-.503a.75.75 0 1 0-.964-1.149l-.6.504a8.3 8.3 0 0 0-1.054-.885l.391-.678a.75.75 0 1 0-1.299-.75l-.39.676a8.188 8.188 0 0 0-1.295-.47l.136-.77a.75.75 0 0 0-1.477-.26l-.136.77a8.36 8.36 0 0 0-1.377 0l-.136-.77a.75.75 0 1 0-1.477.26l.136.77c-.448.121-.88.28-1.294.47l-.39-.676a.75.75 0 0 0-1.3.75l.392.678a8.29 8.29 0 0 0-1.054.885l-.6-.504a.75.75 0 1 0-.965 1.149l.6.503a8.243 8.243 0 0 0-.689 1.192L3.8 8.216a.75.75 0 1 0-.513 1.41l.735.267a8.222 8.222 0 0 0-.238 1.356h-.783a.75.75 0 0 0 0 1.5h.783c.042.464.122.917.238 1.356l-.735.268a.75.75 0 0 0 .513 1.41l.735-.268c.197.417.428.816.69 1.191l-.6.504a.75.75 0 0 0 .963 1.15l.601-.505c.326.323.679.62 1.054.885l-.392.68a.75.75 0 0 0 1.3.75l.39-.679c.414.192.847.35 1.294.471l-.136.77a.75.75 0 0 0 1.477.261l.137-.772a8.332 8.332 0 0 0 1.376 0l.136.772a.75.75 0 1 0 1.477-.26l-.136-.771a8.19 8.19 0 0 0 1.294-.47l.391.677a.75.75 0 0 0 1.3-.75l-.393-.679a8.29 8.29 0 0 0 1.054-.885l.601.504a.75.75 0 0 0 .964-1.15l-.6-.503c.261-.375.492-.774.69-1.191l.735.267a.75.75 0 1 0 .512-1.41l-.734-.267c.115-.439.195-.892.237-1.356h.784Zm-2.657-3.06a6.744 6.744 0 0 0-1.19-2.053 6.784 6.784 0 0 0-1.82-1.51A6.705 6.705 0 0 0 12 5.25a6.8 6.8 0 0 0-1.225.11 6.7 6.7 0 0 0-2.15.793 6.784 6.784 0 0 0-2.952 3.489.76.76 0 0 1-.036.098A6.74 6.74 0 0 0 5.251 12a6.74 6.74 0 0 0 3.366 5.842l.009.005a6.704 6.704 0 0 0 2.18.798l.022.003a6.792 6.792 0 0 0 2.368-.004 6.704 6.704 0 0 0 2.205-.811 6.785 6.785 0 0 0 1.762-1.484l.009-.01.009-.01a6.743 6.743 0 0 0 1.18-2.066c.253-.707.39-1.469.39-2.263a6.74 6.74 0 0 0-.408-2.309Z"
            clip-rule="evenodd"
          />
        </svg>
      </RouterLink>
    </div>

    <article>
      <h3 class="home__subtitle">Current session</h3>
      <div
        class="progress-bar"
        role="progressbar"
        :aria-valuemax="TOTAL_SESION"
        aria-valuemin="0"
        :aria-valuenow="DONE_SESSION"
        aria-label="Progress"
        :style="{ '--progress-session': 15 / 23 * 100 + '%' }"
      >
        <span class="progress-bar__text">
          15 / 23
        </span>
      </div>

      <div class="home__totals">
        <article class="home__total">
          <span>{{ `${REVIEWED_SESSION} /
            ${REVIEWED_TOTAL_SESSION}` }}</span>
          <h4 class="home__total-title home__total-reviewed">Reviewed</h4>
        </article>
        <article class="home__total">
          <span>{{ `${LEARNING_SESSION} /
            ${LEARNING_TOTAL_SESSION}` }}</span>
          <h4 class="home__total-title home__total-learning">Learning</h4>
        </article>
        <article class="home__total">
          <span>{{ `${NEW_SESSION} /
            ${NEW_TOTAL_SESSION}` }}</span>
          <h4 class="home__total-title home__total-new">New</h4>
        </article>
      </div>


    </article>
    <section>
      <h3 class="home__subtitle">7 days review forecast</h3>
    </section>
    <section>
      <h3 class="home__subtitle">Total memorized</h3>
      <div
        class="progress-bar"
        role="progressbar"
        :aria-valuemax="10000"
        aria-valuemin="0"
        :aria-valuenow="DONE_SESSION"
        aria-label="Progress"
        :style="{ '--progress-session': 15 / 10000 * 100 + '%' }"
      >
        <span class="progress-bar__text">
          15 / 10000
        </span>
      </div>
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

    svg {
      fill: var(--secondary);
      width: var(--font-5xl);
      height: var(--font-5xl);
    }
  }

  &__subtitle {
    color: var(--secondary);
    font-size: var(--font-xl);
  }

  &__totals {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    margin-top: var(--space-xs);
    border: var(--border);
    border-radius: var(--border-radius);
    width: 100%;
    font-weight: 700;
  }

  &__total {
    display: flex;
    flex-direction: column;
    align-items: center;
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

  &__total-title {
    font-size: var(--font-s);
  }

  &__total-reviewed {
    color: var(--green-dark);
  }

  &__total-learning {
    color: var(--red-dark);
  }

  &__total-new {
    color: var(--yellow-dark);
  }
}

.progress-bar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 100%;
  margin-top: var(--space-2xs);
  border: var(--border);
  border-color: var(--primary-light);
  border-radius: var(--border-radius);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    width: var(--progress-session);
    height: 100%;
    border-left: 8px;
    background-color: var(--primary);
  }

  &__text {
    color: var(--primary-light);
    font-weight: 700;
    z-index: 1;
  }
}
</style>