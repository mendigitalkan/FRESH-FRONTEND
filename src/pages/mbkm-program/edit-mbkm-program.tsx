import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { MbkmProgramCreateTypes, MbkmProgramTypes } from "../../models/mbkm-program";
import { Label, Select, TextInput } from "flowbite-react";
import ButtonUploadFile from "../../components/button/button-upload";
import { listProgramType } from "../../data/program-type";
import { SemesterTypes } from "../../models/semester";
import { useHttp } from "../../hooks/useHttp";

const MbkmProgramEditView = () => {
	const [listOfSemester, setListOfSemester] = useState<SemesterTypes[]>([]);
	const [mbkmProgramSyllabus, setMbkmProgramSyllabus] = useState("");
	const [mbkmProgramName, setMbkmProgramName] = useState("");
	const [mbkmProgramCategory, setMbkmProgramCategory] = useState("");

	const navigate = useNavigate();
	const { mbkmProgramId } = useParams();
	const { handleGetRequest, handleUpdateRequest } = useHttp();

	const fecthDetailMbkmProgram = async () => {
		const result: MbkmProgramTypes = await handleGetRequest({
			path: `/mbkm-programs/detail/${mbkmProgramId}`,
		});
		setMbkmProgramName(result.mbkmProgramName);
		setMbkmProgramSyllabus(result.mbkmProgramSyllabus);
		setMbkmProgramCategory(result.mbkmProgramCategory);
	};

	const fecthSemester = async () => {
		const result = await handleGetRequest({
			path: "/semesters?semester_status=active",
		});
		if (result) {
			setListOfSemester(result.items);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await handleUpdateRequest({
			path: "/mbkm-programs",
			body: {
				mbkmProgramId,
				mbkmProgramCreatedBy: "lp3m",
				mbkmProgramName: mbkmProgramName,
				mbkmProgramCategory: mbkmProgramCategory,
				mbkmProgramSyllabus: mbkmProgramSyllabus,
				mbkmProgramSemesterId: listOfSemester[0].semesterId,
			},
		});
		navigate("/mbkm-programs");
	};

	useEffect(() => {
		fecthDetailMbkmProgram();
		fecthSemester();
	}, []);

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs",
						title: "MBKM Program",
					},
					{
						link: "/mbkm-programs/edit",
						title: "Create",
					},
				]}
				icon={BASE_MENU_ICON.MbkmProgramIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Nama" />
						</div>
						<TextInput
							value={mbkmProgramName}
							onChange={(e) => setMbkmProgramName(e.target.value)}
							type="text"
							placeholder="nama..."
							required={true}
						/>
					</div>

					<div id="select">
						<div className="mb-2 block">
							<Label
								htmlFor="jenis program MBKM yang di ikuti"
								value="jenis program MBKM yang di ikuti"
							/>
						</div>
						<Select
							onChange={(e) => setMbkmProgramCategory(e.target.value)}
							required={true}
						>
							<option value={""}>pilih jenis program</option>
							{listProgramType.map((name, index) => (
								<option key={index} value={name}>
									{name}
								</option>
							))}
						</Select>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="file" value="upload syllabus" />
						</div>
						<ButtonUploadFile onUpload={setMbkmProgramSyllabus} />
					</div>

					<div className="flex justify-end">
						<ButtonStyle title="Submit" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default MbkmProgramEditView;
