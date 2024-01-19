import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/material'
import { IOrdersModel } from '../../models/ordersModel'
import { convertNumberToCurrency } from '../../utilities/convertNumberToCurrency'

export default function DetailOrderView() {
  const { handleGetRequest } = useHttp()
  const { orderId } = useParams()

  const [detailOrder, setDetailOrder] = useState<IOrdersModel>()

  const getDetailUser = async () => {
    const result: IOrdersModel = await handleGetRequest({
      path: '/orders/detail/' + orderId
    })
    if (result) {
      setDetailOrder(result)
    }
  }

  useEffect(() => {
    getDetailUser()
  }, [])

  return (
    <Card sx={{ p: 5 }}>
      <table>
        <thead>
          <th></th>
          <th></th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Nama Produk</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailOrder?.orderProductName}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Deskripsi</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailOrder?.orderProductDescription}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Harga</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>
                Rp{convertNumberToCurrency(detailOrder?.orderProductPrice || 0)}
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Status Pesanan</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailOrder?.orderStatus}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Photo</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailOrder?.orderProductPhotos}</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
