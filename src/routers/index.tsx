import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ErrorPage from '../pages/error-page'
import DashboardView from '../pages/dashboard/Index'
import LoginView from '../pages/auth/Login'
import ProductView from '../pages/products/Index'
import CustomersView from '../pages/custommers/Index'
import OrderView from '../pages/orders/Index'
import ProfileView from '../pages/profile/Index'
import WaBlasView from '../pages/waBlas/Index'
import SignUpView from '../pages/auth/SignUp'
import AuthLayout from '../layouts/AuthLayout'
import { useToken } from '../hooks/token'
// import { AppContextTypes, useAppContext } from '../context/app.context'

export default function AppRouters() {
  //   const { currentUser }: AppContextTypes = useAppContext()

  const routers: { path: string; element: JSX.Element }[] = []
  const authRouters: { path: string; element: JSX.Element }[] = [
    {
      path: '/',
      element: <LoginView />
    },
    {
      path: '/login',
      element: <LoginView />
    },
    {
      path: '/sign-up',
      element: <SignUpView />
    }
  ]

  const mainRouters: { path: string; element: JSX.Element }[] = []

  const currentUser = 'superAdmin'

  switch (currentUser) {
    case 'superAdmin':
      mainRouters.push(
        ...[
          {
            path: '/',
            element: <DashboardView />
          },
          {
            path: '/products',
            element: <ProductView />
          },
          {
            path: '/customers',
            element: <CustomersView />
          },
          {
            path: '/orders',
            element: <OrderView />
          },
          {
            path: '/wa-blas',
            element: <WaBlasView />
          },
          {
            path: '/profile',
            element: <ProfileView />
          }
        ]
      )
      break
    default:
      break
  }

  const { getToken } = useToken()

  const isAuth = getToken()

  if (isAuth) {
    routers.push(...mainRouters)
  } else {
    routers.push(...authRouters)
  }

  const appRouters = createBrowserRouter([
    {
      path: '/',
      element: isAuth ? <AppLayout /> : <AuthLayout />,
      errorElement: <ErrorPage />,
      children: routers
    }
  ])

  return <RouterProvider router={appRouters} />
}
