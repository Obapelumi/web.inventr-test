<template>
  <Teleport :to="target" v-if="target" :disabled="!target || disabled">
    <slot></slot>
  </Teleport>
</template>

<script setup lang="ts">
// defines
const props = defineProps<{ to: string; disabled?: boolean }>()

// refs
const target = ref<Element>()

// hooks
onMounted(() => {
  const observer = new MutationObserver((mutations, observer) => {
    for (const mutation of mutations) {
      if (mutation.type !== 'childList') continue
      const el = document.querySelector(props.to)
      if (!el) continue
      target.value = el
      observer.disconnect()
      break
    }
  })
  observer.observe(document, { childList: true, subtree: true })
  return () => observer.disconnect()
})
</script>
