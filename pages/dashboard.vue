<template>
  <div class="contents">
    <LoadingPage v-if="pending" />
    <div
      v-else-if="(portfolios?.data.length ?? 0) < 1"
      class="flex h-full items-center justify-center"
    >
      <Empty>
        <div class="flex flex-col justify-center space-y-5">
          <h3 class="text-gray-600">No IP Portfolios Yet</h3>
          <Btn class="Btn--primary Btn--sm" @click="openAddPortfolio = true">
            <Icon name="folder-plus" class="mr-2 h-4 w-4" /> Add Portfolio
          </Btn>
        </div>
      </Empty>
    </div>
    <div v-else class="flex w-full flex-col space-y-4">
      <div class="pb-4">
        <h1 class="text-xl font-semibold text-gray-600">
          Hello {{ auth?.user.name.split(' ')[0] }} 👋🏾
        </h1>
      </div>
      <Stats v-if="stats.length > 0" v-bind="{ stats }" />
      <div class="flex flex-col space-y-3 rounded-lg bg-white p-4 shadow-sm">
        <div class="flex justify-between">
          <h3 class="text-lg font-semibold text-gray-600">IP Portfolios</h3>
          <Btn class="Btn--primary Btn--sm" @click="openAddPortfolio = true">
            <Icon name="folder-plus" class="mr-2 h-4 w-4" /> Add Portfolio
          </Btn>
        </div>
        <div class="max-h-[calc(100vh-15rem)] overflow-y-auto px-1">
          <VTable
            v-bind="{
            data: portfolios,
            pending,
            skeleton: { rows: 3, columns: 2 },
            onRowClick: (portfolio: IpPortfolio) => router.push(`/ip-portfolios/${portfolio.id}`)
          }"
          >
            <template #header>
              <TableHead mobile class="px-4 pt-3">Name</TableHead>
              <TableHead class="px-4 pt-3 text-right">Total Costs</TableHead>
              <TableHead class="px-4 pt-3 text-right">Amount Left</TableHead>
              <TableHead mobile class="px-4 pt-3 text-right"
                >Total Budget</TableHead
              >
            </template>
            <template #default="{ row: portfolio, i }: TableRow<IpPortfolio>">
              <TableCell mobile>
                <div class="flex flex-col space-y-1">
                  <span>{{ portfolio.name }}</span>
                  <span class="text-xs"
                    >{{ portfolio.meta?.patentsCount }} patents</span
                  >
                </div>
              </TableCell>
              <TableCell class="text-right">
                {{
                  toMoney({
                    amount: portfolio.meta?.patentCostsAmountSum ?? 0,
                    currency: 'USD'
                  })
                }}
              </TableCell>
              <TableCell class="text-right">
                {{
                  toMoney({
                    amount:
                      portfolio.budget -
                      (portfolio.meta?.patentCostsAmountSum ?? 0),
                    currency: 'USD'
                  })
                }}
              </TableCell>
              <TableCell mobile class="text-right">
                {{ toMoney({ amount: portfolio.budget, currency: 'USD' }) }}
              </TableCell>
            </template>
          </VTable>
        </div>
      </div>
    </div>
    <CreatePortfolio
      :open="openAddPortfolio"
      @done="portfolioAdded"
      @canceled="openAddPortfolio = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'
import Btn from '~~/components/input/btn.vue'
import CreatePortfolio from '~~/components/resources/portfolio/create-portfolio.vue'
import Stats from '~~/components/resources/stats.vue'
import TableCell from '~~/components/table/table-cell.vue'
import TableHead from '~~/components/table/table-head.vue'
import VTable, { TableRow } from '~~/components/table/v-table.vue'
import Empty from '~~/components/ui/empty.vue'
import Icon from '~~/components/ui/icon.vue'
import LoadingPage from '~~/components/ui/loading-page.vue'
import { ApiList, ApiShow } from '~~/composables/fetch'
import { Auth } from '~~/composables/resources/auth'
import { Stat } from '~~/composables/resources/base'
import { Company, IpPortfolio } from '~~/composables/resources/portfolio'

// defines
definePageMeta({ layout: 'dashboard' })

// refs
const router = useRouter()
const auth = inject<ComputedRef<Auth>>('auth')
const {
  data: portfolios,
  refresh,
  pending
} = useApiFetch<ApiList<IpPortfolio>>('ip-portfolios', () => ({
  params: { 'sums[]': ['patentCosts.amount'], 'counts[]': ['patents'] },
  group: 'ip-portfolios'
}))
const companyId = auth?.value.user.company?.id
const {
  data: companyData,
  // refresh: refreshCompany,
  pending: companyPending
} = useApiFetch<ApiShow<Company>>(`companies/${companyId}`, () => ({
  params: {
    'sums[]': ['patentCosts.amount', 'ipPortfolios.budget'],
    'counts[]': ['patents']
  },
  group: `companies/${companyId}`
}))
const openAddPortfolio = ref(false)

const stats = computed<Stat[]>(() => {
  const meta = companyData.value?.data?.meta
  if (!meta) return []
  const budgetSum = meta.ipPortfoliosBudgetSum ?? 0
  const amountLeft = budgetSum - (meta.patentCostsAmountSum ?? 0)
  const percentageLeft = (amountLeft / budgetSum || 1) * 100
  return [
    { title: 'Number of Patents', value: meta.patentsCount },
    {
      title: 'Total Budget',
      value: toMoney({
        amount: meta.ipPortfoliosBudgetSum ?? 0,
        currency: 'USD'
      })
    },
    {
      title: 'Total Costs',
      value: toMoney({
        amount: meta.patentCostsAmountSum ?? 0,
        currency: 'USD'
      })
    },
    {
      title: 'Amount Left',
      value: toMoney({
        amount: amountLeft,
        currency: 'USD'
      }),
      type:
        percentageLeft > 50
          ? 'success'
          : percentageLeft > 20
          ? 'warning'
          : 'error'
    }
  ]
})

// methods
const portfolioAdded = () => {
  openAddPortfolio.value = false
  refresh()
}
</script>
