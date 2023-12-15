import { MbkmProgramTypes } from "./mbkm-program";
import { TranskripTypes } from "./transkrip";

export interface StudentTypes {
	studentId?: string;
	studentName?: string;
	studentNim?: string;
	studentEmail?: string;
	studentIsRegistered?: boolean;
	studentDepartmentId?: string;
	studentDepartmentName?: string;
	studentStudyProgramId?: string;
	studentStudyProgramName?: string;
	studentMbkmProgramId?: string | null;
	studentTranskripId?: string;
	transkrip?: TranskripTypes[];
	mbkmProgram?: MbkmProgramTypes;
}
