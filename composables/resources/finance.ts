import { Currency } from './base'

export type Money = { amount: number; currency: Currency }

export const currencies = ['NGN', 'USD', 'GBP', 'EUR'] as const
