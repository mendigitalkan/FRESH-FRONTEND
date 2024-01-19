import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import ErrorPage from '../pages/error-page'
import DashboardView from '../pages/dashboard/DashboardView'
import LoginView from '../pages/auth/Login'
import ProfileView from '../pages/profile/Index'
import SignUpView from '../pages/auth/SignUp'
import AuthLayout from '../layouts/AuthLayout'
import { useToken } from '../hooks/token'
import SettingsView from '../pages/settings/Index'
import ProductListView from '../pages/products/ listProductView'
import CustomersListView from '../pages/customers/customersListView'
import OrderListView from '../pages/orders/orderListView'
import TransactionListView from '../pages/transactions/transactionListView'
import WablasListView from '../pages/wablas/wablasListView'
import CategoryListView from '../pages/category/categoryListView'
import CategoryCreateView from '../pages/category/categoryCreateView'
import CategoryEditView from '../pages/category/categoryEditView'
import DetailProductView from '../pages/products/detailProductView'
import CreateProductView from '../pages/products/createProductView'
import EditProductView from '../pages/products/editProductView'
import ListAdminView from '../pages/admins/listAdminView'
import CreateAdminView from '../pages/admins/createAdminView'
import DetailAdminView from '../pages/admins/detailAdminView'
import EditAdminView from '../pages/admins/editAdminView'

export default function AppRouters() {
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
            element: <ProductListView />
          },
          {
            path: '/products/create',
            element: <CreateProductView />
          },
          {
            path: '/products/detail/:productId',
            element: <DetailProductView />
          },
          {
            path: '/products/edit/:productId',
            element: <EditProductView />
          },
          {
            path: '/categories',
            element: <CategoryListView />
          },
          {
            path: '/categories/create',
            element: <CategoryCreateView />
          },
          {
            path: '/categories/edit/:categoryId',
            element: <CategoryEditView />
          },
          {
            path: '/customers',
            element: <CustomersListView />
          },
          {
            path: '/orders',
            element: <OrderListView />
          },
          {
            path: '/transactions',
            element: <TransactionListView />
          },
          {
            path: '/wa-blas',
            element: <WablasListView />
          },
          {
            path: '/admins',
            element: <ListAdminView />
          },
          {
            path: '/admins/create',
            element: <CreateAdminView />
          },
          {
            path: '/admins/detail/:adminId',
            element: <DetailAdminView />
          },
          {
            path: '/admins/edit/:adminId',
            element: <EditAdminView />
          },
          {
            path: '/settings',
            element: <SettingsView />
          },
          {
            path: '/my-profile',
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
