import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import GeneralSettingsView from './GeneralSettingsView'
import BannerSettingsView from './BannerSettingsView'
import MyAddressSettingsView from './MyAddressSettingsView'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function SettingsView() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event)
    setValue(newValue)
  }

  return (
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Settings',
            link: '/settings',
            icon: <IconMenus.settings fontSize='small' />
          }
        ]}
      />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab label='Umum' {...a11yProps(0)} />
            <Tab label='Banner' {...a11yProps(1)} />
            <Tab label='Address' {...a11yProps(2)} />
            <Tab label='Secret' {...a11yProps(3)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <GeneralSettingsView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <BannerSettingsView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MyAddressSettingsView />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <MyAddressSettingsView />
        </CustomTabPanel>
      </Box>
    </>
  )
}
