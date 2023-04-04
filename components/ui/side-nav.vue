<template>
  <RouterLink
    v-for="tab in tabs"
    custom
    :to="tab.path"
    v-slot="{ isExactActive }"
  >
    <NuxtLink
      :to="tab.path"
      :class="[
        'py-3 px-6 transition-all hover:bg-primary-50 hover:text-primary-400',
        isExactActive
          ? 'border-l-2 border-primary-500 bg-primary-50 font-semibold text-primary-400'
          : 'text-gray-600'
      ]"
    >
      {{ tab.title }}
    </NuxtLink>
  </RouterLink>
</template>

<script setup lang="ts">
import { NavItem } from '~~/composables/ui'

defineProps<{ tabs: NavItem[] }>()
</script>
