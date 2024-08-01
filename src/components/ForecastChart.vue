<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Chart as ChartJS, BarElement, LinearScale, BarController, CategoryScale, Tooltip } from 'chart.js'

ChartJS.register(BarElement, LinearScale, BarController, CategoryScale, Tooltip)
ChartJS.defaults.font.family = 'Nunito Variable'
ChartJS.defaults.font.weight = 'bolder'
ChartJS.defaults.font.size = 14

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const canvas = ref<HTMLCanvasElement>();

// Get today date of the week for uk format
const today = (new Date()).toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
const todayIndex = DAYS.indexOf(today);

const dayLabels: string[] = []
for (let i = 0; i < DAYS.length; i++) {
  dayLabels.push(DAYS[(todayIndex + i) % DAYS.length])
}

onMounted(() => {

  if (canvas.value) {
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary')
    const primaryLightColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-light')
    const secondaryLightColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-light')
    const secondaryLightColorAlpha = getComputedStyle(document.documentElement).getPropertyValue('--secondary').replace(')', ', 0.8)')

    new ChartJS(canvas.value, {
      type: 'bar',
      data: {
        labels: dayLabels,
        datasets: [{
          label: '7 days review forecast',
          data: [12, 19, 3, 5, 2, 3],
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
  margin-top: var(--space-2xs);
  padding: var(--space-s-l) var(--space-2xs-l);
  border: var(--border);
  border-radius: var(--border-radius);

  &__canvas {
    width: calc(100vw - 25%);
    height: 300px;
    ;
  }
}
</style>