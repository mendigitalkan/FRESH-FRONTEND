import { StudentTypes } from "./student";

export interface RecomendationLetterTypes {
	recomendationLetterId: string;
	recomendationLetterStudentTranskrip: string;
	recomendationLetterDosenWali: string;
	recomendationLetterSyllabus: string;
	recomendationLetterApprovalLetter: string;
	recomendationLetterSptjmLetter: string
	recomendationLetterFromStudyProgram: string;
	recomendationLetterFromDepartment: string;
	recomendationLetterFromLp3m: string;
	recomendationLetterFromAcademic: string;
	recomendationLetterProgramName: string;
	recomendationLetterProgramDescription: string;
	recomendationLetterProgramCorrelation: string;
	recomendationLetterStatus: "waiting" | "accepted" | "rejected";
	recomendationLetterStatusMessage: string;
	recomendationLetterAssignToStudent: boolean;
	recomendationLetterAssignToStudyProgram: boolean;
	recomendationLetterAssignToDepartment: boolean;
	recomendationLetterAssignToLp3m: boolean;
	recomendationLetterAssignToAcademic: boolean;
	recomendationLetterStudyProgramId: string;
	recomendationLetterDepartmentId: string;
	recomendationLetterStudentId: string;
	student: StudentTypes;
}

export interface RecomendationLetterCreateRequestTypes {
	recomendationLetterStudentTranskrip: string;
	recomendationLetterDosenWali: string;
	recomendationLetterSyllabus: string;
	recomendationLetterApprovalLetter: string;
	recomendationLetterProgramName: string;
	recomendationLetterProgramDescription: string;
	recomendationLetterProgramCorrelation: string;
}

export interface RequestChangeStatusAssignMentTypes {
	recomendationLetterId: string;
	recomendationLetterApprovalLetter: string;
	recomendationLetterSptjmLetter: string
}

export interface RequestChangeStatusApprovalTypes {
	recomendationLetterId: string;
	recomendationLetterStatus: "waiting" | "accepted" | "rejected";
	recomendationLetterStatusMessage: string;
}
