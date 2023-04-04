<template>
  <img v-if="src" v-bind="{ ...$attrs, src }" class="rounded-full" />
  <Icon
    v-else
    name="user-circle-solid"
    v-bind="{ ...$attrs }"
    class="text-gray-300"
  />
</template>

<script setup lang="ts">
import Icon from './icon.vue'

// defines
const props = defineProps<{ src?: string }>()
</script>
