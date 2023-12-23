import { useState } from 'react'
import { Button, Card, Typography, Container, Stack, Box, TextField } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useHttp } from '../../hooks/http'

const SignUpView = () => {
  const { handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = async () => {
    try {
      await handlePostRequest({
        path: '/users/register',
        body: {
          userName: userName,
          userEmail: email,
          userPassword: password,
          userPhoneNumber: phoneNumber
        }
      })
      navigate('/')
    } catch (error: unknown) {
      console.log(error)
    }
  }

  return (
    <>
      <Container maxWidth='xs'>
        <Card
          sx={{
            mt: 5,
            p: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant='h4' marginBottom={5} color='primary' fontWeight={'bold'}>
            Sign Up
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
              // error={isError}
              // helperText={errorMessagePassword}
              label='User Name'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
                // setIsError(false)
                // setErrorMessagePassword('')
              }}
            />
            <TextField
              // error={isError}
              // helperText={errorMessageEmail}
              label='E-mail'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={email}
              type='email'
              onChange={(e) => {
                setEmail(e.target.value)
                // setIsError(false)
                // setErrorMessageEmail('')
              }}
            />

            <TextField
              // error={isError}
              // helperText={errorMessagePassword}
              label='Password'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={password}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value)
                // setIsError(false)
                // setErrorMessagePassword('')
              }}
            />

            <TextField
              // error={isError}
              // helperText={errorMessagePassword}
              label='Phone'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
                // setIsError(false)
                // setErrorMessagePassword('')
              }}
            />

            <Button
              sx={{
                m: 1,
                width: '39ch',
                backgroundColor: 'dodgerblue',
                color: '#FFF',
                fontWeight: 'bold'
              }}
              variant={'contained'}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Box>
          <Stack direction='row' alignItems='center' mt={5}>
            <Typography>Sudah punya akun?</Typography>
            <Link style={{ paddingLeft: '10px', textDecoration: 'none' }} to='login'>
              Login
            </Link>
          </Stack>
        </Card>
      </Container>
    </>
  )
}

export default SignUpView
