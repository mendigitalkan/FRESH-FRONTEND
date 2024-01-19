/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box'
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
import { useNavigate } from 'react-router-dom'
import { convertTime } from '../../utilities/convertTime'

export default function ListTransactionView() {
  const navigation = useNavigate()
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
        path: '/transactions',
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
    // {
    //   field: 'orderProductName',
    //   flex: 1,
    //   renderHeader: () => <strong>{'Nama'}</strong>,
    //   editable: true
    // },
    // {
    //   field: 'orderProductPrice',
    //   flex: 1,
    //   renderHeader: () => <strong>{'Harga'}</strong>,
    //   editable: true
    // },
    // {
    //   field: 'orderStatus',
    //   flex: 1,
    //   renderHeader: () => <strong>{'Status'}</strong>,
    //   editable: true
    // },
    {
      field: 'createdAt',
      flex: 1,
      renderHeader: () => <strong>{'Dipesan pada'}</strong>,
      editable: true,
      valueFormatter: (item) => convertTime(item.value)
    },
    {
      field: 'actions',
      type: 'actions',
      renderHeader: () => <strong>{'ACTION'}</strong>,
      flex: 1,
      cellClassName: 'actions',
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            icon={<MoreOutlined color='info' />}
            label='Detail'
            onClick={() => navigation('/transactions/detail/' + row.transactionId)}
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
    <>
      <BreadCrumberStyle
        navigation={[
          {
            label: 'Customers',
            link: '/customers',
            icon: <IconMenus.transaction fontSize='small' />
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
    </>
  )
}
