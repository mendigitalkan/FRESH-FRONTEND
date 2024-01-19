import { IRootModel } from './rootModel'

export interface IOrdersModel extends IRootModel {
  orderId: string
  orderUserId: string
  orderProductId: string
  orderProductName: string
  orderProductPrice: number
  orderProductPhotos: string
  orderProductDescription: string
  orderStatus: 'waiting' | 'process' | 'delivery' | 'done' | 'cancel'
}

export interface IOrdersUpdateRequestModel {
  orderId: string
  orderUserId?: string
  orderProductId?: string
  orderProductName?: string
  orderProductPrice?: number
  orderProductPhotos?: string
  orderProductDescription?: string
  orderStatus?: 'waiting' | 'process' | 'delivery' | 'done' | 'cancel' | string
}
