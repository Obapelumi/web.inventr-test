<template>
  <li
    ref="tabRef"
    :class="[
      'relative mr-4 flex cursor-pointer items-center px-3 pb-2 text-sm transition-all duration-500 ease-in-out',
      isActive
        ? 'text-primary-500 font-medium'
        : 'hover:border-primary-300 text-gray-500 hover:text-gray-700'
    ]"
  >
    <div
      :class="[
        'absolute bottom-0 left-0 right-0 mx-auto w-4',
        isActive && 'border-primary-400 border-b-2'
      ]"
    ></div>
    <slot>
      <Icon
        v-if="tab.icon"
        :name="tab.icon"
        :class="[
          'mr-1 h-5 w-5',
          `${isActive ? 'text-primary-500' : 'text-gray-500'}`
        ]"
      />
    </slot>
    {{ tab.title }}
  </li>
</template>

<script setup lang="ts">
import { NavItem } from '~~/composables/ui'
import Icon from './icon.vue'

defineProps<{ tab: NavItem; isActive: boolean }>()
const emit = defineEmits(['updateWidth'])

const tabRef = ref<HTMLLIElement>()

watchEffect(() => {
  if (!tabRef.value) return
  const width = tabRef.value.getBoundingClientRect().right ?? 0
  emit('updateWidth', width)
})
</script>
