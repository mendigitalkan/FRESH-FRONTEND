import { useState } from 'react'
import { Button, Card, Typography, Container, Stack, Box, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const LoginView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessageEmail, setErrorMessageEmail] = useState('')
  const [errorMessagePassword, setErrorMessagePassword] = useState('')
  const [isError, setIsError] = useState(false)

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
            Login
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
              error={isError}
              helperText={errorMessageEmail}
              label='E-mail'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={email}
              type='email'
              onChange={(e) => {
                setEmail(e.target.value)
                setIsError(false)
                setErrorMessageEmail('')
              }}
            />

            <TextField
              error={isError}
              helperText={errorMessagePassword}
              label='Password'
              id='outlined-start-adornment'
              sx={{ m: 1, width: '36ch' }}
              value={password}
              type='password'
              onChange={(e) => {
                setPassword(e.target.value)
                setIsError(false)
                setErrorMessagePassword('')
              }}
            />

            <Button
              type='submit'
              sx={{
                m: 1,
                width: '39ch',
                backgroundColor: 'dodgerblue',
                color: '#FFF',
                fontWeight: 'bold'
              }}
              variant={'contained'}
            >
              Login
            </Button>
          </Box>
          <Stack direction='row' alignItems='center' mt={5}>
            <Typography>Belum punya akun?</Typography>
            <Link style={{ paddingLeft: '10px', textDecoration: 'none' }} to='sign-up'>
              Buat akun
            </Link>
          </Stack>
        </Card>
      </Container>
    </>
  )
}

export default LoginView
