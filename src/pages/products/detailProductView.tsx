/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Box, Card, Chip, Grid, Typography } from '@mui/material'
import { IProductModel } from '../../models/productsModel'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

interface IVariantTypes {
  type: string
  values: string[]
}

export default function DetailProductView() {
  const { handleGetRequest } = useHttp()
  const { productId } = useParams()
  const [productImages, setProductImages] = useState<string[]>([])

  const [productDetail, setProductDetail] = useState<IProductModel>()
  const [productColors, setProductColors] = useState<string[]>([])
  const [productSizes, setProductSizes] = useState<string[]>([])

  const getDetailUser = async () => {
    const result: IProductModel = await handleGetRequest({
      path: '/products/detail/' + productId
    })
    if (result) {
      const images = JSON.parse(result.productImages || '[]')
      const productVariants: IVariantTypes[] = JSON.parse(result.productVariant || '[]')
      const colors: IVariantTypes | any = productVariants.find(
        (value) => value.type === 'colors'
      )
      const sizes: IVariantTypes | any = productVariants.find(
        (value) => value.type === 'sizes'
      )

      setProductColors(colors?.values)
      setProductSizes(sizes?.values)

      setProductImages(images)
      setProductDetail(result)
    }
  }

  useEffect(() => {
    getDetailUser()
  }, [])

  return (
    <Card sx={{ p: 5 }}>
      <Box>
        <Carousel dynamicHeight>
          {productImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                style={{
                  maxHeight: '400px'
                }}
              />
            </div>
          ))}
        </Carousel>
      </Box>
      <Grid container spacing={5} p={2}>
        <table>
          <thead>
            <th></th>
            <th></th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Nama</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{productDetail?.productName}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Deskripsi</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{productDetail?.productDescription}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Kategori</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{productDetail?.productCategoryId}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Stok</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{productDetail?.productStock}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Terjual</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{productDetail?.productTotalSale}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Kondisi</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{productDetail?.productCondition}</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Berat</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{productDetail?.productWeight} gram</Typography>
              </td>
            </tr>
            <tr>
              <td>
                <Typography fontWeight={'Bold'}>warna</Typography>
              </td>
              <td>:</td>
              <td>
                {productColors.map((color, index) => (
                  <Chip key={index} label={color} sx={{ mx: 0.2 }} />
                ))}
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Ukuran</Typography>
              </td>
              <td>:</td>
              <td>
                {productSizes.map((size, index) => (
                  <Chip key={index} label={size} sx={{ mx: 0.2 }} />
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </Grid>
    </Card>
  )
}
