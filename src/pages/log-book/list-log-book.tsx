import { TextInput } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { converDateTimeFromDB } from "../../utils/convert";
import ModalStyle from "../../components/modal";
import { LogBookTypes } from "../../models/log-book";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";
import ButtonTable from "../../components/button/ButtonTable";

const LogBookListView = () => {
	const [listLogBook, setListLogBook] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser }: AppContextTypes = useAppContext();
	const navigate = useNavigate();
	const { handleRemoveRequest, handleGetTableDataRequest } = useHttp();

	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<LogBookTypes>();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: LogBookTypes) => {
		setModalDeleteData(item);
	};

	const handleDeleteLogBook = async () => {
		await handleRemoveRequest({
			path: `${apiUrlPath.logBooks.delete}?logBook_id=${modalDeleteData?.logBookId}`,
		});
		setOpenModalDelete(false);
		window.location.reload();
	};

	const fecthData = async () => {
		const result = await handleGetTableDataRequest({
			path: apiUrlPath.logBooks.get,
		});

		setListLogBook({
			link: apiUrlPath.logBooks.get,
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
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "NIM",
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "nim"} className="md:px-6 md:py-3 break-all">
					{data.logBookStudentNim}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.logBookStudentName}
				</td>
			),
		},

		{
			title: "prodi",
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "prodi"} className="md:px-6 md:py-3 break-all">
					{data.logBookStudyProgramName}
				</td>
			),
		},

		{
			title: "jurusan",
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.logBookDepartmentName}
				</td>
			),
		},
		{
			title: "minggu ke",
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "week"} className="md:px-6 md:py-3 break-all">
					{data.logBookReportWeek}
				</td>
			),
		},
		{
			title: "di serahkan pada",
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "submission"} className="md:px-6 md:py-3 break-all">
					{converDateTimeFromDB(data.createdOn)}
				</td>
			),
		},
		{
			title: "Action",
			action: true,
			data: (data: LogBookTypes, index: number): ReactElement => (
				<td key={index + "action"} className="md:px-6 md:py-3">
					<div className="flex items-center gap-1">
						<Link to={`/log-books/detail/${data.logBookId}`}>
							<ButtonTable title="Detail" variant="primary" />
						</Link>
						{currentUser.userRole === "student" && (
							<ButtonTable
								title="Hapus"
								variant="danger"
								onClick={() => {
									handleModalDelete();
									handleModaDataSelected(data);
								}}
							/>
						)}
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
						link: "/log-books",
						title: "Log Book",
					},
					{
						link: "/log-books",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.MbkmSummaryIcon}
			/>
			<h1 className="mb-5">Tabel Log Book</h1>
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

					{currentUser.userRole === "student" && (
						<ButtonStyle
							title="Create"
							onClick={() => navigate("/log-books/create")}
						/>
					)}
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus log book minggu ke-${modalDeleteData?.logBookReportWeek}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleDeleteLogBook}
				onOpen={handleModalDelete}
			/>
			<TableStyle header={header} table={listLogBook} />
		</div>
	);
};

export default LogBookListView;
