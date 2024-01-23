/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRootModel } from './rootModel'

export interface IProductModel extends IRootModel {
  productId: string
  productName: string
  productDescription: string
  productImages: string
  productPrice: number
  productCategoryId: string
  productTotalSale: number
  productStock: number
  productDiscount: number
  productCondition: 'Baru' | 'Bekas'
  productWeight: number
  productVariant: string
}

export interface IProductUpdateRequestModel {
  productId: string
  productName?: string
  productDescription?: string
  productImages?: string
  productPrice?: number
  productCategoryId?: string
  productTotalSale?: number
  productStock?: number
  productDiscount?: number
  productCondition: 'Baru' | 'Bekas' | string
  productWeight?: number
  productVariant?: any
}

export interface IProductCreateRequestModel {
  productName: string
  productDescription: string
  productImages: string
  productPrice: number
  productCategoryId: string
  productStock: number
  productDiscount?: number
  productCondition: 'Baru' | 'Bekas' | string
  productWeight: number
  productVariant?: any
}
