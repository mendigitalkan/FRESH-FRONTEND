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
  productVariant?: string
}

export interface IProductCreateRequestModel {
  productName: string
  productDescription: string
  productImages: string
  productPrice: number
  productCategoryId: string
  productStock: number
  productVariant?: string
}
