import { useEffect, useState } from "react";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import ListItemStyle from "../../components/list";
import { useHttp } from "../../hooks/useHttp";
import { StudentTypes } from "../../models/student";
import { AppContextTypes, useAppContext } from "../../context/app.context";

const MbkmProgramStudentVies = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser }: AppContextTypes = useAppContext();
	const studentId = currentUser.userId;
	const [studentDetails, setStudentDetails] = useState<StudentTypes>();
	const { handleGetRequest } = useHttp();

	const fecthDetailStudent = async () => {
		const result = await handleGetRequest({
			path: `/students/detail/${studentId}`,
		});
		setStudentDetails(result);
		setIsLoading(false);
	};

	const fecthData = async () => {
		await fecthDetailStudent();
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <h1>loading...</h1>;

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/my-mbkm-program",
						title: "Program Saya",
					},
				]}
				icon={BASE_MENU_ICON.MbkmProgramIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md sm:w-1/2 text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Program MBKM"
						description={studentDetails?.mbkmProgram?.mbkmProgramName}
					/>
					<ListItemStyle
						title="Kategori Program MBKM"
						description={studentDetails?.mbkmProgram?.mbkmProgramCategory}
					/>
					<ListItemStyle
						title="Silabus"
						url={studentDetails?.mbkmProgram?.mbkmProgramSyllabus}
					/>
				</dl>
			</div>
		</div>
	);
};

export default MbkmProgramStudentVies;
