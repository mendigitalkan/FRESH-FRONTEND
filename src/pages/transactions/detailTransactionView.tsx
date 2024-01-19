/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Grid, Typography } from '@mui/material'
import { convertNumberToCurrency } from '../../utilities/convertNumberToCurrency'
import { ITransactionsModel } from '../../models/transactionsModel'

export default function DetailTransactionView() {
  const { handleGetRequest } = useHttp()
  const { transactionId } = useParams()

  const [detailTransaction, setDetaiTransaction] = useState<ITransactionsModel>()

  const getDetailUser = async () => {
    const result: ITransactionsModel = await handleGetRequest({
      path: '/transactions/detail/' + transactionId
    })
    console.log(result)
    if (result) {
      setDetaiTransaction(result)
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
            src={detailTransaction?.order?.orderProductImages}
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
                  <Typography>{detailTransaction?.order?.orderProductName}</Typography>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Deskripsi</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>
                    {detailTransaction?.order?.orderProductDescription}
                  </Typography>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>Harga</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>
                    Rp{convertNumberToCurrency(detailTransaction?.transactionPrice || 0)}
                  </Typography>
                </td>
              </tr>

              <tr>
                <td>
                  <Typography fontWeight={'Bold'}>User Name</Typography>
                </td>
                <td>:</td>
                <td>
                  <Typography>{detailTransaction?.user?.userName}</Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
      </Grid>
    </Card>
  )
}
