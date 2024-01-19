import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/material'
import { IUserModel } from '../../models/userModel'
import { convertTime } from '../../utilities/convertTime'

export default function DetailCustomersView() {
  const { handleGetRequest } = useHttp()
  const { customerId } = useParams()

  const [detailCustomer, setDetailCustomer] = useState<IUserModel>()

  const getDetailUser = async () => {
    const result: IUserModel = await handleGetRequest({
      path: '/users/detail/' + customerId
    })
    if (result) {
      setDetailCustomer(result)
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
              <Typography fontWeight={'Bold'}>Nama</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailCustomer?.userName}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Email</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailCustomer?.userEmail}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Phone</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailCustomer?.userPhoneNumber}</Typography>
            </td>
          </tr>

          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Role</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{detailCustomer?.userRole}</Typography>
            </td>
          </tr>
          <tr>
            <td>
              <Typography fontWeight={'Bold'}>Bergabung</Typography>
            </td>
            <td>:</td>
            <td>
              <Typography>{convertTime(detailCustomer?.createdAt ?? '')}</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  )
}
