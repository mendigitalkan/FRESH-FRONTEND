/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { IProductModel } from '../../models/product'
import { Box, Button, Grid, Stack, TablePagination } from '@mui/material'
import ProductCard from '../../components/card/ProductCard'
import AddIcon from '@mui/icons-material/Add'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { usePagenation } from '../../hooks/pagination'
import { IconMenus } from '../../components/icon'
import { SearchField } from '../../components/search/Index'
import { useNavigate } from 'react-router-dom'

const ProductView = () => {
  const { getTableData, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    usePagenation()

  const [productsData, setProductsData] = useState<IProductModel[]>([])
  const [filterData, setFilterData] = useState<any>({})
  const navigate = useNavigate()

  const getData = async () => {
    try {
      const result = await getTableData({
        path: `/products/list`,
        filter: filterData
      })
      if (result) {
        setProductsData(result.items)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [page, rowsPerPage, filterData])

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Products',
            link: 'products',
            icon: <IconMenus.products fontSize='small' />
          }
        ]}
      />
      <Stack justifyContent='space-between' mb={5} direction='row'>
        <SearchField
          onSearch={(value) => {
            setFilterData({
              search: value
            })
          }}
        />
        <Button
          variant='contained'
          size='medium'
          sx={{ width: 200 }}
          startIcon={<AddIcon />}
          onClick={() => navigate('/products/create')}
        >
          Add Product
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
