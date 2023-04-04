<template>
  <div
    class="contents"
    @dragenter="handleEnter"
    @dragover="handleEnter"
    @dragleave="handleLeave"
    @drop="handleDrop"
    ref="divRef"
  >
    <slot v-bind="{active, setActive: (v:boolean)=> active = v }"></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['enter', 'leave', 'drop'])

// refs
const active = ref(false)
const divRef = ref<HTMLDivElement>()

// methods
const handleEnter = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  emit('enter', e)
  active.value = true
}

const handleLeave = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  const relatedTarget = e.relatedTarget as HTMLElement
  if (divRef.value && !divRef.value.contains(relatedTarget)) {
    emit('leave', e)
    active.value = false
  }
}

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  e.stopPropagation()
  emit('drop', e)
  active.value = false
}
</script>
