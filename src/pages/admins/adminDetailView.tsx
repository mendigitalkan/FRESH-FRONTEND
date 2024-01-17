import { useParams } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { Card, Typography } from '@mui/material'
import { IAdminModel } from '../../models/adminModel'

export default function AdminDetailView() {
  const { handleGetRequest } = useHttp()
  const { adminId } = useParams()

  const [adminDetail, setAdminDetail] = useState<IAdminModel>()

  const getDetailUser = async () => {
    const result: IAdminModel = await handleGetRequest({
      path: '/admins/detail/' + adminId
    })
    setAdminDetail(result)
  }

  useEffect(() => {
    getDetailUser()
  }, [])

  return (
    <>
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
                <Typography>{adminDetail?.adminName}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Email</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{adminDetail?.adminEmail}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Phone</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{adminDetail?.adminPhoneNumber}</Typography>
              </td>
            </tr>

            <tr>
              <td>
                <Typography fontWeight={'Bold'}>Role</Typography>
              </td>
              <td>:</td>
              <td>
                <Typography>{adminDetail?.adminRole}</Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </>
  )
}
