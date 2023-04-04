<template>
  <div class="contents">
    <Title>Inventr</Title>
    <NuxtLayout />
    <Toasts />
    <LoadingToast />
  </div>
</template>

<script setup lang="ts">
import Toasts from './components/ui/toasts.vue'
import LoadingToast from './components/ui/loading-toast.vue'
</script>
