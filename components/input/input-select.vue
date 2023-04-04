<template>
  <VInput
    v-model="input"
    @error="(e) => emit('error', e)"
    v-bind="{ ...$attrs, id, label, required, tooltip }"
  >
    <template #append>
      <DropDown
        v-bind="{ items }"
        class="my-0.5 mr-0.5 flex h-10 cursor-pointer items-center rounded-r-lg bg-gray-50 p-2"
      >
        <button
          type="button"
          class="mb-11 flex items-center border-none outline-none"
        >
          {{ displayValue(selected) }}
          <Icon
            name="arrow-drop-down"
            class="h-5 w-5 text-gray-600"
            aria-hidden="true"
          />
        </button>
      </DropDown>
    </template>
  </VInput>
</template>

<script setup lang="ts">
import { NavItem } from '~~/composables/ui'
import VInput from './v-input.vue'
import DropDown from '../ui/drop-down.vue'
import Icon from '../ui/icon.vue'

// defines
const props = defineProps<{
  modelValue: unknown
  select: unknown
  options: any[]
  displayValue: (v: any) => string
  id: string
  label?: string
  required?: boolean
  tooltip?: string
}>()
const emit = defineEmits(['update:modelValue', 'update:select', 'error'])

// refs
const input = ref(props.modelValue)
const selected = ref(props.select)
const items = computed<NavItem[]>(() =>
  props.options.map((o) => ({
    title: props.displayValue(o),
    handler: () => (selected.value = o)
  }))
)

watch(input, (v) => emit('update:modelValue', v))
watch(selected, (v) => emit('update:select', v))
</script>
