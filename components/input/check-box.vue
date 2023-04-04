<template>
  <label class="cursor-pointer">
    <div
      :class="[
        'flex h-5 w-5 items-center justify-center rounded',
        isSelected
          ? 'border-[1.5px] border-primary-500'
          : 'border-2 border-gray-300'
      ]"
    >
      <Icon name="check" class="h-4 text-primary-500" v-if="isSelected" />
    </div>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
import Icon from '../ui/icon.vue'

// defines
const props = defineProps<{ selected: unknown[]; value: unknown }>()

// refs
const isSelected = computed<boolean>(() => props.selected.includes(props.value))
</script>
