import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

const SettingsView = () => {
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

export default SettingsView
