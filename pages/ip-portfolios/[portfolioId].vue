<template>
  <div class="contents">
    <LoadingPage v-if="pending" />
    <div v-else-if="portfolio" class="flex w-full flex-col space-y-4">
      <h1 class="text-xl font-semibold text-gray-600">
        {{ portfolio.name }}
      </h1>
      <Stats v-bind="{ stats }" />
      <div class="flex flex-col space-y-3 rounded-lg bg-white p-4 shadow-sm">
        <div class="flex justify-between">
          <h3 class="text-lg font-semibold text-gray-600">Patents</h3>
          <Btn
            v-if="patentList?.data.length"
            class="Btn--primary Btn--sm"
            @click="openAddPatents = true"
          >
            <Icon name="plus-circle" class="mr-2 h-4 w-4" /> Add Patents
          </Btn>
        </div>
        <div class="max-h-[calc(100vh-22.5rem)] overflow-y-auto px-1">
          <VTable
            v-bind="{
              data: patentList,
              pending: patentsPending,
              skeleton: { rows: 3, columns: 2 },
              onRowClick: goToPatent
            }"
          >
            <template #header>
              <TableHead mobile class="h-10 w-7/12 px-4">Title</TableHead>
              <TableHead class="px-4 pt-3">Publication Date</TableHead>
              <TableHead mobile class="px-4 pt-3 text-right">
                Current Spend
              </TableHead>
            </template>
            <template #default="{ row: patent }: TableRow<Patent>">
              <TableCell mobile>
                <div class="flex flex-col space-y-2">
                  <span>{{ patent.title }}</span>
                  <span class="text-xs">#{{ patent.patentNumber }}</span>
                </div>
              </TableCell>
              <TableCell>
                {{ formatDate(patent.publicationDate, 'l') }}
              </TableCell>
              <TableCell mobile class="text-right font-semibold">
                {{
                  toMoney({
                    amount: patent.meta?.costsAmountSum || 0,
                    currency: 'USD'
                  })
                }}
              </TableCell>
            </template>
            <template #empty>
              <Empty>
                <div class="flex flex-col justify-center space-y-5">
                  <h3 class="text-gray-600">No Patents Yet</h3>
                  <Btn
                    class="Btn--primary Btn--sm"
                    @click="openAddPatents = true"
                  >
                    <Icon name="plus-circle" class="mr-2 h-4 w-4" /> Add Patents
                  </Btn>
                </div>
              </Empty>
            </template>
          </VTable>
        </div>
      </div>
    </div>
    <ErrorPage v-else />
    <AddPatents
      :open="openAddPatents"
      @saved="patentSaved"
      @canceled="openAddPatents = false"
    />

    <SlideModal
      :open="modalOpen"
      staticBackDrop
      @close="$router.replace(`/ip-portfolios/${portfolioId}`)"
      :title="modalTitle"
    >
      <NuxtPage />
    </SlideModal>
  </div>
</template>

<script setup lang="ts">
import Btn from '~~/components/input/btn.vue'
import AddPatents from '~~/components/resources/portfolio/add-patents.vue'
import Stats from '~~/components/resources/stats.vue'
import TableCell from '~~/components/table/table-cell.vue'
import TableHead from '~~/components/table/table-head.vue'
import VTable, { TableRow } from '~~/components/table/v-table.vue'
import Empty from '~~/components/ui/empty.vue'
import ErrorPage from '~~/components/ui/error-page.vue'
import Icon from '~~/components/ui/icon.vue'
import LoadingPage from '~~/components/ui/loading-page.vue'
import SlideModal from '~~/components/ui/slide-modal.vue'
import { ApiList, ApiShow } from '~~/composables/fetch'
import { IpPortfolio, Patent } from '~~/composables/resources/portfolio'

// defines
definePageMeta({ layout: 'dashboard' })

// refs
const router = useRouter()
const route = useRoute()
const portfolioId = route.params.portfolioId
const { data, refresh, pending } = useApiFetch<ApiShow<IpPortfolio>>(
  `ip-portfolios/${portfolioId}`,
  () => ({
    params: { 'sums[]': ['patentCosts.amount'], 'counts[]': ['patents'] },
    group: `ip-portfolios/${portfolioId}`
  })
)
const portfolio = computed(() => data.value?.data)
const {
  data: patentList,
  refresh: refreshPatents,
  pending: patentsPending
} = useApiFetch<ApiList<Patent>>('patents', () => ({
  params: { ipPortfolioId: portfolioId, 'sums[]': ['costs.amount'] },
  group: `patents/${portfolioId}`
}))
const openAddPatents = ref(false)
const [modalTitle, modalOpen] = useRouteModal('ip-portfolio', ['/patents/'])

const stats = computed(() => {
  const portfolioValue = portfolio.value
  if (!portfolioValue) return []
  return [
    { title: 'Number of Patents', value: portfolioValue.meta?.patentsCount },
    {
      title: 'Total Budget',
      value: toMoney({ amount: portfolioValue.budget, currency: 'USD' })
    },
    {
      title: 'Current Spend',
      value: toMoney({
        amount: portfolioValue.meta?.patentCostsAmountSum ?? 0,
        currency: 'USD'
      })
    },
    {
      title: 'Amount Left',
      value: toMoney({
        amount:
          portfolioValue.budget -
          (portfolioValue.meta?.patentCostsAmountSum ?? 0),
        currency: 'USD'
      })
    }
  ]
})

// methods
const goToPatent = (patent: Patent) => {
  router.push(`/ip-portfolios/${portfolio.value?.id}/patents/${patent.id}`)
  modalTitle.value = patent.title
}
const patentSaved = () => {
  refresh()
  refreshPatents()
}

// watchers
watch(patentList, () => {
  patentList.value?.data.sort((a, b) => {
    const costSumA = a.meta?.costsAmountSum ?? 0
    const costSumB = b.meta?.costsAmountSum ?? 0
    return costSumB - costSumA
  })
})
</script>
