<template>
  <Carousel v-bind="props" v-slot="slotProps">
    <div @click="popUpOpen = true" class="contents cursor-zoom-in">
      <slot v-bind="{ ...slotProps, popUpOpen: false }"></slot>
    </div>
  </Carousel>
  <PopUp
    v-bind="{
      open: popUpOpen,
      title: '',
      description: '',
      size: 'full'
    }"
    @close="popUpOpen = false"
  >
    <Carousel v-bind="props" v-slot="slotProps" class="h-full w-full">
      <slot v-bind="{ ...slotProps, popUpOpen }"></slot>
    </Carousel>
  </PopUp>
</template>

<script setup lang="ts">
import Carousel from './carousel.vue'
import PopUp from './pop-up.vue'

export type CarouselPopUpSlot<T> = { item: T; popUpOpen: boolean }

// defines
const props = defineProps<{
  items: any[]
  hideDots?: boolean
  slideDuration?: number
}>()

// refs
const popUpOpen = ref(false)
</script>
