import { ReactElement, useEffect, useState } from "react";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { useHttp } from "../../hooks/useHttp";
import { Label } from "flowbite-react";

interface SksConvertionTypes {
	mataKuliah: {
		mataKuliahName: string;
		mataKuliahSksTotal: number;
	};
	transkripId: string;
	transkripMataKuliahGrade: number;
}

const TranskripDetailView = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [listOfMataKuliahTranskrip, setListOfMataKuliahTranskrip] = useState<any>();

	const { handleGetTableDataRequest } = useHttp();

	const fecthMataKuliahTranskrip = async () => {
		const result = await handleGetTableDataRequest({
			path: `/transkrip`,
		});

		setListOfMataKuliahTranskrip({
			link: `/transkrip`,
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
	};

	const fecthData = async () => {
		await fecthMataKuliahTranskrip();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <h1>loading...</h1>;

	const tableHeaderMataKuliah: TableHeader[] = [
		{
			title: "No",
			data: (data: SksConvertionTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: SksConvertionTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.mataKuliah.mataKuliahName}
				</td>
			),
		},

		{
			title: "total sks",
			data: (data: SksConvertionTypes, index: number): ReactElement => (
				<td key={index + "sks"} className="md:px-6 md:py-3 break-all">
					{data.mataKuliah.mataKuliahSksTotal || "_"}
				</td>
			),
		},

		{
			title: "Nilai",
			data: (data: SksConvertionTypes, index: number): ReactElement => (
				<td key={index + "nilai"} className="md:px-6 md:py-3 break-all">
					{data.transkripMataKuliahGrade || "T"}
				</td>
			),
		},
	];

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/transkrip",
						title: "Transkrip Nilai",
					},
				]}
				icon={BASE_MENU_ICON.ReportParicipationIcon}
			/>

			<div className="flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
				<div className="mb-2 flex justify-between">
					<Label value="Transkrip Nilai" />
					<ButtonStyle title="Download" />
				</div>
				<TableStyle
					header={tableHeaderMataKuliah}
					table={listOfMataKuliahTranskrip}
				/>
			</div>
		</div>
	);
};

export default TranskripDetailView;
