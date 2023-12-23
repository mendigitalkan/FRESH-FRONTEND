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
import AddIcon from '@mui/icons-material/Add'
import { Button } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'

export default function SettingsView() {
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
        <GridToolbarExport />
        <Button
          color='primary'
          variant='outlined'
          startIcon={<AddIcon />}
          onClick={() => {}}
        >
          Add Product
        </Button>
      </GridToolbarContainer>
    )
  }

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const [tableData, setTableData] = useState<GridRowsProp[]>([])

  const { handleGetTableDataRequest } = useHttp()

  const getTableData = async () => {
    try {
      const result = await handleGetTableDataRequest({
        path: '/products/list',
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: {
          // ...filter
        }
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
