import { useRef, useState } from 'react'
import {
  Button,
  Card,
  Typography,
  Box,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  Grid
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'
import { IUserCreateRequestModel } from '../../models/userModel'
import { handleUploadImageToFirebase } from '../../utilities/uploadImageToFirebase'

export default function CreateAdminView() {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userRole, setUserRole] = useState('')
  const [userPhoneNumber, setUserPhoneNumber] = useState('')
  const [userPhoto, setUserPhoto] = useState('')

  const fileInputRef: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

  const handleSubmit = async () => {
    try {
      const payload: IUserCreateRequestModel = {
        userName,
        userEmail,
        userPassword,
        userPhoneNumber,
        userRole,
        userPhoto
      }

      await handlePostRequest({
        path: '/users/register',
        body: payload
      })

      navigate('/admins')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  const handleUploadImage = () => {
    handleUploadImageToFirebase({
      selectedFile: fileInputRef,
      getImageUrl: setUserPhoto
    })
  }

  return (
    <>
      <Card
        sx={{
          mt: 5,
          p: { xs: 3, md: 5 }
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Nama'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userName}
                type='text'
                fullWidth
                onChange={(e) => {
                  setUserName(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='E-mail'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userEmail}
                fullWidth
                type='email'
                onChange={(e) => {
                  setUserEmail(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Telepon'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userPhoneNumber}
                type='text'
                fullWidth
                onChange={(e) => {
                  setUserPhoneNumber(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Password'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                value={userPassword}
                type='password'
                fullWidth
                onChange={(e) => {
                  setUserPassword(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label='Foto'
                id='outlined-start-adornment'
                sx={{ m: 1 }}
                type='file'
                fullWidth
                onChange={handleUploadImage}
                ref={fileInputRef}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ mx: 1 }} id='demo-multiple-name-label'>
                Pilih Role
              </InputLabel>
              <Select
                labelId='demo-select-small-label'
                id='demo-select-small'
                value={userRole}
                fullWidth
                sx={{ m: 1 }}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <MenuItem selected value={'admin'}>
                  Admin
                </MenuItem>
                <MenuItem value={'superAdmin'}>Super Admin</MenuItem>
              </Select>
            </Grid>
          </Grid>
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
