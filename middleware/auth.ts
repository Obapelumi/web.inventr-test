export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return
  const token = useCookie<string | undefined>('token')
  if (!token) return navigateTo('/auth/login')
})
