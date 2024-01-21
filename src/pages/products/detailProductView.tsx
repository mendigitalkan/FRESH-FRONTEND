import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Grid, Typography } from '@mui/material'
import { IProductModel } from '../../models/productsModel'

export default function DetailProductView() {
  const { handleGetRequest } = useHttp()
  const { productId } = useParams()

  const [productDetail, setProductDetail] = useState<IProductModel>()

  const getDetailUser = async () => {
    const result: IProductModel = await handleGetRequest({
      path: '/products/detail/' + productId
    })
    if (result) {
      setProductDetail(result)
    }
  }

  useEffect(() => {
    getDetailUser()
  }, [])

  return (
    <Card sx={{ p: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <img
            src={productDetail?.productImages}
            style={{
              marginTop: 10,
              width: 200,
              height: 200
            }}
          />
        </Grid>
        <Grid item xs={12} md={9}>
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
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Card>
  )
}
