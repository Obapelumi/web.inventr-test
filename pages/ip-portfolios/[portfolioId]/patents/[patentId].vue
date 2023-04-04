<template>
  <LoadingPage v-if="pending" />
  <div v-else-if="patent" class="grid grid-cols-2 gap-x-3 gap-y-8 px-5 sm:pl-8">
    <DetailDisplay title="Patent Number">
      {{ patent.patentNumber }}
    </DetailDisplay>
    <DetailDisplay title="Publication Date">
      {{ formatDate(patent.publicationDate, 'l') }}
    </DetailDisplay>
    <DetailDisplay title="Applicant">
      <div class="w-60">{{ patent.applicant }}</div>
    </DetailDisplay>
    <DetailDisplay title="Inventor">
      <div class="w-60">{{ patent.inventor }}</div>
    </DetailDisplay>
    <DetailDisplay title="Costs" class="col-span-2">
      <div
        v-if="patent.costs?.length"
        class="flex items-center justify-between"
      >
        <span>
          Total:
          {{
            toMoney({
              amount: patent.meta?.costsAmountSum || 0,
              currency: 'USD'
            })
          }}
        </span>
        <Btn class="Btn Btn--primary Btn--sm" @click="openTrackCost = true">
          Track Cost
        </Btn>
      </div>

      <VTable
        v-bind="{
          data: { data: patent.costs ?? [] },
          pending: false,
          skeleton: { rows: 3, columns: 2 }
        }"
      >
        <template #header>
          <TableHead class="h-10 px-4 pt-3 text-left">Type</TableHead>
          <TableHead mobile class="px-4 pt-3 text-right">Amount</TableHead>
        </template>
        <template #default="{ row: cost }: TableRow<PatentCost>">
          <TableCell mobile class="text-xs">
            {{ costTypeMap[cost.type] }}
          </TableCell>
          <TableCell mobile class="text-right text-xs">
            {{ toMoney({ amount: cost.amount, currency: 'USD' }) }}
          </TableCell>
        </template>
        <template #empty>
          <Empty
            message="No patent costs found"
            :action="{
              title: 'Track Cost',
              action: () => (openTrackCost = true)
            }"
          />
        </template>
      </VTable>
    </DetailDisplay>
    <TrackCost
      :open="openTrackCost"
      @canceled="openTrackCost = false"
      @done="costTracked"
    />
  </div>
  <ErrorPage v-else />
</template>

<script setup lang="ts">
import LoadingPage from '~~/components/ui/loading-page.vue'
import ModalTitle from '~~/components/ui/modal-title.vue'
import ErrorPage from '~~/components/ui/error-page.vue'
import { ApiShow } from '~~/composables/fetch'
import { Patent, PatentCost } from '~~/composables/resources/portfolio'
import DetailDisplay from '~~/components/resources/detail-display.vue'
import TrackCost from '~~/components/resources/portfolio/track-cost.vue'
import VTable, { TableRow } from '~~/components/table/v-table.vue'
import TableCell from '~~/components/table/table-cell.vue'
import Empty from '~~/components/ui/empty.vue'
import TableHead from '~~/components/table/table-head.vue'
import Btn from '~~/components/input/btn.vue'

// refs
const route = useRoute()
const patentId = route.params.patentId
const { data, refresh, pending } = useApiFetch<ApiShow<Patent>>(
  `patents/${patentId}`,
  () => ({
    params: { 'relations[]': ['costs'], 'sums[]': ['costs.amount'] },
    group: `patents/${patentId}`
  })
)
const patent = computed(() => data.value?.data)
const openTrackCost = ref(false)

// methods
const costTracked = () => {
  refresh()
  openTrackCost.value = false
}
</script>
