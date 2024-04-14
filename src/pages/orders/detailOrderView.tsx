/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material'
import { IOrdersModel, IOrdersUpdateRequestModel } from '../../models/ordersModel'
import { convertNumberToCurrency } from '../../utilities/convertNumberToCurrency'
import { Carousel } from 'react-responsive-carousel'

export default function DetailOrderView() {
  const { handleGetRequest, handleUpdateRequest } = useHttp()
  const { orderId } = useParams()
  const navigate = useNavigate()

  const [detailOrder, setDetailOrder] = useState<IOrdersModel>()
  const [orderStatus, setOrderStatus] = useState('')
  const [productImages, setProductImages] = useState<string[]>([])

  const getDetailUser = async () => {
    const result: IOrdersModel = await handleGetRequest({
      path: '/orders/detail/' + orderId
    })
    if (result) {
      const images = JSON.parse(result?.product?.productImages || '[]')
      setProductImages(images)
      setDetailOrder(result)
      setOrderStatus(result.orderStatus)

      console.log('__________detail')
      console.log(result)
    }
  }

  const handleUpdate = async () => {
    try {
      const pyload: IOrdersUpdateRequestModel = {
        orderId: orderId ?? '',
        orderStatus
      }

      await handleUpdateRequest({ path: '/orders', body: pyload })
      navigate('/orders')
    } catch (error: any) {
      console.log(error)
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
              <Typography>{detailOrder?.product?.productName}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Deskripsi</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailOrder?.product?.productDescription}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Harga</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>
                Rp
                {convertNumberToCurrency(
                  parseFloat(detailOrder?.orderProductPrice ?? '0')
                )}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Ongkir</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>
                Rp
                {convertNumberToCurrency(parseFloat(detailOrder?.orderOngkirPrice))}
              </Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Total Harga</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>
                Rp
                {convertNumberToCurrency(
                  parseFloat(detailOrder?.orderTotalProductPrice ?? 0)
                )}
              </Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Status</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{orderStatus}</Typography>
            </td>
          </tr>
        </tbody>
      </table>

      <Divider />
      <Box sx={{ my: 5 }}>
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>Status Pesanan</FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <FormControlLabel
              checked={orderStatus === 'waiting'}
              value='waiting'
              control={<Radio />}
              label='menunggu'
            />
            <FormControlLabel
              checked={orderStatus === 'process'}
              value='process'
              control={<Radio />}
              label='Diprosess'
            />
            <FormControlLabel
              checked={orderStatus === 'delivery'}
              value='delivery'
              control={<Radio />}
              label='Dikirim'
            />
            <FormControlLabel
              checked={orderStatus === 'done'}
              value='done'
              control={<Radio />}
              label='Selesai'
            />
            <FormControlLabel
              checked={orderStatus === 'cancel'}
              value='cancel'
              control={<Radio />}
              label='Gagal'
            />
          </RadioGroup>
        </FormControl>
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
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Stack>
      </Box>
    </Card>
  )
}
