<template>
  <PopUp v-bind="popUp" @close="emit('canceled')">
    <template #buttons>
      <Btn
        type="button"
        class="Btn--primary w-32"
        @click="doDelete"
        :loading="deleting"
      >
        Delete
      </Btn>
      <button type="button" class="Btn Btn--alt w-32" @click="emit('canceled')">
        Cancel
      </button>
    </template>
  </PopUp>
</template>

<script setup lang="ts">
import PopUp from '../ui/pop-up.vue'
import Btn from '../input/btn.vue'

// defines
const props = defineProps<{
  item?: unknown
  name: (item: unknown) => string
  deleteFn: (item: unknown) => void | Promise<void>
}>()
const emit = defineEmits(['canceled', 'deleted'])

// refs
const deleting = ref('')

const popUp = reactive({
  open: false,
  title: '',
  description: ''
})

// methods
const { addToast } = useToast()
const doDelete = async () => {
  try {
    deleting.value = 'Deleting...'
    await props.deleteFn(props.item)
    addToast({ type: 'info', message: `Deleted ${props.name(props.item)}` })
    emit('deleted')
  } catch (error) {
  } finally {
    deleting.value = ''
  }
}

// watchers
watch(
  props,
  ({ item, name }) => {
    if (item) {
      popUp.open = true
      popUp.title = `Delete ${name(item)}`
      popUp.description = `Are you sure you want to delete ${name(item)}?`
    } else {
      popUp.open = false
    }
  },
  { immediate: true, deep: true }
)
</script>
