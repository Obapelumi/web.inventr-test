import { apiFetch, ApiShow } from '../fetch'
import { useToast } from '../ui'
import { User } from './people'

export type Auth = { token: { type: 'bearer'; token: string }; user: User }

export const setAuth = (auth?: Auth) => {
  useCookie<string | undefined>('token').value = auth?.token.token
  useState<Auth | undefined>('auth').value = auth
}

export const userRelations = ['company']

export const useAuth = () =>
  computed({
    get: async (): Promise<Auth | undefined> => {
      if (process.server) return
      const auth = useState<Auth | undefined>('auth').value
      const token = useCookie<string | undefined>('token')
      if (typeof auth !== 'undefined' || !token.value) return auth
      try {
        const { data: user } = await apiFetch<ApiShow<User>>('me', {
          params: { 'relations[]': userRelations }
        })
        const newAuth: Auth = {
          token: { type: 'bearer', token: token.value },
          user
        }
        useAuth().value = promisify(newAuth)
        return newAuth
      } catch (error) {
        useAuth().value = promisify(undefined)
        return undefined
      }
    },
    set: async (authPromise) => {
      const auth = await authPromise
      useCookie<string | undefined>('token').value = auth?.token.token
      useState<Auth | undefined>('auth').value = auth
    }
  })

const promisify = async <T>(v: T) => v

export const useLogout = () => {
  apiFetch('oauth/logout', { method: 'post' })
  useAuth().value = promisify(undefined)
  const { addToast } = useToast()
  addToast({ type: 'info', message: 'Logged out' })
  return navigateTo('/auth/login')
}
