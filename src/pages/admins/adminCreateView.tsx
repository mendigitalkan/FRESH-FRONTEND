import { useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IAdminCreateRequestModel } from '../../models/adminModel'

export default function AdminCreateView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [adminEmail, setAdminEmail] = useState('')
  const [adminName, setAdminName] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminRole, setAdminRole] = useState('')
  const [adminPhoneNumber, setAdminPhoneNumber] = useState('')

  const handleSubmit = async () => {
    try {
      const payload: IAdminCreateRequestModel = {
        adminName,
        adminEmail,
        adminPassword,
        adminPhoneNumber,
        adminRole
      }

      await handlePostRequest({
        path: '/admins/register',
        body: payload
      })

      navigate('/admins')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <Card
        sx={{
          mt: 5,
          p: 8
        }}
      >
        <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
          Tambah Admin
        </Typography>
        <Box
          component='form'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <TextField
            label='Nama'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={adminName}
            type='text'
            onChange={(e) => {
              setAdminName(e.target.value)
            }}
          />
          <TextField
            label='E-mail'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={adminEmail}
            type='email'
            onChange={(e) => {
              setAdminEmail(e.target.value)
            }}
          />
          <TextField
            label='Telepon'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={adminPhoneNumber}
            type='text'
            onChange={(e) => {
              setAdminPhoneNumber(e.target.value)
            }}
          />
          <TextField
            label='Password'
            id='outlined-start-adornment'
            sx={{ m: 1 }}
            value={adminPassword}
            type='password'
            onChange={(e) => {
              setAdminPassword(e.target.value)
            }}
          />
          <InputLabel sx={{ mx: 1 }} id='demo-multiple-name-label'>
            Pilih Role
          </InputLabel>
          <Select
            labelId='demo-select-small-label'
            id='demo-select-small'
            value={adminRole}
            sx={{ m: 1 }}
            onChange={(e) => setAdminRole(e.target.value)}
          >
            <MenuItem selected value={'admin'}>
              Admin
            </MenuItem>
            <MenuItem value={'superAdmin'}>Super Admin</MenuItem>
          </Select>
          <Stack direction={'row'} justifyContent='flex-end'>
            <Button
              sx={{
                m: 1,
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
    </>
  )
}
