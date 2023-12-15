import { Badge, TextInput } from 'flowbite-react'
import { ReactElement, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_ICON, BreadcrumbStyle } from '../../components'
import { ButtonStyle } from '../../components'
import { TableHeader, TableStyle } from '../../components/table/Table'
import { AppContextTypes, useAppContext } from '../../context/app.context'
import { useHttp } from '../../hooks/useHttp'
import { MataKuliahTypes } from '../../models/mata-kuliah'
import { apiUrlPath } from '../../configs/apiPath'
import ButtonTable from '../../components/button/ButtonTable'

const MataKuliahVerificationListView = () => {
  const [listMataKuliah, setListMataKuliah] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser, errorMessage }: AppContextTypes = useAppContext()
  const navigate = useNavigate()
  const { handleGetTableDataRequest } = useHttp()

  const fecthData = async () => {
    const result = await handleGetTableDataRequest({
      path: apiUrlPath.mataKuliah.get
    })

    setListMataKuliah({
      link: apiUrlPath.mataKuliah.get,
      data: result || [],
      page: 0,
      size: 10,
      filter: {
        search: ''
      }
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fecthData()
  }, [])

  const header: TableHeader[] = [
    {
      title: 'No',
      data: (data: MataKuliahTypes, index: number): ReactElement => (
        <td key={index + '-no'} className='md:px-6 md:py-3 break-all'>
          {index + 1}
        </td>
      )
    },

    {
      title: 'Nama',
      data: (data: MataKuliahTypes, index: number): ReactElement => (
        <td key={index + 'name'} className='md:px-6 md:py-3 break-all'>
          {data.mataKuliahName}
        </td>
      )
    },
    {
      title: 'total sks',
      data: (data: MataKuliahTypes, index: number): ReactElement => (
        <td key={index + 'sks'} className='md:px-6 md:py-3 break-all'>
          {data.mataKuliahSksTotal}
        </td>
      )
    },
    {
      title: 'Program Studi',
      data: (data: MataKuliahTypes, index: number): ReactElement => (
        <td key={index + 'program studi'} className='md:px-6 md:py-3 break-all'>
          {data.mataKuliahStudyProgramName}
        </td>
      )
    },
    {
      title: 'Jurusan',
      data: (data: MataKuliahTypes, index: number): ReactElement => (
        <td key={index + 'jurusan'} className='md:px-6 md:py-3 break-all'>
          {data.mataKuliahDepartmentName}
        </td>
      )
    },
    {
      title: 'Status Verifikasi',
      data: (data: MataKuliahTypes, index: number): ReactElement => {
        if (data.mataKuliahVerificationStatus === 'accepted') {
          return (
            <td key={index + 'verifikasi'} className='md:px-6 md:py-3'>
              <Badge color='success' className='w-20 text-center'>
                diterima
              </Badge>
            </td>
          )
        }

        if (data.mataKuliahVerificationStatus === 'rejected') {
          return (
            <td key={index + 'verifikasi'} className='md:px-6 md:py-3'>
              <Badge color='failure' className='w-20 text-center'>
                ditolak
              </Badge>
            </td>
          )
        }
        return (
          <td key={index + 'verifikasi'} className='md:px-6 md:py-3'>
            <Badge color='warning' className='w-20 text-center'>
              menunggu
            </Badge>
          </td>
        )
      }
    }
  ]

  if (currentUser.userRole === 'academic') {
    header.push({
      title: 'Action',
      action: true,
      data: (data: MataKuliahTypes, index: number): ReactElement => (
        <td key={index + 'action'} className='md:px-6 md:py-3'>
          <div className='flex items-center gap-1'>
            <Link to={`/mata-kuliah/verification/detail/${data.mataKuliahId}`}>
              <ButtonTable title='Detail' variant='primary' />
            </Link>
          </div>
        </td>
      )
    })
  }

  if (isLoading) return <div>loading...</div>

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/mata-kuliah/verification',
            title: 'Verifikasi Mata Kuliah'
          },
          {
            link: '/mata-kuliah/verification',
            title: 'List'
          }
        ]}
        icon={BASE_ICON.MENU.MataKuliahIcon}
      />

      <div className='flex flex-col md:flex-row justify-between md:px-0'>
        <div className='flex items-center'>
          <div className='w-full flex flex-row justify-between md:justify-start gap-2 '>
            <select
              name='size'
              defaultValue={10}
              className='block w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
            >
              <option value='2'>2</option>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
            {currentUser.userRole === 'academic' && (
              <ButtonStyle title='Sinkronisasi ke Siakad' />
            )}
            {currentUser.userRole === 'studyProgram' && (
              <ButtonStyle
                title='Create'
                onClick={() => navigate('/mata-kuliah/create')}
              />
            )}
          </div>
        </div>
        <div className='mt-1 w-full md:w-1/5'>
          <TextInput type='text' placeholder='search...' />
        </div>
      </div>
      <TableStyle header={header} table={listMataKuliah} />
    </div>
  )
}

export default MataKuliahVerificationListView
