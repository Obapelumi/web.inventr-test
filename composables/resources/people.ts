import { Company } from './portfolio'
import { TimeStamps } from './base'

export type User = {
  id: string
  name: string
  email: string
  company?: Company
} & TimeStamps

export type UserFormT = { name: string; email: string }

export const defaultUser: UserFormT = { name: '', email: '' }
