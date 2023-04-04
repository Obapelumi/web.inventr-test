<template>
  <div class="my-4 flex h-full w-full items-center justify-center">
    <div
      class="mx-auto flex w-80 flex-col items-center rounded-xl bg-white p-10 shadow sm:w-96"
    >
      <div class="mb-8 flex flex-col items-center text-center">
        <Logo class="h-20 text-gray-700" />
        <h4 class="text-primary-700 mt-4 font-semibold">Welcome To Inventr</h4>
      </div>
      <form
        class="flex w-full flex-col items-center space-y-6"
        @submit.prevent="handleSubmit"
      >
        <VInput
          v-model="credentials.name"
          id="name"
          label="Name"
          class="w-full"
          required
        />
        <VInput
          v-model="credentials.email"
          id="email"
          label="Email"
          type="email"
          class="w-full"
          required
        />

        <VInput
          v-model="credentials.companyName"
          id="companyName"
          label="Company Name"
          class="w-full"
          required
        />

        <VInput
          v-model="credentials.password"
          id="password"
          label="Password"
          type="password"
          class="w-full"
          required
        />

        <div class="flex w-full justify-center">
          <Btn v-bind="{ loading }" class="Btn--primary w-full">SUBMIT</Btn>
        </div>
      </form>
      <div class="my-4 text-sm">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="text-primary-400 my-4 text-center font-semibold"
        >
          Login
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Btn from '~~/components/input/btn.vue'
import VInput from '~~/components/input/v-input.vue'
import Logo from '~~/components/ui/logo.vue'
import { Auth } from '~~/composables/resources/auth'

// defines
definePageMeta({ middleware: ['guest'] })

// refs
const router = useRouter()
const loading = ref('')
const credentials = reactive({
  name: '',
  email: '',
  password: '',
  companyName: ''
})

// methods
const { addToast } = useToast()
const handleSubmit = async () => {
  try {
    loading.value = 'Submitting...'
    await (useAuth().value = apiFetch<Auth>('users', {
      method: 'post',
      body: { ...credentials, relations: userRelations }
    }))
    router.replace('/')
    addToast({
      type: 'success',
      message: 'Welcome to Inventr',
      details: 'Sign up successful'
    })
  } catch (error) {
    addToast({
      type: 'error',
      message: 'there was an error from our end',
      details: 'Check username/password and try again'
    })
  } finally {
    loading.value = ''
  }
}
</script>
