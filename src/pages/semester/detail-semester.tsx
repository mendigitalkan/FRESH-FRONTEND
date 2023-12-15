import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { SemesterTypes } from "../../models/semester";
import { Label, TextInput } from "flowbite-react";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";

const SemesterDetail = () => {
	const [semester, setSemester] = useState<SemesterTypes>();
	const [semesterName, setSemesterName] = useState<string>();
	const { currentUser }: AppContextTypes = useAppContext();
	const { semesterId } = useParams();
	const navigate = useNavigate();
	const { handleUpdateRequest, handleGetRequest } = useHttp();

	const handleUpdateSemester = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: SemesterTypes = {
				semesterId: semesterId,
				semesterName: semesterName,
				semesterCreatedBy: currentUser.userRole,
				semesterStatus: "active",
			};

			await handleUpdateRequest({
				path: apiUrlPath.semesters.patch,
				body: data,
			});
			navigate("/semesters");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const fecthData = async () => {
		const result = await handleGetRequest({
			path: `${apiUrlPath.semesters.getDetail}/${semesterId}`,
		});
		setSemester(result);
		setSemesterName(result.semesterName + "");
	};

	useEffect(() => {
		fecthData();
	}, []);

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
				<form className="flex flex-col gap-4" onSubmit={handleUpdateSemester}>
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
						<ButtonStyle title="Aktifkan" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default SemesterDetail;
