<template>
  <embed
    v-if="isPdf(name)"
    v-bind="embedProps"
    :src="`${url}#toolbar=0&navpanes=0&scrollbar=0`"
  />
  <img v-else v-bind="imgProps" :src="url" />
</template>

<script setup lang="ts">
import { HTMLAttributes } from 'vue'

// defines
defineProps<{
  name: string
  url: string
  imgProps?: HTMLAttributes
  embedProps?: HTMLAttributes
}>()
</script>
