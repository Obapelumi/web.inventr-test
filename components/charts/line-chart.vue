<template>
  <canvas
    class="bg-white"
    width="100%"
    height="100%"
    ref="chartElement"
  ></canvas>
</template>

<script setup lang="ts">
import { ChartConfiguration } from 'chart.js'

type ChartData =
  | ChartConfiguration['data']['datasets'][number]['data']
  | Record<string, string | number>[]
// defines
const props = defineProps<{
  labels?: string[]
  data: ChartData
  title: string
  xLabel?: string
  yLabel?: string
  options?: ChartConfiguration['options']
}>()

// refs
const [chartElement] = useChart(() => ({
  type: 'line',
  data: {
    labels: props.labels,
    datasets: [
      {
        label: props.yLabel,
        data: props.data as any[],
        borderColor: COLORS.primary[500],
        cubicInterpolationMode: 'monotone',
        tension: 1
      }
    ]
  },
  options: props.options || {
    responsive: true,
    layout: { padding: 20 },
    elements: { point: { radius: 0, backgroundColor: COLORS.primary[500] } },
    plugins: {
      title: {
        display: true,
        text: props.title
      }
    },
    interaction: { intersect: false },
    scales: {
      x: { display: true, title: { display: true }, grid: { display: false } },
      y: {
        display: true,
        title: { display: true, text: props.yLabel },
        grid: { display: false }
      }
    }
  }
}))
</script>
