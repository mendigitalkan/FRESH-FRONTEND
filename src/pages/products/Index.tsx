/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { IProductModel } from '../../models/product'
import { Box, Button, Grid, Stack, TablePagination } from '@mui/material'
import ProductCard from '../../components/card/ProductCard'
import AddIcon from '@mui/icons-material/Add'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import StorefrontIcon from '@mui/icons-material/Storefront'
import { usePagenation } from '../../hooks/pagination'

const ProductView = () => {
  const { getTableData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagenation()

  const [productsData, setProductsData] = useState<IProductModel[]>([])

  const getData = async () => {
    try {
      const result = await getTableData({ path: '/products/list' })
      if (result) {
        setProductsData(result.items)
      }
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
            label: 'Products',
            link: 'products',
            icon: <StorefrontIcon fontSize='small' />
          },
          {
            label: 'Products',
            link: 'products'
          }
        ]}
      />
      <Stack justifyContent='space-between' mb={5} direction='row'>
        <div></div>
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
