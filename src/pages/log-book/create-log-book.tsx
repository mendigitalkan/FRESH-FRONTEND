import { Label, Select, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from '../../components'
import FileUploadButton from '../../components/button/button-upload'
import { LogBookCreateRequestTypes } from '../../models/log-book'
import { useHttp } from '../../hooks/useHttp'
import { apiUrlPath } from '../../configs/apiPath'

const LogBookCreateView = () => {
  const [logBookWeek, setLogBookWeek] = useState<number>(0)
  const [logBookReportFile, setLogBookReportFile] = useState<string>('')
  const navigate = useNavigate()
  const { handlePostRequest } = useHttp()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data: LogBookCreateRequestTypes = {
      logBookReportWeek: logBookWeek,
      logBookReportFile: logBookReportFile
    }
    await handlePostRequest({
      path: apiUrlPath.logBooks.post,
      body: data
    })
    navigate('/log-books')
  }

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/log-books',
            title: 'Daftar Log Book'
          },
          {
            link: '/log-books/create',
            title: 'Buat'
          }
        ]}
        icon={BASE_ICON.MENU.SemesterIcon}
      />
      <div className='bg-white border border-2 border-gray-200 rounded-lg p-10'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div id='select'>
            <div className='mb-2 block'>
              <Label value='pilih laporan minggu ke-' />
            </div>
            <TextInput
              type='number'
              onChange={(e) => setLogBookWeek(+e.target.value)}
              required
              min={1}
              max={20}
              value={logBookWeek}
            />
            {/* <Select onChange={(e) => setLogBookWeek(+e.target.value)} required={true} >
              <option value={''}>minggu</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((name, index) => (
                <option key={index} value={name}>
                  minggu ke-{name}
                </option>
              ))}
            </Select> */}
          </div>
          <div>
            <div className='mb-2 block'>
              <Label htmlFor='file' value='upload log book, maks 2mb' />
            </div>
            <FileUploadButton onUpload={setLogBookReportFile} />
          </div>

          <div className='flex justify-end'>
            <ButtonStyle
              title='Serahkan'
              type='submit'
              disabled={!logBookReportFile || !logBookWeek}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default LogBookCreateView
