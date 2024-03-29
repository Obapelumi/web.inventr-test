<template>
  <div class="relative flex w-full flex-col text-sm text-gray-600">
    <label
      :for="id"
      :class="[
        'absolute -top-2 left-2 mb-2 flex h-4 items-center bg-white px-2 text-xs',
        isFocused ? 'text-primary-500' : ''
      ]"
      >{{ label }}
      <span v-if="required" class="ml-1 text-red-500">*</span>
      <div v-if="tooltip" v-bind="{ tooltip }">
        <Icon name="question-circle-fill" class="ml-2 h-4 w-4 cursor-pointer" />
      </div>
    </label>
    <textarea
      v-bind="$attrs"
      :id="id"
      :required="required"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @invalid.prevent="onInvalid"
      @change="onInvalid"
      @focus="isFocused = true"
      @blur="isFocused = false"
      ref="input"
      class="focus:outline-primary-500 w-full rounded border border-gray-200 py-2 text-gray-500"
    ></textarea>
    <div class="absolute left-0 top-6 h-11 w-fit" ref="prepend">
      <slot name="prepend"></slot>
    </div>
    <div class="absolute right-0 top-6 h-11 w-fit" ref="append">
      <slot name="append"></slot>
    </div>
    <InputError :error="error" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import InputError from './input-error.vue'
import Icon from '../ui/icon.vue'

// defines
const props = defineProps<{
  modelValue?: string | number | string[]
  id: string
  label: string
  required?: boolean
  tooltip?: string
}>()
const emit = defineEmits(['update:modelValue', 'error'])

// refs
const error = ref()
const append = ref<HTMLElement>()
const prepend = ref<HTMLElement>()
const input = ref<HTMLElement>()
const isFocused = ref(false)

// methods
const onInvalid = (e) => (error.value = validateInput(e))

// watchers
watchEffect(() => {
  emit('error', error.value)
})
watchEffect(() => {
  if (!input.value) return
  if (append.value) {
    const rect = append.value.getBoundingClientRect()
    input.value.style.paddingRight = `${rect.width + 8}px`
  }
  if (prepend.value) {
    const rect = prepend.value.getBoundingClientRect()
    input.value.style.paddingLeft = `${rect.width + 8}px`
  }
})
</script>
