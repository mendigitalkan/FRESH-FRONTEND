import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import ListItemStyle from "../../components/list";
import { Label, TextInput } from "flowbite-react";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { MbkmProgramProdiTypes } from "../../models/mbkm-program-prodi";
import ModalStyle from "../../components/modal";
import ModalAddStudent from "./modal-add-student";
import { StudentTypes } from "../../models/student";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";
import ButtonTable from "../../components/button/ButtonTable";

const MbkmProgramProdiDetailView = () => {
	const [listOfStudent, setListOfStudent] = useState<any>();
	const [mbkmProgram, setMbkmProgram] = useState<MbkmProgramProdiTypes>();
	const [openModalAddStudent, setOpenModalAddStudent] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { mbkmProgramId } = useParams();
	const { handleGetRequest, handleUpdateRequest, handleGetTableDataRequest } =
		useHttp();
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<StudentTypes>();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: StudentTypes) => {
		setModalDeleteData(item);
	};

	const handleChangeMbkmProgramStudent = async () => {
		await handleUpdateRequest({
			path: apiUrlPath.students.patch,
			body: {
				studentId: modalDeleteData?.studentId,
				studentMbkmProgramId: null,
			},
		});

		setOpenModalDelete(false);
		window.location.reload();
	};

	const fecthDetailMbkmProgram = async () => {
		const result = await handleGetRequest({
			path: `${apiUrlPath.mbkmProgramProdi.getDetail}/${mbkmProgramId}`,
		});
		setMbkmProgram(result);
	};

	const fecthStudents = async () => {
		const result = await handleGetTableDataRequest({
			path: `${apiUrlPath.students.get}?mbkmProgramId=${mbkmProgramId}&&`,
		});

		setListOfStudent({
			link: `/students`,
			data: result,
			page: 0,
			size: 10,
			filter: {
				mbkmProgramId: mbkmProgramId,
			},
		});
	};

	const tableHeaderStudent: TableHeader[] = [
		{
			title: "No",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "NIM",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "nim"} className="md:px-6 md:py-3 break-all">
					{data.studentNim}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.studentName}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "action"} className="md:px-6 md:py-3">
					<ButtonTable
						title="Hapus"
						variant="danger"
						onClick={() => {
							handleModalDelete();
							handleModaDataSelected(data);
						}}
					/>
				</td>
			),
		},
	];

	const fecthData = async () => {
		await fecthDetailMbkmProgram();
		await fecthStudents();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <p>loading...</p>;

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs",
						title: "Program MBKM",
					},
					{
						link: "/mbkm-programs/detail/" + mbkmProgramId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.MyProgramIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Nama"
						description={mbkmProgram?.mbkmPrograms.mbkmProgramName}
					/>
					<ListItemStyle
						title="kategori program"
						description={mbkmProgram?.mbkmPrograms.mbkmProgramCategory}
					/>
					<ListItemStyle
						title="Program Syllabus"
						url={mbkmProgram?.mbkmPrograms.mbkmProgramSyllabus}
					/>
				</dl>
			</div>

			<div className="flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
				<div className="mb-2 block">
					<Label value="Daftar Mahasiswa Yang Mengikuti " />
				</div>
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
						<ButtonStyle
							title="Tambah Mahasiswa"
							onClick={() => setOpenModalAddStudent(true)}
						/>
					</div>
					<div className="mt-1 w-full md:w-1/5">
						<TextInput type="text" placeholder="search..." />
					</div>
				</div>

				<TableStyle header={tableHeaderStudent} table={listOfStudent} />
			</div>

			<ModalAddStudent
				mbkmProgram={mbkmProgram}
				isOpen={openModalAddStudent}
				onOpen={setOpenModalAddStudent}
			/>

			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus ${modalDeleteData?.studentName}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleChangeMbkmProgramStudent}
				onOpen={handleModalDelete}
			/>
		</div>
	);
};
export default MbkmProgramProdiDetailView;
