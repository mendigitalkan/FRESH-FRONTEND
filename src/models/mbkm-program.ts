import { SemesterTypes } from "./semester";

export interface MbkmProgramTypes {
	mbkmProgramId: string;
	mbkmProgramCreatedBy: string;
	mbkmProgramName: string;
	mbkmProgramCategory: string;
	mbkmProgramSyllabus: string;
	mbkmProgramSemesterId: string;
	semester: SemesterTypes;
}

export interface MbkmProgramCreateTypes {
	mbkmProgramCreatedBy: string;
	mbkmProgramName: string;
	mbkmProgramCategory: string;
	mbkmProgramSyllabus: string;
	mbkmProgramSemesterId: string;
}
