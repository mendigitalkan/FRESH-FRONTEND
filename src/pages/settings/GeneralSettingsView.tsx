import { Box, Button, Card, Grid, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { ISettingModel } from '../../models/settingMode'

export default function GeneralSettingsView() {
  const [settings, setSettings] = useState<ISettingModel>({
    settingId: '',
    settingBanner: '',
    settingWhatsappNumber: '087343434'
  })

  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Nomor WA'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              value={settings.settingWhatsappNumber}
              onChange={(e) =>
                setSettings({ ...settings, settingWhatsappNumber: e.target.value })
              }
              type='text'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Nama Kategori'
              id='outlined-start-adornment'
              sx={{ m: 1 }}
              type='text'
            />
          </Grid>
        </Grid>
        <Stack direction={'row'} justifyContent={'flex-end'} sx={{ marginTop: 5 }}>
          <Button variant='outlined'>Update</Button>
        </Stack>
      </Card>
    </Box>
  )
}
