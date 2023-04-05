import dayjs from 'dayjs'
import { currencies } from './finance'

export const formatDate = (date: string, format: 'l' | 's') => {
  const formatMap = { l: LONG_DATE_FORMAT, s: SHORT_DATE_FORMAT }
  return dayjs(date).format(formatMap[format])
}

export const toPercentage = (value: number) =>
  String((Math.round(value * 100) / 100) * 100) + '%'

export type TimeStamps = {
  createdAt: string
  updatedAt: string
}

/**
 * Units
 */
export type TimeUnit =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond'
export type Duration = { value: number; unit: TimeUnit }
export type Currency = (typeof currencies)[number]
export type Money = { amount: number; currency: Currency }

export const LONG_DATE_FORMAT = 'dddd, D MMMM YYYY'
export const SHORT_DATE_FORMAT = 'D-MMM-YYYY'

export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150'

export type Stat = {
  title: string
  value: unknown
  type?: 'error' | 'warning' | 'success'
}
