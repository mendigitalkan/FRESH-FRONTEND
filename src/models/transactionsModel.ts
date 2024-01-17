import { IRootModel } from './rootModel'

export interface ITransactionsModel extends IRootModel {
  transactionId: string
  transactionPrice: number
  transactionOrderId: string
  transactionUserId: string
  transactionOngkirPrice: number
}

export interface ITransactionsUpdateRequestModel {
  transactionId: string
  transactionPrice?: number
  transactionOrderId?: string
  transactionUserId?: string
  transactionOngkirPrice?: number
}

export interface ITransactionsCreateRequestModel {
  transactionPrice: number
  transactionOrderId: string
  transactionUserId: string
  transactionOngkirPrice: number
}
