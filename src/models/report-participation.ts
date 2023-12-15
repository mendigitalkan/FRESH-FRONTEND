import { DepartmentTypes } from './department'
import { StudentTypes } from './student'
import { StudyProgramTypes } from './study-program'

export interface ReportParticipationTypes {
  reportParticipationId?: string
  reportParticipationLetter?: string
  reportParticipationStatusMessage?: string
  reportParticipationStatus?: 'waiting' | 'accepted' | 'rejected'
  reportParticipationStudyProgramId?: string
  reportParticipationDepartmentId?: string
  reportParticipationStudentId?: string
  reportParticipationMbkmProgramCategory?: string
  reportParticipationMbkmProgramName?: string
  reportParticipationRecomendationLetter?: string
  student?: StudentTypes
}

export interface ReportParticipationDetailTypes extends ReportParticipationTypes {
  student?: StudentTypes
  listOfStudyProgram?: StudyProgramTypes
  listOfDepartment?: DepartmentTypes
}

export interface ReportParticipationUpdateTypes {
  reportParticipationId?: string
  reportParticipationLetter?: string
  reportParticipationStatusMessage?: string
  reportParticipationStatus?: 'waiting' | 'accepted' | 'rejected'
}
