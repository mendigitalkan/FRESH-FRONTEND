/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { IProductModel } from '../../models/product'
import { useHttp } from '../../hooks/http'
import { Box, Button, Grid, Stack, TablePagination } from '@mui/material'
import ProductCard from '../../components/card/ProductCard'
import AddIcon from '@mui/icons-material/Add'

const ProductView = () => {
  const { handleGetTableDataRequest } = useHttp()

  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = useState(0)
  const [productsData, setProductsData] = useState<IProductModel[]>([])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const getData = async () => {
    try {
      const result = await handleGetTableDataRequest({
        path: '/products/list',
        page: page || 0,
        size: rowsPerPage || 10,
        filter: {
          search: ''
        }
      })
      setProductsData(result.items)
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [page, rowsPerPage])

  return (
    <Box>
      <Stack justifyContent='space-between' mb={5} direction='row'>
        <Button
          variant='contained'
          size='medium'
          sx={{ width: 200 }}
          startIcon={<AddIcon />}
        >
          New Product
        </Button>
        <Button
          variant='contained'
          size='medium'
          sx={{ width: 200 }}
          startIcon={<AddIcon />}
        >
          New Product
        </Button>
      </Stack>
      <Grid container spacing={3}>
        {productsData.map((product: IProductModel, index: number) => (
          <Grid item md={3} xs={12} key={index}>
            <ProductCard
              title={product.productName}
              description={product.productDescription}
              image={product.productImages}
              price={product.productPrice}
            />
          </Grid>
        ))}
      </Grid>
      <Stack justifyContent='center' alignItems='center' my={10}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component='div'
          count={productsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Stack>
    </Box>
  )
}

export default ProductView
