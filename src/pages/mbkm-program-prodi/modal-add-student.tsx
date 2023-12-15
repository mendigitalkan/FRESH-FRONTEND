import { ReactElement, useEffect, useState } from 'react'
import { ButtonStyle } from '../../components'
import { Checkbox, Modal, TextInput } from 'flowbite-react'
import { TableHeader, TableStyle } from '../../components/table/Table'
import { StudentTypes } from '../../models/student'
import { MbkmProgramProdiTypes } from '../../models/mbkm-program-prodi'
import { useHttp } from '../../hooks/useHttp'
import { apiUrlPath } from '../../configs/apiPath'

interface ModalAddStudentTypes {
  onOpen: (item: boolean) => void
  isOpen: boolean
  mbkmProgram?: MbkmProgramProdiTypes
}

const ModalAddStudent = ({ onOpen, isOpen, mbkmProgram }: ModalAddStudentTypes) => {
  const [listOfStudent, setListOfStudent] = useState<any>()
  const [studentSelected, setStudentSelected] = useState<StudentTypes>()

  const [isLoading, setIsLoading] = useState(true)

  const { handleGetRequest, handleGetTableDataRequest, handleUpdateRequest } = useHttp()

  const handleSelectStudent = (student: StudentTypes) => {
    if (student.studentId === studentSelected?.studentId) {
      setStudentSelected({})
      return
    }
    const newData: StudentTypes = {
      studentId: student.studentId,
      studentMbkmProgramId: mbkmProgram?.mbkmPrograms.mbkmProgramId
    }
    setStudentSelected(newData)
  }

  const handleSubmit = async () => {
    if (studentSelected) {
      await handleUpdateRequest({
        path: apiUrlPath.students.patch,
        body: studentSelected
      })
    }
    onOpen(false)
    window.location.reload()
  }

  const fecthStudents = async () => {
    const result = await handleGetTableDataRequest({
      path: `/students`
    })

    setListOfStudent({
      link: `/students`,
      data: result,
      page: 0,
      size: 10
    })
  }

  const tableHeaderStudent: TableHeader[] = [
    {
      title: 'No',
      data: (data: StudentTypes, index: number): ReactElement => (
        <td key={index + '-no'} className='md:px-6 md:py-3 break-all'>
          {index + 1}
        </td>
      )
    },
    {
      title: 'nim',
      data: (data: StudentTypes, index: number): ReactElement => (
        <td key={index + 'nim'} className='md:px-6 md:py-3 break-all'>
          {data.studentNim}
        </td>
      )
    },
    {
      title: 'Nama',
      data: (data: StudentTypes, index: number): ReactElement => (
        <td key={index + 'name'} className='md:px-6 md:py-3 break-all'>
          {data.studentName}
        </td>
      )
    },

    {
      title: 'Action',
      action: true,
      data: (data: StudentTypes, index: number): ReactElement => {
        const isActive = data.studentId === studentSelected?.studentId
        console.log(isActive)
        return (
          <td key={index + 'action'} className='md:px-6 md:py-3'>
            <Checkbox
              onClick={() => {
                handleSelectStudent(data)
              }}
            />
          </td>
        )
      }
    }
  ]

  const fecthData = async () => {
    await fecthStudents()
    setIsLoading(false)
  }

  useEffect(() => {
    fecthData()
  }, [])

  if (isLoading) return <p>loading...</p>

  return (
    <Modal dismissible show={isOpen} onClose={() => onOpen(false)}>
      <Modal.Header>Daftar Mahasiswa</Modal.Header>
      <Modal.Body>
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
          </div>
          <div className='mt-1 w-full md:w-1/5'>
            <TextInput type='text' placeholder='search...' />
          </div>
        </div>
        <TableStyle header={tableHeaderStudent} table={listOfStudent} />
        <div className='flex justify-end'>
          <ButtonStyle
            disabled={!studentSelected}
            title='Tambahkan'
            type='submit'
            onClick={handleSubmit}
          />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAddStudent
