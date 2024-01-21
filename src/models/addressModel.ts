import { IRootModel } from './rootModel'

export interface IAddressesModel extends IRootModel {
  addressId: string
  addressUserId: string
  addressName: string
  addressDetail: string
  addressPostalCode: string
  addressProvinsi: string
  addressKabupaten: string
  addressKecamatan: string
}

export interface IAddressesCreateRequestModel {
  addressUserId: string
  addressName: string
  addressDetail: string
  addressPostalCode: string
  addressProvinsi: string
  addressKabupaten: string
  addressKecamatan: string
}

export interface IAddressesUpdateRequestModel {
  addressId?: string
  addressUserId?: string
  addressName?: string
  addressDetail?: string
  addressPostalCode?: string
  addressProvinsi?: string
  addressKabupaten?: string
  addressKecamatan?: string
}
