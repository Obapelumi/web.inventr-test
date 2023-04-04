<template>
  <TeleportWrapper to="body">
    <TransitionRoot appear :show="open" as="template">
      <Dialog as="div" @close="autoClose" class="relative z-40">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
          />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                :class="[
                  'relative w-full transform space-y-4 overflow-hidden rounded-2xl p-4 text-left align-middle transition-all',
                  size === 'full'
                    ? 'h-[calc(100vh-2rem)] w-screen'
                    : 'max-w-md bg-white shadow-xl'
                ]"
              >
                <DialogTitle
                  as="h3"
                  class="text-center text-lg font-medium leading-6 text-gray-900"
                >
                  <button
                    v-if="size === 'full' || showX"
                    @click="emit('close')"
                    :class="[
                      'hover:bg-primary-50 hover:text-primary-500 !absolute box-border flex justify-end rounded-full bg-white bg-opacity-50 p-1 text-gray-600 transition focus:outline-none',
                      size === 'full' ? 'right-2 top-0' : 'right-4 top-2'
                    ]"
                    type="button"
                    tooltip="Close"
                    tooltip-left
                  >
                    <Icon name="x" class="h-6 w-6 text-gray-600" />
                  </button>
                  <slot name="title">{{ title }}</slot>
                </DialogTitle>
                <div class="flex h-full w-full justify-center text-center">
                  <slot>
                    <p class="text-sm text-gray-500" v-if="description">
                      {{ description }}
                    </p>
                  </slot>
                </div>

                <div class="flex items-center justify-center space-x-2">
                  <slot name="buttons">
                    <button
                      v-for="button in buttons || []"
                      type="button"
                      :class="[
                        button.alt ? 'Btn__alt' : 'Btn',
                        button.loading ? 'cursor-progress opacity-50' : ''
                      ]"
                      :disabled="button.loading"
                      @click="button.handler"
                    >
                      {{ button.text }}
                    </button>
                  </slot>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
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
  DialogOverlay,
  DialogTitle
} from '@headlessui/vue'
import TeleportWrapper from './teleport-wrapper.vue'
import Icon from './icon.vue'
export type PopUpButton = {
  text: string
  handler: () => void
  loading?: boolean
  alt?: boolean
}

// defines
const props = defineProps<{
  open: boolean
  title?: string
  description?: string
  staticBackDrop?: boolean
  buttons?: PopUpButton[]
  size?: 'small' | 'full'
  showX?: boolean
}>()
const emit = defineEmits(['open', 'close', 'confirm'])

// methods
const autoClose = () => {
  if (props.staticBackDrop === true) return
  emit('close')
}
</script>
