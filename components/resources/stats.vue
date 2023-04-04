<template>
  <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
    <div
      v-for="stat in stats"
      class="flex flex-col space-y-2 rounded-lg bg-white p-4 shadow-sm"
    >
      <h3 class="text-lg font-semibold text-gray-500">{{ stat.title }}</h3>
      <span class="text-xl text-gray-700">{{ stat.value }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// defines
defineProps<{ stats: { title: string; value: unknown }[] }>()
</script>
