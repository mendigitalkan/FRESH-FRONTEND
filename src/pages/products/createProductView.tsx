import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  Grid,
  InputLabel
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IProductCreateRequestModel } from '../../models/productsModel'
import { ICategoryModel } from '../../models/categoryModel'

export default function CreateProductView() {
  const { handlePostRequest, handleGetRequest } = useHttp()
  const navigate = useNavigate()

  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productImages, setProductImages] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productCategoryId, setProductCategoryId] = useState('')
  const [productStock, setProductStock] = useState(0)
  const [productVariant, setProductVariant] = useState('')

  const [categories, setCategories] = useState<ICategoryModel[]>([])

  const handleSubmit = async () => {
    try {
      const payload: IProductCreateRequestModel = {
        productName,
        productDescription,
        productImages,
        productPrice,
        productCategoryId,
        productStock,
        productVariant
      }

      await handlePostRequest({
        path: '/products',
        body: payload
      })

      navigate('/products')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const getCategories = async () => {
    const result = await handleGetRequest({
      path: '/categories'
    })
    setCategories(result.items)
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Card
      sx={{
        mt: 5,
        p: { xs: 3, md: 5 }
      }}
    >
      <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
        Tambah Product
      </Typography>
      <Box
        component='form'
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nama'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              fullWidth
              value={productName}
              type='text'
              onChange={(e) => {
                setProductName(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Deskripsi'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              fullWidth
              value={productDescription}
              type='text'
              onChange={(e) => {
                setProductDescription(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Images'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              fullWidth
              value={productImages}
              type='text'
              onChange={(e) => {
                setProductImages(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Harga'
              fullWidth
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={productPrice}
              type='number'
              onChange={(e) => {
                setProductPrice(+e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Stok'
              fullWidth
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={productStock}
              type='number'
              onChange={(e) => {
                setProductStock(+e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Variant'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              fullWidth
              value={productVariant}
              type='text'
              onChange={(e) => {
                setProductVariant(e.target.value)
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel sx={{ mx: 1 }} id='demo-multiple-name-label'>
              Kategori
            </InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              fullWidth
              value={productCategoryId}
              sx={{ m: 1 }}
              onChange={(e) => setProductCategoryId(e.target.value)}
            >
              {categories.map((item) => (
                <MenuItem key={item.categoryId} value={item.categoryId}>
                  {item.categoryName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Stack direction={'row'} justifyContent='flex-end'>
          <Button
            sx={{
              m: 1,
              width: '25ch',
              backgroundColor: 'dodgerblue',
              color: '#FFF',
              fontWeight: 'bold'
            }}
            variant={'contained'}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Card>
  )
}
