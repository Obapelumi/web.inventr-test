<template>
  <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
    <div
      v-for="stat in stats"
      :class="[
        'flex flex-col space-y-2 rounded-lg  p-4 shadow-sm',
        stat.type === 'error'
          ? 'bg-red-50 text-red-700'
          : stat.type === 'success'
          ? 'bg-green-50 text-green-700 shadow-green-100'
          : stat.type === 'warning'
          ? 'bg-yellow-50 text-yellow-500'
          : 'bg-white text-gray-600'
      ]"
    >
      <span class="text-lg font-semibold">{{ stat.title }}</span>
      <span class="text-xl">{{ stat.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Stat } from '~~/composables/resources/base'

// defines
defineProps<{
  stats: Stat[]
}>()
</script>
