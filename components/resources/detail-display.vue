<template>
  <div class="relative flex flex-col space-y-2">
    <span class="text-sm font-medium text-gray-500">{{ title }}</span>
    <div class="text-xs text-gray-700"><slot></slot></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ title: string }>()
</script>
