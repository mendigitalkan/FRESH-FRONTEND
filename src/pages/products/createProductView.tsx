/* eslint-disable @typescript-eslint/no-explicit-any */
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
  InputLabel,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IProductCreateRequestModel } from '../../models/productsModel'
import VariantProductSection from './productVariantView'
import ButtonUploadFile from '../../components/buttons/buttonUpload'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import {
  ICategory1Model,
  ICategory2Model,
  ICategory3Model
} from '../../models/categoryModel'

export default function CreateProductView() {
  const { handlePostRequest, handleGetRequest } = useHttp()
  const navigate = useNavigate()

  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productImages, setProductImages] = useState<string[]>([])
  const [productPrice, setProductPrice] = useState(0)
  const [productDiscount, setProductDiscount] = useState(0)
  const [productCategoryName, setProductCategoryName] = useState('')
  const [productStock, setProductStock] = useState(0)
  const [productWeight, setProductWeight] = useState(0)
  const [productCondition, setProductCondition] = useState<'Baru' | 'Bekas' | string>('')
  const [productColors, setProductColors] = useState<string[]>([])
  const [productSizes, setProductSizes] = useState<string[]>([])

  const [productCategoryId1, setProductCategoryId1] = useState<string>('')
  const [productCategoryId2, setProductCategoryId2] = useState<string>('')
  const [productCategoryId3, setProductCategoryId3] = useState<string>('')

  const [listCategory1, setListCategory1] = useState<ICategory1Model[]>([])
  const [listCategory2, setListCategory2] = useState<ICategory2Model[]>([])
  const [listCategory3, setListCategory3] = useState<ICategory3Model[]>([])

  const getListCategory1 = async () => {
    const result = await handleGetRequest({
      path: '/category1'
    })
    setListCategory1(result.items)
  }

  const handleSubmit = async () => {
    try {
      const payload: IProductCreateRequestModel = {
        productName,
        productDescription,
        productImages: JSON.stringify(productImages),
        productPrice,
        productCategoryId1,
        productCategoryId2,
        productCategoryId3,
        productStock,
        productWeight,
        productCondition,
        productDiscount,
        productColors: JSON.stringify(productColors),
        productSizes: JSON.stringify(productSizes),
        productTotalSale: 0
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

  const handleDeleteImage = (oldImage: string) => {
    const newImages = productImages.filter((image) => image !== oldImage)
    setProductImages(newImages)
  }

  useEffect(() => {
    getListCategory1()
  }, [])

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Product',
            link: '/products',
            icon: <IconMenus.products fontSize='small' />
          },
          {
            label: 'Create',
            link: '/products/create'
          }
        ]}
      />
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
          <Typography fontWeight={'bold'} my={2}>
            Info Product
          </Typography>
          <Grid container spacing={2} mb={10}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Nama'
                id='outlined-start-adornment'
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
                label='Harga: masukan dalam angka tanpa Rp'
                fullWidth
                id='outlined-start-adornment'
                value={productPrice}
                type='number'
                onChange={(e) => {
                  setProductPrice(+e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Diskon: masukan dalam angka tanpa persen (%)'
                fullWidth
                id='outlined-start-adornment'
                value={productDiscount}
                type='number'
                onChange={(e) => {
                  setProductDiscount(+e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Berat: masukan angka dalam gram tanpa (g)'
                fullWidth
                id='outlined-start-adornment'
                value={productWeight}
                type='number'
                onChange={(e) => {
                  setProductWeight(+e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Stok'
                fullWidth
                id='outlined-start-adornment'
                value={productStock}
                type='number'
                onChange={(e) => {
                  setProductStock(+e.target.value)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-controlled-open-select-label'>Kategori</InputLabel>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  fullWidth
                  value={productCategoryName}
                  onChange={(e) => {
                    setProductCategoryName(e.target.value)
                  }}
                >
                  {listCategory1.map((item) => (
                    <MenuItem key={item.categoryId1} value={item.categoryId1}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-controlled-open-select-label'>
                  Sub Kategori 1
                </InputLabel>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  fullWidth
                  value={productCategoryName}
                  onChange={(e) => {
                    setProductCategoryId2(e.target.value)
                  }}
                >
                  {listCategory2.map((item) => (
                    <MenuItem key={item.categoryId2} value={item.categoryId2}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='demo-controlled-open-select-label'>
                  Sub Kategori 2
                </InputLabel>
                <Select
                  labelId='demo-select-small-label'
                  id='demo-select-small'
                  fullWidth
                  value={productCategoryName}
                  onChange={(e) => {
                    setProductCategoryName(e.target.value)
                  }}
                >
                  {listCategory3.map((item) => (
                    <MenuItem key={item.categoryId3} value={item.categoryId3}>
                      {item.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ my: 3 }}>
            <Typography color={'gray'}>Foto Product</Typography>
            <ButtonUploadFile
              onUpload={(image) => setProductImages([...productImages, image])}
            />
            <Stack direction={'row'} flexWrap='wrap' spacing={2}>
              {productImages.map((image, index) => (
                <Stack spacing={2} key={index}>
                  <img
                    src={image}
                    style={{
                      marginTop: 10,
                      width: 200,
                      height: 200
                    }}
                  />
                  <Button
                    variant='outlined'
                    size='small'
                    onClick={() => handleDeleteImage(image)}
                  >
                    Delete
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Box sx={{ my: 3 }}>
            <Typography fontWeight={'bold'} mb={2}>
              Deskripsi
            </Typography>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Deskripsi'
                id='outlined-start-adornment'
                multiline
                fullWidth
                rows={4}
                value={productDescription}
                type='text'
                onChange={(e) => {
                  setProductDescription(e.target.value)
                }}
              />
            </Grid>
          </Box>

          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>Kondisi</FormLabel>

            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='female'
              name='radio-buttons-group'
            >
              <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
                <FormControlLabel
                  value='Baru'
                  control={
                    <Radio onChange={(e) => setProductCondition(e.target.value)} />
                  }
                  label='Baru'
                />
                <FormControlLabel
                  value='Bekas'
                  control={
                    <Radio onChange={(e) => setProductCondition(e.target.value)} />
                  }
                  label='Bekas'
                />
              </Stack>
            </RadioGroup>
          </FormControl>

          <Box sx={{ mt: 3 }}>
            <Typography fontWeight={'bold'}>Varian Product</Typography>
            <VariantProductSection
              setProductColors={setProductColors}
              setProductSizes={setProductSizes}
            />
          </Box>

          <Stack direction={'row'} justifyContent='flex-end'>
            <Button
              sx={{
                my: 1,
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
    </>
  )
}
