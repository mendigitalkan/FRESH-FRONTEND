import { ReactElement, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from '../../components'
import ListItemStyle from '../../components/list'
import { StudentTypes } from '../../models/student'
import { Label, TextInput } from 'flowbite-react'
import { TableHeader, TableStyle } from '../../components/table/Table'
import { AppContextTypes, useAppContext } from '../../context/app.context'
import { useHttp } from '../../hooks/useHttp'
import { TranskripTypes } from '../../models/transkrip'
import ModalStyle from '../../components/modal'
import ButtonTable from '../../components/button/ButtonTable'

interface SksConvertionTypes {
  mataKuliah: {
    mataKuliahName: string
    mataKuliahSksTotal: number
  }
  transkripId: string
  transkripMataKuliahGrade: number
}

const StudentDetailView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { studentId } = useParams()
  const [studentDetails, setStudentDetails] = useState<StudentTypes>()
  const [listOfMataKuliahTranskrip, setListOfMataKuliahTranskrip] = useState<any>()
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [modalDeleteData, setModalDeleteData] = useState<TranskripTypes>()
  const { currentUser }: AppContextTypes = useAppContext()
  const navigate = useNavigate()

  const { handleGetRequest, handleGetTableDataRequest, handleRemoveRequest } = useHttp()

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete)
  }

  const handleModaDataSelected = (item: any) => {
    setModalDeleteData(item)
  }

  const handleDeleteMbkmProgram = async () => {
    await handleRemoveRequest({
      path: `/transkrip?id=${modalDeleteData?.transkripId}`
    })
    setOpenModalDelete(false)
    window.location.reload()
  }

  const fecthMataKuliahTranskrip = async () => {
    const result = await handleGetTableDataRequest({
      path: `/transkrip`
    })

    setListOfMataKuliahTranskrip({
      link: `/transkrip`,
      data: result,
      page: 0,
      size: 10,
      filter: {
        search: ''
      }
    })
  }

  const fecthDetailStudent = async () => {
    const result = await handleGetRequest({
      path: `/students/detail/${studentId}`
    })
    setStudentDetails(result)
  }

  const fecthData = async () => {
    await fecthDetailStudent()
    await fecthMataKuliahTranskrip()
    setIsLoading(false)
  }

  useEffect(() => {
    fecthData()
  }, [])

  if (isLoading) return <h1>loading...</h1>

  const tableHeaderMataKuliah: TableHeader[] = [
    {
      title: 'No',
      data: (data: SksConvertionTypes, index: number): ReactElement => (
        <td key={index + '-no'} className='md:px-6 md:py-3 break-all'>
          {index + 1}
        </td>
      )
    },

    {
      title: 'Nama',
      data: (data: SksConvertionTypes, index: number): ReactElement => (
        <td key={index + 'name'} className='md:px-6 md:py-3 break-all'>
          {data.mataKuliah.mataKuliahName}
        </td>
      )
    },

    {
      title: 'total sks',
      data: (data: SksConvertionTypes, index: number): ReactElement => (
        <td key={index + 'sks'} className='md:px-6 md:py-3 break-all'>
          {data.mataKuliah.mataKuliahSksTotal || '_'}
        </td>
      )
    },

    {
      title: 'Nilai',
      data: (data: SksConvertionTypes, index: number): ReactElement => (
        <td key={index + 'nilai'} className='md:px-6 md:py-3 break-all'>
          {data.transkripMataKuliahGrade || 'T'}
        </td>
      )
    }
  ]

  if (currentUser.userRole === 'studyProgram' && studentDetails?.mbkmProgram) {
    tableHeaderMataKuliah.push({
      title: 'Action',
      action: true,
      data: (data: SksConvertionTypes, index: number): ReactElement => (
        <td key={index + 'action'} className='md:px-6 md:py-3'>
          <ButtonTable
            title='Hapus'
            variant='danger'
            onClick={() => {
              handleModalDelete()
              handleModaDataSelected(data)
            }}
          />
        </td>
      )
    })
  }

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/students',
            title: 'Mahasiswa'
          },
          {
            link: '/students/' + studentId,
            title: 'Detail'
          }
        ]}
        icon={BASE_MENU_ICON.ReportParicipationIcon}
      />

      <div className='bg-white border border-2 border-gray-200 rounded-lg p-10'>
        <div className='sm:flex justify-between gap-5'>
          <dl className='max-w-md sm:w-1/2 text-gray-900 divide-y divide-gray-200'>
            <ListItemStyle title='Nama' description={studentDetails?.studentName} />
            <ListItemStyle title='NIM' description={studentDetails?.studentNim} />
            <ListItemStyle
              title='Prodi'
              description={studentDetails?.studentStudyProgramName}
            />
            <ListItemStyle
              title='Jurusan'
              description={studentDetails?.studentDepartmentName}
            />
          </dl>

          <dl className='max-w-md sm:w-1/2 text-gray-900 divide-y divide-gray-200'>
            <ListItemStyle
              title='Program MBKM'
              description={studentDetails?.mbkmProgram?.mbkmProgramName}
            />
            <ListItemStyle
              title='Kategori Program MBKM'
              description={studentDetails?.mbkmProgram?.mbkmProgramCategory}
            />
            <ListItemStyle
              title='Silabus'
              url={studentDetails?.mbkmProgram?.mbkmProgramSyllabus}
            />
          </dl>
        </div>
      </div>

      {studentDetails?.mbkmProgram && (
        <div className='flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5'>
          <div className='mb-2 block'>
            <Label value={'Transkrip Nilai'} />
          </div>
          {currentUser.userRole === 'studyProgram' && (
            <div className='flex flex-col md:flex-row justify-between md:px-0'>
              <div className='flex items-center justify-between'>
                <div className='mr-2 flex flex-row justify-between md:justify-start'>
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
                </div>
                <ButtonStyle
                  title='Tambah Mata Kuliah'
                  onClick={() =>
                    navigate(`/students/detail/${studentId}/create-sks-convertion`)
                  }
                />
              </div>
              <div className='mt-1 w-full md:w-1/5'>
                <TextInput type='text' placeholder='search...' />
              </div>
            </div>
          )}

          <TableStyle header={tableHeaderMataKuliah} table={listOfMataKuliahTranskrip} />

          <ModalStyle
            onBtnNoClick={handleModalDelete}
            title={`Apakah anda yakin ingin menghapus ${modalDeleteData?.mataKuliah.mataKuliahName}`}
            isOpen={openModalDelete}
            onBtnYesClick={handleDeleteMbkmProgram}
            onOpen={handleModalDelete}
          />
        </div>
      )}
    </div>
  )
}

export default StudentDetailView
