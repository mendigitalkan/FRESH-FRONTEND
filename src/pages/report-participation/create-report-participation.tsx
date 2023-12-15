import { Label, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from '../../components'
import { ReportParticipationTypes } from '../../models/report-participation'
import FileUploadButton from '../../components/button/button-upload'
import { useHttp } from '../../hooks/useHttp'
import { apiUrlPath } from '../../configs/apiPath'
import { listProgramType } from '../../data/program-type'

const ReportParicipationCreateView = () => {
  const [reportParticipationFile, setReportParticipationFile] = useState<string>('')
  const [mbkmProgramCategory, setMbkmProgramCategory] = useState<string>('')
  const [mbkmProgramName, setMbkmProgramName] = useState<string>('')
  const [recomdationLetter, setRecomendationLetter] = useState<string>('')
  const { handlePostRequest } = useHttp()

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload: ReportParticipationTypes = {
      reportParticipationLetter: reportParticipationFile,
      reportParticipationMbkmProgramCategory: mbkmProgramCategory,
      reportParticipationMbkmProgramName: mbkmProgramName,
      reportParticipationRecomendationLetter: recomdationLetter
    }
    await handlePostRequest({
      path: apiUrlPath.reportParticipations.post,
      body: payload
    })
    navigate('/report-participations')
  }

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/report-participation',
            title: 'Lapor keikutsertaan'
          },
          {
            link: '/report-participation/create',
            title: 'Buat'
          }
        ]}
        icon={BASE_MENU_ICON.ReportParicipationIcon}
      />

      <div className='bg-white border border-2 border-gray-200 rounded-lg p-10'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='name' value='Nama Program' />
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
              {listProgramType.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </div>

          <div className='flex items-center gap-2'>
            <div className='mb-2 block'>
              <Label htmlFor='file' value='upload bukti keikutsertaan : ' />
            </div>
            <FileUploadButton onUpload={setReportParticipationFile} />
          </div>

          <div className='flex items-center gap-2'>
            <div className='mb-2 block'>
              <Label htmlFor='file' value='upload surat rekomendasi : ' />
            </div>
            <FileUploadButton onUpload={setRecomendationLetter} />
          </div>

          <div className='flex justify-end'>
            <ButtonStyle title='Submit' type='submit' />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReportParicipationCreateView
