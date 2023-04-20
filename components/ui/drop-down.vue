<template>
  <Menu as="div" class="flex flex-col items-end">
    <MenuButton v-slot="{ open }" class="flex items-center" :aria-label="label">
      <div ref="reference">
        <slot v-bind="{ open }"></slot>
      </div>
    </MenuButton>

    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="relative focus:outline-none">
        <div
          ref="floating"
          class="z-20 w-48 divide-y divide-gray-100 rounded-[4px] bg-white font-medium shadow-lg"
        >
          <MenuItem as="div" v-for="item in items" v-slot="{ close }">
            <NuxtLink v-if="item.to" :to="item.to" @click="close()">
              <DropDownItem :item="item" />
            </NuxtLink>
            <DropDownItem v-else :item="item" @click="() => item.handler?.()" />
          </MenuItem>
        </div>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<script setup lang="ts">
import { Placement } from '@floating-ui/dom'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { NavItem } from '~~/composables/ui'
import DropDownItem from './drop-down-item.vue'

// defines
const props = defineProps<{
  items: NavItem[]
  placement?: Placement
  label?: string
}>()

// refs
const [reference, floating] = useFloating(props.placement || 'bottom-end')

// methods
// const onItemClick = (handler?: NavItem['handler']) => {

// }
</script>
