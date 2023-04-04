<template>
  <DragDropContainer @drop="handleDrop" v-slot="{ active }">
    <div class="flex flex-col space-y-2" v-bind="$attrs">
      <div v-if="label" class="flex items-center text-xs">
        {{ label }}
        <span v-if="required" class="ml-1 text-red-500">*</span>
      </div>
      <label v-bind="$attrs" class="relative w-full cursor-pointer">
        <slot v-bind="{ active, fileUrl, error }"></slot>
        <input
          v-bind="{ required }"
          type="file"
          class="hidden"
          @input="handleInput"
          @invalid.prevent="onInvalid"
          @change="onInvalid"
          ref="input"
        />
      </label>
      <InputError :error="error" />
    </div>
  </DragDropContainer>
</template>

<script setup lang="ts">
import InputError from './input-error.vue'
import DragDropContainer from '../ui/drag-drop-container.vue'

// defines
const props = defineProps<{
  label?: string
  modelValue?: { file?: File; fileUrl: string }
  required?: boolean
}>()
const emit = defineEmits(['update:modelValue', 'error'])

// refs
const fileUrl = ref(props.modelValue?.fileUrl)
const input = ref()
const error = ref()

// methods
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  const file = e.dataTransfer.files && e.dataTransfer.files[0]
  handleFile(file)
}
const handleInput = (e: Event) => {
  const currentTarget = e.currentTarget as HTMLInputElement
  const file = currentTarget.files && currentTarget.files[0]
  if (!file) return
  handleFile(file)
  input.value.value = null
}
const handleFile = (file: File) => {
  fileUrl.value = URL.createObjectURL(file)
  emit('update:modelValue', { file, fileUrl: fileUrl.value })
}
const onInvalid = (e) => (error.value = validateInput(e))

// watchers
watchEffect(() => {
  emit('error', error.value)
})
</script>
