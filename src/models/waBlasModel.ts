import { IRootModel } from './rootModel'

export interface IWaBlasMode extends IRootModel {
  waBlasTitle: string
  waBlasMessage: string
}

export interface IWaBlasCreateRequestModel {
  waBlasTitle: string
  waBlasMessage: string
}
