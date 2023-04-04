<template>
  <PopUp
    v-bind="{ open, title: 'Create Portfolio', showX: true }"
    @close="emit('canceled')"
  >
    <form
      class="flex w-full flex-col space-y-6 px-4 text-left"
      @submit.prevent="handleSubmit"
    >
      <VInput
        id="name"
        label="Name"
        type="text"
        required
        v-model="portfolioForm.name"
      />
      <VInput
        id="budget"
        :label="`Budget - ${toMoney({
          amount: portfolioForm.budget || 0,
          currency: 'USD'
        })}`"
        type="number"
        required
        v-model="portfolioForm.budget"
      />
      <div class="flex items-center justify-center space-x-2">
        <Btn class="Btn--primary w-full" v-bind="{ loading }">
          CREATE PROFOLIO
        </Btn>
      </div>
    </form>
  </PopUp>
</template>

<script setup lang="ts">
import Btn from '~~/components/input/btn.vue'
import VInput from '~~/components/input/v-input.vue'
import PopUp from '~~/components/ui/pop-up.vue'
import { ApiShow } from '~~/composables/fetch'
import { IpPortfolio } from '~~/composables/resources/portfolio'

// defines
const emit = defineEmits(['canceled', 'done'])
defineProps<{ open: boolean }>()

// refs
const loading = ref('')
const portfolioForm = reactive({ name: '', budget: null })

// methods
const { addToast } = useToast()

const handleSubmit = async () => {
  try {
    loading.value = 'Submitting...'
    await apiFetch<ApiShow<IpPortfolio>>('ip-portfolios', {
      method: 'post',
      body: { ...portfolioForm }
    })
    addToast({
      type: 'success',
      message: 'Portfolio Created'
    })
    emit('done')
  } catch (error) {
    addToast({
      type: 'error',
      message: 'There was an error setting up your IP Portfolio'
    })
  } finally {
    loading.value = ''
  }
}
</script>
