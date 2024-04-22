import { IRootModel } from './rootModel'

export interface IUserModel extends IRootModel {
  userId: string
  userName: string
  userEmail: string
  userPassword: string
  userWhatsAppNumber: string
  userWhatsAppNumberVerified: boolean
  userPhoto: string
  userRole: 'user' | 'admin' | 'superAdmin'
  userCoin: number
  userFcmId: string
  userPartnerCode: string
}

export interface IUserUpdateRequestModel {
  userId: string
  userName?: string
  userEmail?: string
  userPassword?: string
  userPhoneNumber?: string
  userPhoto?: string
  userRole?: 'user' | 'admin' | 'superAdmin' | string
  userPartnerCode: string
}

export interface IUserCreateRequestModel {
  userName: string
  userEmail: string
  userPassword: string
  userPhoneNumber: string
  userPhoto: string
  userRole: 'user' | 'admin' | 'superAdmin' | string
}

export interface IUserLoginRequestModel {
  userEmail: string
  userPassword: string
}
