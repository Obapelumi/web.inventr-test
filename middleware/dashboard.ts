export default defineNuxtRouteMiddleware(async (...args) => {
  if (process.server) return
  const auth = await useAuth().value
  if (!auth?.token) return navigateTo('/auth/login')
  const roles = new Set(auth.user.roles?.map((r) => r.type))
  if (roles.has('admin') || roles.has('owner') || roles.has('pm'))
    return navigateTo('/properties')
  if (roles.has('tenant')) return navigateTo('/tenant')
  return await useLogout()
})
