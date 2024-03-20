/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react'
import axios from 'axios'
import { CONFIGS } from '../../configs'

interface ButtonUploadFileTypes {
  onUpload: (url: string) => void
}

export default function ButtonUploadFile({ onUpload }: ButtonUploadFileTypes) {
  const fileInputRef: any = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [fileName, setFileName] = useState('')

  const handleFileUpload = async () => {
    const selectedFile = fileInputRef.current.files[0]
    const MAX_FILE_SIZE = 2048 // 2MB

    if (!selectedFile) {
      console.log({
        message: 'silahkan pilih file terlebih dahulu',
        isError: true
      })
      return
    }

    const fileSizeKiloBytes = selectedFile.size / 1024

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      console.log({
        message: 'maksimum file 2mb',
        isError: true
      })
      return
    }

    setFileName(selectedFile.name)

    const formData = new FormData()

    formData.append('file', fileInputRef.current.files[0])

    try {
      const result = await axios.post(CONFIGS.baseUrl + '/upload-file', formData)

      console.log(result.data.fileUrl)

      setIsLoading(false)
      onUpload(result.data.fileUrl)
    } catch (error: any) {
      console.log(error)
      console.log({
        message: 'tidak dapat mengunggah file ' + error.response.data.error_message,
        isError: true
      })
    }
  }

  return (
    <div className='flex items-center'>
      <button onClick={() => fileInputRef.current.click()}>
        <p className='mx-2'>{isLoading ? 'Loading...' : 'Browse'} </p>
      </button>
      <p className='mx-2 my-1 text-gray-500'>{fileName ? fileName : 'Max 2mb'} </p>
      <input
        type='file'
        className='absolute top-0 left-0 opacity-0'
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </div>
  )
}
