/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONFIGS } from '../configs'
import { AppContextTypes, useAppContext } from '../context/app.context'
import { ServiceHttp } from '../services/api'

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
  handleGetRequest: (value: GetRequestTypes) => void
  handlePostRequest: (value: PostRequestTypes) => void
  handleRemoveRequest: (value: RemoveRequestTypes) => void
  handleGetTableDataRequest: (value: GetTabelDataRequestTypes) => void
}

export const useHttp = () => {
  const { setErrorMessage }: AppContextTypes = useAppContext()
  const serviceHttp = new ServiceHttp()

  const handleGetRequest = async ({ path }: GetRequestTypes) => {
    try {
      const result = await serviceHttp.get({
        path
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setErrorMessage({ isError: true, message: error?.message })
    }
  }

  const handlePostRequest = async ({ path, body }: PostRequestTypes) => {
    try {
      const result = await serviceHttp.post({
        path,
        body
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setErrorMessage({ isError: true, message: error?.message })
    }
  }

  const handleRemoveRequest = async ({ path }: RemoveRequestTypes) => {
    try {
      const result = await serviceHttp.remove({
        path
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setErrorMessage({ isError: true, message: error?.message })
    }
  }

  const handleUpdateRequest = async ({ path, body }: UpdateRequestTypes) => {
    try {
      const result = await serviceHttp.patch({
        path,
        body
      })
      return result
    } catch (error: any) {
      console.error(error?.message)
      setErrorMessage({ isError: true, message: error?.message })
    }
  }

  const handleGetTableDataRequest = async (props: GetTabelDataRequestTypes) => {
    try {
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
      setErrorMessage({ isError: true, message: error?.message })
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
