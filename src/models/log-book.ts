export interface LogBookTypes {
	logBookId: string;
	logBookReportFile: string;
	logBookReportWeek: number;
	logBookStudentId: string;
	logBookStudentName: string;
	logBookStudentNim: string;
	logBookStudyProgramId: string;
	logBookStudyProgramName: string;
	logBookDepartmentId: string;
	logBookDepartmentName: string;
	createdOn?: string;
}

export interface LogBookCreateRequestTypes {
	logBookReportFile: string;
	logBookReportWeek: number;
}
