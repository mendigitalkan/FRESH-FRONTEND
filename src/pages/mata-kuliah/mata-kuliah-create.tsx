import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { MataKuliahCreateRequestTypes } from "../../models/mata-kuliah";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";

const MataKuliahCreateView = () => {
	const [mataKuliahName, setMataKuliahName] = useState("");
	const [mataKuliahSksTotal, setMataKuliahSksTotal] = useState<number>(0);
	const navigate = useNavigate();
	const { handlePostRequest } = useHttp();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: MataKuliahCreateRequestTypes = {
			mataKuliahName,
			mataKuliahSksTotal,
		};
		await handlePostRequest({
			path: apiUrlPath.mataKuliah.post,
			body: data,
		});
		navigate("/mata-kuliah");
	};

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mata-kuliah",
						title: "Mata Kuliah",
					},
					{
						link: "/mata-kuliah/create",
						title: "Buat",
					},
				]}
				icon={BASE_ICON.MENU.MataKuliahIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label value="Nama Mata Kuliah" />
						</div>
						<TextInput
							value={mataKuliahName}
							onChange={(e) => setMataKuliahName(e.target.value)}
							type="text"
							placeholder="nama.."
							required={true}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label value="Total SKS" />
						</div>
						<TextInput
							value={mataKuliahSksTotal}
							onChange={(e) => setMataKuliahSksTotal(+e.target.value)}
							type="number"
							placeholder="sks..."
							required={true}
						/>
					</div>

					<div className="flex justify-end">
						<ButtonStyle
							title="Buat"
							type="submit"
							disabled={!mataKuliahName || !mataKuliahSksTotal}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default MataKuliahCreateView;
