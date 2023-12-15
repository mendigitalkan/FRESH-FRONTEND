export type AppRoleTypes =
	| "student"
	| "studyProgram"
	| "department"
	| "lp3m"
	| "academic";

export interface UserTypes {
	userId: string;
	userName: string;
	userEmail: string;
	userRole: "student" | "studyProgram" | "department" | "lp3m" | "academic";
	departmentId?: string;
	studyProgramId?: string;
}
