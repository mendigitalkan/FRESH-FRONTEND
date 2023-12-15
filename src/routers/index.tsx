import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/appLayout";
import ErrorPage from "../error-page";
import { studentRouters } from "./student-routes";
import { departmentRouters } from "./department-routers";
import { lp3mRouters } from "./lp3m-routers";
import { academicRouters } from "./academic-routers";
import { AppContextTypes, useAppContext } from "../context/app.context";
import { studyProgramRouters } from "./study-program-routers";
import LoginView from "../pages/auth/login";

export default function AppRouters() {
	const { currentUser }: AppContextTypes = useAppContext();

	let router: { path: string; element: JSX.Element }[] = [];

	switch (currentUser.userRole) {
		case "student":
			router = studentRouters;
			break;
		case "studyProgram":
			router = studyProgramRouters;
			break;
		case "department":
			router = departmentRouters;
			break;
		case "lp3m":
			router = lp3mRouters;
			break;
		case "academic":
			router = academicRouters;
			break;
		default:
			break;
	}

	const isAuth = true;

	const routers = createBrowserRouter([
		isAuth
			? {
					path: "/",
					element: <AppLayout />,
					errorElement: <ErrorPage />,
					children: router,
			  }
			: {
					path: "/",
					element: <LoginView />,
					errorElement: <ErrorPage />,
			  },
	]);

	return <RouterProvider router={routers} />;
}
