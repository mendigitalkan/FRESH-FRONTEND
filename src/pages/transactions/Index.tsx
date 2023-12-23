import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

const TransactionView = () => {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Transactions',
            link: '/transactions',
            icon: <IconMenus.transaction fontSize='small' />
          }
        ]}
      />
      Transaction
    </Box>
  )
}

export default TransactionView
