import { Label, ListGroup, Select } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { MataKuliahTypes } from "../../models/mata-kuliah";
import ModalAddMataKuliah from "./modal-add-mata-kuliah";
import { useHttp } from "../../hooks/useHttp";
import { TranskripCreateRequestTypes } from "../../models/transkrip";

const StudentCreateSksView = () => {
	const [openModalAddMataKuliah, setOpenModalAddMataKuliah] = useState(false);
	const [mataKuliahSelected, setMataKuliahSelected] = useState<MataKuliahTypes>();
	const [mataKuliahGrade, setMataKuliahGrade] = useState("A");
	const navigate = useNavigate();
	const { handlePostRequest, handleUpdateRequest } = useHttp();
	const { studentId } = useParams();

	const handleModalAddMataKuliah = () => {
		setOpenModalAddMataKuliah(!openModalAddMataKuliah);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: TranskripCreateRequestTypes = {
			transkripStudentId: studentId + "",
			transkripMataKuliahId: mataKuliahSelected?.mataKuliahId + "",
			transkripMataKuliahGrade: mataKuliahGrade,
		};

		await handlePostRequest({
			path: "/transkrip",
			body: data,
		});
		navigate(`/students/detail/${studentId}`);
	};

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/students",
						title: "Mahasiswa",
					},
					{
						link: "/students/create-sks-convertion",
						title: "Buat Konversi SKS",
					},
				]}
				icon={BASE_ICON.MENU.MataKuliahIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<Label value="Pilih Mata Kuliah" />
					<ButtonStyle
						title="Tambah Mata Kuliah"
						onClick={handleModalAddMataKuliah}
					/>

					{mataKuliahSelected && (
						<ListGroup>
							<ListGroup.Item className="text-gray-600 text-md mx-2">
								Nama Mata Kuliah:
								{mataKuliahSelected.mataKuliahName}
							</ListGroup.Item>
							<ListGroup.Item className="text-gray-600 text-md mx-2">
								Total SKS:
								{mataKuliahSelected.mataKuliahSksTotal} SKS
							</ListGroup.Item>
						</ListGroup>
					)}
					<Label value="Nilai" />
					<Select
						id="nilai"
						required
						defaultValue="A"
						onChange={(e) => setMataKuliahGrade(e.target.value)}
					>
						<option value="A">A</option>
						<option value="AB">AB</option>
						<option value="B">B</option>
						<option value="BC">BC</option>
						<option value="C">C</option>
						<option value="D">D</option>
						<option value="E">E</option>
					</Select>

					<div className="flex justify-end">
						<ButtonStyle
							title="Buat"
							type="submit"
							disabled={!mataKuliahSelected}
						/>
					</div>
				</form>
			</div>

			<ModalAddMataKuliah
				isOpen={openModalAddMataKuliah}
				onOpen={setOpenModalAddMataKuliah}
				onSelect={setMataKuliahSelected}
			/>
		</div>
	);
};

export default StudentCreateSksView;
