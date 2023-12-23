/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import {
  GridRowsProp,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport
} from '@mui/x-data-grid'
import { MoreOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http'
import { Stack, TextField } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

const OrderView = () => {
  const [search, setSearch] = useState<string>('')
  const [tableData, setTableData] = useState<GridRowsProp[]>([])
  const { handleGetTableDataRequest } = useHttp()
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const getTableData = async () => {
    try {
      const result = await handleGetTableDataRequest({
        path: '/products/list',
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search }
      })
      if (result) {
        console.log(result)
        setTableData(result.items)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    getTableData()
  }, [paginationModel])

  const columns: GridColDef[] = [
    {
      field: 'productName',
      flex: 1,
      renderHeader: () => <strong>{'PRODUCT NAME'}</strong>,
      editable: true
    },
    {
      field: 'productDescription',
      renderHeader: () => <strong>{'DESCRIPTION'}</strong>,
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development']
    },
    {
      field: 'productPrice',
      renderHeader: () => <strong>{'PRICE'}</strong>,
      type: 'number',
      flex: 1,
      align: 'left',
      headerAlign: 'left',
      editable: true
    },
    {
      field: 'actions',
      type: 'actions',
      renderHeader: () => <strong>{'ACTION'}</strong>,
      flex: 1,
      cellClassName: 'actions',
      getActions: () => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            // onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label='Delete'
            // onClick={handleDeleteClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<MoreOutlined color='info' />}
            label='Detail'
            // onClick={handleDeleteClick(id)}
            color='inherit'
          />
        ]
      }
    }
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Stack direction='row' spacing={2}>
          <GridToolbarExport />
        </Stack>
        <TextField
          size='small'
          placeholder='search...'
          onChange={(e) => setSearch(e.target.value)}
        />
      </GridToolbarContainer>
    )
  }

  return (
    <Box>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Orders',
            link: '/orders',
            icon: <IconMenus.orders fontSize='small' />
          }
        ]}
      />
      <Box
        sx={{
          width: '100%',
          '& .actions': {
            color: 'text.secondary'
          },
          '& .textPrimary': {
            color: 'text.primary'
          }
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          editMode='row'
          sx={{ padding: 2 }}
          initialState={{
            pagination: { paginationModel: { pageSize: 2, page: 0 } }
          }}
          pageSizeOptions={[2, 5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          slots={{
            toolbar: CustomToolbar
          }}
        />
      </Box>
    </Box>
  )
}

export default OrderView
