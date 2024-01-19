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
import { Add, MoreOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useHttp } from '../../hooks/http'
import { Button, Stack, TextField } from '@mui/material'
import BreadCrumberStyle from '../../components/breadcrumb/Index'
import { IconMenus } from '../../components/icon'
import { useNavigate } from 'react-router-dom'
import ModalStyle from '../../components/modal'
import { IUserModel } from '../../models/userModel'

const AdminListView = () => {
  const [search, setSearch] = useState<string>('')
  const [tableData, setTableData] = useState<GridRowsProp[]>([])
  const { handleGetTableDataRequest, handleRemoveRequest } = useHttp()
  const navigation = useNavigate()

  const [modalDeleteData, setModalDeleteData] = useState<IUserModel>()
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0
  })

  const getTableData = async () => {
    try {
      const result = await handleGetTableDataRequest({
        path: '/users/admins',
        page: paginationModel.page ?? 0,
        size: paginationModel.pageSize ?? 10,
        filter: { search }
      })

      if (result) {
        setTableData(result.items)
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  const handleDeleteAdmin = async (userId: string) => {
    await handleRemoveRequest({
      path: '/users?userId=' + userId
    })
    window.location.reload()
  }

  const handleOpenModalDelete = (data: IUserModel) => {
    setModalDeleteData(data)
    setOpenModalDelete(!openModalDelete)
  }

  useEffect(() => {
    getTableData()
  }, [paginationModel])

  const columns: GridColDef[] = [
    {
      field: 'userName',
      flex: 1,
      renderHeader: () => <strong>{'NAMA'}</strong>,
      editable: true
    },
    {
      field: 'userPhoneNumber',
      renderHeader: () => <strong>{'TELEPON'}</strong>,
      flex: 1,
      editable: true
    },
    {
      field: 'userRole',
      renderHeader: () => <strong>{'Role'}</strong>,
      flex: 1,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['admin', 'superAdmin']
    },
    {
      field: 'createdAt',
      renderHeader: () => <strong>{'DIBUAT PADA'}</strong>,
      editable: true
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
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={() => navigation('/admins/edit/' + row.adminId)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon color='error' />}
            label='Delete'
            onClick={() => handleOpenModalDelete(row)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<MoreOutlined color='info' />}
            label='Detail'
            onClick={() => navigation('/admins/detail/' + row.adminId)}
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
          <Button
            startIcon={<Add />}
            variant='outlined'
            onClick={() => navigation('/admins/create')}
          >
            Tambah Admin
          </Button>
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
            label: 'Admin',
            link: '/admins',
            icon: <IconMenus.admin fontSize='small' />
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

      <ModalStyle
        openModal={openModalDelete}
        handleModalOnCancel={() => setOpenModalDelete(false)}
        message={
          'Apakah anda yakin ingin menghapus postingan ' + modalDeleteData?.userName
        }
        handleModal={() => {
          handleDeleteAdmin(modalDeleteData?.userId ?? '')
          setOpenModalDelete(!openModalDelete)
        }}
      />
    </Box>
  )
}

export default AdminListView
