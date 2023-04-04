<template>
  <TeleportWrapper to="body">
    <TransitionRoot appear :show="open" as="template">
      <Dialog as="div" @close="autoClose" class="relative z-30">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
          ></div>
        </TransitionChild>

        <TransitionChild as="template" v-bind="transition">
          <DialogPanel
            :class="[
              'fixed flex h-screen transform flex-col overflow-auto bg-white shadow-xl transition-all',
              position
            ]"
            v-bind="$attrs"
          >
            <DialogTitle
              as="div"
              class="relative flex flex-col p-5 text-gray-900 sm:pl-8"
            >
              <button
                @click="emit('close')"
                class="hover:bg-primary-50 hover:text-primary-500 !absolute right-6 top-6 box-border flex justify-end rounded-full p-1 text-gray-600 transition focus:outline-none"
                type="button"
                tooltip="Close"
              >
                <Icon name="x" class="h-4 w-4" />
              </button>
              <slot name="title">
                <div id="slideModalHeader" class="contents">
                  <div class="contents" v-if="title">
                    <h3 class="max-w-md text-xl font-semibold tracking-wide">
                      {{ title }}
                    </h3>
                    <Title>{{ title }} · Inventr</Title>
                  </div>
                </div>
              </slot>
            </DialogTitle>
            <DialogDescription as="div" class="h-full">
              <slot>
                <div class="mt-2" v-if="description">
                  <p class="text-sm text-gray-500">
                    {{ description }}
                  </p>
                </div>

                <div class="mt-4" v-if="buttonText">
                  <button type="button" class="Btn" @click="emit('confirm')">
                    {{ buttonText }}
                  </button>
                </div>
              </slot>
            </DialogDescription>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>
  </TeleportWrapper>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription
} from '@headlessui/vue'
import Icon from './icon.vue'
import TeleportWrapper from './teleport-wrapper.vue'

// defines
const props = defineProps<{
  open: boolean
  title?: string
  description?: string
  buttonText?: string
  staticBackDrop?: boolean
  slideFrom?: 'right' | 'left' | 'bottom'
}>()
const emit = defineEmits(['open', 'close', 'confirm'])

// refs
const transitionMap = {
  right: {
    enterFrom: 'translate-x-full',
    enterTo: 'translate-x-0',
    leaveFrom: 'translate-x-0',
    leaveTo: 'translate-x-full'
  },
  left: {
    enterFrom: '-translate-x-full',
    enterTo: 'translate-x-0',
    leaveFrom: 'translate-x-0',
    leaveTo: '-translate-x-full'
  },
  bottom: {
    enterFrom: 'translate-y-full',
    enterTo: 'translate-y-0',
    leaveFrom: 'translate-y-0',
    leaveTo: 'translate-y-full'
  }
}
const transition = {
  enter: 'duration-500 ease-out',
  leave: 'duration-300 ease-in',
  ...transitionMap[props.slideFrom || 'right']
}
const positionMap = {
  right: 'top-0 right-0 min-w-[90vw] sm:min-w-[34.375rem] h-screen',
  left: 'top-0 left-0 sm:w-[72vw] sm:max-w-[34.375rem] h-screen',
  bottom: 'bottom-0 left-0 h-[72vh] max-h-[34.375rem] w-screen rounded-t-3xl'
}
const position = positionMap[props.slideFrom || 'right']

// methods
const autoClose = () => {
  if (props.staticBackDrop === true) return
  emit('close')
}
</script>
