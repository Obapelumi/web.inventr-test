<template>
  <PopUp v-bind="{ open, size: 'full', showX: true }" @close="emit('canceled')">
    <div class="mt-2 flex w-full flex-col rounded-xl bg-white text-left">
      <div class="w-full border-b py-3 text-center">
        <h3 class="text-lg">Add Patents</h3>
      </div>
      <div class="flex-col space-y-6 p-5">
        <div class="flex items-center space-x-3 text-sm text-gray-600">
          <span>Search By: </span>
          <CheckBox
            v-for="param in EPO_SEARCH_PARAMS"
            :selected="searchBy"
            :value="param"
            class="flex items-center space-x-3"
          >
            <span>{{ searchParamMap[param] }}</span>
            <input type="checkbox" hidden :value="param" v-model="searchBy" />
          </CheckBox>
        </div>
        <VInput
          id="name"
          type="text"
          autofocus
          v-model="search"
          :placeholder="`Search by ${searchBy
            .map((p) => searchParamMap[p])
            .join(' or ')}`"
        >
          <template #prepend>
            <div class="flex h-full w-8 items-center justify-end">
              <Icon name="search" class="h-5 w-5 text-gray-400" />
            </div>
          </template>
        </VInput>
        <div class="h-[calc(100vh-20rem)] overflow-y-auto px-1">
          <VTable
            v-bind="{
              data: { data: searchResults ?? [] },
              pending: searching,
              skeleton: { rows: 3, columns: 2 }
            }"
          >
            <template
              #default="{ row: patent }: TableRow<PatentSearch['data'][number]>"
            >
              <TableCell mobile>
                <div class="flex flex-col space-y-2">
                  <span>{{ patent.title }}</span>
                  <span class="text-xs">#{{ patent.patentNumber }}</span>
                </div>
              </TableCell>
              <TableCell mobile class="justify-end text-right">
                <Btn
                  v-if="!patent.saved && !savedPatents.has(patent.patentNumber)"
                  @click="savePatent(patent.patentNumber)"
                  :loading="saving === patent.patentNumber ? 'Saving...' : ''"
                  class="Btn--primary Btn--sm w-36"
                  type="button"
                >
                  <Icon name="folder-plus" class="mr-3 h-4 w-4" /> Save Patent
                </Btn>
                <div class="flex justify-end" v-else>
                  <div
                    class="flex h-8 items-center justify-center space-x-2 rounded-full bg-green-100 px-3 text-green-500"
                  >
                    <span class="text-xs">Saved</span>
                    <Icon name="check-circle" class="h-4 w-4" />
                  </div>
                </div>
              </TableCell>
            </template>
            <template #empty>
              <Empty message="No patents found" />
            </template>
          </VTable>
        </div>
      </div>
    </div>
  </PopUp>
</template>

<script setup lang="ts">
import Btn from '~~/components/input/btn.vue'
import CheckBox from '~~/components/input/check-box.vue'
import VInput from '~~/components/input/v-input.vue'
import TableCell from '~~/components/table/table-cell.vue'
import VTable, { TableRow } from '~~/components/table/v-table.vue'
import Empty from '~~/components/ui/empty.vue'
import Icon from '~~/components/ui/icon.vue'
import PopUp from '~~/components/ui/pop-up.vue'
import { ApiShow } from '~~/composables/fetch'
import {
  PatentSearch,
  Patent,
  EpoSearchParams
} from '~~/composables/resources/portfolio'

// defines
const emit = defineEmits(['canceled', 'saved'])
defineProps<{ open: boolean }>()

// refs
const route = useRoute()
const ipPortfolioId = route.params.portfolioId
const search = ref('')
const searchBy = ref<EpoSearchParams[]>([
  'publicationnumber',
  'inventorandapplicant',
  'titleandabstract'
])
const searching = ref(false)
const searchResults = ref<PatentSearch['data']>([])
const searchParamMap: Record<EpoSearchParams, string> = {
  publicationnumber: 'Publication Number',
  inventorandapplicant: 'Applicant Name',
  titleandabstract: 'Title'
}
const saving = ref('')
const savedPatents = ref(new Set())

// methods
const { addToast } = useToast()
const searchPatents = useDebounce(
  async (text: string, searchBy: EpoSearchParams[]) => {
    if (!text || searchBy.length < 1) {
      searchResults.value = []
      return
    }
    try {
      searching.value = true
      const response = await apiFetch<ApiShow<PatentSearch>>('patent-search', {
        params: { text, 'searchBy[]': searchBy }
      })
      searchResults.value = response.data.data.filter((p) => p.title)
    } catch (error) {
      searchResults.value = []
    } finally {
      searching.value = false
    }
  },
  200
)

const savePatent = async (patentNumber: string) => {
  try {
    saving.value = patentNumber
    await apiFetch<ApiShow<Patent>>('patents', {
      method: 'POST',
      body: { patentNumber, ipPortfolioId }
    })
    addToast({ type: 'success', message: 'Patent saved' })
    savedPatents.value.add(patentNumber)
    savedPatents.value = savedPatents.value
    emit('saved')
  } catch (error) {
  } finally {
    saving.value = ''
  }
}

watchEffect(() => {
  searchPatents(search.value, searchBy.value)
})
</script>
