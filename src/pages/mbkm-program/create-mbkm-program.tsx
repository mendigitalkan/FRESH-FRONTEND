import { Label, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from '../../components'
import { listProgramType } from '../../data/program-type'
import { MbkmProgramCreateTypes } from '../../models/mbkm-program'
import { SemesterTypes } from '../../models/semester'
import ButtonUploadFile from '../../components/button/button-upload'
import { useHttp } from '../../hooks/useHttp'
import { apiUrlPath } from '../../configs/apiPath'
import { IMbkmProgramTypeModel } from '../../models/mbkm-program-types'

const MbkmProgramCreatView = () => {
  const [listOfSemester, setListOfSemester] = useState<SemesterTypes[]>([])
  const [mbkmProgramSyllabus, setMbkmProgramSyllabus] = useState('')
  const [mbkmProgramName, setMbkmProgramName] = useState('')
  const [mbkmProgramCategory, setMbkmProgramCategory] = useState('')
  const [mbkmProgramTypes, setMbkmProgramTypes] = useState<IMbkmProgramTypeModel[]>([])
  const { handleGetRequest, handlePostRequest } = useHttp()
  const navigate = useNavigate()

  const fecthSemester = async () => {
    const result = await handleGetRequest({
      path: `${apiUrlPath.semesters.get}?semester_status=active`
    })
    if (result) {
      setListOfSemester(result.items)
    }
  }

  const fecthMbkmProgramTypes = async () => {
    const result = await handleGetRequest({
      path: apiUrlPath.mbkmProgramTypes.get
    })
    if (result) {
      setMbkmProgramTypes(result.items)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const data: MbkmProgramCreateTypes = {
        mbkmProgramCreatedBy: 'lp3m',
        mbkmProgramName: mbkmProgramName,
        mbkmProgramCategory: mbkmProgramCategory,
        mbkmProgramSyllabus: mbkmProgramSyllabus,
        mbkmProgramSemesterId: listOfSemester[0].semesterId + ''
      }

      await handlePostRequest({
        path: apiUrlPath.mbkmPrograms.post,
        body: data
      })
      navigate('/mbkm-programs')
    } catch (error: any) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    fecthSemester()
    fecthMbkmProgramTypes()
  }, [])

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/mbkm-programs',
            title: 'MBKM Program'
          },
          {
            link: '/mbkm-programs/create',
            title: 'Create'
          }
        ]}
        icon={BASE_MENU_ICON.MbkmProgramIcon}
      />
      <div className='bg-white border border-2 border-gray-200 rounded-lg p-10'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='name' value='Nama' />
            </div>
            <TextInput
              value={mbkmProgramName}
              onChange={(e) => setMbkmProgramName(e.target.value)}
              type='text'
              placeholder='nama...'
              required={true}
            />
          </div>

          <div id='select'>
            <div className='mb-2 block'>
              <Label
                htmlFor='jenis program MBKM yang di ikuti'
                value='jenis program MBKM yang di ikuti'
              />
            </div>
            <Select
              onChange={(e) => setMbkmProgramCategory(e.target.value)}
              required={true}
            >
              <option value={''}>pilih jenis program</option>
              {mbkmProgramTypes.map((item, index) => (
                <option key={index} value={item.mbkmProgramTypeName}>
                  {item.mbkmProgramTypeName}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <div className='mb-2 block'>
              <Label htmlFor='file' value='upload syllabus' />
            </div>
            <ButtonUploadFile onUpload={setMbkmProgramSyllabus} />
          </div>

          <div className='flex justify-end'>
            <ButtonStyle title='Submit' type='submit' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default MbkmProgramCreatView
