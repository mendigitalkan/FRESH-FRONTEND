/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'
import { CONFIGS } from '../configs'
import { AppContextTypes, useAppContext } from '../context/app.context'
import { ServiceHttp } from '../services/api'
import { useToken } from './token'

interface PostRequestTypes {
  path: string
  body: any
}

interface GetRequestTypes {
  path: string
}

interface RemoveRequestTypes {
  path: string
  body?: any
}

interface UpdateRequestTypes {
  path: string
  body: any
}

interface GetTabelDataRequestTypes {
  path: string
  page?: number
  size?: number
  filter?: any
}

export interface HttpRequestTypes {
  handleGetRequest: (value: GetRequestTypes) => any
  handlePostRequest: (value: PostRequestTypes) => any
  handleRemoveRequest: (value: RemoveRequestTypes) => any
  handleGetTableDataRequest: (value: GetTabelDataRequestTypes) => any
}

export const useHttp = () => {
  const { setAppAlert, setIsLoading }: AppContextTypes = useAppContext()
  const serviceHttp = new ServiceHttp()
  const isAuth = useToken()
  const navigate = useNavigate()

  const handleGetRequest = async ({ path }: GetRequestTypes) => {
    if (isAuth === null) {
      navigate('/')
    }
    try {
      setIsLoading(true)
      const result = await serviceHttp.get({
        path
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setAppAlert({ isDisplayAlert: true, message: error?.message, alertType: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePostRequest = async ({ path, body }: PostRequestTypes) => {
    if (isAuth === null) {
      navigate('/')
    }
    try {
      setIsLoading(true)
      const result = await serviceHttp.post({
        path,
        body
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setAppAlert({ isDisplayAlert: true, message: error?.message, alertType: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveRequest = async ({ path }: RemoveRequestTypes) => {
    if (isAuth === null) {
      navigate('/')
    }
    try {
      const result = await serviceHttp.remove({
        path
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setAppAlert({ isDisplayAlert: true, message: error?.message, alertType: 'error' })
    }
  }

  const handleUpdateRequest = async ({ path, body }: UpdateRequestTypes) => {
    if (isAuth === null) {
      navigate('/')
    }
    try {
      setIsLoading(true)
      const result = await serviceHttp.patch({
        path,
        body
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setAppAlert({ isDisplayAlert: true, message: error?.message, alertType: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetTableDataRequest = async (props: GetTabelDataRequestTypes) => {
    if (isAuth === null) {
      navigate('/')
    }
    try {
      setIsLoading(true)
      const result = await serviceHttp.getTableData({
        url: CONFIGS.baseUrl + props.path,
        pagination: true,
        page: props.page || 0,
        size: props.size || 10,
        filters: props.filter
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setAppAlert({ isDisplayAlert: true, message: error?.message, alertType: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleGetRequest,
    handlePostRequest,
    handleRemoveRequest,
    handleUpdateRequest,
    handleGetTableDataRequest
  }
}
