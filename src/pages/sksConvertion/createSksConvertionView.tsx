import { Label, ListGroup, Select } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { MataKuliahTypes } from "../../models/mata-kuliah";
import ModalAddMataKuliah from "./modal-add-mata-kuliah";
import { useHttp } from "../../hooks/useHttp";
import { SksConvertionCreateTypes } from "../../models/sks-convertion";

const SksConversionCreateView = () => {
	const [openModalAddMataKuliah, setOpenModalAddMataKuliah] = useState(false);
	const [mataKuliahSelected, setMataKuliahSelected] = useState<MataKuliahTypes>();
	const navigate = useNavigate();
	const { handlePostRequest } = useHttp();

	const handleModalAddMataKuliah = () => {
		setOpenModalAddMataKuliah(!openModalAddMataKuliah);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: SksConvertionCreateTypes = {
			sksConvertionName: "",
			sksConvertionCreatedBy: "",
			sksConvertionStudyProgramId: "",
			sksConvertionMbkmProgramId: "",
		};

		await handlePostRequest({
			path: "/sks-convertions",
			body: data,
		});
		navigate(`/sks-convertions`);
	};

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/sks-convertions",
						title: "Konversi SKS",
					},
					{
						link: "/sks-convertions/create",
						title: "Buat Konversi SKS",
					},
				]}
				icon={BASE_ICON.MENU.SksConvertionIcon}
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

export default SksConversionCreateView;
