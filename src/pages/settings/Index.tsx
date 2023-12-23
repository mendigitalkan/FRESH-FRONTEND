/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function SettingsView() {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Settings',
            link: '/settings',
            icon: <IconMenus.setting fontSize='small' />
          }
        ]}
      />
      Settings
    </Box>
  )
}
