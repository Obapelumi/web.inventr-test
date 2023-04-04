import Chart from 'chart.js/auto'
import { ChartConfiguration } from 'chart.js'

export type Report<Y, K = string> = [K, { x: string; y: Y }[]]

export const useChart = (configFn: () => ChartConfiguration) => {
  // chartjs setup
  Chart.defaults.font.family = "'Prompt', sans-serif"

  // refs
  const chartElement = ref<HTMLCanvasElement>()
  const chart = shallowRef<Chart>()
  const chartConfig = computed<ChartConfiguration>(configFn)

  // hooks
  onBeforeUnmount(() => {
    if (chart.value) chart.value.destroy()
  })

  // methods
  const createChart = () => {
    if (!chartElement.value || chart.value) return
    chart.value = new Chart(chartElement.value, chartConfig.value)
  }
  const updateChart = ({ data, options }: ChartConfiguration) => {
    if (!chart.value) return
    chart.value.data = data
    chart.value.options = options
    chart.value.update()
  }

  // watchers
  watchEffect(() => {
    createChart()
  })
  watch(chartConfig, (config) => {
    updateChart(config)
  })
  return [chartElement, chart] as const
}
