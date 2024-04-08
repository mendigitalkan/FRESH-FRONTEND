import { IProductModel } from './productsModel'
import { IRootModel } from './rootModel'

export interface IOrdersModel extends IRootModel {
  orderId: string
  orderUserId: string
  orderProductId: string
  orderProductPrice: number
  orderTotalProductPrice: number
  orderOngkirPrice: number
  orderProductSizeSelected: string
  orderProductColorSelected: string
  orderTotalItem: number
  orderStatus: 'waiting' | 'process' | 'delivery' | 'done' | 'cancel' | string
  product: IProductModel
}

export interface IOrdersUpdateRequestModel {
  orderId?: string
  orderUserId?: string
  orderProductId?: string
  orderProductPrice?: number
  orderTotalProductPrice?: number
  orderOngkirPrice?: number
  orderProductSizeSelected?: string
  orderProductColorSelected?: string
  orderTotalItem?: number
  orderStatus?: 'waiting' | 'process' | 'delivery' | 'done' | 'cancel' | string
}
