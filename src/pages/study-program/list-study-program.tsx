import { TextInput } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { StudyProgramTypes } from "../../models/study-program";
import { Link } from "react-router-dom";
import { useHttp } from "../../hooks/useHttp";
import ButtonTable from "../../components/button/ButtonTable";

const StudyProgramListView = () => {
	const [listStudyProgram, setListStudyProgram] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const { handleGetTableDataRequest } = useHttp();

	const fecthData = async () => {
		const result = await handleGetTableDataRequest({
			path: "/study-programs?registered=true",
		});

		setListStudyProgram({
			link: "/study-programs?registered=true",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama Prodi",
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.studyProgramName}
				</td>
			),
		},

		{
			title: "Email",
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "email"} className="md:px-6 md:py-3 break-all">
					{data.studyProgramEmail}
				</td>
			),
		},

		{
			title: "Nama Jurusan",
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.studyProgramDepartmentName}
				</td>
			),
		},
		{
			title: "Action",
			action: true,
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "action"} className="md:px-6 md:py-3">
					<div className="flex items-center gap-1">
						<Link to={`/study-programs/detail/${data.studyProgramId}`}>
							<ButtonTable title="Detail" variant="primary" />
						</Link>
					</div>
				</td>
			),
		},
	];

	if (isLoading) return <div>loading...</div>;

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/study-programs",
						title: "Program Studi",
					},
					{
						link: "/study-programs",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.StudyProgramIcon}
			/>

			<div className="flex flex-col md:flex-row justify-between md:px-0">
				<div className="flex items-center">
					<div className="w-full mr-2 flex flex-row justify-between md:justify-start">
						<select
							name="size"
							defaultValue={10}
							className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
						>
							<option value="2">2</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>
			<TableStyle header={header} table={listStudyProgram} />
		</div>
	);
};

export default StudyProgramListView;
