import { User } from './people'
import { TimeStamps } from './base'

export type Company = {
  id: string
  name: string
  users?: User[]
  meta?: {
    patentCostsAmountSum: number | null
    ipPortfoliosBudgetSum: number | null
    patentsCount: number
  }
} & TimeStamps

export type IpPortfolio = {
  id: string
  name: string
  budget: number
  lockBudget: boolean
  patents?: Patent[]
  meta?: { patentCostsAmountSum: number | null; patentsCount: number }
} & TimeStamps

export type Patent = {
  id: string
  title: string
  patentNumber: string
  abstract: string
  applicant: string
  inventor: string
  publicationDate: string
  costs?: PatentCost[]
  meta?: { costsAmountSum: number | null }
} & TimeStamps

export const PATENT_COST_TYPES = ['filing', 'attorney'] as const
export type PatentCostType = (typeof PATENT_COST_TYPES)[number]

export const costTypeMap: Record<PatentCostType, string> = {
  filing: 'Patent Filing',
  attorney: 'Attorney Fees'
}

export type PatentCost = { id: string; type: PatentCostType; amount: number }

export type PatentSearch = {
  hasMore: boolean
  data: {
    title: string
    abstract: string
    patentNumber: string
    applicant: string
    inventor: string
    publicationDate: string
    saved: boolean
  }[]
}

export const EPO_SEARCH_PARAMS = [
  'publicationnumber',
  'inventorandapplicant',
  'titleandabstract'
] as const

export type EpoSearchParams = (typeof EPO_SEARCH_PARAMS)[number]
