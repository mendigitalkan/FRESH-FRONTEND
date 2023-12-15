import { ReactElement, lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from '../../components'
import { MbkmProgramTypes } from '../../models/mbkm-program'
import ListItemStyle from '../../components/list'
import { Label, TextInput } from 'flowbite-react'
import { TableHeader, TableStyle } from '../../components/table/Table'
import { MbkmProgramProdiTypes } from '../../models/mbkm-program-prodi'
import ModalStyle from '../../components/modal'
import { useHttp } from '../../hooks/useHttp'
import { apiUrlPath } from '../../configs/apiPath'
import { AppContextTypes, useAppContext } from '../../context/app.context'
import ButtonTable from '../../components/button/ButtonTable'
const ModalSelectStudyProgram = lazy(() => import('./modal-add-study-program'))

const MbkmProgramDetailView = () => {
  const [listOfStudyProgramRegistered, setListOfStudyProgramRegistered] = useState<any>()
  const [mbkmProgram, setMbkmProgram] = useState<MbkmProgramTypes>()
  const [openModalSelectStudyProgram, setOpenModalSelectStudyProgram] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [modalDeleteData, setModalDeleteData] = useState<MbkmProgramProdiTypes>()
  const [isLoading, setIsLoading] = useState(true)
  const { mbkmProgramId } = useParams()
  const { handleGetRequest, handleRemoveRequest, handleGetTableDataRequest } = useHttp()
  const { currentUser }: AppContextTypes = useAppContext()

  const handleModalDelete = () => {
    setOpenModalDelete(!openModalDelete)
  }

  const handleModaDataSelected = (item: MbkmProgramProdiTypes) => {
    setModalDeleteData(item)
  }

  const handleDeleteMbkmProgramParticipation = async () => {
    const programId = modalDeleteData?.mbkmProgramProdiProgramId
    await handleRemoveRequest({
      path: `${apiUrlPath.mbkmProgramProdi.delete}?programId=${programId}`
    })
    setOpenModalDelete(false)
    window.location.reload()
  }

  const fecthDetailMbkmProgram = async () => {
    const result = await handleGetRequest({
      path: `${apiUrlPath.mbkmPrograms.getDetail}/${mbkmProgramId}`
    })
    setMbkmProgram(result)
  }

  const fecthMbkmProgramProdi = async () => {
    const result = await handleGetTableDataRequest({
      path: `${apiUrlPath.mbkmProgramProdi.get}?programId=${mbkmProgramId}&&`
    })
    setListOfStudyProgramRegistered({
      link: `${apiUrlPath.mbkmProgramProdi.get}?programId=${mbkmProgramId}&&`,
      data: result,
      page: 0,
      size: 10,
      filter: {
        search: ''
      }
    })
  }

  const header: TableHeader[] = [
    {
      title: 'No',
      data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
        <td key={index + '-no'} className='md:px-6 md:py-3 break-all'>
          {index + 1}
        </td>
      )
    },

    {
      title: 'Prodi',
      data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
        <td key={index + 'name'} className='md:px-6 md:py-3 break-all'>
          {data.mbkmProgramProdiStudyProgramName}
        </td>
      )
    },

    {
      title: 'Jurusan',
      data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
        <td key={index + 'department'} className='md:px-6 md:py-3 break-all'>
          {data.mbkmProgramProdiDepartmentName}
        </td>
      )
    },

    {
      title: 'Action',
      action: true,
      data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
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
    }
  ]

  const fecthData = async () => {
    await fecthDetailMbkmProgram()
    await fecthMbkmProgramProdi()
    setIsLoading(false)
  }

  useEffect(() => {
    fecthData()
  }, [])

  if (isLoading) return <p>loading...</p>

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/mbkm-programs',
            title: 'Program MBKM'
          },
          {
            link: '/mbkm-programs/detail/' + mbkmProgramId,
            title: 'Detail'
          }
        ]}
        icon={BASE_MENU_ICON.MyProgramIcon}
      />

      <div className='bg-white border border-2 border-gray-200 rounded-lg p-10'>
        <dl className='max-w-md text-gray-900 divide-y divide-gray-200'>
          <ListItemStyle title='Nama' description={mbkmProgram?.mbkmProgramName} />
          <ListItemStyle
            title='kategori program'
            description={mbkmProgram?.mbkmProgramCategory}
          />
          <ListItemStyle
            title='Semester'
            description={mbkmProgram?.semester.semesterName}
          />
          <ListItemStyle
            title='Program Syllabus'
            url={mbkmProgram?.mbkmProgramSyllabus}
          />
        </dl>
      </div>

      <div className='flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5'>
        <div className='mb-2 block'>
          <Label value='Daftar Prodi' />
        </div>
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
            {currentUser.userRole === 'academic' && (
              <ButtonStyle
                title='Tambah Prodi'
                onClick={() => setOpenModalSelectStudyProgram(true)}
              />
            )}
          </div>
          <div className='mt-1 w-full md:w-1/5'>
            <TextInput type='text' placeholder='search...' />
          </div>
        </div>

        <TableStyle header={header} table={listOfStudyProgramRegistered} />
      </div>

      <ModalSelectStudyProgram
        mbkmProgram={mbkmProgram}
        isOpen={openModalSelectStudyProgram}
        onOpen={setOpenModalSelectStudyProgram}
      />

      <ModalStyle
        onBtnNoClick={handleModalDelete}
        title={`Apakah anda yakin ingin menghapus`}
        isOpen={openModalDelete}
        onBtnYesClick={handleDeleteMbkmProgramParticipation}
        onOpen={handleModalDelete}
      />
    </div>
  )
}
export default MbkmProgramDetailView
