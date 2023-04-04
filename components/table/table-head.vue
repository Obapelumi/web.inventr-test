<template>
  <td
    :class="['px-4 text-left', mobile ? 'table-cell' : 'hidden lg:table-cell']"
    v-bind="$attrs"
  >
    <slot></slot>
  </td>
</template>

<script setup lang="ts">
// defines
const props = defineProps<{ mobile?: boolean }>()
</script>
