import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import ListItemStyle from "../../components/list";
import { converDateTimeFromDB } from "../../utils/convert";
import { LogBookTypes } from "../../models/log-book";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";

const LogBookDetailView = () => {
	const [logBook, setLogBook] = useState<LogBookTypes>();
	const { logBookId } = useParams();
	const { handleGetRequest } = useHttp();

	const fecthLogBook = async () => {
		const result = await handleGetRequest({
			path: `${apiUrlPath.logBooks.getDetail}/${logBookId}`,
		});
		setLogBook(result);
	};

	useEffect(() => {
		fecthLogBook();
	}, []);

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/log-books",
						title: "Log Book",
					},
					{
						link: "/log-books/" + logBookId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.MbkmSummaryIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Nama"
						description={logBook?.logBookStudentName}
					/>
					<ListItemStyle title="NIM" description={logBook?.logBookStudentNim} />
					<ListItemStyle
						title="Program Studi"
						description={logBook?.logBookStudyProgramName}
					/>
					<ListItemStyle
						title="Jurusan"
						description={logBook?.logBookDepartmentName}
					/>
					<ListItemStyle
						title="Laporam minggu ke"
						description={logBook?.logBookReportWeek + ""}
					/>
					<ListItemStyle
						title="Diserahkan pada"
						description={converDateTimeFromDB(logBook?.createdOn)}
					/>
					<ListItemStyle title="Log Book" url={logBook?.logBookReportFile} />
				</dl>
			</div>
		</div>
	);
};

export default LogBookDetailView;
