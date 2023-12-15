import Home from "../pages/home";
import FaQ from "../pages/faq";
import LogBookDetailView from "../pages/log-book/detail-log-book";
import LogBookListView from "../pages/log-book/list-log-book";
import MataKuliahCreateView from "../pages/mata-kuliah/mata-kuliah-create";
import MataKuliahListView from "../pages/mata-kuliah/list-mata-kuliah";
import MbkmProgramProdiDetailView from "../pages/mbkm-program-prodi/detail-mbkm-program-prodi";
import MbkmProgramProdiListView from "../pages/mbkm-program-prodi/list-mbkm-program-prodi";
import RecomendationLetterCreate from "../pages/recomendation-letter/create-recomendation-letter";
import RecomendationLetterDetail from "../pages/recomendation-letter/detail-detail-recomendation-letter";
import RecomendationLetterList from "../pages/recomendation-letter/list-recomendation-letter";
import ReportParicipationCreateView from "../pages/report-participation/create-report-participation";
import ReportParicipationDetailView from "../pages/report-participation/detail-report-participation";
import ReportParticipationListView from "../pages/report-participation/list-report-participation";
import StudentDetailView from "../pages/student/detail-student";
import StudentListView from "../pages/student/list-student";
import StudentCreateSksView from "../pages/student/create-sks-convertion";
import SksConvertionView from "../pages/sksConvertion/list-sks-convertion";
import SksConversionCreateView from "../pages/sksConvertion/createSksConvertionView";
import SksConvertionDetailView from "../pages/sksConvertion/detailSksConvertionView";

export const studyProgramRouters = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/faq",
		element: <FaQ />,
	},

	//mbkm program prodi
	{
		path: "/mbkm-programs/prodi",
		element: <MbkmProgramProdiListView />,
	},
	{
		path: "/mbkm-programs/prodi/detail/:mbkmProgramId",
		element: <MbkmProgramProdiDetailView />,
	},

	//report participation
	{
		path: "/report-participations",
		element: <ReportParticipationListView />,
	},
	{
		path: "/report-participations/create",
		element: <ReportParicipationCreateView />,
	},

	{
		path: "/report-participations/detail/:reportParticipationId",
		element: <ReportParicipationDetailView />,
	},

	//log books

	{
		path: "/log-books",
		element: <LogBookListView />,
	},
	{
		path: "/log-books/create",
		element: <LogBookListView />,
	},
	{
		path: "/log-books/detail/:logBookId",
		element: <LogBookDetailView />,
	},

	//mata kuliah

	{
		path: "/mata-kuliah",
		element: <MataKuliahListView />,
	},
	{
		path: "/mata-kuliah/create",
		element: <MataKuliahCreateView />,
	},

	{
		path: "/recomendation-letters",
		element: <RecomendationLetterList />,
	},
	{
		path: "/recomendation-letters/create",
		element: <RecomendationLetterCreate />,
	},
	{
		path: "/recomendation-letters/detail/:recomendationLetterId",
		element: <RecomendationLetterDetail />,
	},

	//student
	{
		path: "/students",
		element: <StudentListView />,
	},
	{
		path: "/students/detail/:studentId",
		element: <StudentDetailView />,
	},
	{
		path: "/students/detail/:studentId/create-sks-convertion",
		element: <StudentCreateSksView />,
	},

	//sks convertion

	{
		path: "/sks-convertions",
		element: <SksConvertionView />,
	},
	{
		path: "/sks-convertions/create",
		element: <SksConversionCreateView />,
	},
	{
		path: "/sks-convertions/detail/:sksConvertionId",
		element: <SksConvertionDetailView />,
	},
];
