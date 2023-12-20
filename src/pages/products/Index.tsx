/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import TableStyle from '../../components/table/Index'
import { ServiceHttp } from '../../services/api'
import { CONFIG } from '../../configs'
import { TableCell } from '@mui/material'
import { IProductModel } from '../../models/product'

const ProductView = () => {
  const httpService = new ServiceHttp()

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [tableData, setTableData] = useState<any[]>([])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const tableRows = [
    {
      title: 'name',
      data: (item: IProductModel, id: any) => (
        <TableCell key={id} align={'left'}>
          {item.productName}
        </TableCell>
      )
    },
    {
      title: 'Price',
      data: (item: IProductModel, id: any) => (
        <TableCell key={id} align={'left'}>
          {item.productPrice}
        </TableCell>
      )
    },
    {
      title: 'Description',
      data: (item: IProductModel, id: any) => (
        <TableCell key={id} align={'left'}>
          {item.productDescription}
        </TableCell>
      )
    },
    {
      title: 'Action',
      data: (item: IProductModel, id: any) => (
        <TableCell key={id} align={'left'}>
          ds
        </TableCell>
      )
    }
  ]

  const getData = async () => {
    try {
      const result = await httpService.getTableData({
        url: CONFIG.base_url_api + '/products/list',
        pagination: true,
        page: page || 0,
        size: rowsPerPage || 10,
        filters: {
          search: ''
        }
      })
      setTableData(result.items)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [page, rowsPerPage])

  return (
    <div>
      <TableStyle
        data={tableData}
        rows={tableRows}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}

export default ProductView
