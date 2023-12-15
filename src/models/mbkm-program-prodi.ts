// export interface MbkmProgramProdiTypes {
// 	mbkmProgramProdiId: string;
// 	mbkmProgramProdiProgramId: string;
// 	mbkmProgramProdiProgramName: string;
// 	mbkmProgramProdiStudyProgramId: string;
// 	mbkmProgramProdiStudyProgramName: string;
// 	mbkmProgramProdiDepartmentId: string;
// 	mbkmProgramProdiDepartmentName: string;
// 	mbkmProgramProdiSemesterId: string;
// }

import { MbkmProgramTypes } from "./mbkm-program";

export interface MbkmProgramProdiCreateRequestTypes {
	mbkmProgramProdiProgramId: string;
	mbkmProgramProdiStudyProgramId: string;
	mbkmProgramProdiStudyProgramName: string;
	mbkmProgramProdiDepartmentId: string;
	mbkmProgramProdiDepartmentName: string;
}

export interface MbkmProgramProdiSelected extends MbkmProgramProdiCreateRequestTypes {}

export interface MbkmProgramProdiTypes {
	mbkmProgramProdiDepartmentId: string;
	mbkmProgramProdiDepartmentName: string;
	mbkmProgramProdiId: string;
	mbkmProgramProdiProgramId: string;
	mbkmProgramProdiStudyProgramId: string;
	mbkmProgramProdiStudyProgramName: string;
	mbkmPrograms: MbkmProgramTypes;
}
