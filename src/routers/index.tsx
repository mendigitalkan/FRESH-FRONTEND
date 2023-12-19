import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ErrorPage from '../pages/error-page'
import DashboardView from '../pages/dashboard/Index'
import LoginView from '../pages/auth/Login'
// import { AppContextTypes, useAppContext } from '../context/app.context'

export default function AppRouters() {
  //   const { currentUser }: AppContextTypes = useAppContext()

  let router: { path: string; element: JSX.Element }[] = []

  const currentUser = 'superAdmin'

  switch (currentUser) {
    // case 'admin':
    //   router = [
    //     {
    //       path: '/',
    //       element: <DashboardView />
    //     }
    //   ]
    //   break
    case 'superAdmin':
      router = [
        {
          path: '/',
          element: <DashboardView />
        }
      ]
      break
    default:
      break
  }

  const isAuth = true

  const routers = createBrowserRouter([
    isAuth
      ? {
          path: '/',
          element: <AppLayout />,
          errorElement: <ErrorPage />,
          children: router
        }
      : {
          path: '/',
          element: <LoginView />,
          errorElement: <ErrorPage />
        }
  ])

  return <RouterProvider router={routers} />
}
