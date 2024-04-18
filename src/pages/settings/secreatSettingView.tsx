import { Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import {
  IMyAddressCreateRequestModel,
  IMyAddressModel
} from '../../models/myAddressModel'
import { useHttp } from '../../hooks/http'

export default function SecreatSettingsView() {
  const { handleGetRequest, handleUpdateRequest } = useHttp()

  const [myAddress, setMyAddress] = useState<IMyAddressCreateRequestModel>({
    myAddressName: '',
    myAddressKontak: '',
    myAddressDetail: '',
    myAddressPostalCode: '',
    myAddressProvinsi: '',
    myAddressKabupaten: '',
    myAddressKecamatan: ''
  })

  const getDetailSettings = async () => {
    const result: IMyAddressModel = await handleGetRequest({
      path: '/my-address'
    })
    if (result) {
      setMyAddress(result)
    }
  }

  const handleSubmit = async () => {
    try {
      await handleUpdateRequest({
        path: '/my-address',
        body: myAddress
      })
      window.location.reload()
    } catch (error: unknown) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDetailSettings()
  }, [])

  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Wablas Token'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressName}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressName: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Twilio Token'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={myAddress.myAddressKontak}
              onChange={(e) =>
                setMyAddress({ ...myAddress, myAddressKontak: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
        </Grid>
        <Stack direction={'row'} justifyContent={'flex-end'} sx={{ marginTop: 5 }}>
          <Button variant='outlined' onClick={handleSubmit}>
            Update
          </Button>
        </Stack>
      </Card>
    </Box>
  )
}
