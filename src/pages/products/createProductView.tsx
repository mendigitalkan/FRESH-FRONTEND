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
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IProductCreateRequestModel } from '../../models/productsModel'
import { ICategoryModel } from '../../models/categoryModel'
import { handleUploadImageToFirebase } from '../../utilities/uploadImageToFirebase'

export default function CreateProductView() {
  const { handlePostRequest, handleGetRequest } = useHttp()
  const navigate = useNavigate()

  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productImages, setProductImages] = useState<string[]>([])
  const [productPrice, setProductPrice] = useState(0)
  const [productCategoryId, setProductCategoryId] = useState('')
  const [productStock, setProductStock] = useState(0)
  const [productVariant, setProductVariant] = useState('')

  const [categories, setCategories] = useState<ICategoryModel[]>([])

  const getCategories = async () => {
    const result = await handleGetRequest({
      path: '/categories'
    })
    setCategories(result.items)
  }

  const handleUploadImage = (event: any) => {
    const image = event.target.files[0]
    handleUploadImageToFirebase({
      selectedFile: image,
      getImageUrl: (image) => setProductImages([...productImages, image])
    })
  }

  const handleSubmit = async () => {
    try {
      const payload: IProductCreateRequestModel = {
        productName,
        productDescription,
        productImages: JSON.stringify(productImages),
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
          <Stack direction={'row'} flexWrap='wrap' spacing={2}>
            <TextField fullWidth type='file' onChange={handleUploadImage} />
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

        <Box sx={{ mt: 3 }}>
          <Typography fontWeight={'bold'}>Varian Product</Typography>
          <VariantProductSection />
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

interface IVariantTypes {
  type: string
  values: string[]
}

const VariantProductSection = () => {
  const [variantList, setVariantList] = useState<IVariantTypes[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [conditions, setConditions] = useState<string[]>([])
  const [weight, setWeight] = useState<string[]>([])

  const handleSelectColor = (inputColor: string) => {
    if (colors.includes(inputColor)) {
      const newColors = colors.filter((color) => color !== inputColor)
      setColors(newColors)
    } else {
      setColors([...colors, inputColor])
    }
  }

  const handleSelectSizes = (inputValue: string) => {
    if (sizes.includes(inputValue)) {
      const newSizes = sizes.filter((size) => size !== inputValue)
      setSizes(newSizes)
    } else {
      setSizes([...sizes, inputValue])
    }
  }

  const handleSelectConditions = (inputValue: string) => {
    console.log(inputValue)
    if (conditions.includes(inputValue)) {
      const newConditions = conditions.filter((condition) => condition !== inputValue)
      setConditions(newConditions)
    } else {
      setConditions([...conditions, inputValue])
    }
  }

  const handleSubmit = () => {
    const variantsData: IVariantTypes[] = [
      {
        type: 'colors',
        values: colors
      },
      {
        type: 'sizes',
        values: sizes
      },
      {
        type: 'conditions',
        values: conditions
      }
    ]

    setVariantList(variantsData)
  }

  console.log(variantList)

  return (
    <>
      <Typography color={'gray'}>Ukuran</Typography>
      <Stack spacing={2}>
        <FormGroup>
          <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  value={'S'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='S'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'M'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='M'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'L'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='L'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'XL'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='XL'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'XXL'}
                  onChange={(e) => handleSelectSizes(e.target.value)}
                />
              }
              label='XXL'
            />
          </Stack>
        </FormGroup>
        <Typography color={'gray'}>Warna</Typography>
        <FormGroup>
          <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  value={'Hitam'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Hitam'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Merah'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Merah'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Putih'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Putih'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Kuning'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Kuning'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Hijau'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Hijau'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Biru'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Biru'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Abu-Abu'}
                  onChange={(e) => handleSelectColor(e.target.value)}
                />
              }
              label='Abu-Abu'
            />
          </Stack>
        </FormGroup>
        <Typography color={'gray'}>Kondisi</Typography>
        <FormGroup>
          <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
            <FormControlLabel
              control={
                <Checkbox
                  value={'Baru'}
                  onChange={(e) => handleSelectConditions(e.target.value)}
                />
              }
              label='Baru'
            />
            <FormControlLabel
              control={
                <Checkbox
                  value={'Bekas'}
                  onChange={(e) => handleSelectConditions(e.target.value)}
                />
              }
              label='Bekas'
            />
          </Stack>
        </FormGroup>
        <Typography color={'gray'}>Berat</Typography>
        <TextField
          label='Berat: masukan angkat dalam gram tanpa (g)'
          id='outlined-start-adornment'
          type='number'
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </Stack>
    </>
  )
}
