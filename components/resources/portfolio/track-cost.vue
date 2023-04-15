<template>
  <PopUp
    v-bind="{ open, title: 'Track Cost', showX: true }"
    @close="emit('canceled')"
  >
    <form
      class="flex w-full flex-col space-y-6 px-4 text-left"
      @submit.prevent="handleSubmit"
    >
      <VSelect
        id="type"
        v-model="costForm.type"
        :displayValue="(v: PatentCostType) => costTypeMap[v]"
        :options="[...PATENT_COST_TYPES]"
        :searchValue="(v: PatentCostType) => costTypeMap[v]"
        label="Cost Type"
        v-bind="{ ...$attrs }"
        autocorrect="false"
        :spellcheck="false"
      />

      <VSelect
        v-if="costForm.type === 'filing'"
        id="location"
        v-model="costForm.location"
        :displayValue="(v: Location) => locationsMap[v]"
        :options="[...locations]"
        :searchValue="(v: Location) => locationsMap[v]"
        label="Cost Type"
        v-bind="{ ...$attrs }"
        autocorrect="false"
        :spellcheck="false"
      />

      <VInput
        v-if="costForm.type === 'attorney'"
        id="amount"
        :label="`Amount - ${toMoney({
          amount: costForm.amount || 0,
          currency: 'USD'
        })}`"
        type="number"
        required
        v-model="costForm.amount"
      />

      <VInput
        id="date"
        label="Date of Expense"
        type="date"
        required
        v-model="costForm.transactionDate"
      />
      <div class="flex items-center justify-center space-x-2">
        <Btn class="Btn--primary w-full" v-bind="{ loading }"> SUBMIT </Btn>
      </div>
    </form>
  </PopUp>
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'
import Btn from '~~/components/input/btn.vue'
import VInput from '~~/components/input/v-input.vue'
import VSelect from '~~/components/input/v-select.vue'
import PopUp from '~~/components/ui/pop-up.vue'
import { ApiShow } from '~~/composables/fetch'
import { Auth } from '~~/composables/resources/auth'
import { PatentCost, PatentCostType } from '~~/composables/resources/portfolio'

// defines
const emit = defineEmits(['canceled', 'done'])
defineProps<{ open: boolean }>()

// refs
const route = useRoute()
const auth = inject<ComputedRef<Auth>>('auth')
const patentId = route.params.patentId
const portfolioId = route.params.portfolioId
const companyId = auth?.value.user.company?.id
const loading = ref('')
const locations = ['US', 'EUR'] as const
type Location = (typeof locations)[number]
const locationsMap: Record<Location, string> = {
  US: 'United States - $10,000',
  EUR: 'Europe - $20,000'
}
const costForm = reactive<{
  type: PatentCostType | null
  location: Location
  amount: number | null
  transactionDate: string | null
}>({ type: null, location: 'US', amount: null, transactionDate: null })

// methods
const { addToast } = useToast()
const handleSubmit = async () => {
  try {
    loading.value = 'Submitting...'
    await apiFetch<ApiShow<PatentCost>>('patent-costs', {
      method: 'post',
      body: { ...costForm, patentId }
    })
    addToast({
      type: 'success',
      message: 'Cost Added'
    })
    refreshGroups([
      `patents/${portfolioId}`,
      `ip-portfolios/${portfolioId}`,
      'ip-portfolios',
      `companies/${companyId}`
    ])
    emit('done')
  } catch (error) {
    addToast({
      type: 'error',
      message: 'There was an error on our end'
    })
  } finally {
    loading.value = ''
  }
}

// watchers
watch(
  () => ({ ...costForm }),
  ({ location, type }, oldForm) => {
    if (type !== oldForm.type) {
      costForm.amount = null
    }
    if (type === 'filing') {
      costForm.amount = location === 'US' ? 10_000 : 20_000
    }
  }
)
</script>
