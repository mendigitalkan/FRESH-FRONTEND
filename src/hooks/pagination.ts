/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useHttp } from './http'

export const usePagenation = () => {
  const { handleGetTableDataRequest } = useHttp()

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getTableData = async ({ path }: { path: string }) => {
    try {
      const result = await handleGetTableDataRequest({
        path: path,
        page: page ?? 0,
        size: rowsPerPage ?? 10,
        filter: {
          search: ''
        }
      })
      if (result) {
        return result
      } else {
        return []
      }
    } catch (error: any) {
      console.log(error)
      return []
    }
  }

  return {
    getTableData,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage
  }
}
