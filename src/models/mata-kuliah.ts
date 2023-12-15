export interface MataKuliahTypes {
  mataKuliahId?: string
  mataKuliahName?: string
  mataKuliahStudyProgramId?: string
  mataKuliahStudyProgramName?: string
  mataKuliahDepartmentId?: string
  mataKuliahDepartmentName?: string
  mataKuliahVerificationStatus?: 'accepted' | 'waiting' | 'rejected'
  mataKuliahSksTotal?: number
}

export interface MataKuliahCreateRequestTypes {
  mataKuliahName: string
  mataKuliahSksTotal: number
}
