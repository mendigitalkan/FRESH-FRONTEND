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
import { useNavigate, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IProductModel, IProductUpdateRequestModel } from '../../models/productsModel'
import { ICategoryModel } from '../../models/categoryModel'
// import { handleUploadImageToFirebase } from '../../utilities/uploadImageToFirebase'
import VariantProductSection from './productVariantView'
import ButtonUploadFile from '../../components/buttons/buttonUpload'

export default function EditProductView() {
  const { handleUpdateRequest, handleGetRequest } = useHttp()
  const navigate = useNavigate()
  const { productId } = useParams()

  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productImages, setProductImages] = useState<string[]>([])
  const [productPrice, setProductPrice] = useState(0)
  const [productDiscount, setProductDiscount] = useState(0)
  const [productCategoryId, setProductCategoryId] = useState('')
  const [productStock, setProductStock] = useState(0)
  const [productWeight, setProductWeight] = useState(0)
  const [productCondition, setProductCondition] = useState<'Baru' | 'Bekas' | string>('')
  const [productColors, setProductColors] = useState<string[]>([])
  const [productSizes, setProductSizes] = useState<string[]>([])

  const [categories, setCategories] = useState<ICategoryModel[]>([])

  const getCategories = async () => {
    const result = await handleGetRequest({
      path: '/categories'
    })
    setCategories(result.items)
  }

  // const handleUploadImage = (event: any) => {
  //   const image = event.target.files[0]
  //   handleUploadImageToFirebase({
  //     selectedFile: image,
  //     getImageUrl: (image) => setProductImages([...productImages, image])
  //   })
  // }

  const handleSubmit = async () => {
    try {
      const payload: IProductUpdateRequestModel = {
        productId: productId ?? '',
        productName,
        productDescription,
        productImages: JSON.stringify(productImages),
        productPrice,
        productCategoryId,
        productStock,
        productWeight,
        productCondition,
        productDiscount,
        productColors: JSON.stringify(productColors),
        productSizes: JSON.stringify(productSizes),
        productTotalSale: 0
      }

      await handleUpdateRequest({
        path: '/products',
        body: payload
      })

      navigate('/products')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const getDetailProduct = async () => {
    const result: IProductModel = await handleGetRequest({
      path: '/products/detail/' + productId
    })
    if (result) {
      const images = JSON.parse(result.productImages || '[]')
      const productColors = JSON.parse(result.productColors || '[]')
      const productSizes = JSON.parse(result.productSizes || '[]')

      setProductName(result.productName)
      setProductDescription(result.productDescription)
      setProductCondition(result.productCondition)
      setProductDiscount(result.productDiscount)
      setProductWeight(result.productWeight)
      setProductPrice(result.productPrice)
      setProductCategoryId(result.productCategoryId)

      setProductImages(images)
      setProductColors(productColors)
      setProductSizes(productSizes)
    }
  }

  useEffect(() => {
    getCategories()
    getDetailProduct()
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
        <Typography fontWeight={'bold'} my={2}>
          Info Product
        </Typography>
        <Grid container spacing={2}>
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
                value={productCategoryId}
                onChange={(e) => setProductCategoryId(e.target.value)}
              >
                {categories.map((item) => (
                  <MenuItem key={item.categoryId} value={item.categoryId}>
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
              <img
                key={index}
                src={image}
                style={{
                  marginTop: 10,
                  width: 200,
                  height: 200
                }}
              />
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
                control={<Radio onChange={(e) => setProductCondition(e.target.value)} />}
                label='Baru'
              />
              <FormControlLabel
                value='Bekas'
                control={<Radio onChange={(e) => setProductCondition(e.target.value)} />}
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
  )
}
