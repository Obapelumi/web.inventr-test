<template>
  <Combobox
    v-model="selected"
    @select="emit('select', selected)"
    v-bind="{ multiple, nullable: true }"
  >
    <div class="relative text-sm">
      <div
        class="relative w-full overflow-hidden text-left text-sm"
        ref="reference"
      >
        <ComboboxInput
          class="h-11 w-full rounded border border-gray-200 p-2 pr-8 text-gray-500 focus:outline-gray-300"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          v-bind="{ ...$attrs, displayValue, required, id }"
          @change="onChange"
          @invalid.prevent="onInvalid"
          @focus="isFocused = true"
          @blur="isFocused = false"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex h-11 items-center pr-2"
        >
          <TwSpinner v-if="loading" class="mr-4 h-5 w-5 text-gray-500" />
          <Icon
            v-else
            name="chevron-down"
            :class="['h-5 w-5', isFocused ? 'text-gray-800' : 'text-gray-600']"
            aria-hidden="true"
          />
        </ComboboxButton>
      </div>
      <label
        :for="id"
        :class="[
          'absolute -top-2 left-2 mb-2 flex h-4 items-center bg-white px-2 text-xs',
          isFocused ? 'text-gray-600' : ''
        ]"
        >{{ label }}
        <span v-if="required" class="ml-1 text-red-500">*</span>
        <div v-if="tooltip" v-bind="{ tooltip }">
          <Icon
            name="question-circle-fill"
            class="ml-2 h-4 w-4 cursor-pointer"
          />
        </div>
      </label>
      <InputError :error="error" />
      <TransitionRoot
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions>
          <div
            ref="floating"
            class="z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div
              v-if="filteredOptions.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-gray-700"
            >
              Nothing found.
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              as="template"
              :value="option"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none py-2 pl-10 pr-4"
                :class="{
                  'bg-gray-100 text-gray-600': active,
                  'text-gray-600': !active
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ displayValue(option) }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-600"
                >
                  <Icon name="check" class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </div>
        </ComboboxOptions>
      </TransitionRoot>
      <slot></slot>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot
} from '@headlessui/vue'
import Icon from '../ui/icon.vue'
import TwSpinner from '../ui/tw-spinner.vue'
import InputError from './input-error.vue'

// defines
const props = defineProps<{
  modelValue?: unknown
  displayValue: (v: any) => string
  searchValue: (v: any) => string
  selectedValue?: (v: any) => unknown
  options: any[]
  id: string
  label: string
  required?: boolean
  tooltip?: string
  loading?: boolean
  multiple?: boolean
}>()
const emit = defineEmits(['update:modelValue', 'error', 'search', 'select'])

// refs
const [reference, floating] = useFloating()
const defaultSelected = props.selectedValue
  ? props.options.find((o) => props.selectedValue?.(o) === props.modelValue)
  : props.modelValue
const selected = ref(defaultSelected)
const query = ref('')
const error = ref()
const filteredOptions = computed(() =>
  query.value === ''
    ? props.options
    : props.options.filter((option) =>
        props
          .searchValue(option)
          .toLowerCase()
          .replace(/\s+/g, '')
          .match(query.value.toLowerCase().replace(/\s+/g, ''))
      )
)
const isFocused = ref(false)

// methods
const onInvalid = (e: any) => {
  error.value = validateInput(e)
}
const onChange = (e: any) => {
  query.value = e.target.value
  onInvalid(e)
}

// watchers
watchEffect(() => {
  emit(
    'update:modelValue',
    props.selectedValue?.(selected.value) ?? selected.value
  )
  emit('error', error.value)
})
watch(query, (v) => {
  if (filteredOptions.value.length < 1) emit('search', v)
})
</script>
