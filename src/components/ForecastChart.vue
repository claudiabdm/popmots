<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue';
import { Chart as ChartJS, BarElement, LinearScale, BarController, CategoryScale, Tooltip, type ChartData, type ChartDataset, type ChartOptions } from 'chart.js'
import { DAY_IN_MILLISECONDS, useStore } from '@/data';
import { overDue } from '@/data/utils';

ChartJS.register(BarElement, LinearScale, BarController, CategoryScale, Tooltip)
ChartJS.defaults.font.family = 'Nunito Variable'
ChartJS.defaults.font.weight = 'bolder'
ChartJS.defaults.font.size = 14

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const primaryColor = 'hsl(239, 90%, 65%)';
const primaryColorAlpha = 'hsla(239, 90%, 65%, 0.8)';
const primaryLightColor = 'hsl(239, 90%, 85%)';
const primaryLightColorAlpha = 'hsla(239, 90%, 85%, 0.8)';
const secondaryLightColor = 'hsl(220, 9%, 85%)';
const secondaryLightColorAlpha = 'hsla(220, 9%, 85%, 0.5)';

const labels = (() => {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'short' }).toUpperCase();
  const todayIndex = DAYS.indexOf(today);
  return DAYS.map((_, i) => DAYS[(todayIndex + i) % DAYS.length]);
})()

const chardData: ChartData<'bar'> = {
  labels,
  datasets: [
    {
      label: '7 days review forecast',
      data: [0, 0, 0, 0, 0, 0, 0] as [number, number, number, number, number, number, number],
      barThickness: 30,
      borderWidth: 2,
      borderRadius: 10,
      borderColor: primaryLightColor,
      borderSkipped: 'bottom',
      hoverBorderColor: primaryLightColorAlpha,
      hoverBackgroundColor: primaryColorAlpha,
      backgroundColor: primaryColor,
    } as ChartDataset<'bar'>
  ],
}

const chartOptions: ChartOptions = {
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 35,
      bottom: 5,
    }
  },
  plugins: {
    tooltip: {
      displayColors: false,
      callbacks: {
        title: () => '',
        label: (context: any) => `${context.parsed.y} cards due`,
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
};

const store = useStore();
const canvas = ref<HTMLCanvasElement>();
const chart = shallowRef<ChartJS>();

const due7days = computed(() => {
  const dueArr = new Array<number>(7).fill(0) as [number, number, number, number, number, number, number];
  const now = store.now;
  const dates = dueArr.map((_, i) => new Date(now.value + i * DAY_IN_MILLISECONDS));
  for (const card of store.userCards.value) {
    // if card is due after 7 days, skip
    if (card.schedule.due > dates[6]) continue;

    // add cards to each corresponding due date
    for (let i = 0; i < dates.length; i++) {
      if (overDue(card.schedule, dates[i])) {
        dueArr[i] += 1;
        break;
      }
    }
  }
  return dueArr;
})

onMounted(() => {
  if (canvas.value) {
    chardData.datasets[0].data = [...due7days.value];
    chart.value = new ChartJS(canvas.value, {
      type: 'bar',
      data: chardData,
      options: chartOptions
    });
  }
})

watch(due7days, (newVal) => {
  // Update chart when a card's due date changes
  if (chart.value) {
    const oldChartData = [...(chart.value.data.datasets[0].data ?? [])];
    if (newVal.some((v, i) => v !== oldChartData[i])) {
      console.log('update chart');
      chart.value.data.datasets[0].data = [...newVal];
      nextTick(() => chart.value?.update());
    }
  }
})

onUnmounted(() => {
  chart.value?.destroy();
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
  padding: var(--space-2xs-l);
  border: var(--border);
  border-radius: var(--border-radius);

  &__canvas {
    width: 100%;
    height: 300px;
  }
}
</style>