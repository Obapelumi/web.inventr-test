<template>
  <td
    :class="[
      'px-6 py-4 text-sm font-normal capitalize text-gray-500',
      mobile ? 'table-cell' : 'hidden lg:table-cell'
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </td>
</template>

<script setup lang="ts">
// defines
defineProps<{ mobile?: boolean }>()
</script>
