import { Box } from '@mui/material'
import { IconMenus } from '../../components/icon'
import BreadCrumberStyle from '../../components/breadcrumb/Index'

const CustomersView = () => {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Dashboard',
            link: '/',
            icon: <IconMenus.customers fontSize='small' />
          }
        ]}
      />
      Customers
    </Box>
  )
}

export default CustomersView
