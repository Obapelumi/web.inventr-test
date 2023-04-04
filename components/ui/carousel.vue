<template>
  <div class="group relative text-white">
    <button
      v-if="index > 0"
      type="button"
      class="Btn__carousel left-2"
      @click="index--"
    >
      <Icon name="chevron-left" class="h-5" />
    </button>
    <div
      v-for="(item, i) in items"
      :class="[
        'transition-all',
        i === index
          ? 'z-0 translate-x-0 opacity-100'
          : 'absolute top-0 left-0 -z-10 opacity-0',
        i > index ? 'translate-x-full' : '',
        i < index ? '-translate-x-full' : ''
      ]"
    >
      <slot v-bind="{ item }"></slot>
    </div>
    <button
      v-if="index + 1 < items.length"
      type="button"
      class="Btn__carousel right-2"
      @click="index++"
    >
      <Icon name="chevron-right" class="h-5" />
    </button>
    <div
      v-if="!hideDots && items.length > 1"
      class="absolute bottom-2 left-0 right-0 mx-auto flex max-w-fit items-center space-x-2 rounded-r-full rounded-l-full bg-gray-500 bg-opacity-40 p-1.5 opacity-0 transition-all group-hover:opacity-100 group-focus:opacity-100"
    >
      <button
        v-for="(_item, i) in items"
        @click="index = i"
        type="button"
        :class="[
          'h-2 w-2 rounded-full border border-white',
          i === index ? 'bg-white' : ''
        ]"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from './icon.vue'

//types
export type CarouselProps = {
  items: any[]
  hideDots?: boolean
  slideDuration?: number
}
export type CarouselSlot<T = any> = { item: T; popUpOpen: boolean }

// defines
const props = defineProps<CarouselProps>()

// refs
const index = ref(0)
const interval = ref<NodeJS.Timer>()

// hooks
onMounted(() => {
  autoSlide()
  return cleanup
})

// methods
const autoSlide = () => {
  if (!props.slideDuration) return
  interval.value = setInterval(() => {
    if (index.value >= props.items.length - 1) {
      index.value = 0
    } else {
      index.value++
    }
  }, props.slideDuration)
}
const cleanup = () => {
  if (interval.value) {
    clearInterval(interval.value)
  }
}

// watchers
watchEffect(() => {
  if (props.items.length <= index.value && index.value > 0) {
    index.value = 0
  }
})
</script>
