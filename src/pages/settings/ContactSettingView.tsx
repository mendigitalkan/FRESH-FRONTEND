import { Box, Button, Card, Grid, Stack, TextField } from '@mui/material'
import { useState } from 'react'
import { ISettingModel } from '../../models/settingMode'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function ContactSettingsView() {
  const [settings, setSettings] = useState<ISettingModel>({
    settingId: '',
    settingBanner: '',
    settingWhatsappNumber: ''
  })

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Settings',
            link: '/settings',
            icon: <IconMenus.settings fontSize='small' />
          },
          {
            label: 'Kontak',
            link: '/settings'
          }
        ]}
      />
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
        </Grid>
        <Stack direction={'row'} justifyContent={'flex-end'} sx={{ marginTop: 5 }}>
          <Button variant='outlined'>Update</Button>
        </Stack>
      </Card>
    </Box>
  )
}
