<template>
  <div class="h-screen w-full bg-slate-100 px-4 lg:px-10">
    <div class="flex h-full flex-col" v-if="auth">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center space-x-4">
          <NuxtLink
            class="cursor-pointer"
            to="/dashboard"
            aria-label="Dashboard Home"
          >
            <Logo class="h-12" />
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <slot name="rightHeader"></slot>
          <DropDown :items="profileItems" id="title" label="Avatar menu">
            <Avatar
              :alt="auth.user.name || 'user image'"
              class="h-12 w-12 cursor-pointer rounded-full"
            />
          </DropDown>
        </div>
      </div>
      <NuxtPage />
    </div>
    <LoadingFullscreen v-else />
  </div>
</template>

<script setup lang="ts">
import Avatar from '~~/components/ui/avatar.vue'
import DropDown from '~~/components/ui/drop-down.vue'
import LoadingFullscreen from '~~/components/ui/loading-fullscreen.vue'
import Logo from '~~/components/ui/logo.vue'
import { Auth } from '~~/composables/resources/auth'
import { NavItem } from '~~/composables/ui'

// refs
const auth = ref<Auth>()
const profileItems: NavItem[] = [
  {
    title: 'Logout',
    handler: useLogout,
    icon: 'logout',
    loading: false
  }
]

// hooks
onBeforeMount(async () => {
  auth.value = await useAuth().value
})

provide('auth', auth)
</script>
