import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { grey } from '@mui/material/colors'
import {
  Alert,
  AlertTitle,
  Avatar,
  Backdrop,
  CircularProgress,
  Container,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  Tooltip
} from '@mui/material'
import AdbIcon from '@mui/icons-material/Adb'
import { useAppContext } from '../context/app.context'
import { IconMenus } from '../components/icon'
import { useToken } from '../hooks/token'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

export default function AppLayout() {
  const theme = useTheme()
  const [openDrawer, setOpenDrawer] = useState(true)
  const { appAlert, setAppAlert, isLoading, setIsLoading } = useAppContext()
  const { removeToken } = useToken()
  const navigate = useNavigate()

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const menuItems = [
    { title: 'Dashboard', link: '/', icon: <IconMenus.dashboard /> },
    { title: 'Products', link: '/products', icon: <IconMenus.products /> },
    { title: 'Customers', link: '/customers', icon: <IconMenus.customers /> },
    { title: 'Orders', link: '/orders', icon: <IconMenus.orders /> },
    { title: 'Transactions', link: '/transactions', icon: <IconMenus.transaction /> },
    { title: 'Wa Blas', link: '/wa-blas', icon: <IconMenus.waBlas /> },
    { title: 'Settings', link: '/settings', icon: <IconMenus.setting /> },
    { title: 'Profile', link: '/profile', icon: <IconMenus.profile /> }
  ]

  const [activeLink, setActiveLink] = useState('/')
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: grey[50], minHeight: window.innerHeight }}>
      <CssBaseline />
      <AppBar position='fixed' open={openDrawer}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawer}
              edge='start'
              sx={{
                marginRight: 5,
                ...(openDrawer && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#app-bar-with-responsive-menu'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu()
                    navigate('/profile')
                  }}
                >
                  <Typography textAlign='center'>Profile</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu()
                    removeToken()
                    navigate('/')
                    window.location.reload()
                  }}
                >
                  <Typography textAlign='center'>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer variant='permanent' open={openDrawer}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              disablePadding
              sx={{
                display: 'block',
                backgroundColor: activeLink === item.link ? grey[200] : 'inherit'
              }}
              key={index}
              onClick={() => setActiveLink(item.link)}
            >
              <Link
                to={item.link}
                style={{
                  textDecoration: 'none',
                  color: 'inherit'
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openDrawer ? 'initial' : 'center',
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: openDrawer ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: openDrawer ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, margin: 0, p: 3 }}>
        <DrawerHeader />
        {isLoading ? (
          <Backdrop
            sx={{
              color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backgroundColor: 'rgba(0, 0, 0, 0.2)'
            }}
            open={isLoading}
            onClick={() => setIsLoading(false)}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        ) : (
          <Outlet />
        )}
        <Stack direction='row' justifyContent='flex-end' zIndex={10}>
          <Snackbar
            open={appAlert.isDisplayAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={5000}
            onClose={() => {
              setAppAlert({
                isDisplayAlert: false,
                message: '',
                alertType: undefined
              })
            }}
          >
            <Alert severity={appAlert.alertType}>
              <AlertTitle>{appAlert?.alertType?.toUpperCase()}</AlertTitle>
              {appAlert.message}
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </Box>
  )
}
