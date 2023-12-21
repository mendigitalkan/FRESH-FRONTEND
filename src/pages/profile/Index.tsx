import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

const ProfileView = () => {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Profile',
            link: '/profile',
            icon: <IconMenus.customers fontSize='small' />
          }
        ]}
      />
      Profile
    </Box>
  )
}

export default ProfileView
