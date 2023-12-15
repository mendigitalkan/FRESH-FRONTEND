import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { SemesterTypes } from "../../models/semester";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";

const SemesterCreateView = () => {
	const [semesterName, setSemesterName] = useState<string>("");
	const [semesterStatus, setSemesterStatus] = useState<string>("active");
	const { currentUser }: AppContextTypes = useAppContext();
	const navigate = useNavigate();
	const { handlePostRequest } = useHttp();

	const handleSelectSemester = (status: string) => {
		setSemesterStatus(status);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const payload: SemesterTypes = {
			semesterName: semesterName,
			semesterCreatedBy: currentUser.userRole,
			semesterStatus: semesterStatus,
		};

		await handlePostRequest({
			path: apiUrlPath.semesters.post,
			body: payload,
		});
		navigate("/semesters");
	};

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/semesters",
						title: "Daftar Semester",
					},
					{
						link: "/semesters/create",
						title: "Buat Semester",
					},
				]}
				icon={BASE_ICON.MENU.SemesterIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Nama" />
						</div>
						<TextInput
							value={semesterName}
							onChange={(e) => setSemesterName(e.target.value)}
							type="text"
							placeholder="nama semester"
							required={true}
						/>
					</div>
					<div className="flex justify-end">
						<ButtonStyle title="Buat Semester" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default SemesterCreateView;
