import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_MENU_ICON, BreadcrumbStyle } from '../../components'
import ListItemStyle from '../../components/list'
import { TableHeader, TableStyle } from '../../components/table/Table'
import { StudyProgramTypes } from '../../models/study-program'
import { Label } from 'flowbite-react'
import { MbkmProgramProdiTypes } from '../../models/mbkm-program-prodi'
import { useHttp } from '../../hooks/useHttp'

const StudyProgramDetailView = () => {
  const [detailStudyProgram, setDetailStudyProgram] = useState<StudyProgramTypes>()
  const [mbkmPrograms, setMbkmPrograms] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const { studyProgramId } = useParams()
  const { handleGetRequest } = useHttp()

  const fecthMbkmProdi = async () => {
    const result = await handleGetRequest({
      path: `/mbkm-programs/prodi?mbkmProgramProdiStudyProgramId=${studyProgramId}`
    })

    result['page'] = 0
    result['size'] = 100

    setMbkmPrograms({
      link: '',
      data: result,
      page: 0,
      size: 10,
      filter: {
        search: ''
      }
    })
  }

  const fecthDetailStudyProgram = async () => {
    const result = await handleGetRequest({
      path: `/study-programs/detail/${studyProgramId}`
    })
    setDetailStudyProgram(result)
  }

  const fecthData = async () => {
    await fecthMbkmProdi()
    await fecthDetailStudyProgram()
    setIsLoading(false)
  }

  useEffect(() => {
    fecthData()
  }, [])

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
      title: 'Nama Program',
      data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
        <td key={index + 'name'} className='md:px-6 md:py-3 break-all'>
          {data.mbkmPrograms?.mbkmProgramName}
        </td>
      )
    },

    {
      title: 'Jenis Program',
      data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
        <td key={index + 'programtype'} className='md:px-6 md:py-3 break-all'>
          {data.mbkmPrograms?.mbkmProgramCategory.length > 10
            ? data.mbkmPrograms?.mbkmProgramCategory.slice(0, 10) + '.....'
            : data.mbkmPrograms?.mbkmProgramCategory}
        </td>
      )
    }
  ]

  if (isLoading) return <p>loading...</p>

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/study-programs',
            title: 'Program Studi'
          },
          {
            link: '/study-programs/detail/' + studyProgramId,
            title: 'Detail'
          }
        ]}
        icon={BASE_MENU_ICON.StudyProgramIcon}
      />

      <div className='bg-white border border-2 border-gray-200 rounded-lg p-8'>
        <dl className='max-w-md text-gray-900 divide-y divide-gray-200'>
          <ListItemStyle
            title='Nama'
            description={detailStudyProgram?.studyProgramName}
          />
          <ListItemStyle
            title='E-mail'
            description={detailStudyProgram?.studyProgramEmail}
          />
          <ListItemStyle
            title='Jurusan'
            description={detailStudyProgram?.studyProgramDepartmentName}
          />
        </dl>
      </div>

      <div className='flex flex-col gap-2 bg-white border border-2 border-gray-200 rounded-lg p-8 my-5'>
        <div className='mb-2 block'>
          <Label value='Daftar program MBKM yang diikuti' />
        </div>
        <TableStyle header={header} table={mbkmPrograms} />
      </div>
    </div>
  )
}

export default StudyProgramDetailView
