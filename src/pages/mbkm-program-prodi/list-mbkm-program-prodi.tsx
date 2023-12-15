import { TextInput } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { MbkmProgramProdiTypes } from "../../models/mbkm-program-prodi";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";
import ButtonTable from "../../components/button/ButtonTable";

const MbkmProgramProdiListView = () => {
	const [listMbkmPrograms, setListMbkmPrograms] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const { setErrorMessage }: AppContextTypes = useAppContext();
	const { handleGetRequest } = useHttp();

	const fecthMbkmProdi = async () => {
		try {
			const result = await handleGetRequest({
				path: `${apiUrlPath.mbkmProgramProdi.get}?mbkmProgramProdiStudyProgramId`,
			});

			result["page"] = 0;
			result["size"] = 100;

			setListMbkmPrograms({
				link: "",
				data: result,
				page: 0,
				size: 10,
				filter: {
					search: "",
				},
			});
		} catch (error: any) {
			console.error(error.message);
			setErrorMessage({
				isError: true,
				message: error.message,
			});
		}
		setIsLoading(false);
	};

	useEffect(() => {
		fecthMbkmProdi();
	}, []);

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama Program",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.mbkmPrograms?.mbkmProgramName}
				</td>
			),
		},
		{
			title: "Jenis Program",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.mbkmPrograms?.mbkmProgramCategory.length > 10
						? data.mbkmPrograms?.mbkmProgramCategory.slice(0, 10) + "....."
						: data.mbkmPrograms?.mbkmProgramCategory}
				</td>
			),
		},

		{
			title: "Silabus",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "silabus"} className="md:px-6 md:py-3 break-all">
					<a
						href={data.mbkmPrograms.mbkmProgramSyllabus}
						target="blank"
						className="underline"
					>
						lihat file
					</a>
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "action"} className="md:px-6 md:py-3">
					<div className="flex items-center gap-1">
						<Link
							to={`/mbkm-programs/prodi/detail/${data.mbkmPrograms.mbkmProgramId}`}
						>
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
						link: "/mbkm-programs",
						title: "MBKM Program",
					},
					{
						link: "/mbkm-programs",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.MbkmProgramIcon}
			/>

			<div className="flex flex-col md:flex-row justify-between md:px-0">
				<div className="flex items-center justify-between">
					<div className="mr-2 flex flex-row justify-between md:justify-start">
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

			<TableStyle header={header} table={listMbkmPrograms} />
		</div>
	);
};

export default MbkmProgramProdiListView;
