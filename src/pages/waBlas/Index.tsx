import { Box } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

const WaBlasView = () => {
  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'wa blas',
            link: '/wa-blas',
            icon: <IconMenus.waBlas fontSize='small' />
          }
        ]}
      />
      Wa Blas
    </Box>
  )
}

export default WaBlasView
