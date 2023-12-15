import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from '../../components'
import ListItemStyle from '../../components/list'
import { useHttp } from '../../hooks/useHttp'
import { apiUrlPath } from '../../configs/apiPath'
import { MataKuliahTypes } from '../../models/mata-kuliah'
import { Label, Textarea } from 'flowbite-react'

const MataKuliahVerificationDetailView = () => {
  const { verificationMataKuliahId } = useParams()
  const navigation = useNavigate()
  const { handleGetRequest, handleUpdateRequest } = useHttp()
  const [verificationMataKuliahDetail, setVerificationMataKuliahDetail] =
    useState<MataKuliahTypes>()

  const fecthVerificationMataKuliah = async () => {
    const result = await handleGetRequest({
      path: `${apiUrlPath.mataKuliah.getDetail}/${verificationMataKuliahId}`
    })
    setVerificationMataKuliahDetail(result)
  }

  const handleChangeStatusApproval = async (status: 'accepted' | 'rejected') => {
    const payload: MataKuliahTypes = {
      mataKuliahId: verificationMataKuliahDetail?.mataKuliahId,
      mataKuliahVerificationStatus: status
    }

    await handleUpdateRequest({
      path: apiUrlPath.mataKuliah.patch,
      body: payload
    })
    navigation('/mata-kuliah/verification')
  }

  useEffect(() => {
    fecthVerificationMataKuliah()
  }, [])

  return (
    <div>
      <BreadcrumbStyle
        listPath={[
          {
            link: '/mata-kuliah/verification',
            title: 'Verifikasi Mata Kuliah'
          },
          {
            link: '/mata-kuliah/verification/' + verificationMataKuliahId,
            title: 'Detail'
          }
        ]}
        icon={BASE_MENU_ICON.SemesterIcon}
      />

      <div className='bg-white border border-2 border-gray-200 rounded-lg p-10'>
        <dl className='max-w-md text-gray-900 divide-y divide-gray-200'>
          <ListItemStyle
            title='Nama'
            description={verificationMataKuliahDetail?.mataKuliahName}
          />
          <ListItemStyle
            title='Total SKS'
            description={verificationMataKuliahDetail?.mataKuliahSksTotal + ''}
          />
          <ListItemStyle
            title='Program Studi'
            description={verificationMataKuliahDetail?.mataKuliahStudyProgramName}
          />
          <ListItemStyle
            title='Jurusan'
            description={verificationMataKuliahDetail?.mataKuliahDepartmentName}
          />
        </dl>
      </div>
      <div className='bg-white border border-2 border-gray-200 rounded-lg p-10 my-5'>
        <div id='textarea' className='mt-5'>
          <div className='mb-2 block'>
            <Label htmlFor='comment' value='Tinggalkan Pesan' />
          </div>
          <Textarea id='comment' placeholder='message...' required={true} rows={4} />
        </div>
        <div className='flex justify-end items-center mt-5'>
          <ButtonStyle
            onClick={() => handleChangeStatusApproval('rejected')}
            title='Tolak'
            color='red'
            className='mx-2'
          />
          <ButtonStyle
            title='Terima'
            className='mx-2'
            onClick={() => handleChangeStatusApproval('accepted')}
          />
        </div>
      </div>
    </div>
  )
}

export default MataKuliahVerificationDetailView
