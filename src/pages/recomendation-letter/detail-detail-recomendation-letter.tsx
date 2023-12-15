import { Textarea, Timeline } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from '../../components'
import { BiCalendar } from 'react-icons/bi'
import {
  RecomendationLetterTypes,
  RequestChangeStatusApprovalTypes,
  RequestChangeStatusAssignMentTypes
} from '../../models/recomendation-letter'
import ListItemStyle from '../../components/list'
import FileUploadButton from '../../components/button/button-upload'
import { AppContextTypes, useAppContext } from '../../context/app.context'
import { useHttp } from '../../hooks/useHttp'
import { apiUrlPath } from '../../configs/apiPath'
import ButtonTable from '../../components/button/ButtonTable'

const RecomendationLetterDetail = () => {
  const [recomendationLetter, setRecomendationLetter] =
    useState<RecomendationLetterTypes>()
  const [recomendationLetterStatusMessage, setRecomendationLetterStatusMessage] =
    useState<string>('')
  const [recomendationLetterApprovalLetter, setRecomendationLetterApprovalLetter] =
    useState<string>('')

  const [recomendationLetterSptjmLetter, setRecomendationLetterSptjmLetter] =
    useState<string>('')

  const { recomendationLetterId }: any = useParams()
  const { currentUser }: AppContextTypes = useAppContext()
  const navigation = useNavigate()
  const { handleGetRequest, handleUpdateRequest } = useHttp()

  const fecthRecomendationLetter = async () => {
    const result = await handleGetRequest({
      path: `${apiUrlPath.recomendDatationLetters.getDetail}/${recomendationLetterId}`
    })
    setRecomendationLetter(result)
    console.log(result)
  }

  const handleChangeStatusAssignMent = async () => {
    const payload: RequestChangeStatusAssignMentTypes = {
      recomendationLetterId,
      recomendationLetterApprovalLetter,
      recomendationLetterSptjmLetter
    }
    await handleUpdateRequest({
      path: apiUrlPath.recomendDatationLetters.changeStatusAssignment,
      body: payload
    })
    navigation('/recomendation-letters')
  }

  const handleChangeStatusApproval = async (
    recomendationLetterStatus: 'waiting' | 'accepted' | 'rejected'
  ) => {
    const payload: RequestChangeStatusApprovalTypes = {
      recomendationLetterId,
      recomendationLetterStatus,
      recomendationLetterStatusMessage
    }
    await handleUpdateRequest({
      path: apiUrlPath.recomendDatationLetters.changeStatusApproval,
      body: payload
    })
    navigation('/recomendation-letters')
  }

  useEffect(() => {
    fecthRecomendationLetter()
  }, [])

  const dateTime = new Date()

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/recomendation-letters',
            title: 'Surat Rekomendasi'
          },
          {
            link: '/recomendation-letters/' + recomendationLetterId,
            title: 'Detail'
          }
        ]}
        icon={BASE_ICON.MENU.RecomendationLetterIcon}
      />

      <div className='bg-white border border-gray-200 rounded-lg shadow mb-5 p-10 sm:p-8'>
        <Timeline horizontal={true}>
          {recomendationLetter?.recomendationLetterAssignToStudyProgram && (
            <Timeline.Item>
              <Timeline.Point icon={BiCalendar} />
              <Timeline.Content>
                <Timeline.Title>Diteruskan ke prodi</Timeline.Title>
                <Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          )}
          {recomendationLetter?.recomendationLetterAssignToDepartment && (
            <Timeline.Item>
              <Timeline.Point icon={BiCalendar} />
              <Timeline.Content>
                <Timeline.Title>Diteruskan ke Jurusan</Timeline.Title>
                <Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          )}
          {recomendationLetter?.recomendationLetterAssignToLp3m && (
            <Timeline.Item>
              <Timeline.Point icon={BiCalendar} />
              <Timeline.Content>
                <Timeline.Title>Diteruskan ke LP3M</Timeline.Title>
                <Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          )}
          {recomendationLetter?.recomendationLetterAssignToAcademic && (
            <Timeline.Item>
              <Timeline.Point icon={BiCalendar} />
              <Timeline.Content>
                <Timeline.Title>Diteruskan ke akademik</Timeline.Title>
                <Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          )}

          {recomendationLetter?.recomendationLetterStatus === 'accepted' && (
            <Timeline.Item>
              <Timeline.Point icon={BiCalendar} />
              <Timeline.Content>
                <Timeline.Title>Selesai</Timeline.Title>
                <Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
              </Timeline.Content>
            </Timeline.Item>
          )}
        </Timeline>
      </div>

      <div className='bg-white border border-2 mb-5 border-gray-200 rounded-lg p-10'>
        <div className='sm:flex justify-between gap-5'>
          <dl className='max-w-md sm:w-1/2 text-gray-900 divide-y divide-gray-200'>
            <ListItemStyle
              title='Nama'
              description={recomendationLetter?.student?.studentName}
            />
            <ListItemStyle
              title='NIM'
              description={recomendationLetter?.student?.studentNim}
            />
            <ListItemStyle
              title='Prodi'
              description={recomendationLetter?.student?.studentStudyProgramName}
            />
            <ListItemStyle
              title='Jurusan'
              description={recomendationLetter?.student?.studentDepartmentName}
            />
            <ListItemStyle
              title='Dosen Wali'
              description={recomendationLetter?.recomendationLetterDosenWali}
            />
            <ListItemStyle
              title='Program Yang Diikuti'
              description={recomendationLetter?.recomendationLetterProgramName}
            />
            <ListItemStyle
              title='Deskripsi'
              description={recomendationLetter?.recomendationLetterProgramDescription}
            />
            <ListItemStyle
              title='Keterkaitan Pembelajaran Dengan Program Studi'
              description={recomendationLetter?.recomendationLetterProgramCorrelation}
            />
          </dl>
          <dl className='max-w-md sm:w-1/2 text-gray-900 divide-y divide-gray-200'>
            <ListItemStyle
              title='Transkrip semester 1-4'
              url={recomendationLetter?.recomendationLetterStudentTranskrip}
            />

            <ListItemStyle
              title='Surat Persetujuan Dosen Wali'
              url={recomendationLetter?.recomendationLetterApprovalLetter}
            />
            <ListItemStyle
              title='Silabus'
              url={recomendationLetter?.recomendationLetterSyllabus}
            />
            <ListItemStyle
              title='Surat Pengantar Prodi'
              url={recomendationLetter?.recomendationLetterFromStudyProgram}
            />

            <ListItemStyle
              title='Surat Pengantar Jurusan'
              url={recomendationLetter?.recomendationLetterFromDepartment}
            />

            <ListItemStyle
              title='Surat Pengantar LP3M'
              url={recomendationLetter?.recomendationLetterFromLp3m}
            />

            <ListItemStyle
              title='Download Surat Rekomendasi'
              isDownloadButton={true}
              url={recomendationLetter?.recomendationLetterFromAcademic}
            />

            <ListItemStyle
              title='SPTJM'
              isDownloadButton={true}
              url={recomendationLetter?.recomendationLetterSptjmLetter}
            />
          </dl>
        </div>
      </div>

      {recomendationLetter?.recomendationLetterStatusMessage && (
        <div className='bg-white mb-5 border border-2 border-gray-200 rounded-lg p-5 px-10'>
          <ListItemStyle
            title='Pesan'
            description={recomendationLetter?.recomendationLetterStatusMessage}
          />
        </div>
      )}

      {currentUser.userRole !== 'student' && (
        <div className='bg-white border border-2 border-gray-200 rounded-lg p-10 mb-5'>
          <div className='flex gap-5 items-center'>
            <div className='mb-2 block'>
              <label htmlFor='file'>
                {currentUser.userRole === 'academic'
                  ? 'surat rekomendasi'
                  : 'surat pengantar'}
                :
              </label>
            </div>
            <FileUploadButton onUpload={setRecomendationLetterApprovalLetter} />
            {currentUser.userRole === 'academic' && (
              <>
                <div className='mb-2 block'>
                  <label htmlFor='file'>SPTJM</label>
                </div>
                <FileUploadButton onUpload={setRecomendationLetterSptjmLetter} />
              </>
            )}
          </div>

          <div id='textarea' className='mt-5 flex gap-5 items-center'>
            <div className='mb-2 block'>
              <label htmlFor='file'>surat pengantar : </label>
            </div>
            <Textarea
              id='comment'
              placeholder='message...'
              required={true}
              value={recomendationLetterStatusMessage}
              onChange={(e) => setRecomendationLetterStatusMessage(e.target.value)}
              rows={4}
            />
          </div>
          <div className='flex justify-end items-center mt-5 gap-2'>
            <ButtonTable
              title='Tolak'
              variant='danger'
              onClick={() => handleChangeStatusApproval('rejected')}
            />

            <ButtonTable
              title='Terima'
              variant='primary'
              onClick={handleChangeStatusAssignMent}
              isDisagele={recomendationLetterApprovalLetter === ''}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default RecomendationLetterDetail
