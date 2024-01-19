import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { Card, List } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import EmailIcon from '@mui/icons-material/Email'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { useHttp } from '../../hooks/http'
import { useEffect, useState } from 'react'
import { IUserModel } from '../../models/userModel'

const ProfileView = () => {
  const { handleGetRequest } = useHttp()
  const [detailProfile, setDetailProfile] = useState<IUserModel>()

  const getMyProfile = async () => {
    const result = await handleGetRequest({
      path: '/my-profile'
    })

    console.log(result)
    setDetailProfile(result)
  }

  useEffect(() => {
    getMyProfile()
  }, [])

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Profile',
            link: '/profile',
            icon: <IconMenus.profile fontSize='small' />
          }
        ]}
      />

      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '290px', sm: '400px', md: '500px' },
          height: { xs: '250px', sm: '300px' }
        }}
      >
        <h1 style={{ textAlign: 'center' }}>My Profile</h1>
        <List>
          <ListItemButton>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary={detailProfile?.userName} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={detailProfile?.userEmail} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <LocalPhoneIcon />
            </ListItemIcon>
            <ListItemText primary={detailProfile?.userPhoneNumber} />
          </ListItemButton>
        </List>
      </Card>
    </Box>
  )
}

export default ProfileView
