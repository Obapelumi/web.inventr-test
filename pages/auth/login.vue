<template>
  <div class="flex h-full w-full items-center justify-center">
    <Title>Login · Inventr</Title>
    <div
      class="mx-auto flex w-80 flex-col items-center rounded-xl bg-white p-10 shadow sm:w-96"
    >
      <div class="mb-8 flex flex-col items-center text-center">
        <Logo class="h-20 text-gray-700" />
        <h4 class="text-primary-700 mt-4 font-semibold">Welcome Back</h4>
      </div>
      <form
        class="flex w-full flex-col items-center space-y-6"
        @submit.prevent="handleSubmit"
      >
        <VInput
          id="username"
          label="Email"
          type="email"
          required
          v-model="credentials.username"
        />
        <VInput
          id="password"
          label="Password"
          type="password"
          required
          v-model="credentials.password"
        />
        <Btn class="Btn--primary w-full" v-bind="{ loading }"> LOGIN </Btn>

        <div class="my-4 text-sm">
          Don't have an account?
          <NuxtLink
            to="/signup"
            class="text-primary-400 my-4 text-center font-semibold"
          >
            Signup
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '~~/components/ui/logo.vue'
import { Auth } from '~~/composables/resources/auth'
import Btn from '~~/components/input/btn.vue'
import { FetchError } from 'ohmyfetch'
import VInput from '~~/components/input/v-input.vue'

// defines
definePageMeta({ middleware: ['guest'] })

// refs
const credentials = reactive({ username: '', password: '' })
const router = useRouter()
const loading = ref('')

// methods
const { addToast } = useToast()
const handleSubmit = async () => {
  try {
    loading.value = 'Login in...'
    await (useAuth().value = apiFetch<Auth>('auth/login', {
      method: 'post',
      body: { ...credentials, relations: userRelations }
    }))
    addToast({
      type: 'success',
      message: 'Welcome to Inventr',
      details: 'Login successful'
    })
    router.replace('/')
  } catch (error) {
    if (error instanceof FetchError) {
      const message =
        error.response?.status! >= 500
          ? 'There was an error on our end'
          : 'Invalid login credentials'
      addToast({ type: 'error', message })
    }
  } finally {
    loading.value = ''
  }
}
</script>
