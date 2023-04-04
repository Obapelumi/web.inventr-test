<template>
  <TeleportWrapper to="#slideModalHeader">
    <Title>{{ title }}</Title>
    <div class="flex items-center space-x-3">
      <h3 class="text-xl font-semibold capitalize tracking-wide max-w-md text-gray-600">
        {{ title }}
      </h3>
      <slot></slot>
    </div>
  </TeleportWrapper>
</template>

<script setup lang="ts">
import TeleportWrapper from './teleport-wrapper.vue'

// defines
defineProps<{ title: string }>()
</script>
