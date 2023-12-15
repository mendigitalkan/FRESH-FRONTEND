import { Badge, TextInput } from "flowbite-react";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { ReportParticipationTypes } from "../../models/report-participation";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";
import ButtonTable from "../../components/button/ButtonTable";

const ReportParticipationListView = () => {
	const [listProgram, setListProgram] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { currentUser }: AppContextTypes = useAppContext();
	const { handleGetTableDataRequest } = useHttp();

	const fecthData = async () => {
		const result = await handleGetTableDataRequest({
			path: apiUrlPath.reportParticipations.get,
		});

		setListProgram({
			link: "report-participations",
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
			data: (data: ReportParticipationTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},
		{
			title: "NIM",
			data: (data: ReportParticipationTypes, index: number): ReactElement => (
				<td key={index + "NIM"} className="md:px-6 md:py-3 break-all">
					{data.student?.studentNim}
				</td>
			),
		},
		{
			title: "Nama",
			data: (data: ReportParticipationTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.student?.studentName}
				</td>
			),
		},

		{
			title: "Prodi",
			data: (data: ReportParticipationTypes, index: number): ReactElement => (
				<td key={index + "prodi"} className="md:px-6 md:py-3 break-all">
					{data.student?.studentStudyProgramName}
				</td>
			),
		},

		{
			title: "Jurusan",
			data: (data: ReportParticipationTypes, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.student?.studentDepartmentName}
				</td>
			),
		},

		{
			title: "Status",
			data: (data: ReportParticipationTypes, index: number): ReactElement => {
				if (data.reportParticipationStatus === "rejected") {
					return (
						<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
							<Badge color="failure" className="w-20 text-center">
								ditolak
							</Badge>
						</td>
					);
				}
				if (data.reportParticipationStatus === "accepted") {
					return (
						<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
							<Badge color="success" className="w-20 text-center">
								selesai
							</Badge>
						</td>
					);
				}
				return (
					<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
						<Badge color="warning" className="w-20 text-center">
							menunggu
						</Badge>
					</td>
				);
			},
		},

		{
			title: "Action",
			action: true,
			data: (data: ReportParticipationTypes, index: number): ReactElement => (
				<td key={index + "action"} className="md:px-6 md:py-3">
					<div className="flex items-center gap-1">
						<Link
							to={`/report-participations/detail/${data.reportParticipationId}`}
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
						link: "/report-participation",
						title: "Lapor Keikut sertaan",
					},
					{
						link: "/report-participation",
						title: "List",
					},
				]}
				icon={BASE_MENU_ICON.ReportParicipationIcon}
			/>

			<h1 className="mb-5">Tabel Lapor Keikut Sertaan</h1>
			<div className="flex flex-col md:flex-row justify-between md:px-0">
				<div className="flex items-center">
					<div className="w-full mr-2 flex flex-row justify-between md:justify-start itemes-center gap-5">
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

					{currentUser.userRole === "student" && (
						<ButtonStyle
							title="Buat"
							onClick={() => navigate("/report-participations/create")}
						/>
					)}
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<TableStyle header={header} table={listProgram} />
		</div>
	);
};

export default ReportParticipationListView;
