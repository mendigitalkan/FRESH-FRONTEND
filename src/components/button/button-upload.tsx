import { useRef, useState } from 'react'
import { Button } from 'flowbite-react'
import { RiUpload2Fill } from 'react-icons/ri'
import axios from 'axios'
import { CONFIG } from '../../configs'
import { AppContextTypes, useAppContext } from '../../context/app.context'

interface ButtonUploadFileTypes {
  onUpload: (url: string) => void
}

const ButtonUploadFile = ({ onUpload }: ButtonUploadFileTypes) => {
  const fileInputRef: any = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState('')

  const { setErrorMessage }: AppContextTypes = useAppContext()

  const handleFileUpload = async () => {
    const selectedFile = fileInputRef.current.files[0]
    const MAX_FILE_SIZE = 2048 // 2MB

    if (!selectedFile) {
      setErrorMessage({
        message: 'silahkan pilih file terlebih dahulu',
        isError: true
      })
      return
    }

    const fileSizeKiloBytes = selectedFile.size / 1024

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setErrorMessage({
        message: 'maksimum file 2mb',
        isError: true
      })
      return
    }

    setFileName(selectedFile.name)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const result = await axios.post(
        CONFIG.base_url_api + '/upload-file',
        { file: fileInputRef.current.files[0] },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          auth: {
            username: CONFIG.authorization.username,
            password: CONFIG.authorization.passsword
          }
        }
      )

      console.log(result.data.fileUrl)

      setIsLoading(false)
      onUpload(result.data.fileUrl)
    } catch (error: any) {
      console.log(error)
      setErrorMessage({
        message: 'tidak dapat mengunggah file ' + error.response.data.error_message,
        isError: true
      })
    }
  }

  return (
    <div className='flex items-center'>
      <Button color='light' onClick={() => fileInputRef.current.click()}>
        <RiUpload2Fill size={16} />
        <p className='mx-2'>{isLoading ? 'Loading...' : 'Browse'} </p>
      </Button>
      <p className='mx-2 my-1 text-gray-500'>{fileName ? fileName : 'Max 2mb'} </p>
      <input
        type='file'
        className='absolute top-0 left-0 opacity-0'
        accept='application/pdf'
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </div>
  )
}

export default ButtonUploadFile
