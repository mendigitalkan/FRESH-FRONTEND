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
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography
} from '@mui/material'
import { IOrdersModel, IOrdersUpdateRequestModel } from '../../models/ordersModel'
import { convertNumberToCurrency } from '../../utilities/convertNumberToCurrency'

export default function DetailOrderView() {
  const { handleGetRequest, handleUpdateRequest } = useHttp()
  const { orderId } = useParams()
  const navigate = useNavigate()

  const [detailOrder, setDetailOrder] = useState<IOrdersModel>()
  const [orderStatus, setOrderStatus] = useState('')

  const getDetailUser = async () => {
    const result: IOrdersModel = await handleGetRequest({
      path: '/orders/detail/' + orderId
    })
    if (result) {
      setDetailOrder(result)
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
      <Grid container spacing={2} my={5}>
        <Grid item xs={12} md={3}>
          <img
            src={detailOrder?.orderProductImages}
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
                  <Typography fontWeight={'Bold'}>Status</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>{detailOrder?.orderStatus}</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>

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
              // checked={orderStatus === '' && detailOrder?.orderStatus === 'waiting'}
              value='waiting'
              control={<Radio />}
              label='menunggu'
            />
            <FormControlLabel
              // checked={orderStatus === '' && detailOrder?.orderStatus === 'process'}
              value='process'
              control={<Radio />}
              label='Diprosess'
            />
            <FormControlLabel
              // checked={orderStatus === '' && detailOrder?.orderStatus === 'delivery'}
              value='delivery'
              control={<Radio />}
              label='Dikirim'
            />
            <FormControlLabel
              // checked={orderStatus === '' && detailOrder?.orderStatus === 'done'}
              value='done'
              control={<Radio />}
              label='Selesai'
            />
            <FormControlLabel
              // checked={orderStatus === '' && detailOrder?.orderStatus === 'cancel'}
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
