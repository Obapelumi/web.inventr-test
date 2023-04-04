<template>
  <LoadingFullscreen />
</template>

<script setup lang="ts">
import LoadingFullscreen from '~~/components/ui/loading-fullscreen.vue'

// defines
definePageMeta({ middleware: ['auth'] })

onBeforeMount(async () => {
  if (process.server) return
  const auth = await useAuth().value
  console.log(auth)
  if (!auth?.token) return navigateTo('/auth/login')
  navigateTo('/dashboard')
})
</script>
