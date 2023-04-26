import { Money } from './resources/finance'

const style = 'currency'
const locale = [...navigator.languages]

export const getCurrencySymbol = (currency: Money['currency']) => {
  return (
    new Intl.NumberFormat(locale, { style, currency })
      .formatToParts(0)
      .find(({ type }) => type === 'currency')?.value || ''
  )
}

export const toMoney = (money: Money) =>
  new Intl.NumberFormat(locale, {
    style,
    currency: money.currency
  }).format(money.amount)

export const decimalPlaces = (value: number, decimalPlaces: number) => {
  const denominator = Math.pow(10, decimalPlaces)
  return Math.round(value * denominator) / denominator
}
