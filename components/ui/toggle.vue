<template>
  <Switch
    v-model="localValue"
    :class="localValue ? 'bg-primary-100' : 'bg-gray-200'"
    class="relative inline-flex h-[17px] w-[38px] flex-shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <span class="sr-only">{{ label }}</span>
    <span
      aria-hidden="true"
      :class="
        localValue
          ? 'translate-x-6 bg-primary-500'
          : 'translate-x-0 bg-gray-300'
      "
      class="pointer-events-none inline-block h-[17px] w-[17px] transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
    ></span>
  </Switch>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'

const props = defineProps<{ label: string; modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

// refs
const localValue = ref(props.modelValue)

watch(localValue, (v) => {
  emit('update:modelValue', v)
})
</script>
