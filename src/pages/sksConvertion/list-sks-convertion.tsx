import { TextInput } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { converDateTimeFromDB } from "../../utils/convert";
import ModalStyle from "../../components/modal";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";
import { SksConvertionTypes } from "../../models/sks-convertion";
import ButtonTable from "../../components/button/ButtonTable";

const SksConvertionView = () => {
	const [listSksConvertion, setListSksConvertion] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<SksConvertionTypes>();
	const { handleRemoveRequest, handleGetTableDataRequest } = useHttp();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: SksConvertionTypes) => {
		setModalDeleteData(item);
	};

	const handleDeleteSksKonversion = async () => {
		await handleRemoveRequest({
			path: `${apiUrlPath.sksConvertions.delete}?sksKonvertion_id=${modalDeleteData?.sksConvertionId}`,
		});
		setOpenModalDelete(false);
		window.location.reload();
	};

	const fecthData = async () => {
		const result = await handleGetTableDataRequest({
			path: "/sks-convertions",
		});

		setListSksConvertion({
			link: "/sks-convertions",
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
					{data.sksConvertionName}
				</td>
			),
		},

		{
			title: "Di buat oleh",
			data: (data: SksConvertionTypes, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.sksConvertionCreatedBy}
				</td>
			),
		},

		{
			title: "Di buat pada",
			data: (data: SksConvertionTypes, index: number): ReactElement => (
				<td key={index + "created at"} className="md:px-6 md:py-3 break-all">
					{converDateTimeFromDB(data.createdOn)}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: SksConvertionTypes, index: number): ReactElement => (
				<td key={index + "action"} className="md:px-6 md:py-3">
					<div className="flex items-center gap-1">
						<Link to={`/sks-convertions/detail/${data.sksConvertionId}`}>
							<ButtonTable title="Detail" variant="primary" />
						</Link>
						<ButtonTable
							title="Hapus"
							variant="danger"
							onClick={() => {
								handleModalDelete();
								handleModaDataSelected(data);
							}}
						/>
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
						link: "/sks-convertions",
						title: "Konversi SKS",
					},
					{
						link: "/sks-convertions",
						title: "Daftar",
					},
				]}
				icon={BASE_ICON.MENU.SksConvertionIcon}
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

					<ButtonStyle
						title="Create"
						onClick={() => navigate("/sks-convertions/create")}
					/>
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus ${modalDeleteData?.sksConvertionName}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleDeleteSksKonversion}
				onOpen={handleModalDelete}
			/>
			<TableStyle header={header} table={listSksConvertion} />
		</div>
	);
};

export default SksConvertionView;
