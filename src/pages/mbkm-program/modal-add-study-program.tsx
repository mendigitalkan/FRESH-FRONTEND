import { ReactElement, memo, useEffect, useState } from "react";
import { ButtonStyle } from "../../components";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import { Checkbox, Modal, TextInput } from "flowbite-react";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { StudyProgramTypes } from "../../models/study-program";
import { MbkmProgramProdiCreateRequestTypes } from "../../models/mbkm-program-prodi";
import { useHttp } from "../../hooks/useHttp";

interface ModalSelectStudyProgramTypes {
	onOpen: (item: boolean) => void;
	isOpen: boolean;
	mbkmProgram?: MbkmProgramTypes;
}

const ModalSelectStudyProgram = ({
	onOpen,
	isOpen,
	mbkmProgram,
}: ModalSelectStudyProgramTypes) => {
	const [listOfStudyProgramRegistered, setListOfStudyProgramRegistered] =
		useState<any>();
	const [studyProgramSelected, setStudyProgramSelected] = useState<
		MbkmProgramProdiCreateRequestTypes[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { handleGetTableDataRequest, handlePostRequest } = useHttp();

	const handleSelectStudyProgram = (studyProgram: StudyProgramTypes) => {
		const check = studyProgramSelected.find((item) => {
			return item.mbkmProgramProdiStudyProgramId === studyProgram.studyProgramId;
		});

		if (check) {
			const newData = studyProgramSelected.filter((item) => {
				return (
					item.mbkmProgramProdiStudyProgramId !== studyProgram.studyProgramId
				);
			});
			setStudyProgramSelected(newData);
		} else {
			const data: MbkmProgramProdiCreateRequestTypes = {
				mbkmProgramProdiProgramId: mbkmProgram?.mbkmProgramId + "",
				mbkmProgramProdiStudyProgramId: studyProgram?.studyProgramId + "",
				mbkmProgramProdiStudyProgramName: studyProgram?.studyProgramName + "",
				mbkmProgramProdiDepartmentId: studyProgram?.studyProgramDepartmentId + "",
				mbkmProgramProdiDepartmentName:
					studyProgram?.studyProgramDepartmentName + "",
			};

			setStudyProgramSelected([...studyProgramSelected, data]);
		}
	};

	const handleSubmit = async () => {
		if (studyProgramSelected.length !== 0) {
			await handlePostRequest({
				path: `/mbkm-programs/prodi`,
				body: studyProgramSelected,
			});
		}
		onOpen(false);
		window.location.reload();
	};

	const fecthStudyPrograms = async () => {
		const result = await handleGetTableDataRequest({
			path: `/study-programs?registered=true`,
		});

		setListOfStudyProgramRegistered({
			link: "/study-programs?registered=1",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
	};

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
			title: "Nama",
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.studyProgramName}
				</td>
			),
		},

		{
			title: "email",
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "email"} className="md:px-6 md:py-3 break-all">
					{data.studyProgramEmail}
				</td>
			),
		},

		{
			title: "jurusan",
			data: (data: StudyProgramTypes, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.studyProgramDepartmentName}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: StudyProgramTypes, index: number): ReactElement => {
				const isButtonActive = studyProgramSelected.find((item) => {
					return item.mbkmProgramProdiStudyProgramId === data.studyProgramId;
				});

				return (
					<td key={index + "action"}>
						<div>
							<Checkbox
								onClick={() => {
									handleSelectStudyProgram(data);
								}}
							/>
						</div>
					</td>
				);
			},
		},
	];

	const fecthData = async () => {
		await fecthStudyPrograms();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <p>loading...</p>;

	return (
		<Modal dismissible show={isOpen} onClose={() => onOpen(false)}>
			<Modal.Header>Daftar Prodi</Modal.Header>
			<Modal.Body>
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
				<TableStyle header={header} table={listOfStudyProgramRegistered} />
				<div className="flex justify-end">
					<ButtonStyle title="Buat" type="submit" onClick={handleSubmit} />
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default memo(ModalSelectStudyProgram);
