<template>
  <div class="flex items-center space-x-3 text-gray-500">
    <RouterLink
      v-for="(crumb, i) in crumbs"
      custom
      :to="crumb.path"
      v-slot="{ isExactActive }"
    >
      <NuxtLink :to="crumb.path">
        <div
          :class="[
            'flex cursor-pointer items-center space-x-3',
            isExactActive ? 'font-semibold text-primary-400' : ''
          ]"
        >
          <span
            class="w-full truncate whitespace-normal text-sm hover:text-primary-300"
          >
            {{ crumb.title }}
          </span>
          <Icon
            v-if="i !== crumbs.length - 1"
            name="chevron-right"
            class="h-4 w-4"
          />
        </div>
      </NuxtLink>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { NavItem } from '~~/composables/ui'
import Icon from './icon.vue'

//defines
defineProps<{ crumbs: NavItem[] }>()
</script>
