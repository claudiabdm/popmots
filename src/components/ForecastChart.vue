<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { Chart as ChartJS, BarElement, LinearScale, BarController, CategoryScale, Tooltip } from 'chart.js'
import { DAY_IN_MILLISECONDS, useStore } from '@/data';
import { sameDay } from '@/utils';
import { overDue } from '@/data/utils';

ChartJS.register(BarElement, LinearScale, BarController, CategoryScale, Tooltip)
ChartJS.defaults.font.family = 'Nunito Variable'
ChartJS.defaults.font.weight = 'bolder'
ChartJS.defaults.font.size = 14

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const store = useStore();

const canvas = ref<HTMLCanvasElement>();

// TODO
const labels = computed(() => {
  const today = new Date(store.now.value).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
  const todayIndex = DAYS.indexOf(today);
  return DAYS.map((_, i) => DAYS[(todayIndex + i) % DAYS.length]);
})

const due7days = computed(() => {
  const dueArr = new Array<number>(7).fill(0);
  const now = store.now;
  const dates = dueArr.map((_, i) => new Date(now.value + i * DAY_IN_MILLISECONDS));
  for (const card of store.userCards.value) {
    // if card is due after 7 days, skip
    if (card.schedule.due > dates[6]) continue;

    // if card is over due, add it to today's due cards
    if (overDue(card.schedule)) {
      dueArr[0] += 1;
      continue;
    };

    // add cards to each corresponding due date
    for (let i = 0; i < dates.length; i++) {
      if (sameDay(card.schedule.due, dates[i])) {
        dueArr[i] += 1;
        break;
      }
    }
  }
  return dueArr;
})

onMounted(() => {
  if (canvas.value) {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary')
    const primaryLightColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-light')
    const secondaryLightColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-lighter')
    const secondaryLightColorAlpha = getComputedStyle(document.documentElement).getPropertyValue('--secondary').replace(')', ', 0.8)')

    // TODO: refactor
    new ChartJS(canvas.value, {
      type: 'bar',
      data: {
        labels: labels.value,
        datasets: [{
          label: '7 days review forecast',
          data: due7days.value,
          barThickness: 30,
          borderWidth: 2,
          borderRadius: 10,
          borderColor: primaryLightColor,
          borderSkipped: 'bottom',
          hoverBorderColor: primaryLightColor.replace(')', ', 0.8)'),
          hoverBackgroundColor: primaryColor.replace(')', ', 0.8)'),
          backgroundColor: primaryColor,
        }]
      },

      options: {
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            displayColors: false,
            callbacks: {
              title: () => '',
              label: (context) => `${context.parsed.y} cards due`,
            },
            xAlign: 'center',
            yAlign: 'bottom',
            cornerRadius: 10,
            backgroundColor: secondaryLightColorAlpha,
          }
        },
        scales: {
          x: {
            ticks: {
              color: primaryLightColor,
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              maxTicksLimit: 5,
              color: primaryLightColor,
            },
            border: {
              display: false
            },
            grid: {
              color: secondaryLightColor,
              drawTicks: false,
              lineWidth: 2,
            },
            beginAtZero: true
          }
        }
      }
    });
  }

})
</script>

<template>
  <div class="chart">
    <div class="chart__canvas">
      <canvas
        ref="canvas"
        id="forecastBarChart"
      ></canvas>
    </div>
  </div>
</template>

<style lang="scss">
.chart {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: var(--space-s-l) var(--space-2xs-l);
  border: var(--border);
  border-radius: var(--border-radius);

  &__canvas {
    width: calc(100vw - 25%);
    height: 300px;
  }
}
</style>