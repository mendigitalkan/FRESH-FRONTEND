/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import TableStyle from '../../components/table/Index'
import { Box, Button, TableCell } from '@mui/material'
import { IProductModel } from '../../models/product'
import AddIcon from '@mui/icons-material/Add'
import { usePagenation } from '../../hooks/pagination'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

const OrderView = () => {
  const { getTableData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagenation()

  const [tableData, setTableData] = useState<any[]>([])

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
      const result = await getTableData({ path: '/products/list' })
      setTableData(result.items)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [page, rowsPerPage])

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Orders',
            link: '/orders',
            icon: <IconMenus.orders fontSize='small' />
          }
        ]}
      />

      <TableStyle
        tableOption={
          <Button variant='contained' startIcon={<AddIcon />}>
            New Product
          </Button>
        }
        data={tableData}
        rows={tableRows}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Box>
  )
}

export default OrderView
