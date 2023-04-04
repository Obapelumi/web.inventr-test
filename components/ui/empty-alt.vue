<template>
  <div
    class="flex w-full items-center space-x-4 rounded-xl bg-gray-50 p-3 text-gray-500 hover:bg-primary-50"
  >
    <Icon name="info-circle" class="h-6 w-6" />
    <span class="text-sm">{{ message ?? 'No data yet' }}</span>
  </div>
</template>

<script setup lang="ts">
import Icon from './icon.vue'
defineProps<{ message?: string }>()
</script>
